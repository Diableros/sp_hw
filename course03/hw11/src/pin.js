class PinCode extends Widget {
   constructor(node) {
      super(Widget.checkNode);
      this.node = node;

      this.checkNode(this.node);
      this.renderCreateForm = this.renderCreateForm.bind(this);
      this.showInvalidAnimation = this.showInvalidAnimation.bind(this);
   }

   filterValue(value) {
      const validChars = '0123456789';
      value = value
         .split('')
         .filter((char) => validChars.includes(char))
         .join('');
      return value;
   }

   renderCreateForm() {
      this.node.appendChild(templateEngine(PinCode.templateCreate()));

      const form = this.node.querySelector('.pin-create');
      const input = this.node.querySelector('.pin-create__input');

      form.addEventListener('input', () => {
         input.value = this.filterValue(input.value);

         if (input.validity.valid) {
            input.classList.remove('pin-create__input--invalid');
            input.classList.add('pin-create__input--valid');
         }

         if (!input.validity.valid) {
            input.classList.remove('pin-create__input--valid');
            input.classList.add('pin-create__input--invalid');
         }

         if (input.value === '') {
            input.classList.remove('pin-create__input--valid');
            input.classList.remove('pin-create__input--invalid');
         }
      });

      form.addEventListener('submit', (event) => {
         event.preventDefault();

         if (!input.validity.valid) {
            this.showInvalidAnimation();
         } else {
            this.createNewPinCode(input.value);
            this.home();
         }
      });
   }

   renderEnterForm() {
      const realPin = localStorage.getItem('pin');
      this.node.appendChild(templateEngine(PinCode.templateEnter(realPin)));

      this.node.querySelector('.pin-enter__input').focus();

      const form = this.node.querySelector('.pin-enter');
      const resetPinLink = this.node.querySelector('.pin-enter__reset-pin');
      const fields = this.node.querySelectorAll('.pin-enter__input');
      const btn = this.node.querySelector('.pin-enter__btn');

      btn.addEventListener('click', (event) => {
         event.preventDefault();

         const userPin = [...fields].map((field) => field.value).join('');

         if (realPin === userPin) {
            myModal.show('Поздравляю вы вошли!', '', 5, this.home);
         } else {
            myModal.show(
               'PIN-код не верный.',
               'Попробуйте ещё раз.',
               5,
               this.home
            );
         }
      });

      const handler = (event) => {
         event.preventDefault();

         const target = event.target;

         const fillFields = (value) => {
            for (let field of fields) {
               field = '';
            }

            for (let i = 0; i < fields.length; i++) {
               if (value[i]) {
                  fields[i].value = value[i];
               } else {
                  fields[i].focus();
                  break;
               }
            }
         };

         if (event.type === 'paste') {
            fillFields(this.filterValue(event.clipboardData.getData('Text')));
         }

         if (event.inputType === 'insertFromDrop') {
            const value = target.value;
            target.value = '';
            fillFields(this.filterValue(value));
         }

         if (event.type === 'keydown') {
            if (!target.value) {
               target.value = this.filterValue(event.key);
               if (target.value) this.focusNext(target);
            }
         }

         if (event.key === 'Backspace') {
            if (target.value === '') {
               if (target.previousElementSibling) {
                  target.previousElementSibling.value = '';
                  target.previousElementSibling.focus();
               }
            } else {
               target.value = '';
            }
         }
      };

      form.addEventListener('input', handler);
      form.addEventListener('keydown', handler);
      form.addEventListener('paste', handler);

      resetPinLink.addEventListener('click', () => {
         if (
            confirm(
               'Внимание!\nОтменить удаление будет НЕВОЗМОЖНО.\nДействительно хотите удалить?'
            )
         ) {
            localStorage.removeItem('pin');
            this.home();
         }
      });
   }

   focusNext(node) {
      if (node.nextElementSibling) {
         node.nextElementSibling.value = '';
         node.nextElementSibling.focus();
      }
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
      localStorage.setItem('pin', pin);
   }

   home() {
      document.location.href = './';
   }
}

PinCode.templateCreate = () => ({
   tag: 'form',
   cls: 'pin-create',
   attrs: {
      novalidate: '',
      autocomplete: 'off',
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
            name: 'pin',
            size: '10',
            pattern: '(^[0-9]{4,10}$)',
            name: 'create_pin',
            maxlength: '10',
            minlength: '4',
            required: '',
         },
      },
      {
         tag: 'button',
         cls: ['pin-create__btn', 'main__btn', '_hover'],
         content: 'Создать PIN-код',
      },
   ],
});

PinCode.templateEnter = (realPin) => ({
   tag: 'form',
   cls: 'pin-enter',
   attrs: {
      novalidate: '',
   },
   content: [
      {
         tag: 'h1',
         cls: 'pin-enter__header',
         content: 'Введите PIN-код',
      },
      {
         tag: 'div',
         cls: 'pin-enter__box',
         content: [
            realPin.split('').map(() => {
               return {
                  tag: 'input',
                  cls: 'pin-enter__input',
                  attrs: {
                     size: '1',
                     // maxlength: '1',
                     autocomplete: 'new-password',
                  },
               };
            }),
         ],
      },
      {
         tag: 'button',
         cls: ['pin-enter__btn', 'main__btn', '_hover'],
         content: 'Войти',
         attrs: {
            default: '',
         },
      },
      {
         tag: 'p',
         cls: 'pin-enter__reset-pin',
         content: 'Сбросить PIN-code',
      },
   ],
});
