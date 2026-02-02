import { navigate } from '../router/router.js';
import { validateTaskForm } from '../utils/validation.js';
import { createTask } from '../services/tasks.service.js';
import { getUserSession } from '../utils/storage.js';
import { showSuccess, showError, showLoading, closeAlert } from '../utils/alerts.js';
import { displayErrors, clearErrors, getTaskFormData } from '../utils/form.js';
import { addListener } from '../utils/event-manager.js';

export function initCreateEventController() {
  const form = document.querySelector('#task-form');
  const cancelButton = document.querySelector('#cancel-btn');
  const user = getUserSession();
  
  if (!user) {
    showError('Error', 'Debes iniciar sesión para crear tareas');
    navigate('/login');
    return;
  }
  
  const redirectPath = user.role === 'admin' ? '/dashboard/admin' : '/dashboard/user';

  addListener(cancelButton, 'click', () => navigate(redirectPath));
  addListener(form, 'submit', (e) => handleCreateSubmit(e, user, redirectPath));
}

async function handleCreateSubmit(e, user, redirectPath) {
  e.preventDefault();

  const formData = getTaskFormData();
  
  clearErrors('#task-form');

  const validation = validateTaskForm(
    formData.name, 
    formData.description, 
    formData.dueDate
  );

  if (!validation.isValid) {
    displayErrors(validation.errors, { inputPrefix: 'task-' });
    return;
  }

  try {
    showLoading('Creando tarea...');

    await createTask({
      ...formData,
      userId: user.id
    });

    closeAlert();
    await showSuccess('¡Tarea creada!', 'La tarea se ha creado exitosamente');
    navigate(redirectPath);
  } catch (error) {
    closeAlert();
    showError('Error', 'No se pudo crear la tarea');
  }
}
