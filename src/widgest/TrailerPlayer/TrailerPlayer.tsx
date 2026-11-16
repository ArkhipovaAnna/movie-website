import { useState } from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import useSearchVideos from '@/features/search/useSearchVideos';
import SafeImage from '@/shared/ui/SafeImage/SafeImage';
import styles from './TrailerPlayer.module.scss';

interface TrailerPlayerProps {
    filmId: number;
}

const TrailerPlayer = ({ filmId }: TrailerPlayerProps) => {

    const [isPlaying, setIsPlaying] = useState(false);
    const { trailer, isError } = useSearchVideos(filmId);

    const kinopoiskUrl = `https://www.kinopoisk.ru/film/${filmId}/`;

    const renderContent = () => {

        if (isError || trailer === null) {
            return (
                <div className={styles.fallback}>
                    <p>Трейлер для этого фильма недоступен.</p>
                    <a className={styles.link} href={kinopoiskUrl} target="_blank" rel="noopener noreferrer">
                        Открыть на Кинопоиске
                    </a>
                </div>
            );
        }

        if (trailer === undefined) {
            return <div className={styles.frame}>Загрузка трейлера…</div>;
        }

        return (
            <div className={styles.frame}>
                {isPlaying ? (
                    <iframe
                        className={styles.iframe}
                        src={`https://www.youtube-nocookie.com/embed/${trailer.id}?autoplay=1&rel=0`}
                        title={trailer.name || 'Трейлер'}
                        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                        allowFullScreen
                        referrerPolicy="strict-origin-when-cross-origin"
                    />
                ) : (
                    <button
                        type="button"
                        className={styles.facade}
                        onClick={() => setIsPlaying(true)}
                        aria-label={trailer.name ? `Смотреть трейлер: ${trailer.name}` : 'Смотреть трейлер'}
                    >
                        <SafeImage
                            className={styles.thumbnail}
                            src={`https://i.ytimg.com/vi/${trailer.id}/hqdefault.jpg`}
                            alt=""
                        />
                        <span className={styles.play}>
                            <PlayArrowIcon fontSize="large" />
                        </span>
                    </button>
                )}
            </div>
        );
    };

    return (
        <section className={styles.section}>
            <h4 className={styles.heading}>Трейлер</h4>
            {renderContent()}
        </section>
    );
}

export default TrailerPlayer

