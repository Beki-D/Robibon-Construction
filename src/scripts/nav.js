const root = document.documentElement

export function initNav() {
  const header = document.getElementById('header')
  const toggle = document.getElementById('menu-toggle')
  const overlay = document.getElementById('menu-overlay')
  if (!toggle || !overlay) return

  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open))
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu')
    overlay.classList.toggle('is-open', open)
    header.classList.toggle('menu-open', open)
    root.classList.toggle('is-loading', open)
  }

  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'))
  overlay.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setOpen(false)))
  document.addEventListener('keydown', (event) => event.key === 'Escape' && setOpen(false))
  matchMedia('(min-width: 1001px)').addEventListener('change', (event) => event.matches && setOpen(false))
}
