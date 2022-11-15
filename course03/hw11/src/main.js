const myModal = new MyModal(document.body);

const btn = document.querySelector('.btn');

btn.onclick = () => {
   myModal.show('Важное сообщение!', 'Текст важного сообщения!', 5);
};
