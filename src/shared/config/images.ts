// Хосты, с которых разрешено грузить картинки (точное совпадение hostname).
export const ALLOWED_IMAGE_HOSTS: ReadonlySet<string> = new Set([
    'kinopoiskapiunofficial.tech',
    'st.kp.yandex.net',
]);

// Адрес «нет постера», который отдаёт API Кинопоиска.
export const NO_POSTER_URL = 'https://kinopoiskapiunofficial.tech/images/posters/kp/no-poster.png';

export const PLACEHOLDER_SRC = '/images/poster-placeholder.svg';
export const ACTOR_PLACEHOLDER_SRC = '/images/actor-placeholder.svg';
