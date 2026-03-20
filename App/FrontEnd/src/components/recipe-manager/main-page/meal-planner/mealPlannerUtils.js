export const normalizeRecipeTitle = (title) =>
  typeof title === "string" ? title.trim().toLowerCase() : "";

export const getUsedRecipesForWeek = (mealPlan, plannerDays, plannerMeals, activeCell) => {
  const usedRecipes = new Set();

  plannerDays.forEach((day) => {
    plannerMeals.forEach((meal) => {
      if (activeCell?.day === day && activeCell?.meal === meal) {
        return;
      }

      const normalizedTitle = normalizeRecipeTitle(mealPlan?.[day]?.[meal]);
      if (normalizedTitle) {
        usedRecipes.add(normalizedTitle);
      }
    });
  });

  return usedRecipes;
};
