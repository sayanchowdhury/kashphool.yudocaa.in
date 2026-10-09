import { MAHALAYA_ISO } from '../data/festival.js';
import { setState, showToast } from './store.js';

const KEY = 'kashful.reminded';
let timer = null;

function nextMahalaya() {
  const t = new Date(MAHALAYA_ISO).getTime();
  return t > Date.now() ? t : null; // only ever one date in this build
}

function schedule() {
  clearTimeout(timer);
  const t = nextMahalaya();
  if (!t) return;
  const ms = t - Date.now();
  if (ms > 0 && ms < 2 ** 31) {
    timer = setTimeout(() => {
      try {
        new Notification('Mahishasuramardini is on air', {
          body: 'Akashvani FM Rainbow Kolkata · 4:00 AM IST',
        });
      } catch {}
    }, ms);
  }
}

export function initReminder() {
  const on = localStorage.getItem(KEY) === '1';
  setState({ reminded: on });
  if (on && 'Notification' in window && Notification.permission === 'granted') schedule();
}

export async function toggleReminder() {
  if (!('Notification' in window)) { showToast('Notifications aren’t supported on this browser'); return; }
  const turningOn = localStorage.getItem(KEY) !== '1';
  if (turningOn) {
    let perm = Notification.permission;
    if (perm === 'default') perm = await Notification.requestPermission();
    if (perm !== 'granted') { showToast('Notification permission was not granted'); return; }
    localStorage.setItem(KEY, '1');
    setState({ reminded: true });
    schedule();
    showToast('We’ll remind you — keep this tab open at 4 AM');
  } else {
    localStorage.removeItem(KEY);
    setState({ reminded: false });
    clearTimeout(timer);
    showToast('Reminder turned off');
  }
}
