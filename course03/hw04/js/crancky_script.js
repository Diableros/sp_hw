// получаем коллекцию инпутов по классу
const inputs = document.querySelectorAll('.crancky-input');

// назначаем на кнопку событие onclick
document.querySelector('._back').onclick = () => {
   let flag = false; // инициализируем счетчик

   for (let input of inputs) {
      // при значении в каждом инпуте "Пожалуйста"  плюсуем счетчик
      flag = input.value.toLowerCase() === 'пожалуйста' ? true : false;
   }
   // если флаг ture, отрпавляем пользователя назад, если false объясняем где раком зимуют :))
   flag
      ? window.history.back()
      : (document.querySelector('.back-text').textContent =
           'Ты хочешь назад... Но ты просишь без уважения...');
};
