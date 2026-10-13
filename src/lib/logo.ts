import path from 'node:path'
import sharp from 'sharp'

let cached: Promise<{ uri: string; ratio: number }> | undefined

/**
 * The logo as a small data URI that is inlined into every page's <head>. Because it ships inside the HTML itself
 * it paints with the first response, so it can never appear half-loaded on a slow network.
 */
export function inlineLogo() {
  cached ??= (async () => {
    const trimmed = await sharp(path.join(process.cwd(), 'src/assets/brand/logo.png')).trim().toBuffer()
    const { data, info } = await sharp(trimmed)
      .resize({ width: 280 })
      .webp({ quality: 88 })
      .toBuffer({ resolveWithObject: true })
    return { uri: `data:image/webp;base64,${data.toString('base64')}`, ratio: info.width / info.height }
  })()
  return cached
}
