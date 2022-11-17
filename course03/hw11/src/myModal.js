class MyModal extends Widget {
   constructor(node = document.body) {
      super(Widget.checkNode);
      this.node = node;

      this.checkNode(this.node);

      this.hide = this.hide.bind(this);
   }

   hide(callBack) {
      this.node.firstElementChild.remove();
      if (callBack instanceof Function || callBack) callBack();
   }

   show(type, header, message = '', timer = 5, callBack = null) {
      if (type === 'alert') {
         this.node.insertBefore(
            templateEngine(MyModal.templateAlert(header, message, timer)),
            this.node.firstElementChild
         );

         setTimeout(this.hide, timer * 1000, callBack);
      }

      if (type === 'confirm') {
         console.log('Модальный конфирм');
         this.node.insertBefore(
            templateEngine(MyModal.templateConfirm(header, message)),
            this.node.firstElementChild
         );
         const buttons = this.node.querySelector('.modal__buttons');

         buttons.addEventListener('click', (event) => {
            const target = event.target;

            if (target.dataset['command'] === 'ok') {
               this.node.firstElementChild.remove();
               callBack();
               pin.home();
               return true;
            }

            if (target.dataset['command'] === 'cancel') {
               this.node.firstElementChild.remove();
               return false;
            }
         });
      }
   }
}

MyModal.templateAlert = (header, message, timer) => ({
   tag: 'div',
   cls: 'modal',
   content: [
      {
         tag: 'div',
         cls: 'modal__window',
         content: [
            {
               tag: 'h1',
               cls: 'modal__header',
               content: header,
            },
            {
               tag: 'p',
               cls: 'modal__message',
               content: message,
            },
            {
               tag: 'div',
               cls: 'modal__countdown',
               attrs: {
                  style: `animation: countdown ${timer}s linear`,
               },
            },
         ],
      },
   ],
});

MyModal.templateConfirm = (header, message) => ({
   tag: 'div',
   cls: 'modal',
   content: [
      {
         tag: 'div',
         cls: 'modal__window',
         content: [
            {
               tag: 'h1',
               cls: 'modal__header',
               content: header,
            },
            {
               tag: 'p',
               cls: 'modal__message',
               content: message,
            },
            {
               tag: 'div',
               cls: 'modal__buttons',
               content: [
                  {
                     tag: 'button',
                     cls: ['modal__button', 'main__btn', '_hover'],
                     attrs: {
                        'data-command': 'ok',
                     },
                     content: 'Да',
                  },
                  {
                     tag: 'button',
                     cls: ['modal__button', 'main__btn', '_hover'],
                     attrs: {
                        'data-command': 'cancel',
                     },
                     content: 'Отмена',
                  },
               ],
            },
         ],
      },
   ],
});
