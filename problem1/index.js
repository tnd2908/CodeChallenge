const validateNumber = (n) => {
    if (typeof n !== 'number') {
        return 'Input is not a number';
    }
    if (n % 1 !== 0) {
        return 'Input is not an integer';
    }
    if (n < 0 || n > Number.MAX_SAFE_INTEGER) {
        return 'Number is not a positive number';
    }
    return true;
}

const sumToN = (n) => {
    const validation = validateNumber(n);    
    if (validation !== true) {
        return validation;
    }
    let total = 0;
    while (n > 0) {
        total += n;
        n--;
    }
    return total;
}

const sumToNRecursive = (n) => {
    const validation = validateNumber(n);
    if (validation !== true) {
        return validation;
    }
    if (n === 0) {
        return 0;
    }
    return n + sumToNRecursive(n - 1);
}

const sumToNFormula = (n) => {
    const validation = validateNumber(n);
    if (validation !== true) {
        return validation;
    }
    return (n * (n + 1)) / 2;
}

console.log(sumToN(5));
console.log(sumToNRecursive(5));
console.log(sumToNFormula(5));