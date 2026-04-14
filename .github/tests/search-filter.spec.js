const { test, expect } = require("@playwright/test");
const { login, createRecipe } = require("./test-helpers");

test.describe("Search and Filter", () => {
  test("searches for recipes using the search bar", async ({ page }) => {
    await login(page);
    await createRecipe(page, {
      title: "Chicken Curry",
      difficulty: "Intermediate",
      prepTime: "45",
      diet: "None",
      cost: "20",
      ingredient: "Chicken",
      quantity: "500",
      step: "Cook chicken",
    });
    await createRecipe(page, {
      title: "Vegan Salad",
      difficulty: "Beginner",
      prepTime: "15",
      diet: "Vegan",
      cost: "10",
      ingredient: "Lettuce",
      quantity: "200",
      step: "Chop lettuce",
    });

    await expect(page.getByText("Chicken Curry")).toBeVisible();
    await expect(page.getByText("Vegan Salad")).toBeVisible();

    await page.fill(".search-input", "chicken");
    await expect(page.getByText("Chicken Curry")).toBeVisible();
    await expect(page.getByText("Vegan Salad")).not.toBeVisible();

    await page.fill(".search-input", "");
    await expect(page.getByText("Chicken Curry")).toBeVisible();
    await expect(page.getByText("Vegan Salad")).toBeVisible();

    await page.fill(".search-input", "vegan");
    await expect(page.getByText("Chicken Curry")).not.toBeVisible();
    await expect(page.getByText("Vegan Salad")).toBeVisible();
  });

  test("filters recipes using the filter controls", async ({ page }) => {
    await login(page);
    await createRecipe(page, {
      title: "Quick Vegan Salad",
      difficulty: "Beginner",
      prepTime: "15",
      diet: "Vegan",
      cost: "10",
      ingredient: "Lettuce",
      quantity: "200",
      step: "Chop lettuce",
    });
    await createRecipe(page, {
      title: "Complex Beef Stew",
      difficulty: "Advanced",
      prepTime: "90",
      diet: "None",
      cost: "60",
      ingredient: "Beef",
      quantity: "1000",
      step: "Slow cook beef",
    });

    await expect(page.getByText("Quick Vegan Salad")).toBeVisible();
    await expect(page.getByText("Complex Beef Stew")).toBeVisible();

    await page.locator(".filter-control").nth(1).selectOption("Beginner");
    await expect(page.getByText("Quick Vegan Salad")).toBeVisible();
    await expect(page.getByText("Complex Beef Stew")).not.toBeVisible();

    await page
      .locator(".action-btn")
      .filter({ hasText: "Clear Filters" })
      .click();
    await expect(page.getByText("Quick Vegan Salad")).toBeVisible();
    await expect(page.getByText("Complex Beef Stew")).toBeVisible();

    await page.locator(".filter-control").nth(0).selectOption("30");
    await expect(page.getByText("Quick Vegan Salad")).toBeVisible();
    await expect(page.getByText("Complex Beef Stew")).not.toBeVisible();

    await page
      .locator(".action-btn")
      .filter({ hasText: "Clear Filters" })
      .click();
    await page.locator(".filter-control").nth(2).selectOption("Vegan");
    await expect(page.getByText("Quick Vegan Salad")).toBeVisible();
    await expect(page.getByText("Complex Beef Stew")).not.toBeVisible();

    await page
      .locator(".action-btn")
      .filter({ hasText: "Clear Filters" })
      .click();
    await page.locator(".filter-control").nth(3).selectOption("25");
    await expect(page.getByText("Quick Vegan Salad")).toBeVisible();
    await expect(page.getByText("Complex Beef Stew")).not.toBeVisible();
  });
});
