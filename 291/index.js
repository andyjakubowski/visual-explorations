function handleDOMContentLoaded() {
  const inputEl = document.getElementById('input');
  inputEl.addEventListener('keydown', (e) =>
    console.log(
      e.key,
      e.target.value,
      e.target.validity,
      `valid: ${e.target.validity.valid}`
    )
  );
  window.inputEl = inputEl;
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
} else {
  handleDOMContentLoaded();
}
