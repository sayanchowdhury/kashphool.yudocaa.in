// Minimal pub/sub store shared across modules — no framework needed for a page this size.
const listeners = new Set();
export const state = {
  playing: false,
  mode: 'station', // 'station' | 'track'
  stationId: null,
  track: null,
  volume: 0.7,
  muted: false,
  dhak: false,
  reminded: false,
};

export function setState(patch) {
  Object.assign(state, patch);
  listeners.forEach(fn => fn(state));
}

export function subscribe(fn) {
  listeners.add(fn);
  fn(state);
  return () => listeners.delete(fn);
}

export function showToast(msg) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => el.classList.remove('show'), 2600);
}
