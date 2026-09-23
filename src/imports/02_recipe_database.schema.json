{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "MacroCart recipe dataset 1.0.0",
  "description": "Validates the complete dataset or a sequential batch against the same strict record schema. Canonical ingredient IDs are version-bound. All base, add-on, removal and alternative quantities are for the whole recipe; scaling deltas alone are per serving. Semantic checks are implemented in tools/validate_library.py.",
  "type": "object",
  "properties": {
    "datasetId": {
      "const": "macrocart-core-recipes"
    },
    "schemaVersion": {
      "const": "1.0.0"
    },
    "taxonomyVersion": {
      "const": "1.0.0"
    },
    "nutritionModelVersion": {
      "const": "1.0.0"
    },
    "recipeCount": {
      "type": "integer",
      "minimum": 1,
      "maximum": 120
    },
    "sequenceStart": {
      "type": "integer",
      "minimum": 1,
      "maximum": 120
    },
    "sequenceEnd": {
      "type": "integer",
      "minimum": 1,
      "maximum": 120
    },
    "recipes": {
      "type": "array",
      "items": {
        "$ref": "#/$defs/recipe"
      },
      "minItems": 1,
      "maxItems": 120
    }
  },
  "required": [
    "datasetId",
    "schemaVersion",
    "taxonomyVersion",
    "nutritionModelVersion",
    "recipeCount",
    "sequenceStart",
    "sequenceEnd",
    "recipes"
  ],
  "additionalProperties": false,
  "$defs": {
    "nutrition": {
      "type": "object",
      "properties": {
        "calories": {
          "type": "integer",
          "minimum": 0
        },
        "proteinGrams": {
          "type": "number",
          "minimum": 0
        },
        "carbsGrams": {
          "type": "number",
          "minimum": 0
        },
        "fatGrams": {
          "type": "number",
          "minimum": 0
        },
        "fiberGrams": {
          "type": "number",
          "minimum": 0
        }
      },
      "required": [
        "calories",
        "proteinGrams",
        "carbsGrams",
        "fatGrams",
        "fiberGrams"
      ],
      "additionalProperties": false
    },
    "nutritionDelta": {
      "type": "object",
      "properties": {
        "calories": {
          "type": "integer"
        },
        "proteinGrams": {
          "type": "number"
        },
        "carbsGrams": {
          "type": "number"
        },
        "fatGrams": {
          "type": "number"
        },
        "fiberGrams": {
          "type": "number"
        }
      },
      "required": [
        "calories",
        "proteinGrams",
        "carbsGrams",
        "fatGrams",
        "fiberGrams"
      ],
      "additionalProperties": false
    },
    "ingredient": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "minLength": 1
        },
        "normalizedIngredient": {
          "type": "string",
          "enum": [
            "chicken_breast",
            "chicken_thigh_skinless",
            "turkey_breast",
            "turkey_minced_7pct",
            "beef_minced_5pct",
            "beef_strips_lean",
            "beef_stewing_lean",
            "pork_tenderloin",
            "pork_minced_5pct",
            "pork_loin",
            "cooked_ham",
            "salmon_fillet",
            "cod_fillet",
            "tuna_canned_water",
            "prawns_raw_peeled",
            "smoked_mackerel",
            "egg",
            "egg_white",
            "tofu_firm",
            "tofu_silken",
            "skyr_plain",
            "greek_yogurt_2pct",
            "cottage_cheese_2pct",
            "quark_lowfat",
            "milk_1_5pct",
            "kefir_plain",
            "cream_cheese_light",
            "creme_fraiche_9pct",
            "cooking_cream_15pct",
            "mozzarella_light",
            "cheddar",
            "feta",
            "parmesan",
            "hard_cheese_vegetarian",
            "ricotta",
            "halloumi",
            "rolled_oats",
            "rice_white_dry",
            "rice_brown_dry",
            "pasta_dry",
            "pasta_wholewheat_dry",
            "lasagne_sheets_dry",
            "couscous_dry",
            "bulgur_dry",
            "pearl_barley_dry",
            "buckwheat_dry",
            "egg_noodles_dry",
            "rice_noodles_dry",
            "rye_bread",
            "wholegrain_bread",
            "tortilla_wholewheat",
            "pita_wholewheat",
            "flour_wheat",
            "breadcrumbs",
            "potato",
            "sweet_potato",
            "gnocchi_potato",
            "biscuit_digestive",
            "ladyfingers",
            "semolina_wheat",
            "onion",
            "red_onion",
            "garlic",
            "carrot",
            "bell_pepper",
            "courgette",
            "aubergine",
            "broccoli",
            "cauliflower",
            "white_cabbage",
            "red_cabbage",
            "mushroom",
            "spinach_fresh",
            "cucumber",
            "tomato",
            "romaine_lettuce",
            "mixed_salad_leaves",
            "leek",
            "pumpkin",
            "radish",
            "spring_onion",
            "celery",
            "spinach_frozen",
            "peas_frozen",
            "green_beans_frozen",
            "sweetcorn_canned",
            "beetroot_cooked",
            "olives",
            "banana",
            "apple",
            "pear",
            "blueberries_fresh",
            "strawberries_fresh",
            "orange_flesh",
            "avocado",
            "mixed_berries_frozen",
            "mango_frozen",
            "lemon_juice",
            "lime_juice",
            "raisins",
            "pineapple_canned_juice",
            "lentils_red_dry",
            "lentils_green_canned",
            "kidney_beans_canned",
            "black_beans_canned",
            "chickpeas_canned",
            "white_beans_canned",
            "edamame_frozen",
            "olive_oil",
            "rapeseed_oil",
            "sesame_oil",
            "butter",
            "peanut_butter",
            "walnuts",
            "almonds",
            "pumpkin_seeds",
            "sunflower_seeds",
            "sesame_seeds",
            "chia_seeds",
            "tahini",
            "tomato_canned",
            "tomato_passata",
            "tomato_paste",
            "soy_sauce_reduced_salt",
            "dijon_mustard",
            "ketchup",
            "balsamic_vinegar",
            "cider_vinegar",
            "sriracha",
            "pesto_basil_vegetarian",
            "coconut_milk_light",
            "mayonnaise_light",
            "worcestershire_sauce",
            "salsa_tomato",
            "barbecue_sauce",
            "vegetable_stock_low_salt",
            "salt",
            "black_pepper",
            "paprika_sweet",
            "paprika_smoked",
            "cumin_ground",
            "coriander_ground",
            "curry_powder",
            "garam_masala",
            "oregano_dried",
            "thyme_dried",
            "chili_flakes",
            "cinnamon_ground",
            "nutmeg_ground",
            "turmeric_ground",
            "allspice_ground",
            "dill_fresh",
            "parsley_fresh",
            "basil_fresh",
            "coriander_fresh",
            "mint_fresh",
            "ginger_fresh",
            "water",
            "cocoa_powder",
            "dark_chocolate_70pct",
            "sugar",
            "honey",
            "maple_syrup",
            "vanilla_extract",
            "baking_powder",
            "cornstarch",
            "instant_coffee"
          ]
        },
        "quantity": {
          "type": "number",
          "exclusiveMinimum": 0
        },
        "unit": {
          "type": "string",
          "enum": [
            "g",
            "ml"
          ]
        },
        "optional": {
          "type": "boolean"
        },
        "notes": {
          "type": "string",
          "minLength": 1
        }
      },
      "required": [
        "name",
        "normalizedIngredient",
        "quantity",
        "unit",
        "optional",
        "notes"
      ],
      "additionalProperties": false
    },
    "instruction": {
      "type": "object",
      "properties": {
        "step": {
          "type": "integer",
          "minimum": 1
        },
        "text": {
          "type": "string",
          "minLength": 1
        }
      },
      "required": [
        "step",
        "text"
      ],
      "additionalProperties": false
    },
    "alternative": {
      "type": "object",
      "properties": {
        "normalizedIngredient": {
          "type": "string",
          "enum": [
            "chicken_breast",
            "chicken_thigh_skinless",
            "turkey_breast",
            "turkey_minced_7pct",
            "beef_minced_5pct",
            "beef_strips_lean",
            "beef_stewing_lean",
            "pork_tenderloin",
            "pork_minced_5pct",
            "pork_loin",
            "cooked_ham",
            "salmon_fillet",
            "cod_fillet",
            "tuna_canned_water",
            "prawns_raw_peeled",
            "smoked_mackerel",
            "egg",
            "egg_white",
            "tofu_firm",
            "tofu_silken",
            "skyr_plain",
            "greek_yogurt_2pct",
            "cottage_cheese_2pct",
            "quark_lowfat",
            "milk_1_5pct",
            "kefir_plain",
            "cream_cheese_light",
            "creme_fraiche_9pct",
            "cooking_cream_15pct",
            "mozzarella_light",
            "cheddar",
            "feta",
            "parmesan",
            "hard_cheese_vegetarian",
            "ricotta",
            "halloumi",
            "rolled_oats",
            "rice_white_dry",
            "rice_brown_dry",
            "pasta_dry",
            "pasta_wholewheat_dry",
            "lasagne_sheets_dry",
            "couscous_dry",
            "bulgur_dry",
            "pearl_barley_dry",
            "buckwheat_dry",
            "egg_noodles_dry",
            "rice_noodles_dry",
            "rye_bread",
            "wholegrain_bread",
            "tortilla_wholewheat",
            "pita_wholewheat",
            "flour_wheat",
            "breadcrumbs",
            "potato",
            "sweet_potato",
            "gnocchi_potato",
            "biscuit_digestive",
            "ladyfingers",
            "semolina_wheat",
            "onion",
            "red_onion",
            "garlic",
            "carrot",
            "bell_pepper",
            "courgette",
            "aubergine",
            "broccoli",
            "cauliflower",
            "white_cabbage",
            "red_cabbage",
            "mushroom",
            "spinach_fresh",
            "cucumber",
            "tomato",
            "romaine_lettuce",
            "mixed_salad_leaves",
            "leek",
            "pumpkin",
            "radish",
            "spring_onion",
            "celery",
            "spinach_frozen",
            "peas_frozen",
            "green_beans_frozen",
            "sweetcorn_canned",
            "beetroot_cooked",
            "olives",
            "banana",
            "apple",
            "pear",
            "blueberries_fresh",
            "strawberries_fresh",
            "orange_flesh",
            "avocado",
            "mixed_berries_frozen",
            "mango_frozen",
            "lemon_juice",
            "lime_juice",
            "raisins",
            "pineapple_canned_juice",
            "lentils_red_dry",
            "lentils_green_canned",
            "kidney_beans_canned",
            "black_beans_canned",
            "chickpeas_canned",
            "white_beans_canned",
            "edamame_frozen",
            "olive_oil",
            "rapeseed_oil",
            "sesame_oil",
            "butter",
            "peanut_butter",
            "walnuts",
            "almonds",
            "pumpkin_seeds",
            "sunflower_seeds",
            "sesame_seeds",
            "chia_seeds",
            "tahini",
            "tomato_canned",
            "tomato_passata",
            "tomato_paste",
            "soy_sauce_reduced_salt",
            "dijon_mustard",
            "ketchup",
            "balsamic_vinegar",
            "cider_vinegar",
            "sriracha",
            "pesto_basil_vegetarian",
            "coconut_milk_light",
            "mayonnaise_light",
            "worcestershire_sauce",
            "salsa_tomato",
            "barbecue_sauce",
            "vegetable_stock_low_salt",
            "salt",
            "black_pepper",
            "paprika_sweet",
            "paprika_smoked",
            "cumin_ground",
            "coriander_ground",
            "curry_powder",
            "garam_masala",
            "oregano_dried",
            "thyme_dried",
            "chili_flakes",
            "cinnamon_ground",
            "nutmeg_ground",
            "turmeric_ground",
            "allspice_ground",
            "dill_fresh",
            "parsley_fresh",
            "basil_fresh",
            "coriander_fresh",
            "mint_fresh",
            "ginger_fresh",
            "water",
            "cocoa_powder",
            "dark_chocolate_70pct",
            "sugar",
            "honey",
            "maple_syrup",
            "vanilla_extract",
            "baking_powder",
            "cornstarch",
            "instant_coffee"
          ]
        },
        "quantity": {
          "type": "number",
          "exclusiveMinimum": 0
        },
        "unit": {
          "type": "string",
          "enum": [
            "g",
            "ml"
          ]
        },
        "notes": {
          "type": "string",
          "minLength": 1
        },
        "requiresMethodChange": {
          "type": "boolean"
        },
        "requiresNutritionRecalculation": {
          "const": true
        },
        "estimatedNutritionDeltaPerServing": {
          "$ref": "#/$defs/nutritionDelta"
        },
        "requiresAllergenAndDietRecheck": {
          "const": true
        }
      },
      "required": [
        "normalizedIngredient",
        "quantity",
        "unit",
        "notes",
        "requiresMethodChange",
        "requiresNutritionRecalculation",
        "estimatedNutritionDeltaPerServing",
        "requiresAllergenAndDietRecheck"
      ],
      "additionalProperties": false
    },
    "substitution": {
      "type": "object",
      "properties": {
        "originalIngredient": {
          "type": "string",
          "enum": [
            "chicken_breast",
            "chicken_thigh_skinless",
            "turkey_breast",
            "turkey_minced_7pct",
            "beef_minced_5pct",
            "beef_strips_lean",
            "beef_stewing_lean",
            "pork_tenderloin",
            "pork_minced_5pct",
            "pork_loin",
            "cooked_ham",
            "salmon_fillet",
            "cod_fillet",
            "tuna_canned_water",
            "prawns_raw_peeled",
            "smoked_mackerel",
            "egg",
            "egg_white",
            "tofu_firm",
            "tofu_silken",
            "skyr_plain",
            "greek_yogurt_2pct",
            "cottage_cheese_2pct",
            "quark_lowfat",
            "milk_1_5pct",
            "kefir_plain",
            "cream_cheese_light",
            "creme_fraiche_9pct",
            "cooking_cream_15pct",
            "mozzarella_light",
            "cheddar",
            "feta",
            "parmesan",
            "hard_cheese_vegetarian",
            "ricotta",
            "halloumi",
            "rolled_oats",
            "rice_white_dry",
            "rice_brown_dry",
            "pasta_dry",
            "pasta_wholewheat_dry",
            "lasagne_sheets_dry",
            "couscous_dry",
            "bulgur_dry",
            "pearl_barley_dry",
            "buckwheat_dry",
            "egg_noodles_dry",
            "rice_noodles_dry",
            "rye_bread",
            "wholegrain_bread",
            "tortilla_wholewheat",
            "pita_wholewheat",
            "flour_wheat",
            "breadcrumbs",
            "potato",
            "sweet_potato",
            "gnocchi_potato",
            "biscuit_digestive",
            "ladyfingers",
            "semolina_wheat",
            "onion",
            "red_onion",
            "garlic",
            "carrot",
            "bell_pepper",
            "courgette",
            "aubergine",
            "broccoli",
            "cauliflower",
            "white_cabbage",
            "red_cabbage",
            "mushroom",
            "spinach_fresh",
            "cucumber",
            "tomato",
            "romaine_lettuce",
            "mixed_salad_leaves",
            "leek",
            "pumpkin",
            "radish",
            "spring_onion",
            "celery",
            "spinach_frozen",
            "peas_frozen",
            "green_beans_frozen",
            "sweetcorn_canned",
            "beetroot_cooked",
            "olives",
            "banana",
            "apple",
            "pear",
            "blueberries_fresh",
            "strawberries_fresh",
            "orange_flesh",
            "avocado",
            "mixed_berries_frozen",
            "mango_frozen",
            "lemon_juice",
            "lime_juice",
            "raisins",
            "pineapple_canned_juice",
            "lentils_red_dry",
            "lentils_green_canned",
            "kidney_beans_canned",
            "black_beans_canned",
            "chickpeas_canned",
            "white_beans_canned",
            "edamame_frozen",
            "olive_oil",
            "rapeseed_oil",
            "sesame_oil",
            "butter",
            "peanut_butter",
            "walnuts",
            "almonds",
            "pumpkin_seeds",
            "sunflower_seeds",
            "sesame_seeds",
            "chia_seeds",
            "tahini",
            "tomato_canned",
            "tomato_passata",
            "tomato_paste",
            "soy_sauce_reduced_salt",
            "dijon_mustard",
            "ketchup",
            "balsamic_vinegar",
            "cider_vinegar",
            "sriracha",
            "pesto_basil_vegetarian",
            "coconut_milk_light",
            "mayonnaise_light",
            "worcestershire_sauce",
            "salsa_tomato",
            "barbecue_sauce",
            "vegetable_stock_low_salt",
            "salt",
            "black_pepper",
            "paprika_sweet",
            "paprika_smoked",
            "cumin_ground",
            "coriander_ground",
            "curry_powder",
            "garam_masala",
            "oregano_dried",
            "thyme_dried",
            "chili_flakes",
            "cinnamon_ground",
            "nutmeg_ground",
            "turmeric_ground",
            "allspice_ground",
            "dill_fresh",
            "parsley_fresh",
            "basil_fresh",
            "coriander_fresh",
            "mint_fresh",
            "ginger_fresh",
            "water",
            "cocoa_powder",
            "dark_chocolate_70pct",
            "sugar",
            "honey",
            "maple_syrup",
            "vanilla_extract",
            "baking_powder",
            "cornstarch",
            "instant_coffee"
          ]
        },
        "alternatives": {
          "type": "array",
          "items": {
            "$ref": "#/$defs/alternative"
          },
          "minItems": 1
        }
      },
      "required": [
        "originalIngredient",
        "alternatives"
      ],
      "additionalProperties": false
    },
    "removal": {
      "type": "object",
      "properties": {
        "normalizedIngredient": {
          "type": "string",
          "enum": [
            "chicken_breast",
            "chicken_thigh_skinless",
            "turkey_breast",
            "turkey_minced_7pct",
            "beef_minced_5pct",
            "beef_strips_lean",
            "beef_stewing_lean",
            "pork_tenderloin",
            "pork_minced_5pct",
            "pork_loin",
            "cooked_ham",
            "salmon_fillet",
            "cod_fillet",
            "tuna_canned_water",
            "prawns_raw_peeled",
            "smoked_mackerel",
            "egg",
            "egg_white",
            "tofu_firm",
            "tofu_silken",
            "skyr_plain",
            "greek_yogurt_2pct",
            "cottage_cheese_2pct",
            "quark_lowfat",
            "milk_1_5pct",
            "kefir_plain",
            "cream_cheese_light",
            "creme_fraiche_9pct",
            "cooking_cream_15pct",
            "mozzarella_light",
            "cheddar",
            "feta",
            "parmesan",
            "hard_cheese_vegetarian",
            "ricotta",
            "halloumi",
            "rolled_oats",
            "rice_white_dry",
            "rice_brown_dry",
            "pasta_dry",
            "pasta_wholewheat_dry",
            "lasagne_sheets_dry",
            "couscous_dry",
            "bulgur_dry",
            "pearl_barley_dry",
            "buckwheat_dry",
            "egg_noodles_dry",
            "rice_noodles_dry",
            "rye_bread",
            "wholegrain_bread",
            "tortilla_wholewheat",
            "pita_wholewheat",
            "flour_wheat",
            "breadcrumbs",
            "potato",
            "sweet_potato",
            "gnocchi_potato",
            "biscuit_digestive",
            "ladyfingers",
            "semolina_wheat",
            "onion",
            "red_onion",
            "garlic",
            "carrot",
            "bell_pepper",
            "courgette",
            "aubergine",
            "broccoli",
            "cauliflower",
            "white_cabbage",
            "red_cabbage",
            "mushroom",
            "spinach_fresh",
            "cucumber",
            "tomato",
            "romaine_lettuce",
            "mixed_salad_leaves",
            "leek",
            "pumpkin",
            "radish",
            "spring_onion",
            "celery",
            "spinach_frozen",
            "peas_frozen",
            "green_beans_frozen",
            "sweetcorn_canned",
            "beetroot_cooked",
            "olives",
            "banana",
            "apple",
            "pear",
            "blueberries_fresh",
            "strawberries_fresh",
            "orange_flesh",
            "avocado",
            "mixed_berries_frozen",
            "mango_frozen",
            "lemon_juice",
            "lime_juice",
            "raisins",
            "pineapple_canned_juice",
            "lentils_red_dry",
            "lentils_green_canned",
            "kidney_beans_canned",
            "black_beans_canned",
            "chickpeas_canned",
            "white_beans_canned",
            "edamame_frozen",
            "olive_oil",
            "rapeseed_oil",
            "sesame_oil",
            "butter",
            "peanut_butter",
            "walnuts",
            "almonds",
            "pumpkin_seeds",
            "sunflower_seeds",
            "sesame_seeds",
            "chia_seeds",
            "tahini",
            "tomato_canned",
            "tomato_passata",
            "tomato_paste",
            "soy_sauce_reduced_salt",
            "dijon_mustard",
            "ketchup",
            "balsamic_vinegar",
            "cider_vinegar",
            "sriracha",
            "pesto_basil_vegetarian",
            "coconut_milk_light",
            "mayonnaise_light",
            "worcestershire_sauce",
            "salsa_tomato",
            "barbecue_sauce",
            "vegetable_stock_low_salt",
            "salt",
            "black_pepper",
            "paprika_sweet",
            "paprika_smoked",
            "cumin_ground",
            "coriander_ground",
            "curry_powder",
            "garam_masala",
            "oregano_dried",
            "thyme_dried",
            "chili_flakes",
            "cinnamon_ground",
            "nutmeg_ground",
            "turmeric_ground",
            "allspice_ground",
            "dill_fresh",
            "parsley_fresh",
            "basil_fresh",
            "coriander_fresh",
            "mint_fresh",
            "ginger_fresh",
            "water",
            "cocoa_powder",
            "dark_chocolate_70pct",
            "sugar",
            "honey",
            "maple_syrup",
            "vanilla_extract",
            "baking_powder",
            "cornstarch",
            "instant_coffee"
          ]
        },
        "quantity": {
          "type": "number",
          "exclusiveMinimum": 0
        },
        "unit": {
          "type": "string",
          "enum": [
            "g",
            "ml"
          ]
        },
        "notes": {
          "type": "string",
          "minLength": 1
        }
      },
      "required": [
        "normalizedIngredient",
        "quantity",
        "unit",
        "notes"
      ],
      "additionalProperties": false
    },
    "scalingChange": {
      "type": "object",
      "properties": {
        "normalizedIngredient": {
          "type": "string",
          "enum": [
            "chicken_breast",
            "chicken_thigh_skinless",
            "turkey_breast",
            "turkey_minced_7pct",
            "beef_minced_5pct",
            "beef_strips_lean",
            "beef_stewing_lean",
            "pork_tenderloin",
            "pork_minced_5pct",
            "pork_loin",
            "cooked_ham",
            "salmon_fillet",
            "cod_fillet",
            "tuna_canned_water",
            "prawns_raw_peeled",
            "smoked_mackerel",
            "egg",
            "egg_white",
            "tofu_firm",
            "tofu_silken",
            "skyr_plain",
            "greek_yogurt_2pct",
            "cottage_cheese_2pct",
            "quark_lowfat",
            "milk_1_5pct",
            "kefir_plain",
            "cream_cheese_light",
            "creme_fraiche_9pct",
            "cooking_cream_15pct",
            "mozzarella_light",
            "cheddar",
            "feta",
            "parmesan",
            "hard_cheese_vegetarian",
            "ricotta",
            "halloumi",
            "rolled_oats",
            "rice_white_dry",
            "rice_brown_dry",
            "pasta_dry",
            "pasta_wholewheat_dry",
            "lasagne_sheets_dry",
            "couscous_dry",
            "bulgur_dry",
            "pearl_barley_dry",
            "buckwheat_dry",
            "egg_noodles_dry",
            "rice_noodles_dry",
            "rye_bread",
            "wholegrain_bread",
            "tortilla_wholewheat",
            "pita_wholewheat",
            "flour_wheat",
            "breadcrumbs",
            "potato",
            "sweet_potato",
            "gnocchi_potato",
            "biscuit_digestive",
            "ladyfingers",
            "semolina_wheat",
            "onion",
            "red_onion",
            "garlic",
            "carrot",
            "bell_pepper",
            "courgette",
            "aubergine",
            "broccoli",
            "cauliflower",
            "white_cabbage",
            "red_cabbage",
            "mushroom",
            "spinach_fresh",
            "cucumber",
            "tomato",
            "romaine_lettuce",
            "mixed_salad_leaves",
            "leek",
            "pumpkin",
            "radish",
            "spring_onion",
            "celery",
            "spinach_frozen",
            "peas_frozen",
            "green_beans_frozen",
            "sweetcorn_canned",
            "beetroot_cooked",
            "olives",
            "banana",
            "apple",
            "pear",
            "blueberries_fresh",
            "strawberries_fresh",
            "orange_flesh",
            "avocado",
            "mixed_berries_frozen",
            "mango_frozen",
            "lemon_juice",
            "lime_juice",
            "raisins",
            "pineapple_canned_juice",
            "lentils_red_dry",
            "lentils_green_canned",
            "kidney_beans_canned",
            "black_beans_canned",
            "chickpeas_canned",
            "white_beans_canned",
            "edamame_frozen",
            "olive_oil",
            "rapeseed_oil",
            "sesame_oil",
            "butter",
            "peanut_butter",
            "walnuts",
            "almonds",
            "pumpkin_seeds",
            "sunflower_seeds",
            "sesame_seeds",
            "chia_seeds",
            "tahini",
            "tomato_canned",
            "tomato_passata",
            "tomato_paste",
            "soy_sauce_reduced_salt",
            "dijon_mustard",
            "ketchup",
            "balsamic_vinegar",
            "cider_vinegar",
            "sriracha",
            "pesto_basil_vegetarian",
            "coconut_milk_light",
            "mayonnaise_light",
            "worcestershire_sauce",
            "salsa_tomato",
            "barbecue_sauce",
            "vegetable_stock_low_salt",
            "salt",
            "black_pepper",
            "paprika_sweet",
            "paprika_smoked",
            "cumin_ground",
            "coriander_ground",
            "curry_powder",
            "garam_masala",
            "oregano_dried",
            "thyme_dried",
            "chili_flakes",
            "cinnamon_ground",
            "nutmeg_ground",
            "turmeric_ground",
            "allspice_ground",
            "dill_fresh",
            "parsley_fresh",
            "basil_fresh",
            "coriander_fresh",
            "mint_fresh",
            "ginger_fresh",
            "water",
            "cocoa_powder",
            "dark_chocolate_70pct",
            "sugar",
            "honey",
            "maple_syrup",
            "vanilla_extract",
            "baking_powder",
            "cornstarch",
            "instant_coffee"
          ]
        },
        "deltaQuantity": {
          "type": "number",
          "not": {
            "const": 0
          }
        },
        "unit": {
          "type": "string",
          "enum": [
            "g",
            "ml"
          ]
        }
      },
      "required": [
        "normalizedIngredient",
        "deltaQuantity",
        "unit"
      ],
      "additionalProperties": false
    },
    "scalingOption": {
      "type": "object",
      "properties": {
        "instructions": {
          "type": "string",
          "minLength": 1
        },
        "changes": {
          "type": "array",
          "items": {
            "$ref": "#/$defs/scalingChange"
          },
          "minItems": 1
        },
        "estimatedNutritionDeltaPerServing": {
          "$ref": "#/$defs/nutritionDelta"
        },
        "estimatedResultingNutritionPerServing": {
          "$ref": "#/$defs/nutrition"
        },
        "requiresPriceAndAllergenRecalculation": {
          "const": true
        }
      },
      "required": [
        "instructions",
        "changes",
        "estimatedNutritionDeltaPerServing",
        "estimatedResultingNutritionPerServing",
        "requiresPriceAndAllergenRecalculation"
      ],
      "additionalProperties": false
    },
    "scalingNotes": {
      "type": "object",
      "properties": {
        "quantityScope": {
          "const": "per_serving"
        },
        "reduceCalories": {
          "$ref": "#/$defs/scalingOption"
        },
        "increaseCalories": {
          "$ref": "#/$defs/scalingOption"
        },
        "increaseProtein": {
          "$ref": "#/$defs/scalingOption"
        },
        "batchScaling": {
          "type": "string",
          "minLength": 1
        },
        "methodNotes": {
          "type": "string",
          "minLength": 1
        }
      },
      "required": [
        "quantityScope",
        "reduceCalories",
        "increaseCalories",
        "increaseProtein",
        "batchScaling",
        "methodNotes"
      ],
      "additionalProperties": false
    },
    "nutritionCalculation": {
      "type": "object",
      "properties": {
        "method": {
          "const": "ingredient_sum_v1"
        },
        "referenceVersion": {
          "const": "1.0.0"
        },
        "carbohydrateConvention": {
          "const": "available_excluding_fiber"
        },
        "includesOptionalIngredients": {
          "const": false
        },
        "estimated": {
          "const": true
        }
      },
      "required": [
        "method",
        "referenceVersion",
        "carbohydrateConvention",
        "includesOptionalIngredients",
        "estimated"
      ],
      "additionalProperties": false
    },
    "qualityStatus": {
      "type": "object",
      "properties": {
        "kitchenTested": {
          "const": false
        },
        "nutritionLabVerified": {
          "const": false
        },
        "editorialStatus": {
          "const": "schema_and_nutrition_arithmetic_validated"
        }
      },
      "required": [
        "kitchenTested",
        "nutritionLabVerified",
        "editorialStatus"
      ],
      "additionalProperties": false
    },
    "allergenAssessment": {
      "type": "object",
      "properties": {
        "status": {
          "const": "indicative_requires_product_label_verification"
        },
        "crossContactAssessed": {
          "const": false
        },
        "safeForAutomaticAllergyExclusion": {
          "const": false
        }
      },
      "required": [
        "status",
        "crossContactAssessed",
        "safeForAutomaticAllergyExclusion"
      ],
      "additionalProperties": false
    },
    "ingredientRequirement": {
      "type": "object",
      "properties": {
        "normalizedIngredient": {
          "type": "string",
          "enum": [
            "chicken_breast",
            "chicken_thigh_skinless",
            "turkey_breast",
            "turkey_minced_7pct",
            "beef_minced_5pct",
            "beef_strips_lean",
            "beef_stewing_lean",
            "pork_tenderloin",
            "pork_minced_5pct",
            "pork_loin",
            "cooked_ham",
            "salmon_fillet",
            "cod_fillet",
            "tuna_canned_water",
            "prawns_raw_peeled",
            "smoked_mackerel",
            "egg",
            "egg_white",
            "tofu_firm",
            "tofu_silken",
            "skyr_plain",
            "greek_yogurt_2pct",
            "cottage_cheese_2pct",
            "quark_lowfat",
            "milk_1_5pct",
            "kefir_plain",
            "cream_cheese_light",
            "creme_fraiche_9pct",
            "cooking_cream_15pct",
            "mozzarella_light",
            "cheddar",
            "feta",
            "parmesan",
            "hard_cheese_vegetarian",
            "ricotta",
            "halloumi",
            "rolled_oats",
            "rice_white_dry",
            "rice_brown_dry",
            "pasta_dry",
            "pasta_wholewheat_dry",
            "lasagne_sheets_dry",
            "couscous_dry",
            "bulgur_dry",
            "pearl_barley_dry",
            "buckwheat_dry",
            "egg_noodles_dry",
            "rice_noodles_dry",
            "rye_bread",
            "wholegrain_bread",
            "tortilla_wholewheat",
            "pita_wholewheat",
            "flour_wheat",
            "breadcrumbs",
            "potato",
            "sweet_potato",
            "gnocchi_potato",
            "biscuit_digestive",
            "ladyfingers",
            "semolina_wheat",
            "onion",
            "red_onion",
            "garlic",
            "carrot",
            "bell_pepper",
            "courgette",
            "aubergine",
            "broccoli",
            "cauliflower",
            "white_cabbage",
            "red_cabbage",
            "mushroom",
            "spinach_fresh",
            "cucumber",
            "tomato",
            "romaine_lettuce",
            "mixed_salad_leaves",
            "leek",
            "pumpkin",
            "radish",
            "spring_onion",
            "celery",
            "spinach_frozen",
            "peas_frozen",
            "green_beans_frozen",
            "sweetcorn_canned",
            "beetroot_cooked",
            "olives",
            "banana",
            "apple",
            "pear",
            "blueberries_fresh",
            "strawberries_fresh",
            "orange_flesh",
            "avocado",
            "mixed_berries_frozen",
            "mango_frozen",
            "lemon_juice",
            "lime_juice",
            "raisins",
            "pineapple_canned_juice",
            "lentils_red_dry",
            "lentils_green_canned",
            "kidney_beans_canned",
            "black_beans_canned",
            "chickpeas_canned",
            "white_beans_canned",
            "edamame_frozen",
            "olive_oil",
            "rapeseed_oil",
            "sesame_oil",
            "butter",
            "peanut_butter",
            "walnuts",
            "almonds",
            "pumpkin_seeds",
            "sunflower_seeds",
            "sesame_seeds",
            "chia_seeds",
            "tahini",
            "tomato_canned",
            "tomato_passata",
            "tomato_paste",
            "soy_sauce_reduced_salt",
            "dijon_mustard",
            "ketchup",
            "balsamic_vinegar",
            "cider_vinegar",
            "sriracha",
            "pesto_basil_vegetarian",
            "coconut_milk_light",
            "mayonnaise_light",
            "worcestershire_sauce",
            "salsa_tomato",
            "barbecue_sauce",
            "vegetable_stock_low_salt",
            "salt",
            "black_pepper",
            "paprika_sweet",
            "paprika_smoked",
            "cumin_ground",
            "coriander_ground",
            "curry_powder",
            "garam_masala",
            "oregano_dried",
            "thyme_dried",
            "chili_flakes",
            "cinnamon_ground",
            "nutmeg_ground",
            "turmeric_ground",
            "allspice_ground",
            "dill_fresh",
            "parsley_fresh",
            "basil_fresh",
            "coriander_fresh",
            "mint_fresh",
            "ginger_fresh",
            "water",
            "cocoa_powder",
            "dark_chocolate_70pct",
            "sugar",
            "honey",
            "maple_syrup",
            "vanilla_extract",
            "baking_powder",
            "cornstarch",
            "instant_coffee"
          ]
        },
        "requirement": {
          "type": "string",
          "minLength": 1
        }
      },
      "required": [
        "normalizedIngredient",
        "requirement"
      ],
      "additionalProperties": false
    },
    "recipe": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string",
          "pattern": "^(breakfast|chicken|beef|pork|fish|vegetarian|pasta|bowl|dessert)_[0-9]{3}$"
        },
        "sequence": {
          "type": "integer",
          "minimum": 1,
          "maximum": 120
        },
        "primaryCategory": {
          "type": "string",
          "enum": [
            "breakfasts",
            "chicken_turkey",
            "beef",
            "pork",
            "fish_seafood",
            "vegetarian",
            "pasta",
            "bowls_wraps_burritos",
            "snacks_desserts"
          ]
        },
        "name": {
          "type": "string",
          "minLength": 1
        },
        "shortDescription": {
          "type": "string",
          "minLength": 1
        },
        "mealType": {
          "type": "array",
          "items": {
            "type": "string",
            "enum": [
              "breakfast",
              "lunch",
              "dinner",
              "snack",
              "dessert"
            ]
          },
          "minItems": 1,
          "uniqueItems": true
        },
        "cuisine": {
          "type": "string",
          "enum": [
            "American-inspired",
            "British-inspired",
            "Central European-inspired",
            "Chinese-inspired",
            "Danish-inspired",
            "East Asian-inspired",
            "Eastern European-inspired",
            "European-inspired",
            "French-inspired",
            "Greek-inspired",
            "Hungarian-inspired",
            "Indian-inspired",
            "International",
            "Italian-inspired",
            "Japanese-inspired",
            "Mediterranean-inspired",
            "Mexican-inspired",
            "Middle Eastern-inspired",
            "Nordic-inspired",
            "North African-inspired",
            "South Asian-inspired",
            "Swedish-inspired",
            "Thai-inspired"
          ]
        },
        "tags": {
          "type": "array",
          "items": {
            "type": "string",
            "enum": [
              "15-minute",
              "30-minute",
              "breakfast",
              "budget",
              "comfort-food",
              "dessert",
              "family-friendly",
              "freezer-friendly",
              "high-fiber",
              "high-protein",
              "meal-prep",
              "one-pan",
              "one-pot",
              "quick",
              "snack",
              "traybake",
              "vegan",
              "vegetarian"
            ]
          },
          "minItems": 0,
          "uniqueItems": true
        },
        "servings": {
          "type": "integer",
          "minimum": 1,
          "maximum": 12
        },
        "prepTimeMinutes": {
          "type": "integer",
          "minimum": 0
        },
        "cookTimeMinutes": {
          "type": "integer",
          "minimum": 0
        },
        "passiveTimeMinutes": {
          "type": "integer",
          "minimum": 0
        },
        "totalTimeMinutes": {
          "type": "integer",
          "minimum": 0
        },
        "difficulty": {
          "type": "string",
          "enum": [
            "easy",
            "medium"
          ]
        },
        "ingredients": {
          "type": "array",
          "items": {
            "$ref": "#/$defs/ingredient"
          },
          "minItems": 1
        },
        "instructions": {
          "type": "array",
          "items": {
            "$ref": "#/$defs/instruction"
          },
          "minItems": 3
        },
        "nutritionPerServing": {
          "$ref": "#/$defs/nutrition"
        },
        "nutritionCalculation": {
          "$ref": "#/$defs/nutritionCalculation"
        },
        "estimatedCostLevel": {
          "type": "string",
          "enum": [
            "very_low",
            "low",
            "medium",
            "high"
          ]
        },
        "mealPrepFriendly": {
          "type": "boolean"
        },
        "freezerFriendly": {
          "type": "boolean"
        },
        "familyFriendly": {
          "type": "boolean"
        },
        "storageDaysFridge": {
          "type": "integer",
          "minimum": 0,
          "maximum": 2
        },
        "reheatingMethod": {
          "type": "string",
          "minLength": 1
        },
        "storeComponentsSeparately": {
          "type": "boolean"
        },
        "storageNotes": {
          "type": "string",
          "minLength": 1
        },
        "freezerNotes": {
          "type": "string",
          "minLength": 1
        },
        "substitutions": {
          "type": "array",
          "items": {
            "$ref": "#/$defs/substitution"
          },
          "minItems": 0
        },
        "possibleAddOns": {
          "type": "array",
          "items": {
            "$ref": "#/$defs/ingredient"
          },
          "minItems": 0
        },
        "possibleRemovals": {
          "type": "array",
          "items": {
            "$ref": "#/$defs/removal"
          },
          "minItems": 0
        },
        "scalingNotes": {
          "$ref": "#/$defs/scalingNotes"
        },
        "allergens": {
          "type": "array",
          "items": {
            "type": "string",
            "enum": [
              "celery",
              "cereals_containing_gluten",
              "crustaceans",
              "eggs",
              "fish",
              "milk",
              "mustard",
              "peanuts",
              "sesame",
              "soy",
              "tree_nuts"
            ]
          },
          "minItems": 0,
          "uniqueItems": true
        },
        "foodSafetyNotes": {
          "type": "array",
          "items": {
            "type": "string",
            "minLength": 1
          },
          "minItems": 1
        },
        "qualityStatus": {
          "$ref": "#/$defs/qualityStatus"
        },
        "ingredientRequirements": {
          "type": "array",
          "items": {
            "$ref": "#/$defs/ingredientRequirement"
          },
          "minItems": 0
        },
        "allergenAssessment": {
          "$ref": "#/$defs/allergenAssessment"
        },
        "freezerScope": {
          "type": "string",
          "enum": [
            "not_recommended",
            "whole_recipe",
            "see_component_instructions"
          ]
        },
        "nutritionTargetNote": {
          "type": "string",
          "minLength": 1
        }
      },
      "required": [
        "id",
        "sequence",
        "primaryCategory",
        "name",
        "shortDescription",
        "mealType",
        "cuisine",
        "tags",
        "servings",
        "prepTimeMinutes",
        "cookTimeMinutes",
        "passiveTimeMinutes",
        "totalTimeMinutes",
        "difficulty",
        "ingredients",
        "instructions",
        "nutritionPerServing",
        "nutritionCalculation",
        "estimatedCostLevel",
        "mealPrepFriendly",
        "freezerFriendly",
        "familyFriendly",
        "storageDaysFridge",
        "reheatingMethod",
        "storeComponentsSeparately",
        "storageNotes",
        "freezerNotes",
        "substitutions",
        "possibleAddOns",
        "possibleRemovals",
        "scalingNotes",
        "allergens",
        "foodSafetyNotes",
        "qualityStatus",
        "ingredientRequirements",
        "allergenAssessment",
        "freezerScope",
        "nutritionTargetNote"
      ],
      "additionalProperties": false
    }
  }
}
