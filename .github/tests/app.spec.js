const { test, expect } = require("@playwright/test");

test.describe("MealMajor Journey", () => {
  test.describe.configure({ mode: "serial" });

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
    // Navigate to the app
    await page.goto("/");

    // Wait for recipes to load and find "Test Recipe"
    const testRecipeCard = page
      .locator(".recipe-card")
      .filter({ hasText: "Test Recipe" });
    await testRecipeCard.waitFor({ state: "visible", timeout: 10000 });

    // Click Edit button on the recipe card
    await testRecipeCard.getByRole("button", { name: "Edit" }).click();

    // Wait for the form to appear
    await page.waitForSelector(".recipe-dialog");

    // Modify prep time
    await page.getByLabel("Preparation Time (minutes)").clear();
    await page.getByLabel("Preparation Time (minutes)").fill("45");

    // Save Changes
    await page.getByRole("button", { name: "Save Changes" }).click();

    // Verify the recipe still appears and prep time is updated
    await expect(page.getByText("Test Recipe")).toBeVisible();
    await expect(page.getByText("45m")).toBeVisible();
  });

  test("deletes a recipe", async ({ page }) => {
    // Navigate to the app
    await page.goto("/");

    // Wait for recipes to load
    const testRecipeCard = page
      .locator(".recipe-card")
      .filter({ hasText: "Test Recipe" });
    await testRecipeCard.waitFor({ state: "visible", timeout: 10000 });

    // Click Delete on the Test Recipe card
    await testRecipeCard.getByRole("button", { name: "Delete" }).click();

    // Confirm delete
    await page.getByRole("button", { name: "Yes" }).click();

    // Verify the recipe is removed
    await expect(page.getByText("Test Recipe")).not.toBeVisible();
  });
});
