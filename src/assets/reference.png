Create a polished, functional mobile-first web app MVP for an AI-powered grocery meal planner.

WORKING PRODUCT NAME
MacroCart

CORE IDEA
MacroCart helps users create a weekly meal plan based on:

* calorie target
* protein target
* dietary goal
* food preferences
* weekly grocery budget
* current supermarket products and discounts

For this MVP, Lidl Denmark is the only available store.

The core value proposition is:

“Eat according to your goals without overspending.”

Example:
“2,200 kcal • 170g protein • 437 DKK/week”

The app should feel like a real usable consumer product, not a dashboard or generic AI chat interface.

IMPORTANT MVP CONSTRAINT
Do not build a real Lidl integration yet.

Use realistic DEMO product data that represents supermarket products and weekly discounts.

However, structure the application and data models so that later we can connect:

* scraped supermarket catalogue data
* OCR / AI vision extracted catalogue data
* an official supermarket API
* Supabase

Do not tightly couple the UI to hardcoded Lidl data.

DESIGN DIRECTION

Design a modern Scandinavian mobile app.

Style:

* clean
* minimal
* premium but approachable
* food-focused
* slightly fitness-oriented without looking like a bodybuilding app
* lots of white space
* soft neutral backgrounds
* strong typography
* rounded cards
* clear price hierarchy
* restrained green accent
* subtle shadows
* native iOS feeling

Avoid:

* excessive gradients
* generic AI purple
* complicated dashboards
* excessive illustrations
* childish visual style

Use a bottom navigation.

Main navigation:
Plan
Shop
Progress
Profile

Build the following complete user flow.

1. WELCOME / ONBOARDING

Create a simple onboarding screen.

Headline:
“Eat better. Spend less.”

Supporting text:
“Build a weekly meal plan around your nutrition goals and supermarket prices.”

Primary CTA:
“Build my plan”

Secondary text:
“Takes about 1 minute”

Do not require account creation during the first experience.

2. GOAL SETUP

Create a step-by-step setup flow.

Step 1:
“What’s your goal?”

Options:

* Lose fat
* Maintain weight
* Build muscle

Step 2:
Daily calories

Allow:

* automatic recommendation
* manual calorie input

For the prototype default:
2200 kcal

Step 3:
Daily protein target

Default:
170 g

Allow adjustment using a slider or input.

Step 4:
Weekly grocery budget

Default:
450 DKK

Options:
350 DKK
450 DKK
550 DKK
Custom

Step 5:
Choose supermarket

Only Lidl should be enabled in the MVP.

Show future stores disabled:

* REMA 1000
* Netto
* Føtex
* Bilka

Label them:
“Coming soon”

Do not copy Lidl branding heavily.
It is simply the selected supermarket.

3. FOOD PREFERENCES

Create a preference screen.

Question:
“What do you like to eat?”

Selectable categories:

* Chicken
* Beef
* Pork
* Fish
* Eggs
* Dairy
* Rice
* Pasta
* Potatoes
* Bread
* Oats
* Fruit
* Vegetables

Then:

“Anything you avoid?”

Options:

* Pork
* Fish
* Lactose
* Gluten
* Vegetarian
* No restrictions

Add another setting:

Meals per day:
3
4
5

Default to 4.

CTA:
“Create my plan”

4. PLAN GENERATION STATE

After clicking Create my plan, show an attractive generation/loading state.

Messages can rotate:

“Checking this week’s prices…”

“Matching foods to your macros…”

“Building the cheapest combination…”

“Creating your weekly plan…”

This should last briefly in prototype mode and then automatically open the plan.

5. WEEKLY PLAN HOME

This is the most important screen.

Top summary card:

THIS WEEK

2200 kcal/day
170g protein/day

Estimated cost:
437 DKK

Budget:
450 DKK

Show:
“13 DKK under budget”

Also show:
“Saved 74 DKK using current offers”

Below that show a 7-day selector:

Mon
Tue
Wed
Thu
Fri
Sat
Sun

When a day is selected, display meals.

Example Monday:

Breakfast
Protein oats with banana

548 kcal
38g protein
12.40 DKK

Lunch
Chicken rice bowl

620 kcal
52g protein
21.60 DKK

Snack
Skyr with berries

280 kcal
31g protein
11.90 DKK

Dinner
Beef potatoes & vegetables

742 kcal
53g protein
28.70 DKK

Daily total:

2190 kcal
174g protein
74.60 DKK

Allow every meal card to be tapped.

Add an obvious action:
“Swap meal”

6. MEAL DETAILS

When opening a meal show:

Meal title

Nutrition:
Calories
Protein
Carbs
Fat

Estimated meal price

Ingredients with quantities.

Example:

Chicken breast — 200g
Rice — 100g
Frozen vegetables — 150g
Greek yogurt sauce — 50g

Show each ingredient’s approximate cost.

Add buttons:
“Swap meal”
“Edit ingredients”

7. SMART SWAP

This interaction is important.

When user clicks Swap meal, open a bottom sheet.

Header:
“Swap this meal”

Provide alternatives with similar nutrition.

Example:

Chicken pasta
610 kcal
49g protein
19.90 DKK

Badge:
“Save 3.70 DKK”

Turkey rice bowl
605 kcal
51g protein
22.30 DKK

Tuna potato bowl
590 kcal
47g protein
18.80 DKK

Badge:
“Cheapest”

Allow user to choose one.

After selection:

* update meal
* update daily calories/macros
* update weekly grocery cost

Make this interaction functional using prototype state.

8. SHOPPING LIST

Create a dedicated Shop tab.

Header:
“Your Lidl shopping list”

Summary:
Total estimated cost: 437 DKK
Products: 18
Current offers used: 6

Group products by category:

Protein
Carbs
Fruit & Vegetables
Dairy
Other

Each item contains:

Product
Quantity needed
Pack size
Number of packs
Price
Discount status

Example:

Chicken breast
Need: 1.4 kg
Pack: 700g
2 packs
89.90 DKK

Add green promotional labels where appropriate:

“Weekly offer”
“Save 20 DKK”
“Lidl Plus”

Add checkbox functionality so users can mark items as purchased.

At the bottom show:

Estimated total
437 DKK

Budget
450 DKK

Remaining
13 DKK

9. PRODUCT DETAILS

When user taps a product, show:

Product name
Generic product image placeholder
Current price
Price per kg
Package size
Promotion information
Promotion expiry

Nutrition per 100g:
Calories
Protein
Carbs
Fat

Also show:

Used in:
Monday lunch
Wednesday dinner
Friday lunch

Add a button:
“Find alternative”

10. PRODUCT ALTERNATIVES

Show replacements.

Example:

Chicken breast
59.95 DKK/kg

Chicken thighs
42.95 DKK/kg

Badge:
“Cheaper”

Turkey breast
64.95 DKK/kg

When replacing an ingredient, recalculate approximate weekly price and nutrition.

11. WEEKLY SAVINGS

Add a section inside the Plan tab:

“Your savings this week”

Normal estimated price:
511 DKK

With current offers:
437 DKK

You save:
74 DKK

Use a simple visual bar or comparison.

Also show:

6 discounted products used
14% cheaper than regular prices

This is an important part of the product value proposition.

12. PROGRESS TAB

Keep this simple for MVP.

Show:

Current goal:
Fat loss

Daily target:
2200 kcal
170g protein

Weekly grocery budget:
450 DKK

Last 4 weeks:

Week 1 — 462 DKK
Week 2 — 441 DKK
Week 3 — 455 DKK
Week 4 — 437 DKK

Show:
Average grocery spend
Average savings

Use demo data.

13. PROFILE / SETTINGS

Include:

Goal
Calories
Protein
Budget
Meals per day
Food preferences
Excluded foods
Selected supermarket

Also add:

Units
Currency: DKK
Country: Denmark

Add:
“Rebuild my meal plan”

14. DEMO SUPERMARKET DATABASE

Create realistic demo grocery data.

Include at least 30 products across:

Chicken
Beef
Pork
Fish
Eggs
Skyr
Greek yogurt
Milk
Cheese
Rice
Pasta
Potatoes
Oats
Bread
Bananas
Apples
Frozen berries
Frozen vegetables
Fresh vegetables
Beans
Tuna
Sauces
Cooking basics

Each product should use a consistent object structure:

id
name
brand
store
category
packageSize
packageUnit
price
regularPrice
pricePerKg
isDiscounted
discountType
promotionStart
promotionEnd
caloriesPer100g
proteinPer100g
carbsPer100g
fatPer100g

Example:

{
"id": "product_001",
"name": "Chicken Breast Fillets",
"brand": "Demo brand",
"store": "Lidl",
"category": "Protein",
"packageSize": 700,
"packageUnit": "g",
"price": 34.95,
"regularPrice": 44.95,
"pricePerKg": 49.93,
"isDiscounted": true,
"discountType": "Weekly offer",
"promotionStart": "2026-09-21",
"promotionEnd": "2026-09-27",
"caloriesPer100g": 110,
"proteinPer100g": 23,
"carbsPer100g": 0,
"fatPer100g": 2
}

Clearly treat all products and prices as demo data.

15. MEAL PLAN LOGIC

For the prototype, create lightweight deterministic logic instead of pretending to have a real AI backend.

The system should try to create meals close to:

Daily calorie target:
±5%

Daily protein target:
at least 95% of target

Weekly grocery budget:
do not exceed if possible

Prefer:

* discounted products
* cheaper protein sources
* ingredients reused across multiple meals
* full package utilization
* foods matching user preferences

Avoid generating unrealistic combinations solely to mathematically hit macros.

The interface can call this:
“AI optimized”

But keep the actual prototype logic local/demo.

16. IMPORTANT PRODUCT BEHAVIOR

When user changes:

* calories
* protein
* budget
* preferences
* meal
* ingredient

update affected totals throughout the interface.

Examples:

If a cheaper meal is selected:
437 DKK → 428 DKK

If protein target increases:
170g → 190g

show updated meal suggestions and grocery quantities.

Use app state so the prototype feels genuinely interactive.

17. FUTURE DATA PIPELINE

Prepare the code architecture for future integration.

Eventually supermarket catalogue data could come from:

Supermarket catalogue
↓
HTML / PDF / catalogue images
↓
OCR / vision AI
↓
structured product JSON
↓
Supabase products database
↓
meal optimization engine
↓
mobile app

Do NOT implement scraping in this MVP.

Instead create clean interfaces/services that can later replace demo data.

For example:

ProductRepository
MealPlannerService
NutritionService
PricingService

Keep mock data separate from UI components.

18. SUPABASE READINESS

Structure the app so Supabase can later contain tables such as:

users
user_preferences
stores
products
promotions
nutrition_data
meal_plans
meals
meal_ingredients
shopping_lists

Do not require Supabase to run the first prototype.

Use local demo state first.

19. RESPONSIVE BEHAVIOR

Primary design target:
iPhone 15 / modern smartphone.

Also make it work on desktop.

On desktop:
center the app in an elegant wider layout instead of simply stretching mobile cards across the entire screen.

20. FINAL REQUIREMENT

Build the actual interactive prototype, not just static screens.

The primary demo journey should work:

Welcome
→ Set goal
→ Set calories/protein
→ Set budget
→ Select Lidl
→ Select food preferences
→ Generate plan
→ View weekly meal plan
→ Open meal
→ Swap meal
→ See price change
→ Open shopping list
→ Mark products as purchased
→ View product
→ Replace product

Prioritize the quality of this core flow over additional features.

Make reasonable product decisions where details are missing.

Do not stop to ask questions.

Create the first complete MVP version.
