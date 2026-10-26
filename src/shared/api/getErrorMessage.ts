import { ApiError } from './client';

interface ErrorMessage {
    title: string;
    hint: string;
}

const DEFAULT_MESSAGE: ErrorMessage = {
    title: 'Что-то пошло не так.',
    hint: 'Повторите попытку позже.',
};

const MESSAGES_BY_STATUS: Record<number, ErrorMessage> = {
    402: {
        title: 'Дневной лимит запросов исчерпан.',
        hint: 'Попробуйте снова завтра.',
    },
    429: {
        title: 'Слишком много запросов.',
        hint: 'Подождите минуту и обновите страницу.',
    },
};

const getErrorMessage = (error: unknown): ErrorMessage => {
    if (error instanceof ApiError) {
        return MESSAGES_BY_STATUS[error.status] ?? DEFAULT_MESSAGE;
    }
    return DEFAULT_MESSAGE;
};

export default getErrorMessage
