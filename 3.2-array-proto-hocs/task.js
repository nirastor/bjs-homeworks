// *** TASK 1 ***
// Убрал выводы в консоль изнутри функций, т.к. тесты

function sleep(milliseconds) 
{
  let e = new Date().getTime() + milliseconds;
  while (new Date().getTime() <= e) {}
}

function sum(...args) {
    sleep(10);
    return args.reduce((a, b) => a + Number(b), 0);
}

function compareArrays(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    return arr1.every((e, i) => e === arr2[i]);
    
}

console.log('\nПроверка compareArrays');
console.log( compareArrays([8, 9], [6]) ); // false, разные значения
console.log( compareArrays([8, 9, 5, 4], [8, 9, 5, 4, 8, 3, 5]) ); // false, разные значения
console.log( compareArrays([9, 2, 4, 8, 2], [9, 2, 4]) ); // false, разные значения
console.log( compareArrays([1, 2, 3], [2, 3, 1]) ); // false, разные индексы, хотя и одинаковые значения
console.log( compareArrays([8, 1, 2], [8, 1, 2]) ); // true

function memorize(fn, limit) {
    const memory = [];
    return function(...args) {
        const memoryLengthLimit = limit;

        const oldResult = memory.find(e => compareArrays(args, e.args));
        if (oldResult !== undefined) return oldResult.result;
      
        const newResult = fn(...args);
        if (memory.length === memoryLengthLimit) memory.shift();
        memory.push({args: args, result: newResult});
        return newResult;
    }
    
}

const mSum = memorize(sum, 3);

// Результат хорошо видно глазами при задержке более 2000ms.
// Но сейчас задержку поставил 10ms, чтобы не уснуть во время теста
console.log('\nПроверка mSum');
console.log('результат mSum(1,2)', mSum(1,2) );
console.log('результат mSum(1,2)', mSum(1,2) ); // должны появляться быстро. 
console.log('результат mSum(3,4)', mSum(3,4) );
console.log('результат mSum(5,6)', mSum(5,6) );
console.log('результат mSum(7,8)', mSum(7,8) );
console.log('результат mSum(9,10)', mSum(9,10 ));
console.log('результат mSum(5,6)', mSum(5,6) ); // должны появляться быстро
console.log('результат mSum(5,6)', mSum(5,6) ); // должны появляться быстро

// *** TEST ***
function testCase(func) {
    const testArr = [ [1,2,3], [1,3], [1,2,3], [1,3], [9,5,2,4] ];
    console.log('Время выполнения функции с задержкой. Ожидаем около 5sec (100 * 50 * 10ms)')
    
    console.time('timer1');
    for (let i = 0; i < 100; i++) {
        testArr.forEach(e => {func(...e)});
    }
    
    console.timeEnd('timer1');
 

    console.time('timer2');
    mFunc = memorize(func, 5)
    for (let i = 0; i < 100; i++) {
        testArr.forEach(e => {mFunc(...e)})
    }
    console.log('Время выполнения функции через memorize. Ожидаем «быстро»')
    console.timeEnd('timer2');
}

console.log('\nTests:')
testCase(sum);

// С задержкой 10мс на каждый шаг тест выполнятся ~5500мс
//      Как будто задержка стоит не 10мс, а 11мс. Похоже еще 1мс уходит на запуск и остановку таймера
// через memorize при полном покрытии тестового массива «памятью» функции — 33мс (30мс на три вызова)

// При полностью отключенном sleep тест обычной функции проходит в среднем за 0.5ms
// memorize на 30-40% дольше, в среднем 0.7мс, бывает до 1мс и даже чуть более до 1.2мс
// т.е. 500 раз поискать результат в массиве почти ничего не стоит (shift() на этом тесте не срабатывал)