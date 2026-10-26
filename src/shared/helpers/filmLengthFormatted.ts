const filmLengthFormatted = (filmLength: string | number | null) => {

    let hours = 0;
    let minutes = 0;

    if (typeof filmLength === 'number') {

        hours = Math.floor(filmLength / 60);
        minutes = filmLength % 60;

    } else if (typeof filmLength === 'string' && filmLength.includes(':')) {

        const parts = filmLength.split(':');
        hours = Number(parts[0]);
        minutes = Number(parts[1]);

    } else {
        return 'Неизвестно';
    }

    if (hours === 0) {
        return `${minutes} мин`
    }

    if (minutes === 0) {
        return `${hours} ч`
    }

    return `${hours} ч ${minutes} мин`;
}

export default filmLengthFormatted

