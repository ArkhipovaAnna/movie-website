const formatter = new Intl.DateTimeFormat('ru-RU', {
    dateStyle: 'long',
    timeStyle: 'short',
});

const formatDate = (value: string | null | undefined): string => {
    if (!value) return '—';

    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? '—' : formatter.format(date);
};

export default formatDate;
