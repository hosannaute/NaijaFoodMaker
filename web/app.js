import { categories, recipes } from './data.js';
import { rankRecipes, loadList } from './matching.js';

const $ = selector => document.querySelector(selector);
const allIngredients = new Set(categories.flatMap(c => c.ingredients));
let storage;
try { storage = localStorage; } catch { storage = { getItem() { return null; }, setItem() { throw Error(); } }; }
const pantry = loadList(storage, 'naija-pantry', allIngredients);
const saved = loadList(storage, 'naija-saved', new Set(recipes.map(r => r.id)));
let category = '1', filter = 'all', toastTimer, openedRecipe;
const categoryNames = ['Proteins', 'Grains & tubers', 'Vegetables', 'Soups & sauces', 'Spices & extras'];
const categoryIcons = ['◒', '⌁', '❧', '◡', '✧'];
const details = [
  ['soup', 'Soup & swallow', 'Toast ground egusi gently in palm oil, then add stock gradually and simmer, stirring to break up lumps. Add crayfish, cooked meat or fish if using, and leafy greens. Simmer until the melon is cooked through and season to taste.'],
  ['soup', 'Soup & swallow', 'Stir ground ogbono into warm palm oil. Add warm stock gradually, stirring until smooth and thick. Add crayfish and any cooked proteins, then simmer gently and season to taste.'],
  ['jollof', 'A party favourite', 'Blend tomatoes and peppers with some onion. Fry the remaining onion and tomato paste in a little oil, add the blended sauce, and cook it down. Stir in rinsed rice and seasoned stock. Cover tightly and steam over low heat until the rice is tender, adding a little water if needed.'],
  ['soup', 'Comfort in a bowl', 'Simmer your chosen protein in water with chopped onion and seasoning until fully cooked. Add pepper, crayfish, and crushed pepper-soup spices. Simmer until fragrant, adjust seasoning, and finish with scent leaf if available.'],
  ['plantain', 'A golden little extra', 'Peel ripe plantains and slice diagonally. Pat dry and season lightly if desired. Fry in hot groundnut oil in batches, turning until golden on both sides. Drain well before serving.'],
  ['soup', 'A steamed favourite', 'Blend peeled beans or prepared bean batter with pepper and onion until smooth. Stir in oil, seasoning, and optional cooked fish or shrimp. Spoon into heat-safe moulds and steam, covered, until firm and cooked through; top up the steaming water as needed.'],
  ['soup', 'A Yoruba favourite', 'Blanch and drain the spinach. Cook blended tomatoes and peppers in palm oil until reduced, adding onion and iru if available. Add cooked proteins and seasoning, then fold in the greens and simmer briefly.'],
  ['soup', 'An Igbo classic', 'Wash bitter leaves thoroughly to reduce bitterness. Simmer cooked meats and fish in stock, add palm oil and crayfish, and use cooked, mashed cocoyam to thicken if available. Add the leaves and simmer until tender.'],
  ['suya', 'Straight from the grill', 'Cut beef into thin strips and coat with yaji and a little oil. Thread onto skewers and grill, turning regularly, until fully cooked. Rest briefly and serve with fresh onion and tomato. Yaji commonly contains ground peanuts.'],
  ['coconut', 'The perfect companion', 'Bring water to a boil, then reduce the heat. Gradually stir in garri, mixing vigorously to avoid lumps, until the mixture is smooth and firm. Adjust with hot water or garri to your preferred consistency and serve warm.'],
  ['soup', 'Soup & swallow', 'Finely chop or grate the okra. Simmer stock with crayfish, palm oil, and any cooked proteins. Add okra and stir gently. Cook briefly until tender while keeping its characteristic draw, then season to taste.'],
  ['jollof', 'One-pot comfort', 'Peel and cut yam into chunks. Simmer with tomatoes, palm oil, water or stock, and seasoning. Add optional crayfish or cooked fish. When tender, mash a few pieces into the liquid to make a thick, comforting porridge.'],
  ['plantain', 'A Lagos favourite', 'Simmer rinsed beans in water until very soft. Separately, slowly fry blended pepper and onion in palm oil until reduced and fragrant, taking care not to burn it. Season the sauce and spoon over the beans; serve with plantain if available.'],
  ['coconut', 'Coastal comfort', 'Rinse rice and place in a pot with coconut milk and enough water or stock for the rice. Add seasoning and optional onion. Cover and cook gently until tender. Serve with fully cooked chicken, shrimp, or fish if using.'],
  ['soup', 'From the South-South', 'Prepare waterleaf and finely sliced afang leaves. Simmer cooked meats and fish in stock with palm oil and crayfish. Add waterleaf, then afang, and cook until tender. Afang leaves are traditional but are not in this pantry catalogue.'],
  ['coconut', 'A celebration staple', 'Cook rice in seasoned stock until just tender. Heat oil and stir-fry onion with available chopped vegetables and curry. Add rice in batches and toss until hot throughout. Add fully cooked chicken or shrimp if using.'],
];
const esc = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
function notify(message) {
  $('#toast').textContent = message;
  $('#toast').classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => $('#toast').classList.remove('visible'), 3200);
}
function persist() {
  try {
    storage.setItem('naija-pantry', JSON.stringify([...pantry]));
    storage.setItem('naija-saved', JSON.stringify([...saved]));
  } catch { notify('Storage is unavailable. Your changes will last for this visit.'); }
}
function renderCategories() {
  $('#categories').innerHTML = categories.map((c, i) => `<button role="tab" id="category-${c.id}" aria-controls="ingredient-panel" aria-selected="${c.id === category}" tabindex="${c.id === category ? 0 : -1}" data-category="${c.id}" class="category-tab ${c.id === category ? 'active' : ''}"><span aria-hidden="true">${categoryIcons[i]}</span>${categoryNames[i]}${c.ingredients.some(x => pantry.has(x)) ? `<small>${c.ingredients.filter(x => pantry.has(x)).length}</small>` : ''}</button>`).join('');
  $('#ingredient-panel').setAttribute('aria-labelledby', `category-${category}`);
}
function renderIngredients() {
  const query = $('#ingredient-search').value.trim().toLowerCase();
  const items = query ? [...allIngredients].filter(i => i.toLowerCase().includes(query)) : categories.find(c => c.id === category).ingredients;
  $('#ingredient-list').innerHTML = items.length ? items.map(item => `<button class="ingredient ${pantry.has(item) ? 'chosen' : ''}" data-ingredient="${esc(item)}" aria-pressed="${pantry.has(item)}"><span class="check" aria-hidden="true">${pantry.has(item) ? '✓' : '+'}</span><span>${esc(item)}</span></button>`).join('') : '<p class="empty-inline">No ingredients found. Try “pepper” or “rice”.</p>';
  $('#select-category').hidden = !!query;
  const current = categories.find(c => c.id === category);
  $('#select-category').textContent = current.ingredients.every(i => pantry.has(i)) ? 'Clear category' : 'Select category';
}
function renderPantry() {
  $('#pantry-count').textContent = pantry.size;
  $('#clear-pantry').disabled = !pantry.size;
  $('#selected-ingredients').innerHTML = pantry.size ? [...pantry].map(item => `<button class="pantry-chip" data-remove="${esc(item)}" aria-label="Remove ${esc(item)}">${esc(item)} <span aria-hidden="true">×</span></button>`).join('') : '<div class="empty-pantry"><span aria-hidden="true">♧</span><p>A little of this,<br>a little of that.</p><small>Your ingredients will feel right at home here.</small></div>';
  const ready = rankRecipes(recipes, pantry).filter(r => !r.missing.length).length;
  $('#pantry-status').textContent = pantry.size ? (ready ? `${ready} delicious possibilit${ready === 1 ? 'y' : 'ies'} ready to cook` : 'Good things are coming together…') : 'Your next meal starts with a little pick.';
}
function renderRecipes() {
  const ranked = rankRecipes(recipes, pantry);
  $('#ready-count').textContent = ranked.filter(r => !r.missing.length).length;
  $('#saved-count').textContent = saved.size;
  $('#results-description').textContent = pantry.size ? 'Made for your pantry. Add a little more, unlock a little more.' : 'Old favourites. New possibilities. Always a taste of home.';
  document.querySelectorAll('[data-filter]').forEach(button => { button.classList.toggle('active', button.dataset.filter === filter); button.setAttribute('aria-pressed', button.dataset.filter === filter); });
  const query = $('#recipe-search').value.toLowerCase().trim();
  const results = ranked.filter(r => (filter === 'all' || filter === 'ready' && !r.missing.length || filter === 'almost' && r.missing.length === 1 || filter === 'saved' && saved.has(r.id)) && r.name.toLowerCase().includes(query));
  $('#result-count').textContent = `${results.length} dishes shown. ${ranked.filter(r => !r.missing.length).length} ready to cook.`;
  $('#recipe-grid').innerHTML = results.length ? results.map(r => {
    const [art, label] = details[Number(r.id) - 1];
    return `<article class="recipe-card"><div class="card-image art-${art}"><button class="art-open" data-open="${r.id}" tabindex="-1" aria-hidden="true"><img src="./assets/${art}.svg" alt="" loading="lazy" width="400" height="280"></button><span class="card-tag">${label}</span><button class="save-button ${saved.has(r.id) ? 'is-saved' : ''}" data-save="${r.id}" aria-label="${saved.has(r.id) ? 'Unsave' : 'Save'} ${esc(r.name)}" aria-pressed="${saved.has(r.id)}">${saved.has(r.id) ? '♥' : '♡'}</button></div><div class="card-body"><div class="card-meta">NIGERIAN FAVOURITES <span aria-hidden="true">✦</span></div><h3><button data-open="${r.id}">${esc(r.name)}</button></h3><p>${esc(r.description)}</p><div class="card-bottom"><span class="match-label ${!r.missing.length ? 'ready' : ''}">${!r.missing.length ? '✓ Ready in your pantry' : pantry.size ? `${r.available}/${r.required.length} key ingredients` : `${r.required.length} key ingredient${r.required.length > 1 ? 's' : ''}`}</span><button class="open-arrow" data-open="${r.id}" aria-label="Explore ${esc(r.name)}"><svg class="icon icon-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg></button></div>${pantry.size ? `<div class="match-track" aria-hidden="true"><span style="width:${r.match}%"></span></div>` : ''}</div></article>`;
  }).join('') : `<div class="empty-results"><span aria-hidden="true">✧</span><h3>${filter === 'saved' ? 'A home for your favourites.' : filter === 'ready' ? 'Your next meal is a few picks away.' : 'A little change, a new possibility.'}</h3><p>${filter === 'saved' ? 'Tap the heart on any dish to save it here.' : 'Try another filter or add ingredients to your pantry.'}</p><button id="show-all" class="button green">Explore all dishes</button></div>`;
}
function refresh() { persist(); renderCategories(); renderIngredients(); renderPantry(); renderRecipes(); }
function toggleSave(id) { saved.has(id) ? saved.delete(id) : saved.add(id); persist(); renderRecipes(); notify(saved.has(id) ? 'A little favourite, saved.' : 'Dish removed from saved.'); }
function openRecipe(id) {
  openedRecipe = id;
  const r = rankRecipes(recipes, pantry).find(r => r.id === id);
  const [art, label, method] = details[Number(id) - 1];
  $('#dialog-content').innerHTML = `<div class="dialog-art art-${art}"><img src="./assets/${art}.svg" alt="Illustrated serving inspiration" width="400" height="300"><button id="close-dialog" class="dialog-close" aria-label="Close recipe">×</button><span class="card-tag">${label}</span></div><div class="dialog-body"><div class="eyebrow dark">A LITTLE TASTE OF HOME</div><h2 id="dialog-title">${esc(r.name)}</h2><p>${esc(r.description)}</p><div class="detail-status">${!r.missing.length ? '✓ You have all the key ingredients!' : `${r.available} of ${r.required.length} key ingredients in your pantry`}</div><h3>The essentials</h3><ul class="detail-ingredients">${r.required.map(item => `<li><button class="detail-ingredient" data-detail="${esc(item)}" aria-pressed="${pantry.has(item)}"><span aria-hidden="true">${pantry.has(item) ? '✓' : '+'}</span>${esc(item)}<small>${pantry.has(item) ? 'In pantry' : 'Add to pantry'}</small></button></li>`).join('')}</ul>${r.bonus.length ? `<h3>Make it your own</h3><p class="bonus-copy">Optional extras: ${r.bonus.map(x => esc(x) + (pantry.has(x) ? ' ✓' : '')).join(', ')}.</p>` : ''}<h3>A little cooking inspiration</h3><p>${esc(method)}</p><p class="method-note">A flexible cooking overview, not a measured recipe. Water, seasoning, oil, and other method ingredients may be needed beyond the matching essentials.</p><div class="serve-with"><span>ON THE SIDE</span><p>${esc(r.serve_with)}</p></div><div class="dialog-actions"><button id="copy-list" class="button green" ${!r.missing.length ? 'disabled' : ''}>Copy missing ingredients</button><button id="dialog-save" class="button outline" aria-pressed="${saved.has(id)}">${saved.has(id) ? '♥ Saved' : '♡ Save dish'}</button></div><textarea id="copy-fallback" readonly hidden aria-label="Shopping list"></textarea></div>`;
  $('#close-dialog').onclick = () => $('#recipe-dialog').close();
  $('#dialog-save').onclick = () => { toggleSave(id); openRecipe(id); $('#dialog-save').focus(); };
  $('#dialog-content').querySelectorAll('[data-detail]').forEach(button => button.onclick = () => { const item = button.dataset.detail; pantry.has(item) ? pantry.delete(item) : pantry.add(item); refresh(); openRecipe(id); $('#dialog-content').querySelectorAll('[data-detail]')[r.required.indexOf(item)]?.focus(); });
  $('#copy-list').onclick = async () => {
    const list = `${r.name} — shopping list\n${r.missing.map(i => `□ ${i}`).join('\n')}`;
    try { await navigator.clipboard.writeText(list); notify('Missing ingredients copied. Market trip, sorted.'); }
    catch { const field = $('#copy-fallback'); field.hidden = false; field.value = list; field.focus(); field.select(); notify('Select and copy your shopping list below.'); }
  };
  if (!$('#recipe-dialog').open) $('#recipe-dialog').showModal();
}
$('#categories').addEventListener('click', e => { const button = e.target.closest('[data-category]'); if (!button) return; category = button.dataset.category; $('#ingredient-search').value = ''; renderCategories(); renderIngredients(); $(`#category-${category}`).focus(); });
$('#categories').addEventListener('keydown', e => { if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return; e.preventDefault(); const index = categories.findIndex(c => c.id === category); category = categories[e.key === 'Home' ? 0 : e.key === 'End' ? 4 : (index + (e.key === 'ArrowRight' ? 1 : 4)) % 5].id; $('#ingredient-search').value = ''; renderCategories(); renderIngredients(); $(`#category-${category}`).focus(); });
$('#ingredient-search').oninput = renderIngredients;
$('#ingredient-list').onclick = e => { const button = e.target.closest('[data-ingredient]'); if (!button) return; const item = button.dataset.ingredient; pantry.has(item) ? pantry.delete(item) : pantry.add(item); refresh(); [...$('#ingredient-list').querySelectorAll('button')].find(b => b.dataset.ingredient === item)?.focus(); };
$('#select-category').onclick = () => { const items = categories.find(c => c.id === category).ingredients; const clear = items.every(i => pantry.has(i)); items.forEach(i => clear ? pantry.delete(i) : pantry.add(i)); refresh(); };
$('#selected-ingredients').onclick = e => { const button = e.target.closest('[data-remove]'); if (button) { pantry.delete(button.dataset.remove); refresh(); $('#clear-pantry').focus(); } };
$('#clear-pantry').onclick = () => { pantry.clear(); refresh(); notify('A fresh start. Your pantry is cleared.'); };
$('#try-jollof').onclick = () => { recipes.find(r => r.name === 'Jollof Rice').required.forEach(i => pantry.add(i)); refresh(); notify('Jollof essentials added. Let’s make something good.'); };
$('#recipe-filters').onclick = e => { const button = e.target.closest('[data-filter]'); if (button) { filter = button.dataset.filter; renderRecipes(); } };
$('#saved-nav').onclick = () => { filter = 'saved'; $('#recipe-search').value = ''; renderRecipes(); $('#discover').scrollIntoView({ behavior: 'smooth' }); };
$('#recipe-search').oninput = renderRecipes;
$('#recipe-grid').onclick = e => { const save = e.target.closest('[data-save]'), open = e.target.closest('[data-open]'); if (save) { toggleSave(save.dataset.save); $(`[data-save="${save.dataset.save}"]`)?.focus(); } else if (open) openRecipe(open.dataset.open); else if (e.target.closest('#show-all')) { filter = 'all'; $('#recipe-search').value = ''; renderRecipes(); $('[data-filter="all"]').focus(); } };
$('#recipe-dialog').addEventListener('click', e => { if (e.target === $('#recipe-dialog')) { const rect = e.target.getBoundingClientRect(); if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) e.target.close(); } });
$('#recipe-dialog').addEventListener('close', () => {
  const target = $(`h3 [data-open="${openedRecipe}"]`) || $('[data-filter="all"]');
  target.focus({ preventScroll: true });
});
document.addEventListener('keydown', e => { if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName) && !$('#recipe-dialog').open) { e.preventDefault(); $('#ingredient-search').focus(); } });
renderCategories(); renderIngredients(); renderPantry(); renderRecipes();
