import { routes, matchRoute } from './routes.js';
import { checkGuard } from './guards.js';
import { 
  getAppContainer, 
  getDashboardRedirect, 
  renderRoute, 
  renderNotFoundPage,
  getInitialPath
} from './router.helpers.js';

let currentParams = {};
let isPopStateNavigation = false;

export function getRouteParams() {
  return { ...currentParams };
}

export function navigate(path, params = {}, skipPushState = false) {
  currentParams = params;
  const container = getAppContainer();

  if (path === '/dashboard') {
    navigate(getDashboardRedirect(), params, skipPushState);
    return;
  }

  const { route, params: pathParams } = matchRoute(path);

  if (!route) {
    renderNotFoundPage(container, path, skipPushState || isPopStateNavigation);
    return;
  }

  currentParams = { ...pathParams };

  const { canAccess, redirectTo } = checkGuard(route.guard);

  if (!canAccess) {
    navigate(redirectTo, {}, false);
    return;
  }

  renderRoute(route, container, path, currentParams, skipPushState || isPopStateNavigation);
}

function handlePopState(event) {
  const path = window.location.pathname || '/login';
  const params = event.state?.params || {};
  isPopStateNavigation = true;
  navigate(path, params, true);
  isPopStateNavigation = false;
}

export function initRouter() {
  window.addEventListener('popstate', handlePopState);
  navigate(getInitialPath());
}
