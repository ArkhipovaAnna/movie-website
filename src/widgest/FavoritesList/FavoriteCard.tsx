import { Link } from 'react-router';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import type { Favorite } from '@/entities/favorite/schemas';
import SafeImage from '@/shared/ui/SafeImage/SafeImage';
import styles from './FavoritesList.module.scss';

interface FavoriteCardProps {
    favorite: Favorite;
    onRemove: () => void;
}

const FavoriteCard = ({ favorite, onRemove }: FavoriteCardProps) => {
    const title = favorite.name ?? 'Без названия';

    return (
        <article className={styles.card}>
            <Link to={`/details/${favorite.filmId}`} className={styles.link}>
                <SafeImage src={favorite.posterUrl} alt="" className={styles.poster} />
                <h3 className={styles.title}>{title}</h3>
                {favorite.year !== null && <p className={styles.year}>{favorite.year}</p>}
            </Link>

            <IconButton
                onClick={onRemove}
                aria-label={`Убрать «${title}» из избранного`}
                className={styles.remove}
                sx={{ color: '#e53935' }}
            >
                <FavoriteIcon />
            </IconButton>
        </article>
    );
};

export default FavoriteCard;
