# MacroCart core recipe library

**Version 1.0.0 | 23 September 2026 | 120 complete recipes | 167 canonical ingredients**

This release supplies recipe data, not an app interface. It contains original authored instructions, a shared ingredient taxonomy, a strict JSON Schema, repeatable ingredient-based nutrition estimates, recipe-specific substitutions, serving adjustments and meal-prep guidance. It is a complete **authored seed library**, not a claim of completed kitchen, laboratory, allergy or live-price validation.

## Read the files in this order

| File | Purpose |
|---|---|
| `01_ingredient_taxonomy.json` | Ten ingredient groups, stable identifiers, English/Danish names, aliases, ingredient states, composition estimates and matching rules. |
| `02_recipe_database.schema.json` | JSON Schema Draft 2020-12 for the complete database and every numbered batch. All 38 recipe fields are required; unknown object properties are rejected. |
| `batches/recipes_001_030.json` | Breakfasts 1-20 and chicken/turkey recipes 1-10. |
| `batches/recipes_031_060.json` | Chicken/turkey recipes 11-25 and beef recipes 1-15. |
| `batches/recipes_061_090.json` | Pork 1-8, fish/seafood 1-10 and vegetarian 1-12. |
| `batches/recipes_091_120.json` | Pasta 1-10, bowls/wraps/burritos 1-10 and snacks/desserts 1-10. |
| `03_recipes_all_120.json` | The same 120 records combined in sequence; the batches concatenate to this exact recipe array. |
| `04_tag_taxonomy.json` | Controlled definitions for 18 reusable tags and four qualitative cost levels. |
| `05_validation_report.json` | Results of structural, reference, arithmetic, sequence, tag and shopping-aggregation checks. |
| `06_recipe_catalog.md` | Human-readable list of every recipe with servings, nutrition, elapsed time and cost tier. |
| `sources.json` | Official methodology and food-safety references, with a precise description of what each supports. |
| `tools/recipe_tools.py` | Deterministic nutrition, swap, scaling and edible shopping-demand calculations. |
| `tools/validate_library.py` | Re-runnable validation independent of the authoring script. |
| `examples/` | Small working inputs and calculated outputs; not calorie-targeted or priced weekly plans. |
| `manifest.json` | SHA-256 checksums for the delivered files, excluding the manifest itself. |

## Category allocation

Primary categories are exclusive so the total is unambiguous. Meal types and tags can overlap naturally: a chicken pasta remains a chicken primary-category record, and a vegetarian breakfast also carries a vegetarian tag.

| Primary category | Count | Stable ID prefix |
|---|---:|---|
| `breakfasts` | 20 | `breakfast_` |
| `chicken_turkey` | 25 | `chicken_` |
| `beef` | 15 | `beef_` |
| `pork` | 8 | `pork_` |
| `fish_seafood` | 10 | `fish_` |
| `vegetarian` | 12 | `vegetarian_` |
| `pasta` | 10 | `pasta_` |
| `bowls_wraps_burritos` | 10 | `bowl_` |
| `snacks_desserts` | 10 | `dessert_` |

There are 45 vegetarian-tagged recipes across categories and four vegan-tagged bases. Product labels, cheese rennet and compound ingredients still require verification. Primary category is not an allergen or dietary-safety decision.

## Import and quantity contract

Each recipe JSON document is an object with `datasetId`, `schemaVersion`, `taxonomyVersion`, `nutritionModelVersion`, `recipeCount`, `sequenceStart`, `sequenceEnd` and `recipes`. Import the `recipes` array, not the envelope as a recipe. An ingredient lookup is keyed by each taxonomy item's `normalizedIngredient`; a recipe lookup is keyed by `id`.

**Base ingredient quantities are for the whole recipe at its stated servings.** A four-serving recipe listing 640 g chicken uses 160 g per serving. To prepare two servings, multiply all base quantities by 2/4. Published `nutritionPerServing` is already per serving; do not divide it again.

| Field | Quantity scope | Included in published base nutrition? |
|---|---|---|
| `ingredients` | Whole recipe | Yes, except lines with `optional: true`. |
| `substitutions[].alternatives[]` | Whole-recipe replacement for one source ingredient | No; use only when the alternative is selected. |
| `possibleAddOns` | Whole-recipe additional quantities | No. |
| `possibleRemovals` | Whole-recipe quantities to subtract from existing lines | No change until removal is selected. |
| `scalingNotes.*.changes` | **Per-serving signed deltas** against the original base | No change until that scaling option is selected. |

Only grams and millilitres occur in ingredient lines. Rice, pasta and other grains are dry weights. Raw meat and fish are edible, boneless weights unless explicitly stated otherwise. Canned beans, tuna, sweetcorn and canned fruit use drained weights. Canned tomatoes include the juice. Eggs use shell-free edible grams; approximate egg counts are kitchen aids, not fixed purchase yields. Prepared stock uses millilitres of diluted stock, not grams of powder or whole cubes.

Oil is weighed in grams. Retail oil is often sold by volume: do not silently equate grams and millilitres. Obtain a verified product density. The same principle applies to sauces. Ingredient `quantityState`, `defaultUnit`, matching attributes and reference basis must remain attached to each canonical ID.

Water absorbed into a dish is listed when measured. Water used only to rinse, boil and drain is a kitchen utility. The shopping aggregator omits plain water by default but retains it in recipe calculations. Salt, spices and other pantry items are not silently removed from shopping demand; pantry inventory is a later planning layer.

## Nutrition model and its limits

Every ingredient has a transparent, rounded generic composition estimate per 100 g or 100 ml. These values are **author-curated estimates**, not an imported Frida table, a branded-product dataset, laboratory measurements or an asserted average with a measured uncertainty interval. Frida is identified only as a candidate source for future production verification.

For each nutrient, the whole-recipe calculation is:

```text
sum(ingredient_quantity / reference_basis_quantity * reference_nutrient)
```

Divide the result by recipe servings and exclude optional ingredients. Calculations use decimal arithmetic. At the display boundary, energy is rounded to whole kcal and other nutrients to 0.1 g using `ROUND_HALF_UP`. Substitution and scaling deltas are calculated before display rounding, not by subtracting rounded totals; therefore a displayed delta can differ by a last decimal place from a subtraction of displayed endpoints.

Energy uses the simplified formula:

```text
kcal = 4 * protein + 4 * available_carbohydrate + 9 * fat + 2 * fibre
```

All quantities on that line are grams. `carbsGrams` excludes fibre; it is not US-style total carbohydrate. The factors follow the selected Annex XIV factors in `sources.json`; organic acids, alcohol, polyols and other special factors are not modeled separately.

The estimates count the listed oil, marinade, coatings, sauces and measured ingredients as eaten. Actual uptake, leftovers in a pan, surface whey removed, cooking losses and product variation can change measured nutrition. No invented cooked yield or retention factor is applied. Nutrition per 100 g of the finished dish cannot be obtained without measuring its cooked yield. No sodium, micronutrient or clinical-completeness claims are made.

| Recipe group | Estimated kcal per serving | Estimated protein per serving |
|---|---:|---:|
| 20 breakfasts | 429-562 | 30.4-40.0 g |
| 90 main meals | 519-748 | 28.7-64.3 g |
| 10 snacks/desserts | 298-432 | 23.8-37.1 g |

All recipes meet the requested calorie bands. Eighty-nine of ninety main meals meet the protein guide. `vegetarian_009`, Creamy White Bean and Mushroom Mustard Stew, intentionally has 28.7 g protein; it includes an explicit higher-protein serving option instead of an artificial base-recipe addition. All breakfasts and snacks/desserts meet their requested protein guides.

`high-protein` and `high-fiber` are provisional internal filters computed from these estimates. They are not certified commercial nutrition claims. No `low-calorie` tag is used because a meal-level calorie band alone does not establish a regulated low-energy claim.

## Substitutions and scaling

There are 1,025 authored alternative entries across the recipes and three scaling goals per recipe, giving 360 calculated scaling options. Alternatives are culinary choices, **not equivalent aliases** for price matching.

A substitution replaces the complete listed quantity of its source ingredient with the quantity in one selected alternative. Preserve other ingredients. If the target ingredient already appears in the recipe, aggregate its quantities in the shopping list. Swaps with `requiresMethodChange: true` require attention to the supplied notes, instructions and time; examples include different grain hydration, replacing gnocchi with dry pasta, or changing stewing beef to quick-cooking strips. The utility estimates nutrition but does not publish a renamed or kitchen-validated recipe automatically.

Each alternative includes its estimated per-serving nutrient change. Recalculate from the final ingredients after selecting a brand, even when an estimated delta is available. Recipe names, dietary suitability, tags, allergen indications, preparation time and cost classification may cease to be correct after a swap.

`reduceCalories`, `increaseCalories` and `increaseProtein` are independent changes relative to the original base. For a whole-recipe change, multiply each signed per-serving delta by the number of servings being prepared. Do not combine options by adding their already-rounded nutrition values. Combined changes need a new calculation and a culinary check, especially when both affect a binder, absorbed cooking liquid or sauce ratio.

Serving-count scaling changes ingredient demand; it does not linearly scale cooking time. Keep pieces similarly sized and pans similarly shallow, and cook extra batches rather than overcrowding. Baked-dish structure and grain hydration have recipe-specific notes. The utilities intentionally do not claim to rewrite all cooking instructions or approximate egg-count notes for a newly scaled batch.

## Storage, reheating and practical use

Meal-prep suitability means a useful component can be prepared ahead, not that seven days of cooked food should stay in the refrigerator. There are 116 meal-prep-friendly recipes and 94 with a freezer-suitable component. Inspect `freezerScope` and `freezerNotes`: a fresh salad, skyr sauce or crispy topping often stays separate while only the cooked base is frozen.

The library adopts conservative defaults: a refrigerator at 5 C or below; generally no more than two days for prepared food; and no more than 24 hours for cooked rice before reheating. Cool cooked rice rapidly, ideally within one hour. Reheat cooked leftovers only once. Packaged frozen berries are boiled for at least one minute; frozen vegetables follow their package cooking instructions, including in subsequently cold dishes. The official source scope is recorded in `sources.json`.

These are preparation assumptions, not microbiologically tested shelf-life claims. Follow any shorter use-by or opened-pack limit, avoid cross-contamination and verify thorough cooking. `storageDaysFridge: 0` means no intended refrigerated holding; for frozen bark, the record explicitly says to keep it frozen. Freezer notes describe quality-oriented component handling and must be read with storage instructions.

`totalTimeMinutes` equals preparation, cooking and mandatory passive time. It includes overnight chilling when required. `quick`, `30-minute` and `15-minute` use total elapsed time, not just hands-on time. Twenty-two recipes are at most 30 minutes in total; other recipes include longer comfort-food cooking, baking, resting or overnight preparation. All time estimates are authored, not stopwatch-tested.

Every recipe includes indicative base allergens and an explicit `allergenAssessment`. **Do not use this library alone for automatic allergy exclusion.** Actual products, compound sauces, precautionary labeling and cross-contact must be checked. Optional ingredients, substitutions and serving adjustments can introduce additional allergens. Family-friendly means mild-to-moderate base seasoning, not suitability for every age, allergy or medical condition.

## Supermarket-price integration

The cost distribution is 5 `very_low`, 77 `low`, 33 `medium` and 5 `high`. These tiers are relative editorial estimates. There are no live supermarket prices, discounts, price dates or invented DKK basket totals.

A production matching layer should retain SKU identifiers, retailer/store, geography, package size, drained or edible yield, nutrient label, price, currency, validity dates, loyalty conditions, quantity limits and retrieval time. For stock concentrate, use the product's dilution instructions. For eggs, whole fruit, bone-in meat and canned foods, convert edible demand to actual purchasable content using verified product data.

Aggregate demand for the entire plan before rounding to whole packs. Account for pantry stock and useful leftovers; otherwise summing isolated portion costs understates the checkout total. A cheap substitute may become more expensive after pack rounding, wasted ingredients or extra required components. Different fat classes and low-protein Greek-style yogurt must not be silently treated as exact matches to this taxonomy's lean mince and high-protein strained yogurt.

The included shopping utility deliberately returns **edible ingredient demand**, not SKU selections, pack counts, a price quote or a nutritionally optimized weekly plan.

## Run the included tools

Python 3.11 or later is suitable. Install the tested validation dependency and run from this folder:

```bash
python -m pip install -r requirements.txt
python tools/validate_library.py
python tools/recipe_tools.py --summary
python tools/recipe_tools.py --plan examples/shopping_plan.json
```

To save a freshly generated report:

```bash
python tools/validate_library.py --report 05_validation_report.json
```

The recorded validation runs 21,812 automated checks with zero failures. It validates all five recipe JSON documents against one strict schema, confirms batch equality, checks all canonical references and units, recalculates nutrition, validates every swap and scaling option, checks timing and tag consistency, and tests additive shopping aggregation. It does not replace a kitchen test, sensory review, measured portion check, label verification or shelf-life study.

For production, retain immutable released versions, verify nutrition provenance, kitchen-test a representative pilot and then all published dishes, verify allergens against matched products, and connect the retailer-offer layer. Extending the canonical taxonomy or adding fields requires an explicit versioned schema change rather than silently accepting unknown IDs.
