import { useMemo } from 'react';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useAuthStatus } from '@/app/stores/use-auth-store';
import { getAuthDialogActions } from '@/app/stores/use-auth-dialog-store';
import { getPendingFavoriteActions } from '@/app/stores/use-pending-favorite-store';
import useFavorites from '../useFavorites';
import useToggleFavorite from '../useToggleFavorite';
import getFavoritesErrorMessage from '../getFavoritesErrorMessage';
import { toFavoriteInput, type FilmLike } from '../toFavoriteInput';

interface FavoriteButtonProps {
    movie: FilmLike;
}

const FavoriteButton = ({ movie }: FavoriteButtonProps) => {
    const status = useAuthStatus();
    const { data: favorites, isLoading, isError } = useFavorites();
    const toggle = useToggleFavorite();

    const film = useMemo(() => toFavoriteInput(movie), [movie]);

    if (!film) return null;

    const isFavorite = favorites?.some((f) => f.filmId === film.filmId) ?? false;
    const isAuthed = status === 'authed';

    const isDisabled =
        status === 'loading' ||
        toggle.isPending ||
        (isAuthed && (isLoading || isError));

    const handleClick = () => {
        if (!isAuthed) {
            getPendingFavoriteActions().setPending(film);
            getAuthDialogActions().open('signIn');
            return;
        }
        toggle.mutate({ film, isFavorite });
    };

    return (
        <>
            <IconButton
                onClick={handleClick}
                disabled={isDisabled}
                aria-pressed={isFavorite}
                aria-label='В избранное'
                sx={{ color: isFavorite ? '#e53935' : '#eceff1' }}
            >
                {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>

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

export default FavoriteButton;
