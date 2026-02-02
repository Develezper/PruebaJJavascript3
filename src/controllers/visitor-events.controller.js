import { navigate } from '../router/router.js';
import { getUserSession } from '../utils/storage.js';
import { getTasksByUserId, deleteTask, updateTaskStatus } from '../services/tasks.service.js';
import { showSuccess, showError, showConfirm, showLoading, closeAlert } from '../utils/alerts.js';
import { renderUserTaskRow } from '../components/task-card.js';
import { renderLoading, renderEmpty, renderError } from '../components/loading.js';
import { displayUserInfo, handleLogout, initIcons, getStatusSpanish, STATUS_CYCLE } from './dashboard.helpers.js';
import { addListener } from '../utils/event-manager.js';
import { filterTasksBySearch } from './task-actions.js';

let userTasks = [];

export async function initVisitorEventsController() {
  userTasks = [];
  
  const logoutButton = document.querySelector('#logout-btn');
  const profileButton = document.querySelector('#profile-btn');
  const addTaskButton = document.querySelector('#add-task-btn');
  const tasksContainer = document.querySelector('#tasks-list');
  const userNameElement = document.querySelector('#user-name');
  const userAvatarElement = document.querySelector('#user-avatar');
  const searchInput = document.querySelector('#search-input');

  displayUserInfo(userNameElement, userAvatarElement);

  addListener(logoutButton, 'click', handleLogout);
  addListener(profileButton, 'click', showUserProfile);
  addListener(addTaskButton, 'click', () => navigate('/dashboard/tasks/create'));
  
  addListener(searchInput, 'input', (e) => {
    filterAndRenderTasks(e.target.value, tasksContainer);
  });

  const closeProfileBtn = document.querySelector('#close-profile');
  const profileOverlay = document.querySelector('#profile-overlay');
  
  addListener(closeProfileBtn, 'click', hideProfileModal);
  addListener(profileOverlay, 'click', hideProfileModal);

  await loadUserTasks(tasksContainer);
}

async function loadUserTasks(container) {
  if (!container) return;

  const user = getUserSession();
  if (!user) return;

  try {
    container.innerHTML = `<tr><td colspan="6">${renderLoading()}</td></tr>`;
    userTasks = await getTasksByUserId(user.id);

    if (userTasks.length === 0) {
      container.innerHTML = `<tr><td colspan="6" class="empty-message">${renderEmpty('Aún no tienes tareas. ¡Crea una!')}</td></tr>`;
      return;
    }

    renderTasksTable(userTasks, container);
    initIcons();
    setupTaskListeners(container);
  } catch (error) {
    container.innerHTML = `<tr><td colspan="6">${renderError('Error al cargar tareas')}</td></tr>`;
    showError('Error', 'No se pudieron cargar tus tareas');
  }
}

function filterAndRenderTasks(searchTerm, container) {
  const filteredTasks = filterTasksBySearch([...userTasks], searchTerm);

  if (filteredTasks.length === 0) {
    container.innerHTML = `<tr><td colspan="6" class="empty-message">No hay tareas que coincidan con tu búsqueda</td></tr>`;
    return;
  }

  renderTasksTable(filteredTasks, container);
  initIcons();
  setupTaskListeners(container);
}

function renderTasksTable(tasks, container) {
  container.innerHTML = tasks.map(renderUserTaskRow).join('');
}

function setupTaskListeners(container) {
  container.querySelectorAll('.status-btn').forEach(btn => {
    addListener(btn, 'click', () => handleStatusChange(btn.dataset.id, container));
  });

  container.querySelectorAll('.edit-btn').forEach(btn => {
    addListener(btn, 'click', () => navigate(`/dashboard/tasks/edit/${btn.dataset.id}`));
  });

  container.querySelectorAll('.delete-btn').forEach(btn => {
    addListener(btn, 'click', () => handleDeleteTask(btn.dataset.id, container));
  });
}

async function handleStatusChange(taskId, container) {
  const task = userTasks.find(t => String(t.id) === String(taskId));
  if (!task) return;

  const newStatus = STATUS_CYCLE[task.status];

  try {
    showLoading('Actualizando estado...');
    await updateTaskStatus(taskId, newStatus);
    
    task.status = newStatus;
    
    const searchValue = document.querySelector('#search-input')?.value || '';
    filterAndRenderTasks(searchValue, container);
    closeAlert();
    await showSuccess('Actualizado', `Estado cambiado a ${getStatusSpanish(newStatus)}`);
  } catch (error) {
    closeAlert();
    showError('Error', 'No se pudo actualizar el estado de la tarea');
  }
}

async function handleDeleteTask(taskId, container) {
  const confirmed = await showConfirm('¿Eliminar tarea?', 'Esta acción no se puede deshacer');

  if (confirmed) {
    try {
      showLoading('Eliminando tarea...');
      await deleteTask(taskId);
      
      userTasks = userTasks.filter(t => String(t.id) !== String(taskId));
      
      const searchValue = document.querySelector('#search-input')?.value || '';
      filterAndRenderTasks(searchValue, container);
      closeAlert();
      await showSuccess('Eliminada', 'Tu tarea ha sido eliminada');
    } catch (error) {
      closeAlert();
      showError('Error', 'No se pudo eliminar la tarea');
    }
  }
}

function showUserProfile() {
  const user = getUserSession();
  if (!user) return;

  const modal = document.querySelector('#profile-modal');
  if (!modal) return;

  const avatarEl = document.querySelector('#profile-avatar');
  const nameEl = document.querySelector('#profile-name');
  const roleEl = document.querySelector('#profile-role');
  const emailEl = document.querySelector('#profile-email');
  const fullnameEl = document.querySelector('#info-fullname');
  const emailDetailEl = document.querySelector('#info-email-detail');
  const roleLevelEl = document.querySelector('#info-role-level');

  if (avatarEl) {
    avatarEl.src = user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName)}&background=2563eb&color=fff&size=120`;
  }
  if (nameEl) nameEl.textContent = user.fullName;
  if (roleEl) roleEl.textContent = user.role === 'admin' ? 'Administrador' : 'Usuario';
  if (emailEl) emailEl.innerHTML = `Email: ${user.email}`;
  if (fullnameEl) fullnameEl.textContent = user.fullName;
  if (emailDetailEl) emailDetailEl.textContent = user.email;
  if (roleLevelEl) roleLevelEl.textContent = user.role === 'admin' ? 'Administrador' : 'Usuario estándar';

  modal.style.display = 'flex';
}

function hideProfileModal() {
  const modal = document.querySelector('#profile-modal');
  if (modal) {
    modal.style.display = 'none';
  }
}
