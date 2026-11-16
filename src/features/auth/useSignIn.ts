import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/shared/api/supabase';

interface SignInInput {
    email: string;
    password: string;
}

const useSignIn = () =>
    useMutation({
        mutationFn: async ({ email, password }: SignInInput) => {
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) throw error;
        },
    });

export default useSignIn;
