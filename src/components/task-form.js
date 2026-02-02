export function renderTaskForm(container, options = {}) {
  const { title = 'Crear nueva tarea', submitText = 'Crear tarea' } = options;

  container.innerHTML = /*html*/ `
    <div class="task-form-container">
      <div class="form-card">
        <h1 id="form-title">${title}</h1>
        <form id="task-form">
          <div class="form-group">
            <label for="task-name">Nombre de la tarea</label>
            <input type="text" id="task-name" placeholder="Ingresa el nombre de la tarea">
            <span class="error-message" id="name-error"></span>
          </div>

          <div class="form-group">
            <label for="task-description">Descripción</label>
            <textarea id="task-description" placeholder="Describe la tarea" rows="4"></textarea>
            <span class="error-message" id="description-error"></span>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="task-dueDate">Fecha límite</label>
              <input type="date" id="task-dueDate">
              <span class="error-message" id="dueDate-error"></span>
            </div>
            <div class="form-group">
              <label for="task-priority">Prioridad</label>
              <select id="task-priority">
                <option value="low">Baja</option>
                <option value="medium" selected>Media</option>
                <option value="high">Alta</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label for="task-status">Estado</label>
            <select id="task-status">
              <option value="pending">Pendiente</option>
              <option value="in-progress">En progreso</option>
              <option value="completed">Completada</option>
            </select>
            <span class="error-message" id="status-error"></span>
          </div>

          <div class="form-actions">
            <button type="button" id="cancel-btn" class="btn-cancel">Cancelar</button>
            <button type="submit" class="btn-save">${submitText}</button>
          </div>
        </form>
      </div>
    </div>
  `;
}
