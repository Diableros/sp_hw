const myModal = new MyModal(document.body);

const btn = document.querySelector('.btn');

if (localStorage.getItem('pin')) {
   console.log('Показываем виджет ввода пинкода');
} else {
   console.log('Показываем виджет создания пинкода');
}
