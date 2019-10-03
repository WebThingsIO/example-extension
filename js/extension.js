(function() {
  class ExampleExtension extends window.Extension {
    constructor() {
      super('example-extension');
      this.addMenuEntry('Example Extension');

      this.content = '';
      fetch(`/extensions/${this.id}/views/content.html`)
        .then((res) => res.text())
        .then((text) => {
          this.content = text;
        })
        .catch((e) => console.error('Failed to fetch content:', e));
    }

    show() {
      this.view.innerHTML = this.content;

      const key =
        document.getElementById('extension-example-extension-form-key');
      const value =
        document.getElementById('extension-example-extension-form-value');
      const submit =
        document.getElementById('extension-example-extension-form-submit');
      const pre =
        document.getElementById('extension-example-extension-response-data');

      submit.addEventListener('click', () => {
        window.API.postJson(
          `/extensions/${this.id}/api/example-api`,
          {[key.value]: value.value}
        ).then((body) => {
          pre.innerText = JSON.stringify(body, null, 2);
        }).catch((e) => {
          pre.innerText = e.toString();
        });
      });
    }
  }

  new ExampleExtension();
})();
