import {isLeapYear} from './app.js';

describe('A year is a leap year', () => {   
    test.each([[1820,true], [1960,true], [2020,true]])(
        'Year %i is divisible by 4 but not by 100', 
        (year, state) => {
        expect(isLeapYear(year)).toBe(state); //I do not really need state here since all of these return true but I think it is good practice?
    });

    test('Year is divisible by 400', () => {
        expect(isLeapYear(2000)).toBe(true);
    });
});

describe('A year is not a leap year', () => {
    test('Year is not divisible by 4', () => {
        expect(isLeapYear(1981)).toBe(false);
    });

    test('Year is divisible by 100 but not by 400', () => {
        expect(isLeapYear(2100)).toBe(false);
    });
});

describe('A Year is not supported', () => { //This test was written before the JS code was implemented (to comply with TDD)
   test.each([
    [-1, 'Invalid argument: year must be an integer equal to or larger than 0'], 
    [-894, 'Invalid argument: year must be an integer equal to or larger than 0'],
    [-2000, 'Invalid argument: year must be an integer equal to or larger than 0'], 
    [null, 'Invalid argument: year cannot be null or undefined'], 
    [undefined, 'Invalid argument: year cannot be null or undefined']
    ])(
    'Year %i is not on an acceptable format', 
    (year, error_message) => {
        expect(() => isLeapYear(year)).toThrow(error_message);
    }); 
});

//There is not test for strings or other data types, but if this is an input type="number" this would not be an issue. However you can still write e in such an input field
//The strucutre is not ideal since the error messages are so long, should rather be declared in variables and referenced by a number