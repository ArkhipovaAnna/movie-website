import InfoResult from "./InfoResult";
import Poster from "./Poster";
import type { Movie } from "../../entities/movie/interfaces";
import styles from './SearchResult.module.scss';

interface SearchResultProps {
    data: Movie;
}

const SearchResult = ({ data }: SearchResultProps) => {

    return (
        <div className={styles.wrapper}>
            <Poster data={data} />
            <InfoResult data={data} />
        </div>

    )
}

export default SearchResult