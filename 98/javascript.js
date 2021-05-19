let slider;

function start() {
  // Select the node that will be observed for mutations
  slider = document.getElementById('range-input');

  slider.addEventListener('input', (e) => {
    // slider.setAttribute('value', e.target.value);
  });

  // Options for the observer (which mutations to observe)
  const config = { attributes: true, childList: true, subtree: true };

  // Callback function to execute when mutations are observed
  const callback = function (mutationsList, observer) {
    // Use traditional 'for loops' for IE 11
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        console.log('A child node has been added or removed.');
      } else if (mutation.type === 'attributes') {
        console.log(
          'The ' + mutation.attributeName + ' attribute was modified.'
        );
      }
    }
  };

  // Create an observer instance linked to the callback function
  const observer = new MutationObserver(callback);

  // Start observing the target node for configured mutations
  observer.observe(slider, config);

  document.body.append('yoyoyo');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', start);
} else {
  start();
}
