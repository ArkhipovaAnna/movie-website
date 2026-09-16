import Pagination from "../../shared/ui/Pagination/Pagination";
import ArrowUp from "../../shared/ui/Arrows/ArrowUp";
import ArrowDown from "../../shared/ui/Arrows/ArrowDown";
import MoviePreview from "../../shared/ui/MoviePreview/MoviePreview";
import useSearchFilms from "../../features/search/useSearchFilms";
import ContentWrapper from "../../shared/ui/ContentWrapper/ContentWrapper";
import styles from './HomePage.module.scss';

const HomePage = () => {

    const { movies, totalPages, isLoading } = useSearchFilms();

    const status =
        isLoading ? 'loading' :
            !movies || movies.length === 0 ? 'fail' :
                'success';

    return (
        <div className={styles.container}>
            <ContentWrapper status={status} style={{ gridColumn: 2 }}>
                <div className={styles.wrapper}>
                    <div className={styles.list}>
                        <ul>
                            {movies?.map(movie => (
                                <li key={movie.filmId || movie.kinopoiskId}>
                                    <MoviePreview movie={movie} />
                                </li>
                            ))}
                        </ul>
                    </div>
                    <Pagination count={totalPages} />
                </div>
            </ContentWrapper>
            <div className={styles.arrows}>
                <ArrowUp />
                <ArrowDown />
            </div>
        </div>
    )
}

export default HomePage