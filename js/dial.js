import { STATIONS } from '../data/stations.js';
import { state, subscribe } from './store.js';
import { playStation, togglePlay, next, prev, setVolume, toggleMute, currentStation } from './radio.js';
import { toggleReminder } from './reminder.js';

const PLAY_ICON = '<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.5 5.5v13l10.5-6.5z" fill="currentColor"></path></svg>';
const PAUSE_ICON = '<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><rect x="6.5" y="5" width="4" height="14" rx="1.2" fill="currentColor"></rect><rect x="13.5" y="5" width="4" height="14" rx="1.2" fill="currentColor"></rect></svg>';

let dialOpen = false;

function renderStationGrid() {
  const el = document.getElementById('stationGrid');
  el.innerHTML = STATIONS.map(s => `
    <button class="station-btn" data-id="${s.id}" aria-pressed="${state.mode === 'station' && state.stationId === s.id}" type="button">
      <span class="s-name">${s.name}</span>
      <span class="s-tag">${s.tagline}</span>
    </button>
  `).join('');
  el.querySelectorAll('.station-btn').forEach(btn => {
    btn.addEventListener('click', () => playStation(btn.dataset.id));
  });
}

function renderTicks() {
  const el = document.getElementById('tunerTicks');
  el.innerHTML = Array.from({ length: 40 }, () => '<i></i>').join('');
}

function renderNeedle() {
  const needle = document.getElementById('tunerNeedle');
  const s = currentStation();
  needle.style.left = `${s.dial * 100}%`;
}

function renderBarAndPanel() {
  const title = state.mode === 'track' && state.track ? state.track.title : 'Akashvani FM Rainbow';
  const artist = state.mode === 'track' && state.track ? state.track.artist : 'Live · All India Radio, Kolkata';
  const cover = state.mode === 'track' && state.track ? state.track.cover : '';

  document.getElementById('pbTitle').textContent = title;
  document.getElementById('pbArtist').textContent = artist;
  document.getElementById('pbLive').hidden = !(state.mode === 'station');
  const img = document.getElementById('pbCoverImg');
  img.src = cover || radioIconDataUri();
  img.alt = '';

  const icon = state.playing ? PAUSE_ICON : PLAY_ICON;
  document.getElementById('pbPlay').innerHTML = icon;
  document.getElementById('pbPlay').setAttribute('aria-label', state.playing ? 'Pause' : 'Play');
  document.getElementById('dialPlay').innerHTML = icon.replace('width="20" height="20"', 'width="22" height="22"');
  document.getElementById('dialPlay').setAttribute('aria-label', state.playing ? 'Pause' : 'Play');

  renderStationGrid();
  renderNeedle();

  const scene = document.getElementById('sceneWrap');
  if (scene) scene.classList.toggle('is-playing', !!state.playing);

  const reminderBtn = document.getElementById('dialReminderBtn');
  reminderBtn.textContent = state.reminded ? 'Enabled' : 'Enable';
  document.getElementById('reminderSub').textContent = state.reminded
    ? 'We’ll notify you at 4:00 AM IST while this tab is open'
    : 'Notify me when Mahalaya goes live';
  document.getElementById('bellBtn').setAttribute('aria-pressed', String(!!state.reminded));

  document.getElementById('muteBtn').setAttribute('aria-pressed', String(!!state.muted));

  const vol = Math.round((state.muted ? 0 : state.volume) * 100);
  document.getElementById('volVal').textContent = vol + '%';
  document.getElementById('volMark').style.transform = `rotate(${-130 + (vol / 100) * 260}deg)`;
}

let cachedIcon = '';
function radioIconDataUri() {
  if (cachedIcon) return cachedIcon;
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 44 44'><rect width='44' height='44' rx='10' fill='#241a36'/><circle cx='22' cy='22' r='9' fill='none' stroke='#f2d54a' stroke-width='2'/><circle cx='22' cy='22' r='2.4' fill='#f2d54a'/></svg>`;
  cachedIcon = 'data:image/svg+xml,' + encodeURIComponent(svg);
  return cachedIcon;
}

function openDial() {
  dialOpen = true;
  document.getElementById('dialBackdrop').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeDial() {
  dialOpen = false;
  document.getElementById('dialBackdrop').classList.remove('open');
  document.body.style.overflow = '';
}

function bindKnob() {
  const knob = document.getElementById('volKnob');
  let dragging = false;
  let startY = 0, startVol = state.volume;

  const onMove = e => {
    if (!dragging) return;
    const y = (e.touches ? e.touches[0].clientY : e.clientY);
    const delta = (startY - y) / 140; // drag up = louder
    setVolume(startVol + delta);
  };
  const onUp = () => { dragging = false; window.removeEventListener('pointermove', onMove); window.removeEventListener('pointerup', onUp); };

  knob.addEventListener('pointerdown', e => {
    dragging = true; startY = e.clientY; startVol = state.muted ? 0 : state.volume;
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  });
  knob.addEventListener('keydown', e => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowRight') { setVolume(state.volume + 0.05); e.preventDefault(); }
    if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') { setVolume(state.volume - 0.05); e.preventDefault(); }
  });
}

export function initDial() {
  renderTicks();
  bindKnob();

  document.getElementById('pbMeta').addEventListener('click', openDial);
  document.getElementById('dialClose').addEventListener('click', closeDial);
  document.getElementById('dialBackdrop').addEventListener('click', e => {
    if (e.target.id === 'dialBackdrop') closeDial();
  });
  window.addEventListener('keydown', e => { if (e.key === 'Escape' && dialOpen) closeDial(); });

  document.getElementById('pbPlay').addEventListener('click', togglePlay);
  document.getElementById('dialPlay').addEventListener('click', togglePlay);
  document.getElementById('dialNext').addEventListener('click', next);
  document.getElementById('dialPrev').addEventListener('click', prev);
  document.getElementById('dialReminderBtn').addEventListener('click', toggleReminder);
  document.getElementById('bellBtn').addEventListener('click', toggleReminder);
  document.getElementById('muteBtn').addEventListener('click', toggleMute);

  subscribe(renderBarAndPanel);
}
