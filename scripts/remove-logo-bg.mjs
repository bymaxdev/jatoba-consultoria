/**
 * Removes the dominant navy/flat background around the logo using border samples.
 */
import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const inputPath = path.join(ROOT, "public", "logo.png");
const backupPath = path.join(ROOT, "public", "logo.backup.png");

function dist(rgb, bg) {
  const dr = rgb[0] - bg[0];
  const dg = rgb[1] - bg[1];
  const db = rgb[2] - bg[2];
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

async function main() {
  const buf = await fs.readFile(inputPath);
  await fs.writeFile(backupPath, buf);

  const { data, info } = await sharp(buf).ensureAlpha().raw().toBuffer({
    resolveWithObject: true,
  });

  const { width, height, channels } = info;
  if (channels !== 4) {
    throw new Error(`Expected RGBA, got ${channels} channels`);
  }

  const border = Math.max(2, Math.floor(Math.min(width, height) * 0.02));
  const samples = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (
        x < border ||
        x >= width - border ||
        y < border ||
        y >= height - border
      ) {
        const i = (y * width + x) * 4;
        samples.push([data[i], data[i + 1], data[i + 2]]);
      }
    }
  }

  const n = samples.length;
  const bg = [
    samples.reduce((s, p) => s + p[0], 0) / n,
    samples.reduce((s, p) => s + p[1], 0) / n,
    samples.reduce((s, p) => s + p[2], 0) / n,
  ];

  /** Pixels nearer than HARD to background become fully transparent */
  const HARD = 38;
  /** Between HARD and SOFT, alpha ramps up */
  const SOFT = 78;

  const out = Buffer.from(data);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const rgb = [data[i], data[i + 1], data[i + 2]];
      const d = dist(rgb, bg);
      let a;
      if (d <= HARD) {
        a = 0;
      } else if (d >= SOFT) {
        a = 255;
      } else {
        a = Math.round(((d - HARD) / (SOFT - HARD)) * 255);
      }
      const prev = out[i + 3];
      out[i + 3] = Math.round((prev * a) / 255);
    }
  }

  await sharp(out, {
    raw: { width, height, channels: 4 },
  })
    .png({ compressionLevel: 9 })
    .toFile(inputPath);

  // eslint-disable-next-line no-console
  console.log("Background sampled as RGB (~background):", bg.map((x) => x.toFixed(1)));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
