const myModal = new MyModal(document.body);
const pin = new PinCode(document.querySelector('.main'));

if (localStorage.getItem('pin')) {
   // логика создания нового пин-кода
   console.log('ПОКАЗАТЬ ФОРМУ ВВОДА И ПРОВЕРКИ ПИНКОДА');
} else {
   myModal.show(
      'PIN-код не найден!',
      'Создайте PIN-код в специальной форме.',
      1,
      pin.renderCreateForm
   );
}
