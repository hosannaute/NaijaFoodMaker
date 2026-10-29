import { categories, recipes } from './data.js';
import { photos } from './photos.js';
import { rankRecipes, loadList, loadPlan, getAllergens, allergyLabels, matchesDiet, scaledIngredients, formatAmount, buildShoppingList } from './matching.js';

const $ = selector => document.querySelector(selector);
const allIngredients = new Set(categories.flatMap(c => c.ingredients));
const ids = new Set(recipes.map(r => r.id));
let storage;
try { storage = localStorage; } catch { storage = { getItem() { return null; }, setItem() { throw Error(); } }; }
// Migrate the original combined seasoning selection to the new explicit salt item.
const pantry = loadList(storage, 'naija-pantry', new Set([...allIngredients, 'Salt & Seasoning']));
if (pantry.delete('Salt & Seasoning')) pantry.add('Salt');
const saved = loadList(storage, 'naija-saved', ids);
const plan = loadPlan(storage, recipes);
const portions = { ...plan };
const exclusions = loadList(storage, 'naija-allergies', new Set(Object.keys(allergyLabels)));
const bought = loadList(storage, 'naija-bought', new Set(buildShoppingList(recipes, plan, pantry).map(i => i.key)));
let category = '1', filter = 'all', toastTimer, openedRecipe;
let diet = 'all';
try { const value = storage.getItem('naija-diet'); if (['all', 'vegetarian', 'vegan'].includes(value)) diet = value; } catch { /* Visit-only preferences. */ }
const categoryNames = ['Proteins', 'Grains & tubers', 'Vegetables', 'Soups & sauces', 'Spices & extras'];
const categoryIcons = ['◒', '⌁', '❧', '◡', '✧'];
const esc = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const arrow = '<svg class="icon icon-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg>';
const image = r => photos[r.id]?.src || `./assets/${r.art}.svg`;
const imageAlt = r => photos[r.id]?.alt || `Serving illustration for ${r.name}`;
const servingOptions = (count) => Array.from({ length: 12 }, (_, i) => `<option value="${i + 1}" ${i + 1 === count ? 'selected' : ''}>${i + 1} serving${i ? 's' : ''}</option>`).join('');
const scrollTo = selector => $(selector).scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });

function notify(message) {
  $('#toast').textContent = message;
  $('#toast').classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => $('#toast').classList.remove('visible'), 4000);
}
function persist() {
  try {
    for (const [key, value] of [['pantry', [...pantry]], ['saved', [...saved]], ['plan', plan], ['allergies', [...exclusions]], ['bought', [...bought]]]) {
      storage.setItem(`naija-${key}`, JSON.stringify(value));
    }
    storage.setItem('naija-diet', diet);
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
  $('#pantry-status').textContent = pantry.size ? (ready ? `${ready} recipe${ready === 1 ? '' : 's'} with all ingredients selected. Check amounts.` : 'Good things are coming together…') : 'Your next meal starts with a little pick.';
}
function renderRecipes() {
  const ranked = rankRecipes(recipes, pantry).filter(r => matchesDiet(r, diet, exclusions));
  $('#ready-count').textContent = ranked.filter(r => !r.missing.length).length;
  $('#saved-count').textContent = saved.size;
  $('#results-description').textContent = pantry.size ? 'Every listed ingredient counts. Check quantities before you cook.' : 'Old favourites. Measured ingredients. A taste of home.';
  document.querySelectorAll('[data-filter]').forEach(button => {
    button.classList.toggle('active', button.dataset.filter === filter);
    button.setAttribute('aria-pressed', button.dataset.filter === filter);
  });
  const query = $('#recipe-search').value.toLowerCase().trim();
  const results = ranked.filter(r => (filter === 'all' || filter === 'ready' && !r.missing.length || filter === 'almost' && r.missing.length === 1 || filter === 'saved' && saved.has(r.id)) && r.name.toLowerCase().includes(query));
  $('#result-count').textContent = `${results.length} dishes shown. ${ranked.filter(r => !r.missing.length).length} have all ingredients selected.`;
  $('#recipe-grid').innerHTML = results.length ? results.map(r => `<article class="recipe-card"><div class="card-image art-${r.art} ${photos[r.id] ? 'has-photo' : ''}"><button class="art-open" data-open="${r.id}" tabindex="-1" aria-hidden="true"><img src="${esc(image(r))}" alt="" loading="lazy" width="400" height="280"></button><span class="card-tag">${esc(r.label)}</span><button class="save-button ${saved.has(r.id) ? 'is-saved' : ''}" data-save="${r.id}" aria-label="${saved.has(r.id) ? 'Unsave' : 'Save'} ${esc(r.name)}" aria-pressed="${saved.has(r.id)}">${saved.has(r.id) ? '♥' : '♡'}</button></div><div class="card-body"><div class="card-meta">${r.prepMinutes + r.cookMinutes} MIN · ${r.servings} SERVINGS <span aria-hidden="true">✦</span></div><h3><button data-open="${r.id}">${esc(r.name)}</button></h3><p>${esc(r.description)}</p><div class="recipe-flags"><span>${r.diet === 'vegan' ? 'Plant-based' : 'Meat or seafood'}</span>${getAllergens(r).length ? `<span>Check: ${getAllergens(r).map(a => allergyLabels[a]).join(', ')}</span>` : ''}</div><div class="card-bottom"><span class="match-label ${!r.missing.length ? 'ready' : ''}">${!r.missing.length ? '✓ All ingredients selected' : pantry.size ? `${r.available}/${r.required.length} ingredients` : `${r.required.length} ingredients`}</span><button class="open-arrow" data-open="${r.id}" aria-label="Explore ${esc(r.name)}">${arrow}</button></div>${pantry.size ? `<div class="match-track" aria-hidden="true"><span style="width:${r.match}%"></span></div>` : ''}<button class="plan-recipe" data-plan="${r.id}" aria-pressed="${Object.hasOwn(plan, r.id)}">${Object.hasOwn(plan, r.id) ? '✓ In meal plan' : '＋ Plan this meal'}</button></div></article>`).join('') : `<div class="empty-results"><span aria-hidden="true">✧</span><h3>${filter === 'saved' ? 'A home for your favourites.' : 'A little change, a new possibility.'}</h3><p>Try another search, adjust dietary filters, or add ingredients to your pantry.</p><button id="show-all" class="button green">Reset recipe filters</button></div>`;
}
function shoppingText(remainingOnly = false) {
  const items = buildShoppingList(recipes, plan, pantry).filter(i => !remainingOnly || !bought.has(i.key));
  return `Naija Food Maker — shopping list\n${Object.entries(plan).map(([id, count]) => `${recipes.find(r => r.id === id).name}: ${count} servings`).join('\n')}\n\n${items.map(i => `${bought.has(i.key) ? '✓' : '□'} ${i.name}: ${formatAmount(i.quantity, i.unit)}`).join('\n')}\n\nPantry selections are excluded. Check you have enough of those ingredients.`;
}
function renderShopping() {
  const items = buildShoppingList(recipes, plan, pantry);
  const keys = new Set(items.map(i => i.key));
  for (const key of bought) if (!keys.has(key)) bought.delete(key);
  $('#shopping-count').textContent = Object.keys(plan).length;
  $('#planned-meals').innerHTML = Object.keys(plan).length ? recipes.filter(r => Object.hasOwn(plan, r.id)).map(r => `<div class="planned-meal"><div><button data-meal-open="${r.id}" class="meal-name">${esc(r.name)}</button><label class="sr-only" for="plan-servings-${r.id}">Servings for ${esc(r.name)}</label><select id="plan-servings-${r.id}" data-plan-servings="${r.id}">${servingOptions(plan[r.id])}</select></div><button class="remove-meal" data-plan-remove="${r.id}" aria-label="Remove ${esc(r.name)} from meal plan">×</button></div>`).join('') : '<p class="shopping-empty">A market trip starts with a meal. Tap “Plan this meal” on a dish to begin.</p>';
  $('#shopping-progress').textContent = items.length ? `${items.filter(i => bought.has(i.key)).length} of ${items.length} picked up` : '';
  $('#shopping-items').innerHTML = items.length ? items.map(i => `<label class="shopping-item ${bought.has(i.key) ? 'purchased' : ''}"><input type="checkbox" data-shopping="${esc(i.key)}" ${bought.has(i.key) ? 'checked' : ''}><span><strong>${esc(i.name)}</strong><small>${esc(i.dishes.join(' · '))}</small></span><b>${formatAmount(i.quantity, i.unit)}</b></label>`).join('') : `<p class="shopping-empty">${Object.keys(plan).length ? 'All your planned ingredients are selected in the pantry. Check you have the amounts each recipe needs.' : 'Your combined missing-ingredient list will appear here.'}</p>`;
  $('#copy-shopping').disabled = !items.some(i => !bought.has(i.key));
  $('#download-shopping').disabled = !items.length;
}
function refresh() {
  renderCategories(); renderIngredients(); renderPantry(); renderRecipes(); renderShopping(); persist();
}
function toggleSave(id) {
  saved.has(id) ? saved.delete(id) : saved.add(id);
  persist(); renderRecipes(); notify(saved.has(id) ? 'A little favourite, saved.' : 'Dish removed from saved.');
}
function togglePlan(id) {
  if (Object.hasOwn(plan, id)) delete plan[id];
  else plan[id] = portions[id] || recipes.find(r => r.id === id).servings;
  refresh();
  notify(Object.hasOwn(plan, id) ? 'Meal planned. Your shopping list is ready below.' : 'Meal removed from your plan.');
}
async function copyText(text, fallback) {
  try { await navigator.clipboard.writeText(text); notify('Shopping list copied. Market trip, sorted.'); }
  catch { const field = $(fallback); field.hidden = false; field.value = text; field.focus(); field.select(); notify('Select and copy your shopping list below.'); }
}
function openRecipe(id) {
  openedRecipe = id;
  const r = rankRecipes(recipes, pantry).find(r => r.id === id);
  const servings = portions[id] || plan[id] || r.servings;
  const ingredients = scaledIngredients(r, servings);
  const allergens = getAllergens(r);
  const photo = photos[id];
  $('#dialog-content').innerHTML = `<div class="dialog-art art-${r.art} ${photo ? 'has-photo' : ''}"><img src="${esc(image(r))}" alt="${esc(imageAlt(r))}" width="400" height="300"><button id="close-dialog" class="dialog-close" aria-label="Close recipe">×</button><span class="card-tag">${esc(r.label)}</span></div><div class="dialog-body"><div class="eyebrow dark">A LITTLE TASTE OF HOME</div><h2 id="dialog-title">${esc(r.name)}</h2><p>${esc(r.description)}</p>${photo ? `<p class="photo-attribution">Photo: ${esc(photo.author)} · <a href="${esc(photo.source)}" target="_blank" rel="noopener noreferrer">${esc(photo.license)}</a> · Cropped for display.</p>` : '<p class="photo-attribution">Serving illustration.</p>'}<div class="recipe-summary"><span>Prep ${r.prepMinutes} min</span><span>Cook ${r.cookMinutes} min</span><label>Make <select id="recipe-servings">${servingOptions(servings)}</select></label></div><p class="method-note">Times are estimates for the original ${r.servings} servings. Larger batches and ingredient preparation may take longer.</p><div class="allergen-notice">${r.diet === 'vegan' ? 'Plant-based ingredients.' : 'Includes meat or seafood.'} ${allergens.length ? `Check for ${allergens.map(a => allergyLabels[a].toLowerCase()).join(', ')}.` : 'No ingredients from the five listed exclusion groups are identified.'} Product labels and cross-contact still matter; serving suggestions can change these details.</div><div class="detail-status">${!r.missing.length ? '✓ All listed ingredients selected. Check you have the quantities below.' : `${r.available} of ${r.required.length} ingredients selected, including cooking staples.`}</div><h3>What you’ll need</h3><ul class="detail-ingredients">${ingredients.map(item => `<li><button class="detail-ingredient" data-detail="${esc(item.name)}" aria-pressed="${pantry.has(item.name)}"><span aria-hidden="true">${pantry.has(item.name) ? '✓' : '+'}</span><span>${esc(item.name)}${item.preparation ? `<small class="ingredient-preparation">${esc(item.preparation)}</small>` : ''}</span><span class="ingredient-amount">${formatAmount(item.quantity, item.unit)}<small>${pantry.has(item.name) ? 'In pantry' : 'Add to pantry'}</small></span></button></li>`).join('')}</ul><h3>Let’s cook</h3><ol class="cooking-steps">${r.steps.map((step, i) => `<li><label><input type="checkbox" aria-label="Mark step ${i + 1} complete"><span>${esc(step)}</span></label></li>`).join('')}</ol><p class="method-note">${esc(r.notes || 'A home-style adaptation. Taste and adjust seasoning to your preference.')} Ingredient quantities scale with servings; cooking times and equipment need judgement.</p><div class="serve-with"><span>ON THE SIDE</span><p>${esc(r.serve_with)}</p></div><div class="dialog-actions"><button id="dialog-plan" class="button green" aria-pressed="${Object.hasOwn(plan, id)}">${Object.hasOwn(plan, id) ? '✓ Remove from meal plan' : '＋ Add to meal plan'}</button><button id="dialog-save" class="button outline" aria-pressed="${saved.has(id)}">${saved.has(id) ? '♥ Saved' : '♡ Save dish'}</button><button id="copy-list" class="button outline" ${!r.missing.length ? 'disabled' : ''}>Copy missing ingredients</button></div><textarea id="copy-fallback" readonly hidden aria-label="Shopping list"></textarea></div>`;
  $('#close-dialog').onclick = () => $('#recipe-dialog').close();
  $('#dialog-save').onclick = () => { toggleSave(id); openRecipe(id); $('#dialog-save').focus(); };
  $('#dialog-plan').onclick = () => { togglePlan(id); openRecipe(id); $('#dialog-plan').focus(); };
  $('#recipe-servings').onchange = e => {
    portions[id] = Number(e.target.value);
    if (Object.hasOwn(plan, id)) { plan[id] = portions[id]; renderShopping(); persist(); }
    openRecipe(id); $('#recipe-servings').focus();
  };
  $('#dialog-content').querySelectorAll('[data-detail]').forEach(button => button.onclick = () => {
    const item = button.dataset.detail;
    pantry.has(item) ? pantry.delete(item) : pantry.add(item);
    refresh(); openRecipe(id);
    [...$('#dialog-content').querySelectorAll('[data-detail]')].find(b => b.dataset.detail === item)?.focus();
  });
  $('#copy-list').onclick = () => copyText(`${r.name} — ${servings} servings\n${ingredients.filter(i => !pantry.has(i.name)).map(i => `□ ${i.name}: ${formatAmount(i.quantity, i.unit)}`).join('\n')}`, '#copy-fallback');
  if (!$('#recipe-dialog').open) $('#recipe-dialog').showModal();
}
function showCredits() {
  const entries = Object.entries(photos);
  $('#info-content').innerHTML = `<button class="info-close" aria-label="Close credits">×</button><h2 id="info-title">From our kitchen, with credit.</h2><p>Recipes are original home-style adaptations, not kitchen-tested formulas. Estimated times and water amounts vary with ingredients and equipment. The Python CLI keeps its original simplified catalogue; these measured recipes belong to the web app.</p><h3>Food photography</h3>${entries.length ? entries.map(([id, p]) => `<article class="credit-entry"><h4>${esc(recipes.find(r => r.id === id).name)}</h4><p>${esc(p.author)} · <a href="${esc(p.source)}" target="_blank" rel="noopener noreferrer">Source image</a> · <a href="${esc(p.licenseUrl || p.source)}" target="_blank" rel="noopener noreferrer">${esc(p.license)}</a></p><p>${esc(p.changes || 'Displayed cropped to fit.')}</p></article>`).join('') : '<p>The current serving illustrations were created for this project. No external photograph has been downloaded or attributed yet.</p>'}<h3>Recipe context</h3><p>These recipes represent particular household versions, not every regional preparation. Visit <a href="https://en.wikipedia.org/wiki/Nigerian_cuisine" target="_blank" rel="noopener noreferrer">Nigerian cuisine on Wikipedia</a> for cultural context. Quantities, steps, and notes were written for this app.</p>`;
  $('#info-content .info-close').onclick = () => $('#info-dialog').close();
  $('#info-dialog').showModal();
}

$('#categories').addEventListener('click', e => {
  const button = e.target.closest('[data-category]'); if (!button) return;
  category = button.dataset.category; $('#ingredient-search').value = '';
  renderCategories(); renderIngredients(); $(`#category-${category}`).focus();
});
$('#categories').addEventListener('keydown', e => {
  if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
  e.preventDefault(); const focused = e.target.closest('[data-category]')?.dataset.category || category;
  const index = categories.findIndex(c => c.id === focused);
  category = categories[e.key === 'Home' ? 0 : e.key === 'End' ? categories.length - 1 : (index + (e.key === 'ArrowRight' ? 1 : categories.length - 1)) % categories.length].id;
  $('#ingredient-search').value = ''; renderCategories(); renderIngredients(); $(`#category-${category}`).focus();
});
$('#ingredient-search').oninput = renderIngredients;
$('#ingredient-list').onclick = e => {
  const button = e.target.closest('[data-ingredient]'); if (!button) return;
  const item = button.dataset.ingredient; pantry.has(item) ? pantry.delete(item) : pantry.add(item);
  refresh(); [...$('#ingredient-list').querySelectorAll('button')].find(b => b.dataset.ingredient === item)?.focus();
};
$('#select-category').onclick = () => {
  const items = categories.find(c => c.id === category).ingredients;
  const clear = items.every(i => pantry.has(i)); items.forEach(i => clear ? pantry.delete(i) : pantry.add(i)); refresh();
};
$('#selected-ingredients').onclick = e => {
  const button = e.target.closest('[data-remove]'); if (!button) return;
  const next = button.nextElementSibling || button.previousElementSibling;
  const nextName = next?.dataset.remove;
  pantry.delete(button.dataset.remove); refresh();
  ([...$('#selected-ingredients').querySelectorAll('button')].find(b => b.dataset.remove === nextName) || $('#ingredient-search')).focus();
};
$('#clear-pantry').onclick = () => { pantry.clear(); refresh(); $('#ingredient-search').focus(); notify('A fresh start. Your pantry is cleared.'); };
$('#try-jollof').onclick = () => { recipes.find(r => r.name === 'Jollof Rice').required.forEach(i => pantry.add(i)); refresh(); notify('All jollof ingredients added. Check you have the quantities in the recipe.'); };
$('#recipe-filters').onclick = e => { const button = e.target.closest('[data-filter]'); if (button) { filter = button.dataset.filter; renderRecipes(); } };
$('#saved-nav').onclick = () => { filter = 'saved'; $('#recipe-search').value = ''; renderRecipes(); scrollTo('#discover'); };
$('#recipe-search').oninput = renderRecipes;
$('#diet-filter').value = diet;
$('#diet-filter').onchange = e => { diet = e.target.value; persist(); renderRecipes(); };
$('#allergy-filters').querySelectorAll('input').forEach(input => {
  input.checked = exclusions.has(input.value);
  input.onchange = () => { input.checked ? exclusions.add(input.value) : exclusions.delete(input.value); persist(); renderRecipes(); };
});
$('#recipe-grid').onclick = e => {
  const save = e.target.closest('[data-save]'), open = e.target.closest('[data-open]'), meal = e.target.closest('[data-plan]');
  if (save) { toggleSave(save.dataset.save); $(`[data-save="${save.dataset.save}"]`)?.focus(); }
  else if (open) openRecipe(open.dataset.open);
  else if (meal) { togglePlan(meal.dataset.plan); $(`[data-plan="${meal.dataset.plan}"]`)?.focus(); }
  else if (e.target.closest('#show-all')) {
    filter = 'all'; diet = 'all'; exclusions.clear(); $('#diet-filter').value = 'all';
    $('#allergy-filters').querySelectorAll('input').forEach(i => { i.checked = false; });
    $('#recipe-search').value = ''; renderRecipes(); persist(); $('[data-filter="all"]').focus();
  }
};
$('#planned-meals').onclick = e => {
  const remove = e.target.closest('[data-plan-remove]'), open = e.target.closest('[data-meal-open]');
  if (remove) { togglePlan(remove.dataset.planRemove); ($('#planned-meals button') || $('#shopping-title')).focus(); }
  else if (open) openRecipe(open.dataset.mealOpen);
};
$('#planned-meals').onchange = e => {
  const id = e.target.dataset.planServings; if (!id) return;
  plan[id] = Number(e.target.value); portions[id] = plan[id]; renderShopping(); persist(); $(`#plan-servings-${id}`).focus();
};
$('#shopping-items').onchange = e => {
  const key = e.target.dataset.shopping; if (!key) return;
  e.target.checked ? bought.add(key) : bought.delete(key);
  renderShopping(); persist(); [...$('#shopping-items').querySelectorAll('input')].find(i => i.dataset.shopping === key)?.focus();
};
$('#copy-shopping').onclick = () => copyText(shoppingText(true), '#shopping-fallback');
$('#download-shopping').onclick = () => {
  const url = URL.createObjectURL(new Blob([shoppingText()], { type: 'text/plain;charset=utf-8' }));
  const link = document.createElement('a'); link.href = url; link.download = 'naija-shopping-list.txt'; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};
for (const selector of ['#recipe-dialog', '#info-dialog']) $(selector).addEventListener('click', e => {
  if (e.target !== $(selector)) return;
  const rect = e.target.getBoundingClientRect();
  if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) e.target.close();
});
$('#recipe-dialog').addEventListener('close', () => {
  const target = $(`h3 [data-open="${openedRecipe}"]`) || $('[data-filter="all"]'); target.focus({ preventScroll: true });
});
$('#photo-credits').onclick = showCredits;
$('#shopping-title').tabIndex = -1;
document.addEventListener('keydown', e => {
  if (e.key === '/' && !e.ctrlKey && !e.metaKey && !e.altKey && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName) && !document.activeElement.isContentEditable && !document.querySelector('dialog[open]')) {
    e.preventDefault(); $('#ingredient-search').focus();
  }
});
renderCategories(); renderIngredients(); renderPantry(); renderRecipes(); renderShopping();

if (photos['3']) {
  const hero = $('.hero-art');
  hero.classList.add('has-photo');
  hero.querySelector('img').src = photos['3'].src;
  hero.querySelector('img').alt = photos['3'].alt;
}
