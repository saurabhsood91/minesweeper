export const getFormattedTime = (seconds) => {
    let timeInSeconds = seconds % 60;
    let minutes = Math.floor(seconds / 60);

    if(timeInSeconds < 10) {
        timeInSeconds = '0' + timeInSeconds;
    }

    if(minutes < 10) {
        minutes = '0' + minutes;
    }

    return `${minutes}:${timeInSeconds}`;
};