export function showToast(type, message) {
  const toast = document.createElement('div')
  toast.className = `toast toast--${type}`
  toast.setAttribute('role', type === 'error' ? 'alert' : 'status')
  toast.textContent = message
  document.body.append(toast)
  setTimeout(() => toast.remove(), 5000)
}
