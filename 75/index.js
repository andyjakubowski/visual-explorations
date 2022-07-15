let eventLog = JSON.parse(localStorage.getItem('eventLog')) || [];
// let timeoutId;
eventLog.push('JavaScript starts executing');

function clearLog() {
  localStorage.clear();
  eventLog = [];
  console.clear();
  console.log('localStorage and eventLog cleared.');
}

function logEvent(event, target = 'document') {
  const lastEvent = eventLog[eventLog.length - 1];
  const newEvent = `${target}: ${event.type}`;
  if (newEvent !== lastEvent) {
    eventLog.push(newEvent);
  }
  localStorage.setItem('eventLog', JSON.stringify(eventLog));
  // clearInterval(timeoutId);
  // timeoutId = setTimeout(() => console.clear(), 5000);
  console.log(newEvent);
}

function logVisibilityChange(event) {
  logEvent({
    type: `${event.type}: ${document.visibilityState}`,
  });
}

function handleDOMContentLoaded() {
  const pointerEventNames = [
    'pointerover',
    'pointerenter',
    'pointerdown',
    'pointermove',
    'pointerup',
    'pointercancel',
    'pointerout',
    'gotpointercapture',
    'lostpointercapture',
  ];
  pointerEventNames.forEach((eventName) => {
    document.addEventListener(eventName, (e) => logEvent(e, 'document'));
    // window.addEventListener(eventName, (e) => logEvent(e, 'window'));
  });
  document.addEventListener('visibilitychange', logVisibilityChange);
  window.addEventListener('pagehide', (e) => logEvent(e, 'window'));
  window.addEventListener('blur', (e) => {
    logEvent(e, 'window');
    console.log(e);
  });
  window.addEventListener('focus', (e) => {
    logEvent(e, 'window');
    console.log(e);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
} else {
  handleDOMContentLoaded();
}
