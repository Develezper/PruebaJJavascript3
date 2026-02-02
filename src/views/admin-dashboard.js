export function render(container) {
  container.innerHTML = /*html*/ `
    <div class="layout">
      <aside class="sidebar">
        <div class="logo">CRUDTASK</div>
        <nav>
          <a class="nav-link active" id="dashboard-btn">
            <i data-lucide="layout-dashboard"></i>
            Panel de control
          </a>
          <a class="nav-link" id="users-btn">
            <i data-lucide="users"></i>
            Usuarios
          </a>
        </nav>
        <div class="sidebar-footer">
          <button class="nav-btn logout" id="logout-btn">
            <i data-lucide="log-out"></i>
            Cerrar sesión
          </button>
        </div>
      </aside>

      <main class="main">
        <header class="topbar">
          <h2 id="view-title">Panel de control</h2>
          <div class="user">
            <div class="user-info">
              <strong id="user-name">Admin</strong>
            </div>
          </div>
        </header>

        <section class="title-row">
          <div>
            <h1>Gestor de tareas</h1>
            <p>Vista general de tus tareas de desempeño académico actuales.</p>
          </div>
          <button class="btn-primary" id="add-task-btn">+ Nueva tarea</button>
        </section>

        <section class="cards" id="stats-cards">
          <div class="card stat-card">
            <p>Total de tareas</p>
            <h2 id="total-tasks">0</h2>
            <span class="green" id="total-change">Cargando...</span>
          </div>
          <div class="card stat-card">
            <p>Completadas</p>
            <h2 id="completed-tasks">0</h2>
            <span class="green">En camino</span>
          </div>
          <div class="card stat-card">
            <p>Pendientes</p>
            <h2 id="pending-tasks">0</h2>
            <span class="orange">Actualizado</span>
          </div>
          <div class="card stat-card">
            <p>Progreso general</p>
            <h2 id="progress-percent">0%</h2>
            <span class="green">¡Sigue así!</span>
          </div>
        </section>

        <section class="toolbar">
          <input type="text" placeholder="Buscar tareas..." id="search-input" />
          <div class="filters">
            <button class="filter-btn active" data-filter="all">Todas</button>
            <button class="filter-btn" data-filter="pending">Pendientes</button>
            <button class="filter-btn" data-filter="in-progress">En progreso</button>
            <button class="filter-btn" data-filter="completed">Completadas</button>
          </div>
        </section>

        <section class="table-card" id="tasks-section">
          <table id="tasks-table">
            <thead>
              <tr>
                <th>Nombre de la tarea</th>
                <th>Creado por</th>
                <th>Estado</th>
                <th>Prioridad</th>
                <th>Fecha límite</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody id="tasks-list">
              <tr>
                <td colspan="6" class="loading-cell">
                  <div class="loading"><div class="spinner"></div></div>
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        <section class="table-card" id="users-section" style="display: none;">
          <h2>Usuarios Registrados</h2>
          <table id="users-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Tareas Creadas</th>
              </tr>
            </thead>
            <tbody id="users-list">
              <tr>
                <td colspan="4" class="loading-cell">
                  <div class="loading"><div class="spinner"></div></div>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  `;
}
