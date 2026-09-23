import { useQuery } from "@tanstack/react-query";
import type { Actor } from "../../entities/movie/interfaces";

interface UseSearchActorReturn {
    data: Actor;
    isLoading: boolean;
    isError: boolean;
}

const key = import.meta.env.VITE_KINOPOISK_KEY;

const useSearchActor = (id: number): UseSearchActorReturn => {

    const { data, isLoading, isError } = useQuery({

        queryKey: ['actor', { id: id }],

        queryFn: async () => {
            const headers = {
                'X-API-KEY': key,
                'Content-Type': 'application/json',
            };

            const res = await fetch(
                `https://kinopoiskapiunofficial.tech/api/v1/staff/${id}`,
                { method: 'GET', headers }
            );
            if (!res.ok) throw new Error('Bad Request');

            const json = await res.json();

            return json;
        },

        staleTime: 1000 * 60 * 5,
    });

    return {
        data,
        isLoading,
        isError,
    };
};

export default useSearchActor