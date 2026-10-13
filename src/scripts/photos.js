// Fade each photo in once it has loaded; until then the blurred placeholder underneath shows.
export function markLoadedPhotos() {
  document.querySelectorAll('.photo__img').forEach((img) => {
    const wrapper = img.closest('.photo')
    const done = () => wrapper?.classList.add('is-loaded')
    if (img.complete && img.naturalWidth) done()
    else {
      img.addEventListener('load', done, { once: true })
      img.addEventListener('error', done, { once: true })
    }
  })
}
