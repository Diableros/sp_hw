class Modal extends Widget {
   constructor(node) {
      super(Widget.checkNode);
      this.node = node;

      this.checkNode(this.node);
   }

   show(header, message, timer) {
      console.log('node = ', this.node);
      console.log('message = ', message);
   }
}
