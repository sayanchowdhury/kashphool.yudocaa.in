import { MAHALAYA_ISO, BROADCAST_HOURS, DAYS } from '../data/festival.js';

const START = new Date(MAHALAYA_ISO).getTime();
const END = START + BROADCAST_HOURS * 3600 * 1000;

const CITIES = [
  { label: 'Kolkata (IST)', zone: 'Asia/Kolkata' },
  { label: 'London', zone: 'Europe/London' },
  { label: 'New York', zone: 'America/New_York' },
  { label: 'Los Angeles', zone: 'America/Los_Angeles' },
  { label: 'Dubai', zone: 'Asia/Dubai' },
  { label: 'Dhaka', zone: 'Asia/Dhaka' },
  { label: 'Singapore', zone: 'Asia/Singapore' },
  { label: 'Sydney', zone: 'Australia/Sydney' },
];

function pad(n) { return String(n).padStart(2, '0'); }

function tiles(ms) {
  const s = Math.max(0, Math.floor(ms / 1000));
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return [
    { v: d, l: 'Days' }, { v: pad(h), l: 'Hours' }, { v: pad(m), l: 'Min' }, { v: pad(sec), l: 'Sec' },
  ];
}

function renderTiles(list) {
  const el = document.getElementById('cdTiles');
  if (!el) return;
  el.innerHTML = list.map(t => `<div class="tile"><b>${t.v}</b><span>${t.l}</span></div>`).join('');
}

function tick() {
  const now = Date.now();
  const dot = document.getElementById('statusDot');
  const text = document.getElementById('statusText');
  if (!dot || !text) return;

  if (now < START) {
    dot.classList.remove('live');
    text.textContent = 'Starts ' + new Date(START).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', weekday: 'short', day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' }) + ' IST';
    renderTiles(tiles(START - now));
  } else if (now < END) {
    dot.classList.add('live');
    text.textContent = 'Akashvani FM Rainbow is broadcasting Mahalaya now';
    renderTiles(tiles(END - now));
  } else {
    dot.classList.remove('live');
    text.textContent = 'See you next year, and happy Pujo';
    renderTiles([{ v: '—', l: 'Days' }, { v: '—', l: 'Hours' }, { v: '—', l: 'Min' }, { v: '—', l: 'Sec' }]);
  }
}

function renderTzTable() {
  const el = document.getElementById('tzTable');
  const localEl = document.getElementById('localWhen');
  if (!el) return;
  el.innerHTML = CITIES.map(c => {
    const when = new Date(START).toLocaleString('en-IN', {
      timeZone: c.zone, weekday: 'short', day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit',
    });
    return `<div class="tz-row"><span>${c.label}</span><span>${when}</span></div>`;
  }).join('');

  try {
    const localZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (localZone && !CITIES.some(c => c.zone === localZone)) {
      const when = new Date(START).toLocaleString(undefined, {
        timeZone: localZone, weekday: 'short', day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit',
      });
      if (localEl) localEl.textContent = `Live on Akashvani FM Rainbow Kolkata · in your time zone: ${when}.`;
    }
  } catch {}
}

function renderDayGrid() {
  const el = document.getElementById('dayGrid');
  if (!el) return;
  el.innerHTML = DAYS.map(d => {
    const dateLabel = d.to
      ? `${fmtDate(d.from)} – ${fmtDate(d.to)}`
      : fmtDate(d.from);
    return `<div class="day-card${d.highlight ? ' highlight' : ''}">
      <div class="day-top"><span class="bn">${d.bn}</span><span class="en">${d.en}</span></div>
      <span class="date">${dateLabel}</span>
    </div>`;
  }).join('');
}

function fmtDate(iso) {
  return new Date(iso + 'T00:00:00+05:30').toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata' });
}

export function initCountdown() {
  tick();
  renderTzTable();
  renderDayGrid();
  setInterval(tick, 1000);
}
