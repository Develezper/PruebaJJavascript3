export function renderLoading() {
  return '<div class="loading"><div class="spinner"></div></div>';
}

export function renderEmpty(message) {
  return `<p class="empty-message">${message}</p>`;
}

export function renderError(message) {
  return `<p class="error">${message}</p>`;
}
