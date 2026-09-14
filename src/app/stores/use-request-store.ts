import { create, type StateCreator } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface IInitialState {
    request: string;
}

interface IActions {
    setRequest: (request: IInitialState['request']) => void;
}

interface IQueryState extends IInitialState, IActions { }

const initialState: IInitialState = {
    request: ''
};

const requestStore: StateCreator<
    IQueryState,
    [['zustand/persist', unknown]]
> = (set) => ({
    ...initialState,
    setRequest: (request) => set(() => ({ request })),
});

const useRequestStore = create<IQueryState>()(
    persist(requestStore, {
        name: 'request-storage',
        storage: createJSONStorage(() => sessionStorage)
    })
)

export const useRequest = () => useRequestStore((state) => state.request);
export const handleSetRequest = () => useRequestStore.getState().setRequest;