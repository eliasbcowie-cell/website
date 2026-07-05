import sharp from 'sharp';
import { readdir, stat, rename, unlink } from 'fs/promises';
import { join, extname } from 'path';

// Pass a target directory as the first arg, e.g. `node scripts/compress-images.mjs public/July1upload`.
// Defaults to the whole public folder. Recurses into subfolders.
const TARGET_DIR = process.argv[2] || './public';
const SIZE_THRESHOLD = 300 * 1024; // skip files already under 300KB
const MAX_EDGE = 1800; // cap the longest side (handles portrait + landscape)
const JPEG_QUALITY = 82;
const EXTS = ['.jpg', '.jpeg'];

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(p);
    else yield p;
  }
}

async function compressImages() {
  let compressed = 0;
  let skipped = 0;
  let saved = 0;

  for await (const filepath of walk(TARGET_DIR)) {
    if (!EXTS.includes(extname(filepath).toLowerCase())) continue;

    const { size } = await stat(filepath);
    if (size <= SIZE_THRESHOLD) {
      skipped++;
      continue;
    }

    const tmpPath = filepath + '.tmp';
    await sharp(filepath)
      .rotate() // bake in EXIF orientation, then drop the tag
      .resize(MAX_EDGE, MAX_EDGE, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: JPEG_QUALITY, progressive: true })
      .toFile(tmpPath);
    await unlink(filepath);
    await rename(tmpPath, filepath);

    const { size: newSize } = await stat(filepath);
    saved += size - newSize;
    console.log(`Compressed ${filepath}: ${(size / 1024).toFixed(0)}KB → ${(newSize / 1024).toFixed(0)}KB`);
    compressed++;
  }

  console.log(`\nDone: ${compressed} compressed, ${skipped} already small (skipped), saved ${(saved / 1048576).toFixed(1)}MB`);
}

compressImages().catch(console.error);
