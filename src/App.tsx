import { useState, useEffect, useRef } from 'react';
import type { WeeklyPlan, ShoppingItem, Meal, UserSettings, UserGoal, Product, ShoppingPreference, MaxStores } from './types';
import { DEMO_PRODUCTS } from './data/products';
import { DEFAULT_WEEKLY_PLAN, DEFAULT_SHOPPING_LIST, SWAP_ALTERNATIVES } from './data/weeklyPlan';
import {
  ALL_RECIPES,
  PRIMARY_CATEGORIES,
  recipeImage,
  findRecipeForMeal,
  type Recipe,
} from './data/recipeLibrary';

// ─── Icons ────────────────────────────────────────────────────────────────────
const Icon = {
  plan: (active: boolean) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="18" height="16" rx="3" stroke={active ? '#2D6A4F' : '#9CA3AF'} strokeWidth="1.8"/>
      <path d="M8 2v4M16 2v4M3 10h18" stroke={active ? '#2D6A4F' : '#9CA3AF'} strokeWidth="1.8" strokeLinecap="round"/>
      <rect x="7" y="14" width="4" height="4" rx="1" fill={active ? '#2D6A4F' : '#9CA3AF'}/>
    </svg>
  ),
  shop: (active: boolean) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke={active ? '#2D6A4F' : '#9CA3AF'} strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M3 6h18M16 10a4 4 0 01-8 0" stroke={active ? '#2D6A4F' : '#9CA3AF'} strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  progress: (active: boolean) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M3 20l5-8 4 5 4-9 5 12" stroke={active ? '#2D6A4F' : '#9CA3AF'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  profile: (active: boolean) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" stroke={active ? '#2D6A4F' : '#9CA3AF'} strokeWidth="1.8"/>
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke={active ? '#2D6A4F' : '#9CA3AF'} strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  recipes: (active: boolean) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 2C8 2 5 5 5 9c0 3.5 2.2 6.4 5.3 7.6L12 22l1.7-5.4C16.8 15.4 19 12.5 19 9c0-4-3-7-7-7z" stroke={active ? '#2D6A4F' : '#9CA3AF'} strokeWidth="1.8"/>
    </svg>
  ),
  back: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M15 18l-6-6 6-6" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  check: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M5 12l5 5L20 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  swap: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  chevronRight: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M9 18l6-6-6-6" stroke="#9CA3AF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  tag: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="7" cy="7" r="1.5" fill="currentColor"/>
    </svg>
  ),
  spark: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" fill="#2D6A4F"/>
    </svg>
  ),
  clock: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  fire: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M12 2c0 0 4 4 4 8a4 4 0 01-8 0c0-2 1-4 1-4s-2 2-2 5a6 6 0 0012 0c0-6-4-9-7-9z" fill="#F97316"/>
    </svg>
  ),
  people: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="9" cy="7" r="3" stroke="#6B7280" strokeWidth="1.8"/>
      <circle cx="16" cy="7" r="3" stroke="#6B7280" strokeWidth="1.8"/>
      <path d="M2 19c0-3.3 3.1-6 7-6" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M22 19c0-3.3-3.1-6-7-6" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  link: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  mail: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
      <path d="M2 8l10 6 10-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const fmt = (n: number) => n.toFixed(2).replace('.', ',');
const productById = (id: string): Product | undefined => DEMO_PRODUCTS.find(p => p.id === id);
const mealTypeLabel = (t: string) => ({ breakfast: 'Breakfast', lunch: 'Lunch', snack: 'Snack', dinner: 'Dinner' }[t] ?? t);
const mealTypeEmoji = (t: string) => ({ breakfast: '☀️', lunch: '🥗', snack: '🍎', dinner: '🍽️' }[t] ?? '🍴');
const goalLabel = (g: UserGoal) => ({ lose_fat: 'Lose fat', maintain: 'Maintain weight', build_muscle: 'Build muscle' }[g]);

function calcTDEE(weight: number, height: number, age: number, sex: 'male' | 'female', goal: UserGoal): { calories: number; protein: number } {
  if (!weight || !height || !age) return { calories: 2200, protein: 150 };
  const bmr = sex === 'male'
    ? 10 * weight + 6.25 * height - 5 * age + 5
    : 10 * weight + 6.25 * height - 5 * age - 161;
  const tdee = bmr * 1.55;
  const calories = Math.round(
    goal === 'lose_fat' ? tdee - 500 :
    goal === 'build_muscle' ? tdee + 300 : tdee
  );
  const protein = Math.round(
    goal === 'lose_fat' ? weight * 2.2 :
    goal === 'build_muscle' ? weight * 2.4 : weight * 1.6
  );
  return { calories: Math.max(1200, calories), protein };
}

function fmtTime(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

// ─── Types ────────────────────────────────────────────────────────────────────
type Screen = 'welcome' | 'onboarding' | 'preferences' | 'generating' | 'main';
type Tab = 'plan' | 'shop' | 'progress' | 'profile';

// ─── Macro Bar ─────────────────────────────────────────────────────────────────
function MacroBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="w-16 text-[#6B7280] text-xs font-medium">{label}</span>
      <div className="flex-1 h-1.5 bg-[#EBEBEB] rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
      <span className="w-12 text-right text-xs font-semibold text-[#111827]">{value}g</span>
    </div>
  );
}

// ─── Badge ─────────────────────────────────────────────────────────────────────
function Badge({ children, variant = 'green' }: { children: React.ReactNode; variant?: 'green' | 'blue' | 'gray' }) {
  const cls = {
    green: 'bg-[#D8F3DC] text-[#2D6A4F]',
    blue: 'bg-blue-50 text-blue-700',
    gray: 'bg-[#F3F4F6] text-[#6B7280]',
  }[variant];
  return <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${cls}`}>{children}</span>;
}

// ─── Welcome Screen ────────────────────────────────────────────────────────────
function WelcomeScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="flex-1 flex flex-col items-center justify-center px-8 pt-20 pb-10">
        <div className="w-20 h-20 bg-[#D8F3DC] rounded-3xl flex items-center justify-center mb-8 shadow-sm">
          <span className="text-4xl">🛒</span>
        </div>
        <div className="text-center mb-3">
          <span className="text-[#2D6A4F] text-sm font-semibold tracking-widest uppercase">MacroCart</span>
        </div>
        <h1 className="text-[2.4rem] font-bold text-[#111827] leading-tight text-center mb-4">
          Your week of meals,<br />already figured out.
        </h1>
        <p className="text-[#6B7280] text-center text-base leading-relaxed max-w-xs">
          Delicious meals based on your preferences, goals, family and grocery budget.
        </p>
        <div className="mt-4 flex items-center gap-2 px-4 py-2 bg-[#F7F7F5] rounded-full">
          {Icon.spark()}
          <span className="text-[#2D6A4F] text-xs font-semibold">Good food · Less planning · Smarter shopping</span>
        </div>
      </div>
      <div className="px-6 pb-12 space-y-3">
        <button
          onClick={onStart}
          className="w-full py-4 bg-[#2D6A4F] text-white rounded-2xl font-bold text-base tracking-wide active:scale-[0.98] transition-transform shadow-lg shadow-[#2D6A4F]/20"
        >
          Build my plan
        </button>
        <p className="text-center text-[#9CA3AF] text-sm">Takes about 2 minutes · No account needed</p>
      </div>
    </div>
  );
}

// ─── Onboarding ────────────────────────────────────────────────────────────────
function OnboardingScreen({ settings, onChange, onNext }: {
  settings: UserSettings;
  onChange: (s: Partial<UserSettings>) => void;
  onNext: () => void;
}) {
  const [step, setStep] = useState(0);
  const totalSteps = 6;

  const goals: { id: UserGoal; label: string; emoji: string; desc: string }[] = [
    { id: 'lose_fat', label: 'Lose fat', emoji: '🔥', desc: 'Caloric deficit with high protein' },
    { id: 'maintain', label: 'Maintain weight', emoji: '⚖️', desc: 'Balanced nutrition, steady energy' },
    { id: 'build_muscle', label: 'Build muscle', emoji: '💪', desc: 'High protein, caloric surplus' },
  ];

  const budgets = [
    { label: '350 DKK', value: 350 },
    { label: '450 DKK', value: 450 },
    { label: '550 DKK', value: 550 },
  ];

  const DK_STORES = ['Lidl', 'REMA 1000', 'Netto', 'Føtex', 'Bilka', '365discount'];

  const shoppingPrefs: { id: ShoppingPreference; label: string; desc: string; emoji: string }[] = [
    { id: 'simplest', label: 'Simplest trip', emoji: '🏪', desc: 'One store, even if slightly pricier' },
    { id: 'balanced', label: 'Best balance', emoji: '⚖️', desc: '1–2 stores when savings are meaningful' },
    { id: 'cheapest', label: 'Lowest cost', emoji: '💰', desc: 'Optimise for best prices across stores' },
  ];

  const maxStoreOptions: { value: MaxStores; label: string }[] = [
    { value: 1, label: '1 store' },
    { value: 2, label: '2 stores' },
    { value: 3, label: '3 stores' },
    { value: null, label: 'No limit' },
  ];

  const toggleStore = (name: string) => {
    if (name === 'anywhere') {
      onChange({ preferredStores: [] });
    } else {
      const current = settings.preferredStores ?? [];
      const next = current.includes(name) ? current.filter(s => s !== name) : [...current, name];
      onChange({ preferredStores: next });
    }
  };

  const recommendation = calcTDEE(settings.weight, settings.height, settings.age, settings.sex, settings.goal);

  const next = () => {
    // Auto-apply TDEE when leaving the body metrics step
    if (step === 1 && settings.weight && settings.height && settings.age) {
      const rec = calcTDEE(settings.weight, settings.height, settings.age, settings.sex, settings.goal);
      onChange({ dailyCalories: rec.calories, dailyProtein: rec.protein });
    }
    if (step < totalSteps - 1) setStep(s => s + 1);
    else onNext();
  };

  const prev = () => setStep(s => Math.max(0, s - 1));

  const stepContent = () => {
    switch (step) {
      case 0:
        return (
          <div>
            <h2 className="text-2xl font-bold text-[#111827] mb-1">What's your goal?</h2>
            <p className="text-[#6B7280] mb-6">This shapes your meal plan and calories.</p>
            <div className="space-y-3">
              {goals.map(g => (
                <button
                  key={g.id}
                  onClick={() => onChange({ goal: g.id })}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${
                    settings.goal === g.id
                      ? 'border-[#2D6A4F] bg-[#D8F3DC]'
                      : 'border-[#EBEBEB] bg-white'
                  }`}
                >
                  <span className="text-2xl">{g.emoji}</span>
                  <div>
                    <div className="font-semibold text-[#111827]">{g.label}</div>
                    <div className="text-xs text-[#6B7280]">{g.desc}</div>
                  </div>
                  {settings.goal === g.id && (
                    <div className="ml-auto w-6 h-6 bg-[#2D6A4F] rounded-full flex items-center justify-center">{Icon.check()}</div>
                  )}
                </button>
              ))}
            </div>
          </div>
        );

      case 1: {
        const rec = calcTDEE(settings.weight, settings.height, settings.age, settings.sex, settings.goal);
        const hasData = settings.weight > 0 && settings.height > 0 && settings.age > 0;
        return (
          <div>
            <h2 className="text-2xl font-bold text-[#111827] mb-1">About you</h2>
            <p className="text-[#6B7280] mb-6">Used to calculate your personal calorie needs.</p>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">Sex</label>
                  <div className="flex gap-2">
                    {(['male', 'female'] as const).map(s => (
                      <button
                        key={s}
                        onClick={() => onChange({ sex: s })}
                        className={`flex-1 py-3 rounded-2xl border-2 font-semibold text-sm capitalize transition-all ${
                          settings.sex === s
                            ? 'border-[#2D6A4F] bg-[#D8F3DC] text-[#2D6A4F]'
                            : 'border-[#EBEBEB] bg-white text-[#6B7280]'
                        }`}
                      >
                        {s === 'male' ? '♂ Male' : '♀ Female'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">Age</label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    placeholder="25"
                    value={settings.age || ''}
                    onChange={e => onChange({ age: Number(e.target.value) })}
                    className="flex-1 border-2 border-[#EBEBEB] rounded-xl px-4 py-3 text-lg font-bold text-[#111827] focus:border-[#2D6A4F] outline-none"
                  />
                  <span className="text-[#6B7280] font-medium w-8">yr</span>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">Weight</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="75"
                      value={settings.weight || ''}
                      onChange={e => onChange({ weight: Number(e.target.value) })}
                      className="flex-1 border-2 border-[#EBEBEB] rounded-xl px-4 py-3 text-lg font-bold text-[#111827] focus:border-[#2D6A4F] outline-none"
                    />
                    <span className="text-[#6B7280] font-medium text-sm">kg</span>
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">Height</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="175"
                      value={settings.height || ''}
                      onChange={e => onChange({ height: Number(e.target.value) })}
                      className="flex-1 border-2 border-[#EBEBEB] rounded-xl px-4 py-3 text-lg font-bold text-[#111827] focus:border-[#2D6A4F] outline-none"
                    />
                    <span className="text-[#6B7280] font-medium text-sm">cm</span>
                  </div>
                </div>
              </div>

              {hasData && (
                <div className="bg-gradient-to-r from-[#D8F3DC] to-[#B7E4C7] rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    {Icon.spark()}
                    <span className="text-[#2D6A4F] font-semibold text-sm">Your Mifflin-St Jeor estimate</span>
                  </div>
                  <div className="flex gap-4">
                    <div>
                      <div className="text-[#2D6A4F] text-xs mb-0.5">Daily calories</div>
                      <div className="text-[#111827] font-bold text-xl">{rec.calories.toLocaleString()} kcal</div>
                    </div>
                    <div>
                      <div className="text-[#2D6A4F] text-xs mb-0.5">Protein target</div>
                      <div className="text-[#111827] font-bold text-xl">{rec.protein}g</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      }

      case 2:
        return (
          <div>
            <h2 className="text-2xl font-bold text-[#111827] mb-1">Daily calories</h2>
            <p className="text-[#6B7280] mb-6">Calculated from your body metrics and goal.</p>
            {recommendation.calories > 0 && (
              <div className="bg-[#D8F3DC] rounded-2xl p-4 mb-6 flex items-center gap-3">
                {Icon.spark()}
                <div>
                  <div className="text-[#2D6A4F] font-semibold text-sm">Personalised recommendation</div>
                  <div className="text-[#111827] font-bold text-xl">{recommendation.calories.toLocaleString()} kcal/day</div>
                </div>
              </div>
            )}
            <label className="block text-sm font-semibold text-[#111827] mb-2">Adjust if needed</label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                value={settings.dailyCalories}
                onChange={e => onChange({ dailyCalories: Number(e.target.value) })}
                className="flex-1 border-2 border-[#EBEBEB] rounded-xl px-4 py-3 text-lg font-bold text-[#111827] focus:border-[#2D6A4F] outline-none"
              />
              <span className="text-[#6B7280] font-medium">kcal</span>
            </div>
          </div>
        );

      case 3:
        return (
          <div>
            <h2 className="text-2xl font-bold text-[#111827] mb-1">Daily protein target</h2>
            <p className="text-[#6B7280] mb-6">Essential for your goal progress.</p>
            <div className="text-center mb-6">
              <div className="text-6xl font-bold text-[#111827]">{settings.dailyProtein}<span className="text-2xl text-[#6B7280] ml-1">g</span></div>
              <div className="text-[#6B7280] text-sm mt-1">per day · {settings.weight > 0 ? `${(settings.dailyProtein / settings.weight).toFixed(1)}g/kg bodyweight` : ''}</div>
            </div>
            <input
              type="range"
              min={80} max={250} step={5}
              value={settings.dailyProtein}
              onChange={e => onChange({ dailyProtein: Number(e.target.value) })}
              className="w-full accent-[#2D6A4F]"
            />
            <div className="flex justify-between text-xs text-[#9CA3AF] mt-1">
              <span>80g</span><span>250g</span>
            </div>
            <div className="mt-4 p-3 bg-[#F7F7F5] rounded-xl">
              <div className="text-xs text-[#6B7280]">That's <span className="font-bold text-[#111827]">{(settings.dailyProtein / (settings.dailyCalories / 100)).toFixed(1)}%</span> of your calories from protein</div>
            </div>
          </div>
        );

      case 4:
        return (
          <div>
            <h2 className="text-2xl font-bold text-[#111827] mb-1">Weekly grocery budget</h2>
            <p className="text-[#6B7280] mb-6">We'll optimise your plan to stay within budget.</p>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {budgets.map(b => (
                <button
                  key={b.value}
                  onClick={() => onChange({ weeklyBudget: b.value })}
                  className={`py-4 rounded-2xl border-2 font-bold text-base transition-all ${
                    settings.weeklyBudget === b.value
                      ? 'border-[#2D6A4F] bg-[#D8F3DC] text-[#2D6A4F]'
                      : 'border-[#EBEBEB] bg-white text-[#111827]'
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>
            <div className="border-2 border-[#EBEBEB] rounded-2xl p-3 flex items-center gap-2">
              <span className="text-[#6B7280] text-sm">Custom:</span>
              <input
                type="number"
                value={settings.weeklyBudget}
                onChange={e => onChange({ weeklyBudget: Number(e.target.value) })}
                className="flex-1 font-bold text-[#111827] outline-none"
              />
              <span className="text-[#6B7280] text-sm font-medium">DKK</span>
            </div>
          </div>
        );

      case 5: {
        const anywhereSelected = (settings.preferredStores ?? []).length === 0;
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-[#111827] mb-1">Where do you shop?</h2>
              <p className="text-[#6B7280] mb-4">We'll use your preferred stores to estimate prices and find better-value ingredients.</p>

              {/* Anywhere option */}
              <button
                onClick={() => toggleStore('anywhere')}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left mb-3 ${
                  anywhereSelected ? 'border-[#2D6A4F] bg-[#D8F3DC]' : 'border-[#EBEBEB] bg-white'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-xl shadow-sm">🗺️</div>
                <div className="flex-1">
                  <div className="font-semibold text-[#111827]">I shop anywhere</div>
                  <div className="text-xs text-[#6B7280]">Recommended · most flexible</div>
                </div>
                {anywhereSelected && <div className="w-6 h-6 bg-[#2D6A4F] rounded-full flex items-center justify-center">{Icon.check()}</div>}
              </button>

              {/* Store list */}
              <div className="grid grid-cols-2 gap-2">
                {DK_STORES.map(name => {
                  const sel = (settings.preferredStores ?? []).includes(name);
                  return (
                    <button
                      key={name}
                      onClick={() => toggleStore(name)}
                      className={`flex items-center gap-3 p-3 rounded-2xl border-2 transition-all text-left ${
                        sel ? 'border-[#2D6A4F] bg-[#D8F3DC]' : 'border-[#EBEBEB] bg-white'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-base font-bold text-[#2D6A4F] shadow-sm shrink-0">
                        {name[0]}
                      </div>
                      <span className="text-sm font-semibold text-[#111827] leading-tight">{name}</span>
                      {sel && <div className="ml-auto w-5 h-5 bg-[#2D6A4F] rounded-full flex items-center justify-center shrink-0">{Icon.check()}</div>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Max stores per trip */}
            {!anywhereSelected && (settings.preferredStores ?? []).length > 1 && (
              <div>
                <div className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-3">Max stores per shopping trip</div>
                <div className="flex gap-2">
                  {maxStoreOptions.map(opt => (
                    <button
                      key={String(opt.value)}
                      onClick={() => onChange({ maxStoresPerTrip: opt.value })}
                      className={`flex-1 py-2.5 rounded-xl border-2 text-xs font-bold transition-all ${
                        settings.maxStoresPerTrip === opt.value
                          ? 'border-[#2D6A4F] bg-[#D8F3DC] text-[#2D6A4F]'
                          : 'border-[#EBEBEB] bg-white text-[#6B7280]'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Shopping preference */}
            <div>
              <div className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-3">Shopping preference</div>
              <div className="space-y-2">
                {shoppingPrefs.map(p => (
                  <button
                    key={p.id}
                    onClick={() => onChange({ shoppingPreference: p.id })}
                    className={`w-full flex items-center gap-3 p-3.5 rounded-2xl border-2 transition-all text-left ${
                      settings.shoppingPreference === p.id
                        ? 'border-[#2D6A4F] bg-[#D8F3DC]'
                        : 'border-[#EBEBEB] bg-white'
                    }`}
                  >
                    <span className="text-xl">{p.emoji}</span>
                    <div className="flex-1">
                      <div className="font-semibold text-[#111827] text-sm">{p.label}</div>
                      <div className="text-xs text-[#6B7280]">{p.desc}</div>
                    </div>
                    {settings.shoppingPreference === p.id && (
                      <div className="w-5 h-5 bg-[#2D6A4F] rounded-full flex items-center justify-center shrink-0">{Icon.check()}</div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      }

      default: return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="px-6 pt-14 pb-4 flex items-center gap-4">
        {step > 0 && (
          <button onClick={prev} className="w-10 h-10 flex items-center justify-center rounded-full bg-[#F7F7F5]">
            {Icon.back()}
          </button>
        )}
        <div className="flex-1 h-1.5 bg-[#EBEBEB] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#2D6A4F] rounded-full transition-all duration-500"
            style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
          />
        </div>
        <span className="text-xs text-[#9CA3AF] font-medium whitespace-nowrap">{step + 1} / {totalSteps}</span>
      </div>

      <div className="flex-1 px-6 pt-4 overflow-y-auto">
        {stepContent()}
      </div>

      <div className="px-6 pb-10 pt-4">
        <button
          onClick={next}
          className="w-full py-4 bg-[#2D6A4F] text-white rounded-2xl font-bold text-base tracking-wide active:scale-[0.98] transition-transform shadow-lg shadow-[#2D6A4F]/20"
        >
          {step === totalSteps - 1 ? 'Continue' : 'Next'}
        </button>
      </div>
    </div>
  );
}

// ─── Preferences Screen ────────────────────────────────────────────────────────
function PreferencesScreen({ settings, onChange, onGenerate }: {
  settings: UserSettings;
  onChange: (s: Partial<UserSettings>) => void;
  onGenerate: () => void;
}) {
  const foodOptions = ['Chicken', 'Beef', 'Pork', 'Fish', 'Eggs', 'Dairy', 'Rice', 'Pasta', 'Potatoes', 'Bread', 'Oats', 'Fruit', 'Vegetables'];
  const exclusions = ['Pork', 'Fish', 'Lactose', 'Gluten', 'Vegetarian', 'No restrictions'];
  const mealCounts = [3, 4, 5, 6];

  const toggle = (arr: string[], item: string): string[] =>
    arr.includes(item) ? arr.filter(x => x !== item) : [...arr, item];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="px-6 pt-14 pb-4">
        <h2 className="text-2xl font-bold text-[#111827]">Food preferences</h2>
        <p className="text-[#6B7280] mt-1">Your plan will be built around your choices.</p>
      </div>

      <div className="flex-1 px-6 overflow-y-auto pb-4 space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-[#6B7280] uppercase tracking-wider mb-3">What do you like to eat?</h3>
          <div className="flex flex-wrap gap-2">
            {foodOptions.map(f => (
              <button
                key={f}
                onClick={() => onChange({ foodPreferences: toggle(settings.foodPreferences, f) })}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all border-2 ${
                  settings.foodPreferences.includes(f)
                    ? 'border-[#2D6A4F] bg-[#D8F3DC] text-[#2D6A4F]'
                    : 'border-[#EBEBEB] bg-white text-[#6B7280]'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-[#6B7280] uppercase tracking-wider mb-3">Anything you avoid?</h3>
          <div className="flex flex-wrap gap-2">
            {exclusions.map(f => (
              <button
                key={f}
                onClick={() => {
                  if (f === 'No restrictions') onChange({ foodExclusions: [] });
                  else onChange({ foodExclusions: toggle(settings.foodExclusions, f) });
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all border-2 ${
                  (f === 'No restrictions' && settings.foodExclusions.length === 0) || settings.foodExclusions.includes(f)
                    ? 'border-[#EF4444] bg-[#FEE2E2] text-[#EF4444]'
                    : 'border-[#EBEBEB] bg-white text-[#6B7280]'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-[#6B7280] uppercase tracking-wider mb-3">Meals per day</h3>
          <div className="flex gap-3">
            {mealCounts.map(n => (
              <button
                key={n}
                onClick={() => onChange({ mealsPerDay: n })}
                className={`flex-1 py-3 rounded-2xl border-2 font-bold text-base transition-all ${
                  settings.mealsPerDay === n
                    ? 'border-[#2D6A4F] bg-[#D8F3DC] text-[#2D6A4F]'
                    : 'border-[#EBEBEB] bg-white text-[#111827]'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-6 pb-10 pt-4">
        <button
          onClick={onGenerate}
          className="w-full py-4 bg-[#2D6A4F] text-white rounded-2xl font-bold text-base tracking-wide active:scale-[0.98] transition-transform shadow-lg shadow-[#2D6A4F]/20"
        >
          Create my plan ✨
        </button>
      </div>
    </div>
  );
}

// ─── Generating Screen ─────────────────────────────────────────────────────────
function GeneratingScreen() {
  const msgs = [
    "Checking this week's prices…",
    "Matching foods to your macros…",
    "Building the cheapest combination…",
    "Creating your weekly plan…",
  ];
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % msgs.length), 1200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-8">
      <div className="relative mb-10">
        <div className="w-24 h-24 border-4 border-[#D8F3DC] border-t-[#2D6A4F] rounded-full animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center text-3xl">✨</div>
      </div>
      <h2 className="text-xl font-bold text-[#111827] mb-3 text-center">Building your plan</h2>
      <p className="text-[#6B7280] text-center text-sm min-h-[1.5rem] transition-all">{msgs[idx]}</p>
      <div className="mt-8 flex gap-2">
        {msgs.map((_, i) => (
          <div key={i} className={`w-2 h-2 rounded-full transition-all ${i === idx ? 'bg-[#2D6A4F] scale-125' : 'bg-[#EBEBEB]'}`} />
        ))}
      </div>
    </div>
  );
}

// ─── Meal Card ─────────────────────────────────────────────────────────────────
function MealCard({ meal, onTap, onSwap }: { meal: Meal; onTap: () => void; onSwap: (e: React.MouseEvent) => void }) {
  const recipe = findRecipeForMeal(meal.name, meal.mealType);
  const imgSrc = recipe ? recipeImage(recipe.primaryCategory) : recipeImage('vegetarian');

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#EBEBEB]" onClick={onTap}>
      <div className="relative h-28 overflow-hidden">
        <img src={imgSrc} alt={meal.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-2 left-3 right-3 flex items-end justify-between">
          <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
            <span className="text-xs">{mealTypeEmoji(meal.mealType)}</span>
            <span className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wide">{mealTypeLabel(meal.mealType)}</span>
          </div>
          <button
            onClick={onSwap}
            className="flex items-center gap-1 text-xs font-semibold text-[#2D6A4F] bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full active:opacity-70"
          >
            {Icon.swap()}<span>Swap</span>
          </button>
        </div>
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-[#111827] text-sm leading-snug mb-2">{meal.name}</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs text-[#6B7280]"><span className="font-bold text-[#111827]">{meal.calories}</span> kcal</span>
            <span className="text-xs text-[#6B7280]"><span className="font-bold text-[#2D6A4F]">{meal.protein}g</span> protein</span>
          </div>
          <span className="font-bold text-[#111827] text-sm">{fmt(meal.estimatedCost)} kr</span>
        </div>
      </div>
    </div>
  );
}

// ─── Plan Screen ───────────────────────────────────────────────────────────────
function PlanScreen({
  plan, settings, selectedDay, onDaySelect, onMealTap, onSwapTap,
}: {
  plan: WeeklyPlan;
  settings: UserSettings;
  selectedDay: number;
  onDaySelect: (i: number) => void;
  onMealTap: (meal: Meal, dayIdx: number) => void;
  onSwapTap: (meal: Meal, dayIdx: number) => void;
}) {
  const day = plan.days[selectedDay];
  const under = settings.weeklyBudget - plan.totalCost;

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="px-5 pt-6 pb-4 bg-[#F7F7F5]">
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-2xl font-bold text-[#111827]">This Week</h1>
          <Badge variant="green">{Icon.spark()} AI optimised</Badge>
        </div>
      </div>

      {/* Summary card */}
      <div className="px-5 pb-4">
        <div className="bg-[#2D6A4F] rounded-3xl p-5 text-white shadow-xl shadow-[#2D6A4F]/20">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="text-[#D8F3DC] text-xs font-semibold uppercase tracking-wider mb-1">Daily target</div>
              <div className="text-2xl font-bold">{settings.dailyCalories.toLocaleString()} kcal</div>
              <div className="text-[#D8F3DC] text-sm">{settings.dailyProtein}g protein/day</div>
            </div>
            <div className="text-right">
              <div className="text-[#D8F3DC] text-xs font-semibold uppercase tracking-wider mb-1">Est. cost</div>
              <div className="text-2xl font-bold">{plan.totalCost} kr</div>
              <div className="text-[#52B788] text-xs font-semibold">
                {under > 0 ? `↓ ${under} kr under budget` : `↑ ${Math.abs(under)} kr over`}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2">
            <span className="text-lg">🏷️</span>
            <span className="text-white text-sm font-medium">Saved <span className="font-bold">{plan.savings} kr</span> using this week's best prices</span>
          </div>
        </div>
      </div>

      {/* Day selector — modern with kcal + progress bar */}
      <div className="px-5 mb-3">
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {plan.days.map((d, i) => {
            const pct = settings.dailyCalories > 0
              ? Math.min(100, Math.round((d.totalCalories / settings.dailyCalories) * 100))
              : 0;
            const isActive = i === selectedDay;
            const overTarget = d.totalCalories > settings.dailyCalories * 1.1;
            const barColor = overTarget ? 'bg-orange-300' : isActive ? 'bg-white/80' : 'bg-[#2D6A4F]/60';
            return (
              <button
                key={d.dayShort}
                onClick={() => onDaySelect(i)}
                className={`flex flex-col items-center min-w-[46px] py-3 px-1.5 rounded-2xl transition-all ${
                  isActive
                    ? 'bg-[#2D6A4F] text-white shadow-lg shadow-[#2D6A4F]/30'
                    : 'bg-white text-[#6B7280] border border-[#EBEBEB] hover:border-[#2D6A4F]/30'
                }`}
              >
                <span className={`text-[10px] font-bold uppercase tracking-wide ${isActive ? 'text-[#D8F3DC]' : 'text-[#9CA3AF]'}`}>
                  {d.dayShort}
                </span>
                <span className={`text-xs font-extrabold mt-1 tabular-nums ${isActive ? 'text-white' : 'text-[#111827]'}`}>
                  {d.totalCalories > 0 ? d.totalCalories.toLocaleString() : '–'}
                </span>
                <div className={`w-full h-1 rounded-full mt-1.5 overflow-hidden ${isActive ? 'bg-white/20' : 'bg-[#EBEBEB]'}`}>
                  <div
                    className={`h-full rounded-full transition-all ${barColor}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className={`text-[9px] mt-1 ${isActive ? 'text-[#D8F3DC]' : 'text-[#9CA3AF]'}`}>kcal</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Day meals */}
      <div className="flex-1 overflow-y-auto px-5 pb-20">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-[#111827] text-base">{day.dayName}</h2>
          <div className="text-xs text-[#6B7280] font-medium">
            {day.totalCalories} kcal · {day.totalProtein}g protein
          </div>
        </div>
        <div className="space-y-3">
          {day.meals.map(meal => (
            <MealCard
              key={meal.id}
              meal={meal}
              onTap={() => onMealTap(meal, selectedDay)}
              onSwap={(e) => { e.stopPropagation(); onSwapTap(meal, selectedDay); }}
            />
          ))}
        </div>
        <div className="mt-4 bg-white rounded-2xl p-4 border border-[#EBEBEB]">
          <div className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-3">Daily macros</div>
          <div className="space-y-2">
            <MacroBar label="Protein" value={day.totalProtein} max={settings.dailyProtein} color="#2D6A4F" />
            <MacroBar label="Carbs" value={day.totalCarbs} max={Math.round(settings.dailyCalories * 0.45 / 4)} color="#52B788" />
            <MacroBar label="Fat" value={day.totalCalories > 0 ? Math.round(day.totalCalories * 0.25 / 9) : 0} max={Math.round(settings.dailyCalories * 0.25 / 9)} color="#D8F3DC" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Meal Detail Screen ────────────────────────────────────────────────────────
function MealDetailScreen({ meal, onBack, onSwap }: { meal: Meal; onBack: () => void; onSwap: () => void }) {
  const [showInstructions, setShowInstructions] = useState(true);
  const recipe = findRecipeForMeal(meal.name, meal.mealType);
  const imgSrc = recipe ? recipeImage(recipe.primaryCategory, 800, 400) : recipeImage('vegetarian', 800, 400);

  return (
    <div className="flex flex-col h-full bg-[#F7F7F5]">
      {/* Hero image */}
      <div className="relative h-52 overflow-hidden shrink-0">
        <img src={imgSrc} alt={meal.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <button
          onClick={onBack}
          className="absolute top-12 left-4 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md"
        >
          {Icon.back()}
        </button>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xl">{mealTypeEmoji(meal.mealType)}</span>
            <span className="text-xs font-semibold text-white/80 uppercase tracking-wider">{mealTypeLabel(meal.mealType)}</span>
          </div>
          <h1 className="text-xl font-bold text-white leading-snug">{meal.name}</h1>
        </div>
      </div>

      {/* Nutrition strip */}
      <div className="bg-white px-5 py-4 shrink-0">
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: 'Calories', value: `${meal.calories}`, unit: 'kcal', color: '#111827' },
            { label: 'Protein', value: `${meal.protein}g`, unit: '', color: '#2D6A4F' },
            { label: 'Carbs', value: `${meal.carbs}g`, unit: '', color: '#52B788' },
            { label: 'Cost', value: `${fmt(meal.estimatedCost)}`, unit: 'kr', color: '#111827' },
          ].map(m => (
            <div key={m.label} className="bg-[#F7F7F5] rounded-2xl p-3 text-center">
              <div className="text-sm font-bold leading-none" style={{ color: m.color }}>{m.value}{m.unit}</div>
              <div className="text-[10px] text-[#9CA3AF] mt-1">{m.label}</div>
            </div>
          ))}
        </div>
        {recipe && (
          <div className="flex items-center gap-3 mt-3 text-xs text-[#6B7280]">
            <span className="flex items-center gap-1">{Icon.clock()} {fmtTime(recipe.totalTimeMinutes)}</span>
            <span className="w-1 h-1 rounded-full bg-[#EBEBEB]" />
            <span>Serves {recipe.servings}</span>
            <span className="w-1 h-1 rounded-full bg-[#EBEBEB]" />
            <span className="capitalize">{recipe.difficulty}</span>
          </div>
        )}
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pb-28">
        {/* Instructions / Recipe */}
        {recipe && (
          <div className="px-5 pt-5">
            {/* Recipe description */}
            {recipe.shortDescription && (
              <p className="text-sm text-[#6B7280] leading-relaxed mb-4">{recipe.shortDescription}</p>
            )}

            {/* Toggle tabs */}
            <div className="flex bg-[#EBEBEB] rounded-xl p-1 mb-4">
              <button
                onClick={() => setShowInstructions(true)}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                  showInstructions ? 'bg-white text-[#111827] shadow-sm' : 'text-[#6B7280]'
                }`}
              >
                How to cook
              </button>
              <button
                onClick={() => setShowInstructions(false)}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                  !showInstructions ? 'bg-white text-[#111827] shadow-sm' : 'text-[#6B7280]'
                }`}
              >
                Ingredients
              </button>
            </div>

            {showInstructions ? (
              <div className="space-y-3">
                {recipe.instructions.map((inst) => (
                  <div key={inst.step} className="flex gap-3">
                    <div className="w-7 h-7 rounded-xl bg-[#2D6A4F] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {inst.step}
                    </div>
                    <p className="text-sm text-[#374151] leading-relaxed flex-1">{inst.text}</p>
                  </div>
                ))}
                {recipe.reheatingMethod && (
                  <div className="mt-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
                    <div className="text-xs font-semibold text-amber-700 mb-1">Reheating</div>
                    <p className="text-xs text-amber-700">{recipe.reheatingMethod}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                {recipe.ingredients.map((ing, i) => (
                  <div key={i} className="bg-white rounded-2xl px-4 py-3 flex items-center justify-between border border-[#EBEBEB]">
                    <div>
                      <div className="font-medium text-[#111827] text-sm">{ing.name}</div>
                      {ing.notes && <div className="text-xs text-[#9CA3AF] mt-0.5">{ing.notes}</div>}
                    </div>
                    <div className="text-right shrink-0 ml-3">
                      <span className="font-semibold text-[#2D6A4F] text-sm">{ing.quantity} {ing.unit}</span>
                      {ing.optional && <div className="text-[10px] text-[#9CA3AF]">optional</div>}
                    </div>
                  </div>
                ))}
                {recipe.allergenAssessment && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
                    <div className="text-xs font-semibold text-amber-700 mb-1">⚠️ Allergen note</div>
                    <p className="text-xs text-amber-700">{recipe.allergenAssessment}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Fallback: demo meal ingredients when no recipe found */}
        {!recipe && (
          <div className="px-5 pt-5">
            <h2 className="font-semibold text-[#111827] mb-3">Ingredients</h2>
            <div className="space-y-2">
              {meal.ingredients.map((ing, i) => {
                const prod = productById(ing.productId);
                return (
                  <div key={i} className="bg-white rounded-2xl px-4 py-3 flex items-center justify-between border border-[#EBEBEB]">
                    <div>
                      <div className="font-medium text-[#111827] text-sm">{ing.name}</div>
                      <div className="text-xs text-[#9CA3AF]">{ing.quantity}{ing.unit} {prod?.isDiscounted ? '· 🏷️ On offer' : ''}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-[#111827] text-sm">~{fmt(ing.estimatedCost)} kr</div>
                      {prod && <div className="text-xs text-[#9CA3AF]">{prod.pricePerKg.toFixed(0)} kr/kg</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {recipe?.storageNotes && (
          <div className="mx-5 mt-4 bg-[#F7F7F5] rounded-xl px-4 py-3">
            <div className="text-xs font-semibold text-[#6B7280] mb-1">Storage</div>
            <p className="text-xs text-[#6B7280]">{recipe.storageNotes} · Fridge: {recipe.storageDaysFridge} days</p>
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 px-5 pb-8 pt-3 bg-white border-t border-[#EBEBEB] flex gap-3">
        <button
          onClick={onSwap}
          className="flex-1 py-4 border-2 border-[#2D6A4F] text-[#2D6A4F] rounded-2xl font-bold text-sm active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
        >
          {Icon.swap()} Swap meal
        </button>
        <button className="flex-1 py-4 bg-[#F7F7F5] text-[#111827] rounded-2xl font-bold text-sm active:scale-[0.98] transition-transform border border-[#EBEBEB]">
          Edit ingredients
        </button>
      </div>
    </div>
  );
}

// ─── Recipe Browse Screen ──────────────────────────────────────────────────────
function RecipeBrowseScreen({ onBack, onRecipeTap }: { onBack: () => void; onRecipeTap: (r: Recipe) => void }) {
  const [activeCat, setActiveCat] = useState('all');
  const [query, setQuery] = useState('');

  const filtered = ALL_RECIPES.filter(r => {
    const matchCat = activeCat === 'all' || r.primaryCategory === activeCat;
    const q = query.toLowerCase().trim();
    const matchQ = !q || r.name.toLowerCase().includes(q) ||
      r.shortDescription?.toLowerCase().includes(q) ||
      r.ingredients.some(i => i.name.toLowerCase().includes(q));
    return matchCat && matchQ;
  });

  return (
    <div className="flex flex-col h-full overflow-hidden bg-[#F7F7F5]">
      <div className="bg-white px-5 pt-14 pb-4 shrink-0">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-full bg-[#F7F7F5]">
            {Icon.back()}
          </button>
          <h1 className="text-xl font-bold text-[#111827]">Recipe Library</h1>
          <span className="ml-auto text-xs text-[#9CA3AF] font-medium">{ALL_RECIPES.length} recipes</span>
        </div>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] text-sm">🔍</span>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search recipes or ingredients…"
            className="w-full pl-8 pr-4 py-3 bg-[#F7F7F5] rounded-2xl text-sm text-[#111827] outline-none border border-[#EBEBEB] focus:border-[#2D6A4F]"
          />
        </div>
      </div>

      {/* Category pills */}
      <div className="shrink-0 px-5 py-3 flex gap-2 overflow-x-auto">
        {PRIMARY_CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCat(cat.id)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeCat === cat.id
                ? 'bg-[#2D6A4F] text-white'
                : 'bg-white text-[#6B7280] border border-[#EBEBEB]'
            }`}
          >
            <span>{cat.emoji}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto px-5 pb-24">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-center">
            <span className="text-4xl mb-3">🍽️</span>
            <p className="text-[#6B7280] text-sm">No recipes found</p>
            <button onClick={() => { setQuery(''); setActiveCat('all'); }} className="mt-2 text-[#2D6A4F] text-sm font-semibold">
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filtered.map(r => (
              <button
                key={r.id}
                onClick={() => onRecipeTap(r)}
                className="bg-white rounded-2xl overflow-hidden border border-[#EBEBEB] text-left active:opacity-80 transition-opacity"
              >
                <div className="relative h-28 overflow-hidden">
                  <img
                    src={recipeImage(r.primaryCategory)}
                    alt={r.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-1.5 left-2 flex items-center gap-1 bg-white/80 rounded-full px-1.5 py-0.5">
                    {Icon.clock()}
                    <span className="text-[10px] font-semibold text-[#111827]">{fmtTime(r.totalTimeMinutes)}</span>
                  </div>
                </div>
                <div className="p-2.5">
                  <h3 className="text-xs font-semibold text-[#111827] leading-snug line-clamp-2 mb-1.5">{r.name}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {Icon.fire()}
                      <span className="text-[10px] text-[#6B7280]">{r.nutritionPerServing.calories} kcal</span>
                    </div>
                    <span className="text-[10px] font-bold text-[#2D6A4F]">{r.nutritionPerServing.proteinGrams}g protein</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Recipe Detail Screen ──────────────────────────────────────────────────────
function RecipeDetailScreen({ recipe, onBack }: { recipe: Recipe; onBack: () => void }) {
  const [tab, setTab] = useState<'steps' | 'ingredients'>('steps');

  return (
    <div className="flex flex-col h-full bg-[#F7F7F5]">
      <div className="relative h-52 overflow-hidden shrink-0">
        <img src={recipeImage(recipe.primaryCategory, 800, 400)} alt={recipe.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <button
          onClick={onBack}
          className="absolute top-12 left-4 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md"
        >
          {Icon.back()}
        </button>
        <div className="absolute bottom-4 left-4 right-4">
          <h1 className="text-xl font-bold text-white leading-snug">{recipe.name}</h1>
          <div className="flex items-center gap-3 mt-1.5 text-white/80 text-xs">
            <span>{Icon.clock()} {fmtTime(recipe.totalTimeMinutes)}</span>
            <span>· Serves {recipe.servings}</span>
            <span>· {recipe.difficulty}</span>
          </div>
        </div>
      </div>

      <div className="bg-white px-5 py-4 shrink-0">
        <div className="grid grid-cols-4 gap-2 mb-3">
          {[
            { label: 'Calories', value: `${recipe.nutritionPerServing.calories}`, color: '#111827' },
            { label: 'Protein', value: `${recipe.nutritionPerServing.proteinGrams}g`, color: '#2D6A4F' },
            { label: 'Carbs', value: `${recipe.nutritionPerServing.carbsGrams}g`, color: '#52B788' },
            { label: 'Fat', value: `${recipe.nutritionPerServing.fatGrams}g`, color: '#6B7280' },
          ].map(m => (
            <div key={m.label} className="bg-[#F7F7F5] rounded-xl p-2.5 text-center">
              <div className="text-xs font-bold" style={{ color: m.color }}>{m.value}</div>
              <div className="text-[9px] text-[#9CA3AF] mt-0.5">{m.label}</div>
            </div>
          ))}
        </div>
        {recipe.shortDescription && (
          <p className="text-sm text-[#6B7280] leading-relaxed">{recipe.shortDescription}</p>
        )}
        {recipe.allergenAssessment && (
          <div className="mt-2 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2">
            <p className="text-xs text-amber-700">⚠️ {recipe.allergenAssessment}</p>
          </div>
        )}
      </div>

      <div className="px-5 pt-3 shrink-0">
        <div className="flex bg-[#EBEBEB] rounded-xl p-1">
          <button
            onClick={() => setTab('steps')}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${tab === 'steps' ? 'bg-white text-[#111827] shadow-sm' : 'text-[#6B7280]'}`}
          >
            How to cook
          </button>
          <button
            onClick={() => setTab('ingredients')}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${tab === 'ingredients' ? 'bg-white text-[#111827] shadow-sm' : 'text-[#6B7280]'}`}
          >
            Ingredients ({recipe.ingredients.length})
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 pb-24 space-y-3">
        {tab === 'steps'
          ? recipe.instructions.map(inst => (
              <div key={inst.step} className="flex gap-3">
                <div className="w-7 h-7 rounded-xl bg-[#2D6A4F] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  {inst.step}
                </div>
                <p className="text-sm text-[#374151] leading-relaxed flex-1">{inst.text}</p>
              </div>
            ))
          : recipe.ingredients.map((ing, i) => (
              <div key={i} className="bg-white rounded-2xl px-4 py-3 flex items-center justify-between border border-[#EBEBEB]">
                <div>
                  <div className="font-medium text-[#111827] text-sm">{ing.name}</div>
                  {ing.notes && <div className="text-xs text-[#9CA3AF]">{ing.notes}</div>}
                </div>
                <div className="text-right">
                  <span className="font-semibold text-[#2D6A4F] text-sm">{ing.quantity} {ing.unit}</span>
                  {ing.optional && <div className="text-[10px] text-[#9CA3AF]">optional</div>}
                </div>
              </div>
            ))
        }
        {tab === 'steps' && recipe.reheatingMethod && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
            <div className="text-xs font-semibold text-amber-700 mb-1">Reheating</div>
            <p className="text-xs text-amber-700">{recipe.reheatingMethod}</p>
          </div>
        )}
        {tab === 'steps' && recipe.storageNotes && (
          <div className="bg-[#F7F7F5] rounded-xl px-4 py-3">
            <div className="text-xs font-semibold text-[#6B7280] mb-1">Storage</div>
            <p className="text-xs text-[#6B7280]">{recipe.storageNotes} · Fridge: {recipe.storageDaysFridge} days</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Swap Sheet ────────────────────────────────────────────────────────────────
function SwapSheet({ meal, onClose, onSelect }: { meal: Meal; onClose: () => void; onSelect: (m: Meal) => void }) {
  const alternatives = SWAP_ALTERNATIVES[meal.mealType] ?? SWAP_ALTERNATIVES.lunch;
  const sheetRef = useRef<HTMLDivElement>(null);

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div ref={sheetRef} className="relative bg-white rounded-t-3xl px-5 pt-5 pb-10 shadow-2xl">
        <div className="w-10 h-1 bg-[#EBEBEB] rounded-full mx-auto mb-5" />
        <h2 className="text-xl font-bold text-[#111827] mb-1">Swap this meal</h2>
        <p className="text-[#6B7280] text-sm mb-4">Similar nutrition · different ingredients</p>
        <div className="space-y-3">
          {alternatives.map(alt => {
            const diff = alt.estimatedCost - meal.estimatedCost;
            return (
              <button
                key={alt.id}
                onClick={() => onSelect(alt)}
                className="w-full flex items-center justify-between p-4 bg-[#F7F7F5] rounded-2xl text-left active:bg-[#D8F3DC] transition-colors"
              >
                <div>
                  <div className="font-semibold text-[#111827] mb-1">{alt.name}</div>
                  <div className="flex items-center gap-3 text-xs text-[#6B7280]">
                    <span>{alt.calories} kcal</span>
                    <span className="text-[#2D6A4F] font-semibold">{alt.protein}g protein</span>
                  </div>
                </div>
                <div className="text-right shrink-0 ml-4">
                  <div className="font-bold text-[#111827]">{fmt(alt.estimatedCost)} kr</div>
                  <div className={`text-xs font-semibold mt-1 ${diff < 0 ? 'text-[#2D6A4F]' : 'text-[#6B7280]'}`}>
                    {diff < 0 ? `Save ${fmt(Math.abs(diff))} kr` : diff === 0 ? 'Same price' : `+${fmt(diff)} kr`}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Shop Screen ───────────────────────────────────────────────────────────────
function ShopScreen({
  shoppingList, plan, settings,
  onToggle, onProductTap,
}: {
  shoppingList: ShoppingItem[];
  plan: WeeklyPlan;
  settings: UserSettings;
  onToggle: (id: string) => void;
  onProductTap: (id: string) => void;
}) {
  const categories: Array<{ label: string; emoji: string }> = [
    { label: 'Protein', emoji: '🥩' },
    { label: 'Dairy', emoji: '🥛' },
    { label: 'Carbs', emoji: '🌾' },
    { label: 'Fruit & Vegetables', emoji: '🥦' },
    { label: 'Other', emoji: '🛒' },
  ];

  const purchased = shoppingList.filter(i => i.purchased).length;
  const pct = Math.round((purchased / shoppingList.length) * 100);
  const under = settings.weeklyBudget - plan.totalCost;

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="px-5 pt-6 pb-4 bg-[#F7F7F5]">
        <h1 className="text-2xl font-bold text-[#111827] mb-1">Shopping List</h1>
        <div className="flex items-center gap-3 text-sm text-[#6B7280]">
          <span>{shoppingList.length} items</span>
          <span>·</span>
          <span>{plan.discountedProductsCount} deals available</span>
          <span>·</span>
          <span className="text-[#2D6A4F] font-semibold">{purchased} checked</span>
        </div>
        <div className="mt-3 h-2 bg-[#EBEBEB] rounded-full overflow-hidden">
          <div className="h-full bg-[#2D6A4F] rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-48">
        {categories.map(cat => {
          const items = shoppingList.filter(item => {
            const prod = productById(item.productId);
            return prod?.category === cat.label;
          });
          if (items.length === 0) return null;

          return (
            <div key={cat.label} className="mb-5">
              <div className="flex items-center gap-2 mb-2">
                <span>{cat.emoji}</span>
                <span className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider">{cat.label}</span>
              </div>
              <div className="space-y-2">
                {items.map(item => {
                  const prod = productById(item.productId);
                  if (!prod) return null;
                  return (
                    <div
                      key={item.productId}
                      className={`bg-white rounded-2xl px-4 py-3 flex items-center gap-3 border border-[#EBEBEB] transition-opacity ${item.purchased ? 'opacity-50' : ''}`}
                    >
                      <button
                        onClick={() => onToggle(item.productId)}
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                          item.purchased ? 'bg-[#2D6A4F] border-[#2D6A4F]' : 'border-[#EBEBEB]'
                        }`}
                      >
                        {item.purchased && Icon.check()}
                      </button>
                      <div className="flex-1 min-w-0" onClick={() => onProductTap(item.productId)}>
                        <div className="font-medium text-[#111827] text-sm leading-snug">{prod.name}</div>
                        <div className="text-xs text-[#9CA3AF] mt-0.5">
                          Need: {item.quantityNeeded}{item.quantityUnit === 'pcs' ? '' : item.quantityUnit} · {item.packsNeeded}× {prod.packageSize}{prod.packageUnit}
                        </div>
                        {prod.isDiscounted && (
                          <div className="mt-1 flex items-center gap-1 text-xs font-semibold text-[#2D6A4F]">
                            {Icon.tag()}<span>{prod.discountType ?? 'Best-value deal'}</span>
                          </div>
                        )}
                      </div>
                      <div className="text-right shrink-0">
                        <div className="font-bold text-[#111827] text-sm">{fmt(item.totalCost)} kr</div>
                        {prod.isDiscounted && (
                          <div className="text-xs text-[#9CA3AF] line-through">{fmt(prod.regularPrice * item.packsNeeded)} kr</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer total */}
      <div className="absolute bottom-16 left-0 right-0 px-5 pb-3">
        <div className="bg-white rounded-2xl px-5 py-4 shadow-lg border border-[#EBEBEB]">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-[#6B7280]">Estimated total</span>
            <span className="font-bold text-[#111827] text-base">{plan.totalCost} kr</span>
          </div>
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-[#6B7280]">Budget</span>
            <span className="font-medium text-[#111827]">{settings.weeklyBudget} kr</span>
          </div>
          <div className="flex items-center justify-between text-sm pt-2 border-t border-[#EBEBEB]">
            <span className="text-[#6B7280]">Remaining</span>
            <span className={`font-bold ${under >= 0 ? 'text-[#2D6A4F]' : 'text-red-500'}`}>{under >= 0 ? '+' : ''}{under} kr</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Product Detail Screen ─────────────────────────────────────────────────────
function ProductDetailScreen({
  productId, shoppingList, plan, onBack,
}: {
  productId: string;
  shoppingList: ShoppingItem[];
  plan: WeeklyPlan;
  onBack: () => void;
}) {
  const [showAlts, setShowAlts] = useState(false);
  const prod = productById(productId);
  const item = shoppingList.find(i => i.productId === productId);
  if (!prod || !item) return null;

  const alternatives = DEMO_PRODUCTS.filter(p => p.category === prod.category && p.id !== prod.id).slice(0, 3);

  return (
    <div className="flex flex-col h-full bg-[#F7F7F5]">
      <div className="bg-white px-5 pt-14 pb-5">
        <button onClick={onBack} className="flex items-center gap-1 text-[#6B7280] mb-4 text-sm font-medium">
          {Icon.back()} Back
        </button>
        <div className="flex items-start gap-4">
          <div className="w-20 h-20 bg-[#F7F7F5] rounded-2xl flex items-center justify-center text-4xl border border-[#EBEBEB] shrink-0">
            🛍️
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs text-[#9CA3AF] font-semibold uppercase tracking-wider mb-1">{prod.brand}</div>
            <h1 className="font-bold text-[#111827] text-lg leading-snug">{prod.name}</h1>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl font-bold text-[#111827]">{fmt(prod.price)} kr</span>
              {prod.isDiscounted && <span className="text-sm text-[#9CA3AF] line-through">{fmt(prod.regularPrice)} kr</span>}
            </div>
          </div>
        </div>

        {prod.isDiscounted && (
          <div className="mt-3 flex items-center gap-2 bg-[#D8F3DC] rounded-xl px-3 py-2">
            {Icon.tag()}
            <span className="text-[#2D6A4F] font-semibold text-sm">{prod.discountType ?? 'Current deal'}{prod.promotionEnd ? ` · Until ${prod.promotionEnd}` : ''}</span>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5 pb-20 space-y-4">
        <div className="bg-white rounded-2xl p-4 border border-[#EBEBEB]">
          <h3 className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-3">Package</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div><span className="text-[#9CA3AF]">Size: </span><span className="font-semibold text-[#111827]">{prod.packageSize}{prod.packageUnit}</span></div>
            <div><span className="text-[#9CA3AF]">Price/kg: </span><span className="font-semibold text-[#111827]">{fmt(prod.pricePerKg)} kr</span></div>
            <div><span className="text-[#9CA3AF]">You need: </span><span className="font-semibold text-[#111827]">{item.packsNeeded} packs</span></div>
            <div><span className="text-[#9CA3AF]">Total: </span><span className="font-semibold text-[#2D6A4F]">{fmt(item.totalCost)} kr</span></div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-[#EBEBEB]">
          <h3 className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-3">Nutrition per 100g</h3>
          <div className="grid grid-cols-4 gap-2 text-center">
            {[
              { label: 'Calories', value: prod.caloriesPer100g, unit: 'kcal' },
              { label: 'Protein', value: prod.proteinPer100g, unit: 'g' },
              { label: 'Carbs', value: prod.carbsPer100g, unit: 'g' },
              { label: 'Fat', value: prod.fatPer100g, unit: 'g' },
            ].map(n => (
              <div key={n.label} className="bg-[#F7F7F5] rounded-xl py-3">
                <div className="font-bold text-[#111827] text-sm">{n.value}{n.unit}</div>
                <div className="text-xs text-[#9CA3AF] mt-0.5">{n.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-[#EBEBEB]">
          <h3 className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-3">Used in meals</h3>
          <div className="flex flex-wrap gap-2">
            {item.usedInMeals.map(m => <Badge key={m} variant="gray">{m}</Badge>)}
          </div>
        </div>

        <button
          onClick={() => setShowAlts(!showAlts)}
          className="w-full py-3 border-2 border-[#EBEBEB] bg-white rounded-2xl text-[#111827] font-semibold text-sm flex items-center justify-center gap-2"
        >
          🔄 Find alternative {showAlts ? '↑' : '↓'}
        </button>

        {showAlts && (
          <div className="space-y-2">
            {alternatives.map(alt => {
              const diff = alt.price - prod.price;
              return (
                <div key={alt.id} className="bg-white rounded-2xl px-4 py-3 border border-[#EBEBEB] flex items-center justify-between">
                  <div>
                    <div className="font-medium text-[#111827] text-sm">{alt.name}</div>
                    <div className="text-xs text-[#9CA3AF]">{alt.packageSize}{alt.packageUnit} · {fmt(alt.pricePerKg)} kr/kg</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-[#111827] text-sm">{fmt(alt.price)} kr</div>
                    <div className={`text-xs font-semibold ${diff < 0 ? 'text-[#2D6A4F]' : 'text-[#9CA3AF]'}`}>
                      {diff < 0 ? `Save ${fmt(Math.abs(diff))} kr` : diff === 0 ? 'Same price' : `+${fmt(diff)} kr`}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Progress Screen ───────────────────────────────────────────────────────────
function ProgressScreen({ settings }: { settings: UserSettings }) {
  const weeks = [
    { week: 'Week 1', spent: 462, saved: 49 },
    { week: 'Week 2', spent: 441, saved: 70 },
    { week: 'Week 3', spent: 455, saved: 56 },
    { week: 'Week 4', spent: 437, saved: 74, current: true },
  ];
  const avg = Math.round(weeks.reduce((s, w) => s + w.spent, 0) / weeks.length);
  const avgSaved = Math.round(weeks.reduce((s, w) => s + w.saved, 0) / weeks.length);
  const maxSpend = Math.max(...weeks.map(w => w.spent));

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="px-5 pt-6 pb-4 bg-[#F7F7F5]">
        <h1 className="text-2xl font-bold text-[#111827]">Progress</h1>
        <p className="text-[#6B7280] text-sm">Last 4 weeks</p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-20 space-y-4">
        <div className="bg-[#2D6A4F] rounded-3xl p-5 text-white">
          <div className="text-[#D8F3DC] text-xs font-semibold uppercase tracking-wider mb-2">Current goal</div>
          <div className="text-xl font-bold mb-3">{goalLabel(settings.goal)}</div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/10 rounded-2xl p-3">
              <div className="text-[#D8F3DC] text-xs mb-1">Daily calories</div>
              <div className="font-bold text-lg">{settings.dailyCalories.toLocaleString()} kcal</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-3">
              <div className="text-[#D8F3DC] text-xs mb-1">Daily protein</div>
              <div className="font-bold text-lg">{settings.dailyProtein}g</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-3 col-span-2">
              <div className="text-[#D8F3DC] text-xs mb-1">Weekly budget</div>
              <div className="font-bold text-lg">{settings.weeklyBudget} DKK</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-[#EBEBEB]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-[#111827]">Grocery spend</h2>
            <span className="text-xs text-[#6B7280]">Avg: <span className="font-bold text-[#111827]">{avg} kr</span></span>
          </div>
          <div className="flex items-end gap-3 h-32">
            {weeks.map(w => (
              <div key={w.week} className="flex-1 flex flex-col items-center gap-1">
                <div className="text-xs font-bold text-[#111827]">{w.spent}</div>
                <div
                  className={`w-full rounded-t-lg transition-all ${w.current ? 'bg-[#2D6A4F]' : 'bg-[#D8F3DC]'}`}
                  style={{ height: `${(w.spent / maxSpend) * 100}%` }}
                />
                <div className="text-xs text-[#9CA3AF]">{w.week.replace('Week ', 'W')}</div>
              </div>
            ))}
          </div>
          <div className="mt-3 h-px bg-[#EBEBEB]" />
          <div className="mt-3 flex justify-between">
            <div className="text-xs text-[#6B7280]">Avg saved/week</div>
            <div className="text-xs font-bold text-[#2D6A4F]">{avgSaved} kr</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-[#EBEBEB]">
          <h2 className="font-bold text-[#111827] mb-3">Week breakdown</h2>
          <div className="space-y-3">
            {weeks.map(w => (
              <div key={w.week} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${w.current ? 'bg-[#2D6A4F]' : 'bg-[#D8F3DC]'}`} />
                  <span className="text-sm text-[#111827]">{w.week}</span>
                  {w.current && <Badge variant="green">Current</Badge>}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-[#111827]">{w.spent} kr</span>
                  <span className="text-xs text-[#2D6A4F] font-medium">−{w.saved} kr</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Profile Screen ────────────────────────────────────────────────────────────
function ProfileScreen({ settings, onChange, onRebuild }: {
  settings: UserSettings;
  onChange: (s: Partial<UserSettings>) => void;
  onRebuild: () => void;
}) {
  const [inviteEmail, setInviteEmail] = useState('');
  const [linkCopied, setLinkCopied] = useState(false);

  const handleInvite = () => {
    if (!inviteEmail.includes('@')) return;
    const member = { id: Date.now().toString(), name: inviteEmail.split('@')[0], email: inviteEmail, status: 'pending' as const };
    onChange({ familyMembers: [...(settings.familyMembers ?? []), member] });
    setInviteEmail('');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://macrocart.app/invite/demo').catch(() => {});
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="px-5 pt-6 pb-4 bg-[#F7F7F5]">
        <h1 className="text-2xl font-bold text-[#111827]">Profile</h1>
        <p className="text-[#6B7280] text-sm">Denmark · DKK</p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-20 space-y-4">
        {/* Goals */}
        <div className="bg-white rounded-2xl border border-[#EBEBEB] overflow-hidden">
          <div className="px-4 py-3 border-b border-[#EBEBEB] bg-[#F7F7F5]">
            <span className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Goals</span>
          </div>
          {[
            { label: 'Goal', value: goalLabel(settings.goal) },
            { label: 'Daily calories', value: `${settings.dailyCalories.toLocaleString()} kcal` },
            { label: 'Daily protein', value: `${settings.dailyProtein}g` },
            { label: 'Weekly budget', value: `${settings.weeklyBudget} DKK` },
            { label: 'Meals per day', value: settings.mealsPerDay.toString() },
            ...(settings.weight ? [{ label: 'Weight', value: `${settings.weight} kg` }] : []),
            ...(settings.height ? [{ label: 'Height', value: `${settings.height} cm` }] : []),
          ].map((row, i, arr) => (
            <div key={row.label} className={`flex items-center justify-between px-4 py-3 ${i < arr.length - 1 ? 'border-b border-[#EBEBEB]' : ''}`}>
              <span className="text-sm text-[#6B7280]">{row.label}</span>
              <span className="text-sm font-semibold text-[#111827]">{row.value}</span>
            </div>
          ))}
        </div>

        {/* Food prefs */}
        <div className="bg-white rounded-2xl border border-[#EBEBEB] overflow-hidden">
          <div className="px-4 py-3 border-b border-[#EBEBEB] bg-[#F7F7F5]">
            <span className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Food preferences</span>
          </div>
          <div className="px-4 py-3 border-b border-[#EBEBEB]">
            <div className="text-sm text-[#6B7280] mb-2">I eat</div>
            <div className="flex flex-wrap gap-1.5">
              {settings.foodPreferences.length > 0
                ? settings.foodPreferences.map(f => <Badge key={f} variant="green">{f}</Badge>)
                : <span className="text-xs text-[#9CA3AF]">Everything</span>}
            </div>
          </div>
          <div className="px-4 py-3">
            <div className="text-sm text-[#6B7280] mb-2">I avoid</div>
            <div className="flex flex-wrap gap-1.5">
              {settings.foodExclusions.length > 0
                ? settings.foodExclusions.map(f => <Badge key={f} variant="gray">{f}</Badge>)
                : <span className="text-xs text-[#9CA3AF]">Nothing restricted</span>}
            </div>
          </div>
        </div>

        {/* Family members */}
        <div className="bg-white rounded-2xl border border-[#EBEBEB] overflow-hidden">
          <div className="px-4 py-3 border-b border-[#EBEBEB] bg-[#F7F7F5] flex items-center gap-2">
            {Icon.people()}
            <span className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Family · Shared Plan</span>
          </div>

          {(settings.familyMembers ?? []).map((m, i) => (
            <div key={m.id} className={`flex items-center gap-3 px-4 py-3 ${i < (settings.familyMembers?.length ?? 0) - 1 ? 'border-b border-[#EBEBEB]' : 'border-b border-[#EBEBEB]'}`}>
              <div className="w-8 h-8 rounded-full bg-[#D8F3DC] flex items-center justify-center text-sm font-bold text-[#2D6A4F]">
                {m.name[0].toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-[#111827] truncate">{m.name}</div>
                {m.email && <div className="text-xs text-[#9CA3AF] truncate">{m.email}</div>}
              </div>
              <Badge variant={m.status === 'active' ? 'green' : 'gray'}>{m.status === 'active' ? 'Active' : 'Pending'}</Badge>
            </div>
          ))}

          <div className="px-4 py-3">
            <div className="flex gap-2 mb-3">
              <input
                type="email"
                value={inviteEmail}
                onChange={e => setInviteEmail(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleInvite()}
                placeholder="Enter email to invite…"
                className="flex-1 border-2 border-[#EBEBEB] rounded-xl px-3 py-2.5 text-sm text-[#111827] focus:border-[#2D6A4F] outline-none"
              />
              <button
                onClick={handleInvite}
                className="px-3 py-2.5 bg-[#2D6A4F] text-white rounded-xl text-sm font-semibold flex items-center gap-1.5"
              >
                {Icon.mail()} Send
              </button>
            </div>
            <button
              onClick={handleCopyLink}
              className="w-full flex items-center justify-center gap-2 py-2.5 border-2 border-dashed border-[#EBEBEB] rounded-xl text-sm text-[#6B7280] font-medium transition-all hover:border-[#2D6A4F] hover:text-[#2D6A4F]"
            >
              {Icon.link()}
              {linkCopied ? 'Link copied!' : 'Copy invite link'}
            </button>
          </div>
        </div>

        {/* Shopping settings */}
        <div className="bg-white rounded-2xl border border-[#EBEBEB] overflow-hidden">
          <div className="px-4 py-3 border-b border-[#EBEBEB] bg-[#F7F7F5]">
            <span className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Shopping</span>
          </div>
          {[
            {
              label: 'Where I shop',
              value: (settings.preferredStores ?? []).length === 0
                ? 'Anywhere'
                : (settings.preferredStores ?? []).join(', '),
            },
            {
              label: 'Max stores/trip',
              value: settings.maxStoresPerTrip == null ? 'No limit' : `${settings.maxStoresPerTrip} store${settings.maxStoresPerTrip > 1 ? 's' : ''}`,
            },
            {
              label: 'Shopping style',
              value: { simplest: 'Simplest trip', balanced: 'Best balance', cheapest: 'Lowest cost' }[settings.shoppingPreference ?? 'balanced'],
            },
            { label: 'Currency', value: 'DKK' },
            { label: 'Country', value: 'Denmark' },
          ].map((row, i, arr) => (
            <div key={row.label} className={`flex items-start justify-between px-4 py-3 ${i < arr.length - 1 ? 'border-b border-[#EBEBEB]' : ''}`}>
              <span className="text-sm text-[#6B7280]">{row.label}</span>
              <span className="text-sm font-semibold text-[#111827] text-right max-w-[55%]">{row.value}</span>
            </div>
          ))}
        </div>

        <button
          onClick={onRebuild}
          className="w-full py-4 bg-[#2D6A4F] text-white rounded-2xl font-bold text-sm active:scale-[0.98] transition-transform shadow-lg shadow-[#2D6A4F]/20"
        >
          ✨ Rebuild my meal plan
        </button>
      </div>
    </div>
  );
}

// ─── Bottom Nav ────────────────────────────────────────────────────────────────
function BottomNav({ activeTab, onTab }: { activeTab: Tab; onTab: (t: Tab) => void }) {
  const tabs: { id: Tab; label: string; icon: (a: boolean) => React.ReactNode }[] = [
    { id: 'plan', label: 'Plan', icon: Icon.plan },
    { id: 'shop', label: 'Shop', icon: Icon.shop },
    { id: 'progress', label: 'Progress', icon: Icon.progress },
    { id: 'profile', label: 'Profile', icon: Icon.profile },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-[#EBEBEB] flex">
      {tabs.map(t => (
        <button
          key={t.id}
          onClick={() => onTab(t.id)}
          className="flex-1 flex flex-col items-center py-3 gap-1 active:opacity-60 transition-opacity"
        >
          {t.icon(activeTab === t.id)}
          <span className={`text-[10px] font-semibold ${activeTab === t.id ? 'text-[#2D6A4F]' : 'text-[#9CA3AF]'}`}>
            {t.label}
          </span>
        </button>
      ))}
    </div>
  );
}

// ─── App ───────────────────────────────────────────────────────────────────────
const DEFAULT_SETTINGS: UserSettings = {
  goal: 'lose_fat',
  dailyCalories: 2200,
  dailyProtein: 170,
  weeklyBudget: 450,
  foodPreferences: ['Chicken', 'Beef', 'Fish', 'Eggs', 'Dairy', 'Rice', 'Vegetables', 'Oats', 'Fruit'],
  foodExclusions: [],
  mealsPerDay: 4,
  weight: 0,
  height: 0,
  age: 0,
  sex: 'male',
  familyMembers: [],
  preferredStores: [],
  maxStoresPerTrip: null,
  shoppingPreference: 'balanced',
};

export default function App() {
  const [screen, setScreen] = useState<Screen>('welcome');
  const [activeTab, setActiveTab] = useState<Tab>('plan');
  const [settings, setSettings] = useState<UserSettings>(DEFAULT_SETTINGS);
  const [plan, setPlan] = useState<WeeklyPlan>(DEFAULT_WEEKLY_PLAN);
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>(DEFAULT_SHOPPING_LIST);
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedMeal, setSelectedMeal] = useState<{ meal: Meal; dayIdx: number } | null>(null);
  const [swapMeal, setSwapMeal] = useState<{ meal: Meal; dayIdx: number } | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [mealView, setMealView] = useState(false);
  const [recipeView, setRecipeView] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const patchSettings = (s: Partial<UserSettings>) => setSettings(prev => ({ ...prev, ...s }));

  const handleGenerate = () => {
    setScreen('generating');
    setTimeout(() => setScreen('main'), 3500);
  };

  const handleMealTap = (meal: Meal, dayIdx: number) => {
    setSelectedMeal({ meal, dayIdx });
    setMealView(true);
    setActiveTab('plan');
  };

  const handleSwapOpen = (meal: Meal, dayIdx: number) => {
    setSwapMeal({ meal, dayIdx });
  };

  const handleSwapSelect = (newMeal: Meal) => {
    if (!swapMeal) return;
    const { dayIdx } = swapMeal;
    const oldMeal = swapMeal.meal;
    const costDiff = newMeal.estimatedCost - oldMeal.estimatedCost;

    setPlan(prev => {
      const days = prev.days.map((d, i) => {
        if (i !== dayIdx) return d;
        const meals = d.meals.map(m => m.id === oldMeal.id ? { ...newMeal } : m);
        const totalCost = meals.reduce((s, m) => s + m.estimatedCost, 0);
        const totalCalories = meals.reduce((s, m) => s + m.calories, 0);
        const totalProtein = meals.reduce((s, m) => s + m.protein, 0);
        const totalCarbs = meals.reduce((s, m) => s + m.carbs, 0);
        return { ...d, meals, totalCost, totalCalories, totalProtein, totalCarbs };
      });
      const newTotal = Math.round((prev.totalCost + costDiff) * 100) / 100;
      return { ...prev, days, totalCost: newTotal, savings: Math.max(0, prev.savings - costDiff) };
    });

    if (selectedMeal?.meal.id === oldMeal.id) {
      setSelectedMeal({ meal: newMeal, dayIdx });
    }
    setSwapMeal(null);
  };

  const handleTogglePurchased = (productId: string) => {
    setShoppingList(prev => prev.map(i => i.productId === productId ? { ...i, purchased: !i.purchased } : i));
  };

  const handleRebuild = () => {
    setScreen('preferences');
    setMealView(false);
    setSelectedMeal(null);
  };

  return (
    <div className="min-h-screen bg-[#F0F0ED] flex items-start justify-center">
      <div
        className="relative bg-[#F7F7F5] overflow-hidden"
        style={{ width: '100%', maxWidth: '430px', minHeight: '100svh', height: '100svh' }}
      >
        {screen === 'welcome' && <WelcomeScreen onStart={() => setScreen('onboarding')} />}

        {screen === 'onboarding' && (
          <OnboardingScreen settings={settings} onChange={patchSettings} onNext={() => setScreen('preferences')} />
        )}

        {screen === 'preferences' && (
          <PreferencesScreen settings={settings} onChange={patchSettings} onGenerate={handleGenerate} />
        )}

        {screen === 'generating' && <GeneratingScreen />}

        {screen === 'main' && (
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-hidden relative">
              {/* Plan tab */}
              {activeTab === 'plan' && !mealView && !recipeView && (
                <PlanScreen
                  plan={plan}
                  settings={settings}
                  selectedDay={selectedDay}
                  onDaySelect={setSelectedDay}
                  onMealTap={handleMealTap}
                  onSwapTap={handleSwapOpen}
                />
              )}

              {activeTab === 'plan' && mealView && selectedMeal && (
                <MealDetailScreen
                  meal={selectedMeal.meal}
                  onBack={() => { setMealView(false); setSelectedMeal(null); }}
                  onSwap={() => setSwapMeal(selectedMeal)}
                />
              )}

              {activeTab === 'plan' && recipeView && !selectedRecipe && (
                <RecipeBrowseScreen
                  onBack={() => setRecipeView(false)}
                  onRecipeTap={r => setSelectedRecipe(r)}
                />
              )}

              {activeTab === 'plan' && recipeView && selectedRecipe && (
                <RecipeDetailScreen
                  recipe={selectedRecipe}
                  onBack={() => setSelectedRecipe(null)}
                />
              )}

              {/* Shop tab */}
              {activeTab === 'shop' && !selectedProductId && (
                <ShopScreen
                  shoppingList={shoppingList}
                  plan={plan}
                  settings={settings}
                  onToggle={handleTogglePurchased}
                  onProductTap={setSelectedProductId}
                />
              )}

              {activeTab === 'shop' && selectedProductId && (
                <ProductDetailScreen
                  productId={selectedProductId}
                  shoppingList={shoppingList}
                  plan={plan}
                  onBack={() => setSelectedProductId(null)}
                />
              )}

              {activeTab === 'progress' && <ProgressScreen settings={settings} />}

              {activeTab === 'profile' && (
                <ProfileScreen settings={settings} onChange={patchSettings} onRebuild={handleRebuild} />
              )}
            </div>

            {/* Plan tab — recipe library FAB */}
            {activeTab === 'plan' && !mealView && !recipeView && (
              <button
                onClick={() => { setRecipeView(true); setSelectedRecipe(null); }}
                className="absolute bottom-20 right-4 z-30 bg-[#2D6A4F] text-white rounded-2xl px-4 py-3 flex items-center gap-2 shadow-xl shadow-[#2D6A4F]/30 text-sm font-semibold active:scale-[0.96] transition-transform"
              >
                <span>📖</span>
                <span>Recipes</span>
              </button>
            )}

            <BottomNav
              activeTab={activeTab}
              onTab={(t) => {
                setActiveTab(t);
                if (t !== 'plan') { setMealView(false); setSelectedMeal(null); setRecipeView(false); setSelectedRecipe(null); }
                if (t !== 'shop') setSelectedProductId(null);
              }}
            />
          </div>
        )}

        {swapMeal && (
          <SwapSheet
            meal={swapMeal.meal}
            onClose={() => setSwapMeal(null)}
            onSelect={handleSwapSelect}
          />
        )}
      </div>
    </div>
  );
}
