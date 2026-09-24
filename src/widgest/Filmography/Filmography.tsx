import type { IFilmographyItem } from "@/entities/movie/interfaces";
import FilmographyItem from "@/shared/ui/FilmographyItem/FilmographyItem";
import styles from './Filmography.module.scss';

interface FilmographyProps {
    films: IFilmographyItem[];
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
            <h4 className={styles.header}>Фильмография</h4>
            <div>
                <ul>
                    {mainRoles.map(mainRole => {
                        return (
                            <li key={mainRole.filmId}>
                                <FilmographyItem filmId={mainRole.filmId} />
                            </li>
                        )
                    })}
                </ul>
            </div>
        </>

    )
}

export default Filmography

