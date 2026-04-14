const { test, expect } = require("@playwright/test");
const { login, createRecipe } = require("./test-helpers");

test("adds a recipe and assigns it to Monday Breakfast in meal planner", async ({
  page,
}) => {
  await login(page);
  await createRecipe(page, {
    title: "Meal Planner Test Recipe",
    difficulty: "Beginner",
    prepTime: "30",
    diet: "None",
    cost: "10",
    ingredient: "Flour",
    quantity: "100",
    step: "Mix ingredients",
  });

  await expect(page.getByText("Meal Planner Test Recipe")).toBeVisible();
  await page.click(".mealPlan");
  await page.waitForSelector(".meal-planner-panel");

  const mondayBreakfastSelect = page
    .locator(".meal-grid-cell")
    .filter({ hasText: "MondayBreakfast" })
    .locator("select");
  await mondayBreakfastSelect.selectOption("Meal Planner Test Recipe");
  await page.click(".meal-plan-save");

  await expect(page.getByText("Save successful")).toBeVisible();
});
