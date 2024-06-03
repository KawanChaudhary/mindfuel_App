import { defaultImage } from './default';

export function formatDateRelativeToNow(date) {
    const currentDate = new Date();
    const targetDate = new Date(date);
    const elapsedMilliseconds = currentDate - targetDate;

    if (elapsedMilliseconds < 1000) {
        return 'now';
    } else if (elapsedMilliseconds < 60 * 1000) {
        const seconds = Math.floor(elapsedMilliseconds / 1000);
        return `${seconds}s`;
    } else if (elapsedMilliseconds < 60 * 60 * 1000) {
        const minutes = Math.floor(elapsedMilliseconds / (60 * 1000));
        return `${minutes}min`;
    } else if (elapsedMilliseconds < 24 * 60 * 60 * 1000) {
        const hours = Math.floor(elapsedMilliseconds / (60 * 60 * 1000));
        return `${hours}h`;
    } else {
        const weeks = Math.floor(elapsedMilliseconds / (7 * 24 * 60 * 60 * 1000));
        return `${weeks}w`;
    }
}

export const editDate = (dateToEdit, year) => {
    const d = new Date(dateToEdit);
    var datestring = d.toLocaleString('eng', { month: 'long' }).substring(0, 3) + ' ' + d.getDate() + (year ? ', ' + d.getFullYear() : '');
    return datestring;
};

export const truncateTitle = (title) => {
    const trimmedString = title.substr(0, 75);
    return trimmedString;
};

export const defaultImageFunc = (userImage) => {
    return `${userImage == null || userImage === '' ? defaultImage : userImage}`;
};
