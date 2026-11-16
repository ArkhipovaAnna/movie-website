import type { Details } from "@/entities/movie/interfaces";
import Information from "@/shared/ui/Information/Information";
import Rating from "@/shared/ui/Rating/Rating";
import FavoriteButton from "@/features/favorites/FavoriteButton/FavoriteButton";
import styles from './InfoResult.module.scss';

interface SearchResultProps {
    data: Details;
}

const InfoResult = ({ data }: SearchResultProps) => {

    if (data === undefined) return null;

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <h2>{data.nameRu || data.nameEn}</h2>
                <div className={styles.actions}>
                    <Rating rating={data.ratingKinopoisk} />
                    <FavoriteButton movie={data} />
                </div>
            </div>
            <Information movie={data} />
        </div>
    )
}

export default InfoResult