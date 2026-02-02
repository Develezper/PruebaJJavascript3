import { getUserSession } from '../utils/storage.js';
import { render as renderNotFound, initNotFoundController } from '../views/not-found.js';
import { cleanupListeners } from '../utils/event-manager.js';

export function getAppContainer() {
  return document.querySelector('#app');
}

export function getDashboardRedirect() {
  const user = getUserSession();
  if (!user) return '/login';
  return user.role === 'admin' ? '/dashboard/admin' : '/dashboard/user';
}

export function renderRoute(route, container, path, params = {}, skipPushState = false) {
  cleanupListeners();
  
  if (route.render) {
    route.render(container);
  }

  if (route.controller) {
    route.controller();
  }

  if (window.lucide) lucide.createIcons();

  if (!skipPushState) {
    window.history.pushState({ path, params }, '', path);
  }
  document.title = route.title || 'CRUDTASK';
}

export function renderNotFoundPage(container, path, skipPushState = false) {
  cleanupListeners();
  
  renderNotFound(container);
  initNotFoundController();
  if (!skipPushState) {
    window.history.pushState({}, '', path);
  }
  document.title = 'Page Not Found - CRUDTASK';
}

export function getInitialPath() {
  let path = window.location.pathname;
  return (path === '/' || path === '') ? '/login' : path;
}
