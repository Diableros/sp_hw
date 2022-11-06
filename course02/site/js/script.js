const cursor = document.querySelector('.cursor-pointer');

const mouseMove = function (e) {
    let x = e.clientX;
    let y = e.clientY;
    cursor.style.left = x + 'px';
    cursor.style.top = y + 'px';
};

document.addEventListener('mousemove', mouseMove);

function curVis() {
    cursor.style.display = 'block';
}

function curNoVis() {
    cursor.style.display = 'none';
}


// Не смог придумать, как тут можно использовать логические операторы || (логическое ИЛИ) и && (логическое И).*
const seasons = () => {
    const winter = [12, 1, 2];
    const spring = [3, 4, 5];
    const summer = [6, 7, 8];
    const autumn = [9, 10, 11];

    function seasonName(month) {
        if (winter.includes(month)) {
            return 'Зима';
        } else if (spring.includes(month)) {
            return 'Весна';
        } else if (summer.includes(month)) {
            return 'Лето';
        } else if (autumn.includes(month)) {
            return 'Осень';
        } else {
            return 'Введен неправильный номер';
        }
    }
    // Приятнее получать ответ в alert(), нежели в консоль, решил реализовать так :)
    // но если что, раскомментить не долго %)
    alert(seasonName(+prompt('Введите номер месяца.')));
    // console.log(seasonName(+prompt('Введите номер месяца.')));

}

const memorize = () => {

    let arr = ['Яблоко', 'Груша', 'Дыня', 'Виноград', 'Персик', 'Апельсин', 'Мандарин'];

    alert(`Запомни слова: \n-------------------------------------------------------------------------------\n${arr.sort(() => Math.random() - 0.5).join(' - ')}\n-------------------------------------------------------------------------------\nЕсли запомнил - жми ОК!`);

    console.log(arr); // для проверки правильности работы игры

    const userAnswer1 = prompt('Какое было первое слово?');

    const userAnswer2 = prompt('Какое было последнее слово?');

    if (arr[0] === userAnswer1 && arr[arr.length - 1] === userAnswer2) {

        alert('Поздравляю! Ты угадал!');

    } else if (arr[0] === userAnswer1 || arr[arr.length - 1] === userAnswer2) {

        alert('Ты был близко к победе!');

    } else {

        alert('Не угадал. Попробуй ещё раз.');
    }
}