import { create } from 'zustand';
import type { FavoriteInput } from '@/entities/favorite/schemas';

interface IInitialState {
    pending: FavoriteInput | null;
}

interface IActions {
    setPending: (film: FavoriteInput) => void;
    takePending: () => FavoriteInput | null;
    clearPending: () => void;
}

interface IPendingFavoriteState extends IInitialState, IActions { }

const initialState: IInitialState = {
    pending: null,
};

const usePendingFavoriteStore = create<IPendingFavoriteState>()((set, get) => ({
    ...initialState,
    setPending: (film) => set(() => ({ pending: film })),
    // Достаёт фильм и сразу очищает хранилище, чтобы действие выполнилось ровно один раз.
    takePending: () => {
        const film = get().pending;
        set(() => ({ pending: null }));
        return film;
    },
    clearPending: () => set(() => ({ pending: null })),
}));

export const useHasPendingFavorite = () => usePendingFavoriteStore((state) => state.pending !== null);
export const getPendingFavoriteActions = () => usePendingFavoriteStore.getState();
