const task1 = () => {
    let a = 10;
    alert(a);
    a = 20;
    alert(a);
};

const task2 = () => {
    let year = 2007;
    alert(year);
};

const task3 = () => {
    let jsCreator = 'Brendan Eich (Брендан Эйх)';
    alert(jsCreator);
};

const task4 = () => {
    let a = 10;
    let b = 2;
    alert(`Сумма = ${a + b}\nРазность = ${a - b}\nВоспроизведение = ${a * b}\nЧастное = ${a / b}`);
};

const task5 = () => {
    let a = +prompt('Введите первое число:');
    let b = +prompt('Введите второе число:');
    alert(`Сумма введенных чисел равна: ${a + b}`);
};

const task6 = () => {
    let result = 2 ** 5;
    alert(result);
};

const task7 = () => {
    let a = 9;
    let b = 2;
    alert(a % b);
};

const task8 = () => {
    let a = '2';
    let b = '3';
    alert(+a + +b);
};

const task9 = () => {
    let a = 1;
    let b = 2;
    alert(String(a) + String(b));
};

const task10 = () => {
    let a = '5';
    let b = '6';
    alert(String(+a + +b) + 'px');
};

const task11 = () => {
    let age = +prompt('Сколько вам лет?');
    alert(`Через год вам будет ${++age} лет!`);
};

const task12 = () => {
    let num = 1;
    num += 5;
    num -= 3;
    num *= 7;
    num /= 3;
    num++;
    num--;
    alert(num);
};

const task13 = () => {
    let userName = prompt('Как ваше имя?');
    alert(`Привет, ${userName}!`);
}

const task14 = () => {
    let salary = +prompt('Какой у вас размер зарплаты в рублях?');
    let prem = salary * 0.2;
    let tax = salary * 1.2 * 0.13;
    let clearSal = salary * 1.2 * 0.87;
    alert(`Ваша премия составит: ${prem} руб.\nПодоходный налог 13% на суммарный доход: ${tax} руб.\nДоход за вычетом налогов: ${clearSal} руб.\nБюджет на день составит: ${clearSal / 30} руб.`);
}