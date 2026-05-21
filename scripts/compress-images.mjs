import sharp from 'sharp';
import { readdir, stat, rename, unlink } from 'fs/promises';
import { join, extname } from 'path';

const PUBLIC_DIR = './public';
const SIZE_THRESHOLD = 300 * 1024; // skip files already under 300KB
const MAX_WIDTH = 1800;
const JPEG_QUALITY = 82;

async function compressImages() {
  const files = await readdir(PUBLIC_DIR);
  const imageFiles = files.filter(f =>
    ['.jpg', '.jpeg', '.JPG', '.JPEG'].includes(extname(f))
  );

  let compressed = 0;
  let skipped = 0;

  for (const file of imageFiles) {
    const filepath = join(PUBLIC_DIR, file);
    const { size } = await stat(filepath);

    if (size <= SIZE_THRESHOLD) {
      skipped++;
      continue;
    }

    const tmpPath = filepath + '.tmp';
    const image = sharp(filepath);
    const meta = await image.metadata();
    const pipeline = meta.width > MAX_WIDTH ? image.resize(MAX_WIDTH) : image;

    await pipeline.jpeg({ quality: JPEG_QUALITY, progressive: true }).toFile(tmpPath);
    await unlink(filepath);
    await rename(tmpPath, filepath);

    const { size: newSize } = await stat(filepath);
    console.log(`Compressed ${file}: ${(size / 1024).toFixed(0)}KB → ${(newSize / 1024).toFixed(0)}KB`);
    compressed++;
  }

  console.log(`\nDone: ${compressed} compressed, ${skipped} already small (skipped)`);
}

compressImages().catch(console.error);
