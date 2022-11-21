class ShortURL extends Widget {
   constructor(node) {
      super(Widget.checkNode);
      this.node = node;

      this.checkNode(this.node);
   }
}

ShortURL.tmplStart = () => ({});

ShortURL.tmplResult = () => ({});
