"use strict";

function getResult(a,b,c){
    let discr = b ** 2 - 4 * a * c;

    if (discr < 0) {
        return [];
    } else if (discr === 0) {
        return [-b / 2 / a];
    } else {
        return [(-b + Math.sqrt(discr)) / (2 * a), (-b - Math.sqrt(discr)) / (2 * a)]
    }
}

function getAverageMark(marks){
    // Думал это нужно самому растащить из строки. Почти сделал :-)
    // let marks = marks.split("").map(i => +i).filter(i => i > 0);

    if (marks.length === 0) {
      console.log("Оценок нет");
      return 0;
    } else if (marks.length > 5) {
      console.log("Оценок больше пяти. Взял первые пять ")
      marks = marks.slice(0,5);
    }

    return Math.round(marks.reduce((a, b) => a + b, 0) / marks.length * 10) / 10;
}

function askDrink(name,dateOfBirthday){

    let msgAllow = `Не желаете ли олд-фэшн, ${name}?`
    let msgDeny = `Сожалею, ${name}, но я не могу вам продать алкоголь. Зато могу предложить вам замечательный клюквенный компот!`
    
    // Так было бы красиво, но только год брать не корректно
    // return ((new Date().getFullYear() - dateOfBirthday.getFullYear()) > 18) ? msgAllow : msgDeny;

    // Тут бы как-то разницу в годах высчиать 
    // Типа return ((new Date() - dateOfBirthday).getFullYear() > 18) ? msgAllow : msgDeny;
    // Но так не работает
    // Не смог быстро найти подходящих медотов. Похоже без библтотек можно только в лоб
    // вот таким дублированием котрого просили избегать

    if ((new Date().getFullYear() - dateOfBirthday.getFullYear()) > 18) return msgAllow;
    if ((new Date().getFullYear() - dateOfBirthday.getFullYear()) < 18) return msgDeny;

    if (new Date().getMonth() > dateOfBirthday.getMonth()) return msgAllow;
    if (new Date().getMonth() < dateOfBirthday.getMonth()) return msgDeny;


    if (new Date().getDate() >= dateOfBirthday.getDate()) return msgAllow;
    if (new Date().getDate() < dateOfBirthday.getDate()) return msgDeny;
}