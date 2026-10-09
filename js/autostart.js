import { MAHALAYA_ISO, BROADCAST_HOURS } from '../data/festival.js';
import { state } from './store.js';
import { playStation } from './radio.js';
import { showToast } from './store.js';

const KEY = 'kashful.autostart';
const START = new Date(MAHALAYA_ISO).getTime();
const END = START + BROADCAST_HOURS * 3600 * 1000;
let timer = null;

function render(on) {
  const btn = document.getElementById('autoStartBtn');
  if (!btn) return;
  btn.setAttribute('aria-checked', String(on));
  btn.textContent = on ? 'Enabled' : 'Enable';
}

function schedule(on) {
  clearTimeout(timer);
  if (!on) return;
  const now = Date.now();
  const tryPlay = () => {
    if (state.playing) return;
    playStation().catch(() => showToast('Tap play — your browser blocked auto-play'));
  };
  if (now >= START && now < END) {
    // already in the broadcast window — start live now if nothing's already playing
    tryPlay();
    return;
  }
  if (now < START) {
    const ms = START - now;
    if (ms < 2 ** 31) timer = setTimeout(tryPlay, ms);
  }
}

export function initAutoStart() {
  const on = localStorage.getItem(KEY) === '1';
  render(on);
  schedule(on);

  document.getElementById('autoStartBtn').addEventListener('click', () => {
    const next = localStorage.getItem(KEY) !== '1';
    localStorage.setItem(KEY, next ? '1' : '0');
    render(next);
    schedule(next);
    showToast(next ? 'Will start the radio automatically at 4:00 AM IST' : 'Auto-start turned off');
  });
}
