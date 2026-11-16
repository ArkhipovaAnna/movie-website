import { useEffect } from 'react';
import { useAuthStatus } from '@/app/stores/use-auth-store';
import { useAuthDialogOpen } from '@/app/stores/use-auth-dialog-store';
import {
    getPendingFavoriteActions,
    useHasPendingFavorite,
} from '@/app/stores/use-pending-favorite-store';
import useFavorites from './useFavorites';
import useToggleFavorite from './useToggleFavorite';

// Ничего не рисует. Выполняет отложенное «в избранное» после входа гостя.
const PendingFavoriteApplier = () => {
    const status = useAuthStatus();
    const isDialogOpen = useAuthDialogOpen();
    const hasPending = useHasPendingFavorite();
    const { data: favorites } = useFavorites();
    const { mutate } = useToggleFavorite();

    // Окно закрыли, так и не войдя: забываем отложенное действие.
    useEffect(() => {
        if (!isDialogOpen && status === 'guest') {
            getPendingFavoriteActions().clearPending();
        }
    }, [isDialogOpen, status]);

    // Вошли и список избранного загружен: добавляем запомненный фильм.
    useEffect(() => {
        if (status !== 'authed' || !hasPending || !favorites) return;

        const film = getPendingFavoriteActions().takePending();
        if (!film) return;

        if (favorites.some((f) => f.filmId === film.filmId)) return;
        mutate({ film, isFavorite: false });
    }, [status, hasPending, favorites, mutate]);

    return null;
};

export default PendingFavoriteApplier;

// const { mutate } = useToggleFavorite();
// mutate — это функция, которая запускает мутацию «добавить или убрать из избранного», описанную в useToggleFavorite.
// Цепочка такая:

//1. useToggleFavorite возвращает результат useMutation(...)
//2. useMutation возвращает объект с состоянием и функциями: mutate, mutateAsync, isPending, isError, error, data, variables, reset и т.д. Мы разбирали этот список в разговоре про useMutation.
//3. Деструктуризация { mutate } достаёт из этого объекта только одно поле, функцию mutate. Всё остальное этому компоненту не нужно: он ничего не рисует, а значит, статусы загрузки и ошибки ему ни к чему.

// Когда в эффекте выполняется mutate({ film, isFavorite: false }); запускается вся цепочка из useToggleFavorite:
// 1. onMutate — отмена загрузок, снимок, фильм оптимистично добавлен в кэш;
// 2. mutationFn — isFavorite: false, значит, ветка insert в таблицу favorites;
// 3. onError при ошибке — откат к снимку;
// 4. onSettled — сверка с сервером, если это последняя мутация лайков.