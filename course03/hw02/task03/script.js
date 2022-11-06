const body = document.body;

let curR = 0;
let curG = 0;
let curB = 0;

const setCurRGB = (R, G, B) => {
   // ограничим выход значений за допустимый диапазон
   // чот как то ограничение непонятно работает ...
   R < 0 ? (curR = 0) : null;
   G < 0 ? (curG = 0) : null;
   B < 0 ? (curB = 0) : null;

   R > 255 ? (curR = 255) : null;
   G > 255 ? (curG = 255) : null;
   B > 255 ? (curB = 255) : null;

   body.style.background = `rgb(${curR}, ${curG}, ${curB})`;

   console.log(`Current RGB: ${curR}, ${curG}, ${curB}`);
};

setCurRGB(curR, curG, curB); //устанавливаем начальный цвет (черный)

document.getElementById('incr_r').onclick = () =>
   setCurRGB((curR += 10), curG, curB);

document.getElementById('incr_g').onclick = () =>
   setCurRGB(curR, (curG += 10), curB);

document.getElementById('incr_b').onclick = () =>
   setCurRGB(curR, curG, (curB += 10));

document.getElementById('decr_r').onclick = () =>
   setCurRGB((curR -= 10), curG, curB);

document.getElementById('decr_g').onclick = () =>
   setCurRGB(curR, (curG -= 10), curB);

document.getElementById('decr_b').onclick = () =>
   setCurRGB(curR, curG, (curB -= 10));
