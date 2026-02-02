export function render(container) {
  container.innerHTML = /*html*/ `
    <div class="register-page">
      <div class="top-bar">
        <div class="logo">
          <div class="logo-icon"></div>
          <span>CRUDTASK</span>
        </div>
      </div>

      <div class="register-card">
        <h1>Crear cuenta</h1>
        <p class="subtitle">Únete a la plataforma de gestión académica hoy</p>

        <form id="register-form">
          <div class="form-group">
            <label for="fullName">Nombre completo</label>
            <input type="text" id="fullName" placeholder="Juan Pérez">
            <span class="error-message" id="fullName-error"></span>
          </div>

          <div class="form-group">
            <label for="email">Correo electrónico</label>
            <input type="email" id="email" placeholder="estudiante@universidad.edu">
            <span class="error-message" id="email-error"></span>
          </div>

          <div class="form-group">
            <label for="password">Contraseña</label>
            <input type="password" id="password" placeholder="Crea una contraseña">
            <span class="error-message" id="password-error"></span>
          </div>

          <div class="form-group">
            <label for="confirmPassword">Confirmar contraseña</label>
            <input type="password" id="confirmPassword" placeholder="Confirma tu contraseña">
            <span class="error-message" id="confirmPassword-error"></span>
          </div>

          <button type="submit" class="btn-submit">Registrarse</button>
        </form>

        <p class="auth-link">
          ¿Ya tienes una cuenta? <a href="#" id="login-link">Iniciar sesión</a>
        </p>
      </div>
    </div>
  `;
}
