let hoveredEl = null;

const listEls = Object.entries(colors).map((outsideColor) => {
  const listEl = document.createElement('div');

  const comboEls = Object.entries(colors).map((insideColor) => {
    const comboEl = document.createElement('div');
    const colorCouple = [outsideColor, insideColor];

    const colorEls = colorCouple.map(([key, value]) => {
      const colorEl = document.createElement('div');
      const labelEl = document.createElement('div');
      const swatchEl = document.createElement('div');

      labelEl.textContent = key;
      swatchEl.style.setProperty('background-color', value);
      labelEl.classList.add('label');
      swatchEl.classList.add('swatch');
      colorEl.classList.add('color');
      colorEl.append(labelEl, swatchEl);
      return colorEl;
    });

    comboEl.classList.add('combo');
    comboEl.append(...colorEls);
    comboEl.addEventListener('click', (e) => e.currentTarget.remove());
    // comboEl.addEventListener(
    //   'pointerover',
    //   (e) => (hoveredEl = e.currentTarget)
    // );
    // comboEl.addEventListener('pointerout', (e) => (hoveredEl = null));
    return comboEl;
  });

  listEl.classList.add('combo-list');
  listEl.append(...comboEls);
  return listEl;
});

document.body.append(...listEls);
document.addEventListener('keydown', (e) => {
  // console.log('keydown', e.key);
  if (e.key === 'd') {
    hoveredEl.remove();
  }
  // console.log('keydown, event object:', e);
});
