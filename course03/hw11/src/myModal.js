class MyModal extends Widget {
   constructor(node) {
      super(Widget.checkNode);
      this.node = node;

      this.checkNode(this.node);

      this.hide = this.hide.bind(this);
   }

   hide() {
      this.node.firstElementChild.remove();
   }

   show(header, message, timer) {
      this.node.insertBefore(
         templateEngine(MyModal.templateObj(header, message, timer)),
         this.node.firstElementChild
      );

      setTimeout(this.hide, timer * 1000);
   }
}

MyModal.templateObj = (header, message, timer) => ({
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
