import { useQuery } from "@tanstack/react-query";
import { VideosResponseSchema } from "@/entities/movie/schemas";
import { apiGet } from "@/shared/api/client";
import { pickTrailer, type Trailer } from "@/shared/helpers/youtube";

interface UseSearchVideosReturn {
    trailer: Trailer | null | undefined;
    isLoading: boolean;
    isError: boolean;
}

const useSearchVideos = (id: number): UseSearchVideosReturn => {

    const { data, isLoading, isError } = useQuery({

        queryKey: ['videos', { id: id }],

        enabled: Number.isInteger(id) && id > 0,

        queryFn: async ({ signal }) => {
            const { items } = await apiGet(`/api/v2.2/films/${id}/videos`, VideosResponseSchema, {}, signal);
            return pickTrailer(items);
        },

        staleTime: 1000 * 60 * 60,
    });

    return {
        trailer: data,
        isLoading,
        isError,
    };
};

export default useSearchVideos
