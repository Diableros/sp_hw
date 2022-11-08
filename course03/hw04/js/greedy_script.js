// собираем все нужные элементы
const form1 = document.querySelector('.form_1');
const form1TakeInput = form1.querySelector('.form__greedy-input');
const form2 = document.querySelector('.form_2');
const form2TakeInput = form2.querySelector('.form__greedy-input');
const runTest = document.querySelector('.run');
// привязка события на кнопку первой формы
form1TakeInput.onfocus = function () {
   let res = ''; // инициализация хранилища данных

   const parentForm = this.closest('.form_1'); // получаем родителя инпута с .form_1
   const children = parentForm.children; //получаем всех потомков родителя первого уровня

   for (const child of children) {
      if (child.nodeName === 'INPUT' && child !== parentForm.lastElementChild) {
         // если имя узла инпут и он не последний
         res += String(child.value); // то закидываем его в хранилище
         child.value = ''; // и чистим форму
      }
   }

   if (res === '') {
      // если результат пустой
      this.value = "Все input'ы пустые";
   } else {
      // если нет,  закидываем накопленные данные
      this.value = res;
   }
};

form2TakeInput.onfocus = function () {
   // при клике в инпуте
   form2Start(); // делаем разовый запуск. т.е. без параметров
};

runTest.onclick = function () {
   const passes = document.querySelector('.form__passes'); //берем инпут с  количеством проходов
   form2Start(passes.value); //запускаем с количеством проходов
};
// функция для отбора инпутов по методу elements
const elements = function (a = true) {
   let res = '';
   const parentForm = form2TakeInput.closest('.form_2'); // получаем родителя
   const elements = parentForm.elements; // получаем коллецию элементов формы

   for (let i = 0; i < elements.length - 1; i++) {
      // длина -1, потому что последний инпут тоже в коллекции
      res += String(elements[i].value); // собираем все значения
      if (!a) elements[i].value = ''; // если запуск многократный, то не чистим исходные инпуты
   }

   if (res === '') {
      form2TakeInput.value = "Все input'ы пустые";
   } else {
      form2TakeInput.value = res;
   }
};
// функция для отбора инпутов по классу через querySelectorAll
const query = function (a = true) {
   let res = '';
   const parentForm = form2TakeInput.closest('.form_2'); // получаем родителя
   const elements = parentForm.querySelectorAll('.form__donor'); // получаем коллекцию инпутов

   //перебирать решил одинаковым способом, потому что for...of значительно медленее
   for (let i = 0; i < elements.length; i++) {
      res += String(elements[i].value); // собираем все значения
      if (!a) elements[i].value = ''; // если запуск многократный, то не чистим инпуты
   }

   if (res === '') {
      form2TakeInput.value = "Все input'ы пустые";
   } else {
      form2TakeInput.value = res;
   }
};
// функция для отбора инпутов по классу через рекурсивный обход родительского элемента
const recursion = function (a = true) {
   let res = '';
   const elements = []; // инициализируем массив элементов
   function recurseInput(node) {
      // рекурсив обхода всех элементов родительского элемента
      node.classList.contains('form__donor') ? elements.push(node) : null; // если попался инпут, пушим его в массив
      for (const child of node.children) {
         recurseInput(child);
      }
   }

   const parentForm = form2TakeInput.closest('.form_2'); // получаем родителя
   recurseInput(parentForm); // запускаем рекурсивный отбор инпутов по классу
   //перебирать решил одинаковым способом, потому что for...of значительно медленее
   for (let i = 0; i < elements.length; i++) {
      res += String(elements[i].value);
      if (!a) elements[i].value = ''; // если запуск многократный, то не чистим инпуты
   }

   if (res === '') {
      form2TakeInput.value = "Все input'ы пустые";
   } else {
      form2TakeInput.value = res;
   }
};
// функция старта
function testStart(f, n) {
   const date = new Date();
   const logObj = {}; // иниц объект лога
   logObj['time'] = date.toLocaleTimeString(); // фиксим время для лога
   logObj['algorythm'] = f.name; // фиксим название используемой функции

   if (+n === 1) {
      // если запуск разовый, делаем всё для него
      logObj['type'] = 'Разовый запуск';
      logObj['duration'] = 'Длительность: Нет';

      document.querySelector('.test__time').textContent = logObj.type;
      f(false); // если запуск одинарный, то чистим инпуты
   } else {
      // иначе запуск множественный, делаем всё для него
      logObj['type'] = 'Множественный запуск: ' + n + ' проходов';
      const testStart = performance.now(); // фиксируем время старта теста
      for (let i = 0; i < n; i++) {
         // запускаем функцию циклично нужное кол-во раз

         f();
      }
      const testEnd = performance.now(); // фиксируем время окончания
      const time = testEnd - testStart; // высчисляем длительность работы

      logObj['duration'] = 'Длительность: ' + time + 'мс';
      document.querySelector('.test__time').textContent = logObj.duration;
   }

   setLogText(logObj); // сохраняем результат теста в область логов
}
// функция передачи нужных параметров в testStart
function form2Start(n = 1) {
   //если без параметров, то запускаем 1 раз
   const options = document.querySelectorAll('.option'); // получаем коллекцию опций алгоритма

   for (const option of options) {
      // перебираем набор опций

      if (option.checked) {
         //определяем какая из опций true

         document.querySelector('.test__info').textContent =
            'Алгоритм: ' + option.value;
         // setTestInfo(option.value); // прописываем алгоритм теста

         switch (
            option.value // получаем название функции и передаем функцию в testStart с нужными параметрами
         ) {
            case 'elements':
               testStart(elements, n);
               break;

            case 'query':
               testStart(query, n);
               break;

            case 'recursion':
               testStart(recursion, n);
               break;
         }
      }
   }
}
// функция вывода логов тестов в браузер
function setLogText(log) {
   const logField = document.querySelector('.log'); //получаем узел поля логов

   if (logField.children.length > 9) logField.lastChild.remove(); // если в поле логов более 9 элементов, удаляем последний

   const logString = document.createElement('p'); // создаем элемент DOM
   // закидываем данные в элемент
   logString.innerHTML +=
      log.time +
      ' Алгоритм: ' +
      log.algorythm +
      ' ' +
      log.type +
      ' ' +
      log.duration;
   // вставляем элемент перед первым потомком поля логов
   logField.insertBefore(logString, logField.firstChild);
}
