import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

const THEME_KEYS = new Set(["shukatsu", "renai", "fukui"]);

export function loadArchiveData(dataDir) {
  const eventsPath = path.join(dataDir, "events.yaml");
  const notesPath = path.join(dataDir, "notes.yaml");
  const photosDir = path.join(dataDir, "photos");

  const eventsRaw = yaml.load(readFileSync(eventsPath, "utf8"));
  const notesRaw = yaml.load(readFileSync(notesPath, "utf8"));

  const events = eventsRaw?.events ?? [];
  const notes = notesRaw?.notes ?? [];
  const eventIds = new Set(events.map((e) => e.id));

  const errors = [];

  for (const note of notes) {
    if (!note.id) errors.push(`id が未設定のエントリがあります: ${JSON.stringify(note)}`);
    if (!note.image) {
      errors.push(`[${note.id}] image が未設定です`);
    } else if (!existsSync(path.join(dataDir, note.image))) {
      errors.push(`[${note.id}] 画像ファイルが見つかりません: ${note.image}`);
    }
    if (!note.event) {
      errors.push(`[${note.id}] event が未設定です`);
    } else if (!eventIds.has(note.event)) {
      errors.push(`[${note.id}] event "${note.event}" は events.yaml に存在しません`);
    }
    if (!note.theme) {
      errors.push(`[${note.id}] theme が未設定です`);
    } else if (!THEME_KEYS.has(note.theme)) {
      errors.push(`[${note.id}] theme "${note.theme}" は未知のテーマです（shukatsu/renai/fukui のいずれか）`);
    }
    if (!note.question) errors.push(`[${note.id}] question が未設定です`);
  }

  if (errors.length > 0) {
    console.error("バリデーションエラー:");
    for (const e of errors) console.error(`  - ${e}`);
    throw new Error(`${errors.length}件のバリデーションエラーがあります。archive-data/notes.yaml を確認してください。`);
  }

  const eventsById = Object.fromEntries(events.map((e) => [e.id, e]));

  return { events, eventsById, notes, photosDir };
}
