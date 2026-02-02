import { GUARD_TYPES } from './guards.js';

import { render as renderLogin } from '../views/login.js';
import { render as renderNotFound, initNotFoundController } from '../views/not-found.js';
import { render as renderRegister } from '../views/register.js';
import { render as renderAdminDashboard } from '../views/admin-dashboard.js';
import { render as renderUserDashboard } from '../views/user-dashboard.js';
import { render as renderCreateTask } from '../views/create-task.js';
import { render as renderEditTask } from '../views/edit-task.js';

import { initLoginController, initRegisterController } from '../controllers/auth.controller.js';
import { initAdminTasksController } from '../controllers/admin-tasks.controller.js';
import { initUserTasksController } from '../controllers/user-tasks.controller.js';
import { initCreateTaskController } from '../controllers/create-task.controller.js';
import { initEditTaskController } from '../controllers/edit-task.controller.js';

export const routes = {
  '/login': {
    render: renderLogin,
    controller: initLoginController,
    guard: GUARD_TYPES.PUBLIC,
    title: 'Login - CRUDTASK'
  },
  '/register': {
    render: renderRegister,
    controller: initRegisterController,
    guard: GUARD_TYPES.PUBLIC,
    title: 'Register - CRUDTASK'
  },
  '/dashboard': {
    guard: GUARD_TYPES.AUTH,
    title: 'Dashboard',
    redirect: true
  },
  '/dashboard/admin': {
    render: renderAdminDashboard,
    controller: initAdminTasksController,
    guard: GUARD_TYPES.ADMIN,
    title: 'Admin Dashboard - CRUDTASK'
  },
  '/dashboard/tasks/create': {
    render: renderCreateTask,
    controller: initCreateTaskController,
    guard: GUARD_TYPES.AUTH,
    title: 'Create Task - CRUDTASK'
  },
  '/dashboard/tasks/edit/:id': {
    render: renderEditTask,
    controller: initEditTaskController,
    guard: GUARD_TYPES.AUTH,
    title: 'Edit Task - CRUDTASK'
  },
  '/dashboard/user': {
    render: renderUserDashboard,
    controller: initUserTasksController,
    guard: GUARD_TYPES.USER,
    title: 'My Tasks - CRUDTASK'
  },
  '/not-found': {
    render: renderNotFound,
    controller: initNotFoundController,
    guard: null,
    title: 'Page Not Found - CRUDTASK'
  }
};

// Finds matching route for given path
export function matchRoute(path) {
  if (routes[path]) {
    return { route: routes[path], params: {} };
  }

  for (const [routePath, routeConfig] of Object.entries(routes)) {
    if (!routePath.includes(':')) continue;

    const params = matchDynamicRoute(routePath, path);
    if (params) {
      return { route: routeConfig, params };
    }
  }

  return { route: null, params: {} };
}

// Matches dynamic route patterns (e.g., /edit/:id)
function matchDynamicRoute(routePath, path) {
  const routeParts = routePath.split('/');
  const pathParts = path.split('/');

  if (routeParts.length !== pathParts.length) {
    return null;
  }

  const params = {};

  for (let i = 0; i < routeParts.length; i++) {
    if (routeParts[i].startsWith(':')) {
      params[routeParts[i].slice(1)] = pathParts[i];
    } else if (routeParts[i] !== pathParts[i]) {
      return null;
    }
  }

  return params;
}
