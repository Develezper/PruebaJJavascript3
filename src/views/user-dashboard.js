export function render(container) {
  container.innerHTML = /*html*/ `
    <div class="dashboard user-dashboard">
      <aside class="sidebar">
        <h2 class="logo">CRUDTASK</h2>
        <nav>
          <ul>
            <li class="nav-item active" id="my-tasks-btn">
              <i data-lucide="clipboard-list"></i>
              Mis tareas
            </li>
            <li class="nav-item" id="profile-btn">
              <i data-lucide="user"></i>
              Perfil
            </li>
          </ul>
        </nav>
        <div class="sidebar-footer">
          <button class="nav-btn logout" id="logout-btn">
            <i data-lucide="log-out"></i>
            Cerrar sesión
          </button>
        </div>
      </aside>

      <main class="main-content">
        <div class="top-bar">
          <h1 id="view-title">Mis tareas</h1>
          <div class="top-bar-right">
            <div class="user-info-mini">
              <img src="" alt="Usuario" id="user-avatar" class="mini-avatar">
              <span id="user-name">Usuario</span>
            </div>
            <button class="btn-primary" id="add-task-btn">+ Nueva tarea</button>
          </div>
        </div>

        <div class="search-box">
          <input type="text" id="search-input" placeholder="Buscar por título o descripción..." />
        </div>

        <table class="tasks-table">
          <thead>
            <tr>
              <th>Nombre de la tarea</th>
              <th>Creado por</th>
              <th>Prioridad</th>
              <th>Estado</th>
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
      </main>
    </div>

    <div class="profile-modal" id="profile-modal" style="display: none;">
      <div class="profile-overlay" id="profile-overlay"></div>
      <div class="profile-content">
        <button class="close-btn" id="close-profile">&times;</button>
        <div class="card profile-card">
          <div class="profile-header-bg"></div>
          <img class="avatar" src="" alt="avatar" id="profile-avatar" />
          <h2 id="profile-name">Nombre de usuario</h2>
          <span class="badge" id="profile-role">Usuario</span>
          <div class="email-box" id="profile-email">
            Email: usuario@email.com
          </div>
          <div class="info-section">
            <h3>Información personal</h3>
            <div class="info-item">
              <span class="label">Nombre completo:</span>
              <p id="info-fullname">-</p>
            </div>
            <div class="info-item">
              <span class="label">Correo electrónico:</span>
              <p id="info-email-detail">-</p>
            </div>
            <div class="info-item">
              <span class="label">Rol:</span>
              <p id="info-role-level">-</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
