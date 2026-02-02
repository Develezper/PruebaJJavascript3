const USER_SESSION_KEY = 'userSession';

export function saveUserSession(user) {
  const sessionData = {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    avatar: user.avatar
  };
  localStorage.setItem(USER_SESSION_KEY, JSON.stringify(sessionData));
}

export function getUserSession() {
  const session = localStorage.getItem(USER_SESSION_KEY);
  if (!session) return null;
  return JSON.parse(session);
}

export function clearUserSession() {
  localStorage.removeItem(USER_SESSION_KEY);
}

export const isAuthenticated = () => getUserSession() !== null;
export const isAdmin = () => getUserSession()?.role === 'admin';
export const isUser = () => getUserSession()?.role === 'user';
