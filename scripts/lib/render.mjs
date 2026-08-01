const THEME_META = {
  shukatsu: { label: "就活生の本音", cssClass: "theme-blue" },
  renai: { label: "恋愛の哲学", cssClass: "theme-pink" },
  fukui: { label: "福井という選択", cssClass: "theme-green" },
};

function escapeHtml(str) {
  return String(str ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[c]));
}

function renderNoteCard(note, eventsById) {
  const theme = THEME_META[note.theme];
  const event = eventsById[note.event];
  return `
      <div class="theme-card ${theme.cssClass} note-card" data-theme="${note.theme}" data-event="${note.event}" data-id="${note.id}">
        <img src="images/${escapeHtml(note.image.replace(/^photos\//, ""))}" alt="${escapeHtml(note.alt)}" loading="lazy" class="note-card-image">
        <p class="note-card-question">${escapeHtml(note.question)}</p>
        ${note.excerpt ? `<p class="note-card-excerpt">${escapeHtml(note.excerpt)}</p>` : ""}
        <p class="note-card-meta">${escapeHtml(theme.label)} / ${escapeHtml(event?.name ?? note.event)}</p>
      </div>`;
}

export function renderArchivePage({ notes, events, eventsById }) {
  const notesJson = JSON.stringify(
    notes.map((n) => ({
      id: n.id,
      image: `images/${n.image.replace(/^photos\//, "")}`,
      theme: n.theme,
      event: n.event,
      question: n.question,
      excerpt: n.excerpt ?? null,
      alt: n.alt,
    }))
  );

  const themeButtons = Object.entries(THEME_META)
    .map(([key, meta]) => `<button class="btn filter-btn" data-filter-theme="${key}">${escapeHtml(meta.label)}</button>`)
    .join("\n        ");

  const eventButtons = events
    .map((e) => `<button class="btn filter-btn" data-filter-event="${e.id}">${escapeHtml(e.name)}</button>`)
    .join("\n        ");

  const cards = notes.map((n) => renderNoteCard(n, eventsById)).join("\n");

  return `<!-- 自動生成: scripts/build-archive.mjs で生成。直接編集しないこと -->
<!doctype html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>これまでの問い | ここもやり展</title>
<link rel="stylesheet" href="../style.css">
<link rel="stylesheet" href="archive.css">
</head>
<body>
<header class="hero">
  <div class="container">
    <h1>これまでの問い</h1>
    <p class="tagline">過去の展示で交わされた、問いと回答のアーカイブです。</p>
    <a href="../index.html" class="btn">← トップに戻る</a>
  </div>
</header>
<main class="container">
  <section id="today-note">
    <h2>今日出会う一枚</h2>
    <div id="today-note-slot"></div>
    <button id="reroll-btn" class="btn">別の1枚を見る</button>
  </section>

  <section id="filters">
    <h2>絞り込み</h2>
    <div class="filter-group" data-filter-group="theme">
      <button class="btn filter-btn is-active" data-filter-theme="all">すべてのテーマ</button>
        ${themeButtons}
    </div>
    <div class="filter-group" data-filter-group="event">
      <button class="btn filter-btn is-active" data-filter-event="all">すべての回</button>
        ${eventButtons}
    </div>
  </section>

  <section id="note-list">
    <h2>一覧（<span id="note-count">${notes.length}</span>件）</h2>
    <div class="themes-container" id="note-grid">${cards}
    </div>
  </section>
</main>
<footer class="footer">
  <div class="container">ここもやり展</div>
</footer>
<script>
const NOTES = ${notesJson};

function pickRandomNote(notes, excludeId) {
  const pool = excludeId ? notes.filter((n) => n.id !== excludeId) : notes;
  const source = pool.length > 0 ? pool : notes;
  return source[Math.floor(Math.random() * source.length)];
}

function renderTodayNote(note) {
  const slot = document.getElementById("today-note-slot");
  if (!note) {
    slot.innerHTML = "<p>まだ問いが登録されていません。</p>";
    return;
  }
  slot.innerHTML =
    '<div class="theme-card note-card note-card--featured">' +
    '<img src="' + note.image + '" alt="' + note.alt + '" class="note-card-image">' +
    '<p class="note-card-question">' + note.question + "</p>" +
    (note.excerpt ? '<p class="note-card-excerpt">' + note.excerpt + "</p>" : "") +
    "</div>";
  slot.dataset.currentId = note.id;
}

let currentTodayNote = pickRandomNote(NOTES);
renderTodayNote(currentTodayNote);

document.getElementById("reroll-btn").addEventListener("click", () => {
  currentTodayNote = pickRandomNote(NOTES, currentTodayNote?.id);
  renderTodayNote(currentTodayNote);
});

let currentTheme = "all";
let currentEvent = "all";

function applyFilters() {
  const cards = document.querySelectorAll("#note-grid .note-card");
  let visibleCount = 0;
  cards.forEach((card) => {
    const matchesTheme = currentTheme === "all" || card.dataset.theme === currentTheme;
    const matchesEvent = currentEvent === "all" || card.dataset.event === currentEvent;
    const visible = matchesTheme && matchesEvent;
    card.style.display = visible ? "" : "none";
    if (visible) visibleCount += 1;
  });
  document.getElementById("note-count").textContent = String(visibleCount);
}

document.querySelectorAll("[data-filter-theme]").forEach((btn) => {
  btn.addEventListener("click", () => {
    currentTheme = btn.dataset.filterTheme;
    document.querySelectorAll("[data-filter-theme]").forEach((b) => b.classList.toggle("is-active", b === btn));
    applyFilters();
  });
});

document.querySelectorAll("[data-filter-event]").forEach((btn) => {
  btn.addEventListener("click", () => {
    currentEvent = btn.dataset.filterEvent;
    document.querySelectorAll("[data-filter-event]").forEach((b) => b.classList.toggle("is-active", b === btn));
    applyFilters();
  });
});
</script>
</body>
</html>
`;
}
