import { useQuery } from "@tanstack/react-query";
import { DetailsSchema, type Details } from "@/entities/movie/schemas";
import { apiGet } from "@/shared/api/client";

interface UseSearchDetailsReturn {
    data: Details | undefined;
    isLoading: boolean;
    isError: boolean;
    error: Error | null;
}

const useSearchDetails = (id: number): UseSearchDetailsReturn => {

    const { data, isLoading, isError, error } = useQuery({

        queryKey: ['details', { id: id }],

        enabled: Number.isInteger(id) && id > 0,

        queryFn: ({ signal }) =>
            apiGet(`/api/v2.2/films/${id}`, DetailsSchema, {}, signal),

        staleTime: 1000 * 60 * 60,
    });

    return {
        data,
        isLoading,
        isError,
        error,
    };
};

export default useSearchDetails
