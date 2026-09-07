// import { Link } from "react-router"
import type { Movie } from "../../entities/movie/interfaces"
import { DotLoader } from "react-spinners"
import Pagination from "../../shared/ui/Pagination/Pagination"
import { ArrowDown, ArrowUp } from "../../shared/ui/Arrows/Arrows"
import MoviePreview from "../../shared/ui/MoviePreview/MoviePreview"
import styles from './HomePage.module.scss'

interface HomePageProps {
    movies: Movie[] | null | 'Not found';
    totalPages: number;
    currentPage: number;
    onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}


const HomePage = ({ movies, totalPages, currentPage, onChange }: HomePageProps) => {

    if (movies === "Not found") {
        return (
            <div className={styles.notFound}>
                <p>Nothing was found☹️</p>
                <p>Here is what might interest you...</p>
            </div>
        )
    } else if (movies === null) {
        return (
            <div className={styles.loader}>
                <DotLoader size={90} color="#fdd510" />
            </div>
        )

    } else {
        return (
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <div className={styles.list}>
                        <ul>
                            {movies.map(movie => (
                                <li key={movie.filmId || movie.kinopoiskId}><MoviePreview movie={movie} /></li>
                            ))}
                        </ul>
                    </div>
                    <Pagination count={totalPages} currentPage={currentPage} onChange={onChange} />
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