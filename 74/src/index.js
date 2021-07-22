import PseudoStyler from './pseudostyler';

function setUpPseudoStyler() {
  const elButton = document.getElementById('button');

  (async () => {
    let styler = new PseudoStyler();
    await styler.loadDocumentStyles();
    elButton.addEventListener('click', () => {
      styler.toggleStyle(elBox, ':hover');
      styler.toggleStyle(elBox, ':active');
    });
  })();
}

function handleDOMContentLoaded() {
  setUpPseudoStyler();
}

if (document.readyState === 'loading') {
  console.log('document:', document);
  document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
} else {
  handleDOMContentLoaded();
}

// PEDAC
