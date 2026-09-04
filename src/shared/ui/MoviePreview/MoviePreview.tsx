import styles from './MoviePreview.module.scss'
import type { Movie } from '../../../entities/movie/interfaces'

interface MoviePreviewProps {
    movie: Movie;
}

const MoviePreview = ({ movie }: MoviePreviewProps) => {

    const countries = movie.countries.map(item => item.country).join(', ');

    const genres = movie.genres.map(item => item.genre).join('/ ');

    let filmLength = movie.filmLength;
    if (filmLength === undefined) {
        filmLength = 'Неизвестно'
    } else {
        const filmLengthArray = filmLength.split(':');
        let hours = filmLengthArray[0];
        if (hours.startsWith('0')) hours = hours.slice(1);
        let minutes = filmLengthArray[1];
        if (minutes.startsWith('0')) minutes = minutes.slice(1);
        if (hours === '0') {
            filmLength = `${minutes} мин`
        } else {
            filmLength = `${hours} ч ${minutes} мин`
        }

    }

    const isNoPosterPreview = movie.posterUrlPreview === 'https://kinopoiskapiunofficial.tech/images/posters/kp/no-poster.png';

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <h2>{movie.nameRu || movie.nameEn}</h2>
                <div>Rating</div>
            </div>
            <div className={styles.content}>
                <div className={styles.imgWrapper}>
                    <img src={isNoPosterPreview ? '/images/poster-placeholder.svg' : movie.posterUrlPreview} alt='Poster' />
                </div>
                <div className={styles.information}>
                    <p><span>Год выпуска: </span> {movie.year === 'null' ? 'Неизвестно' : movie.year}</p>
                    <p><span>Страна: </span>{countries}</p>
                    <p className={styles.genres}><span>Жанр: </span>{genres.length > 0 ? genres : 'Неизвестно'}</p>
                    <p ><span>Продолжительность: </span>{filmLength}</p>
                    <p className={styles.description}>{movie.description}</p>
                </div>
            </div>
        </div>
    )
}

export default MoviePreview
