import { useQuery } from "@tanstack/react-query";
import { ActorSchema, type Actor } from "@/entities/movie/schemas";
import { apiGet } from "@/shared/api/client";

interface UseSearchActorReturn {
    data: Actor | undefined;
    isLoading: boolean;
    isError: boolean;
    error: Error | null;
}


const useSearchActor = (id: number): UseSearchActorReturn => {

    const { data, isLoading, isError, error } = useQuery({

        queryKey: ['actor', { id: id }],

        enabled: Number.isInteger(id) && id > 0,

        queryFn: ({ signal }) =>
            apiGet(`/api/v1/staff/${id}`, ActorSchema, {}, signal),

        staleTime: 1000 * 60 * 5,
    });

    return {
        data,
        isLoading,
        isError,
        error,
    };
};

export default useSearchActor