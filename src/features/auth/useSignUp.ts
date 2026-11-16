import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/shared/api/supabase';
import { NicknameTakenError } from './errors';

interface SignUpInput {
    nickname: string;
    email: string;
    password: string;
}

const useSignUp = () =>
    useMutation({
        mutationFn: async ({ nickname, email, password }: SignUpInput) => {
            // 1. Быстрая проверка, чтобы дать человеку понятное сообщение про ник.
            const { data: available, error: checkError } = await supabase.rpc( // supabase.rpc вызывает функцию is_nickname_available в базе Postgres, которая возвращает true или false
                'is_nickname_available',
                { nick: nickname }, // это аргументы функции. Ключ nick должен точно совпадать с именем параметра в SQL-функции
            );
            if (checkError) throw checkError;
            if (available !== true) throw new NicknameTakenError();

            // 2. Регистрация. Ник уходит в метаданные, из них его возьмёт триггер в базе.
            const { data, error } = await supabase.auth.signUp({ // signUp создаёт пользователя в системе авторизации Supabase (таблица auth.users)
                email,
                password,
                options: { data: { nickname } },
            });
            if (error) throw error;

            // Если подтверждение почты включено, сессии нет до перехода по ссылке из письма.
            return { needsEmailConfirmation: data.session === null };
        },
    });

export default useSignUp;

// Функция 'is_nickname_available' выглядит следующим образом:
// select not exists (select 1 from public.profiles where lower(nickname) = lower(nick));
