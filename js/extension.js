(function() {
  class ExampleExtension extends Extension {
    constructor() {
      super('example-extension');
      this.element = this.addMenuEntry('Example Extension');
    }

    show() {
      const content = `<div id="extension-example-extension-content">
          <h1>Hello, world!</h1>
        </div>`;

      this.element.innerHTML = content;
    }
  }

  new ExampleExtension();
})();
