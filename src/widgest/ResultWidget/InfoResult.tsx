import type { Details } from "@/entities/movie/interfaces";
import Information from "@/shared/ui/Information/Information";
import Rating from "@/shared/ui/Rating/Rating";
import styles from './InfoResult.module.scss';

interface SearchResultProps {
    data: Details;
}

const InfoResult = ({ data }: SearchResultProps) => {

    if (data === undefined) return;

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <h2>{data.nameRu || data.nameEn}</h2>
                <Rating rating={data.ratingKinopoisk} />
            </div>
            <Information movie={data} />
        </div>
    )
}

export default InfoResult