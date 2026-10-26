import { z } from 'zod';

const NamedItemSchema = z.record(z.string(), z.string());

// API Кинопоиска отдаёт разные формы для поиска и для подборок,
// поэтому поля Movie приводим к единому виду с безопасными значениями по умолчанию.
const text = z.string().nullish().transform((v) => v ?? '');
const textOrNumber = z.union([z.string(), z.number()]).nullish().transform((v) => (v == null ? '' : String(v)));
const list = z.array(NamedItemSchema).nullish().transform((v) => v ?? []);

export const MovieSchema = z.object({
    filmId: z.number().optional(),
    kinopoiskId: z.number().optional(),
    nameRu: text,
    nameEn: text,
    year: z.union([z.string(), z.number()]).nullish().transform((v) => (v == null ? 'null' : String(v))),
    description: text,
    filmLength: textOrNumber,
    countries: list,
    genres: list,
    rating: textOrNumber,
    posterUrl: text,
    posterUrlPreview: text,
    ratingKinopoisk: z.number().nullish().transform((v) => v ?? undefined),
});

export const DetailsSchema = z.object({
    countries: z.array(NamedItemSchema),
    description: z.string().nullable(),
    filmLength: z.number().nullable(),
    genres: z.array(NamedItemSchema),
    kinopoiskId: z.number(),
    nameEn: z.string().nullable(),
    nameRu: z.string().nullable(),
    posterUrl: z.string(),
    posterUrlPreview: z.string(),
    ratingKinopoisk: z.number().nullable(),
    year: z.number(),
});

export const StaffSchema = z.object({
    nameEn: z.string().nullable(),
    nameRu: z.string().nullable(),
    posterUrl: z.string(),
    professionKey: z.string(),
    staffId: z.number(),
});

export const FilmographyItemSchema = z.object({
    filmId: z.number(),
    nameRu: z.string().nullable(),
    professionKey: z.string(),
    rating: z.string().nullable(),
});

export const ActorSchema = z.object({
    age: z.number().nullable(),
    birthday: z.string().nullable(),
    birthplace: z.string().nullable(),
    death: z.string().nullable(),
    deathplace: z.string().nullable(),
    facts: z.array(z.string()),
    films: z.array(FilmographyItemSchema),
    growth: z.number().nullable(),
    nameRu: z.string().nullable(),
    posterUrl: z.string(),
    profession: z.string().nullable(),
});

export const MoviesCollectionResponseSchema = z.object({
    items: z.array(MovieSchema).optional(),
    totalPages: z.number().optional(),
});

export const MoviesSearchResponseSchema = z.object({
    films: z.array(MovieSchema).optional(),
    searchFilmsCountResult: z.number().optional(),
});

export const StaffListSchema = z.array(StaffSchema);

export type Movie = z.infer<typeof MovieSchema>;
export type Details = z.infer<typeof DetailsSchema>;
export type Staff = z.infer<typeof StaffSchema>;
export type Actor = z.infer<typeof ActorSchema>;
export type IFilmographyItem = z.infer<typeof FilmographyItemSchema>;
