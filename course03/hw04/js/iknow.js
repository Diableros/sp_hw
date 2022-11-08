const where = document.querySelector('.where');

where.onclick = () => {
   const path = []; // массив для названий узлов

   function getPath(elem) {
      parent = elem.parentElement; // родительский элемент текущего элемента

      if (parent !== null) {
         // если родитель есть
         path.unshift(parent.tagName); // то пушим его в массив
         getPath(parent); // и переходим к следующему
      }

      return path.join(' > '); // возвращаем массив сджойненный из массива узлов
   }
   document.querySelector('.adress').textContent =
      'Мой адрес: ' + getPath(where);
};
