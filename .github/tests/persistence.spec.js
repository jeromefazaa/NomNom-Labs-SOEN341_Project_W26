const { test, expect } = require("@playwright/test");
const { login, createRecipe } = require("./test-helpers");

test("creates a recipe and verifies it persists after logout and login", async ({
  page,
}) => {
  await login(page);
  await createRecipe(page, {
    title: "Persistent Recipe Test",
    difficulty: "Beginner",
    prepTime: "30",
    diet: "None",
    cost: "10",
    ingredient: "Flour",
    quantity: "100",
    step: "Mix ingredients",
  });

  await expect(page.getByText("Persistent Recipe Test")).toBeVisible();
  await page.click(".save-wrapper button");
  await expect(page.getByText("Save successful")).toBeVisible({
    timeout: 10000,
  });

  await page.click(".profile-icon");
  await page.getByRole("button", { name: "Logout" }).click();
  await expect(page.getByRole("button", { name: "Login" })).toBeVisible();

  await page.click(".login-button");
  await expect(page.getByText("Login Form")).toBeVisible();

  await page.fill('[data-testid="email"]', "marksam@gmail.com");
  await page.fill('[data-testid="password"]', "Mark123456");
  await page.click(".login-action-button");

  await expect(page.getByText("Persistent Recipe Test")).toBeVisible();
});
