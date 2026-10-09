import { STATIONS, stationById, DEFAULT_STATION_ID } from '../data/stations.js';
import { state, setState } from './store.js';

let hlsInstance = null;
let ytPlayer = null;
let ytReady = null; // promise
let queue = [];
let queueIndex = -1;

const audio = new Audio();
audio.preload = 'none';
audio.crossOrigin = 'anonymous';

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = src;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

async function ensureHls() {
  if (window.Hls) return window.Hls;
  await loadScript('https://cdnjs.cloudflare.com/ajax/libs/hls.js/1.5.17/hls.min.js');
  return window.Hls;
}

function ensureYt() {
  if (ytReady) return ytReady;
  ytReady = new Promise(resolve => {
    if (window.YT && window.YT.Player) return resolve(window.YT);
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => { prev && prev(); resolve(window.YT); };
    loadScript('https://www.youtube.com/iframe_api');
  });
  return ytReady;
}

async function getYtPlayer() {
  if (ytPlayer) return ytPlayer;
  const YT = await ensureYt();
  return new Promise(resolve => {
    ytPlayer = new YT.Player('yt-hidden', {
      height: '1', width: '1',
      playerVars: { playsinline: 1, controls: 0, disablekb: 1 },
      events: {
        onReady: () => resolve(ytPlayer),
        onStateChange: ev => {
          if (ev.data === YT.PlayerState.PLAYING) setState({ playing: true });
          else if (ev.data === YT.PlayerState.PAUSED) setState({ playing: false });
          else if (ev.data === YT.PlayerState.ENDED) next();
        },
      },
    });
  });
}

async function playStationAudio(station) {
  stopYt();
  if (audio.src !== station.url) {
    audio.src = station.url;
    const native = audio.canPlayType('application/vnd.apple.mpegurl');
    if (!native) {
      const Hls = await ensureHls();
      if (Hls.isSupported()) {
        if (hlsInstance) hlsInstance.destroy();
        hlsInstance = new Hls();
        hlsInstance.loadSource(station.url);
        hlsInstance.attachMedia(audio);
      }
    }
  }
  audio.volume = state.muted ? 0 : state.volume;
  try { await audio.play(); setState({ playing: true }); }
  catch { setState({ playing: false }); }
}

function stopAudio() {
  audio.pause();
}

function stopYt() {
  if (ytPlayer && ytPlayer.pauseVideo) { try { ytPlayer.pauseVideo(); } catch {} }
}

export async function playStation(id = DEFAULT_STATION_ID) {
  const station = stationById(id);
  setState({ mode: 'station', stationId: station.id, track: null });
  await playStationAudio(station);
  updateMediaSession();
}

export async function playTrack(track, list = queue) {
  stopAudio();
  queue = list;
  queueIndex = list.findIndex(t => t.id === track.id);
  setState({ mode: 'track', track, stationId: null });
  const player = await getYtPlayer();
  player.loadVideoById(track.yt);
  player.setVolume(state.muted ? 0 : Math.round(state.volume * 100));
  updateMediaSession();
}

export async function togglePlay() {
  if (state.mode === 'track') {
    if (!ytPlayer) return;
    if (state.playing) ytPlayer.pauseVideo(); else ytPlayer.playVideo();
  } else {
    if (state.playing) { stopAudio(); setState({ playing: false }); }
    else await playStation(state.stationId || DEFAULT_STATION_ID);
  }
}

export async function next() {
  if (state.mode === 'track' && queue.length) {
    queueIndex = (queueIndex + 1) % queue.length;
    await playTrack(queue[queueIndex], queue);
  } else {
    const idx = STATIONS.findIndex(s => s.id === (state.stationId || DEFAULT_STATION_ID));
    await playStation(STATIONS[(idx + 1) % STATIONS.length].id);
  }
}

export async function prev() {
  if (state.mode === 'track' && queue.length) {
    queueIndex = (queueIndex - 1 + queue.length) % queue.length;
    await playTrack(queue[queueIndex], queue);
  } else {
    const idx = STATIONS.findIndex(s => s.id === (state.stationId || DEFAULT_STATION_ID));
    await playStation(STATIONS[(idx - 1 + STATIONS.length) % STATIONS.length].id);
  }
}

export function setVolume(v) {
  const vol = Math.min(1, Math.max(0, v));
  setState({ volume: vol, muted: false });
  audio.volume = vol;
  if (ytPlayer && ytPlayer.setVolume) ytPlayer.setVolume(Math.round(vol * 100));
}

export function toggleMute() {
  const muted = !state.muted;
  setState({ muted });
  audio.volume = muted ? 0 : state.volume;
  if (ytPlayer && ytPlayer.setVolume) ytPlayer.setVolume(muted ? 0 : Math.round(state.volume * 100));
}

function updateMediaSession() {
  if (!('mediaSession' in navigator)) return;
  const title = state.mode === 'track' && state.track ? state.track.title : 'Akashvani FM Rainbow — Live';
  const artist = state.mode === 'track' && state.track ? state.track.artist : 'All India Radio, Kolkata';
  try {
    navigator.mediaSession.metadata = new MediaMetadata({ title, artist, album: 'Kashful' });
  } catch {}
}

export function currentStation() {
  return stationById(state.stationId || DEFAULT_STATION_ID);
}
