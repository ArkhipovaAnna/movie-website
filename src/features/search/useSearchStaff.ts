import { useQuery } from "@tanstack/react-query";
import { StaffListSchema, type Staff } from "@/entities/movie/schemas";
import { apiGet } from "@/shared/api/client";

interface UseSearchStaffReturn {
    data: Staff[] | undefined;
    isLoading: boolean;
    isError: boolean;
}

const useSearchStaff = (id: number): UseSearchStaffReturn => {

    const { data, isLoading, isError } = useQuery({

        queryKey: ['staff', { id: id }],

        enabled: Number.isInteger(id) && id > 0,

        queryFn: async ({ signal }) => {

            const people = await apiGet('/api/v1/staff', StaffListSchema, { filmId: id }, signal);

            return people
                .filter((person) => person.professionKey === 'ACTOR')
                .slice(0, 15);
        },

        staleTime: 1000 * 60 * 60,
    });

    return {
        data,
        isLoading,
        isError,
    };
};

export default useSearchStaff
