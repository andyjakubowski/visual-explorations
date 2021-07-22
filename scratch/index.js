function giveMeFive() {
  return 'five';
}

function handleDOMContentLoaded() {
  console.log('giveMeFive:', giveMeFive());
  console.log('nonexistentFunction:', this?.nonexistentFunction?.());
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
} else {
  handleDOMContentLoaded();
}
