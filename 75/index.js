let eventLog = JSON.parse(localStorage.getItem('eventLog')) || [];
// let timeoutId;
eventLog.push('JavaScript starts executing');

function clearLog() {
  localStorage.clear();
  eventLog = [];
  console.log('localStorage and eventLog cleared.');
}

function logEventType(event) {
  const lastEventType = eventLog[eventLog.length - 1];
  if (event.type !== lastEventType) {
    eventLog.push(event.type);
  }
  localStorage.setItem('eventLog', JSON.stringify(eventLog));
  // clearInterval(timeoutId);
  // timeoutId = setTimeout(() => console.clear(), 5000);
  console.log(event.type);
}

function logVisibilityChange(event) {
  logEventType({
    type: `${event.type}: ${document.visibilityState}`,
  });
}

function handleDOMContentLoaded() {
  const pointerEventNames = [
    'pointerover',
    'pointerenter',
    'pointerdown',
    // 'pointermove',
    // 'pointerup',
    'pointercancel',
    'pointerout',
    'gotpointercapture',
    'lostpointercapture',
  ];
  pointerEventNames.forEach((eventName) => {
    document.body.addEventListener(eventName, logEventType);
  });
  document.addEventListener('pointermove', logEventType);
  document.addEventListener('pointerup', logEventType);
  document.addEventListener('visibilitychange', logVisibilityChange);
  window.addEventListener('pagehide', logEventType);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
} else {
  handleDOMContentLoaded();
}
