import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { getAuthActions, useAuthUserId } from '@/app/stores/use-auth-store';
import { supabase } from '@/shared/api/supabase';
import useProfile from './useProfile';

const PREVIOUS_VISIT_KEY = 'previous-visit';

export const useAuthSession = () => {
    const queryClient = useQueryClient();
    const userId = useAuthUserId();
    const { data: profile } = useProfile();

    // 1. Следим за сессией. Событие INITIAL_SESSION приходит сразу после подписки:
    //    с сессией (если вход был сохранён) или с null (гость).
    useEffect(() => {
        const { data } = supabase.auth.onAuthStateChange((event, session) => { // onAuthStateChange — это «прослушка» событий авторизации Supabase. Колбэк вызывается каждый раз, когда что-то происходит с сессией.
            // В этом колбэке не вызываем методы Supabase с await (риск зависания),
            // только синхронно обновляем стор.
            if (event === 'SIGNED_OUT') {
                queryClient.clear();
            }

            getAuthActions().setUser(
                session?.user ? { id: session.user.id, email: session.user.email ?? null } : null,
            );
        });

        return () => data.subscription.unsubscribe();
    }, [queryClient]);

    // 2. Когда профиль загружен: запоминаем предыдущий визит и обновляем дату.
    //    Порядок важен: сначала читаем старую дату, потом обновляем.
    useEffect(() => {
        if (!userId || !profile) return;

        const key = `${PREVIOUS_VISIT_KEY}:${userId}`;

        let stored: string | null = null;
        try {
            stored = sessionStorage.getItem(key);
        } catch {
            // sessionStorage недоступен: работаем без него
        }

        // Уже обработано в этой вкладке (например, страницу обновили).
        // Значение берём из sessionStorage, иначе после обновления оно стало бы «только что».
        if (stored) {
            getAuthActions().setPreviousVisit(stored);
            return;
        }

        getAuthActions().setPreviousVisit(profile.lastSeenAt);
        try {
            sessionStorage.setItem(key, profile.lastSeenAt);
        } catch {
            // не критично
        }

        // Ошибку не обрабатываем: на работу приложения это не влияет.
        void supabase.rpc('touch_last_seen');
    }, [userId, profile]);
};
