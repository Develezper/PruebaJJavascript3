// Shared task action handlers

import { deleteTask, updateTaskStatus } from '../services/tasks.service.js';
import { showSuccess, showError, showConfirm, showLoading, closeAlert } from '../utils/alerts.js';
import { setupTaskActionListeners, getStatusSpanish, STATUS_CYCLE, initIcons } from './dashboard.helpers.js';
import { navigate } from '../router/router.js';

export async function handleTaskStatusChange(taskId, tasksArray, refreshCallback, updateLocal = true) {
  const task = tasksArray.find(t => String(t.id) === String(taskId));
  if (!task) return;

  const newStatus = STATUS_CYCLE[task.status];

  try {
    showLoading('Actualizando estado...');
    await updateTaskStatus(taskId, newStatus);
    
    if (updateLocal) {
      task.status = newStatus;
    }
    
    closeAlert();
    await showSuccess('Actualizado', `Estado cambiado a ${getStatusSpanish(newStatus)}`);
    
    if (refreshCallback) {
      await refreshCallback();
    }
  } catch (error) {
    closeAlert();
    showError('Error', 'No se pudo actualizar el estado de la tarea');
  }
}

export async function handleTaskDelete(taskId, tasksArray, refreshCallback) {
  const confirmed = await showConfirm('¿Eliminar tarea?', 'Esta acción es irreversible');
  
  if (confirmed) {
    try {
      showLoading('Eliminando...');
      await deleteTask(taskId);
      
      // Remove from local array
      const index = tasksArray.findIndex(t => String(t.id) === String(taskId));
      if (index > -1) {
        tasksArray.splice(index, 1);
      }
      
      closeAlert();
      await showSuccess('Eliminada', 'La tarea ha sido borrada');
      
      if (refreshCallback) {
        await refreshCallback();
      }
    } catch (error) {
      closeAlert();
      showError('Error', 'No se pudo eliminar la tarea');
    }
  }
}

export function setupTaskActions(container, tasksArray, refreshCallback, editBasePath = '/dashboard/tasks/edit') {
  setupTaskActionListeners(container, {
    onStatusChange: (id) => handleTaskStatusChange(id, tasksArray, refreshCallback),
    onEdit: (id) => navigate(`${editBasePath}/${id}`),
    onDelete: (id) => handleTaskDelete(id, tasksArray, refreshCallback)
  });
}

export function renderTasksAndSetup(tasks, container, renderFn, tasksArrayRef, refreshCallback) {
  container.innerHTML = tasks.map(renderFn).join('');
  initIcons();
  setupTaskActions(container, tasksArrayRef, refreshCallback);
}

export function filterTasksBySearch(tasks, searchTerm) {
  if (!searchTerm.trim()) return tasks;
  
  const term = searchTerm.toLowerCase();
  return tasks.filter(task =>
    task.name?.toLowerCase().includes(term) ||
    task.description?.toLowerCase().includes(term) ||
    task.user?.fullName?.toLowerCase().includes(term)
  );
}

export function filterTasksByStatus(tasks, status) {
  if (status === 'all') return tasks;
  return tasks.filter(task => task.status === status);
}
