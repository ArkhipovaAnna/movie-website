import styles from './HomePage.module.scss';
import SearchForm from '../../widgest/SearchWidget/SearchForm';
import SearchResult from '../../widgest/ResultWidget/SearchResult';

const HomePage = () => {
    return (
        <div className={styles.wrapper}>
            <SearchForm />
            <SearchResult />
        </div>
    )
}

export default HomePage;