import { useState, useEffect } from 'react';
import type { Movie } from '../../entities/movie/interfaces';

const useSearch = (title: string) => {

    const [movie, setMovie] = useState<Movie[] | null | 'Not found'>(null);

    useEffect(() => {

        if (!title.trim()) {
            setMovie(null);
            return;
        }

        fetch(`https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${title}`, {
            method: 'GET',
            headers: {
                'X-API-KEY': 'b0aea1f2-8488-4e2f-bfe8-6c9aeb54d98f',
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(json => {

                const data = json.films;

                console.log(data);

                if (data.length === 0) {
                    setMovie('Not found');
                } else if (data) {
                    setMovie(data);
                } else {
                    setMovie(null);
                }
            })
            .catch(error => console.log(error.message))
    }, [title]);

    return movie;
}

export default useSearch
