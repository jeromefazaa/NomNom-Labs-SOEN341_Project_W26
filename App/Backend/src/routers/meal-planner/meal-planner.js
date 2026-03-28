const express = require("express");
const db = require("../../database");
const Anthropic = require("@anthropic-ai/sdk");


const router = express.Router();
const plannerDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const plannerMeals = ["Breakfast", "Lunch", "Dinner", "Snack"];


const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,

});

const createEmptyMealPlan = () =>
  plannerDays.reduce((plan, day) => {
    plan[day] = plannerMeals.reduce((meals, meal) => {
      meals[meal] = "";
      return meals;
    }, {});
    return plan;
  }, {});

const normalizeRecipeTitle = (title) =>
  typeof title === "string" ? title.trim().toLowerCase() : "";

const getRecipeLookupForUser = (recipes = {}, userId) => {
  return Object.values(recipes).reduce((lookup, recipe) => {
    if (recipe?.userId !== userId || !recipe?.title) {
      return lookup;
    }

    lookup[normalizeRecipeTitle(recipe.title)] = recipe;
    return lookup;
  }, {});
};

const buildWeeklyRecipePayload = (mealPlan = {}, recipeLookup = {}) => {
  return plannerDays.reduce((weeklyPlan, day) => {
    weeklyPlan[day] = plannerMeals.reduce((dailyPlan, meal) => {
      const recipeTitle = mealPlan?.[day]?.[meal] || "";
      const normalizedTitle = normalizeRecipeTitle(recipeTitle);

      dailyPlan[meal] = normalizedTitle ? recipeLookup[normalizedTitle] || null : null;
      return dailyPlan;
    }, {});

    return weeklyPlan;
  }, {});
};

const parseClaudeJsonBlock = (text = "") => {
  const trimmedText = text.trim();
  const fencedMatch = trimmedText.match(/```json\s*([\s\S]*?)\s*```/i);
  const jsonText = fencedMatch ? fencedMatch[1] : trimmedText;

  return JSON.parse(jsonText);
};

const findDuplicateRecipesInWeek = (mealPlan = {}) => {
  const usedRecipes = new Map();
  const duplicateRecipes = [];

  plannerDays.forEach((day) => {
    plannerMeals.forEach((meal) => {
      const recipeTitle = mealPlan?.[day]?.[meal];
      const normalizedTitle = normalizeRecipeTitle(recipeTitle);

      if (!normalizedTitle) {
        return;
      }

      if (usedRecipes.has(normalizedTitle)) {
        duplicateRecipes.push(recipeTitle.trim());
        return;
      }

      usedRecipes.set(normalizedTitle, `${day}-${meal}`);
    });
  });

  return duplicateRecipes;
};

// Get meal plan for a user
router.get("/:userId", (req, res) => {
  let mealPlans = db.read("meal-plans");
  const userId = req.params.userId;
  const userMealPlan = mealPlans[userId];
  if (userMealPlan) {
    return res.status(200).json({ mealPlan: userMealPlan });
  }
  return res.status(200).json({ mealPlan: createEmptyMealPlan() });
});

// Save meal plan for a user
router.post("/:userId", (req, res) => {
  console.log(`request received`);
  let mealPlans = db.read("meal-plans");
  const userId = req.params.userId;
  const { mealPlan } = req.body;
  console.log(`userMealPlans: ${mealPlan}`);

  // Small validation change: prevent saving the same recipe more than once in a single week.
  const duplicateRecipes = findDuplicateRecipesInWeek(mealPlan);
  if (duplicateRecipes.length > 0) {
    return res.status(400).json({
      error: `A recipe can only be used once per week. Duplicate recipe: ${duplicateRecipes[0]}`,
    });
  }

  mealPlans[userId] = mealPlan;
  console.log(`mealPlans: ${mealPlans["Monday"]}`);
  if (db.write("meal-plans", mealPlans)) {
    return res.status(200).json({ message: "Meal plan saved successfully" });
  }
  return res.status(500).json({ error: "Failed to save meal plan" });
});

// Calculate calories the entire week
router.get('/:userId/macros', async (req, res, next) => {
  console.log(`request received`)
  let mealPlans = db.read("meal-plans");
  let recipes = db.read('recipes');
  const userId = req.params.userId;
  const userMealPlan = mealPlans[userId];
  if (!userMealPlan) {
    return res.status(200).json({ msg: 'User does not have a meal plan' });
  }

  const recipeLookup = getRecipeLookupForUser(recipes, userId);
  const weeklyRecipePayload = buildWeeklyRecipePayload(userMealPlan, recipeLookup);

  console.log(`user meal plans: ${Object.keys(userMealPlan)}`);
  console.log(`weekly payload: ${JSON.stringify(weeklyRecipePayload, null, 2)}`);

  try {
    const input = [
      "You are a nutrition expert.",
      "For each weekday, calculate total Calories, Protein, Carbs, and Fats.",
      "Ignore empty meals where the value is null.",
      "Return a clear day-by-day summary.",
      "Give the same format on every repsonse, return an object nothing else: {Monday:{Calories: x, Protein: x,.....},Tuesday:{...},...",
      "Weekly meal plan with full recipe objects:",
      JSON.stringify(weeklyRecipePayload, null, 2),
    ].join("\n");

    const msg = await anthropic.messages.create({
      model: "claude-opus-4-1-20250805",
      max_tokens: 1000,
      messages: [
        {
          role: "user",
          content: input,
        },
      ],
    });

    const outputText = msg.content
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("\n");
    console.log(`output text: ${outputText}`)

    const macros = parseClaudeJsonBlock(outputText);

    return res.status(200).json({
      weeklyRecipePayload,
      macros,
      output_text: outputText,
    });
  } catch (error) {
    return next(error);
  }

})



module.exports = router;
module.exports.createEmptyMealPlan = createEmptyMealPlan;
module.exports.findDuplicateRecipesInWeek = findDuplicateRecipesInWeek;
