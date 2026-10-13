# ROBIBON Construction site

Static Astro site (4 pages) with the Weitz-style motion system in Rob's brand colours.
Part of the `Rob/` folder: `public_html/` is the old live site, `v1-repo-2022/` is the original 2022 repo, `site/` is this rebuild.

## Run

pnpm only. Scripts call `node node_modules/astro/bin/astro.mjs` because the parent folder name contains a `:`.

    pnpm install
    pnpm run dev       # http://localhost:4321
    pnpm run build     # static output in dist/
    pnpm run preview

## Layout

| Path | What lives there |
| --- | --- |
| `src/config/site.ts` | Name, phone, email, hours, map, EmailJS ids, nav. Edit contact details here once. |
| `src/data/` | Projects and page copy (services, values, goals). |
| `src/components/` | Header, Footer, Preloader, Photo, Cta, PageHero, Lightbox, Icon. |
| `src/styles/` | SCSS: `_tokens` (all colours, type, motion), base partials, `components/`, `sections/`. |
| `src/scripts/` | `motion.js` (ScrollSmoother, hero fill, quote fill, reveals), `preloader.js`, `nav.js`, `lightbox.js`, `contact.js`. |
| `src/assets/photos/` | Project photos with descriptive names. Astro resizes them and adds blur placeholders. |

## How the motion works

Add a class, get the effect (same idea as the Weitz clone): `content-fade`, `auto-fade`, `grid-fade`,
`section-scale` + `.background-scale`, `.quote__text` (word fill), `.cta__outline` (scroll fill).
Everything is skipped under `prefers-reduced-motion`.

## Loader

First visit per browser session only. The logo is inlined into `<head>` as a small data URI so it can never
arrive in pieces; the line under it fills with real progress (fonts, hero image, window load) and gives up waiting after 6s.

## Notes

- EmailJS public key lives in `src/config/site.ts`; set a domain allow-list on the EmailJS dashboard.
- Old URLs were `*.html`; the new routes are `/about`, `/projects`, `/contact`. Add redirects on the host and update `public/sitemap.xml` before deploying.
