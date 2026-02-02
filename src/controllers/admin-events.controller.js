import { navigate } from '../router/router.js';
import { getAllTasks, deleteTask, getAllTaskStats, updateTaskStatus } from '../services/tasks.service.js';
import { getAllUsers } from '../services/users.service.js';
import { showSuccess, showError, showConfirm, showLoading, closeAlert } from '../utils/alerts.js';
import { renderAdminTaskRow, renderUserRow } from '../components/task-card.js';
import { renderLoading, renderEmpty, renderError } from '../components/loading.js';
import { displayUserInfo, handleLogout, initIcons, getStatusSpanish, STATUS_CYCLE } from './dashboard.helpers.js';
import { addListener } from '../utils/event-manager.js';
import { filterTasksBySearch, filterTasksByStatus } from './task-actions.js';

let allTasks = [];
let currentFilter = 'all';
let currentView = 'dashboard';

export async function initAdminEventsController() {
  allTasks = [];
  currentFilter = 'all';
  currentView = 'dashboard';
  
  const addButton = document.querySelector('#add-task-btn');
  const logoutButton = document.querySelector('#logout-btn');
  const tasksContainer = document.querySelector('#tasks-list');
  const userNameElement = document.querySelector('#user-name');
  const searchInput = document.querySelector('#search-input');
  const filterButtons = document.querySelectorAll('.filter-btn');
  
  const dashboardBtn = document.querySelector('#dashboard-btn');
  const usersBtn = document.querySelector('#users-btn');

  displayUserInfo(userNameElement, null);

  addListener(dashboardBtn, 'click', () => showDashboardView());
  addListener(usersBtn, 'click', () => showUsersView());
  addListener(addButton, 'click', () => navigate('/dashboard/tasks/create'));
  addListener(logoutButton, 'click', handleLogout);
  
  addListener(searchInput, 'input', (e) => {
    filterAndRenderTasks(e.target.value, currentFilter, tasksContainer);
  });

  filterButtons.forEach(btn => {
    addListener(btn, 'click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      const searchValue = searchInput?.value || '';
      filterAndRenderTasks(searchValue, currentFilter, tasksContainer);
    });
  });

  await loadAdminTasks(tasksContainer);
  await loadStats();
}

function showDashboardView() {
  currentView = 'dashboard';
  updateNavigation();
  document.querySelector('#view-title').textContent = 'Panel de control';
  document.querySelector('#stats-cards').style.display = 'grid';
  document.querySelector('.toolbar').style.display = 'flex';
  document.querySelector('.table-card').style.display = 'block';
  document.querySelector('#users-section').style.display = 'none';
  document.querySelector('#add-task-btn').style.display = 'block';
}

async function showUsersView() {
  currentView = 'users';
  updateNavigation();
  document.querySelector('#view-title').textContent = 'Usuarios Registrados';
  document.querySelector('#stats-cards').style.display = 'none';
  document.querySelector('.toolbar').style.display = 'none';
  document.querySelector('.table-card').style.display = 'none';
  document.querySelector('#users-section').style.display = 'block';
  document.querySelector('#add-task-btn').style.display = 'none';
  await loadUsers();
}

function updateNavigation() {
  document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
  if (currentView === 'dashboard') {
    document.querySelector('#dashboard-btn').classList.add('active');
  } else if (currentView === 'users') {
    document.querySelector('#users-btn').classList.add('active');
  }
}

async function loadUsers() {
  const container = document.querySelector('#users-list');
  if (!container) return;

  try {
    container.innerHTML = `<tr><td colspan="4">${renderLoading()}</td></tr>`;
    const [users, tasks] = await Promise.all([getAllUsers(), getAllTasks()]);
    
    if (users.length === 0) {
      container.innerHTML = `<tr><td colspan="4" class="empty-message">${renderEmpty('No hay usuarios registrados')}</td></tr>`;
      return;
    }

    const userTaskCounts = {};
    tasks.forEach(task => {
      userTaskCounts[task.userId] = (userTaskCounts[task.userId] || 0) + 1;
    });

    container.innerHTML = users.map(user => 
      renderUserRow(user, userTaskCounts[user.id] || 0)
    ).join('');
    
    initIcons();
  } catch (error) {
    container.innerHTML = `<tr><td colspan="4">${renderError('Error al cargar usuarios')}</td></tr>`;
    showError('Error', 'No se pudieron cargar los usuarios');
  }
}

async function loadStats() {
  try {
    const stats = await getAllTaskStats();
    renderStats(stats);
  } catch (error) {
    console.error('Error loading stats:', error);
  }
}

function updateStatsFromLocal() {
  const total = allTasks.length;
  const completed = allTasks.filter(t => t.status === 'completed').length;
  const pending = allTasks.filter(t => t.status === 'pending').length;
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  renderStats({ total, completed, pending, progress });
}

function renderStats(stats) {
  const totalEl = document.querySelector('#total-tasks');
  const completedEl = document.querySelector('#completed-tasks');
  const pendingEl = document.querySelector('#pending-tasks');
  const progressEl = document.querySelector('#progress-percent');
  const changeEl = document.querySelector('#total-change');
  
  if (totalEl) totalEl.textContent = stats.total;
  if (completedEl) completedEl.textContent = stats.completed;
  if (pendingEl) pendingEl.textContent = stats.pending;
  if (progressEl) progressEl.textContent = `${stats.progress}%`;
  if (changeEl) changeEl.textContent = stats.total > 0 ? 'Todas las tareas cargadas' : 'Aún no hay tareas';
}

async function loadAdminTasks(container) {
  if (!container) return;
  try {
    container.innerHTML = `<tr><td colspan="6">${renderLoading()}</td></tr>`;
    allTasks = await getAllTasks();

    if (allTasks.length === 0) {
      container.innerHTML = `<tr><td colspan="6" class="empty-message">${renderEmpty('Aún no hay tareas registradas.')}</td></tr>`;
      return;
    }

    renderTasksTable(allTasks, container);
    initIcons();
    setupTaskListeners(container);
  } catch (error) {
    container.innerHTML = `<tr><td colspan="6">${renderError('Error al cargar tareas')}</td></tr>`;
  }
}

function filterAndRenderTasks(searchTerm, filter, container) {
  let filteredTasks = filterTasksByStatus([...allTasks], filter);
  filteredTasks = filterTasksBySearch(filteredTasks, searchTerm);

  if (filteredTasks.length === 0) {
    container.innerHTML = `<tr><td colspan="6" class="empty-message">No hay coincidencias</td></tr>`;
    return;
  }

  renderTasksTable(filteredTasks, container);
  initIcons();
  setupTaskListeners(container);
}

function renderTasksTable(tasks, container) {
  container.innerHTML = tasks.map(task => renderAdminTaskRow(task)).join('');
}

function setupTaskListeners(container) {
  container.querySelectorAll('.status-btn').forEach(btn => {
    btn.addEventListener('click', () => handleStatusChange(btn.dataset.id, container));
  });

  container.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', () => navigate(`/dashboard/tasks/edit/${btn.dataset.id}`));
  });

  container.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', () => handleDeleteTask(btn.dataset.id, container));
  });
}

async function handleStatusChange(id, container) {
  const task = allTasks.find(t => String(t.id) === String(id));
  if (!task) return;

  const newStatus = STATUS_CYCLE[task.status];

  try {
    showLoading('Actualizando estado...');
    await updateTaskStatus(id, newStatus);
    
    task.status = newStatus;
    
    const searchValue = document.querySelector('#search-input')?.value || '';
    filterAndRenderTasks(searchValue, currentFilter, container);
    closeAlert();
    await showSuccess('Actualizado', `Estado cambiado a ${getStatusSpanish(newStatus)}`);
    
    updateStatsFromLocal();
  } catch (error) {
    closeAlert();
    showError('Error', 'No se pudo actualizar el estado');
  }
}

async function handleDeleteTask(id, container) {
  const confirmed = await showConfirm('¿Eliminar tarea?', 'Esta acción es irreversible');
  if (confirmed) {
    try {
      showLoading('Eliminando...');
      await deleteTask(id);
      allTasks = allTasks.filter(t => String(t.id) !== String(id));
      
      const searchValue = document.querySelector('#search-input')?.value || '';
      filterAndRenderTasks(searchValue, currentFilter, container);
      closeAlert();
      await showSuccess('Eliminada', 'La tarea ha sido borrada');
      
      updateStatsFromLocal();
    } catch (error) {
      closeAlert();
      showError('Error', 'No se pudo eliminar la tarea');
    }
  }
}
