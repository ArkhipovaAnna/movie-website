import { z } from 'zod';

export const FavoriteSchema = z
    .object({
        film_id: z.number(),
        name_ru: z.string().nullable(),
        year: z.number().nullable(),
        poster_url_preview: z.string().nullable(),
        created_at: z.string(),
    })
    .transform((f) => ({
        filmId: f.film_id,
        name: f.name_ru,
        year: f.year,
        posterUrl: f.poster_url_preview,
        createdAt: f.created_at,
    }));

export const FavoritesSchema = z.array(FavoriteSchema);

export type Favorite = z.output<typeof FavoriteSchema>;

// То, что мы отправляем при добавлении (без даты: её проставит база).
export interface FavoriteInput {
    filmId: number;
    name: string | null;
    year: number | null;
    posterUrl: string | null;
}
