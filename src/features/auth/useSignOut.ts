import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/shared/api/supabase';

const useSignOut = () =>
    useMutation({
        mutationFn: async () => {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
        },
    });

export default useSignOut;
