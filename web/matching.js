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
