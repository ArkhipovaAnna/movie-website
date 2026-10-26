import SafeImage from '@/shared/ui/SafeImage/SafeImage';
import styles from './Poster.module.scss';

interface SearchResultProps {
    url: string;
}

const Poster = ({ url }: SearchResultProps) => {

    return (
        <div className={styles.wrapper}>
            <SafeImage src={url} alt='Poster' />
        </div>
    )

}

export default Poster 