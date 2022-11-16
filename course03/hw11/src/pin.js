class PinCode extends Widget {
   constructor(node) {
      super(Widget.checkNode);
      this.node = node;

      this.checkNode(this.node);
      this.renderCreateForm = this.renderCreateForm.bind(this);
      this.checkValid = this.checkValid.bind(this);
   }

   renderCreateForm() {
      console.log('Рендерим форму создания пин-кода');
      this.node.appendChild(templateEngine(PinCode.templateCreate()));
   }

   checkValid() {}
}

PinCode.templateCreate = () => ({
   tag: 'form',
   cls: 'pin-create',
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
            size: 10,
            pattern: '(^[0-9]{4,10}$)',
            name: 'pin',
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
