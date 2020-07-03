// *** CODE ***
class AlarmClock {
    constructor() {
        this.alarmCollection = [];
        this.timerId = null;
    }

    // 0. Не понял что нужно здесь сделть. Достаточно throw и чтобы все ломалосьесли нет id с ошибкой
    // или нужен try-catch чтобы при ошибке продолжалась работа (так это логичнее, но с try-catch не проходит тесты)
    addClock(time, callback, id) {
            if (id === undefined) {
                throw new Error('Не задан id таймера в addClock');
            }
    
            if (this.alarmCollection.find(item => item.id === id)) {
                console.error('Будильник с таким id уже существует')
                return false;
            }
    
            this.alarmCollection.push({id, time, callback});
        }

    // 1. В методах обязательно у всех вызовов писать this?
    // разьве метод коорый вызвали наэкземпляре класса не будет в первую очередь искать методы и переменные у себя?
    removeClock(id) {
        const indexForDel = this.alarmCollection.findIndex(item => item.id === id);
        if (~indexForDel) {
            this.alarmCollection.splice(indexForDel, 1);
            return true;
        }
        return false;
    }

    addZeroToTime(time) {
        return time > 9 ? time : '0' + time;
    }
    
    // Аргумент minToAdd Немного не по заданию, но так удобнее создавать тест
    getCurrentFormattedTime(minToAdd) {
        let time = new Date();
        
        if (minToAdd) {
            time.setMinutes(time.getMinutes() + minToAdd);
        }
        
        const hh = this.addZeroToTime(time.getHours());
        const mm = this.addZeroToTime(time.getMinutes());
        return `${hh}:${mm}`;
    }

    // 2. Можно так переносить аргументы функции если не хочется писать длинную строку?
    // 3. Нормально оставлять числа в очевидных функиях вроде setInterval или желательно их зашивать в контстанты? 
    start() {
        if (!this.timerId) {
            this.timerId = setInterval(
                () => this.alarmCollection.forEach(item => this.checkClock(item.id)),
                500);
        }
    }

    stop() {
        if(this.timerId) {
            clearInterval(this.timerId);
            this.timerId = null;
        }
    }

    printAlarms() {
        console.log(`Напечатать все будильиники`);
        this.alarmCollection.forEach(item => console.log(item.id, item.time, item.callback));
    }

    checkClock(id) {
        const clockItem = this.alarmCollection.find(item => item.id === id);
        if (clockItem.time === this.getCurrentFormattedTime()) {
            clockItem.callback();
        }
    }

    clearAlarms() {
        this.stop();
        this.alarmCollection = [];

        // 4. Может ли возникнуть какая-то ошибка от того что переопределили alarmCollection?
        // есть ли хорошая практика как очистить массив?

        // while (this.alarmCollection.length) {
        //     this.alarmCollection.pop();
        // }

        // или
        // this.alarmCollection.splice(0, this.alarmCollection.length);
    }

}

function testCase() {
    const myClock = new AlarmClock();
    
    myClock.addClock(myClock.getCurrentFormattedTime(), () => console.log('Печатаем это много раз'), 1);
    myClock.addClock(myClock.getCurrentFormattedTime(1), () => {
        console.log('Напечатать один раз и удалить будильник. Показать оставшиеся');
        myClock.removeClock(2);
        myClock.printAlarms();
        } , 2);
    myClock.addClock(myClock.getCurrentFormattedTime(2), () => {
        console.log('Напечатать один раз и удалить все будильники, остановить таймер. Показать что будильников нет');
        myClock.clearAlarms();
        myClock.printAlarms();
        }, 3);
    
    console.log('Выдадим ошибку, что такой id уже есть и продолжим работать');
    myClock.addClock(myClock.getCurrentFormattedTime(10), () => console.log('the same ID'), 3);

    // console.log('Выдадим ошибку, пустого id и продолжим работать');
    // myClock.addClock(myClock.getCurrentFormattedTime(), () => console.log('NO ID'));
    
    myClock.printAlarms();
    myClock.start();
}

testCase();
console.log('Все работает');