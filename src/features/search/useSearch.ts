import { useState, useEffect } from 'react';
import type { Movie } from '../../entities/movie/interfaces';

const useSearch = (title: string, currentPage: number) => {

    const [movies, setMovies] = useState<Movie[] | null | 'Not found'>(null);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {

        setMovies(null);

        if (!title.trim()) {
            fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_ALL&page=${currentPage}`, {
                method: 'GET',
                headers: {
                    'X-API-KEY': 'b0aea1f2-8488-4e2f-bfe8-6c9aeb54d98f',
                    'Content-Type': 'application/json',
                },
            })
                .then(response => {
                    if (!response.ok) throw new Error('Bad Request');
                    return response.json();
                })
                .then(json => {

                    const data = json.items;

                    if (data && data.length > 0) {
                        setMovies(data);
                        setTotalPages(json.totalPages || 1);
                    } else {
                        setMovies('Not found');
                        setTotalPages(1);
                    }
                })
                .catch(error => {
                    console.error(error.message);
                    setMovies('Not found');
                });

            return;
        }

        const cleanTitle = encodeURIComponent(title.trim());

        fetch(`https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${cleanTitle}&page=${currentPage}`, {
            method: 'GET',
            headers: {
                'X-API-KEY': 'b0aea1f2-8488-4e2f-bfe8-6c9aeb54d98f',
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) throw new Error('Bad Request');
                return response.json();
            })
            .then(json => {

                if (!json.films || json.films.length === 0) {
                    setMovies('Not found');
                    setTotalPages(1);
                    return;
                }

                const filteredFilms = json.films.filter((film: Movie) => film.posterUrl !== 'https://kinopoiskapiunofficial.tech/images/posters/kp/no-poster.png');

                let numberPages = Math.ceil(json.searchFilmsCountResult / 20);
                if (numberPages > 20) numberPages = 20;

                if (filteredFilms.length === 0) {
                    setMovies('Not found');
                    setTotalPages(1);
                } else {
                    setMovies(filteredFilms);
                    setTotalPages(numberPages || 1);
                }
            })
            .catch(error => {
                console.error(error.message);
                setMovies('Not found');
                setTotalPages(1);
            });

    }, [title, currentPage]);

    return { movies, totalPages };
}

export default useSearch;
