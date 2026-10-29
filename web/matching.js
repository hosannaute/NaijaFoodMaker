export function rankRecipes(recipes, pantry) {
  return recipes.map(recipe => {
    const missing = recipe.required.filter(item => !pantry.has(item));
    const bonus = recipe.bonus.filter(item => pantry.has(item));
    return { ...recipe, missing, available: recipe.required.length - missing.length,
      match: Math.round((recipe.required.length - missing.length) / recipe.required.length * 100), bonusPresent: bonus };
  }).sort((a, b) => b.match - a.match || b.bonusPresent.length - a.bonusPresent.length || Number(a.id) - Number(b.id));
}

export function loadList(storage, key, allowed) {
  try {
    const value = JSON.parse(storage.getItem(key));
    return new Set(Array.isArray(value) ? value.filter(item => typeof item === 'string' && allowed.has(item)) : []);
  } catch { return new Set(); }
}

export function loadPlan(storage, recipes) {
  try {
    const value = JSON.parse(storage.getItem('naija-plan'));
    if (!value || Array.isArray(value) || typeof value !== 'object') return {};
    return Object.fromEntries(Object.entries(value).filter(([id, count]) => recipes.some(r => r.id === id) && Number.isInteger(count) && count >= 1 && count <= 12));
  } catch { return {}; }
}

const allergenRules = {
  peanuts: ['Groundnut Oil', 'Suya Spice (Yaji)'],
  fish: ['Fish (Titus / Mackerel)', 'Stockfish', 'Catfish', 'Dry Fish'],
  shellfish: ['Crayfish', 'Shrimp'],
  gluten: ['Semolina', 'Wheat (Swallow)', 'Oats / Cornmeal', 'Stock Cube (Maggi / Knorr)', 'Vegetable Stock'],
  coconut: ['Coconut Milk'],
};
export const allergyLabels = { peanuts: 'Peanuts', fish: 'Fish', shellfish: 'Shellfish', gluten: 'Gluten', coconut: 'Coconut' };
export function getAllergens(recipe) {
  return Object.entries(allergenRules).filter(([, names]) => recipe.required.some(item => names.includes(item))).map(([allergen]) => allergen);
}
export function matchesDiet(recipe, diet, exclusions) {
  return (diet === 'all' || diet === 'vegetarian' && ['vegetarian', 'vegan'].includes(recipe.diet) || diet === recipe.diet)
    && !getAllergens(recipe).some(item => exclusions.has(item));
}
export function scaledIngredients(recipe, servings = recipe.servings) {
  return recipe.ingredients.map(item => ({ ...item, quantity: Math.round(item.quantity * servings / recipe.servings * 1000) / 1000 }));
}
export function formatAmount(quantity, unit) {
  return `${Number(quantity.toFixed(2))} ${unit === 'piece' ? (quantity === 1 ? 'piece' : 'pieces') : unit}`;
}
export function buildShoppingList(recipes, plan, pantry) {
  const combined = new Map();
  for (const recipe of recipes) {
    if (!Object.hasOwn(plan, recipe.id)) continue;
    for (const item of scaledIngredients(recipe, plan[recipe.id])) {
      if (pantry.has(item.name)) continue;
      const key = `${item.name}|${item.unit}`;
      const previous = combined.get(key) || { name: item.name, quantity: 0, unit: item.unit, dishes: [] };
      previous.quantity = Math.round((previous.quantity + item.quantity) * 1000) / 1000;
      previous.dishes.push(recipe.name);
      combined.set(key, previous);
    }
  }
  return [...combined.values()].sort((a, b) => a.name.localeCompare(b.name)).map(item => ({ ...item, key: `${item.name}|${item.unit}|${item.quantity}` }));
}
