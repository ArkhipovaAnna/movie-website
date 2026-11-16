import { create } from 'zustand';

export type AuthStatus = 'loading' | 'guest' | 'authed';

interface IAuthUser {
    id: string;
    email: string | null;
}

interface IInitialState {
    status: AuthStatus;
    userId: string | null;
    email: string | null;
    previousVisit: string | null;
}

interface IActions {
    setUser: (user: IAuthUser | null) => void;
    setPreviousVisit: (previousVisit: IInitialState['previousVisit']) => void;
}

interface IAuthState extends IInitialState, IActions { }

const initialState: IInitialState = {
    status: 'loading',
    userId: null,
    email: null,
    previousVisit: null,
};

const useAuthStore = create<IAuthState>()((set) => ({
    ...initialState,
    setUser: (user) =>
        set(() =>
            user
                ? { status: 'authed', userId: user.id, email: user.email }
                : { status: 'guest', userId: null, email: null, previousVisit: null },
        ),
    setPreviousVisit: (previousVisit) => set(() => ({ previousVisit })),
}));

export const useAuthStatus = () => useAuthStore((state) => state.status);
export const useAuthUserId = () => useAuthStore((state) => state.userId);
export const useAuthEmail = () => useAuthStore((state) => state.email);
export const usePreviousVisit = () => useAuthStore((state) => state.previousVisit);
export const getAuthActions = () => useAuthStore.getState();
