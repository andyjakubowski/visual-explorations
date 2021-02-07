function handleDOMContentLoaded() {
  console.log('hey');
  const elParagraph = document.getElementById('paragraph');
  elParagraph.textContent = ['one', 'two', 'three'].join('\n');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
} else {
  handleDOMContentLoaded();
}
