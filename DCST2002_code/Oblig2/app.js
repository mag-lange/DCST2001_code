export function isLeapYear(year) {
    if (year < 0) {
        throw('Invalid argument: year must be an integer equal to or larger than 0')
    }
    else if (year == null || year == undefined) {
        throw('Invalid argument: year cannot be null or undefined')
    }

    return (year % 4 === 0) &&
           (year % 100 !==  0) ||
           (year % 400 === 0);
}