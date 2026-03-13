const { test, expect } = require("@playwright/test");
test("MealMajor Journey: Register and Redirect", async ({ page }) => {
  // 1. Visit the registration page
  await page.goto("http://localhost:3000/auth/login");
  // 2. Fill out the form
  //const uniqueEmail = `user_${Date.now()}@concordia.ca`;
 await page.fill('input[type="email"]', "marksam@gmail.com");
  await page.fill('input[type="password"]', "Mark123456");
  // 3. Submit and verify redirect to login
  await page.click(".btn.btn-primary");

  await expect(page).toHaveURL(/.*login/);
});
// login instead of signup