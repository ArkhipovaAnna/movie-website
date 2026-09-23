import { create, type StateCreator } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface IInitialState {
    searchFormValue: string;
}

interface IActions {
    setSearchFormValue: (searchFormValue: IInitialState['searchFormValue']) => void;
}

interface ISearchFormValueState extends IInitialState, IActions { }

const initialState: IInitialState = {
    searchFormValue: ''
};

const searchFormValueStore: StateCreator<
    ISearchFormValueState,
    [['zustand/persist', unknown]]
> = (set) => ({
    ...initialState,
    setSearchFormValue: (searchFormValue) => set(() => ({ searchFormValue })),
});

const useSearchFormValueStore = create<ISearchFormValueState>()(
    persist(searchFormValueStore, {
        name: 'searchFormValue-storage',
        storage: createJSONStorage(() => sessionStorage)
    })
)

export const useSearchFormValue = () => useSearchFormValueStore((state) => state.searchFormValue);
export const handleSetSearchFormValue = () => useSearchFormValueStore.getState().setSearchFormValue;