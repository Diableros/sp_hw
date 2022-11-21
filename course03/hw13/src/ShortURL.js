class ShortURL extends Widget {
   constructor(node) {
      super(Widget.checkNode);
      this.node = node;

      this.checkNode(this.node);

      console.log('ShotURL new instance was created.');

      this.renderStart();
   }

   renderStart() {
      console.log('renderStart() was called.');
      this.node.appendChild(templateEngine(ShortURL.tmplStart()));

      const form = document.querySelector('.form');
      const input = form.querySelector('.form__input');
      const msg = form.querySelector('.form__msg');

      const eventHandler = (event) => {
         event.preventDefault();

         const valid = this.checkValidity(input.value);

         if (event.type === 'submit' && valid) {
            console.log('Отправляем запрос на сервак');
         }

         if (event.type === 'submit' && !valid) {
            msg.classList.remove('form__msg--hidden');
            msg.setAttribute('style', 'animation: 1 0.4s ease invalidInput');
            setTimeout(() => {
               msg.removeAttribute('style');
            }, 500);
         }

         if (event.type === 'input' && valid) {
            msg.classList.add('form__msg--hidden');
         }
      };

      form.addEventListener('submit', eventHandler);
      input.addEventListener('input', eventHandler);
   }

   getShortURL(longURL) {}

   checkValidity(url) {
      const regExp = new RegExp(
         /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,}(:[0-9]{1,5})?(\/.*)?$/g
      );
      return regExp.test(url);
   }
}

ShortURL.tmplStart = () => ({
   tag: 'form',
   cls: 'form',
   attrs: {
      novalidate: '',
   },
   content: [
      {
         tag: 'input',
         cls: 'form__input',
         attrs: {
            type: 'url',
            name: 'url',
            placeholder: 'Введите полный URL',
            size: '30',
         },
      },
      {
         tag: 'button',
         cls: ['form__btn', 'main__btn', '_hover'],
         content: 'Получить короткий URL',
      },
      {
         tag: 'p',
         cls: ['form__msg', 'form__msg--hidden'],
         content: 'Не правильный формат URL',
      },
   ],

   // <form class="form">
   //    <input
   //       class="form__input"
   //       type="text"
   //       name="url"
   //       placeholder="Введите полный URL"
   //       size="30"
   //    />
   //    <button class="form__btn main__btn _hover">
   //       Получить которткий URL
   //    </button>
   // </form>
});

ShortURL.tmplResult = () => ({});
