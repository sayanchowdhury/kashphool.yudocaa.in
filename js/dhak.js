// A small synthesized dhak (Bengali festival drum) pattern using Web Audio —
// no audio asset needed. Loops a simple beat: boom-boom-ta-boom while toggled on.
let ctx = null;
let timer = null;
let running = false;

function beat(time, kind) {
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.connect(g); g.connect(ctx.destination);
  if (kind === 'low') {
    o.type = 'sine'; o.frequency.setValueAtTime(90, time);
    o.frequency.exponentialRampToValueAtTime(45, time + 0.18);
    g.gain.setValueAtTime(0.9, time);
  } else {
    o.type = 'triangle'; o.frequency.setValueAtTime(220, time);
    o.frequency.exponentialRampToValueAtTime(140, time + 0.08);
    g.gain.setValueAtTime(0.5, time);
  }
  g.gain.exponentialRampToValueAtTime(0.001, time + (kind === 'low' ? 0.3 : 0.12));
  o.start(time); o.stop(time + 0.35);

  // a touch of noise for the skin's crack
  const bufferSize = ctx.sampleRate * 0.05;
  const buf = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
  const noise = ctx.createBufferSource(); noise.buffer = buf;
  const ng = ctx.createGain(); ng.gain.value = kind === 'low' ? 0.25 : 0.15;
  noise.connect(ng); ng.connect(ctx.destination);
  noise.start(time);
}

const PATTERN = ['low', 'low', 'high', 'low']; // boom-boom-ta-boom
let step = 0;
const TEMPO = 0.42; // seconds per beat

function scheduleLoop() {
  if (!running) return;
  const t = ctx.currentTime + 0.05;
  beat(t, PATTERN[step % PATTERN.length]);
  step++;
  timer = setTimeout(scheduleLoop, TEMPO * 1000);
}

export function startDhak() {
  if (running) return;
  ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
  if (ctx.state === 'suspended') ctx.resume();
  running = true;
  step = 0;
  scheduleLoop();
}

export function stopDhak() {
  running = false;
  clearTimeout(timer);
}

export function isDhakRunning() { return running; }
