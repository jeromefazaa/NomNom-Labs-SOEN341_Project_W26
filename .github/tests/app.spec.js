const { test, expect } = require("@playwright/test");

test("MealMajor Journey: Login", async ({ page }) => {

  await page.goto("/auth/login");

  await page.waitForSelector('[data-testid="email"]');

  await page.getByLabel("Email").fill("marksam@gmail.com");
  await page.getByLabel("Password").fill("Mark123456");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page).toHaveURL(/.*login/);
});