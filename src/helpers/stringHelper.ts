export const padZeroToString = function padZeroToString(number: number, length = 2) {
    return number < 10
            ? new Array(length).join('0').slice(length * -1) + number
            : number.toString();
}