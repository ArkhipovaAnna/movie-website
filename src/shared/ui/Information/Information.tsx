import type { Movie, Details } from "../../../entities/movie/interfaces";
import filmLengthFormatted from "../../helpers/filmLengthFormatted";
import styles from './Information.module.scss';

interface InformationProps {
    movie: Movie | Details;
}

const Information = ({ movie }: InformationProps) => {

    const countries = movie.countries.map(item => item.country).join(', ');

    const genres = movie.genres.map(item => item.genre).join('/ ');

    const filmLength = filmLengthFormatted(movie.filmLength);

    return (
        <div>
            <p><span>Год выпуска: </span> {movie.year === 'null' ? 'Неизвестно' : movie.year}</p>
            <p><span>Страна: </span>{countries || 'Неизвестно'}</p>
            <p className={styles.genres}><span>Жанр: </span>{genres.length > 0 ? genres : 'Неизвестно'}</p>
            <p ><span>Продолжительность: </span>{filmLength}</p>
            <p className={styles.description}>{movie.description}</p>
        </div>
    )

}

export default Information