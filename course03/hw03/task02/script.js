const topText = document.getElementsByClassName('topText')[0];
const button = document.getElementsByClassName('button')[0];
const bottomText = document.getElementsByClassName('bottomText')[0];

let clickCount = 0;
let lastClick = 0;

const phrases = [
   'О даааа...',
   'Не торопись...',
   'Познай Дзен...',
   'Вселенная никуда не торопится...',
   'Расслабься...',
   'Плавно выдохни...',
   'Почувствуй как течёт Ци...',
   'Хорошоооо...',
   'М-м-м-м-м-м-м...',
   'Нрааааааица...',
   'Ништяяяяяк...',
   'Вот так хорошо...',
   'Послушай как веет ветер...',
   'Почувствуй энергию вокруг...',
   'Смотри как растет растение...',
   'Ваааааааах...',
   'Продолжай в том же духе...',
   'То что надо...',
];

const getSuffix = (n) => {
   // выдает суффикс "а" для числительных, которым это нужно
   str = String(n);
   return [2, 3, 4].includes(+str.at(-1)) && ![12, 13, 14].includes(+str)
      ? 'a'
      : '';
};

button.onclick = function () {
   const t = new Date();
   if (t.getTime() - lastClick < 1000) {
      // проверяем прошла ли секунда с прошлого клика
      topText.textContent = 'Ты слишком поторопился...';
      button.textContent = 'Теперь я камушек...';
      button.setAttribute('disabled', '');
      bottomText.innerHTML = 'Ты не познал Дзен...<br>Приходи в другой раз.';
   } else {
      clickCount++; // засчитываем клик
      topText.textContent = `Эту кнопку нажали ${clickCount} раз${getSuffix(
         +clickCount
      )}`;
      lastClick = t.getTime(); // фиксируем время клика
      // выдаем успокаивающу фразу :))
      bottomText.textContent =
         phrases[Math.floor(Math.random() * phrases.length)];
   }
};
