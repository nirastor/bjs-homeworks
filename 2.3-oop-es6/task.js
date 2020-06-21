// *** TASK1 ***
console.log('\n\n*** TASK 1 ***')
const INITIAL_MAX_BOOK_STATE = 100;
const MIN_BOOK_STATE = 0;
const ACCEPTABLE_BOOK_STATE = 30;
const FIX_QUALITY = 1.5

class PrintEditionItem {
    constructor(name, releaseDate, pagesCount) {
        this.name = name;
        this.releaseDate = releaseDate;
        this.pagesCount = pagesCount;
        this._state = INITIAL_MAX_BOOK_STATE;
        this.type = null;
    }

    fix() {
        this.state *= FIX_QUALITY;
        return this; // добавил чтобы можно было вызывать picknick.fix().fix().fix();
    }

    set state(value) {
        if (value < MIN_BOOK_STATE) this._state = MIN_BOOK_STATE;
        else if (value > INITIAL_MAX_BOOK_STATE) this._state = INITIAL_MAX_BOOK_STATE;
        else this._state = value;
    }

    get state() {
        return this._state;
    }
}

// Пример использования
console.log('Пример использования PrintEditionItem');
const sherlock = new PrintEditionItem("Полное собрание повестей и рассказов о Шерлоке Холмсе в одном томе", 2019, 1008);
console.log(sherlock.releaseDate); //2019
console.log(sherlock.state); //100
sherlock.fix();
console.log(sherlock.state); //100
sherlock.state = 50
console.log(sherlock.state); //50
sherlock.fix();
console.log(sherlock.state); //75


class Magazine extends PrintEditionItem {
    constructor(name, releaseDate, pagesCount) {
        super(name, releaseDate, pagesCount);
        this.type = 'magazine';
    }
}

// Пример использования
console.log('\nПример использования Magazine');
const popmechanic = new Magazine('Популярная Механика', 2019, 103);
console.log(popmechanic.name);


// ВОПРОС: выше в коде _state для журнала в «super» не задавал,но он существует?
// Это потому что у класса печатного издания _state задан при создании сразу значением?


console.log(popmechanic.state);
console.log(popmechanic.type);


class Book extends PrintEditionItem {
    constructor(author, name, releaseDate, pagesCount) {
        super(name, releaseDate, pagesCount);
        this.type = 'book';
        this.author = author;
    }
}

class NovelBook extends Book {
    constructor(author, name, releaseDate, pagesCount) {
        super(author, name, releaseDate, pagesCount);
        this.type = 'novel';
    }
}

class FantasticBook extends Book {
    constructor(author, name, releaseDate, pagesCount) {
        super(author, name, releaseDate, pagesCount);
        this.type = 'fantastic';
    }
}

class DetectiveBook extends Book {
    constructor(author, name, releaseDate, pagesCount) {
        super(author, name, releaseDate, pagesCount);
        this.type = 'detective';
    }
}

// Пример использования
console.log('\nПример использования FantasticBook');
const picknick = new FantasticBook('Аркадий и Борис Стругацкие', 'Пикник на обочине', 1972, 168);
console.log(picknick.author); //"Аркадий и Борис Стругацкие"
picknick.state = 60;
console.log(picknick.state); //60
picknick.fix().fix().fix(); // over 100
console.log(picknick.state); //100


// *** TASK-2 ***
console.log('\n\n*** TASK 2 ***')

class Library {
    constructor(name) {
        this.name = name;
        this.books = [];
    }

    addBook(book) {
        if (book.state >= ACCEPTABLE_BOOK_STATE) {
            this.books.push(book);
            return this;
        }
    }

    findBookBy(key, value) {
        for (let book of this.books) {
            if (book[key] === value) {
                return book;
            }
        }
        return null;
    }

    // Не по ДЗ но ради интереса. Регистронезависимый поиск по любому полю в книге
    findAllBook(search) {
        let result =[];
        for (let book of this.books) {
            for (let key in book) {
                if (book[key].toString().toLowerCase().includes(search.toString().toLowerCase())) {
                    result.push(book);
                }
            }
        }
        return result;
        
    }

    giveBookByName(bookName) {
        for (let bookIndex in this.books) {
            if (this.books[bookIndex].name === bookName) {
                let result = this.books[bookIndex];
                this.books.splice(bookIndex, 1);
                return result; // Тут работает
            }
        }
        return null;
    }
}

//Пример использования
console.log('\nПример использования Library');

const library = new Library("Библиотека имени Ленина");
library.addBook(new DetectiveBook("Артур Конан Дойл", "Полное собрание повестей и рассказов о Шерлоке Холмсе в одном томе", 2019, 1008));
library.addBook(new FantasticBook("Аркадий и Борис Стругацкие", "Пикник на обочине", 1972, 168));
library.addBook(new NovelBook("Герберт Уэллс", "Машина времени", 1895, 138));
library.addBook(new Magazine("Мурзилка", 1924, 60));


console.log('\nТест поиска одной книги по свойству и значению');
console.log(library.findBookBy("name", "Властелин колец")); //null
console.log(library.findBookBy("releaseDate", 1924)); //"[Мурзилка]"

console.log('\nТест регистронезависимого поиска по любому полю');
console.log('Ищем «19»');
console.log(library.findAllBook(19)); // 3 книги
console.log('Ищем «Артур»');
console.log(library.findAllBook('Артур')); // 1 книги
console.log('Ищем «ин»');
console.log(library.findAllBook('ин')); // 2 книги

console.log('\nТест выдачи');
console.log("Количество книг до выдачи: " + library.books.length); //Количество книг до выдачи: 4
console.log( library.giveBookByName("Машина времени") );
console.log("Количество книг после выдачи: " + library.books.length); //Количество книг после выдачи: 3


// *** TASK 3 ***
console.log('\n\n*** TASK 3 ***')

class StudentLog {
    constructor(name) {
        this.name = name;
        this.grades = {};
        // ВОПРОС →→→→ А почему нельзя задать const внутри класса?
        this.AVL_GRADES = [1,2,3,4,5];
    }

    getName() {
        console.log(this.name);
        return this.name;
    }

    addGrade(grade, subjectName) {
        
        if (!this.grades[subjectName]) this.grades[subjectName] = [];
        
        let subject = this.grades[subjectName];

        if (!this.AVL_GRADES.includes(grade)) {
            console.log(`${grade} не похоже на оценку. Оценка может быть: 1, 2, 3, 4 или 5`);
        } else {
            subject.push(grade);
            console.log(`Оценку ${grade} поставили`);   
        }

        console.log(`Всего оценок по предмету ${subjectName} — ${subject.length}`);
    }

    getAverageBySubject(subjectName) {
        const subject = this.grades[subjectName];
        if (!subject) return 0;
        return Math.round(subject.reduce((a,b) => a + b, 0) / subject.length * 10) / 10;
    }

    getTotalAverage() {
        let totalSum = 0;
        let totalCounter = 0;
        let grades = this.grades;
        
        for (let subject in grades) {
            for (let mark of grades[subject]) {
                totalSum += mark;
                totalCounter++;
            }
        }

        return totalCounter ? totalSum / totalCounter : 0;
    }

}

// Тесты журнала
const ivan = new StudentLog('Иван Иванов');
const petr = new StudentLog('Петр Петров');
console.log('Полное имя Ивана на следующей строке');
ivan.getName();

console.log('\nПоставим не ту оценку');
ivan.addGrade(2.6, 'matan');
ivan.addGrade(-1, 'matan');
ivan.addGrade('ab', 'matan');

console.log('\nПоcтавим правильные оценки');
ivan.addGrade(3, 'matan');
ivan.addGrade(4, 'matan');
ivan.addGrade(5, 'matan');
ivan.addGrade(4, 'phys');
ivan.addGrade(5, 'phys');
ivan.addGrade(5, 'phys');

console.log('\nСредняя по предмету который есть');
console.log( ivan.getAverageBySubject('matan') );
console.log( ivan.getAverageBySubject('phys') );

console.log('\nСредняя по пустому предмету');
console.log( ivan.getAverageBySubject('noSubj') );


console.log('\nСредняя по всем оценкам (Если есть)');
console.log( ivan.getTotalAverage() );
console.log('\nСредняя по всем оценкам (У пустого)');
console.log( petr.getTotalAverage() );