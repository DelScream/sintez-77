import { readdir } from "node:fs/promises";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const dir = fileURLToPath(new URL("../src/assets/", import.meta.url));
const files = (await readdir(dir)).filter((f) => extname(f).toLowerCase() === ".png");

for (const file of files) {
  const input = join(dir, file);
  const output = input.replace(/\.png$/i, ".webp");
  await sharp(input).webp({ quality: 72 }).toFile(output);
  console.log(`${file} → webp`);
}
