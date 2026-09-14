import { create, type StateCreator } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface IInitialState {
    currentPage: number;
}

interface IActions {
    setCurrentPage: (currentPage: IInitialState['currentPage']) => void;
}

interface ICurrentPageState extends IInitialState, IActions { }

const initialState: IInitialState = {
    currentPage: 1
};

const currentPageStore: StateCreator<
    ICurrentPageState,
    [['zustand/persist', unknown]]
> = (set) => ({
    ...initialState,
    setCurrentPage: (currentPage) => set(() => ({ currentPage })),
});

const useCurrentPageStore = create<ICurrentPageState>()(
    persist(currentPageStore, {
        name: 'currentPage-storage',
        storage: createJSONStorage(() => sessionStorage)
    })
)

export const useCurrentPage = () => useCurrentPageStore((state) => state.currentPage);
export const handleSetCurrentPage = () => useCurrentPageStore.getState().setCurrentPage;

/* export const useCurrentPage = {
    currentPage: () => useCurrentPageStore((state) => state.currentPage),
    setCurrentPage: () => useCurrentPageStore.getState().setCurrentPage
};

const { currentPage , setCurrentPage } = useCurrentPage() */