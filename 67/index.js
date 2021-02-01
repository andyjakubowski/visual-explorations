function handleDOMContentLoaded() {
  const INTERVAL_MS = 10;
  const elLabel = document.getElementById('msLabel');
  const elButton = document.getElementById('button');
  let ms = 0;
  let isRunning = false;

  const clickHandler = (function makeClickHandler() {
    let id;

    return function clickHandler() {
      if (!isRunning) {
        id = setInterval(() => {
          ms += INTERVAL_MS;
          elLabel.textContent = ms;
        }, INTERVAL_MS);
      } else {
        clearInterval(id);
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
