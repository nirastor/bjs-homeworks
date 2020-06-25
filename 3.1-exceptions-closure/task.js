// *** TASK 1 ***

function parseCount(str) {
    let num = parseInt(str);
    if (isNaN(num)) throw new Error('Невалидное значение')
    return num;
}

function validateCount(str) {
    try {
        return parseCount(str);
    }
    catch(e) {
        return e; 
    }
}

// *** TASK 2 ***

class Triangle {
    constructor(a, b, c) {
        let triangleTest = [a, b, c];
        triangleTest.sort((a,b) => a - b);

        if (triangleTest[0] + triangleTest[1] < triangleTest[2]) {
            throw new Error('Треугольник с такими сторонами не существует');
        }
        
        // Это правильно что сначала проверяю а потом записываю в свойство?
        // Или можно сначала записать, а потом проверить (будет меньше кода)
        // Если конструктор выбросит ошибку не закончив свою работу новый экземпляр класса будет создан?
        this.sides = [a, b, c];
    }

    getPerimeter() {
        return this.sides.reduce((a,b) => a + b, 0)
    }

    getArea() {
        const halfPerimeter = this.getPerimeter() / 2;
        let squareArea = halfPerimeter;
        for (let i = 0; i < this.sides.length; i++) {
            squareArea *= halfPerimeter - this.sides[i];
        }
        
        // Когда все таки правильно использовать parseInt, когда Number, а когда унарный плюс?
        return Number(Math.sqrt(squareArea).toFixed(3));
    }
}

function getTriangle(a, b, c) {
    try {
        return new Triangle(a, b, c);
    }
    catch {
        return {
            getArea() {return 'Ошибка! Треугольник не существует'},
            getPerimeter() {return 'Ошибка! Треугольник не существует'}
        };
    }
}