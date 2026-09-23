const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const assetsDir = path.join(__dirname, '..', 'public', 'assets');

function getFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getFiles(fullPath, fileList);
    } else if (file.toLowerCase().endsWith('.png')) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

async function optimizeAll() {
  const pngFiles = getFiles(assetsDir);
  console.log(`Found ${pngFiles.length} PNG files to convert/optimize...`);

  let totalOriginal = 0;
  let totalWebp = 0;

  for (const file of pngFiles) {
    const stat = fs.statSync(file);
    totalOriginal += stat.size;

    const webpPath = file.replace(/\.png$/i, '.webp');

    try {
      const image = sharp(file);
      const metadata = await image.metadata();

      let pipeline = image;
      // If image is ridiculously large (> 1920px width), downscale proportionally
      if (metadata.width && metadata.width > 1920) {
        pipeline = pipeline.resize({ width: 1920, withoutEnlargement: true });
      }

      await pipeline
        .webp({ quality: 82, effort: 4 })
        .toFile(webpPath);

      const webpStat = fs.statSync(webpPath);
      totalWebp += webpStat.size;

      const origKb = Math.round(stat.size / 1024);
      const webpKb = Math.round(webpStat.size / 1024);
      const saved = Math.round((1 - webpStat.size / stat.size) * 100);
      console.log(`[OPTIMIZED] ${path.basename(file)}: ${origKb}KB -> ${webpKb}KB (-${saved}%)`);
    } catch (err) {
      console.error(`Error optimizing ${file}:`, err.message);
    }
  }

  const origMb = (totalOriginal / (1024 * 1024)).toFixed(2);
  const webpMb = (totalWebp / (1024 * 1024)).toFixed(2);
  const totalSaved = Math.round((1 - totalWebp / totalOriginal) * 100);

  console.log(`\n========================================`);
  console.log(`TOTAL ORIGINAL: ${origMb} MB`);
  console.log(`TOTAL WEBP:     ${webpMb} MB`);
  console.log(`TOTAL SAVINGS:  -${totalSaved}% (${(origMb - webpMb).toFixed(2)} MB saved!)`);
  console.log(`========================================\n`);
}

optimizeAll();
