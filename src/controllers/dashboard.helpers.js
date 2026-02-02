import { navigate } from '../router/router.js';
import { getUserSession, clearUserSession } from '../utils/storage.js';
import { showConfirm } from '../utils/alerts.js';

// global lucide

export function displayUserInfo(nameEl, avatarEl, roleEl = null) {
  const user = getUserSession();
  if (!user) return;

  if (nameEl) {
    nameEl.textContent = user.fullName;
  }
  if (avatarEl) {
    avatarEl.src = user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName)}&background=2563eb&color=fff&size=100`;
  }
  if (roleEl) {
    roleEl.textContent = user.role === 'admin' ? 'Administrador del sistema' : 'Usuario';
  }
}

export async function handleLogout() {
  const confirmed = await showConfirm('¿Cerrar sesión?', '¿Estás seguro de que quieres cerrar sesión?');
  if (confirmed) {
    clearUserSession();
    navigate('/login');
  }
}

export function initIcons() {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

export function getStatusSpanish(status) {
  const translations = {
    'pending': 'pendiente',
    'in-progress': 'en progreso',
    'completed': 'completada'
  };
  return translations[status] || status;
}

export const STATUS_CYCLE = {
  'pending': 'in-progress',
  'in-progress': 'completed',
  'completed': 'pending'
};

export function setupTaskActionListeners(container, handlers) {
  const { onStatusChange, onEdit, onDelete } = handlers;

  container.querySelectorAll('.status-btn').forEach(btn => {
    btn.addEventListener('click', () => onStatusChange(btn.dataset.id));
  });

  container.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', () => onEdit(btn.dataset.id));
  });

  container.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', () => onDelete(btn.dataset.id));
  });
}
