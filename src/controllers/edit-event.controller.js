import { navigate, getRouteParams } from '../router/router.js';
import { validateTaskForm } from '../utils/validation.js';
import { getTaskById, updateTask } from '../services/tasks.service.js';
import { getUserSession } from '../utils/storage.js';
import { showSuccess, showError, showLoading, closeAlert } from '../utils/alerts.js';
import { displayErrors, clearErrors, getTaskFormData } from '../utils/form.js';
import { addListener } from '../utils/event-manager.js';

let currentTask = null;

export async function initEditEventController() {
  currentTask = null;
  const form = document.querySelector('#task-form');
  const cancelButton = document.querySelector('#cancel-btn');
  const titleElement = document.querySelector('#form-title');
  const user = getUserSession();
  
  if (!user) {
    showError('Error', 'Debes iniciar sesión para editar tareas');
    navigate('/login');
    return;
  }
  
  const redirectPath = user.role === 'admin' ? '/dashboard/admin' : '/dashboard/user';

  const params = getRouteParams();
  const taskId = params.id;

  if (!taskId) {
    showError('Error', 'No se especificó ninguna tarea para editar');
    navigate(redirectPath);
    return;
  }

  if (titleElement) {
    titleElement.textContent = 'Editar tarea';
  }

  try {
    currentTask = await getTaskById(taskId);

    if (!currentTask) {
      throw new Error('Tarea no encontrada o no se pudo cargar');
    }

    if (user.role !== 'admin' && currentTask.userId !== user.id) {
      showError('Acceso denegado', 'No tienes permiso para editar esta tarea');
      navigate(redirectPath);
      return;
    }

    populateForm(currentTask);

    addListener(cancelButton, 'click', () => navigate(redirectPath));
    addListener(form, 'submit', (e) => handleEditSubmit(e, taskId, redirectPath));

  } catch (error) {
    handleLoadError(error, taskId, redirectPath);
  }
}


function populateForm(task) {
  const nameInput = document.querySelector('#task-name');
  const descriptionInput = document.querySelector('#task-description');
  const dueDateInput = document.querySelector('#task-dueDate');
  const priorityInput = document.querySelector('#task-priority');
  const statusInput = document.querySelector('#task-status');

  if (nameInput) nameInput.value = task.name || '';
  if (descriptionInput) descriptionInput.value = task.description || '';
  if (dueDateInput) dueDateInput.value = task.dueDate || '';
  if (priorityInput) priorityInput.value = task.priority || 'medium';
  if (statusInput) statusInput.value = task.status || 'pending';
}

async function handleEditSubmit(e, taskId, redirectPath) {
  e.preventDefault();

  const formData = getTaskFormData();
  
  clearErrors('#task-form');

  const validation = validateTaskForm(
    formData.name, 
    formData.description, 
    formData.dueDate,
    true
  );

  if (!validation.isValid) {
    displayErrors(validation.errors, { inputPrefix: 'task-' });
    return;
  }

  try {
    showLoading('Actualizando tarea...');

    const { user, ...cleanTask } = currentTask;
    
    await updateTask(taskId, {
      ...cleanTask,
      ...formData
    });

    closeAlert();
    await showSuccess('¡Actualizada!', 'La tarea se ha actualizado exitosamente');
    navigate(redirectPath);
  } catch (error) {
    closeAlert();
    showError('Error', 'No se pudo actualizar la tarea');
  }
}

function handleLoadError(error, taskId, redirectPath) {
  console.error('[Edit Task Controller] Error al cargar tarea:', error);
  
  let errorMessage = 'No se pudo cargar la tarea';
  if (error.response?.status === 404) {
    errorMessage = `La tarea con ID "${taskId}" no existe`;
  } else if (error.message) {
    errorMessage = `Error: ${error.message}`;
  }
  
  showError('Error al cargar tarea', errorMessage);
  navigate(redirectPath);
}
