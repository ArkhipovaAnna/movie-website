const getFavoritesErrorMessage = (error: unknown): string => {
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
        return 'Нет связи с сервером. Проверьте подключение.';
    }

    // 42501: добавление отклонено правилом доступа, чаще всего из-за лимита в 500 штук.
    if (typeof error === 'object' && error !== null && 'code' in error && error.code === '42501') {
        return 'В избранном может быть не более 500 фильмов.';
    }

    return 'Не удалось обновить избранное. Повторите попытку.';
};

export default getFavoritesErrorMessage;
