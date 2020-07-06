let names;
let activeIndex = 0;
let interval;

function currentNameElement() {
  return names[activeIndex];
}

function nextNameElement() {
  if (activeIndex === names.length - 1) {
    activeIndex = 0;
  } else {
    activeIndex += 1;
  }

  return names[activeIndex];
}

function fadeText() {
  names = document.getElementsByClassName('name');
  interval = setInterval(() => {
    currentNameElement().classList.toggle('visible', false);
    nextNameElement().classList.toggle('visible', true);
  }, 5000);
}

function handleDOMContentLoaded() {
  fadeText();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
} else {
  handleDOMContentLoaded();
}
