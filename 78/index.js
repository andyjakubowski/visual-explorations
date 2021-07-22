const clamp = function clamp(min, val, max) {
  return Math.max(min, Math.min(val, max));
};

const hsvaToHsla = function hsvaToHsla({ h, s: sv, v, a = 1.0 }) {
  const l = v * (1 - sv / 2);
  let sl;
  if (l === 0 || l === 1) {
    sl = 0;
  } else {
    sl = (v - l) / Math.min(l, 1 - l);
  }

  return { h, s: sl, l, a };
};

const hslaToHsva = function hslaToHsva({ h, s: sl, l, a = 1.0 }) {
  const v = l + sl * Math.min(l, 1 - l);
  const sv = v === 0 ? 0 : 2 * (1 - l / v);

  return { h, s: sv, v, a };
};

const handleVisibilityChange = function handleVisibilityChange(event) {
  if (document.visibilityState === 'hidden') {
    send({ type: 'visibilitychange.hidden' });
  }
};

const addDraggingListeners = function addDraggingListeners() {
  document.addEventListener('pointermove', send);
  document.addEventListener('pointerup', send);
  document.addEventListener('pointercancel', send);
  document.addEventListener('visibilitychange', handleVisibilityChange);
  window.addEventListener('pagehide', send);
};

const removeDraggingListeners = function removeDraggingListeners() {
  document.removeEventListener('pointermove', send);
  document.removeEventListener('pointerup', send);
  document.removeEventListener('pointercancel', send);
  document.removeEventListener('visibilitychange', handleVisibilityChange);
  window.removeEventListener('pagehide', send);
};

const addIdleListeners = function addIdleListeners() {
  saturationEl.addEventListener('pointerdown', send);
};

const removeIdleListeners = function removeIdleListeners() {
  saturationEl.removeEventListener('pointerdown', send);
};

function wait(ms) {
  var start = new Date().getTime();
  var end = start;
  while (end < start + ms) {
    end = new Date().getTime();
  }
}

const calculateColor = function calculateColor(
  pointerLeftDocument,
  pointerTopDocument
) {
  // wait(10);
  const saturationRect = saturationEl.getBoundingClientRect();
  const left = pointerLeftDocument - (saturationRect.left + window.scrollX);
  const top = pointerTopDocument - (saturationRect.top + window.scrollY);
  hsva = {
    h: hsva.h,
    s: clamp(0, left, saturationRect.width) / saturationRect.width,
    v: 1 - clamp(0, top, saturationRect.height) / saturationRect.height,
    a: hsva.a,
  };
  hsla = hsvaToHsla(hsva);
};

const updateMarkerPosition = function updateMarkerPosition(saturationRect) {
  const left = hsva.s * saturationRect.width;
  const top = (1 - hsva.v) * saturationRect.height;
  saturationMarkerEl.style.setProperty('--pointer-left', left);
  saturationMarkerEl.style.setProperty('--pointer-top', top);
};

const debouncedUpdateColor = (function makeDebouncedUpdateColor() {
  let didScheduleAnimationFrame = false;

  return function debouncedUpdateColor({
    pageX: pointerLeftDocument,
    pageY: pointerTopDocument,
  }) {
    if (!didScheduleAnimationFrame) {
      console.log('scheduling an animation frame');
      didScheduleAnimationFrame = true;
      requestAnimationFrame(() => {
        calculateColor(pointerLeftDocument, pointerTopDocument);
        outputColorToDOM();
        didScheduleAnimationFrame = false;
      });
    } else {
      console.log('already scheduled a frame - bouncing');
    }
  };
})();

const machine = {
  initial: 'idle',
  states: {
    idle: {
      entry: [addIdleListeners, outputColorToDOM],
      exit: [removeIdleListeners],
      on: {
        pointerdown: {
          target: 'dragging',
        },
      },
    },
    dragging: {
      entry: [addDraggingListeners, debouncedUpdateColor],
      exit: [removeDraggingListeners],
      on: {
        pointerup: {
          target: 'idle',
        },
        pointercancel: {
          target: 'idle',
        },
        'visibilitychange.hidden': {
          target: 'idle',
        },
        pagehide: {
          target: 'idle',
        },
        pointermove: {
          actions: [debouncedUpdateColor],
        },
      },
    },
  },
};

function callActions(actions, event) {
  actions.forEach(function callAction(action) {
    action.call(null, event);
  });
}

function callEntryActions(state, event) {
  const actions = machine.states[state]?.entry || [];
  callActions(actions, event);
}

function callExitActions(state, event) {
  const actions = machine.states[state]?.exit || [];
  callActions(actions, event);
}

function callTransitionActions(state, event) {
  const actions = machine.states[state]?.on?.[event.type]?.actions || [];
  callActions(actions, event);
}

function transition(state, event) {
  return machine.states[state]?.on?.[event]?.target || state;
}

let hsla = {
  h: 120,
  s: 0.5,
  l: 0.5,
  a: 1.0,
};
let hsva = hslaToHsva(hsla);
let scheduledAnimationFrame = false;
let currentState;
let pickerEl;
let saturationEl;
let saturationMarkerEl;
let hueSliderEl;
let alphaSliderEl;

// const debounce = function debounce(functionToDebounce) {
//   let scheduledCallback = null;

//   return function debouncedFunction() {
//     if (!scheduledCallback) {
//       functionToDebounce(() => {});
//     }
//   };
// };

// const debouncedRequestAnimationFrame = (function makeDebouncedRequestAnimationFrame() {
//   let didScheduleAnimationFrame = false;

//   return function debouncedRequestAnimationFrame(callback) {
//     if (!didScheduleAnimationFrame) {
// console.log('scheduling an animation frame');
//       requestAnimationFrame(() => {
//         didScheduleAnimationFrame = false;
//         callback();
//       });
//       didScheduleAnimationFrame = true;
//     } else {
// console.log('already scheduled a frame - bouncing');
//     }
//   };
// })();

function send(event) {
  const prevState = currentState;
  const nextState = transition(currentState, event.type);
  callTransitionActions(prevState, event);

  if (prevState !== nextState) {
    callExitActions(prevState, event);
    callEntryActions(nextState, event);
  }

  currentState = nextState;
  // console.log(`${prevState} → ${event.type} → ${currentState}`);
}

function setElReferences() {
  pickerEl = document.getElementsByClassName('picker').item(0);
  saturationEl = pickerEl.getElementsByClassName('saturation').item(0);
  saturationMarkerEl = saturationEl
    .getElementsByClassName('saturation__selection-marker')
    .item(0);
  hueSliderEl = pickerEl.getElementsByClassName('hue').item(0);
  alphaSliderEl = pickerEl.getElementsByClassName('alpha').item(0);
}

function outputColorToCss() {
  Object.entries(hsla).forEach(([key, value]) => {
    pickerEl.style.setProperty(`--${key}`, value);
  });
}

function outputColorToDataAttribute() {
  pickerEl.dataset.hsla = `h: ${hsla.h},  s: ${hsla.s.toFixed(
    3
  )}, l: ${hsla.l.toFixed(3)}, a: ${hsla.a}`;
}

function outputColorToDOM() {
  const saturationRect = saturationEl.getBoundingClientRect();
  outputColorToCss();
  outputColorToDataAttribute();
  updateMarkerPosition(saturationRect);
}

function updateColor({
  pageX: pointerLeftDocument,
  pageY: pointerTopDocument,
}) {
  calculateColor(pointerLeftDocument, pointerTopDocument);
  outputColorToDOM();
}

function handleHueChange(event) {
  const { value } = event.target;
  hsva.h = Number(value);
  hsla.h = Number(value);
  outputColorToDOM();
}

function handleAlphaChange(event) {
  const { value } = event.target;
  hsva.a = Number(value);
  hsla.a = Number(value);
  outputColorToDOM();
}

function handleDOMContentLoaded() {
  setElReferences();
  currentState = machine.initial;
  callEntryActions(currentState);

  hueSliderEl.addEventListener('input', handleHueChange);
  alphaSliderEl.addEventListener('input', handleAlphaChange);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
} else {
  handleDOMContentLoaded();
}
