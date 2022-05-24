function handleDOMContentLoaded() {
  // is a given value window?
  // setInterval method is only available for window object
  const isWindowObject = function (value) {
    return value != null && typeof value === 'object' && 'setInterval' in value;
  };
  const freeSelf = isWindowObject(typeof self == 'object' && self) && self;
  const navigator = freeSelf && freeSelf.navigator;
  const userAgent = ((navigator && navigator.userAgent) || '').toLowerCase();
  console.log('userAgent:', userAgent);
  document.body.append(userAgent);
  // is current browser safari?
  // parameter is optional
  // is.safari = function (range) {
  //   var match = userAgent.match(/version\/(\d+).+?safari/);
  //   return match !== null && compareVersion(match[1], range);
  // };
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
} else {
  handleDOMContentLoaded();
}
