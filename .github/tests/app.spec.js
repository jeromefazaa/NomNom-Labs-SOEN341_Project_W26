const { test, expect } = require("@playwright/test");

test("MealMajor Journey: Login", async ({ page }) => {

  await page.goto("/auth/login");

  await page.fill('[data-testid="email"]', "marksam@gmail.com");
  await page.fill('[data-testid="password"]', "Mark123456");

  await page.click(".btn.btn-primary");

  await expect(page).toHaveURL(/.*login/);
});