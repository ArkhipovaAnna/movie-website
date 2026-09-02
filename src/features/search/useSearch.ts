import { useState, useEffect } from 'react';
import type { Movie } from '../../entities/movie/interfaces';

const useSearch = (title: string, page: number) => {

    const [movies, setMovies] = useState<Movie[] | null | 'Not found'>(null);
    const [pages, setPages] = useState(1);

    useEffect(() => {

        if (title) {
            return;
        }

        fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_ALL&page=${page}`, {
            method: 'GET',
            headers: {
                'X-API-KEY': 'b0aea1f2-8488-4e2f-bfe8-6c9aeb54d98f',
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(json => {

                const data = json.items;

                if (data) {
                    setMovies(data);
                    setPages(json.totalPages);
                } else {
                    setMovies(null);
                    setPages(1);
                }
            })
            .catch(error => console.log(error.message))
    }, [page]);

    useEffect(() => {

        if (!title.trim()) {
            return;
        }

        fetch(`https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${title}&page=${page}`, {
            method: 'GET',
            headers: {
                'X-API-KEY': 'b0aea1f2-8488-4e2f-bfe8-6c9aeb54d98f',
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(json => {

                const filteredFilms = json.films.filter((film: Movie) => film.posterUrl !== 'https://kinopoiskapiunofficial.tech/images/posters/kp/no-poster.png');

                let numberPages = Math.ceil(json.searchFilmsCountResult / 20);
                if (numberPages > 20) numberPages = 20;

                console.log(json);

                if (filteredFilms.length === 0) {
                    setMovies('Not found');
                    setPages(1);
                } else if (filteredFilms) {
                    setMovies(filteredFilms);
                    setPages(numberPages);
                } else {
                    setMovies(null);
                    setPages(1);
                }
            })
            .catch(error => console.log(error.message))
    }, [title, page]);

    return { movies, pages };
}

export default useSearch
