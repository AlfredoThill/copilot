function calculateDaysBetweenDates(begin, end) {
    const beginDate = new Date(begin);
    const endDate = new Date(end);
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const millisBetween = endDate.getTime() - beginDate.getTime();
    const days = millisBetween / millisecondsPerDay;
    return days;
}

// find all images without alternate text
// and give them a red border
function process() {
    const images = document.getElementsByTagName('img');
    for (let i = 0; i < images.length; i++) {
        const image = images[i];
        if (image.alt == '') {
            image.style.border = '5px solid red';
        }
    }
}

// given a string that represents a roman number return the decimal value
function romanToDecimal(string) {
    const romanNumbers = {
        'I': 1,
        'V': 5,
        'X': 10,
        'L': 50,
        'C': 100,
        'D ': 500,
        'M': 1000,
    };
    let result = 0;
    for (let i = 0; i < string.length; i++) {
        const current = romanNumbers[string[i]];
        const next = romanNumbers[string[i + 1]];
        if (current < next) {
            result -= current;
        }
        else {
            result += current;
        }
    }
    return result;
}

romanToDecimal('XIV');


// write a non recursive drill function over an object argument
const nonRecursiveDrill = (object) => {
    const result = [];
    const stack = [];
    stack.push(object);
    while (stack.length > 0) {
        const current = stack.pop();
        if (typeof current === 'object') {
            for (const key in current) {
                stack.push(current[key]);
            }
        }
        else {
            result.push(current);
        }
    }
    return result;
}

// Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid
const checkIfStringIsBalanced = (string) => {
    const stack = [];
    const openBrackets = ['(', '{', '['];
    const closeBrackets = [')', '}', ']'];
    for (let i = 0; i < string.length; i++) {
        if (openBrackets.includes(string[i])) {
            stack.push(string[i]);
        }
        else if (closeBrackets.includes(string[i])) {
            const lastBracket = stack.pop();
            if (openBrackets.indexOf(lastBracket) !== closeBrackets.indexOf(string[i])) {
                return false;
            }
        }
    }
    return stack.length === 0;
}

console.log(checkIfStringIsBalanced('(){}[](())'));
console.log(checkIfStringIsBalanced('{}([]'));

// merge arrays without id duplicates, sample array looks like [{ id: 1, name: 'a' }, { id: 2, name: 'b' }]
const mergeArrays = (array1, array2) => {
    const result = [];
    const ids = [];
    for (let i = 0; i < array1.length; i++) {
        const current = array1[i];
        if (!ids.includes(current.id)) {
            result.push(current);
            ids.push(current.id);
        }
    }
    for (let i = 0; i < array2.length; i++) {
        const current = array2[i];
        if (!ids.includes(current.id)) {
            result.push(current);
            ids.push(current.id);
        }
    }
    return result;
}

// test mergeArrays
const array1 = [{ id: 1, name: 'a' }, { id: 2, name: 'b' }];
const array2 = [{ id: 2, name: 'c' }, { id: 3, name: 'd' }];
console.log(mergeArrays(array1, array2));
