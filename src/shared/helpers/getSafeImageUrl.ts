import { ALLOWED_IMAGE_HOSTS, NO_POSTER_URL } from '@/shared/config/images';

const warnRejected = (value: string) => {
    if (import.meta.env.DEV) {
        console.warn(`[getSafeImageUrl] Адрес картинки отклонён: ${value}`);
    }
};

// Возвращает проверенный адрес или null, если картинку грузить нельзя
// (нет адреса, это «нет постера», не https, адрес с логином/паролем или чужой хост).
const getSafeImageUrl = (value: string | null | undefined): string | null => {

    if (!value || value === NO_POSTER_URL) return null;

    let url: URL;
    try {
        url = new URL(value);
    } catch {
        warnRejected(value);
        return null;
    }

    const isAllowed =
        url.protocol === 'https:' &&
        !url.username &&
        !url.password &&
        ALLOWED_IMAGE_HOSTS.has(url.hostname);

    if (!isAllowed) {
        warnRejected(value);
        return null;
    }

    return url.href;
};

export default getSafeImageUrl
