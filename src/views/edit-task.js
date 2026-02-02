import { renderTaskForm } from '../components/task-form.js';

export function render(container) {
  renderTaskForm(container, {
    title: 'Editar tarea',
    submitText: 'Guardar cambios'
  });
}
