function handleDOMContentLoaded() {
  const button = document.getElementById('button');
  const image = document.getElementById('image');
  button.addEventListener('click', () => {
    console.log('button clicked.');
    console.log('setting src attr on image.');
    image.src = 'https://picsum.photos/id/237/200/200';
  });
  window.addEventListener('load', (e) =>
    console.log('load fired on window element: ', e)
  );
  image.addEventListener('load', (e) =>
    console.log('load fired on image element: ', e)
  );
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
} else {
  handleDOMContentLoaded();
}
