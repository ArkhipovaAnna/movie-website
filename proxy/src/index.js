const UPSTREAM = 'https://kinopoiskapiunofficial.tech';
const HOUR = 60 * 60;
const DAY = 24 * HOUR;
const UPSTREAM_TIMEOUT_MS = 10000;
const DEFAULT_RETRY_AFTER_SECONDS = 5;
const OWN_LIMIT_RETRY_AFTER_SECONDS = 60;


const ID = /^[1-9]\d{0,9}$/;
const PAGE = /^[1-9]\d{0,2}$/;

// Белый список: путь -> какие query-параметры разрешены и какие обязательны.
// Всё, чего здесь нет, прокси отклонит.
const ROUTES = [
    {
        path: /^\/api\/v2\.2\/films\/collections$/,
        ttl: HOUR,
        params: { type: { re: /^[A-Z_]{1,40}$/, required: true }, page: { re: PAGE } },
    },
    {
        path: /^\/api\/v2\.1\/films\/search-by-keyword$/,
        ttl: HOUR,
        params: { keyword: { re: /^.{1,100}$/s, required: true }, page: { re: PAGE } },
    },
    { path: /^\/api\/v2\.2\/films\/[1-9]\d{0,9}$/, ttl: DAY, params: {} },
    { path: /^\/api\/v1\/staff$/, ttl: DAY, params: { filmId: { re: ID, required: true } } },
    { path: /^\/api\/v1\/staff\/[1-9]\d{0,9}$/, ttl: DAY, params: {} },
];


const json = (status, body, extra = {}) =>
    new Response(JSON.stringify(body), {
        status,
        headers: { 'Content-Type': 'application/json', ...extra },
    });


// Возвращает { url, ttl } или null, если запрос не по правилам.
const resolveTarget = (url) => {
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
    return { url: upstream, ttl: route.ttl };
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

        // Expose-Headers нужен, чтобы JS в браузере мог прочитать Retry-After.
        const cors = origin
            ? {
                'Access-Control-Allow-Origin': origin,
                'Access-Control-Expose-Headers': 'Retry-After',
                Vary: 'Origin',
            }
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

        const target = resolveTarget(new URL(request.url));
        if (!target) {
            return json(404, { error: 'Not found' }, cors);
        }
        const { url: upstreamUrl, ttl } = target;

        // 1. Сначала кэш: ответ из кэша не тратит ни лимит воркера, ни квоту Кинопоиска.
        const cache = caches.default;
        const cacheKey = new Request(upstreamUrl.toString(), { method: 'GET' });
        const cached = await cache.match(cacheKey);
        if (cached) {
            const res = new Response(cached.body, cached);
            for (const [k, v] of Object.entries(cors)) res.headers.set(k, v);
            res.headers.set('X-Cache', 'HIT');
            return res;
        }

        // 2. Собственный лимит воркера (только для запросов, которым нужен поход в Кинопоиск).
        if (env.LIMITER) {
            const ip = request.headers.get('CF-Connecting-IP') ?? 'unknown';
            const { success } = await env.LIMITER.limit({ key: ip });
            if (!success) {
                return json(
                    429,
                    { error: 'Too many requests', retryAfter: OWN_LIMIT_RETRY_AFTER_SECONDS },
                    { ...cors, 'Retry-After': String(OWN_LIMIT_RETRY_AFTER_SECONDS), 'Cache-Control': 'no-store' },
                );
            }
        }

        // 3. Запрос к Кинопоиску с таймаутом.
        let upstreamRes;
        try {
            upstreamRes = await fetch(upstreamUrl, {
                headers: { 'X-API-KEY': env.KINOPOISK_KEY, Accept: 'application/json' },
                signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
            });
        } catch (error) {
            const isTimeout = error?.name === 'TimeoutError';
            return json(
                isTimeout ? 504 : 502,
                { error: isTimeout ? 'Upstream timeout' : 'Upstream unreachable' },
                { ...cors, 'Cache-Control': 'no-store' },
            );
        }

        // 4. Кинопоиск ответил 429: отдаём аккуратный JSON вместо его HTML-страницы.
        if (upstreamRes.status === 429) {
            const headerSeconds = Number(upstreamRes.headers.get('Retry-After'));
            const retryAfter = Number.isFinite(headerSeconds) && headerSeconds > 0
                ? headerSeconds
                : DEFAULT_RETRY_AFTER_SECONDS;

            await upstreamRes.body?.cancel();

            return json(
                429,
                { error: 'Upstream rate limit', retryAfter },
                { ...cors, 'Retry-After': String(retryAfter), 'Cache-Control': 'no-store' },
            );
        }

        const res = new Response(upstreamRes.body, {
            status: upstreamRes.status,
            headers: {
                'Content-Type': upstreamRes.headers.get('Content-Type') ?? 'application/json',
                'Cache-Control': upstreamRes.ok ? `public, max-age=${ttl}` : 'no-store',
            },
        });

        if (upstreamRes.ok) ctx.waitUntil(cache.put(cacheKey, res.clone()));

        for (const [k, v] of Object.entries(cors)) res.headers.set(k, v);
        res.headers.set('X-Cache', 'MISS');
        return res;
    },
};
