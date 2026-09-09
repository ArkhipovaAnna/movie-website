// import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { Movie } from '../../entities/movie/interfaces';

//ПЕРВЫЙ ВАРИАНТ

// const useSearch = (query: string, currentPage: number) => {

//     const [movies, setMovies] = useState<Movie[] | null | 'Not found'>(null);
//     const [totalPages, setTotalPages] = useState(1);

//     useEffect(() => {

//         setMovies(null);

//         if (!query.trim()) {
//             fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_ALL&page=${currentPage}`, {
//                 method: 'GET',
//                 headers: {
//                     'X-API-KEY': 'b0aea1f2-8488-4e2f-bfe8-6c9aeb54d98f',
//                     'Content-Type': 'application/json',
//                 },
//             })
//                 .then(response => {
//                     if (!response.ok) throw new Error('Bad Request');
//                     return response.json();
//                 })
//                 .then(json => {

//                     const data = json.items;

//                     if (data && data.length > 0) {
//                         setMovies(data);
//                         setTotalPages(json.totalPages || 1);
//                     } else {
//                         setMovies('Not found');
//                         setTotalPages(1);
//                     }
//                 })
//                 .catch(error => {
//                     console.error(error.message);
//                     setMovies('Not found');
//                 });

//             return;
//         }

//         const cleanTitle = encodeURIComponent(query.trim());

//         fetch(`https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${cleanTitle}&page=${currentPage}`, {
//             method: 'GET',
//             headers: {
//                 'X-API-KEY': 'b0aea1f2-8488-4e2f-bfe8-6c9aeb54d98f',
//                 'Content-Type': 'application/json',
//             },
//         })
//             .then(response => {
//                 if (!response.ok) throw new Error('Bad Request');
//                 return response.json();
//             })
//             .then(json => {

//                 if (!json.films || json.films.length === 0) {
//                     setMovies('Not found');
//                     setTotalPages(1);
//                     return;
//                 }

//                 const filteredFilms = json.films.filter((film: Movie) => film.posterUrl !== 'https://kinopoiskapiunofficial.tech/images/posters/kp/no-poster.png');

//                 let numberPages = Math.ceil(json.searchFilmsCountResult / 20);
//                 if (numberPages > 20) numberPages = 20;

//                 if (filteredFilms.length === 0) {
//                     setMovies('Not found');
//                     setTotalPages(1);
//                 } else {
//                     setMovies(filteredFilms);
//                     setTotalPages(numberPages || 1);
//                 }
//             })
//             .catch(error => {
//                 console.error(error.message);
//                 setMovies('Not found');
//                 setTotalPages(1);
//             });

//     }, [query, currentPage]);

//     return { movies, totalPages };
// }

// ВТОРОЙ ВАРИАНТ

// const useSearch = (query: string, currentPage: number) => {

//     return useQuery({

//         queryKey: ['films', { query, currentPage }],

//         queryFn: async () => {

//             let url = '';

//             if (!query.trim()) {
//                 url = `https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_ALL&page=${currentPage}`
//             } else {
//                 const cleanTitle = encodeURIComponent(query.trim());
//                 url = `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${cleanTitle}&page=${currentPage}`
//             }

//             const res = await fetch(url, {
//                 method: 'GET',
//                 headers: {
//                     'X-API-KEY': key,
//                     'Content-Type': 'application/json',
//                 },
//             });

//             if (!res.ok) throw new Error('Network error');

//             return res.json;
//         },

//         staleTime: 1000 * 60 * 5,

//     })
// }

// export default useSearch;

// ТРЕТИЙ ВАРИАНТ 

interface UseSearchReturn {
    movies: Movie[] | 'Not found' | undefined;
    totalPages: number;
    isLoading: boolean;
    isError: boolean;
}

const key = import.meta.env.VITE_KINOPOISK_KEY;

const useSearch = (query: string, currentPage: number): UseSearchReturn => {
    const trimmedQuery = query.trim();

    const { data, isLoading, isError } = useQuery({

        queryKey: ['movies', { query: trimmedQuery, page: currentPage }],

        queryFn: async () => {
            const headers = {
                'X-API-KEY': key,
                'Content-Type': 'application/json',
            };


            if (!trimmedQuery) {
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


            const cleanTitle = encodeURIComponent(trimmedQuery);
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