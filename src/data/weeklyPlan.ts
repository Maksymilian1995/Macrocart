import type { WeeklyPlan, DayPlan, Meal, ShoppingItem } from '../types';

export const SWAP_ALTERNATIVES: Record<string, Meal[]> = {
  lunch: [
    {
      id: 'swap_chicken_pasta', name: 'Chicken Pasta', mealType: 'lunch',
      calories: 610, protein: 49, carbs: 62, fat: 9, estimatedCost: 19.90,
      ingredients: [
        { productId: 'p001', name: 'Chicken breast', quantity: 180, unit: 'g', estimatedCost: 9.00 },
        { productId: 'p015', name: 'Whole grain pasta', quantity: 100, unit: 'g', estimatedCost: 2.00 },
        { productId: 'p022', name: 'Frozen vegetables', quantity: 120, unit: 'g', estimatedCost: 2.40 },
        { productId: 'p029', name: 'Soy sauce', quantity: 20, unit: 'ml', estimatedCost: 0.80 },
        { productId: 'p027', name: 'Olive oil', quantity: 10, unit: 'ml', estimatedCost: 0.70 },
      ],
    },
    {
      id: 'swap_turkey_rice', name: 'Turkey Rice Bowl', mealType: 'lunch',
      calories: 605, protein: 51, carbs: 58, fat: 6, estimatedCost: 22.30,
      ingredients: [
        { productId: 'p003', name: 'Turkey breast', quantity: 180, unit: 'g', estimatedCost: 11.70 },
        { productId: 'p014', name: 'Basmati rice', quantity: 90, unit: 'g', estimatedCost: 1.35 },
        { productId: 'p022', name: 'Frozen vegetables', quantity: 120, unit: 'g', estimatedCost: 2.39 },
        { productId: 'p023', name: 'Baby spinach', quantity: 50, unit: 'g', estimatedCost: 2.49 },
      ],
    },
    {
      id: 'swap_tuna_potato', name: 'Tuna Potato Bowl', mealType: 'lunch',
      calories: 590, protein: 47, carbs: 52, fat: 5, estimatedCost: 18.80,
      ingredients: [
        { productId: 'p007', name: 'Tuna in water', quantity: 140, unit: 'g', estimatedCost: 5.74 },
        { productId: 'p017', name: 'New potatoes', quantity: 200, unit: 'g', estimatedCost: 1.73 },
        { productId: 'p023', name: 'Baby spinach', quantity: 80, unit: 'g', estimatedCost: 3.98 },
        { productId: 'p010', name: 'Greek yogurt', quantity: 100, unit: 'g', estimatedCost: 2.59 },
      ],
    },
  ],
  breakfast: [
    {
      id: 'swap_egg_toast', name: 'Egg & Avocado Toast', mealType: 'breakfast',
      calories: 520, protein: 32, carbs: 38, fat: 18, estimatedCost: 14.20,
      ingredients: [
        { productId: 'p008', name: 'Eggs', quantity: 3, unit: 'pcs', estimatedCost: 6.24 },
        { productId: 'p018', name: 'Sourdough bread', quantity: 80, unit: 'g', estimatedCost: 2.39 },
        { productId: 'p027', name: 'Olive oil', quantity: 8, unit: 'ml', estimatedCost: 0.56 },
      ],
    },
    {
      id: 'swap_skyr_bowl', name: 'Skyr & Berry Bowl', mealType: 'breakfast',
      calories: 430, protein: 36, carbs: 52, fat: 4, estimatedCost: 13.50,
      ingredients: [
        { productId: 'p009', name: 'Skyr natural', quantity: 300, unit: 'g', estimatedCost: 8.97 },
        { productId: 'p021', name: 'Frozen berries', quantity: 100, unit: 'g', estimatedCost: 2.66 },
        { productId: 'p019', name: 'Banana', quantity: 80, unit: 'g', estimatedCost: 0.72 },
      ],
    },
  ],
  dinner: [
    {
      id: 'swap_salmon_rice', name: 'Salmon & Rice', mealType: 'dinner',
      calories: 710, protein: 48, carbs: 58, fat: 18, estimatedCost: 32.40,
      ingredients: [
        { productId: 'p006', name: 'Salmon fillet', quantity: 200, unit: 'g', estimatedCost: 22.48 },
        { productId: 'p014', name: 'Basmati rice', quantity: 90, unit: 'g', estimatedCost: 1.35 },
        { productId: 'p025', name: 'Broccoli', quantity: 150, unit: 'g', estimatedCost: 3.74 },
      ],
    },
    {
      id: 'swap_turkey_pasta', name: 'Turkey Bolognese', mealType: 'dinner',
      calories: 680, protein: 50, carbs: 64, fat: 12, estimatedCost: 26.80,
      ingredients: [
        { productId: 'p003', name: 'Turkey breast', quantity: 200, unit: 'g', estimatedCost: 13.00 },
        { productId: 'p015', name: 'Whole grain pasta', quantity: 100, unit: 'g', estimatedCost: 2.00 },
        { productId: 'p024', name: 'Cherry tomatoes', quantity: 150, unit: 'g', estimatedCost: 6.48 },
      ],
    },
  ],
};

const makeDayPlan = (
  dayName: string,
  dayShort: string,
  breakfast: Meal,
  lunch: Meal,
  snack: Meal,
  dinner: Meal,
): DayPlan => {
  const meals = [breakfast, lunch, snack, dinner];
  return {
    dayName,
    dayShort,
    meals,
    totalCalories: meals.reduce((s, m) => s + m.calories, 0),
    totalProtein: meals.reduce((s, m) => s + m.protein, 0),
    totalCarbs: meals.reduce((s, m) => s + m.carbs, 0),
    totalCost: meals.reduce((s, m) => s + m.estimatedCost, 0),
  };
};

const BREAKFAST_OATS: Meal = {
  id: 'm_b1', name: 'Protein Oats & Banana', mealType: 'breakfast',
  calories: 548, protein: 38, carbs: 68, fat: 9, estimatedCost: 12.40,
  ingredients: [
    { productId: 'p016', name: 'Oat flakes', quantity: 80, unit: 'g', estimatedCost: 0.96 },
    { productId: 'p019', name: 'Banana', quantity: 120, unit: 'g', estimatedCost: 1.07 },
    { productId: 'p009', name: 'Skyr', quantity: 150, unit: 'g', estimatedCost: 4.49 },
    { productId: 'p028', name: 'Whey protein', quantity: 30, unit: 'g', estimatedCost: 4.80 },
    { productId: 'p012', name: 'Milk', quantity: 100, unit: 'ml', estimatedCost: 0.90 },
  ],
};

const LUNCH_CHICKEN_RICE: Meal = {
  id: 'm_l1', name: 'Chicken Rice Bowl', mealType: 'lunch',
  calories: 620, protein: 52, carbs: 60, fat: 8, estimatedCost: 21.60,
  ingredients: [
    { productId: 'p001', name: 'Chicken breast', quantity: 200, unit: 'g', estimatedCost: 9.99 },
    { productId: 'p014', name: 'Basmati rice', quantity: 100, unit: 'g', estimatedCost: 1.50 },
    { productId: 'p022', name: 'Frozen vegetables', quantity: 150, unit: 'g', estimatedCost: 2.99 },
    { productId: 'p010', name: 'Greek yogurt sauce', quantity: 50, unit: 'g', estimatedCost: 1.30 },
    { productId: 'p029', name: 'Soy sauce', quantity: 15, unit: 'ml', estimatedCost: 0.60 },
    { productId: 'p027', name: 'Olive oil', quantity: 10, unit: 'ml', estimatedCost: 0.70 },
  ],
};

const SNACK_SKYR: Meal = {
  id: 'm_s1', name: 'Skyr with Berries', mealType: 'snack',
  calories: 280, protein: 31, carbs: 28, fat: 2, estimatedCost: 11.90,
  ingredients: [
    { productId: 'p009', name: 'Skyr natural', quantity: 250, unit: 'g', estimatedCost: 7.48 },
    { productId: 'p021', name: 'Frozen berries', quantity: 100, unit: 'g', estimatedCost: 2.66 },
    { productId: 'p019', name: 'Banana', quantity: 60, unit: 'g', estimatedCost: 0.54 },
  ],
};

const DINNER_BEEF_VEG: Meal = {
  id: 'm_d1', name: 'Beef, Potatoes & Vegetables', mealType: 'dinner',
  calories: 742, protein: 53, carbs: 62, fat: 16, estimatedCost: 28.70,
  ingredients: [
    { productId: 'p004', name: 'Minced beef 8%', quantity: 200, unit: 'g', estimatedCost: 13.18 },
    { productId: 'p017', name: 'New potatoes', quantity: 250, unit: 'g', estimatedCost: 2.16 },
    { productId: 'p022', name: 'Frozen vegetables', quantity: 150, unit: 'g', estimatedCost: 2.99 },
    { productId: 'p027', name: 'Olive oil', quantity: 12, unit: 'ml', estimatedCost: 0.84 },
    { productId: 'p024', name: 'Cherry tomatoes', quantity: 80, unit: 'g', estimatedCost: 3.45 },
  ],
};

const BREAKFAST_EGGS: Meal = {
  id: 'm_b2', name: 'Scrambled Eggs & Toast', mealType: 'breakfast',
  calories: 520, protein: 34, carbs: 40, fat: 16, estimatedCost: 14.20,
  ingredients: [
    { productId: 'p008', name: 'Free range eggs', quantity: 3, unit: 'pcs', estimatedCost: 6.24 },
    { productId: 'p018', name: 'Sourdough bread', quantity: 80, unit: 'g', estimatedCost: 2.39 },
    { productId: 'p023', name: 'Baby spinach', quantity: 60, unit: 'g', estimatedCost: 2.99 },
    { productId: 'p013', name: 'Edam cheese', quantity: 30, unit: 'g', estimatedCost: 2.54 },
  ],
};

const LUNCH_TUNA_POTATO: Meal = {
  id: 'm_l2', name: 'Tuna Potato Bowl', mealType: 'lunch',
  calories: 590, protein: 47, carbs: 52, fat: 5, estimatedCost: 18.80,
  ingredients: [
    { productId: 'p007', name: 'Tuna in water', quantity: 140, unit: 'g', estimatedCost: 5.74 },
    { productId: 'p017', name: 'New potatoes', quantity: 200, unit: 'g', estimatedCost: 1.73 },
    { productId: 'p023', name: 'Baby spinach', quantity: 80, unit: 'g', estimatedCost: 3.98 },
    { productId: 'p010', name: 'Greek yogurt', quantity: 100, unit: 'g', estimatedCost: 2.59 },
    { productId: 'p024', name: 'Cherry tomatoes', quantity: 80, unit: 'g', estimatedCost: 3.45 },
  ],
};

const SNACK_COTTAGE: Meal = {
  id: 'm_s2', name: 'Cottage Cheese & Apple', mealType: 'snack',
  calories: 250, protein: 28, carbs: 22, fat: 4, estimatedCost: 10.20,
  ingredients: [
    { productId: 'p011', name: 'Cottage cheese', quantity: 250, unit: 'g', estimatedCost: 8.72 },
    { productId: 'p020', name: 'Apple', quantity: 150, unit: 'g', estimatedCost: 2.83 },
  ],
};

const DINNER_SALMON: Meal = {
  id: 'm_d2', name: 'Baked Salmon & Sweet Potato', mealType: 'dinner',
  calories: 720, protein: 46, carbs: 54, fat: 18, estimatedCost: 32.40,
  ingredients: [
    { productId: 'p006', name: 'Atlantic salmon', quantity: 200, unit: 'g', estimatedCost: 22.48 },
    { productId: 'p033', name: 'Sweet potatoes', quantity: 200, unit: 'g', estimatedCost: 2.79 },
    { productId: 'p025', name: 'Broccoli', quantity: 150, unit: 'g', estimatedCost: 3.74 },
    { productId: 'p027', name: 'Olive oil', quantity: 12, unit: 'ml', estimatedCost: 0.84 },
  ],
};

const BREAKFAST_OATS2: Meal = {
  id: 'm_b3', name: 'Protein Oats & Berries', mealType: 'breakfast',
  calories: 530, protein: 37, carbs: 64, fat: 8, estimatedCost: 11.80,
  ingredients: [
    { productId: 'p016', name: 'Oat flakes', quantity: 80, unit: 'g', estimatedCost: 0.96 },
    { productId: 'p021', name: 'Frozen berries', quantity: 100, unit: 'g', estimatedCost: 2.66 },
    { productId: 'p009', name: 'Skyr', quantity: 150, unit: 'g', estimatedCost: 4.49 },
    { productId: 'p028', name: 'Whey protein', quantity: 30, unit: 'g', estimatedCost: 4.80 },
  ],
};

const LUNCH_CHICKEN_PASTA: Meal = {
  id: 'm_l3', name: 'Chicken Pasta', mealType: 'lunch',
  calories: 610, protein: 49, carbs: 62, fat: 9, estimatedCost: 19.90,
  ingredients: [
    { productId: 'p001', name: 'Chicken breast', quantity: 180, unit: 'g', estimatedCost: 8.99 },
    { productId: 'p015', name: 'Whole grain pasta', quantity: 100, unit: 'g', estimatedCost: 2.00 },
    { productId: 'p022', name: 'Frozen vegetables', quantity: 120, unit: 'g', estimatedCost: 2.39 },
    { productId: 'p024', name: 'Cherry tomatoes', quantity: 100, unit: 'g', estimatedCost: 4.32 },
    { productId: 'p027', name: 'Olive oil', quantity: 10, unit: 'ml', estimatedCost: 0.70 },
  ],
};

const SNACK_PROTEIN_SHAKE: Meal = {
  id: 'm_s3', name: 'Protein Shake & Banana', mealType: 'snack',
  calories: 310, protein: 35, carbs: 30, fat: 4, estimatedCost: 8.40,
  ingredients: [
    { productId: 'p028', name: 'Whey protein', quantity: 40, unit: 'g', estimatedCost: 6.40 },
    { productId: 'p019', name: 'Banana', quantity: 100, unit: 'g', estimatedCost: 0.90 },
    { productId: 'p012', name: 'Milk', quantity: 200, unit: 'ml', estimatedCost: 1.79 },
  ],
};

const DINNER_PORK: Meal = {
  id: 'm_d3', name: 'Pork Tenderloin & Potatoes', mealType: 'dinner',
  calories: 690, protein: 52, carbs: 56, fat: 14, estimatedCost: 26.50,
  ingredients: [
    { productId: 'p005', name: 'Pork tenderloin', quantity: 200, unit: 'g', estimatedCost: 12.87 },
    { productId: 'p017', name: 'New potatoes', quantity: 200, unit: 'g', estimatedCost: 1.73 },
    { productId: 'p025', name: 'Broccoli', quantity: 150, unit: 'g', estimatedCost: 3.74 },
    { productId: 'p027', name: 'Olive oil', quantity: 12, unit: 'ml', estimatedCost: 0.84 },
  ],
};

const DINNER_BEEF_WRAP: Meal = {
  id: 'm_d4', name: 'Beef & Veggie Wrap', mealType: 'dinner',
  calories: 710, protein: 50, carbs: 58, fat: 17, estimatedCost: 27.80,
  ingredients: [
    { productId: 'p004', name: 'Minced beef 8%', quantity: 180, unit: 'g', estimatedCost: 11.86 },
    { productId: 'p030', name: 'Wholegrain tortillas', quantity: 80, unit: 'g', estimatedCost: 2.99 },
    { productId: 'p023', name: 'Baby spinach', quantity: 50, unit: 'g', estimatedCost: 2.49 },
    { productId: 'p024', name: 'Cherry tomatoes', quantity: 80, unit: 'g', estimatedCost: 3.45 },
    { productId: 'p010', name: 'Greek yogurt', quantity: 60, unit: 'g', estimatedCost: 1.55 },
  ],
};

export const DEFAULT_WEEKLY_PLAN: WeeklyPlan = {
  totalCost: 437,
  regularCost: 511,
  savings: 74,
  productsCount: 18,
  discountedProductsCount: 6,
  days: [
    makeDayPlan('Monday', 'Mon', BREAKFAST_OATS, LUNCH_CHICKEN_RICE, SNACK_SKYR, DINNER_BEEF_VEG),
    makeDayPlan('Tuesday', 'Tue', BREAKFAST_EGGS, LUNCH_TUNA_POTATO, SNACK_COTTAGE, DINNER_SALMON),
    makeDayPlan('Wednesday', 'Wed', BREAKFAST_OATS2, LUNCH_CHICKEN_PASTA, SNACK_PROTEIN_SHAKE, DINNER_PORK),
    makeDayPlan('Thursday', 'Thu', BREAKFAST_OATS, LUNCH_CHICKEN_RICE, SNACK_SKYR, DINNER_BEEF_WRAP),
    makeDayPlan('Friday', 'Fri', BREAKFAST_EGGS, LUNCH_TUNA_POTATO, SNACK_COTTAGE, DINNER_BEEF_VEG),
    makeDayPlan('Saturday', 'Sat', BREAKFAST_OATS2, LUNCH_CHICKEN_PASTA, SNACK_SKYR, DINNER_SALMON),
    makeDayPlan('Sunday', 'Sun', BREAKFAST_OATS, LUNCH_CHICKEN_RICE, SNACK_PROTEIN_SHAKE, DINNER_PORK),
  ],
};

export const DEFAULT_SHOPPING_LIST: ShoppingItem[] = [
  { productId: 'p001', quantityNeeded: 1400, quantityUnit: 'g', packsNeeded: 2, totalCost: 69.90, usedInMeals: ['Mon lunch', 'Wed lunch', 'Sat lunch'], purchased: false },
  { productId: 'p004', quantityNeeded: 580, quantityUnit: 'g', packsNeeded: 2, totalCost: 65.90, usedInMeals: ['Mon dinner', 'Thu dinner', 'Fri dinner'], purchased: false },
  { productId: 'p006', quantityNeeded: 400, quantityUnit: 'g', packsNeeded: 1, totalCost: 44.95, usedInMeals: ['Tue dinner', 'Sat dinner'], purchased: false },
  { productId: 'p007', quantityNeeded: 280, quantityUnit: 'g', packsNeeded: 1, totalCost: 22.95, usedInMeals: ['Tue lunch', 'Fri lunch'], purchased: false },
  { productId: 'p008', quantityNeeded: 6, quantityUnit: 'pcs', packsNeeded: 1, totalCost: 24.95, usedInMeals: ['Tue breakfast', 'Fri breakfast'], purchased: false },
  { productId: 'p009', quantityNeeded: 1650, quantityUnit: 'g', packsNeeded: 4, totalCost: 59.80, usedInMeals: ['Mon breakfast', 'Mon snack', 'Wed breakfast', 'Sat snack', 'Sun breakfast'], purchased: false },
  { productId: 'p014', quantityNeeded: 470, quantityUnit: 'g', packsNeeded: 1, totalCost: 14.95, usedInMeals: ['Mon lunch', 'Thu lunch', 'Sun lunch'], purchased: false },
  { productId: 'p016', quantityNeeded: 320, quantityUnit: 'g', packsNeeded: 1, totalCost: 11.95, usedInMeals: ['Mon breakfast', 'Wed breakfast', 'Sun breakfast'], purchased: false },
  { productId: 'p017', quantityNeeded: 1850, quantityUnit: 'g', packsNeeded: 2, totalCost: 25.90, usedInMeals: ['Mon dinner', 'Tue lunch', 'Wed dinner', 'Fri lunch', 'Sun dinner'], purchased: false },
  { productId: 'p019', quantityNeeded: 720, quantityUnit: 'g', packsNeeded: 1, totalCost: 8.95, usedInMeals: ['Mon breakfast', 'Mon snack', 'Sun snack'], purchased: false },
  { productId: 'p021', quantityNeeded: 500, quantityUnit: 'g', packsNeeded: 1, totalCost: 19.95, usedInMeals: ['Mon snack', 'Wed breakfast', 'Sat breakfast'], purchased: false },
  { productId: 'p022', quantityNeeded: 900, quantityUnit: 'g', packsNeeded: 2, totalCost: 29.90, usedInMeals: ['Mon lunch', 'Mon dinner', 'Wed lunch', 'Thu lunch'], purchased: false },
  { productId: 'p025', quantityNeeded: 600, quantityUnit: 'g', packsNeeded: 2, totalCost: 19.90, usedInMeals: ['Tue dinner', 'Wed dinner', 'Sat dinner'], purchased: false },
  { productId: 'p028', quantityNeeded: 210, quantityUnit: 'g', packsNeeded: 1, totalCost: 79.95, usedInMeals: ['Mon breakfast', 'Wed breakfast', 'Sun snack'], purchased: false },
  { productId: 'p005', quantityNeeded: 400, quantityUnit: 'g', packsNeeded: 1, totalCost: 28.95, usedInMeals: ['Wed dinner', 'Sun dinner'], purchased: false },
  { productId: 'p010', quantityNeeded: 310, quantityUnit: 'g', packsNeeded: 1, totalCost: 12.95, usedInMeals: ['Mon lunch', 'Fri lunch', 'Thu dinner'], purchased: false },
  { productId: 'p027', quantityNeeded: 100, quantityUnit: 'ml', packsNeeded: 1, totalCost: 34.95, usedInMeals: ['Mon dinner', 'Wed dinner', 'Fri dinner'], purchased: false },
  { productId: 'p015', quantityNeeded: 200, quantityUnit: 'g', packsNeeded: 1, totalCost: 9.95, usedInMeals: ['Wed lunch', 'Sat lunch'], purchased: false },
];
