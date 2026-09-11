import styles from './MoviePreview.module.scss';
import type { Movie } from '../../../entities/movie/interfaces';
import Rating from '../Rating/Rating';
import filmLengthFormatted from '../../helpers/filmLengthFormatted';

interface MoviePreviewProps {
    movie: Movie;
}

const MoviePreview = ({ movie }: MoviePreviewProps) => {

    const countries = movie.countries.map(item => item.country).join(', ');

    const genres = movie.genres.map(item => item.genre).join('/ ');

    const filmLength = filmLengthFormatted(movie.filmLength);

    const isNoPosterPreview = movie.posterUrlPreview === 'https://kinopoiskapiunofficial.tech/images/posters/kp/no-poster.png';

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <h2>{movie.nameRu || movie.nameEn}</h2>
                <Rating rating={movie.ratingKinopoisk || movie.rating} />
            </div>
            <div className={styles.content}>
                <div className={styles.imgWrapper}>
                    <img src={isNoPosterPreview ? '/images/poster-placeholder.svg' : movie.posterUrlPreview} alt='Poster' />
                </div>
                <div className={styles.information}>
                    <p><span>Год выпуска: </span> {movie.year === 'null' ? 'Неизвестно' : movie.year}</p>
                    <p><span>Страна: </span>{countries || 'Неизвестно'}</p>
                    <p className={styles.genres}><span>Жанр: </span>{genres.length > 0 ? genres : 'Неизвестно'}</p>
                    <p ><span>Продолжительность: </span>{filmLength}</p>
                    <p className={styles.description}>{movie.description}</p>
                </div>
            </div>
        </div>
    )
}

export default MoviePreview
