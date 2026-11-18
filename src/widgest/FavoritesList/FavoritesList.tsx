import { Link } from 'react-router';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import useFavorites from '@/features/favorites/useFavorites';
import useToggleFavorite from '@/features/favorites/useToggleFavorite';
import getFavoritesErrorMessage from '@/features/favorites/getFavoritesErrorMessage';
import Loader from '@/shared/ui/Loader/Loader';
import FavoriteCard from './FavoriteCard';
import { handleSetRequest } from '@/app/stores/use-request-store';
import { handleSetCurrentPage } from '@/app/stores/use-currentPage-store';
import { handleSetSearchFormValue } from '@/app/stores/use-searchFormValue-store';
import styles from './FavoritesList.module.scss';

const FavoritesList = () => {
    const { data: favorites, isLoading, isError } = useFavorites();
    const toggle = useToggleFavorite();

    const renderContent = () => {
        if (isLoading) return <Loader />;

        if (isError || !favorites) {
            return <p className={styles.message}>Не удалось загрузить избранное. Обновите страницу.</p>;
        }

        if (favorites.length === 0) {

            const setRequest = handleSetRequest();
            const setCurrentPage = handleSetCurrentPage();
            const setSearchFormValue = handleSetSearchFormValue();

            const handlerClick = () => {
                setRequest('')
                setCurrentPage(1)
                setSearchFormValue('')
            }

            return (
                <p className={styles.message}>
                    В избранном пока ничего нет. <Link to="/" onClick={handlerClick}>Найдите фильм</Link> и нажмите на сердечко.
                </p>
            );
        }

        return (
            <ul className={styles.list}>
                {favorites.map((favorite) => (
                    <li key={favorite.filmId}>
                        <FavoriteCard
                            favorite={favorite}
                            onRemove={() => toggle.mutate({ film: favorite, isFavorite: true })}
                        />
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <>
            {renderContent()}

            <Snackbar
                open={toggle.isError}
                autoHideDuration={4000}
                onClose={(_event, reason) => {
                    if (reason !== 'clickaway') toggle.reset();
                }}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert severity="error" variant="filled" onClose={() => toggle.reset()}>
                    {getFavoritesErrorMessage(toggle.error)}
                </Alert>
            </Snackbar>
        </>
    );
};

export default FavoritesList;
