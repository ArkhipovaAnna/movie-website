import styles from './Poster.module.scss';

interface SearchResultProps {
    url: string;
}

const Poster = ({ url }: SearchResultProps) => {

    const isNoPoster = url === 'https://kinopoiskapiunofficial.tech/images/posters/kp/no-poster.png';

    return (
        <div className={styles.wrapper}>
            <img src={isNoPoster ? '/images/poster-placeholder.svg' : url} alt='Poster' />
        </div>
    )

}

export default Poster 