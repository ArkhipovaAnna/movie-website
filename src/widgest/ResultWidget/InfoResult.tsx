import type { Movie } from "../../entities/movie/interfaces";
import Button from "../../shared/ui/Button/Button";
import styles from './InfoResult.module.scss';

interface SearchResultProps {
    data: Movie;
}

const InfoResult = ({ data }: SearchResultProps) => {
    return (
        <div className={styles.wrapper}>
            <h1>{data.nameRu}</h1>
            <p>{data.description}</p>
            <img src='/images/stars.svg' alt='Rating'></img>
            <Button onClick={(event) => event.preventDefault()}>Read more</Button>
            <Button
                onClick={(event) => event.preventDefault()}
                className={styles.specialButton}
            >
                Trailer
            </Button>
        </div>
    )
}

export default InfoResult