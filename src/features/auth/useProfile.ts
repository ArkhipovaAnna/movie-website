import { useQuery } from '@tanstack/react-query';
import { ProfileSchema } from '@/entities/user/schemas';
import { useAuthUserId } from '@/app/stores/use-auth-store';
import { supabase } from '@/shared/api/supabase';

const useProfile = () => {
    const userId = useAuthUserId();

    return useQuery({
        queryKey: ['profile', userId],
        enabled: userId !== null,
        queryFn: async () => {
            const { data, error } = await supabase
                .from('profiles') // выбирает таблицу
                .select('nickname, created_at, last_seen_at') // перечисляет нужные колонки: только три поля, а не всю строку
                .eq('id', userId!) // задаёт условие «id равен userId»
                .single(); // говорит: «я жду ровно одну строку». Если строк 0 или больше одной, Supabase вернёт ошибку.

            if (error) throw error;
            return ProfileSchema.parse(data);
        },
        staleTime: 1000 * 60 * 60,
    });
};

export default useProfile;
