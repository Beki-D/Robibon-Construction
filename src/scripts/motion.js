import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText)

const MOTION_OK = '(prefers-reduced-motion: no-preference)'
const root = document.documentElement

// Class-driven effects ported from the Weitz clone (src/lib/motion/useGlobalMotion.ts): add the class, get the effect.
const CLAMPED_SCRUB = { start: 'clamp(top 90%)', end: 'clamp(top 60%)', scrub: 1, refreshPriority: -1 }
const PLAY_AT_90 = { start: 'top 90%', toggleActions: 'play none none reverse' }
const FADE_UP = { y: '3vh', opacity: 0 }

const all = (selector, scope = document) => [...scope.querySelectorAll(selector)]

/** Resolves once the first-visit loader has lifted (immediately on repeat visits). */
const whenRevealed = () =>
  root.classList.contains('show-preloader')
    ? new Promise((resolve) => document.addEventListener('preloader:done', resolve, { once: true }))
    : Promise.resolve()

export function initMotion() {
  initHeader()

  const mm = gsap.matchMedia()
  mm.add(MOTION_OK, () => {
    const smoother = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1.1,
      smoothTouch: false,
      effects: false,
    })

    initAnchors(smoother)
    initHero()
    initPageHero()
    all('.section-scale').forEach((section) => scaleSection(section))
    all('.content-fade').forEach((el) => gsap.from(el, { scrollTrigger: { trigger: el, ...CLAMPED_SCRUB }, ...FADE_UP }))
    all('.auto-fade').forEach((el) => gsap.from(el, { scrollTrigger: { trigger: el, ...PLAY_AT_90 }, ...FADE_UP }))
    all('.grid-fade').forEach(fadeUpGridChildren)
    all('.quote__text').forEach(fillQuote)
    all('.cta__outline').forEach(fillOnScroll)

    window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true })
    whenRevealed().then(() => jumpToHash(smoother))
    return () => smoother.kill()
  })

  // Reduced motion: no smoothing or scroll effects; outlined headings show filled.
  mm.add('(prefers-reduced-motion: reduce)', () => {
    whenRevealed().then(() => jumpToHash(null))
  })
}

/** Solid background after the first screen; hides on scroll down and returns on scroll up. */
function initHeader() {
  const header = document.getElementById('header')
  if (!header) return
  ScrollTrigger.create({
    start: 80,
    end: 'max',
    onToggle: (self) => header.classList.toggle('is-solid', self.isActive),
    onUpdate: (self) => header.classList.toggle('is-hidden', self.direction === 1 && self.scroll() > innerHeight),
  })
}

/** Home hero: pinned while the outlined headline fills with the brand gradient. */
function initHero() {
  const hero = document.querySelector('.hero')
  if (!hero) return
  const title = hero.querySelector('.hero__title')

  // fromTo with explicit values so reloading mid-page can't leave the fill stuck.
  gsap.fromTo(
    title,
    { '--fill': '100%' },
    {
      '--fill': '0%',
      ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top 0', end: '+=90%', pin: true, scrub: true },
    },
  )

  gsap.set(['.hero__sub', '.hero__scroll'], { opacity: 0 })
  whenRevealed().then(() => {
    gsap.fromTo('.hero__sub', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out', delay: 0.15 })
    gsap.to('.hero__scroll', { opacity: 1, duration: 0.8, delay: 0.6 })
  })
}

/** Inner-page titles fill once on load. */
function initPageHero() {
  const title = document.querySelector('.page-hero__title')
  if (!title) return
  whenRevealed().then(() => {
    gsap.fromTo(title, { '--fill': '100%' }, { '--fill': '0%', duration: 1.8, ease: 'power2.inOut' })
    gsap.from('.page-hero__crumbs', { y: 20, opacity: 0, duration: 0.9, delay: 0.5, ease: 'power3.out' })
  })
}

/** Wide screens grow `.background-scale` to full width; narrow screens scale the whole section up. */
function scaleSection(section) {
  const background = section.querySelector('.background-scale')
  const mm = gsap.matchMedia()
  mm.add('(min-width: 1301px)', () => {
    if (background) gsap.to(background, { scrollTrigger: { trigger: section, ...CLAMPED_SCRUB }, width: '100%', ease: 'none' })
  })
  mm.add('(max-width: 1300px)', () => {
    gsap.to(section, { scrollTrigger: { trigger: section, ...CLAMPED_SCRUB }, scale: 1, ease: 'none' })
  })
}

function fadeUpGridChildren(grid) {
  if (!grid.children.length) return
  gsap.from(grid.children, {
    scrollTrigger: { trigger: grid, ...PLAY_AT_90 },
    ...FADE_UP,
    delay: 0.3,
    stagger: 0.15,
  })
}

/** Word-by-word fill driven by scroll. */
function fillQuote(quote) {
  const split = new SplitText(quote, { type: 'words', wordsClass: 'split-word' })
  gsap.fromTo(
    split.words,
    { backgroundPosition: '100% 50%' },
    {
      backgroundPosition: '0% 50%',
      stagger: 0.5,
      ease: 'none',
      scrollTrigger: { trigger: quote, start: 'clamp(top 75%)', end: 'clamp(bottom 60%)', scrub: true },
    },
  )
}

function fillOnScroll(element) {
  gsap.fromTo(
    element,
    { '--fill': '100%' },
    {
      '--fill': '0%',
      ease: 'none',
      scrollTrigger: { trigger: element, start: 'top 85%', end: 'top 35%', scrub: true },
    },
  )
}

/** In-page links go through ScrollSmoother so they glide instead of fighting the transform. */
function initAnchors(smoother) {
  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href^="#"]')
    const target = link && document.querySelector(link.getAttribute('href'))
    if (!target) return
    event.preventDefault()
    smoother.scrollTo(target, true, 'top 90px')
  })
}

function jumpToHash(smoother) {
  const target = location.hash && document.querySelector(location.hash)
  if (!target) return
  if (smoother) smoother.scrollTo(target, false, 'top 90px')
  else target.scrollIntoView()
}
