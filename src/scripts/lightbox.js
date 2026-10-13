/** Opens a project's photos in the page-level <dialog id="lightbox"> from any `[data-gallery]` trigger. */
export function initLightbox() {
  const dialog = document.getElementById('lightbox')
  const image = dialog.querySelector('.lightbox__img')
  const caption = dialog.querySelector('.lightbox__caption')
  let slides = []
  let index = 0

  const show = (next) => {
    index = (next + slides.length) % slides.length
    image.classList.add('is-switching')
    const slide = slides[index]
    const preload = new Image()
    preload.onload = preload.onerror = () => {
      image.src = slide.src
      image.alt = slide.alt
      image.classList.remove('is-switching')
    }
    preload.src = slide.src
    caption.textContent = `${slide.alt}  ·  ${index + 1} / ${slides.length}`
  }

  document.querySelectorAll('[data-gallery]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      ;({ slides } = JSON.parse(trigger.dataset.gallery))
      dialog.showModal()
      show(0)
    })
  })

  dialog.querySelector('.lightbox__btn--close').addEventListener('click', () => dialog.close())
  dialog.querySelector('.lightbox__btn--prev').addEventListener('click', () => show(index - 1))
  dialog.querySelector('.lightbox__btn--next').addEventListener('click', () => show(index + 1))
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog || event.target.classList.contains('lightbox__stage')) dialog.close()
  })
  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') show(index - 1)
    if (event.key === 'ArrowRight') show(index + 1)
  })
}
