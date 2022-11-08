const bg = document.getElementsByClassName('bg')[0]; // узел заполняющего блока
const hexBgColorText = document.getElementsByClassName('hexBgColor')[0]; // узел текста для вывода цвета
let curBgColor = []; // глобально храним массив пары цветов
const rndGen = (min, max) => {
   // генератор случайных чисел из указанного диапазона

   return (
      Math.floor(
         Math.random() * (Math.max(min, max) - Math.min(min, max) + 1)
      ) + Math.min(min, max)
   );
};

const convHex = (n) => {
   // конвертируеn десятичное значение в hex с ведущим нулём
   hexString = n.toString(16);

   if (hexString.length % 2) {
      hexString = '0' + hexString;
   }

   return hexString;
};

const getColCouple = (n) => {
   // получает инвертированные значения цветового канала (основной и инвертированный)
   let col = convHex(n, 16);
   let invCol = convHex(255 - n, 16);

   return [col, invCol];
};

const rndColor = () => {
   // генерируем два случайных цвета: основной и инвертированный
   let red = getColCouple(rndGen(0, 255), 16);
   let green = getColCouple(rndGen(0, 255), 16);
   let blue = getColCouple(rndGen(0, 255), 16);

   return [red[0] + green[0] + blue[0], red[1] + green[1] + blue[1]];
};

const setBgColor = () => {
   // устанавливает цвет фона заполняющего блока
   curBgColor = rndColor(); // сохраняем глобально массив пары цветов
   bg.style.background = '#' + curBgColor[0];
};

// стартуем интервальный запуск функции
let runColors = setInterval(() => setBgColor(), 100);

bg.onclick = function () {
   clearInterval(runColors); // тормозим интервальный запуск функции
   hexBgColorText.textContent = '#' + curBgColor[0]; // вписываем текущее значение цвета фона в тег span
   hexBgColorText.style.color = '#' + curBgColor[1]; // назначаем инвертированный цвет тексту, так прикольнее ;)
};
