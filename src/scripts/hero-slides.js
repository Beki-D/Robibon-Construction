const INTERVAL_MS = 5500

/** Cross-fades the hero photos; each slide slowly settles from a slight zoom. */
export function initHeroSlides() {
  const slides = [...document.querySelectorAll('.hero__slide')]
  if (slides.length < 2 || matchMedia('(prefers-reduced-motion: reduce)').matches) return

  let current = 0
  setInterval(() => {
    slides[current].classList.remove('is-active')
    current = (current + 1) % slides.length
    slides[current].classList.add('is-active')
  }, INTERVAL_MS)
}
