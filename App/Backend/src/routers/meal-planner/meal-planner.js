const express = require("express");
const db = require("../../database");

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

module.exports = router;
module.exports.createEmptyMealPlan = createEmptyMealPlan;
module.exports.findDuplicateRecipesInWeek = findDuplicateRecipesInWeek;
