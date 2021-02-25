const clamp = function clamp(min, val, max) {
  return Math.max(min, Math.min(val, max));
};

const hsvToHsl = function hsvToHsl({ h, s: sv, v, a = 1.0 }) {
  const l = v * (1 - sv / 2);
  let sl;
  if (l === 0 || l === 1) {
    sl = 0;
  } else {
    sl = (v - l) / Math.min(l, 1 - l);
  }

  return { h, s: sl, l, a };
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
  container.addEventListener('pointerdown', send);
};

const removeIdleListeners = function removeIdleListeners() {
  container.addEventListener('pointerdown', send);
};

const updateBoxPosition = function updateBoxPosition({
  pageX: pointerLeftDocument,
  pageY: pointerTopDocument,
}) {
  const containerRect = container.getBoundingClientRect();
  const left = pointerLeftDocument - (containerRect.left + window.scrollX);
  const top = pointerTopDocument - (containerRect.top + window.scrollY);
  const hsv = {
    h: 0,
    s: clamp(0, left, containerRect.width) / containerRect.width,
    v: 1 - clamp(0, top, containerRect.height) / containerRect.height,
  };
  const hsl = hsvToHsl(hsv);
  document.documentElement.dataset.hsv = `hsv.s: ${hsv.s.toFixed(
    3
  )}, hsv.v: ${hsv.v.toFixed(3)}`;
  document.documentElement.dataset.hsl = `hsl.s: ${hsl.s.toFixed(
    3
  )}, hsl.l: ${hsl.l.toFixed(3)}`;
  box.style.setProperty('--pointer-left', left);
  box.style.setProperty('--pointer-top', top);
};

const machine = {
  initial: 'idle',
  states: {
    idle: {
      entry: [addIdleListeners],
      exit: [removeIdleListeners],
      on: {
        pointerdown: {
          target: 'dragging',
        },
      },
    },
    dragging: {
      entry: [addDraggingListeners, updateBoxPosition],
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
          actions: [updateBoxPosition],
        },
      },
    },
  },
};

function callActions(actions, event) {
  actions.forEach((action) => action.call(null, event));
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

let currentState;
let container;
let box;

function send(event) {
  const prevState = currentState;
  const nextState = transition(currentState, event.type);
  callTransitionActions(prevState, event);

  if (prevState !== nextState) {
    callExitActions(prevState, event);
    callEntryActions(nextState, event);
  }

  currentState = nextState;
  console.log(`${prevState} → ${event.type} → ${currentState}`);
}

function handleDOMContentLoaded() {
  container = document.getElementById('container');
  box = document.getElementById('box');
  currentState = machine.initial;
  callEntryActions(currentState);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
} else {
  handleDOMContentLoaded();
}
