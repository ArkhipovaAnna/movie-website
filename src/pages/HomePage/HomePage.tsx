import Pagination from "../../shared/ui/Pagination/Pagination";
import MoviePreview from "../../shared/ui/MoviePreview/MoviePreview";
import useSearchFilms from "../../features/search/useSearchFilms";
import ContentWrapper from "../../shared/ui/ContentWrapper/ContentWrapper";
import styles from './HomePage.module.scss';

const HomePage = () => {

    const { movies, totalPages, isLoading } = useSearchFilms();

    const status =
        isLoading ? 'loading' :
            !movies ? 'fail' :
                movies.length === 0 ? 'empty' :
                    'success';

    return (
        <ContentWrapper status={status}>
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
    )
}

export default HomePage