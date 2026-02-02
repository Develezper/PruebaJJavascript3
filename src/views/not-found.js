import { navigate } from '../router/router.js';

export function render(container) {
  container.innerHTML = /*html*/ `
    <div class="not-found-container">
      <div class="not-found-content">
        <h1 class="error-code">404</h1>
        <h2>Página no encontrada</h2>
        <p>Lo sentimos, la página que estás buscando no existe o no tienes permiso para acceder a ella.</p>
        <button id="go-home-btn" class="btn-primary">Volver al inicio de sesión</button>
      </div>
    </div>
  `;
}

export function initNotFoundController() {
  const goHomeBtn = document.querySelector('#go-home-btn');
  if (goHomeBtn) {
    goHomeBtn.addEventListener('click', () => {
      navigate('/login');
    });
  }
}
