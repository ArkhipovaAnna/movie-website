import Pagination from "../../shared/ui/Pagination/Pagination";
import ArrowUp from "../../shared/ui/Arrows/ArrowUp";
import ArrowDown from "../../shared/ui/Arrows/ArrowDown";
import MoviePreview from "../../shared/ui/MoviePreview/MoviePreview";
import useSearchFilms from "../../features/search/useSearchFilms";
import Loader from "../../shared/ui/Loader/Loader";
import styles from './HomePage.module.scss';

const HomePage = () => {

    const { movies, totalPages, isLoading } = useSearchFilms();

    if (isLoading) {
        return (
            <Loader />
        )
    } else if (movies === "Not found") {

        return (
            <div className={styles.notFound}>
                <p>Nothing was found☹️</p>
                <p>Here is what might interest you...</p>
            </div>
        )

    } else {
        return (
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <div className={styles.list}>
                        <ul>
                            {movies?.map(movie => (
                                <li key={movie.filmId || movie.kinopoiskId}><MoviePreview movie={movie} /></li>
                            ))}
                        </ul>
                    </div>
                    <Pagination count={totalPages} />
                </div>
                <div className={styles.arrows}>
                    <ArrowUp />
                    <ArrowDown />
                </div>
            </div>
        )
    }

}

export default HomePage