import { gsap } from 'gsap'

const root = document.documentElement
const MIN_VISIBLE_MS = 700
const MAX_WAIT_MS = 6000
const SEEN_KEY = 'rob-intro'

/**
 * First visit per session: the logo stays fixed while a thin line fills with real progress (fonts ready, hero
 * images decoded, window load), then the screen lifts away. Repeat visits skip it entirely.
 */
export function runPreloader() {
  const overlay = document.getElementById('preloader')
  if (!overlay || !root.classList.contains('show-preloader')) {
    document.dispatchEvent(new Event('preloader:done'))
    return
  }

  const fill = overlay.querySelector('.preloader__fill')
  const tasks = [fontsReady(), windowLoaded(), ...criticalImages()]
  let completed = 0
  tasks.forEach((task) => task.then(() => completed++))

  const startedAt = performance.now()
  let shown = 0

  const frame = () => {
    const elapsed = performance.now() - startedAt
    const target = elapsed > MAX_WAIT_MS ? 1 : completed / tasks.length
    shown += (target - shown) * 0.1
    fill.style.transform = `scaleX(${shown})`

    if (shown > 0.995 && elapsed > MIN_VISIBLE_MS) return reveal(overlay, fill)
    requestAnimationFrame(frame)
  }
  requestAnimationFrame(frame)
}

function reveal(overlay, fill) {
  fill.style.transform = 'scaleX(1)'
  const finish = () => {
    overlay.remove()
    root.classList.remove('is-loading', 'show-preloader')
    try {
      sessionStorage.setItem(SEEN_KEY, '1')
    } catch {}
    window.dispatchEvent(new Event('resize'))
    document.dispatchEvent(new Event('preloader:done'))
  }

  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.to(overlay, { opacity: 0, duration: 0.3, onComplete: finish })
    return
  }

  gsap
    .timeline({ onComplete: finish })
    .to('.preloader__bar', { opacity: 0, duration: 0.3 })
    .to('.preloader__logo', { y: -24, opacity: 0, duration: 0.5, ease: 'power2.in' }, '<')
    .to(overlay, { yPercent: -100, duration: 0.9, ease: 'power3.inOut' }, '-=0.1')
}

const fontsReady = () =>
  Promise.all([
    document.fonts.load('400 1em "Barlow"'),
    document.fonts.load('700 1em "Barlow Condensed"'),
  ]).catch(() => {})

const windowLoaded = () =>
  document.readyState === 'complete'
    ? Promise.resolve()
    : new Promise((resolve) => window.addEventListener('load', resolve, { once: true }))

/** Above-the-fold images (marked fetchpriority="high") must be decoded before the reveal. */
const criticalImages = () =>
  [...document.querySelectorAll('img[fetchpriority="high"]')].map((img) => img.decode().catch(() => {}))
