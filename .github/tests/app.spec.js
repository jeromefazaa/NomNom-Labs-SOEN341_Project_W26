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
});
