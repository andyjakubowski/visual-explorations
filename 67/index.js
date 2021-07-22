function handleDOMContentLoaded() {
  const INTERVAL_MS = 10;
  const elLabel = document.getElementById('msLabel');
  const elButton = document.getElementById('button');
  const elDateStart = document.getElementById('dateStart');
  const elDateEnd = document.getElementById('dateEnd');
  let ms = 0;
  let isRunning = false;
  let dateStart = null;
  let dateEnd = null;

  const clickHandler = (function makeClickHandler() {
    let id;

    return function clickHandler() {
      if (!isRunning) {
        dateStart = !dateStart ? Date.now() : null;
        dateEnd = null;
        elDateEnd.textContent = '';
        id = setInterval(() => {
          elDateStart.textContent = String(dateStart);
          ms = Date.now() - dateStart;
          dateEnd = Date.now();
          elLabel.textContent = ms;
        }, INTERVAL_MS);
      } else {
        clearInterval(id);
        dateStart = null;
        elDateEnd.textContent = String(dateEnd);
      }
      isRunning = !isRunning;
    };
  })();

  elButton.addEventListener('click', clickHandler);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
} else {
  handleDOMContentLoaded();
}
