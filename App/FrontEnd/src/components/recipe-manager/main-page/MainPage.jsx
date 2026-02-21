import RecipeCard from '../recipes/RecipeCard.jsx';

function MainPage() {
  const testRecipe = {
    title: 'Test Recipe',
    difficulty: 'Beginner',
    prepTime: 15,
    diet: 'None',
    cost: 15
  };

  return (
    <div>
      <h2>My Recipes</h2>
      <RecipeCard recipe={testRecipe} />
    </div>
  );
}

export default MainPage;