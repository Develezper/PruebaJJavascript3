// Email validation regex
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isEmpty(value) {
  return !value || value.trim() === '';
}

export function hasMinLength(value, minLength) {
  return value && value.trim().length >= minLength;
}

export function validateLoginForm(email, password) {
  const errors = {};

  if (isEmpty(email)) {
    errors.email = 'El correo electrónico es requerido';
  } else if (!isValidEmail(email)) {
    errors.email = 'Formato de correo electrónico inválido';
  }

  if (isEmpty(password)) {
    errors.password = 'La contraseña es requerida';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validateRegisterForm(fullName, email, password, confirmPassword) {
  const errors = {};

  if (isEmpty(fullName)) {
    errors.fullName = 'El nombre completo es requerido';
  } else if (!hasMinLength(fullName, 3)) {
    errors.fullName = 'El nombre debe tener al menos 3 caracteres';
  }

  if (isEmpty(email)) {
    errors.email = 'El correo electrónico es requerido';
  } else if (!isValidEmail(email)) {
    errors.email = 'Formato de correo electrónico inválido';
  }

  if (isEmpty(password)) {
    errors.password = 'La contraseña es requerida';
  } else if (!hasMinLength(password, 6)) {
    errors.password = 'La contraseña debe tener al menos 6 caracteres';
  }

  if (isEmpty(confirmPassword)) {
    errors.confirmPassword = 'Por favor confirma tu contraseña';
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Las contraseñas no coinciden';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validateTaskForm(name, description, dueDate, isEdit = false) {
  const errors = {};

  if (isEmpty(name)) {
    errors.name = 'El nombre de la tarea es requerido';
  } else if (!hasMinLength(name, 3)) {
    errors.name = 'El nombre debe tener al menos 3 caracteres';
  }

  if (isEmpty(description)) {
    errors.description = 'La descripción es requerida';
  } else if (!hasMinLength(description, 10)) {
    errors.description = 'La descripción debe tener al menos 10 caracteres';
  }

  if (isEmpty(dueDate)) {
    errors.dueDate = 'La fecha límite es requerida';
  } else {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [year, month, day] = dueDate.split('-').map(Number);
    const selectedDate = new Date(year, month - 1, day);

    if (selectedDate < today) {
      errors.dueDate = 'La fecha límite no puede estar en el pasado';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
