// import { Link } from "react-router"
import type { Movie } from "../../entities/movie/interfaces"
import { DotLoader } from "react-spinners"
import styles from './HomePage.module.scss'

interface HomePageProps {
    data: Movie[] | null | 'Not found';
}


const HomePage = ({ data }: HomePageProps) => {

    if (data === "Not found") {
        return (
            <div className={styles.notFound}>
                <p>Nothing was found☹️</p>
                <p>Here is what might interest you...</p>
            </div>
        )
    } else if (data === null) {
        return (
            <div className={styles.loader}>
                <DotLoader size={90} color="#fdd510" />
            </div>
        )

    } else {
        return (
            <div className={styles.wrapper}>
                <ul>
                    {data.map(movie => (
                        <li key={movie.filmId}>{movie.nameRu || movie.nameEn}</li>
                    ))}
                </ul>
            </div>
        )
    }

}

export default HomePage;