import { setState } from './store.js';
import { DEFAULT_STATION_ID } from '../data/stations.js';
import { initDial } from './dial.js';
import { initCountdown } from './countdown.js';
import { initRituals } from './rituals.js';
import { initPlaylists } from './playlists.js';
import { initChecklist } from './checklist.js';
import { initGreetingCard } from './greeting-card.js';
import { initReminder } from './reminder.js';
import { initAutoStart } from './autostart.js';
import { startDhak, stopDhak } from './dhak.js';
import { showToast } from './store.js';

// show a station as selected in the UI without starting playback on load
// (an uninvited autoplay would be blocked by the browser anyway — the
// visitor presses play, or opts into the Schedule section's auto-start
// toggle, whose own click counts as the user gesture that lets the later
// timed play() call through).
setState({ mode: 'station', stationId: DEFAULT_STATION_ID });

initDial();
initCountdown();
initRituals();
initPlaylists();
initChecklist();
initGreetingCard();
initReminder();
initAutoStart();

const dhakBtn = document.getElementById('dhakBtn');
dhakBtn.addEventListener('click', () => {
  const on = dhakBtn.getAttribute('aria-pressed') === 'true';
  if (on) { stopDhak(); dhakBtn.setAttribute('aria-pressed', 'false'); }
  else { startDhak(); dhakBtn.setAttribute('aria-pressed', 'true'); }
});

document.getElementById('shareBtn').addEventListener('click', async () => {
  const shareData = { title: 'Kashful', text: 'Mahalaya live radio and a Durga Puja countdown.', url: location.href };
  if (navigator.share) {
    try { await navigator.share(shareData); return; } catch { /* cancelled */ return; }
  }
  try {
    await navigator.clipboard.writeText(location.href);
    showToast('Link copied');
  } catch {
    showToast(location.href);
  }
});

// smooth-scroll the hero's pill links account for the sticky player bar
document.querySelectorAll('a.pill-btn[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
