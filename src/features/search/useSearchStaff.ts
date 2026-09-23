import { useQuery } from "@tanstack/react-query";
import type { Staff } from "../../entities/movie/interfaces";

interface UseSearchStaffReturn {
    data: Staff[];
    isLoading: boolean;
    isError: boolean;
}

const key = import.meta.env.VITE_KINOPOISK_KEY;

const useSearchStaff = (id: number): UseSearchStaffReturn => {

    const { data, isLoading, isError } = useQuery({

        queryKey: ['staff', { id: id }],

        queryFn: async () => {
            const headers = {
                'X-API-KEY': key,
                'Content-Type': 'application/json',
            };

            const res = await fetch(
                `https://kinopoiskapiunofficial.tech/api/v1/staff?filmId=${id}`,
                { method: 'GET', headers }
            );
            if (!res.ok) throw new Error('Bad Request');

            const json = await res.json();
            const actors = json
                .filter((person: Staff) => person.professionKey === 'ACTOR')
                .slice(0, 15);

            return actors;
        },

        staleTime: 1000 * 60 * 5,
    });

    return {
        data,
        isLoading,
        isError,
    };
};

export default useSearchStaff
