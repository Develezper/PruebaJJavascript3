import { formatDate } from '../utils/date.js';

export function renderAdminTaskRow(task) {
  const statusClass = getStatusClass(task.status);
  const statusText = getStatusText(task.status);
  const priorityClass = getPriorityClass(task.priority);
  const isOverdue = isTaskOverdue(task);
  const creatorName = task.user?.fullName || 'Unknown';

  return /*html*/`
    <tr data-task-id="${task.id}">
      <td class="task-name">${task.name}</td>
      <td><span class="creator-tag">${creatorName}</span></td>
      <td><span class="badge ${statusClass}">${statusText}</span></td>
      <td class="priority-cell">
        <span class="priority-indicator ${priorityClass}"></span>
        ${getPriorityText(task.priority)}
      </td>
      <td class="${isOverdue ? 'overdue' : ''}">${formatDate(task.dueDate)}</td>
      <td class="actions">
        ${renderActionButtons(task.id)}
      </td>
    </tr>
  `;
}

// Renders a task row for user dashboard
export function renderUserTaskRow(task) {
  const statusClass = getStatusClass(task.status);
  const statusText = getStatusText(task.status);
  const priorityClass = getPriorityClass(task.priority);
  const isOverdue = isTaskOverdue(task);
  const creatorName = task.user?.fullName || 'Tú';

  return /*html*/`
    <tr data-task-id="${task.id}">
      <td class="task-name">${task.name}</td>
      <td><span class="creator-tag">${creatorName}</span></td>
      <td class="priority-cell">
        <span class="priority-dot ${priorityClass}"></span>
        ${getPriorityText(task.priority)}
      </td>
      <td><span class="status ${statusClass}">${statusText}</span></td>
      <td class="${isOverdue ? 'overdue' : ''}">${formatDate(task.dueDate)}</td>
      <td class="actions">
        ${renderActionButtons(task.id)}
      </td>
    </tr>
  `;
}

function renderActionButtons(id) {
  return /*html*/`
    <button class="action-btn status-btn" data-id="${id}" title="Cambiar estado">
      <i data-lucide="refresh-cw"></i>
    </button>
    <button class="action-btn edit-btn" data-id="${id}" title="Editar">
      <i data-lucide="pencil"></i>
    </button>
    <button class="action-btn delete-btn" data-id="${id}" title="Eliminar">
      <i data-lucide="trash-2"></i>
    </button>
  `;
}

const STATUS_MAP = {
  'pending': { class: 'orange', text: 'Pendiente' },
  'in-progress': { class: 'blue', text: 'En progreso' },
  'completed': { class: 'green', text: 'Completada' }
};

const PRIORITY_MAP = {
  'high': 'Alta', 'medium': 'Media', 'low': 'Baja'
};

const getStatusClass = (s) => STATUS_MAP[s]?.class || 'gray';
const getStatusText = (s) => STATUS_MAP[s]?.text || s;
const getPriorityClass = (p) => p || 'medium';
const getPriorityText = (p) => PRIORITY_MAP[p] || 'Media';

function isTaskOverdue(task) {
  if (task.status === 'completed' || !task.dueDate) return false;
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const [year, month, day] = task.dueDate.split('-').map(Number);
  const dueDate = new Date(year, month - 1, day);
  
  return dueDate < today;
}

export function renderUserRow(user, taskCount = 0) {
  const roleClass = user.role === 'admin' ? 'admin-badge' : 'user-badge';
  const roleText = user.role === 'admin' ? 'Administrador' : 'Usuario';
  return /*html*/`
    <tr data-user-id="${user.id}">
      <td>${user.fullName}</td>
      <td>${user.email}</td>
      <td><span class="badge ${roleClass}">${roleText}</span></td>
      <td>${taskCount}</td>
    </tr>
  `;
}
