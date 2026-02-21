import React from 'react';

function RecipeDetails({ recipe }) {
  return (
    <div className="recipe-detail">

      <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
      <p><strong>Preparation Steps:</strong> {recipe.steps}</p>
      
    </div>
  );
}

export default RecipeDetails;