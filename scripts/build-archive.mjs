import { mkdirSync, copyFileSync, writeFileSync, rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadArchiveData } from "./lib/load-data.mjs";
import { renderArchivePage } from "./lib/render.mjs";

const rootDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const dataDir = path.join(rootDir, "archive-data");
const outDir = path.join(rootDir, "archive");
const outImagesDir = path.join(outDir, "images");

const { events, eventsById, notes } = loadArchiveData(dataDir);

rmSync(outImagesDir, { recursive: true, force: true });
mkdirSync(outImagesDir, { recursive: true });

// Phase 1 MVP: そのままコピーするのみ。HEIC変換・リサイズはPhase 2でsharpを導入して対応する。
// note.image は "photos/notes/xxx.jpg" のように photos/ 配下のサブディレクトリ（notes/, boards/）を含む前提。
let copied = 0;
for (const note of notes) {
  const srcPath = path.join(dataDir, note.image);
  const relPath = note.image.replace(/^photos\//, "");
  const destPath = path.join(outImagesDir, relPath);
  mkdirSync(path.dirname(destPath), { recursive: true });
  copyFileSync(srcPath, destPath);
  copied += 1;
}

const html = renderArchivePage({ notes, events, eventsById });
writeFileSync(path.join(outDir, "index.html"), html, "utf8");

const themeCounts = notes.reduce((acc, n) => {
  acc[n.theme] = (acc[n.theme] ?? 0) + 1;
  return acc;
}, {});

console.log(`アーカイブビルド完了`);
console.log(`  付箋件数: ${notes.length}件`);
console.log(`  画像コピー: ${copied}件`);
console.log(`  テーマ別件数: ${JSON.stringify(themeCounts)}`);
console.log(`  出力先: ${path.relative(rootDir, outDir)}/index.html`);
