export function formatDate(dateStr) {
  if (!dateStr) return 'N/A';
  
  const [year, month, day] = dateStr.split('-');
  const date = new Date(year, month - 1, day);
  
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}
