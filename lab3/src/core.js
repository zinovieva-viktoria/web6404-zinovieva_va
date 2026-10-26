/**
 * Напишите функцию, которая проверяет, является ли число целым используя побитовые операторы
 * @param {*} n
 */
function isInteger(n) {
    // n | 0 отбрасывает дробную часть
    // Если число от этого не изменилось - оно целое.
    return (n | 0) === n;
}

/**
 * Напишите функцию, которая возвращает массив четных чисел от 2 до 20 включительно
 */
function even() {
    const result = [];
    for (let i = 2; i <= 20; i += 2) {
        result.push(i);
    }
    return result;
}

/**
 * Напишите функцию, считающую сумму чисел до заданного используя цикл
 * @param {*} n
 */
function sumTo(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

/**
 * Напишите функцию, считающую сумму чисел до заданного используя рекурсию
 * @param {*} n
 */
function recSumTo(n) {
    // дошли до 1 - останавливаемся
    if (n <= 1) {
        return n;
    }
    // n плюс сумма всех чисел до него
    return n + recSumTo(n - 1);
}

/**
 * Напишите функцию, считающую факториал заданного числа
 * @param {*} n
 */
function factorial(n) {
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

/**
 * Напишите функцию, которая определяет, является ли число двойкой, возведенной в степень
 * @param {*} n
 */
function isBinary(n) {
    // Делим на 2, пока число делится нацело
    while (n > 1 && n % 2 === 0) {
        n /= 2;
    }
    // Если осталось 1 значит число было степенью двойки
    return n === 1;
}
    

/**
 * Напишите функцию, которая находит N-е число Фибоначчи
 * @param {*} n
 */
function fibonacci(n) {
    let prev = 0;
    let current = 1;
    for (let i = 1; i < n; i++) {
        const next = prev + current;
        prev = current;
        current = next;
    }
    return current;
}

/** Напишите функцию, которая принимает начальное значение и функцию операции
 * и возвращает функцию - выполняющую эту операцию.
 * Если функция операции (operatorFn) не задана - по умолчанию всегда
 * возвращается начальное значение (initialValue)
 * @param initialValue
 * @param operatorFn - (storedValue, newValue) => {operation}
 * @example
 * const sumFn =  getOperationFn(10, (a,b) => a + b);
 * console.log(sumFn(5)) - 15
 * console.log(sumFn(3)) - 18
 */
function getOperationFn(initialValue, operatorFn) {
    // storedValue хранится в замыкании и помнит результат между вызовами
    let storedValue = initialValue;

    return function (newValue) {
        if (typeof operatorFn !== 'function') {
            return initialValue;
        }
        storedValue = operatorFn(storedValue, newValue);
        return storedValue;
    };
}

/**
 * Напишите функцию создания генератора арифметической последовательности.
 * При ее вызове, она возвращает новую функцию генератор - generator().
 * Каждый вызов функции генератора возвращает следующий элемент последовательности.
 * Если начальное значение не передано, то оно равно 0.
 * Если шаг не указан, то по дефолту он равен 1.
 * Генераторов можно создать сколько угодно - они все независимые.
 *
 * @param {number} start - число с которого начинается последовательность
 * @param {number} step  - число шаг последовательности
 * @example
 * const generator = sequence(5, 2);
 * console.log(generator()); // 5
 * console.log(generator()); // 7
 * console.log(generator()); // 9
 */
function sequence(start, step) {
    // ??: если значение не передано (undefined), берём значение по умолчанию
    let current = start ?? 0;
    const realStep = step ?? 1;

    // current у каждого генератора свой, поэтому генераторы независимы
    return function () {
        const value = current;
        current += realStep;
        return value;
    };
}

/**
 * Напишите функцию deepEqual, которая принимает два значения
 * и возвращает true только в том случае, если они имеют одинаковое значение
 * или являются объектами с одинаковыми свойствами,
 * значения которых также равны при сравнении с рекурсивным вызовом deepEqual.
 * Учитывать специфичные объекты(такие как Date, RegExp и т.п.) не обязательно
 *
 * @param {object} firstObject - первый объект
 * @param {object} secondObject - второй объект
 * @returns {boolean} - true если объекты равны(по содержанию) иначе false
 * @example
 * deepEqual({arr: [22, 33], text: 'text'}, {arr: [22, 33], text: 'text'}) // true
 * deepEqual({arr: [22, 33], text: 'text'}, {arr: [22, 3], text: 'text2'}) // false
 */
function deepEqual(firstObject, secondObject) {
    // NaN единственное значение, кто не равен самому себе
    if (firstObject !== firstObject && secondObject !== secondObject) {
        return true;
    }

    // Примитивы и одинаковые ссылки сравниваем строго
    if (firstObject === secondObject) {
        return true;
    }

    // Примитивы и null не равны объекту (typeof null тоже 'object')
    if (
        typeof firstObject !== 'object' ||
        typeof secondObject !== 'object' ||
        firstObject === null ||
        secondObject === null
    ) {
        return false;
    }

    // Перебираем свойства первого объекта и сравниваем их рекурсивно
    let firstCount = 0;
    for (let key in firstObject) {
        firstCount++;
        if (!(key in secondObject)) {
            return false;
        }
        if (!deepEqual(firstObject[key], secondObject[key])) {
            return false;
        }
    }

    // У второго объекта не дб лишних свойств
    let secondCount = 0;
    for (let key in secondObject) {
        secondCount++;
    }
    return firstCount === secondCount;
}

module.exports = {
    isInteger,
    even,
    sumTo,
    recSumTo,
    factorial,
    isBinary,
    fibonacci,
    getOperationFn,
    sequence,
    deepEqual,
};