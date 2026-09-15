const filmLengthFormatted = (filmLength: string | number) => {

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

    return `${hours} ч ${minutes} мин`;
}

export default filmLengthFormatted

