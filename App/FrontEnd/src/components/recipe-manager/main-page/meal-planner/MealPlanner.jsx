import { useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import "./MealPlanner.css";
import { getUsedRecipesForWeek, normalizeRecipeTitle } from "./mealPlannerUtils.js";
import { useDispatch, useSelector } from 'react-redux';
import { fetchMealPlanMacros } from "../../../../redux/slices/mealPlannerSlice.js";
import WeeklyCaloriesChart from "./WeeklyCaloriesChart.jsx";

function MealPlanner({
  plannerDays,
  plannerMeals,
  recipes,
  mealPlan,
  onMealSelection,
  onReset,
  onSave,
}) {
  const dispatch = useDispatch();
  const [savedToast, setSavedToast] = useState(false);
  const macrosByDay = useSelector((state) => state.mealPlanner.macrosByDay);

  const handleSave = () => {
    onSave();
    setSavedToast(true);
  };

  const isRecipeUsedElsewhere = (day, meal, recipeTitle) => {
    const usedRecipes = getUsedRecipesForWeek(
      mealPlan,
      plannerDays,
      plannerMeals,
      { day, meal },
    );

    return usedRecipes.has(normalizeRecipeTitle(recipeTitle));
  };

  const calculateMacros = async () => {
    await dispatch(fetchMealPlanMacros());
  };

  return (
    <>
    <section className="meal-planner-panel" aria-label="Weekly meal planner">
      <div className="meal-planner-header">
        <div>
          <h3 className="meal-planner-title">Weekly Meal Planner</h3>
          <p className="meal-planner-subtitle">
            Map your recipes across the week and keep each day organized by
            meal.
          </p>
          <p className="meal-planner-hint">
            A recipe can only be used once per week. Already-used recipes are
            disabled.
          </p>
        </div>
        <button
          type="button"
          onClick={calculateMacros}
          className="action-btn meal-plan-calculate"
        >
          Calculate Calories
        </button>
        <button
          type="button"
          className="action-btn meal-plan-reset"
          onClick={onReset}
        >
          Reset Week
        </button>
        <button type="button" className="action-btn meal-plan-save" onClick={handleSave}>
          Save Meal Plan
        </button>
      </div>

      <div
        className="meal-planner-grid"
        role="table"
        aria-label="Weekly meal planner grid"
      >
        <div className="meal-grid-corner" aria-hidden="true">
          Meal
        </div>
        {plannerDays.map((day) => (
          <div key={day} className="meal-grid-day" role="columnheader">
            {day}
          </div>
        ))}

        {plannerMeals.map((meal) => (
          <div className="meal-grid-row" key={meal}>
            <div className="meal-grid-label" role="rowheader">
              {meal}
            </div>

            {plannerDays.map((day) => (
              <label className="meal-grid-cell" key={`${day}-${meal}`}>
                <span className="meal-grid-cell-day">{day}</span>
                <span className="meal-grid-cell-meal">{meal}</span>
                <select
                  className="meal-grid-select"
                  value={mealPlan[day][meal]}
                  onChange={(event) =>
                    onMealSelection(day, meal, event.target.value)
                  }
                >
                  <option value="">N/A</option>
                  {recipes.map((recipe, index) => (
                    <option
                      key={`${recipe.title}-${index}`}
                      value={recipe.title}
                      disabled={isRecipeUsedElsewhere(day, meal, recipe.title)}
                      className={
                        isRecipeUsedElsewhere(day, meal, recipe.title)
                          ? "option-disabled"
                          : "option-available"
                      }
                    >
                      {recipe.title}
                    </option>
                  ))}
                </select>
              </label>
            ))}
          </div>
        ))}

        <div className="meal-grid-row">
          <div className="meal-grid-label meal-grid-macros-label" role="rowheader">
            Macros
          </div>
          {plannerDays.map((day) => (
            <div key={day} className="meal-grid-cell meal-grid-macros-cell">
              <span className="meal-grid-cell-day">{day}</span>
              <span className="macro-line">Protein: {macrosByDay?.[day]?.Protein ?? 0}g</span>
              <span className="macro-line">Carbs: {macrosByDay?.[day]?.Carbs ?? 0}g</span>
              <span className="macro-line">Fat: {macrosByDay?.[day]?.Fats ?? 0}g</span>
              <span className="macro-line">{macrosByDay?.[day]?.Calories ?? 0} <b>calories</b></span>

            </div>
          ))}
        </div>
      </div>

      <WeeklyCaloriesChart
        plannerDays={plannerDays}
        macrosByDay={macrosByDay}
      />
    </section>

    <Snackbar
      open={savedToast}
      autoHideDuration={3000}
      onClose={() => setSavedToast(false)}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert severity="success" onClose={() => setSavedToast(false)}>
        Meal plan saved successfully!
      </Alert>
    </Snackbar>
    </>
  );
}

export default MealPlanner;
