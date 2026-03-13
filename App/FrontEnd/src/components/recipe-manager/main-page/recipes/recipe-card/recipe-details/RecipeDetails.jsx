function RecipeDetails({ recipe }) {

  // ingredient array creation
  const ingredients = Array.isArray(recipe.ingredients) ? recipe.ingredients : (recipe.ingredients ? [recipe.ingredients] : []);
  const formatIngredient = (ingredient) => {
    if (typeof ingredient === 'string') {
      return ingredient;
    }

    if (!ingredient || typeof ingredient !== 'object') {
      return '';
    }

    const ingredientName = ingredient.name ?? '';
    const ingredientGrams = Number(ingredient.grams) || 0;

    if (!ingredientName) {
      return '';
    }

    return ingredientGrams > 0 ? `${ingredientName} (${ingredientGrams} g)` : ingredientName;
  };
  
  // steps array creation
  const steps = Array.isArray(recipe.steps) ? recipe.steps: (recipe.steps ? [recipe.steps] : []);

  return (
    <div className="recipe-detail">
      <h4 className="recipeSectionHeading">Ingredients</h4>
      {ingredients.length > 0 ? (
        <ul className="recipeSectionContent">
          {ingredients.map((ingredient, index) => (
            <li key={`ingredient-${index}`}>{formatIngredient(ingredient)}</li>
          ))}
        </ul>
      ) : (
        <p className="recipeSectionContent">No ingredients added.</p>
      )}

      <h4 className="recipeSectionHeading">Preparation Steps</h4>
      {steps.length > 0 ? (
        <ol className="recipeSectionContent">
          {steps.map((step, index) => (
            <li key={`step-${index}`}>{step}</li>
          ))}
        </ol>
      ) : (
        <p className="recipeSectionContent">No preparation steps added.</p>
      )}
      
    </div>
  );
}

export default RecipeDetails;
