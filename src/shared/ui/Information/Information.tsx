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
            <dl className={styles.descriptionList}>
                <dt>Год выпуска</dt>
                <dd>{movie.year === 'null' ? 'Неизвестно' : movie.year}</dd>
                <dt>Страна</dt>
                <dd>{countries || 'Неизвестно'}</dd>
                <dt>Жанр</dt>
                <dd style={{ textTransform: 'capitalize' }}>{genres.length > 0 ? genres : 'Неизвестно'}</dd>
                <dt>Продолжительность</dt>
                <dd>{filmLength}</dd>
            </dl>
            <p className={styles.description}>{movie.description}</p>
        </div>
    )

}

export default Information