Array.from(document.querySelectorAll('[data-i18n]')).forEach(i => {
  i.textContent = browser.i18n.getMessage(i.dataset.i18n);
});

Array.from(document.querySelectorAll('input')).forEach(async input => {
  const name = input.name;
  let value = (await browser.storage.sync.get(name))[name];
  if (value == null && input.dataset.initial) {
    value = JSON.parse(input.dataset.initial);
  }
  if (input.type === 'checkbox') {
    input.checked = value;
  }
});

document.addEventListener('input', async event => {
  const input = event.target;
  if (input instanceof HTMLInputElement) {
    if (input.type === 'checkbox') {
      await browser.storage.sync.set({ [input.name]: input.checked });
    }
  }
});

