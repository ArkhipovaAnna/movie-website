import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Favorite, FavoriteInput } from '@/entities/favorite/schemas';
import { useAuthUserId } from '@/app/stores/use-auth-store';
import { supabase } from '@/shared/api/supabase';

const MUTATION_KEY = ['toggleFavorite'];
// Код ошибки Postgres «нарушена уникальность»: такая строка в избранном уже есть.
const UNIQUE_VIOLATION = '23505';

interface ToggleInput {
    film: FavoriteInput;
    isFavorite: boolean; // состояние до нажатия
}

const useToggleFavorite = () => {
    const queryClient = useQueryClient();
    const userId = useAuthUserId();
    const queryKey = ['favorites', userId];

    return useMutation({
        mutationKey: MUTATION_KEY,

        mutationFn: async ({ film, isFavorite }: ToggleInput) => {
            if (!userId) throw new Error('Not authenticated');

            if (isFavorite) {
                const { error } = await supabase
                    .from('favorites')
                    .delete()
                    .eq('user_id', userId)
                    .eq('film_id', film.filmId);
                if (error) throw error;
                return;
            }

            const { error } = await supabase.from('favorites').insert({
                user_id: userId,
                film_id: film.filmId,
                name_ru: film.name,
                year: film.year,
                poster_url_preview: film.posterUrl,
            });
            if (error && error.code !== UNIQUE_VIOLATION) throw error;
        },

        // Оптимистичное обновление: меняем кэш сразу, не дожидаясь ответа сервера.
        onMutate: async ({ film, isFavorite }) => {
            await queryClient.cancelQueries({ queryKey });
            const previous = queryClient.getQueryData<Favorite[]>(queryKey);

            queryClient.setQueryData<Favorite[]>(queryKey, (old = []) =>
                isFavorite
                    ? old.filter((f) => f.filmId !== film.filmId)
                    : [
                        {
                            filmId: film.filmId,
                            name: film.name,
                            year: film.year,
                            posterUrl: film.posterUrl,
                            createdAt: new Date().toISOString(),
                        },
                        ...old,
                    ],
            );

            return { previous };
        },

        // При ошибке возвращаем список, каким он был.
        onError: (_error, _variables, context) => {
            if (context?.previous) {
                queryClient.setQueryData(queryKey, context.previous);
            }
        },

        // После завершения сверяемся с сервером (но не пока идут другие такие же мутации).
        onSettled: () => {
            if (queryClient.isMutating({ mutationKey: MUTATION_KEY }) === 1) {
                void queryClient.invalidateQueries({ queryKey });
            }
        },
    });
};

export default useToggleFavorite;

// СМ РАЗБОР ЭТОГО ХУКА 