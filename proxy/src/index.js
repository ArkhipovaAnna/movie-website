const UPSTREAM = 'https://kinopoiskapiunofficial.tech';
const CACHE_SECONDS = 300;

const ID = /^[1-9]\d{0,9}$/;
const PAGE = /^[1-9]\d{0,2}$/;

// Белый список: путь -> какие query-параметры разрешены и какие обязательны.
// Всё, чего здесь нет, прокси отклонит.
const ROUTES = [
    {
        path: /^\/api\/v2\.2\/films\/collections$/,
        params: { type: { re: /^[A-Z_]{1,40}$/, required: true }, page: { re: PAGE } },
    },
    {
        path: /^\/api\/v2\.1\/films\/search-by-keyword$/,
        params: { keyword: { re: /^.{1,100}$/s, required: true }, page: { re: PAGE } },
    },
    { path: /^\/api\/v2\.2\/films\/[1-9]\d{0,9}$/, params: {} },
    { path: /^\/api\/v1\/staff$/, params: { filmId: { re: ID, required: true } } },
    { path: /^\/api\/v1\/staff\/[1-9]\d{0,9}$/, params: {} },
];

const json = (status, body, extra = {}) =>
    new Response(JSON.stringify(body), {
        status,
        headers: { 'Content-Type': 'application/json', ...extra },
    });

// Возвращает собранный адрес апстрима или null, если запрос не по правилам.
const buildUpstreamUrl = (url) => {
    const route = ROUTES.find((r) => r.path.test(url.pathname));
    if (!route) return null;

    const upstream = new URL(url.pathname, UPSTREAM);

    for (const [name, value] of url.searchParams) {
        const rule = route.params[name];
        if (!rule || !rule.re.test(value)) return null;
        upstream.searchParams.set(name, value);
    }
    for (const [name, rule] of Object.entries(route.params)) {
        if (rule.required && !upstream.searchParams.has(name)) return null;
    }
    return upstream;
};

export default {
    async fetch(request, env, ctx) {
        const origin = request.headers.get('Origin');
        const allowed = env.ALLOWED_ORIGINS.split(',').map((s) => s.trim());

        // Браузерные запросы с чужих сайтов отсекаем.
        // Запросы без Origin (curl, серверы) пропускаем: CORS от них не защищает,
        // от злоупотреблений защищает лимит частоты.
        if (origin && !allowed.includes(origin)) {
            return json(403, { error: 'Forbidden origin' });
        }

        const cors = origin
            ? { 'Access-Control-Allow-Origin': origin, Vary: 'Origin' }
            : {};

        if (request.method === 'OPTIONS') {
            return new Response(null, {
                status: 204,
                headers: { ...cors, 'Access-Control-Allow-Methods': 'GET', 'Access-Control-Max-Age': '86400' },
            });
        }
        if (request.method !== 'GET') {
            return json(405, { error: 'Method not allowed' }, cors);
        }

        const upstreamUrl = buildUpstreamUrl(new URL(request.url));
        if (!upstreamUrl) {
            return json(404, { error: 'Not found' }, cors);
        }

        if (env.LIMITER) {
            const ip = request.headers.get('CF-Connecting-IP') ?? 'unknown';
            const { success } = await env.LIMITER.limit({ key: ip });
            if (!success) return json(429, { error: 'Too many requests' }, cors);
        }

        // Кэш Cloudflare: экономит лимит Кинопоиска.
        const cache = caches.default;
        const cacheKey = new Request(upstreamUrl.toString(), { method: 'GET' });
        const cached = await cache.match(cacheKey);
        if (cached) {
            const res = new Response(cached.body, cached);
            for (const [k, v] of Object.entries(cors)) res.headers.set(k, v);
            return res;
        }

        const upstreamRes = await fetch(upstreamUrl, {
            headers: { 'X-API-KEY': env.KINOPOISK_KEY, Accept: 'application/json' },
        });

        const res = new Response(upstreamRes.body, {
            status: upstreamRes.status,
            headers: {
                'Content-Type': upstreamRes.headers.get('Content-Type') ?? 'application/json',
                'Cache-Control': upstreamRes.ok ? `public, max-age=${CACHE_SECONDS}` : 'no-store',
            },
        });

        if (upstreamRes.ok) ctx.waitUntil(cache.put(cacheKey, res.clone()));

        for (const [k, v] of Object.entries(cors)) res.headers.set(k, v);
        return res;
    },
};
