import { renderTaskForm } from '../components/task-form.js';

export function render(container) {
  renderTaskForm(container, {
    title: 'Crear nueva tarea',
    submitText: 'Crear tarea'
  });
}