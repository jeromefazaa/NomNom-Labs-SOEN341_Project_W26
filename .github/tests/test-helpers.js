async function login(
  page,
  { email = "marksam@gmail.com", password = "Mark123456" } = {},
) {
  await page.goto("/");
  await page.click(".profile-icon");
  await page.click(".login-button");
  await page.fill('[data-testid="email"]', email);
  await page.fill('[data-testid="password"]', password);
  await page.click(".login-action-button");
}

async function openAddRecipe(page) {
  await page.click(".addRecipe");
}

async function fillRecipeForm(
  page,
  {
    title,
    difficulty = "Beginner",
    prepTime = "30",
    diet = "None",
    cost = "10",
    ingredient = "Flour",
    quantity = "100",
    step = "Mix ingredients",
  },
) {
  await page.getByLabel("Recipe Title").fill(title);
  await page.getByLabel("Difficulty").click();
  await page.getByRole("option", { name: difficulty }).click();
  await page.getByLabel("Preparation Time (minutes)").fill(prepTime);
  await page.getByLabel("Diet").click();
  await page.getByRole("option", { name: diet }).click();
  await page.getByLabel("Cost ($)").fill(cost);
  await page.getByLabel("Ingredient 1").fill(ingredient);
  await page.getByLabel("Quantity (g)").fill(quantity);
  await page.getByLabel("Step 1").fill(step);
}

async function createRecipe(page, recipe) {
  await openAddRecipe(page);
  await fillRecipeForm(page, recipe);
  await page.getByRole("button", { name: "Save Recipe" }).click();
}

module.exports = {
  login,
  createRecipe,
  fillRecipeForm,
};
