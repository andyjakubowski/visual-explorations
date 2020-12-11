function handleDOMContentLoaded() {
  App.init();
}

let rootEl;

const App = (function buildApp() {
  function render(data) {}

  function updateCSSCustomProps() {
    rootEl.style.setProperty('--test', 'red');
  }

  function addEventListeners() {}

  function setDomReferences() {
    rootEl = document.documentElement;
    colorInputEl = document.getElementsByClassName('color-well__input').item(0);
  }

  return {
    async init() {
      setDomReferences();
      updateCSSCustomProps();
    },
  };
})();

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
} else {
  handleDOMContentLoaded();
}
