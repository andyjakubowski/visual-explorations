let inputEl;

function start() {
  inputEl = document.getElementById('number-input');
  inputEl.addEventListener('keydown', (e) => {
    const { altKey, ctrlKey, metaKey } = e;
    const modKeyPressedBools = [altKey, ctrlKey, metaKey];
    const isModKeyPressed = modKeyPressedBools.some((isPressed) => isPressed);
    if (isModKeyPressed) {
      return;
    }

    if (e.shiftKey && e.key === 'ArrowUp') {
      e.preventDefault();
      inputEl.value = Number(inputEl.value) + 10;
    }
    if (e.shiftKey && e.key === 'ArrowDown') {
      e.preventDefault();
      inputEl.value = Number(inputEl.value) - 10;
    }
  });

}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', start);
} else {
  start();
}
