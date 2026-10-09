const KEY = 'kashful.checklist';

function load() {
  try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; }
}
function save(items) {
  try { localStorage.setItem(KEY, JSON.stringify(items)); } catch {}
}

function render(items) {
  const el = document.getElementById('checklistItems');
  if (!items.length) {
    el.innerHTML = '<p class="checklist-empty">Nothing on the list yet — add a pandal, a friend to meet, or a plan.</p>';
    return;
  }
  el.innerHTML = items.map(i => `
    <div class="checklist-item${i.done ? ' is-done' : ''}" data-id="${i.id}">
      <input type="checkbox" ${i.done ? 'checked' : ''} aria-label="Mark ${escapeHtml(i.text)} as done">
      <span>${escapeHtml(i.text)}</span>
      <button type="button" aria-label="Remove ${escapeHtml(i.text)}">&times;</button>
    </div>
  `).join('');

  el.querySelectorAll('.checklist-item').forEach(row => {
    const id = row.dataset.id;
    row.querySelector('input').addEventListener('change', e => {
      const items2 = load().map(i => i.id === id ? { ...i, done: e.target.checked } : i);
      save(items2); render(items2);
    });
    row.querySelector('button').addEventListener('click', () => {
      const items2 = load().filter(i => i.id !== id);
      save(items2); render(items2);
    });
  });
}

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

export function initChecklist() {
  render(load());
  const form = document.getElementById('checklistForm');
  const input = document.getElementById('checklistInput');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    const items = load();
    items.push({ id: 'i' + Date.now().toString(36), text, done: false });
    save(items); render(items);
    input.value = '';
    input.focus();
  });
}
