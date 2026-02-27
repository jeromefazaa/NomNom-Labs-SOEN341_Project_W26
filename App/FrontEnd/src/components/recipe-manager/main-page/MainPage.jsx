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

  // search bar params
  const [searchTerm, setSearchTerm] = useState(''); // search bar
  const processedSearch = searchTerm.trim().toLowerCase();

  // defines  the initial filter states

  const [timeFilter, setTimeFilter] = useState('All');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [dietFilter, setDietFilter] = useState('All');
  const [costFilter, setCostFilter] = useState('All');

  // filtered recipe mapping
  const filteredRecipes = recipes
  .map((recipe, index) => ({ recipe, index }))
  .filter(({ recipe }) => {
    const searchMatch = recipe.title.toLowerCase().includes(processedSearch) || recipe.difficulty.toLowerCase().includes(processedSearch) || recipe.diet.toLowerCase().includes(processedSearch);

    const timeMatch = timeFilter === 'All' ? true : timeFilter === 'gt60' ? recipe.prepTime > 60 : recipe.prepTime <= Number(timeFilter);
    const difficultyMatch = difficultyFilter === 'All' || recipe.difficulty === difficultyFilter;
    const dietMatch = dietFilter === 'All' || recipe.diet === dietFilter;
    const costMatch = costFilter === 'All' ? true : costFilter === 'gt50' ? recipe.cost > 50 : recipe.cost <= Number(costFilter);

    return searchMatch && timeMatch && difficultyMatch && dietMatch && costMatch;
  });


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
        <div className="recipes-header">
          <h2 className="recipes-heading">My Recipes</h2>
          <button className="addRecipe" onClick={addRecipeClick}>
            Add Recipe
          </button>
        </div>
          <div className="search-row">
            <input
              type="text"
              className="search-input"
              placeholder="Search a recipe"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>

          <div className = "filters-row">
          <select className = "filter-control" value={timeFilter} onChange={(event) => setTimeFilter(event.target.value)}>
            <option value="All">All Prep Times</option>
            <option value="15"> 15 min or less </option>
            <option value="30">30 min or less</option>
            <option value="60">1 hour or less</option>
            <option value="gt60">More than 1 hour</option>

          </select>

          <select className = "filter-control" value={difficultyFilter} onChange={(event) => setDifficultyFilter(event.target.value)}>
            <option value="All">All Difficulties</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>

          <select className = "filter-control" value={dietFilter} onChange={(event) => setDietFilter(event.target.value)}>
            <option value="All">All Diets</option>
            <option value="None">None</option>
            <option value="Vegan">Vegan</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Gluten-Free">Gluten-Free</option>
            <option value="Dairy-Free">Dairy-Free</option>
          </select>

          <select className="filter-control" value={costFilter} onChange={(e) => setCostFilter(e.target.value)}>
            <option value="All">All Costs</option>
            <option value="10">10$ or less</option>
            <option value="25">25$ or less</option>
            <option value="50">50$ or less</option>
            <option value="gt50">More than 50$</option>

          </select>

          <button
            type="button"
            className="clear-filters"
            onClick={() => {
              setTimeFilter('All');
              setDifficultyFilter('All');
              setDietFilter('All');
              setCostFilter('All');

            }}> Clear Filters
        </button>

        </div>

        
        <div className="recipes-grid">
          {recipes && recipes.length > 0 && filteredRecipes.map(({recipe, index}) => (
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
        existingRecipeTitles={recipes && recipes?.length > 0? recipes.map((recipe) => recipe.title): []}
      />
    </div>
  );
}

export default MainPage;

