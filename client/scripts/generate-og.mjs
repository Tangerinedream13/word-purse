import sharp from 'sharp'
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const svg = readFileSync(join(__dirname, '../public/og-image.svg'))

await sharp(svg)
  .resize(1200, 630)
  .png()
  .toFile(join(__dirname, '../public/og-image.png'))

console.log('✓ Generated public/og-image.png')
