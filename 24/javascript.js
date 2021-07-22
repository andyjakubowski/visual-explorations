function handleDOMContentLoaded() {
  const barRectsHTMLCollection = document.getElementsByClassName(
    'bar__rect-fill'
  );
  const barRects = [...barRectsHTMLCollection];
  let isDragging;

  function arraySum(array) {
    return array.reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);
  }

  function run() {
    let numbers = [];

    for (let i = 0; i < 10; i += 1) {
      numbers.push(Math.random());
    }

    const sum = arraySum(numbers);
    const ratios = numbers.map((number) => (number / sum) * 100);

    barRects.forEach((rect, index) => {
      rect.style.height = `${ratios[index]}%`;
    });
  }

  function handlePointerDown() {
    isDragging = true;
  }

  function handlePointerUp() {
    isDragging = false;
  }

  function handlePointerMove() {
    if (isDragging) {
      run();
    }
  }

  function handleClick() {
    run();
  }

  document.addEventListener('pointerdown', handlePointerDown);
  document.addEventListener('pointerup', handlePointerUp);
  document.addEventListener('pointermove', handlePointerMove);
  document.addEventListener('click', handleClick);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
} else {
  handleDOMContentLoaded();
}
