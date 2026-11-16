import { isAuthError, isAuthRetryableFetchError } from '@supabase/supabase-js';

const DEFAULT_MESSAGE = 'Что-то пошло не так. Повторите попытку позже.';

const MESSAGES_BY_CODE: Record<string, string> = {
    // Один общий текст: по нему нельзя понять, существует ли такой email.
    invalid_credentials: 'Неверный email или пароль.',
    user_already_exists: 'Этот email уже зарегистрирован.',
    email_exists: 'Этот email уже зарегистрирован.',
    weak_password: 'Пароль слишком простой. Используйте не менее 8 символов.',
    over_request_rate_limit: 'Слишком много попыток. Подождите и повторите.',
    over_email_send_rate_limit: 'Слишком много попыток. Подождите и повторите.',
    // Приходит, когда триггер в базе отклонил ник (занят или недопустим).
    unexpected_failure: 'Не удалось зарегистрироваться. Возможно, ник занят или недопустим.',
};

const getAuthErrorMessage = (error: unknown): string => {
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
        return 'Нет связи с сервером. Проверьте подключение.';
    }
    if (isAuthRetryableFetchError(error)) {
        return 'Нет связи с сервером. Проверьте подключение.';
    }
    if (isAuthError(error) && error.code) {
        return MESSAGES_BY_CODE[error.code] ?? DEFAULT_MESSAGE;
    }
    return DEFAULT_MESSAGE;
};

export default getAuthErrorMessage;
