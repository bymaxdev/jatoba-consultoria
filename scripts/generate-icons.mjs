import sharp from "sharp";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const logo = join(root, "public", "logo.png");
/** --jac-navy-950 */
const bg = { r: 6, g: 13, b: 24, alpha: 1 };

await sharp(logo)
  .resize(512, 512, { fit: "contain", background: bg })
  .png()
  .toFile(join(root, "app", "icon.png"));

await sharp(logo)
  .resize(180, 180, { fit: "contain", background: bg })
  .png()
  .toFile(join(root, "app", "apple-icon.png"));

console.log("Wrote app/icon.png and app/apple-icon.png");
