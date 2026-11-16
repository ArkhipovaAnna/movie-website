import type { Video } from '@/entities/movie/schemas';

export interface Trailer {
    id: string;
    name: string;
}

const YOUTUBE_HOSTS: ReadonlySet<string> = new Set([
    'youtube.com',
    'www.youtube.com',
    'm.youtube.com',
    'youtu.be',
    'youtube-nocookie.com',
    'www.youtube-nocookie.com',
]);

const VIDEO_ID = /^[A-Za-z0-9_-]{11}$/;

// Достаёт идентификатор ролика из ссылки YouTube или возвращает null.
export const getYoutubeVideoId = (value: string): string | null => {

    let url: URL;
    try {
        url = new URL(value);
    } catch {
        return null;
    }

    if (url.protocol !== 'https:' && url.protocol !== 'http:') return null;
    if (!YOUTUBE_HOSTS.has(url.hostname)) return null;

    let id: string | null = null;

    if (url.hostname === 'youtu.be') {
        id = url.pathname.slice(1).split('/')[0];
    } else if (url.pathname === '/watch') {
        id = url.searchParams.get('v');
    } else {
        id = url.pathname.match(/^\/(?:embed|shorts|v)\/([^/]+)/)?.[1] ?? null;
    }

    return id && VIDEO_ID.test(id) ? id : null;
};

// Выбирает один трейлер: сначала с «трейлер/trailer» в названии, иначе первый подходящий ролик YouTube.
export const pickTrailer = (videos: Video[]): Trailer | null => {

    const candidates = videos
        .filter((video) => video.site === 'YOUTUBE')
        .map((video) => ({ id: getYoutubeVideoId(video.url), name: video.name }))
        .filter((video): video is Trailer => video.id !== null);

    return candidates.find((video) => /трейлер|trailer/i.test(video.name)) ?? candidates[0] ?? null;
};
