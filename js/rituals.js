import { DAYS } from '../data/festival.js';

export function initRituals() {
  const el = document.getElementById('ritualGrid');
  if (!el) return;
  el.innerHTML = DAYS.filter(d => d.id !== 'mahalaya').map(d => `
    <div class="day-card${d.highlight ? ' highlight' : ''}">
      <div class="day-top"><span class="bn">${d.bn}</span><span class="en">${d.en}</span></div>
      <p>${d.ritual}</p>
    </div>
  `).join('') + `
    <div class="day-card highlight">
      <div class="day-top"><span class="bn">${DAYS[0].bn}</span><span class="en">${DAYS[0].en}</span></div>
      <p>${DAYS[0].ritual}</p>
    </div>`;
}
