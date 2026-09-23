import batch1 from './recipe-library/recipes_001_030.json';
import batch2 from './recipe-library/recipes_031_060.json';
import batch3 from './recipe-library/recipes_061_090.json';
import batch4 from './recipe-library/recipes_091_120.json';

export interface RecipeIngredient {
  name: string;
  normalizedIngredient: string;
  quantity: number;
  unit: string;
  optional: boolean;
  notes?: string;
}

export interface RecipeInstruction {
  step: number;
  text: string;
}

export interface NutritionPerServing {
  calories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
  fiberGrams?: number;
}

export interface ScalingChange {
  ingredientId: string;
  ingredientName: string;
  delta: number;
  unit: string;
  notes?: string;
}

export interface ScalingGoal {
  description: string;
  changes: ScalingChange[];
}

export interface Substitution {
  originalIngredient: string;
  alternativeName: string;
  alternativeNormalizedIngredient: string;
  quantity: number;
  unit: string;
  requiresMethodChange?: boolean;
  notes?: string;
}

export type CostLevel = 'very_low' | 'low' | 'medium' | 'high';

export interface Recipe {
  id: string;
  sequence: number;
  primaryCategory: string;
  name: string;
  shortDescription: string;
  mealType: string[];
  cuisine: string;
  tags: string[];
  servings: number;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  passiveTimeMinutes: number;
  totalTimeMinutes: number;
  difficulty: string;
  ingredients: RecipeIngredient[];
  instructions: RecipeInstruction[];
  nutritionPerServing: NutritionPerServing;
  estimatedCostLevel: CostLevel;
  mealPrepFriendly: boolean;
  freezerFriendly: boolean;
  familyFriendly: boolean;
  storageDaysFridge: number;
  reheatingMethod?: string;
  storeComponentsSeparately?: boolean;
  storageNotes?: string;
  freezerNotes?: string;
  substitutions?: Substitution[];
  possibleAddOns?: RecipeIngredient[];
  possibleRemovals?: RecipeIngredient[];
  scalingNotes?: Record<string, ScalingGoal>;
  allergens?: string[];
  foodSafetyNotes?: string;
  allergenAssessment?: string;
  freezerScope?: string;
  nutritionTargetNote?: string;
}

function loadBatch(batch: { recipes: unknown[] }): Recipe[] {
  return batch.recipes as Recipe[];
}

export const ALL_RECIPES: Recipe[] = [
  ...loadBatch(batch1 as { recipes: unknown[] }),
  ...loadBatch(batch2 as { recipes: unknown[] }),
  ...loadBatch(batch3 as { recipes: unknown[] }),
  ...loadBatch(batch4 as { recipes: unknown[] }),
].sort((a, b) => a.sequence - b.sequence);

export const RECIPE_BY_ID = new Map<string, Recipe>(ALL_RECIPES.map(r => [r.id, r]));

// Category → Unsplash photo ID (tasteful food placeholders, illustrative only)
export const CATEGORY_IMAGES: Record<string, string> = {
  breakfasts:            'photo-1494390248081-4e521a5940db',
  chicken_turkey:        'photo-1598103442097-8b74394b95c3',
  beef:                  'photo-1602030638412-bb8dcc0bc8b0',
  pork:                  'photo-1432139509613-5c4255815697',
  fish_seafood:          'photo-1559847844-5315695dadae',
  vegetarian:            'photo-1512621776951-a57141f2eefd',
  pasta:                 'photo-1551183053-bf91798d14dc',
  bowls_wraps_burritos:  'photo-1543339308-43e59d6b73a6',
  snacks_desserts:       'photo-1563805042-7684c019e1cb',
};

export function recipeImage(category: string, w = 400, h = 260): string {
  const id = CATEGORY_IMAGES[category] ?? 'photo-1512621776951-a57141f2eefd';
  return `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format`;
}

export const COST_LABEL: Record<CostLevel, string> = {
  very_low: '·',
  low: '··',
  medium: '···',
  high: '····',
};

export const PRIMARY_CATEGORIES = [
  { id: 'all',                  label: 'All',           emoji: '🍽️' },
  { id: 'breakfasts',           label: 'Breakfast',     emoji: '☀️' },
  { id: 'chicken_turkey',       label: 'Chicken',       emoji: '🍗' },
  { id: 'beef',                 label: 'Beef',          emoji: '🥩' },
  { id: 'pork',                 label: 'Pork',          emoji: '🐷' },
  { id: 'fish_seafood',         label: 'Fish',          emoji: '🐟' },
  { id: 'vegetarian',           label: 'Veggie',        emoji: '🥦' },
  { id: 'pasta',                label: 'Pasta',         emoji: '🍝' },
  { id: 'bowls_wraps_burritos', label: 'Bowls',         emoji: '🌯' },
  { id: 'snacks_desserts',      label: 'Snacks',        emoji: '🍎' },
];

/** Simple name-based recipe lookup — best match from library for a given meal name */
export function findRecipeForMeal(mealName: string, mealType?: string): Recipe | undefined {
  const lower = mealName.toLowerCase();
  // Exact-ish name match first
  let best = ALL_RECIPES.find(r => r.name.toLowerCase().includes(lower.slice(0, 8)));
  if (!best && mealType) {
    // Fall back to matching meal type
    const typeMap: Record<string, string[]> = {
      breakfast: ['breakfasts'],
      lunch: ['chicken_turkey', 'beef', 'fish_seafood', 'pasta', 'bowls_wraps_burritos'],
      snack: ['snacks_desserts'],
      dinner: ['chicken_turkey', 'beef', 'pork', 'fish_seafood'],
    };
    const cats = typeMap[mealType] ?? [];
    best = ALL_RECIPES.find(r => cats.includes(r.primaryCategory));
  }
  return best;
}
