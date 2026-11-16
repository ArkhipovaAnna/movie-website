import type { FavoriteInput } from '@/entities/favorite/schemas';

// Подходит и для Movie (список), и для Details (страница фильма).
export interface FilmLike {
    filmId?: number;
    kinopoiskId?: number;
    nameRu: string | null;
    nameEn: string | null;
    year: string | number;
    posterUrlPreview: string;
}

// Те же хосты, что разрешены проверкой в базе данных 
const POSTER_RE = /^https:\/\/(kinopoiskapiunofficial\.tech|st\.kp\.yandex\.net)\//;

export const toFavoriteInput = (film: FilmLike): FavoriteInput | null => {
    const filmId = film.filmId ?? film.kinopoiskId;
    if (!filmId || !Number.isInteger(filmId) || filmId <= 0) return null;

    const name = film.nameRu || film.nameEn || null;
    const year = Number(film.year);
    const poster = film.posterUrlPreview;

    return {
        filmId,
        name: name ? name.slice(0, 300) : null,
        year: Number.isInteger(year) && year >= 1800 && year <= 2200 ? year : null,
        posterUrl: POSTER_RE.test(poster) && poster.length <= 500 ? poster : null,
    };
};
