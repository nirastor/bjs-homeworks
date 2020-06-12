"use strict";

function calculateTotalMortgage(percent, contribution, amount, date) {
    
    // Этот способ рассчета срока дает аналог результата datediff в месяцах в sql для введенной даты
    // Например разница между 1 августа и 30 сентября все равно будет — 1 месяц
    // Это не корректно для рассчета кредита
    // Правильно было бы не давать вводить дату окончания с точностью до дня,
    // а давать выбирать срок в месцах изначально

    // *** calculate duration in month ***
    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth();
    let endYear = date.getFullYear();
    let endMonth = date.getMonth();
    const MONTH_IN_YEAR = 12;
    let durationInMonth = (endMonth - currentMonth) + MONTH_IN_YEAR * (endYear - currentYear);

    // Ежемесячная оплата рассчитывается по формуле:
    // Платеж=S*(P+P/(((1+P)^n)-1)),
    // где: S - тело кредита,
    // P - 1/12 процентной ставки (от 0 до 1)
    // n - количество месяцев ^ - возведение в степень

    let creditBody =  amount - contribution;
    let percentPerMonth = percent / 12 / 100;
    let payPerMonth = creditBody * (percentPerMonth + percentPerMonth /
        (((1 + percentPerMonth ) ** durationInMonth) - 1));
   
    return Math.round(payPerMonth * durationInMonth * 100) / 100;
}

function getGreeting(name) {
    if(!name) name = 'Аноним';
    return `Привет, мир! Меня зовут ${name}`;
}