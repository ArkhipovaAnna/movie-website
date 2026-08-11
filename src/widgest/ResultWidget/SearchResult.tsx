import Button from "../../shared/ui/Button/Button";
import styles from './SearchResult.module.scss';

const SearchResult = () => {
    return (
        <div className={styles.wrapper}>
            <h1>Movie title</h1>
            <p>Film synopsis</p>
            <img src='/images/stars.svg' alt='Rating'></img>
            <Button>Watch now</Button>
            <Button>Trailer</Button>
        </div>
    )
}

export default SearchResult