export interface Movie {
    filmId: number;
    nameRu: string;
    nameEn: string;
    type: string;
    year: string;
    description: string;
    filmLength: string;
    countries: Record<string, string>[];
    genres: Record<string, string>[];
    rating: string;
    ratingVoteCount: string;
    posterUrl: string;
    posterUrlPreview: string;
}
