import { useQuery } from "@tanstack/react-query";
import type { Details } from "@/entities/movie/interfaces";

interface UseSearchDetailsReturn {
    data: Details;
    isLoading: boolean;
    isError: boolean;
}

const key = import.meta.env.VITE_KINOPOISK_KEY;

const useSearchDetails = (id: number): UseSearchDetailsReturn => {

    const { data, isLoading, isError } = useQuery({

        queryKey: ['details', { id: id }],

        queryFn: async () => {
            const headers = {
                'X-API-KEY': key,
                'Content-Type': 'application/json',
            };

            const res = await fetch(
                `https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`,
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

export default useSearchDetails
