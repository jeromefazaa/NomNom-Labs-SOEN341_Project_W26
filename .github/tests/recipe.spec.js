const { test, expect } = require("@playwright/test");
const { login, createRecipe } = require("./test-helpers");

test.describe("Recipe Management", () => {
  test("creates a new recipe", async ({ page }) => {
    await login(page);
    await createRecipe(page, {
      title: "Test Recipe",
      difficulty: "Beginner",
      prepTime: "30",
      diet: "None",
      cost: "10",
      ingredient: "Flour",
      quantity: "100",
      step: "Mix ingredients",
    });

    await expect(page.getByText("Test Recipe")).toBeVisible();
  });

  test("edits an existing recipe", async ({ page }) => {
    await login(page);
    await createRecipe(page, {
      title: "Recipe To Edit",
      difficulty: "Beginner",
      prepTime: "30",
      diet: "None",
      cost: "15",
      ingredient: "Butter",
      quantity: "50",
      step: "Melt butter",
    });

    await page.waitForSelector(".recipe-card");
    const recipeCard = page
      .locator(".recipe-card")
      .filter({ hasText: "Recipe To Edit" });
    await recipeCard.waitFor({ state: "visible", timeout: 10000 });
    await recipeCard.getByRole("button", { name: "Edit" }).click();
    await page.waitForSelector(".recipe-dialog");

    await page.getByLabel("Preparation Time (minutes)").fill("45");
    await page.getByRole("button", { name: "Save Changes" }).click();

    await expect(page.getByText("Recipe To Edit")).toBeVisible();
    await expect(page.getByText("45m")).toBeVisible();
  });

  test("deletes a recipe", async ({ page }) => {
    await login(page);
    await createRecipe(page, {
      title: "Recipe To Delete",
      difficulty: "Intermediate",
      prepTime: "20",
      diet: "Vegan",
      cost: "8",
      ingredient: "Tofu",
      quantity: "200",
      step: "Cut tofu",
    });

    await page.waitForSelector(".recipe-card");
    const recipeCard = page
      .locator(".recipe-card")
      .filter({ hasText: "Recipe To Delete" });
    await recipeCard.waitFor({ state: "visible", timeout: 10000 });

    await recipeCard.getByRole("button", { name: "Delete" }).click();
    await page.getByRole("button", { name: "Yes" }).click();

    await expect(page.getByText("Recipe To Delete")).not.toBeVisible();
  });
});
