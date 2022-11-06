// Дан объект numbers. Необходимо в консоль вывести все значения больше или равные 3.
const exerсise1 = () => {

    const numbers = {
        keyin1: 1,
        keyin2: 2,
        keyin3: 3,
        keyin4: 4,
        keyin5: 5,
        keyin6: 6,
        keyin7: 7,
    };

    // for (let item in numbers) {

    // if (numbers[item] >= 3) console.log(numbers[item]);
    // }
    console.log(Object.values(numbers).reduce((acc, elem) => acc + elem));
}

// Выведите в консоль дату в формате 'день - месяц - год'.
// *Для тех, кто любит посложнее, выведите сегодняшнюю дату. Подсказка — используйте объект [Date](https://learn.javascript.ru/datetime).
const exerсise2 = () => {

    const nowDate = new Date();
    console.log(nowDate.getDate() + ' - ' + nowDate.getMonth() + ' - ' + nowDate.getFullYear());
}

// # Задание 3
// Дано 2 массива:
// Вам необходимо объединить 2 этих массива, чтобы значения первого массива были ключами, а значения второго массива — значениями.
const exerсise3 = () => {

    const en = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

    const ru = ["понедельник", "вторник", "среда", "четверг", "пятница", "суббота", "воскресенье"];

    const obj = {};

    // en.reduce((acc, elem, i) => obj[elem] = ru[i]); // тут вроде reduce избыточен...

    // en.forEach((elem, i) => obj[elem] = ru[i]); // вот так получается короче всего

    // const obj = {};

    // let valIndex = 0;

    // for (key of en) {

    // obj[key] = ru[valIndex];

    // valIndex++;

    // }

    // console.log(obj);

    // console.log(en.reduce((acc, elem, i) => Object.assign(acc, { [elem]: ru[i] }), {}));

    console.log(en.reduce((acc, elem, i) => ({ ...acc, [elem]: ru[i] }), {}));

}

// Задание 4
// Создайте объект `week`, который будет содержать дни недели (пн — вс). Реализуйте функционал:
// 1. Пользователь вводит день недели с понедельника по пятницу (включительно), `alert` выдает, что это `будний день`.
// 2. Если пользователь вводит субботу или воскресенье, то `alert` выдает, что это `выходной день`.
// 3. Если пользователь вводит цифру от 1 до 7, то alert выдаёт название дня недели (1 — понедельник, 2 — вторник и т. д.).
// Если введенное число меньше 1 или больше 7, то `alert` выдаёт следующее сообщение: "Я не знаю, что это за день недели".
const exerсise4 = () => {

    const week = {
        'Понедельник': ['1', 'Будний день'],
        'Вторник': ['2', 'Будний день'],
        'Среда': ['3', 'Будний день'],
        'Четверг': ['4', 'Будний день'],
        'Пятница': ['5', 'Будний день'],
        'Суббота': ['6', 'Выходной день'],
        'Воскресенье': ['7', 'Выходной день']
    };

    const userDay = prompt('Введите название или номер дня');

    let result = '';

    for (let day in week) {

        if (day === userDay) { // Если введенные данные совпадают с ключём

            result = week[day][1]; // то забираем тип дня из значения
            break;

        } else if (week[day][0] === userDay) { // если введенные данные совпадают с номером дня из значения ключа

            result = day; // то выводим имя ключа
            break;

        } else {

            result = 'Я не знаю, что это за день недели';
        }
    }
    alert(result);
}


// # Задание 5
// Рассчитайте сумму всех значений данного объекта.
const exerсise5 = () => {

    let result = [];

    const numbers = {
        key1: {
            keyin1: 1,
            keyin2: 2,
            keyin3: 3,
        },
        key2: {
            keyin1: 4,
            keyin2: 5,
            keyin3: 6,
        },
    }

    for (const obj in numbers) {

        result.push(...Object.values(numbers[obj]));//.forEach(elem => result.push(elem));
    }

    console.log(result.reduce((acc, elem) => acc + elem));
}


// # Задание 6
// Создайте объект 12 месяцев в году:
// ru: [ 'январь', (остальные месяцы на русском), 'декабрь',],
// en: ['january',(остальные месяцы на английском),'december',],
// Есть 2 переменные:
// let language = prompt(“Введите ru или en”);
// let month = prompt(“Введите номер месяца, который вы хотите вывести”);
// Результат работы программы должен быть таким:
// - если `language` присвоить `ru`, а `month` присвоить 1, то `alert` выведет `январь`.
const exercise6 = () => {

    const months = {
        ru: ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'],
        en: ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'],
        ua: ['січень', 'лютий', 'березень', 'квітень', 'травень', 'червень', 'липень', 'серпень', 'вересень', 'жовтень', 'листопад', 'грудень'],
        fr: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
        fr1: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
        fr2: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
        fr3: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
    }

    const lang = prompt(`Введите код языка: | ${Object.keys(months).join(' | ')} |.`);

    if (!Object.keys(months).includes(lang)) {

        alert('Не верно введён код языка');

    } else {

        const month = +prompt('Введите номер месяца, который вы хотите вывести');

        if (isNaN(month) || month < 1 || month > 12) {

            alert('Не верно введен номер месяца');

        } else {

            alert(months[lang][month - 1]);
        }
    }
}
