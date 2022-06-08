const listEls = Object.entries(colors).map((outsideColor) => {
  const listEl = document.createElement('div');

  const comboEls = Object.entries(colors).map((insideColor) => {
    const comboEl = document.createElement('div');
    const colorCouple = [outsideColor, insideColor];

    const colorEls = colorCouple.map(([key, value]) => {
      console.log('key', key);
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
    return comboEl;
  });

  listEl.classList.add('combo-list');
  listEl.append(...comboEls);
  return listEl;
});

document.body.append(...listEls);
