import "./MealPlanner.css";

function MealPlanner({
  plannerDays,
  plannerMeals,
  recipes,
  mealPlan,
  onMealSelection,
  onReset,
  onSave,
}) {
  return (
    <section className="meal-planner-panel" aria-label="Weekly meal planner">
      <div className="meal-planner-header">
        <div>
          <h3 className="meal-planner-title">Weekly Meal Planner</h3>
          <p className="meal-planner-subtitle">
            Map your recipes across the week and keep each day organized by
            meal.
          </p>
        </div>
        <button
          type="button"
          className="clear-filters meal-plan-reset"
          onClick={onReset}
        >
          Reset Week
        </button>
        <button type="button" className="save-changes" onClick={onSave}>
          Save Changes
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
                    >
                      {recipe.title}
                    </option>
                  ))}
                </select>
              </label>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

export default MealPlanner;
