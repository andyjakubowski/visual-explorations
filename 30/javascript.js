function handleDOMContentLoaded() {
  App.init();
}

let rootEl;

const App = (function buildApp() {
  function render(data) {}

  function addEventListeners() {}

  function setDomReferences() {
    rootEl = document.documentElement;
  }

  return {
    async init() {
      setDomReferences();
    },
  };
})();

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
} else {
  handleDOMContentLoaded();
}
