const myModal = new MyModal(document.body);
const pin = new PinCode(document.querySelector('.main'));

if (localStorage.getItem('pin')) {
   pin.renderEnterForm();
} else {
   myModal.show(
      'PIN-код не найден!',
      'Создайте PIN-код в специальной форме.',
      5,
      pin.renderCreateForm
   );
}
