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
        fetch(`/extensions/${this.id}/api/example-api?samplekey=samplevalue`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${window.API.jwt}`,
          },
          body: JSON.stringify({[key.value]: value.value}),
        }).then((res) => {
          return res.json();
        }).then((body) => {
          pre.innerText = JSON.stringify(body, null, 2);
        }).catch((e) => {
          pre.innerText = e.toString();
        });
      });
    }
  }

  new ExampleExtension();
})();
