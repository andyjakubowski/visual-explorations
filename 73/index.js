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
  const elBox = document.getElementById('box');
  const elButtonPseudoStyler = document.getElementById(
    'buttonActivatePseudoStyler'
  );
  window.elBox = elBox;

  elButtonPseudoStyler.addEventListener('click', setUpPseudoStyler);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
} else {
  handleDOMContentLoaded();
}

// PEDAC
