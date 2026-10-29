import { test } from 'node:test';
import assert from 'node:assert/strict';
import { categories, recipes } from '../web/data.js';
import { rankRecipes, loadList } from '../web/matching.js';

const ingredients = new Set(categories.flatMap(c => c.ingredients));
test('all 16 dishes have valid pantry ingredients and unique IDs', () => {
  assert.equal(recipes.length, 16);
  assert.equal(new Set(recipes.map(r => r.id)).size, 16);
  for (const recipe of recipes) {
    assert.ok(recipe.required.length);
    for (const item of [...recipe.required, ...recipe.bonus]) assert.ok(ingredients.has(item), item);
  }
});
test('empty pantry has no ready recipes', () => {
  assert.ok(rankRecipes(recipes, new Set()).every(r => r.missing.length > 0 && r.match === 0));
});
test('jollof essentials unlock jollof and expose missing ingredients on other dishes', () => {
  const pantry = new Set(['Rice', 'Tomatoes', 'Pepper (Tatashe / Ata Rodo)', 'Onion', 'Tomato Paste']);
  const result = rankRecipes(recipes, pantry);
  assert.equal(result[0].name, 'Jollof Rice');
  assert.deepEqual(result[0].missing, []);
  assert.equal(result[0].match, 100);
  assert.deepEqual(result.find(r => r.name === 'Fried Rice').missing, ['Groundnut Oil']);
});
test('all ingredients unlock all 16 recipes, including Eba', () => {
  assert.ok(rankRecipes(recipes, ingredients).every(r => r.match === 100 && r.missing.length === 0));
});
test('garri alone matches Eba without the original dict/set error', () => {
  const result = rankRecipes(recipes, new Set(['Cassava / Garri']));
  assert.equal(result[0].name, 'Eba (Garri Swallow)');
  assert.equal(result[0].match, 100);
  assert.deepEqual(result[0].bonusPresent, []);
});
test('bonus ingredients rank ready recipes without affecting required match', () => {
  const result = rankRecipes(recipes, new Set(['Rice', 'Coconut Milk', 'Beef', 'Suya Spice (Yaji)', 'Tomatoes', 'Garlic']));
  assert.equal(result[0].name, 'Suya');
  assert.equal(result[0].bonusPresent.length, 2);
  assert.equal(result[1].name, 'Coconut Rice');
});
test('persisted lists reject corrupt or unknown entries', () => {
  for (const value of ['invalid JSON', '{}', 'null', '123']) assert.equal(loadList({ getItem: () => value }, 'key', ingredients).size, 0);
  assert.deepEqual([...loadList({ getItem: () => '["Rice","unknown",1,"Rice"]' }, 'key', ingredients)], ['Rice']);
});
test('unavailable storage degrades to an empty pantry', () => {
  assert.equal(loadList({ getItem() { throw Error('denied'); } }, 'key', ingredients).size, 0);
});
