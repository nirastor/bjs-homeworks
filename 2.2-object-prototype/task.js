String.prototype.isPalindrome = function() {
    const arr = this.toLowerCase().split('').filter(i => i !== ' ');
    const arrR = arr.slice().reverse();

    // for (let i = 0; i < arr.length; i++) {
    //     if (arr[i] !== arrR[i]) return false;
    // }

    // return true;
    return arr.join('') === arrR.join('');
}

function getAverageMark(marks) {
    if (marks.length === 0) return 0;
    return Math.round(marks.reduce((a, b) => a + b, 0) / marks.length);
}

function checkBirthday(date) {
    const now = new Date();
    const birthday = new Date(date);

    // Если делать по тексту задания то будет как-то так
    // const MS_IN_YEAR = 365.25 * 24 * 60 * 60 * 1000;
    // console.log((now - birthday)/MS_IN_YEAR);
    // return Math.floor((now - birthday)/MS_IN_YEAR) >= 18 ? true : false;

    // Но это не совсем точно т.к. каждый 100-й год не вискокосный
    // Также на 18 июня 2020 этот способ записывает в совершеннолетних тех кто родился 19 июня 2002
    // Можно проверить сколько 29-х февраля было между датами рождения и проверки
    // но кажется это будет усложнение ради упрощения
    
    // пока что ничего реально точнее (и понятнее) вот этого придумать не могу
    if ((now.getFullYear() - birthday.getFullYear()) > 18) return true;
    if ((now.getFullYear() - birthday.getFullYear()) < 18) return false;

    if (now.getMonth() > birthday.getMonth()) return true;
    if (now.getMonth() < birthday.getMonth()) return false;

    if (now.getDate() >= birthday.getDate()) return true;
    if (now.getDate() < birthday.getDate()) return false;  
}