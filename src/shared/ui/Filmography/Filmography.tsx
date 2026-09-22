import type { FilmographyItem } from "../../../entities/movie/interfaces";
import MoviePreview from "../MoviePreview/MoviePreview";
import useSearchDetails from "../../../features/search/useSearchDetails";
import styles from './Filmography.module.scss';

interface FilmographyProps {
    films: FilmographyItem[];
}

const Filmography = ({ films }: FilmographyProps) => {

    const mainRoles = films
        .filter(film => film.professionKey === 'ACTOR')
        .filter(film => film.rating !== null)
        .filter(film => film.nameRu !== null)
        .filter((film, index, array) =>
            array.findIndex(f => f.nameRu === film.nameRu) === index
        )
        .sort((a, b) => Number(b.rating) - Number(a.rating))
        .slice(0, 30);

    return (
        <>
            <h4>Фильмография</h4>
            <div className={styles.wrapper}>
                <ul>
                    {mainRoles.map(mainRole => {

                        const { data } = useSearchDetails(mainRole.filmId);

                        return (
                            <li key={mainRole.filmId}>
                                <MoviePreview movie={data} />
                            </li>
                        )
                    })}
                </ul>
            </div>
        </>

    )
}

export default Filmography

