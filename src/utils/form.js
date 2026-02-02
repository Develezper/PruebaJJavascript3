export function displayErrors(errors, options = {}) {
  const { inputPrefix = '' } = options;

  Object.keys(errors).forEach(field => {
    const inputId = inputPrefix ? `${inputPrefix}${field}` : field;
    const input = document.querySelector(`#${inputId}`);
    const errorSpan = document.querySelector(`#${field}-error`);
    
    if (input) {
      input.classList.add('input-error');
    }
    
    if (errorSpan) {
      errorSpan.textContent = errors[field];
      errorSpan.style.display = 'block';
    }
  });
}

export function clearErrors(formSelector = null) {
  const scope = formSelector ? document.querySelector(formSelector) : document;
  
  if (!scope) return;

  const inputs = scope.querySelectorAll('input, textarea, select');
  const errorSpans = scope.querySelectorAll('.error-message');
  
  inputs.forEach(input => input.classList.remove('input-error'));
  errorSpans.forEach(span => {
    span.textContent = '';
    span.style.display = 'none';
  });
}

export function getTaskFormData() {
  return {
    name: document.querySelector('#task-name')?.value.trim() || '',
    description: document.querySelector('#task-description')?.value.trim() || '',
    priority: document.querySelector('#task-priority')?.value || '',
    dueDate: document.querySelector('#task-dueDate')?.value || '',
    status: document.querySelector('#task-status')?.value || 'pending'
  };
}
