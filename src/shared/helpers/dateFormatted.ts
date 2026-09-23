const dateFormatted = (dateString: string): string => {

    const [year, month, day] = dateString.split('-').map(Number);

    const months = [
        'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
        'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ];

    return `${day} ${months[month - 1]} ${year} года`;
};

export default dateFormatted