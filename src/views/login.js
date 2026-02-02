export function render(container) {
  container.innerHTML = /*html*/ `
    <div class="login-page">
      <div class="login-container">
        <div class="logo">
          <div class="logo-icon"></div>
          <span>CRUDTASK</span>
        </div>

        <div class="login-card">
          <h2>Bienvenido de nuevo</h2>
          <p class="subtitle">Ingresa tus credenciales para acceder a la plataforma</p>

          <form id="login-form">
            <div class="form-group">
              <label for="email">Correo electrónico o usuario</label>
              <input type="email" id="email" placeholder="estudiante@universidad.edu">
              <span class="error-message" id="email-error"></span>
            </div>

            <div class="form-group">
              <label for="password">Contraseña</label>
              <div class="password-wrapper">
                <input type="password" id="password" placeholder="••••••••">
                <span class="eye" id="toggle-password"><i data-lucide="eye"></i></span>
              </div>
              <span class="error-message" id="password-error"></span>
            </div>

            <a href="#" class="forgot">¿Olvidaste tu contraseña?</a>

            <button type="submit" class="btn-submit">Iniciar sesión</button>
          </form>

          <p class="auth-link">
            ¿No tienes una cuenta? <a href="#" id="register-link">Registrarse</a>
          </p>
        </div>
      </div>
    </div>
  `;
}