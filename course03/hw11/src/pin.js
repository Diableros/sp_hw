class PinCode extends Widget {
   constructor(node) {
      super(Widget.checkNode);
      this.node = node;

      this.checkNode(this.node);
      this.renderCreateForm = this.renderCreateForm.bind(this);
      this.showInvalidAnimation = this.showInvalidAnimation.bind(this);
   }

   renderCreateForm() {
      console.log('Рендерим форму создания пин-кода');
      this.node.appendChild(templateEngine(PinCode.templateCreate()));

      // сразу после создания навешиваем ограничения ввода
      const form = this.node.querySelector('.pin-create');
      const input = this.node.querySelector('.pin-create__input');
      const validChars = '0123456789';

      form.addEventListener('input', () => {
         input.value = input.value
            .split('')
            .filter((char) => validChars.includes(char))
            .join('');
         if (input.validity.valid) {
            input.style = 'border: 1px solid lightgreen';
         } else {
            input.style = 'border: 1px solid red';
         }
      });

      form.addEventListener('submit', (event) => {
         event.preventDefault();

         if (!input.validity.valid) {
            this.showInvalidAnimation();
         } else {
            this.createNewPinCode(input.value);
         }
      });
   }

   showInvalidAnimation() {
      const msg = this.node.querySelector('.pin-create__msg');

      msg.style.animation = '3 0.4s  ease invalidInput';

      setTimeout(function () {
         console.log('Пытаемся удалить моргание текста');
         msg.removeAttribute('style');
      }, 1500);
   }

   createNewPinCode(pin) {
      try {
         localStorage.setItem('pin', pin);
         return true;
      } catch (e) {
         myModal.show(
            'Внимание!',
            'Ваш браузер не поддерживает функцию Local Storage! Измените настройки или воспользуйтесь другим браузером.',
            7,
            function () {
               document.location.href = '/';
            }
         );
         return false;
      }
   }
}

PinCode.templateCreate = () => ({
   tag: 'form',
   cls: 'pin-create',
   attrs: {
      novalidate: '',
   },
   content: [
      {
         tag: 'h1',
         cls: 'pin-create__header',
         content: 'Создать PIN-код',
      },
      {
         tag: 'p',
         cls: 'pin-create__msg',
         content: 'PIN-код должен состоять из 4-10 цифр',
      },
      {
         tag: 'input',
         cls: 'pin-create__input',
         attrs: {
            autocomplete: 'off',
            size: 10,
            pattern: '(^[0-9]{4,10}$)',
            name: 'create_pin',
            maxlength: '10',
            minlength: '4',
            required: 'required',
         },
      },
      {
         tag: 'button',
         cls: ['pin-create__btn', 'main__btn', '_hover'],
         content: 'создать',
      },
   ],
});

{
   /* <form class="pin-create">
               <h1 class="pin-create__header">Создать PIN-код</h1>
               <p class="pin-create__msg">
                  PIN-код должен состоять из 4-10 цифр
               </p>
               <input
                  class="pin-create__input"
                  size="10"
                  pattern="(^[0-9]{4,10}$)"
                  name="pin"
                  maxlength="10"
                  minlength="4"
                  required="required"
               />
               <button
                  class="pin-create__btn main__btn _hover"
                  pin-create__button
               >
                  Создать
               </button>
            </form> */
}
PinCode.templateEnter = () => ({});
