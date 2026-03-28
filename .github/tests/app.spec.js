const { test, expect } = require("@playwright/test");

test.describe("MealMajor Journey", () => {
  test("signs up with the test account and logs in", async ({ page }) => {
    let signUpDialogMessage = null;

    page.on("dialog", async (dialog) => {
      signUpDialogMessage = dialog.message();
      await dialog.accept();
    });

    await page.goto("/");
    await page.click(".profile-icon");
    await page.click(".signup-button");
    await page.getByLabel("First Name:").fill("Automatic");
    await page.getByLabel("Last Name:").fill("Test");
    await page.getByLabel("Email:").fill("automaticTest@gmail.com");
    await page.getByLabel("Password:").fill("Test123456");
    await page.click(".signup-action-button");

    if (signUpDialogMessage === "User already exists.") {
      await page.getByRole("button", { name: "Login" }).click();
    } else {
      await expect(page.getByText("Login Form")).toBeVisible();
    }

    await page.fill('[data-testid="email"]', "automaticTest@gmail.com");
    await page.fill('[data-testid="password"]', "Test123456");
    await page.locator(".auth-form .login-action-button").click();

    await page.click(".profile-icon");
    await expect(page.getByRole("button", { name: "Logout" })).toBeVisible();
  });

  test("logs in successfully", async ({ page }) => {
    await page.goto("/");
    await page.click(".profile-icon");
    await page.click(".login-button");
    await page.fill('[data-testid="email"]', "marksam@gmail.com");
    await page.fill('[data-testid="password"]', "Mark123456");
    await page.click(".login-action-button");

    await page.click(".profile-icon");
    await expect(page.getByRole("button", { name: "Logout" })).toBeVisible();
  });

  test("creates a new recipe", async ({ page }) => {
    // Login first
    await page.goto("/");
    await page.click(".profile-icon");
    await page.click(".login-button");
    await page.fill('[data-testid="email"]', "marksam@gmail.com");
    await page.fill('[data-testid="password"]', "Mark123456");
    await page.click(".login-action-button");

    // Click Add Recipe
    await page.click(".addRecipe");

    // Fill the form
    await page.getByLabel("Recipe Title").fill("Test Recipe");

    // For Material-UI TextField select, click the field to open dropdown, then select option
    await page.getByLabel("Difficulty").click();
    await page.getByRole("option", { name: "Beginner" }).click();

    await page.getByLabel("Preparation Time (minutes)").fill("30");

    await page.getByLabel("Diet").click();
    await page.getByRole("option", { name: "None" }).click();

    await page.getByLabel("Cost ($)").fill("10");

    // Ingredients
    await page.getByLabel("Ingredient 1").fill("Flour");
    await page.getByLabel("Quantity (g)").fill("100");

    // Steps
    await page.getByLabel("Step 1").fill("Mix ingredients");

    // Save
    await page.getByRole("button", { name: "Save Recipe" }).click();

    // Verify the recipe appears
    await expect(page.getByText("Test Recipe")).toBeVisible();
  });

  test("edits an existing recipe", async ({ page }) => {
    // Login first
    await page.goto("/");
    await page.click(".profile-icon");
    await page.click(".login-button");
    await page.fill('[data-testid="email"]', "marksam@gmail.com");
    await page.fill('[data-testid="password"]', "Mark123456");
    await page.click(".login-action-button");

    // Create a recipe to edit
    await page.click(".addRecipe");
    await page.getByLabel("Recipe Title").fill("Recipe To Edit");
    await page.getByLabel("Difficulty").click();
    await page.getByRole("option", { name: "Beginner" }).click();
    await page.getByLabel("Preparation Time (minutes)").fill("30");
    await page.getByLabel("Diet").click();
    await page.getByRole("option", { name: "None" }).click();
    await page.getByLabel("Cost ($)").fill("15");
    await page.getByLabel("Ingredient 1").fill("Butter");
    await page.getByLabel("Quantity (g)").fill("50");
    await page.getByLabel("Step 1").fill("Melt butter");
    await page.getByRole("button", { name: "Save Recipe" }).click();

    // Wait for the recipe card to appear
    await page.waitForSelector(".recipe-card");
    const recipeCard = page
      .locator(".recipe-card")
      .filter({ hasText: "Recipe To Edit" });
    await recipeCard.waitFor({ state: "visible", timeout: 10000 });

    // Click Edit button
    await recipeCard.getByRole("button", { name: "Edit" }).click();
    await page.waitForSelector(".recipe-dialog");

    // Modify the prep time
    await page.getByLabel("Preparation Time (minutes)").clear();
    await page.getByLabel("Preparation Time (minutes)").fill("45");

    // Save changes
    await page.getByRole("button", { name: "Save Changes" }).click();

    // Verify the recipe still appears with updated prep time
    await expect(page.getByText("Recipe To Edit")).toBeVisible();
    await expect(page.getByText("45m")).toBeVisible();
  });

  test("deletes a recipe", async ({ page }) => {
    // Login first
    await page.goto("/");
    await page.click(".profile-icon");
    await page.click(".login-button");
    await page.fill('[data-testid="email"]', "marksam@gmail.com");
    await page.fill('[data-testid="password"]', "Mark123456");
    await page.click(".login-action-button");

    // Create a recipe to delete
    await page.click(".addRecipe");
    await page.getByLabel("Recipe Title").fill("Recipe To Delete");
    await page.getByLabel("Difficulty").click();
    await page.getByRole("option", { name: "Intermediate" }).click();
    await page.getByLabel("Preparation Time (minutes)").fill("20");
    await page.getByLabel("Diet").click();
    await page.getByRole("option", { name: "Vegan" }).click();
    await page.getByLabel("Cost ($)").fill("8");
    await page.getByLabel("Ingredient 1").fill("Tofu");
    await page.getByLabel("Quantity (g)").fill("200");
    await page.getByLabel("Step 1").fill("Cut tofu");
    await page.getByRole("button", { name: "Save Recipe" }).click();

    // Wait for the recipe card to appear
    await page.waitForSelector(".recipe-card");
    const recipeCard = page
      .locator(".recipe-card")
      .filter({ hasText: "Recipe To Delete" });
    await recipeCard.waitFor({ state: "visible", timeout: 10000 });

    // Click Delete button
    await recipeCard.getByRole("button", { name: "Delete" }).click();

    // Confirm deletion in the dialog
    await page.getByRole("button", { name: "Yes" }).click();

    // Verify the recipe is removed
    await expect(page.getByText("Recipe To Delete")).not.toBeVisible();
  });

  test("adds a recipe and assigns it to Monday Breakfast in meal planner", async ({
    page,
  }) => {
    // Login first
    await page.goto("/");
    await page.click(".profile-icon");
    await page.click(".login-button");
    await page.fill('[data-testid="email"]', "marksam@gmail.com");
    await page.fill('[data-testid="password"]', "Mark123456");
    await page.click(".login-action-button");

    // Click Add Recipe
    await page.click(".addRecipe");

    // Fill the form
    await page.getByLabel("Recipe Title").fill("Meal Planner Test Recipe");

    // Select Difficulty
    await page.getByLabel("Difficulty").click();
    await page.getByRole("option", { name: "Beginner" }).click();

    await page.getByLabel("Preparation Time (minutes)").fill("30");

    await page.getByLabel("Diet").click();
    await page.getByRole("option", { name: "None" }).click();

    await page.getByLabel("Cost ($)").fill("10");

    // Ingredients
    await page.getByLabel("Ingredient 1").fill("Flour");
    await page.getByLabel("Quantity (g)").fill("100");

    // Steps
    await page.getByLabel("Step 1").fill("Mix ingredients");

    // Save
    await page.getByRole("button", { name: "Save Recipe" }).click();

    // Verify the recipe appears
    await expect(page.getByText("Meal Planner Test Recipe")).toBeVisible();

    // Click Meal Planner button
    await page.click(".mealPlan");

    // Wait for meal planner to open
    await page.waitForSelector(".meal-planner-panel");

    // Select the dropdown for Monday Breakfast
    // The select is inside a label with class meal-grid-cell, for Monday and Breakfast
    const mondayBreakfastSelect = page
      .locator(".meal-grid-cell")
      .filter({ hasText: "MondayBreakfast" })
      .locator("select");
    await mondayBreakfastSelect.selectOption("Meal Planner Test Recipe");

    // Click Save Meal Plan
    await page.click(".meal-plan-save");

    // Verify the success message appears
    await expect(page.getByText("Save successful")).toBeVisible();
  });

  test("searches for recipes using the search bar", async ({ page }) => {
    // Login first
    await page.goto("/");
    await page.click(".profile-icon");
    await page.click(".login-button");
    await page.fill('[data-testid="email"]', "marksam@gmail.com");
    await page.fill('[data-testid="password"]', "Mark123456");
    await page.click(".login-action-button");

    // Create first recipe
    await page.click(".addRecipe");
    await page.getByLabel("Recipe Title").fill("Chicken Curry");
    await page.getByLabel("Difficulty").click();
    await page.getByRole("option", { name: "Intermediate" }).click();
    await page.getByLabel("Preparation Time (minutes)").fill("45");
    await page.getByLabel("Diet").click();
    await page.getByRole("option", { name: "None" }).click();
    await page.getByLabel("Cost ($)").fill("20");
    await page.getByLabel("Ingredient 1").fill("Chicken");
    await page.getByLabel("Quantity (g)").fill("500");
    await page.getByLabel("Step 1").fill("Cook chicken");
    await page.getByRole("button", { name: "Save Recipe" }).click();

    // Create second recipe
    await page.click(".addRecipe");
    await page.getByLabel("Recipe Title").fill("Vegan Salad");
    await page.getByLabel("Difficulty").click();
    await page.getByRole("option", { name: "Beginner" }).click();
    await page.getByLabel("Preparation Time (minutes)").fill("15");
    await page.getByLabel("Diet").click();
    await page.getByRole("option", { name: "Vegan" }).click();
    await page.getByLabel("Cost ($)").fill("10");
    await page.getByLabel("Ingredient 1").fill("Lettuce");
    await page.getByLabel("Quantity (g)").fill("200");
    await page.getByLabel("Step 1").fill("Chop lettuce");
    await page.getByRole("button", { name: "Save Recipe" }).click();

    // Verify both recipes appear
    await expect(page.getByText("Chicken Curry")).toBeVisible();
    await expect(page.getByText("Vegan Salad")).toBeVisible();

    // Search for "chicken"
    await page.fill(".search-input", "chicken");

    // Verify only Chicken Curry appears
    await expect(page.getByText("Chicken Curry")).toBeVisible();
    await expect(page.getByText("Vegan Salad")).not.toBeVisible();

    // Clear search
    await page.fill(".search-input", "");

    // Verify both appear again
    await expect(page.getByText("Chicken Curry")).toBeVisible();
    await expect(page.getByText("Vegan Salad")).toBeVisible();

    // Search for "vegan"
    await page.fill(".search-input", "vegan");

    // Verify only Vegan Salad appears
    await expect(page.getByText("Chicken Curry")).not.toBeVisible();
    await expect(page.getByText("Vegan Salad")).toBeVisible();
  });

  test("filters recipes using the filter controls", async ({ page }) => {
    // Login first
    await page.goto("/");
    await page.click(".profile-icon");
    await page.click(".login-button");
    await page.fill('[data-testid="email"]', "marksam@gmail.com");
    await page.fill('[data-testid="password"]', "Mark123456");
    await page.click(".login-action-button");

    // Create first recipe - Beginner, 15 min, Vegan, $10
    await page.click(".addRecipe");
    await page.getByLabel("Recipe Title").fill("Quick Vegan Salad");
    await page.getByLabel("Difficulty").click();
    await page.getByRole("option", { name: "Beginner" }).click();
    await page.getByLabel("Preparation Time (minutes)").fill("15");
    await page.getByLabel("Diet").click();
    await page.getByRole("option", { name: "Vegan" }).click();
    await page.getByLabel("Cost ($)").fill("10");
    await page.getByLabel("Ingredient 1").fill("Lettuce");
    await page.getByLabel("Quantity (g)").fill("200");
    await page.getByLabel("Step 1").fill("Chop lettuce");
    await page.getByRole("button", { name: "Save Recipe" }).click();

    // Create second recipe - Advanced, 90 min, None, $60
    await page.click(".addRecipe");
    await page.getByLabel("Recipe Title").fill("Complex Beef Stew");
    await page.getByLabel("Difficulty").click();
    await page.getByRole("option", { name: "Advanced" }).click();
    await page.getByLabel("Preparation Time (minutes)").fill("90");
    await page.getByLabel("Diet").click();
    await page.getByRole("option", { name: "None" }).click();
    await page.getByLabel("Cost ($)").fill("60");
    await page.getByLabel("Ingredient 1").fill("Beef");
    await page.getByLabel("Quantity (g)").fill("1000");
    await page.getByLabel("Step 1").fill("Slow cook beef");
    await page.getByRole("button", { name: "Save Recipe" }).click();

    // Verify both recipes appear
    await expect(page.getByText("Quick Vegan Salad")).toBeVisible();
    await expect(page.getByText("Complex Beef Stew")).toBeVisible();

    // Filter by Difficulty: Beginner
    await page.selectOption(".filter-control", "Beginner");

    // Verify only Quick Vegan Salad appears
    await expect(page.getByText("Quick Vegan Salad")).toBeVisible();
    await expect(page.getByText("Complex Beef Stew")).not.toBeVisible();

    // Clear filters
    await page.click('button:has-text("Clear Filters")');

    // Verify both appear again
    await expect(page.getByText("Quick Vegan Salad")).toBeVisible();
    await expect(page.getByText("Complex Beef Stew")).toBeVisible();

    // Filter by Prep Time: 30 min or less
    await page.selectOption('select[class="filter-control"]', "30");

    // Verify only Quick Vegan Salad appears (15 min <= 30)
    await expect(page.getByText("Quick Vegan Salad")).toBeVisible();
    await expect(page.getByText("Complex Beef Stew")).not.toBeVisible();

    // Clear filters
    await page.click('button:has-text("Clear Filters")');

    // Filter by Diet: Vegan
    await page.selectOption('select[class="filter-control"]', "Vegan");

    // Verify only Quick Vegan Salad appears
    await expect(page.getByText("Quick Vegan Salad")).toBeVisible();
    await expect(page.getByText("Complex Beef Stew")).not.toBeVisible();

    // Clear filters
    await page.click('button:has-text("Clear Filters")');

    // Filter by Cost: 25$ or less
    await page.selectOption('select[class="filter-control"]', "25");

    // Verify only Quick Vegan Salad appears ($10 <= 25)
    await expect(page.getByText("Quick Vegan Salad")).toBeVisible();
    await expect(page.getByText("Complex Beef Stew")).not.toBeVisible();
  });
});
