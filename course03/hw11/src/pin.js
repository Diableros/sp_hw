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
      console.log('Рендерим форму создания пин-кода');
      this.node.appendChild(templateEngine(PinCode.templateCreate()));

      // сразу после создания навешиваем ограничения ввода
      const form = this.node.querySelector('.pin-create');
      const input = this.node.querySelector('.pin-create__input');
      // const validChars = '0123456789';
      form.addEventListener('input', () => {
         input.value = this.filterValue(input.value);
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

      const handler = (event) => {
         const target = event.target;

         if (event.inputType === 'insertFromDrop') {
         }

         if (event.inputType === 'insertText') {
            target.value = this.filterValue(target.value);
            if (target.value) this.focusNext(target);
         }

         if (event.key === 'Backspace' && target.value === '') {
            if (target.previousElementSibling)
               target.previousElementSibling.focus();
         }
      };

      form.addEventListener('input', handler);
      form.addEventListener('keydown', handler);

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
      if (node.nextElementSibling) node.nextElementSibling.focus();
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
                     maxlength: '1',
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
