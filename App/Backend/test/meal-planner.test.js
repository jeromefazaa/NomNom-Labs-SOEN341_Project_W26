const test = require("node:test");
const assert = require("node:assert/strict");

const mealPlannerRouter = require("../src/routers/meal-planner/meal-planner");

test("findDuplicateRecipesInWeek returns an empty array when the week has no repeated recipes", () => {
  const mealPlan = mealPlannerRouter.createEmptyMealPlan();
  mealPlan.Monday.Breakfast = "Oatmeal";
  mealPlan.Tuesday.Lunch = "Salad";
  mealPlan.Wednesday.Dinner = "Pasta";

  assert.deepEqual(mealPlannerRouter.findDuplicateRecipesInWeek(mealPlan), []);
});

test("findDuplicateRecipesInWeek flags repeated recipes across different days and meals", () => {
  const mealPlan = mealPlannerRouter.createEmptyMealPlan();
  mealPlan.Monday.Breakfast = "Tacos";
  mealPlan.Friday.Dinner = "  tacos  ";

  assert.deepEqual(mealPlannerRouter.findDuplicateRecipesInWeek(mealPlan), ["tacos"]);
});
