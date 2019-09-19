(function() {
  class ExampleExtension extends Extension {
    constructor() {
      super('example-extension');
      this.element = this.addMenuEntry('Example Extension');
      this.content = '';

      fetch(`/extensions/${this.id}/views/content.html`)
        .then((res) => res.text())
        .then((text) => this.content = text)
        .catch((e) => console.error('Failed to fetch content:', e));
    }

    show() {
      this.element.innerHTML = this.content;
    }
  }

  new ExampleExtension();
})();
