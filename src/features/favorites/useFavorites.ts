import { useQuery } from '@tanstack/react-query';
import { FavoritesSchema } from '@/entities/favorite/schemas';
import { useAuthUserId } from '@/app/stores/use-auth-store';
import { supabase } from '@/shared/api/supabase';

const useFavorites = () => {
    const userId = useAuthUserId();

    return useQuery({
        queryKey: ['favorites', userId],
        enabled: userId !== null,
        queryFn: async () => {
            const { data, error } = await supabase
                .from('favorites')
                .select('film_id, name_ru, year, poster_url_preview, created_at')
                .eq('user_id', userId!)
                .order('created_at', { ascending: false });

            if (error) throw error;
            return FavoritesSchema.parse(data);
        },
        staleTime: 1000 * 60 * 60,
    });
};

export default useFavorites;
