// Prevent memory leaks by tracking and cleaning up event listeners
const registeredListeners = [];

export function addListener(element, event, handler, options = {}) {
  if (!element) return;
  element.addEventListener(event, handler, options);
  registeredListeners.push({ element, event, handler, options });
}

export function cleanupListeners() {
  registeredListeners.forEach(({ element, event, handler, options }) => {
    if (element) element.removeEventListener(event, handler, options);
  });
  registeredListeners.length = 0;
}

export function addListeners(listeners) {
  listeners.forEach(({ element, event, handler, options }) => {
    addListener(element, event, handler, options);
  });
}
