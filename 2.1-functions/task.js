// *** TASK 1 ***
console.log("\n*** Task-1 ***\n");

function getSolutions(a, b, c) {
    const D = b ** 2 - 4 * a * c;
    if (D < 0) return {D: D, roots: []}
    if (D === 0) return {D: D, roots: [-b / 2 / a]}
    return {D: D, roots: [(-b + Math.sqrt(D)) / 2 / a, (- b - Math.sqrt(D)) / 2 / a]}
}

// Эта функция не по заданию, я сдедлал вывод уравнения в сроку аккуратнее
function createEquationMessage(a, b, c) {
    let message = 'Вычисляем корни квадратного уравнения ';

    /*
    Пахнет дублированием, но поскольку коэффициентов всего три
    а случаи все таки чуть-чуть отличаются, то пока оставлю так
    Интересная задача написать вывод многочлена с произвольным числом коэффициентов в красивую строку
    Похоже это будет проще сделать на автозамене через регулярные выражения, а не таким алгоритмом
    */
    
    // if (a !== 0) {
    //     if (a === 1) message += 'x²'
    //     else message += a + 'x²'
    // }

    // if (b !== 0) {
    //     if (b === 1) message += ' + x';
    //     else if (b === -1) message += ' - x';
    //     else if (b > 0) message += ` + ${b}x`
    //     else if (b < 0) message += ` - ${-b}x`
    // }

    // if (c > 0) message += ` + ${c}`;
    // if (c < 0) message += ` - ${-c}`;


    // Переписал на регулярных.
    // Выглядит все равно страшно
    // Но кажется эта конструкция будет работать на многочлене любой длинны

    let msgEquationLeft = `${a}x² + ${b}x + ${c}`;

    msgEquationLeft = msgEquationLeft.replace(/\+ -/g, '- ') // plus-minus
        .replace(/\s1x/g, ' x') // not:first k === 1
        .replace(/^1x/, 'x') // first k === 1
        .replace(/..\s0$/, '') // last k === 0
        .replace(/^0x./, '') // first k === 0
        .replace(/..\s0x/g, '') // not:last:not:first k === 0
        .replace(/^\s\+\s/, '') //clear start
        .replace(/^\s-\s/, '-'); //clear start
    
    message += msgEquationLeft + ' = 0';
    
    return message;
}

function showSolutionsMessage(a, b, c) {
    // В описании задачи пропущенно '= 0' в правой части уравнения
    console.log(`Вычисляем корни квадратного уравнения ${a}x² + ${b}x + ${c} = 0`);
    
    // Сделал вывод приличнее, чтобы не было такого '7x² + 20x + -3' (плюс-минус)
    // И такого 1x² → x²
    console.log( createEquationMessage(a, b, c) );

    if (a === 0) {
        console.log("Увы, это не квадратное уравнение");
        return
    }
    
    const result = getSolutions(a, b, c);
    
    console.log(`Значение дискриминанта: ${result.D}`);

    const roots = result.roots;
    const msg_0 = 'Уравнение не имеет вещественных корней';
    const msg_1 = `Уравнение имеет один корень X₁ = ${roots[0]}`;
    const msg_2 = `Уравнение имеет два корня. X₁ = ${roots[0]} X₂ = ${roots[1]}`;

    if (roots.length === 0) console.log(msg_0);
    if (roots.length === 1) console.log(msg_1);
    if (roots.length === 2) console.log(msg_2);
}

showSolutionsMessage(1,2,3);
showSolutionsMessage(7,20,-3);
showSolutionsMessage(2,4,2);
showSolutionsMessage(2,-4,-2);
showSolutionsMessage(0,1,2); 
showSolutionsMessage(1,0,1);
showSolutionsMessage(2,3,0);
showSolutionsMessage(1,0,0);
showSolutionsMessage(0,0,-4);


// *** TASK 2 ***
/*
Сделал два врианта среднего. Среднего по средним (его ожидает тест)
и среднего по всем оценкам (что мне кажется правильнее)
*/
console.log("\n*** Task-2 ***\n");


function getAverageMark(marks) {
    if (marks.length === 0) return 0;
    return marks.reduce((a, b) => a + b, 0) / marks.length;
}

function getAverageScore(data) {
    let result = {};
    let allMarks = [];
    let allAverages = [];

    for (subj in data) {
        result[subj] = getAverageMark(data[subj]);
        allAverages.push(result[subj]);
        allMarks = allMarks.concat(data[subj]);
    }

    // Заглушил, чтобы пройти тест
    //result.allMarksAverage = getAverageMark(allMarks);
    
    result.average = getAverageMark(allAverages);

    return result;
}

const data = {
    algebra: [4, 5, 5, 4],
    geometry: [2, 5],
    russian: [3, 3, 4, 5],
    physics: [5, 5],
    music: [2, 2, 5],
    english: [4, 4, 3, 3],
    poetry: [5, 3, 4],
    chemistry: [2],
    french: [4, 4] 
}

console.log(data);
console.log( getAverageScore(data) );

// *** TASK 3 ***
console.log("\n*** Task-3 ***\n");

function getDecodedValue(secret) {
    return secret ? 'Эмильо' : 'Родриго';
}

function getPersonData(secretData) {
    const obj = {
        firstName: getDecodedValue(secretData.aaa),
        lastName: getDecodedValue(secretData.bbb),
    }
    return obj;
}

console.log( getPersonData({aaa: 0, bbb: 1}) );
console.log( getPersonData({aaa: 0, bbb: 0}) );
console.log( getPersonData({aaa: 1, bbb: 1}) );
console.log( getPersonData({aaa: 1, bbb: 0}) );

