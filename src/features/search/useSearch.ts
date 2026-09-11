import { useQuery } from '@tanstack/react-query';
import type { Movie } from '../../entities/movie/interfaces';
import { useRequest } from '../../app/stores/use-request-store';
import { useCurrentPage } from '../../app/stores/use-currentPage-store';

interface UseSearchReturn {
    movies: Movie[] | 'Not found' | undefined;
    totalPages: number;
    isLoading: boolean;
    isError: boolean;
}

const key = import.meta.env.VITE_KINOPOISK_KEY;

const useSearch = (): UseSearchReturn => {

    const request = useRequest();
    const currentPage = useCurrentPage();


    const trimmedRequest = request.trim();

    const { data, isLoading, isError } = useQuery({

        queryKey: ['movies', { request: trimmedRequest, page: currentPage }],

        queryFn: async () => {
            const headers = {
                'X-API-KEY': key,
                'Content-Type': 'application/json',
            };


            if (!trimmedRequest) {
                const res = await fetch(
                    `https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_ALL&page=${currentPage}`,
                    { method: 'GET', headers }
                );
                if (!res.ok) throw new Error('Bad Request');
                const json = await res.json();


                if (!json.items || json.items.length === 0) {
                    return { movies: 'Not found' as const, totalPages: 1 };
                }

                return {
                    movies: json.items,
                    totalPages: json.totalPages || 1,
                };
            }


            const cleanTitle = encodeURIComponent(trimmedRequest);
            const res = await fetch(
                `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${cleanTitle}&page=${currentPage}`,
                { method: 'GET', headers }
            );
            if (!res.ok) throw new Error('Bad Request');
            const json = await res.json();


            if (!json.films || json.films.length === 0) {
                return { movies: 'Not found' as const, totalPages: 1 };
            }


            const filteredFilms = json.films.filter(
                (film: Movie) => film.posterUrl !== 'https://kinopoiskapiunofficial.tech/images/posters/kp/no-poster.png'
            );

            if (filteredFilms.length === 0) {
                return { movies: 'Not found' as const, totalPages: 1 };
            }


            let numberPages = Math.ceil(json.searchFilmsCountResult / 20);
            if (numberPages > 20) numberPages = 20;

            return {
                movies: filteredFilms,
                totalPages: numberPages || 1,
            };
        },

        staleTime: 1000 * 60 * 5,
    });


    if (isError) {
        return { movies: 'Not found', totalPages: 1, isLoading, isError };
    }


    return {
        movies: data?.movies,
        totalPages: data?.totalPages || 1,
        isLoading,
        isError,
    };
};

export default useSearch;