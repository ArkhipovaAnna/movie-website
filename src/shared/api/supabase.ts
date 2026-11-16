import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
    throw new Error('Не заданы переменные VITE_SUPABASE_URL и VITE_SUPABASE_ANON_KEY');
}

// Сессию (токены) сохраняет и обновляет сама библиотека, в свой стор её не копируем.
export const supabase = createClient(url, anonKey);
