import { navigate } from '../router/router.js';
import { saveUserSession } from '../utils/storage.js';
import { validateLoginForm, validateRegisterForm } from '../utils/validation.js';
import { validateCredentials, createUser, emailExists } from '../services/auth.service.js';
import { showSuccess, showError, showLoading, closeAlert } from '../utils/alerts.js';
import { displayErrors, clearErrors } from '../utils/form.js';
import { addListener } from '../utils/event-manager.js';

export function initLoginController() {
  const form = document.querySelector('#login-form');
  const emailInput = document.querySelector('#email');
  const passwordInput = document.querySelector('#password');
  const registerLink = document.querySelector('#register-link');
  const togglePassword = document.querySelector('#toggle-password');

  addListener(registerLink, 'click', (e) => {
    e.preventDefault();
    navigate('/register');
  });

  addListener(togglePassword, 'click', () => {
    if (passwordInput) {
      const isPassword = passwordInput.type === 'password';
      passwordInput.type = isPassword ? 'text' : 'password';
      togglePassword.innerHTML = `<i data-lucide="${isPassword ? 'eye-off' : 'eye'}"></i>`;
      if (window.lucide) lucide.createIcons();
    }
  });

  addListener(form, 'submit', async (e) => {
    e.preventDefault();
    
    const email = emailInput?.value.trim() || '';
    const password = passwordInput?.value || '';

    clearErrors('#login-form');

    const validation = validateLoginForm(email, password);
    
    if (!validation.isValid) {
      displayErrors(validation.errors);
      return;
    }

    try {
      showLoading('Iniciando sesión...');

      const user = await validateCredentials(email, password);

      closeAlert();

      if (user) {
        saveUserSession(user);
        
        await showSuccess('Bienvenido!', `Hola, ${user.fullName}`);
        
        const redirectPath = user.role === 'admin' ? '/dashboard/admin' : '/dashboard/user';
        navigate(redirectPath);
      } else {
        showError('Error de autenticación', 'Correo electrónico o contraseña incorrectos');
      }
    } catch (error) {
      closeAlert();
      showError('Error', 'Ocurrió un error al iniciar sesión. Por favor, inténtalo de nuevo.');
    }
  });
}

export function initRegisterController() {
  const form = document.querySelector('#register-form');
  const fullNameInput = document.querySelector('#fullName');
  const emailInput = document.querySelector('#email');
  const passwordInput = document.querySelector('#password');
  const confirmPasswordInput = document.querySelector('#confirmPassword');
  const loginLink = document.querySelector('#login-link');

  addListener(loginLink, 'click', (e) => {
    e.preventDefault();
    navigate('/login');
  });

  addListener(form, 'submit', async (e) => {
    e.preventDefault();

    const fullName = fullNameInput?.value.trim() || '';
    const email = emailInput?.value.trim() || '';
    const password = passwordInput?.value || '';
    const confirmPassword = confirmPasswordInput?.value || '';

    clearErrors('#register-form');

    const validation = validateRegisterForm(fullName, email, password, confirmPassword);

    if (!validation.isValid) {
      displayErrors(validation.errors);
      return;
    }

    try {
      showLoading('Creando cuenta...');

      const exists = await emailExists(email);

      if (exists) {
        closeAlert();
        showError('Error', 'Este correo electrónico ya está registrado');
        return;
      }

      const newUser = await createUser({
        fullName,
        email,
        password,
        role: 'user'
      });

      closeAlert();

      saveUserSession(newUser);

      await showSuccess('¡Registro exitoso!', 'Tu cuenta ha sido creada');

      navigate('/dashboard/user');
    } catch (error) {
      closeAlert();
      showError('Error', 'Ocurrió un error al crear la cuenta. Por favor, inténtalo de nuevo.');
    }
  });
}
