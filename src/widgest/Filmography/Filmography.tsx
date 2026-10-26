import { useEffect, useState } from "react";
import { useIsFetching } from "@tanstack/react-query";
import type { IFilmographyItem } from "@/entities/movie/interfaces";
import FilmographyItem from "@/shared/ui/FilmographyItem/FilmographyItem";
import useInView from "@/shared/hooks/useInView";
import styles from './Filmography.module.scss';

interface FilmographyProps {
    films: IFilmographyItem[];
}

const BATCH_SIZE = 5;

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

    const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
    const { ref, inView } = useInView<HTMLDivElement>('300px');

    // true, пока хотя бы одна карточка фильма ещё загружается
    const isFetching = useIsFetching({ queryKey: ['details'] }) > 0;

    const hasMore = visibleCount < mainRoles.length;

    useEffect(() => {
        if (inView && !isFetching && hasMore) {
            setVisibleCount((count) => count + BATCH_SIZE);
        }
    }, [inView, isFetching, hasMore]);

    return (
        <>
            <h4 className={styles.header}>Фильмография</h4>
            <div>
                <ul>
                    {mainRoles.slice(0, visibleCount).map(mainRole => {
                        return (
                            <li key={mainRole.filmId}>
                                <FilmographyItem filmId={mainRole.filmId} />
                            </li>
                        )
                    })}
                </ul>
                {hasMore && <div ref={ref} className={styles.sentinel} />}
            </div>
        </>

    )
}

export default Filmography
