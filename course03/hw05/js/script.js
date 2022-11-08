document.addEventListener('DOMContentLoaded', init);

function init() {
   console.log('init start');
   const spinner = document.querySelector('.main__spinner');
   spinner.classList.remove('main__spinner_hidden');
   const box = document.querySelector('.main__box');
   const pict = document.createElement('img');

   pict.onload = function () {
      spinner.classList.add('main__spinner_hidden');
      box.appendChild(fragment);
   };

   pict.classList.add('main__picture');
   pict.setAttribute(
      'src',
      'https://images.unsplash.com/photo-1665686306574-1ace09918530?ixid=MnwyNjA2MzJ8MXwxfGFsbHwxfHx8fHx8Mnx8MTY2NjA0MzM4OA&ixlib=rb-1.2.1'
   );

   const par = document.createElement('p');
   par.classList.add('main__msg');
   par.textContent = 'Клик по картинке для копирования URL';

   const fragment = document.createDocumentFragment();
   fragment.appendChild(pict);
   fragment.appendChild(par);

   pict.onclick = function () {
      navigator.clipboard.writeText(pict.getAttribute('src')).then(
         () => {
            par.textContent = 'URL успешно скопирован';
         },
         () => {
            par.textContent = 'URL не скопирован';
         }
      );
   };
}
