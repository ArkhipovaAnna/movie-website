import type { z } from 'zod';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Сколько запросов к API может быть в полёте одновременно.
const MAX_CONCURRENT = 3;

export class ApiError extends Error {
    status: number;

    constructor(status: number) {
        super(`API request failed with status ${status}`);
        this.name = 'ApiError';
        this.status = status;
    }
}

type Params = Record<string, string | number>;

let active = 0;
const waiting: Array<() => void> = [];

// Ждёт свободный слот. Если запрос отменили, пока он стоял в очереди, он из неё убирается.
const acquire = (signal?: AbortSignal): Promise<void> =>
    new Promise((resolve, reject) => {

        if (signal?.aborted) {
            reject(signal.reason);
            return;
        }

        const start = () => {
            signal?.removeEventListener('abort', onAbort);
            active++;
            resolve();
        };

        const onAbort = () => {
            const index = waiting.indexOf(start);
            if (index !== -1) waiting.splice(index, 1);
            reject(signal?.reason);
        };

        if (active < MAX_CONCURRENT) {
            start();
            return;
        }

        signal?.addEventListener('abort', onAbort, { once: true });
        waiting.push(start);
    });

// Освобождает слот и пускает следующий запрос из очереди.
const release = () => {
    active--;
    waiting.shift()?.();
};

export const apiGet = async <S extends z.ZodType>(
    path: string,
    schema: S,
    params: Params = {},
    signal?: AbortSignal,
): Promise<z.output<S>> => {

    if (!BASE_URL) {
        throw new Error('VITE_API_BASE_URL is not set');
    }

    const url = new URL(path, BASE_URL);

    for (const [name, value] of Object.entries(params)) {
        url.searchParams.set(name, String(value));
    }

    await acquire(signal);

    let json: unknown;
    try {
        const res = await fetch(url, { signal });

        if (!res.ok) throw new ApiError(res.status);

        json = await res.json();
    } finally {
        release();
    }

    return schema.parse(json);
};
