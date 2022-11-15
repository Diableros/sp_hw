class PinCode extends Widget {
   constructor(node) {
      super(Widget.checkNode);
      this.node = node;

      this.checkNode(this.node);

      this.hide = this.hide.bind(this);
   }
}

PinCode.templateCreate = () => ({});

PinCode.templateEnter = () => ({});
