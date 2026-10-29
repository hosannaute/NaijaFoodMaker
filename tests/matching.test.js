import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { categories, recipes } from '../web/data.js';
import { photos } from '../web/photos.js';
import { rankRecipes, loadList, loadPlan, getAllergens, matchesDiet, scaledIngredients, buildShoppingList } from '../web/matching.js';
const ingredients = new Set(categories.flatMap(c => c.ingredients));
const recipe = name => recipes.find(r => r.name === name);

test('all 16 recipes have complete, unique, measured pantry ingredients and numbered methods', () => {
  assert.equal(recipes.length, 16);
  assert.equal(new Set(recipes.map(r => r.id)).size, 16);
  assert.equal(ingredients.size, categories.flatMap(c => c.ingredients).length);
  for (const r of recipes) {
    assert.equal(r.ingredients.length, r.required.length);
    assert.equal(new Set(r.required).size, r.required.length);
    assert.ok(r.steps.length >= 3, r.name);
    assert.ok(r.servings > 0 && r.prepMinutes > 0 && r.cookMinutes > 0);
    for (const item of r.ingredients) {
      assert.ok(ingredients.has(item.name), `${r.name}: ${item.name}`);
      assert.ok(item.quantity > 0 && ['g', 'ml', 'tsp', 'tbsp', 'piece'].includes(item.unit));
    }
    assert.deepEqual(r.required, r.ingredients.map(i => i.name));
  }
});
test('an empty pantry has no ready meals; a full pantry unlocks all 16', () => {
  assert.ok(rankRecipes(recipes, new Set()).every(r => r.match === 0 && r.missing.length));
  assert.ok(rankRecipes(recipes, ingredients).every(r => r.match === 100 && !r.missing.length));
});
test('jollof now requires cooking staples as well as rice and vegetables', () => {
  const oldPantry = new Set(['Rice', 'Tomatoes', 'Pepper (Tatashe / Ata Rodo)', 'Onion', 'Tomato Paste']);
  const r = rankRecipes(recipes, oldPantry).find(r => r.name === 'Jollof Rice');
  assert.ok(r.missing.includes('Sunflower Oil'));
  assert.ok(r.missing.includes('Vegetable Stock'));
  assert.ok(r.missing.includes('Salt'));
  assert.ok(r.match < 100);
  assert.equal(rankRecipes(recipes, new Set(recipe('Jollof Rice').required)).find(r => r.name === 'Jollof Rice').match, 100);
});
test('garri requires water; Afang requires afang leaves and Onugbu requires cocoyam', () => {
  assert.deepEqual(rankRecipes(recipes, new Set(['Cassava / Garri'])).find(r => r.name.startsWith('Eba')).missing, ['Water']);
  assert.equal(rankRecipes(recipes, new Set(['Cassava / Garri', 'Water']))[0].name, 'Eba (Garri Swallow)');
  assert.ok(recipe('Afang Soup').required.includes('Afang Leaves'));
  assert.ok(recipe('Ofe Onugbu (Bitter Leaf Soup)').required.includes('Cocoyam'));
});
test('serving scaling is proportional without mutating the source recipe', () => {
  const r = recipe('Jollof Rice');
  const scaled = scaledIngredients(r, 2);
  assert.equal(scaled.find(i => i.name === 'Rice').quantity, 200);
  assert.equal(r.ingredients.find(i => i.name === 'Rice').quantity, 400);
  assert.equal(scaledIngredients(r, 1).find(i => i.name === 'Salt').quantity, 0.25);
});
test('shopping list sums repeated ingredients and retains the contributing dishes', () => {
  const plan = { '3': 4, '14': 2 };
  const list = buildShoppingList(recipes, plan, new Set());
  const rice = list.find(i => i.name === 'Rice');
  assert.equal(rice.quantity, 600);
  assert.deepEqual(rice.dishes, ['Jollof Rice', 'Coconut Rice']);
  assert.equal(list.filter(i => i.name === 'Rice').length, 1);
  assert.equal(buildShoppingList(recipes, plan, new Set(['Rice'])).some(i => i.name === 'Rice'), false);
  assert.equal(buildShoppingList(recipes, {}, new Set()).length, 0);
});
test('shopping check keys change when the amount changes', () => {
  const a = buildShoppingList(recipes, { '3': 4 }, new Set()).find(i => i.name === 'Rice');
  const b = buildShoppingList(recipes, { '3': 8 }, new Set()).find(i => i.name === 'Rice');
  assert.notEqual(a.key, b.key);
});
test('vegetarian and vegan filters exclude meat and seafood recipes', () => {
  assert.ok(matchesDiet(recipe('Jollof Rice'), 'vegan', new Set()));
  assert.ok(matchesDiet(recipe('Moi Moi'), 'vegetarian', new Set()));
  assert.equal(matchesDiet(recipe('Pepper Soup'), 'vegetarian', new Set()), false);
  assert.equal(matchesDiet(recipe('Suya'), 'vegan', new Set()), false);
  assert.equal(matchesDiet(recipe('Egusi Soup'), 'vegan', new Set()), false);
});
test('allergen exclusions include peanut-derived oil and yaji, fish, shellfish, coconut and uncertain stock', () => {
  assert.ok(getAllergens(recipe('Suya')).includes('peanuts'));
  assert.ok(getAllergens(recipe('Fried Plantain (Dodo)')).includes('peanuts'));
  assert.ok(getAllergens(recipe('Pepper Soup')).includes('fish'));
  assert.ok(getAllergens(recipe('Okra Soup')).includes('shellfish'));
  assert.ok(getAllergens(recipe('Coconut Rice')).includes('coconut'));
  assert.ok(getAllergens(recipe('Jollof Rice')).includes('gluten'));
  assert.equal(matchesDiet(recipe('Suya'), 'all', new Set(['peanuts'])), false);
  assert.ok(matchesDiet(recipe('Eba (Garri Swallow)'), 'vegan', new Set(['fish', 'shellfish', 'peanuts', 'gluten', 'coconut'])));
});
test('storage recovery rejects corruption and invalid meal-plan servings', () => {
  for (const value of ['bad JSON', '{}', 'null', '123']) assert.equal(loadList({ getItem: () => value }, 'key', ingredients).size, 0);
  assert.deepEqual([...loadList({ getItem: () => '["Rice","unknown",1,"Rice"]' }, 'key', ingredients)], ['Rice']);
  assert.deepEqual(loadPlan({ getItem: () => '{"3":4,"14":2,"999":4,"1":0,"2":13,"4":"4","5":1.5}' }, recipes), { '3': 4, '14': 2 });
  assert.deepEqual(loadPlan({ getItem() { throw Error('denied'); } }, recipes), {});
});
test('manifest scopes install to the current project directory and ships proper PNG icons', async () => {
  const manifest = JSON.parse(await readFile(new URL('../web/manifest.webmanifest', import.meta.url)));
  assert.equal(manifest.start_url, './');
  assert.equal(manifest.scope, './');
  for (const size of [192, 512]) {
    const icon = manifest.icons.find(i => i.sizes === `${size}x${size}`);
    assert.ok(icon);
    const png = await readFile(new URL(`../web/${icon.src}`, import.meta.url));
    assert.equal(png.readUInt32BE(16), size);
    assert.equal(png.readUInt32BE(20), size);
  }
});
test('every active photograph has a local asset and attribution', { skip: !Object.keys(photos).length && 'No reviewed external photographs have been imported.' }, async () => {
  for (const [id, photo] of Object.entries(photos)) {
    assert.ok(recipes.some(r => r.id === id));
    assert.ok(photo.author && photo.license && photo.source && photo.alt && photo.changes);
    assert.ok(photo.src.startsWith('./assets/photos/'));
    assert.equal(new URL(photo.source).hostname, 'commons.wikimedia.org');
    await readFile(new URL(`../web/${photo.src}`, import.meta.url));
  }
});
