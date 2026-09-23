export type ProductCategory = 'Protein' | 'Carbs' | 'Fruit & Vegetables' | 'Dairy' | 'Other';

export interface Product {
  id: string;
  name: string;
  brand: string;
  store: string;
  category: ProductCategory;
  packageSize: number;
  packageUnit: string;
  price: number;
  regularPrice: number;
  pricePerKg: number;
  isDiscounted: boolean;
  discountType?: string;
  promotionStart?: string;
  promotionEnd?: string;
  caloriesPer100g: number;
  proteinPer100g: number;
  carbsPer100g: number;
  fatPer100g: number;
}

export interface MealIngredient {
  productId: string;
  name: string;
  quantity: number;
  unit: string;
  estimatedCost: number;
}

export type MealType = 'breakfast' | 'lunch' | 'snack' | 'dinner';

export interface Meal {
  id: string;
  name: string;
  mealType: MealType;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  estimatedCost: number;
  ingredients: MealIngredient[];
}

export interface DayPlan {
  dayName: string;
  dayShort: string;
  meals: Meal[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalCost: number;
}

export interface WeeklyPlan {
  days: DayPlan[];
  totalCost: number;
  regularCost: number;
  savings: number;
  productsCount: number;
  discountedProductsCount: number;
}

export interface ShoppingItem {
  productId: string;
  quantityNeeded: number;
  quantityUnit: string;
  packsNeeded: number;
  totalCost: number;
  usedInMeals: string[];
  purchased: boolean;
}

export type UserGoal = 'lose_fat' | 'maintain' | 'build_muscle';

export interface FamilyMember {
  id: string;
  name: string;
  email?: string;
  status: 'pending' | 'active';
}

export type ShoppingPreference = 'simplest' | 'balanced' | 'cheapest';
export type MaxStores = 1 | 2 | 3 | null;

export interface UserSettings {
  goal: UserGoal;
  dailyCalories: number;
  dailyProtein: number;
  weeklyBudget: number;
  foodPreferences: string[];
  foodExclusions: string[];
  mealsPerDay: number;
  weight: number;   // kg
  height: number;   // cm
  age: number;
  sex: 'male' | 'female';
  familyMembers: FamilyMember[];
  preferredStores: string[];   // store names; empty = "anywhere"
  maxStoresPerTrip: MaxStores; // null = no preference
  shoppingPreference: ShoppingPreference;
}
