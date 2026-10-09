import { TRACKS, allTracks } from '../data/tracks.js';
import { playTrack } from './radio.js';
import { subscribe } from './store.js';

const TABS = [
  { id: 'mahalaya', label: 'Mahalaya' },
  { id: 'chandi', label: 'Chandi' },
  { id: 'pujo', label: 'Pujo Gaan' },
];

let active = 'mahalaya';
const covers = new Map(allTracks().map(t => [t.id, t.cover]));

function fmtDur(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.round(sec % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

function renderTabs() {
  const el = document.getElementById('plTabs');
  el.innerHTML = TABS.map(t => `<button class="tab-btn" role="tab" aria-selected="${t.id === active}" data-tab="${t.id}" type="button">${t.label}</button>`).join('');
  el.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => { active = btn.dataset.tab; render(); });
  });
}

function renderList(currentTrackId) {
  const el = document.getElementById('plList');
  const list = TRACKS[active] || [];
  el.innerHTML = list.map((t, i) => `
    <button class="track-row${t.id === currentTrackId ? ' is-current' : ''}" data-id="${t.id}" aria-current="${t.id === currentTrackId}" type="button">
      <span class="num">${i + 1}</span>
      <img src="${covers.get(t.id) || ''}" alt="" width="44" height="44" loading="lazy" referrerpolicy="no-referrer">
      <span class="meta">
        <span class="title">${t.title}</span>
        <span class="artist">${t.artist}</span>
      </span>
      <span class="dur">${fmtDur(t.dur)}</span>
    </button>
  `).join('');
  el.querySelectorAll('.track-row').forEach(row => {
    row.addEventListener('click', () => {
      const track = list.find(t => t.id === row.dataset.id);
      const queued = list.map(t => ({ ...t, cover: covers.get(t.id) }));
      playTrack({ ...track, cover: covers.get(track.id) }, queued);
    });
  });
}

function render(currentTrackId) {
  renderTabs();
  renderList(currentTrackId);
}

export function initPlaylists() {
  render();
  subscribe(s => {
    const id = s.mode === 'track' && s.track ? s.track.id : null;
    renderList(id);
  });
}
