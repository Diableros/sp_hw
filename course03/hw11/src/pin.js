class PinCode extends Widget {
   constructor(node) {
      super(Widget.checkNode);
      this.node = node;

      this.checkNode(this.node);
      this.renderCreateForm = this.renderCreateForm.bind(this);
      this.showInvalidAnimation = this.showInvalidAnimation.bind(this);

      if (localStorage.getItem('pin')) {
         this.renderEnterForm();
      } else {
         myModal.show(
            'alert',
            'PIN-код не найден!',
            'Создайте PIN-код в специальной форме.',
            4,
            this.renderCreateForm
         );
      }
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
         let flag = false;
         for (let field of fields) {
            field.value === '' ? (flag = false) : (flag = true);
         }
         if (flag) this.checkEnter(event, fields, realPin);
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

         for (let field of fields) {
            if (field.validity.valid) {
               field.classList.add('pin-enter__input--valid');
               field.classList.remove('pin-enter__input--invalid');
            } else {
               field.classList.add('pin-enter__input--invalid');
               field.classList.remove('pin-enter__input--valid');
            }
         }
      };

      form.addEventListener('input', handler);
      form.addEventListener('keydown', handler);
      form.addEventListener('paste', handler);

      resetPinLink.addEventListener('click', () => {
         myModal.show(
            'confirm',
            'Внимание!',
            'Отменить удаление будет НЕВОЗМОЖНО. Действительно хотите удалить?',
            0,
            () => {
               localStorage.removeItem('pin');
               this.home();
            }
         );
      });
   }

   // не помню для чего, но для чего то проверку вынес в отдельный метод Ж))
   checkEnter(event, fields, realPin) {
      event.preventDefault();

      const userPin = [...fields].map((field) => field.value).join('');

      if (realPin === userPin) {
         myModal.show('alert', 'Поздравляю вы вошли!', '', 5, this.home);
      } else {
         myModal.show(
            'alert',
            'PIN-код не верный.',
            'Попробуйте ещё раз.',
            3,
            this.home
         );
      }
   }

   focusNext(node) {
      if (node.nextElementSibling) {
         node.nextElementSibling.value = '';
         node.nextElementSibling.focus();
      }
   }

   showInvalidAnimation() {
      const msg = this.node.querySelector('.pin-create__msg');

      msg.classList.add('blink');

      setTimeout(function () {
         msg.classList.remove('blink');
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
                     required: '',
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
