import { create } from 'zustand';

export type AuthMode = 'signIn' | 'signUp';

interface IInitialState {
    isOpen: boolean;
    mode: AuthMode;
}

interface IActions {
    open: (mode?: AuthMode) => void;
    close: () => void;
    setMode: (mode: AuthMode) => void;
}

interface IAuthDialogState extends IInitialState, IActions { }

const initialState: IInitialState = {
    isOpen: false,
    mode: 'signIn',
};

const useAuthDialogStore = create<IAuthDialogState>()((set) => ({
    ...initialState,
    open: (mode = 'signIn') => set(() => ({ isOpen: true, mode })),
    close: () => set(() => ({ isOpen: false })),
    setMode: (mode) => set(() => ({ mode })),
}));

export const useAuthDialogOpen = () => useAuthDialogStore((state) => state.isOpen);
export const useAuthDialogMode = () => useAuthDialogStore((state) => state.mode);
export const getAuthDialogActions = () => useAuthDialogStore.getState();
