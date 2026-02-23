import { useState } from 'react';
import RecipeCard from './recipes/recipe-card/RecipeCard.jsx';
import RecipeForm from './recipes/recipe-form/RecipeForm.jsx';
import { useSelector, useDispatch } from 'react-redux';
import './MainPage.css';
import { addRecipe, deleteRecipe, editRecipe } from '../../../redux/slices/recipesSlice.js';

function MainPage() {
  const recipes = useSelector(state => state.recipes.recipesArray) ?? [];
  const dispatch = useDispatch();
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
      dispatch(editRecipe(recipeData))
      return;
    }
    dispatch(addRecipe(recipeData))
  };

  // removes a recipe card from the local list
  const handleDeleteRecipe = (indexToDelete) => {
    dispatch(deleteRecipe(recipes[indexToDelete].title))
  };

  // supplies the selected recipe to prefill the form fields
  const recipeBeingEdited = formMode === 'edit' && editingRecipeIndex !== null ? recipes[editingRecipeIndex] : null;

  return (
    <div className="main-page">
      <div className="dashboard-panel">
        <div className="dashboard-header">
          <h2 className="dashboard-title">My Recipes</h2>

          <div className="dashboard-actions">
            <button className="btn btn-primary addRecipe" onClick={addRecipeClick}>
              Add Recipe
            </button>
          </div>
        </div>
        <div className="recipes-grid">
          {recipes && recipes.length > 0 && recipes.map((recipe, index) => (
            <RecipeCard
              key={`${recipe.title}-${index}`}
              recipe={recipe}
              onEdit={() => handleEditRecipe(index)}
              onDelete={() => handleDeleteRecipe(index)}
            />
          ))}
        </div>
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
