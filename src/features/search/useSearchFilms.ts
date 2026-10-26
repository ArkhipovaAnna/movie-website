import { useQuery } from '@tanstack/react-query';
import { MoviesCollectionResponseSchema, MoviesSearchResponseSchema, type Movie } from '@/entities/movie/schemas';
import { useRequest } from '@/app/stores/use-request-store';
import { useCurrentPage } from '@/app/stores/use-currentPage-store';
import { apiGet } from '@/shared/api/client';
import { NO_POSTER_URL } from '@/shared/config/images';

interface UseSearchFilmsReturn {
    movies: Movie[] | null;
    totalPages: number;
    isLoading: boolean;
    isError: boolean;
    error: Error | null;
}

const useSearchFilms = (): UseSearchFilmsReturn => {

    const request = useRequest();
    const currentPage = useCurrentPage();

    const trimmedRequest = request.trim();

    const { data, isLoading, isError, error } = useQuery({

        queryKey: ['movies', { request: trimmedRequest, page: currentPage }],

        queryFn: async ({ signal }) => {

            if (!trimmedRequest) {
                const json = await apiGet(
                    '/api/v2.2/films/collections',
                    MoviesCollectionResponseSchema,
                    { type: 'TOP_POPULAR_ALL', page: currentPage },
                    signal,
                );

                if (!json.items || json.items.length === 0) {
                    return { movies: null, totalPages: 1 };
                }

                return {
                    movies: json.items,
                    totalPages: json.totalPages || 1,
                };
            }

            const json = await apiGet(
                '/api/v2.1/films/search-by-keyword',
                MoviesSearchResponseSchema,
                { keyword: trimmedRequest, page: currentPage },
                signal,
            );

            if (!json.films) {
                return { movies: null, totalPages: 1 };
            }

            const filteredFilms = json.films.filter(
                (film) => film.posterUrl !== NO_POSTER_URL
            );

            const numberPages = Math.min(Math.ceil((json.searchFilmsCountResult ?? 0) / 20), 20);

            return {
                movies: filteredFilms,
                totalPages: numberPages || 1,
            };
        },

        staleTime: 1000 * 60 * 5,
    });

    if (isError) {
        return { movies: null, totalPages: 1, isLoading, isError, error };
    }

    return {
        movies: data?.movies ?? null,
        totalPages: data?.totalPages || 1,
        isLoading,
        isError,
        error,
    };
};

export default useSearchFilms;
