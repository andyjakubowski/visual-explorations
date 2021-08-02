const htmlStrings = [
`
<html style="background-color: burlywood;">
  <body style="background-color: white; padding: 16px;">
    <main id="flex-container" style="display: flex; gap: 8px; color: white;">
      <div style="background-color: royalblue;">Item One</div>
      <div style="background-color: royalblue;">Item Two</div>
      <div style="background-color: royalblue;">Item Three</div>
    </main>
    <script>
      console.log('hello from the first iframe');
      window.addEventListener('load', (event) => {
        const flexContainerEl = document.getElementById('flex-container');
        console.log('getComputedStyle(flexContainerEl).width:', getComputedStyle(flexContainerEl).width);
      });
    </script>
  </body>
</html>
`,
`
<html style="background-color: lightblue;">
  <body style="background-color: white;">
    <main id="flex-container" style="display: flex; gap: 8px; color: white; width: max-content; padding: 4px; background-color: #334">
      <div style="background-color: tomato;">A</div>
      <div style="background-color: tomato;">B</div>
      <div style="background-color: tomato;">C</div>
    </main>
    <script>
      console.log('hello from the second iframe');
      window.addEventListener('load', (event) => {
        const flexContainerEl = document.getElementById('flex-container');
        console.log('getComputedStyle(flexContainerEl).width:', getComputedStyle(flexContainerEl).width);
      });
    </script>
  </body>
</html>
`,
];

const previews = [
  {
    width: 200,
    height: 200,
  },
  {
    width: 100,
    height: 100,
  },
  {
    width: 300,
    height: 280,
  },
];

const iframeEls = [];

previews.forEach(({ width, height }, index) => {
  const gridItemEl = document.createElement('div');
  const iframeEl = document.createElement('iframe');
  iframeEl.title = `iframe ${index + 1}`;
  iframeEl.width = width;
  iframeEl.height = height;
  iframeEl.srcdoc = htmlStrings[0];
  gridItemEl.classList.add('grid-item');
  gridItemEl.append(iframeEl);
  document.body.append(gridItemEl);
  iframeEls.push(iframeEl);
});

htmlStrings.forEach((htmlString, index) => {
  const buttonEl = document.createElement('button');
  const ordinalString = index === 0 ? 'first' : 'second';
  buttonEl.textContent = `Show me the ${ordinalString} iframe`;
  buttonEl.addEventListener('click', () => {
    iframeEls.forEach((iframeEl) => {
      iframeEl.srcdoc = htmlString;
    })
  });
  document.body.append(buttonEl);
});