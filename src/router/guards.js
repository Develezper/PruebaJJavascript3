import { isAuthenticated, isAdmin, isUser } from '../utils/storage.js';

export const GUARD_TYPES = { PUBLIC: 'public', AUTH: 'auth', ADMIN: 'admin', USER: 'user' };

export function checkGuard(guard) {
  const auth = isAuthenticated();
  
  if (guard === GUARD_TYPES.PUBLIC) {
    if (auth) return { canAccess: false, redirectTo: isAdmin() ? '/dashboard/admin' : '/dashboard/user' };
    return { canAccess: true };
  }
  
  if (!auth) return { canAccess: false, redirectTo: '/login' };
  
  if (guard === GUARD_TYPES.ADMIN && !isAdmin()) {
    return { canAccess: false, redirectTo: '/not-found' };
  }
  
  if (guard === GUARD_TYPES.USER && !isUser()) {
    return { canAccess: false, redirectTo: '/not-found' };
  }
  
  return { canAccess: true };
}
