// global Swal

const btnColor = '#2563eb';

export const showSuccess = (title, text = '') => Swal.fire({
  icon: 'success', title, text,
  confirmButtonColor: btnColor,
  timer: 2000,
  timerProgressBar: true
});

export const showError = (title, text = '') => Swal.fire({
  icon: 'error', title, text,
  confirmButtonColor: btnColor
});

export async function showConfirm(title, text = '') {
  const result = await Swal.fire({
    icon: 'question', title, text,
    showCancelButton: true,
    confirmButtonColor: btnColor,
    cancelButtonColor: '#64748b',
    confirmButtonText: 'Sí, confirmar',
    cancelButtonText: 'Cancelar'
  });
  return result.isConfirmed;
}

export const showLoading = (title = 'Cargando...') => Swal.fire({
  title,
  allowOutsideClick: false,
  allowEscapeKey: false,
  didOpen: () => Swal.showLoading()
});

export const closeAlert = () => Swal.close();
