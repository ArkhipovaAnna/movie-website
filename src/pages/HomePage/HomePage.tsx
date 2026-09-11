// import { Link } from "react-router"
import type { Movie } from "../../entities/movie/interfaces"
import { DotLoader } from "react-spinners"
import Pagination from "../../shared/ui/Pagination/Pagination"
import ArrowUp from "../../shared/ui/Arrows/ArrowUp"
import ArrowDown from "../../shared/ui/Arrows/ArrowDown"
import MoviePreview from "../../shared/ui/MoviePreview/MoviePreview"
import useSearch from "../../features/search/useSearch"
import styles from './HomePage.module.scss'

const HomePage = () => {

    const { movies, totalPages, isLoading } = useSearch();

    if (isLoading) {
        return (
            <div className={styles.loader}>
                <DotLoader size={90} color="#fdd510" />
            </div>
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