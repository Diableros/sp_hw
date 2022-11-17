class MyModal extends Widget {
   constructor(node = document.body) {
      super(Widget.checkNode);
      this.node = node;

      this.checkNode(this.node);

      this.hide = this.hide.bind(this);
   }

   hide(callBack) {
      this.node.firstElementChild.remove();
      if (callBack instanceof Function) callBack();
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
         this.node.insertBefore(
            templateEngine(MyModal.templateAlert(header, message, timer)),
            this.node.firstElementChild
         );
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
