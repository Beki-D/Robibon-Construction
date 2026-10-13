// Entry for every page: shared behaviour first, page-specific modules only when their markup exists.
import { markLoadedPhotos } from './photos'
import { runPreloader } from './preloader'
import { initNav } from './nav'
import { initMotion } from './motion'

markLoadedPhotos()
initNav()
initMotion()
runPreloader()

if (document.querySelector('.hero__slide')) import('./hero-slides').then((m) => m.initHeroSlides())
if (document.querySelector('[data-gallery]')) import('./lightbox').then((m) => m.initLightbox())
if (document.getElementById('contact-form')) import('./contact').then((m) => m.initContactForm())
