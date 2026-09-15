import styles from './Poster.module.scss';
import type { Details } from "../../entities/movie/interfaces";

interface SearchResultProps {
    data: Details;
}

const Poster = ({ data }: SearchResultProps) => {

    if (data !== null) {

        const isNoPoster = data.posterUrl === 'https://kinopoiskapiunofficial.tech/images/posters/kp/no-poster.png';

        return (
            <div className={styles.wrapper}>
                <img src={isNoPoster ? '/images/poster-placeholder.svg' : data.posterUrl} alt='Poster' />
            </div>
        )
    }
}

export default Poster 