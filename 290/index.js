function handleDOMContentLoaded() {
  const boxEl = document.getElementById('box');
  const observer = new ResizeObserver((entries) => {
    entries.forEach(console.log);
  });
  observer.observe(boxEl);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
} else {
  handleDOMContentLoaded();
}
