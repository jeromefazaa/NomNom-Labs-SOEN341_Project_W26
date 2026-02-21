import { useState } from 'react';
import RecipeCard from '../recipes/RecipeCard.jsx';
import RecipeForm from './RecipeForm.jsx';
import './MainPage.css';

function MainPage() {
  const [recipes, setRecipes] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  // indicates whether the form is creating or updating a recipe
  const [formMode, setFormMode] = useState('add');
  const [editingRecipeIndex, setEditingRecipeIndex] = useState(null);

  // opens the form in add mode
  const addRecipeClick = () => {
    setFormMode('add');
    setEditingRecipeIndex(null);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingRecipeIndex(null);
  };


  // opens the form with an existing recipe for editing
  const handleEditRecipe = (index) => {
    setFormMode('edit');
    setEditingRecipeIndex(index);
    setIsFormOpen(true);
  };

  const handleSaveRecipe = (recipeData) => {
    // updates only the selected recipe in edit mode
    if (formMode === 'edit' && editingRecipeIndex !== null) {
      setRecipes((prevRecipes) =>
        prevRecipes.map((recipe, index) => (
          index === editingRecipeIndex ? recipeData : recipe
        ))
      );
      return;
    }

    setRecipes((prevRecipes) => [recipeData, ...prevRecipes]);
  };

  // removes a recipe card from the local list
  const handleDeleteRecipe = (indexToDelete) => {
    setRecipes((prevRecipes) => prevRecipes.filter((_, index) => index !== indexToDelete));
  };

  // supplies the selected recipe to prefill the form fields
  const recipeBeingEdited =
    formMode === 'edit' && editingRecipeIndex !== null ? recipes[editingRecipeIndex] : null;

  return (
    <div className="main-page">
      <div className="recipes-header">
        <h2 className="recipes-heading">My Recipes</h2>
        <button className="addRecipe" onClick={addRecipeClick}>Add Recipe</button>
      </div>

      <div className="recipes-grid">
        {recipes.map((recipe, index) => (
          <RecipeCard
            key={`${recipe.title}-${index}`}
            recipe={recipe}
            onEdit={() => handleEditRecipe(index)}
            onDelete={() => handleDeleteRecipe(index)}
          />
        ))}
      </div>

      <RecipeForm
        open={isFormOpen}
        onClose={handleFormClose}
        onSave={handleSaveRecipe}
        initialData={recipeBeingEdited}
        isEditMode={formMode === 'edit'}
      />
    </div>
  );
}

export default MainPage;
