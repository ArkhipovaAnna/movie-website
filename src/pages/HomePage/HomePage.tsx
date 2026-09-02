// import { Link } from "react-router"
import type { Movie } from "../../entities/movie/interfaces"
import { DotLoader } from "react-spinners"
import Pagination from "../../shared/ui/Pagination/Pagination"
import MoviePreview from "../../shared/ui/MoviePreview/MoviePreview"
import styles from './HomePage.module.scss'

interface HomePageProps {
    movies: Movie[] | null | 'Not found';
    pages: number;
    page: number;
    onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}


const HomePage = ({ movies, pages, page, onChange }: HomePageProps) => {

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
                    <ul>
                        {movies.map(movie => (
                            <li key={movie.filmId || movie.kinopoiskId}><MoviePreview movie={movie} /></li>
                        ))}
                    </ul>
                </div>
                <Pagination count={pages} page={page} onChange={onChange} />
            </div>
        )
    }

}

export default HomePage