import styles from './MoviePreview.module.scss';
import type { Movie, Details } from '@/entities/movie/interfaces';
import Rating from '../Rating/Rating';
import Information from '../Information/Information';
import SafeImage from '../SafeImage/SafeImage';
import { Link } from 'react-router';

interface MoviePreviewProps {
    movie: Movie | Details;
}

const MoviePreview = ({ movie }: MoviePreviewProps) => {

    if (movie === undefined) return;

    const isMovie = (movie: Movie | Details): movie is Movie => {
        return 'filmId' in movie;
    };

    const filmId = isMovie(movie) ? movie.filmId : movie.kinopoiskId;
    const rating = isMovie(movie) ? movie.rating : movie.ratingKinopoisk;

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <Link to={`/details/${filmId}`} className={styles.link}>
                    <h2>{movie.nameRu || movie.nameEn}</h2>
                </Link>
                <Rating rating={rating} />
            </div>
            <div className={styles.content}>
                <div className={styles.imgWrapper}>
                    <Link to={`/details/${filmId}`}>
                        <SafeImage src={movie.posterUrlPreview} alt='Poster' />
                    </Link>
                </div>
                <Information movie={movie} />
            </div>
        </div>
    )
}

export default MoviePreview
