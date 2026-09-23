Add a new FAMILY feature to the existing MacroCart product.

Do NOT redesign the whole app.

Extend the current product with:

1. family profiles
2. inviting family members
3. child profiles
4. meal preferences
5. meal voting
6. family approval scores
7. family-aware meal plan optimization

The experience should feel simple, warm, modern and lightweight.

Do not turn this into a social network.

The goal is:

“Build a weekly meal plan that the whole household will actually eat.”

CORE CONCEPT

A household can have multiple people.

Example:

Dad
Mom
Maria
Daryna

Each person may have:

* different food preferences
* different disliked foods
* dietary restrictions
* different portion sizes
* different calorie needs
* different age groups
* different opinions about meals

MacroCart should use these preferences when creating or changing a weekly meal plan.

FAMILY ENTRY POINT

Add a new section inside Profile / Settings:

Family

Show:

My household

Example:

Dad
Owner

Mom
Adult

Maria
Child

Daryna
Child

CTA:

* Add family member

Also show:

Family preferences
Meal voting
Family meal history

ADD FAMILY MEMBER FLOW

When the user taps:

* Add family member

Open a clean bottom sheet or full-screen flow.

Step 1:

Who are you adding?

Options:

Adult
Child

Step 2:

Name

Example:
Maria

Step 3:

Relationship

Options:

Partner
Child
Parent
Other

Step 4:

Profile type

For adults:

Option 1:
Invite to MacroCart

Description:
They can vote on meals and manage their own preferences.

Option 2:
Create profile only

Description:
You manage their preferences for them.

For children:

Default to:
Parent-managed profile

Optional:
Simple voting mode

Do not require children to have email accounts.

ADULT INVITATION FLOW

If the user chooses:

Invite to MacroCart

Create an invitation screen.

Show:

Invite Mom to your household

Options:

Copy invite link
Share invite
QR code

Prototype behavior should work locally.

Example invite:

“Join our MacroCart household”

When accepted, the family member appears as:

Mom
Connected

The app should visually distinguish:

Connected account
Managed profile

CHILD PROFILE

Child profiles should be much simpler.

Fields:

Name

Age group:

2–5
6–9
10–13
14–17

Avoid collecting unnecessary personal information.

Do not show weight, calories or fitness goals by default for young children.

Instead focus on:

Foods they like
Foods they dislike
Allergies / dietary restrictions
Meal reactions

CHILD FOOD PREFERENCES

Create a visual preference setup.

Question:

What does Maria like?

Use large selectable food categories with icons/photos:

Chicken
Beef
Fish
Pasta
Rice
Potatoes
Eggs
Fruit
Vegetables
Yogurt
Cheese
Bread
Soup
Tacos
Pizza-style meals
Pancakes

Then:

What does Maria usually avoid?

Same style.

Then:

Any dietary restrictions?

Options:

None
Lactose
Gluten
Nuts
Eggs
Fish
Other

Dietary restrictions must be treated differently from dislikes.

A dislike is a preference.

An allergy or restriction is a hard rule.

FAMILY MEMBER CARD

Each member should have a card.

Example:

Maria

Child

Likes:
Pasta
Chicken
Fruit

Avoids:
Fish

Meal approval:
82%

Allow opening the profile.

FAMILY MEMBER PROFILE

Inside a family member profile show:

Name
Role
Connection status

Sections:

Food preferences

Dietary restrictions

Favorite meals

Disliked meals

Meal voting history

For adults also allow:

Nutrition targets

Optional:

Calories
Protein target
Portion multiplier

For example:

Dad:
1.2x portion

Mom:
0.9x portion

Maria:
0.55x portion

Do not overcomplicate exact nutrition for children.

Use portion scaling rather than calorie targets by default for child profiles.

HOUSEHOLD MEAL LOGIC

A household usually eats the same core meal.

Do NOT generate completely different dinners for every family member by default.

Instead:

Base recipe:
Chicken Burrito Bowl

Then adjust portions.

Example:

Dad
1.2 portions

Mom
0.9 portions

Maria
0.6 portions

Daryna
0.45 portions

This should automatically affect:

ingredient quantities
shopping list
weekly cost

Example:

Instead of:

Chicken needed:
180g

For family:

Chicken needed:
570g

ROUNDING

Shopping list should calculate realistic package quantities.

Example:

Need:
570g chicken

Available package:
700g

Shopping list:
1 × 700g package

Do not pretend supermarkets sell exact recipe quantities.

MEAL VOTING

Meal voting is a key feature.

Whenever a parent changes or proposes a dinner, household members can react.

Example:

Thursday Dinner

Beef Burrito Bowl

Family vote:

Dad
👍

Mom
👍

Maria
👎

Daryna
👍

3 of 4 like this meal

Family approval:
75%

Use three primary reactions:

👍 Want it

😐 Fine

👎 Rather not

For children in Simple Voting Mode:

Show only:
meal image
meal name
three very large reaction buttons

Avoid calories, prices and complex nutrition information.

FAMILY VOTING SCREEN

Create a section:

Vote on meals

Header:

What should we eat next week?

Show recipe cards one at a time.

Recipe card:

Large food image

Creamy Chicken Pasta

25 min

Family-friendly

Actions:

👍 Want it
😐 Fine
👎 Skip

Allow swipe or button interaction.

After voting:

Next recipe appears.

Show simple progress:

4 of 10

For child profiles use even simpler UI.

FAMILY PICKS

Add a feature:

Family Picks

Before generating next week's plan, allow each family member to vote on suggested meals.

Example:

Next week

14 meals planned

11 family favorites
3 new meals

Show:

Family approval:
91%

Plan should try to maximize household preference without ignoring:

budget
nutrition
dietary restrictions
variety

MEAL DETAIL FAMILY SECTION

Inside meal details add:

Family

Example:

Creamy Chicken Pasta

Dad 👍
Mom 👍
Maria 👍
Daryna 😐

Family approval:
88%

Add button:

Ask family

If not everyone has voted.

MEAL CHANGE FLOW

When the plan owner changes a meal:

Example:

Chicken Pasta
→
Beef Burrito Bowl

After choosing replacement show:

Notify household?

Default:
Yes

Then send a local prototype notification / inbox item:

Thursday dinner changed

Beef Burrito Bowl

Vote now

Family members can react.

PLAN OWNER VIEW

The household owner should see:

Thursday dinner

Beef Burrito Bowl

3/4 voted

Approval:
75%

Show small avatars/reactions.

If approval is low:

Show:

Low family approval

CTA:

Find another option

When tapped, show 3 alternative meals.

Alternative cards should include:

Recipe
Price per family meal
Prep time
Nutrition
Family predicted preference

Example:

Chicken Tacos

Estimated family approval:
92%

Total dinner cost:
84 DKK

25 min

Do not make “predicted preference” look scientifically exact.

Use wording like:

Likely to be popular

or

Based on your family preferences

LEARNING FROM VOTES

Prototype a lightweight preference-learning system.

Each reaction should influence future suggestions.

Example behavior:

If Maria repeatedly dislikes fish recipes:

Increase negative preference for fish.

If the whole family repeatedly likes pasta meals:

Increase pasta preference.

Do NOT immediately block foods after one dislike.

Suggested logic:

Want it:
+2 preference points

Fine:
0

Rather not:
-1

Repeated dislikes:
stronger negative weight

Dietary restriction:
hard exclusion

FAMILY APPROVAL SCORE

Add a family approval score to weekly plans.

Example:

Weekly plan

Nutrition:
On target

Budget:
437 / 450 DKK

Family approval:
89%

Variety:
Good

Avoid gamifying children around calories.

This score should represent meal preference only.

FAVORITE MEALS

Add:

Family Favorites

A recipe becomes a family favorite if:

multiple family members regularly vote positively

or

the plan owner manually saves it.

Show:

Creamy Chicken Pasta
96% approval

Chicken Tacos
91% approval

Swedish Meatballs
88% approval

Add:

Cook again

This should make the recipe more likely to appear in future plans.

NEVER AGAIN

Inside meal voting history allow adults to mark:

Never suggest again

This is different from a normal 👎.

Use carefully.

Do not expose this as a large primary action for children.

HOUSEHOLD SETTINGS

Create:

Family Settings

Options:

Who can edit the weekly plan?

Owner only
All adults

Who can change shopping list?

Owner only
Adults

Who can vote?

Everyone

Child voting mode:

Enabled / Disabled

Notify family when meals change:

Enabled

New weekly plan voting:

Enabled

FAMILY NOTIFICATIONS

Prototype simple in-app notifications.

Examples:

Dad changed Thursday dinner.

Vote on the new meal.

Your family plan for next week is ready.

3 meals are waiting for your vote.

Maria liked Chicken Tacos.

Keep notifications visually subtle.

Do not make the feature noisy.

SHOPPING LIST INTEGRATION

Family portions must affect the shopping list.

Example:

Creamy Chicken Pasta

Dad:
180g chicken

Mom:
140g

Maria:
90g

Daryna:
70g

Total:
480g chicken

If chicken appears in multiple recipes, aggregate all quantities.

Then calculate required packages.

Shopping list example:

Chicken breast

Need:
2.7 kg

Pack:
700g

Buy:
4 packs

Total:
2.8 kg

Estimated:
159.80 DKK

This household scaling should work throughout the app.

FAMILY COST VIEW

Allow showing:

Weekly grocery cost

437 DKK

Cost per person:

Dad
151 DKK

Mom
121 DKK

Maria
91 DKK

Daryna
74 DKK

This is optional information.

Do not overemphasize exact cost allocation because shared ingredients make it approximate.

Label:

Estimated share

DATA MODEL

Create reusable data structures.

Household:

id
name
ownerId
members
settings

FamilyMember:

id
name
role
profileType
connectionStatus
ageGroup
portionMultiplier
preferences
restrictions
favoriteRecipes
dislikedRecipes

MealVote:

id
mealId
recipeId
memberId
reaction
createdAt

Allowed reactions:

want
fine
skip

Preference:

ingredientId
score

Restriction:

ingredientId
type

Types:

allergy
dietary
religious
medical
other

Do not treat normal dislikes as restrictions.

WEEKLY PLAN OPTIMIZATION

Extend the existing meal plan scoring.

Each meal should conceptually have:

nutritionScore
priceScore
discountScore
familyPreferenceScore
varietyScore
prepTimeScore

The optimizer should balance them.

Do NOT simply choose the highest family preference every time.

Otherwise the system may repeatedly choose pizza, pasta or pancakes.

The plan should maintain variety.

CORE PRODUCT PRINCIPLE

MacroCart should solve:

“What can our family eat this week that everyone will mostly enjoy, fits our needs, and does not waste money?”

The product should not try to make every family member perfectly happy with every meal.

Aim for practical household compromise.

VISUAL DESIGN

Use the existing MacroCart visual system.

Family UI should feel:

warm
clean
simple
modern
Scandinavian

Use small circular avatars or initials.

Avoid cartoon family graphics.

Avoid childish visual language in adult screens.

Child voting mode can use:

large food imagery
large reaction controls
very little text

IMPORTANT

Make all interactions functional in prototype state.

The following journey must work:

Profile
→ Family
→ Add member
→ Add child Maria
→ set Maria's preferences
→ create Mom as invited adult
→ view household
→ open weekly plan
→ change Thursday dinner
→ request family vote
→ switch to Maria voting mode
→ Maria votes 👎
→ switch back to owner
→ see updated approval score
→ choose a higher-rated alternative
→ shopping quantities update based on family portions

Do not rebuild unrelated parts of MacroCart.

Extend the current app cleanly and preserve existing functionality.
