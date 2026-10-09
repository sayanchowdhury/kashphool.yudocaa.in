import { showToast } from './store.js';

const CARDS = [
  { id: 'mahalaya', bn: 'শুভ মহালয়া', en: 'Shubho Mahalaya', sub: 'The Mother is on her way home.' },
  { id: 'bijoya', bn: 'শুভ বিজয়া', en: 'Shubho Bijoya', sub: 'See you next year, and happy Pujo.' },
];

let active = 'mahalaya';
let canvas, ctx;

async function draw() {
  const card = CARDS.find(c => c.id === active);
  const w = canvas.width, h = canvas.height;

  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, '#241a36');
  grad.addColorStop(1, '#0d0a1c');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // soft radial glow
  const glow = ctx.createRadialGradient(w / 2, h * 0.42, 10, w / 2, h * 0.42, w * 0.6);
  glow.addColorStop(0, 'rgba(242,213,74,.35)');
  glow.addColorStop(1, 'rgba(242,213,74,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, w, h);

  // a simple diya glyph
  ctx.save();
  ctx.translate(w / 2, h * 0.3);
  ctx.fillStyle = '#ffdd8a';
  ctx.beginPath();
  ctx.moveTo(0, -46);
  ctx.quadraticCurveTo(14, -20, 0, -4);
  ctx.quadraticCurveTo(-14, -20, 0, -46);
  ctx.fill();
  ctx.fillStyle = '#8a5a28';
  ctx.beginPath();
  ctx.ellipse(0, 10, 38, 14, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  try {
    await document.fonts.load('80px Galada');
    await document.fonts.load('28px Manrope');
  } catch {}

  ctx.textAlign = 'center';
  ctx.fillStyle = '#f2d54a';
  ctx.font = '96px Galada, cursive';
  ctx.fillText(card.bn, w / 2, h * 0.56);

  ctx.fillStyle = '#f4efe2';
  ctx.font = '600 30px Manrope, sans-serif';
  ctx.fillText(card.en, w / 2, h * 0.63);

  ctx.fillStyle = 'rgba(244,239,226,.7)';
  ctx.font = '400 20px Manrope, sans-serif';
  wrapText(card.sub, w / 2, h * 0.68, w * 0.72, 28);

  ctx.fillStyle = 'rgba(243,207,122,.9)';
  ctx.font = '700 16px Manrope, sans-serif';
  ctx.fillText('KASHFUL · mahalaya.yudocaa.in', w / 2, h * 0.94);
}

function wrapText(text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '', lines = [];
  words.forEach(word => {
    const test = line ? line + ' ' + word : word;
    if (ctx.measureText(test).width > maxWidth && line) { lines.push(line); line = word; }
    else line = test;
  });
  lines.push(line);
  lines.forEach((l, i) => ctx.fillText(l, x, y + i * lineHeight));
}

function renderPicker() {
  const el = document.getElementById('greetPicker');
  el.innerHTML = CARDS.map(c => `<button class="pill-btn" data-id="${c.id}" aria-pressed="${c.id === active}" type="button">${c.en}</button>`).join('');
  el.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => { active = btn.dataset.id; renderPicker(); draw(); });
  });
}

function toBlob() {
  return new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
}

export function initGreetingCard() {
  canvas = document.getElementById('greetCanvas');
  ctx = canvas.getContext('2d');
  renderPicker();
  draw();

  document.getElementById('greetDownload').addEventListener('click', async () => {
    const blob = await toBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `kashful-${active}.png`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  });

  document.getElementById('greetShare').addEventListener('click', async () => {
    const blob = await toBlob();
    const file = new File([blob], `kashful-${active}.png`, { type: 'image/png' });
    const card = CARDS.find(c => c.id === active);
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try { await navigator.share({ files: [file], title: card.en, text: card.en }); return; }
      catch { /* user cancelled or share failed, fall through to download */ }
    }
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `kashful-${active}.png`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
    showToast('Sharing isn’t supported here — downloaded the image instead');
  });
}
