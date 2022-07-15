function handleDOMContentLoaded() {
  console.log('hello');
  window.addEventListener('pointermove', (e) => {
    console.log(
      `pointermove, pageX: ${Math.round(e.pageX)}, pageY: ${Math.round(
        e.pageY
      )}`
    );
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
} else {
  handleDOMContentLoaded();
}
