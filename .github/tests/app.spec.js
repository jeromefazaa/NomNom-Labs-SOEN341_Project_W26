const { test, expect } = require("@playwright/test");
test("MealMajor Journey: Register and Redirect", async ({ page }) => {
  // 1. Visit the registration page
  await page.goto("http://localhost:3000/login");
  // 2. Fill out the form
  //const uniqueEmail = `user_${Date.now()}@concordia.ca`;
  await page.fill("#email", "marksam@gmail.com");
  await page.fill("#password", "Mark123456");
  // 3. Submit and verify redirect to login
  await page.click("#registerBtn");
  await expect(page).toHaveURL(/.*login/);
});
// login instead of signup