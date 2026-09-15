import styles from './MoviePreview.module.scss';
import type { Movie } from '../../../entities/movie/interfaces';
import Rating from '../Rating/Rating';
import Information from '../Information/Information';
import { Link } from 'react-router';

interface MoviePreviewProps {
    movie: Movie;
}

const MoviePreview = ({ movie }: MoviePreviewProps) => {

    const isNoPosterPreview = movie.posterUrlPreview === 'https://kinopoiskapiunofficial.tech/images/posters/kp/no-poster.png';

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <Link to={`/details/${movie.filmId || movie.kinopoiskId}`} className={styles.link}>
                    <h2>{movie.nameRu || movie.nameEn}</h2>
                </Link>
                <Rating rating={movie.ratingKinopoisk || movie.rating} />
            </div>
            <div className={styles.content}>
                <div className={styles.imgWrapper}>
                    <Link to={`/details/${movie.filmId || movie.kinopoiskId}`}>
                        <img src={isNoPosterPreview ? '/images/poster-placeholder.svg' : movie.posterUrlPreview} alt='Poster' />
                    </Link>
                </div>
                <Information movie={movie} />
            </div>
        </div>
    )
}

export default MoviePreview
