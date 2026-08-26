import styles from './Poster.module.scss';
import type { Movie } from "../../entities/movie/interfaces";

interface SearchResultProps {
    data: Movie | null;
}


const Poster = ({ data }: SearchResultProps) => {

    if (data !== null) {
        return (
            <div className={styles.wrapper}>
                <img src={data.posterUrl} alt='Poster'></img>
            </div>
        )
    }
}

export default Poster 