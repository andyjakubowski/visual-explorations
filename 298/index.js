function handleDOMContentLoaded() {
  // is a given value window?
  // setInterval method is only available for window object
  const isWindowObject = function (value) {
    return value != null && typeof value === 'object' && 'setInterval' in value;
  };
  const freeSelf = isWindowObject(typeof self == 'object' && self) && self;
  const navigator = freeSelf && freeSelf.navigator;
  const userAgent = ((navigator && navigator.userAgent) || '').toLowerCase();
  const isSafari = /version\/(\d+).+?safari/.test(userAgent);
  document.body.append(`isSafari: ${isSafari}, userAgent: ${userAgent}`);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
} else {
  handleDOMContentLoaded();
}
