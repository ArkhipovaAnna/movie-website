const filmLengthFormatted = (filmLength: string) => {

    if (filmLength === undefined) {

        return 'Неизвестно';

    } else {

        const filmLengthArray = filmLength.split(':');
        let hours = filmLengthArray[0];
        if (hours.startsWith('0')) hours = hours.slice(1);
        let minutes = filmLengthArray[1];
        if (minutes.startsWith('0')) minutes = minutes.slice(1);
        if (hours === '0') {
            return `${minutes} мин`;
        } else {
            return `${hours} ч ${minutes} мин`;
        }

    }
}

export default filmLengthFormatted