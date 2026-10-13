import path from 'node:path'
import sharp from 'sharp'
import type { ImageMetadata } from 'astro'

const modules = import.meta.glob<{ default: ImageMetadata }>('../assets/photos/*.{webp,jpg}', { eager: true })

/** Photos by file name, e.g. `photos['adama-road-1.webp']`. */
export const photos: Record<string, ImageMetadata> = Object.fromEntries(
  Object.entries(modules).map(([file, mod]) => [path.basename(file), mod.default]),
)

const placeholders = new Map<string, Promise<string>>()

/** Tiny blurred copy of a photo as a data URI, shown while the real image loads. */
export function placeholderFor(name: string): Promise<string> {
  let cached = placeholders.get(name)
  if (!cached) {
    cached = sharp(path.join(process.cwd(), 'src/assets/photos', name))
      .resize({ width: 24 })
      .webp({ quality: 40 })
      .toBuffer()
      .then((buffer) => `data:image/webp;base64,${buffer.toString('base64')}`)
    placeholders.set(name, cached)
  }
  return cached
}
