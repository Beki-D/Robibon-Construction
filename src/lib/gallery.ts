import { getImage } from 'astro:assets'
import { photos } from './photos'
import type { Project } from '../data/projects'

/** JSON for a card's `data-gallery` attribute: full-size photo URLs the lightbox swaps through. */
export async function galleryFor(project: Project): Promise<string> {
  const slides = await Promise.all(
    project.photos.map(async (name, index) => {
      const image = await getImage({ src: photos[name], width: 1800, format: 'webp' })
      return { src: image.src, alt: `${project.title}, photo ${index + 1}` }
    }),
  )
  return JSON.stringify({ title: project.title, slides })
}
