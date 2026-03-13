import { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from '@mui/material';

const getDefaultIngredient = () => ({
  name: '',
  grams: ''
});

const getDefaultFormData = () => ({
  title: '',
  difficulty: 'Beginner',
  prepTime: '',
  diet: 'None',
  cost: '',
  ingredients: [getDefaultIngredient()],
  steps: ['']
});

const normalizeIngredient = (ingredient) => {
  if (typeof ingredient === 'string') {
    return {
      name: ingredient,
      grams: ''
    };
  }

  if (ingredient && typeof ingredient === 'object') {
    return {
      name: ingredient.name ?? '',
      grams: ingredient.grams?.toString() ?? ''
    };
  }

  return getDefaultIngredient();
};

const createFormData = (recipe) => ({
  title: recipe?.title ?? '',
  difficulty: recipe?.difficulty ?? 'Beginner',
  prepTime: recipe?.prepTime?.toString() ?? '',
  diet: recipe?.diet ?? 'None',
  cost: recipe?.cost?.toString() ?? '',
  ingredients: Array.isArray(recipe?.ingredients) && recipe.ingredients.length > 0
    ? recipe.ingredients.map(normalizeIngredient)
    : [getDefaultIngredient()],
  steps: Array.isArray(recipe?.steps) && recipe.steps.length > 0 ? recipe.steps : ['']
});

function RecipeForm({ open, onClose, onSave, initialData, isEditMode, existingRecipeTitles = [] }) {
  const [formData, setFormData] = useState(getDefaultFormData());
  const [titleError, setTitleError] = useState('');

  useEffect(() => {
    if (!open) {
      return;
    }

    if (isEditMode && initialData) {
      setFormData(createFormData(initialData));
      return;
    }

    setFormData(getDefaultFormData());
  }, [open, initialData, isEditMode]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));

    if (name === 'title' && titleError) {
      setTitleError('');
    }
  };

  const handleListChange = (fieldName, index, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: prevFormData[fieldName].map((item, itemIndex) =>
        itemIndex === index ? value : item
      )
    }));
  };

  const handleIngredientChange = (index, field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      ingredients: prevFormData.ingredients.map((ingredient, ingredientIndex) =>
        ingredientIndex === index
          ? {
              ...ingredient,
              [field]: value
            }
          : ingredient
      )
    }));
  };

  const handleAddListItem = (fieldName) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: [...prevFormData[fieldName], fieldName === 'ingredients' ? getDefaultIngredient() : '']
    }));
  };

  const handleRemoveListItem = (fieldName, index) => {
    setFormData((prevFormData) => {
      if (prevFormData[fieldName].length === 1) {
        return prevFormData;
      }

      return {
        ...prevFormData,
        [fieldName]: prevFormData[fieldName].filter((_, itemIndex) => itemIndex !== index)
      };
    });
  };

  const handleSubmitRecipe = (event) => {
    event.preventDefault();

    // keep the original title
    const resolvedTitle = isEditMode ? (initialData.title).trim() : formData.title.trim();

    if (!resolvedTitle) {
      return;
    }

    if (!isEditMode) {
      const normalizedTitle = resolvedTitle.toLowerCase();
      const recipeNameInUse = existingRecipeTitles.some(
        (title) => typeof title === 'string' && title.trim().toLowerCase() === normalizedTitle
      );

      if (recipeNameInUse) {
        setTitleError('Recipe name already in use. Please choose another one.');
        return;
      }
    }

    const newRecipe = {
      ...formData,
      title: resolvedTitle,
      prepTime: Number(formData.prepTime) || 0,
      cost: Number(formData.cost) || 0,
      ingredients: formData.ingredients
        .map((ingredient) => ({
          name: ingredient.name.trim(),
          grams: Number(ingredient.grams) || 0
        }))
        .filter((ingredient) => ingredient.name),
      steps: formData.steps.map((step) => step.trim()).filter(Boolean)
    };

    onSave(newRecipe);
    setFormData(getDefaultFormData());
    onClose();
  };

  const handleClose = () => {
    setFormData(getDefaultFormData());
    setTitleError('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" className="recipe-dialog">
      <DialogTitle>{isEditMode ? 'Edit Recipe' : 'Add Recipe'}</DialogTitle>
      <form onSubmit={handleSubmitRecipe}>
        <DialogContent className="recipe-form">
          <TextField
            label="Recipe Title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            disabled={isEditMode}
            error={Boolean(titleError)}
            helperText={titleError || (isEditMode ? 'Title cannot be modified.' : '')}
            fullWidth
          />

          <TextField
            select
            label="Difficulty"
            name="difficulty"
            value={formData.difficulty}
            onChange={handleInputChange}
            fullWidth
          >
            <MenuItem value="Beginner">Beginner</MenuItem>
            <MenuItem value="Intermediate">Intermediate</MenuItem>
            <MenuItem value="Advanced">Advanced</MenuItem>
          </TextField>

          <TextField
            label="Preparation Time (minutes)"
            name="prepTime"
            type="number"
            value={formData.prepTime}
            onChange={handleInputChange}
            onWheel={(e) => e.target.blur()}
            inputProps={{ min: 0, step: 1 }}
          />

          <TextField
            select
            label="Diet"
            name="diet"
            value={formData.diet}
            onChange={handleInputChange}
            fullWidth
          >
            <MenuItem value="None">None</MenuItem>
            <MenuItem value="Vegan">Vegan</MenuItem>
            <MenuItem value="Vegetarian">Vegetarian</MenuItem>
            <MenuItem value="Gluten-Free">Gluten-Free</MenuItem>
            <MenuItem value="Dairy-Free">Dairy-Free</MenuItem>
          </TextField>

          <TextField
            label="Cost ($)"
            name="cost"
            type="number"
            value={formData.cost}
            onChange={handleInputChange}
            onWheel={(e) => e.target.blur()}
            inputProps={{ min: 0, step: 1 }}
          />

          <div className="recipe-list-section">
            <strong>Ingredients</strong>
            {/* supports adding and removing ingredient rows */}

            {formData.ingredients.map((ingredient, index) => (
              <div className="recipe-list-row" key={`ingredient-${index}`}>
                <TextField
                  label={`Ingredient ${index + 1}`}
                  value={ingredient.name}
                  onChange={(event) => handleIngredientChange(index, 'name', event.target.value)}
                  fullWidth
                />
                <TextField
                  label="Quantity (g)"
                  type="number"
                  value={ingredient.grams}
                  onChange={(event) => handleIngredientChange(index, 'grams', event.target.value)}
                  onWheel={(e) => e.target.blur()}
                  inputProps={{ min: 0, step: 1 }}
                  sx={{ width: 120 }}
                />
                <Button
                  type="button"
                  variant="outlined"
                  color="error"
                  onClick={() => handleRemoveListItem('ingredients', index)}
                  disabled={formData.ingredients.length === 1}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button type="button" variant="text" onClick={() => handleAddListItem('ingredients')} className="mui-add">
              Add Ingredient
            </Button>
          </div>

          <div className="recipe-list-section">
            <strong>Preparation Steps</strong>
            {/* supports adding and removing ordered step rows */}

            {formData.steps.map((step, index) => (
              <div className="recipe-list-row" key={`step-${index}`}>
                <TextField
                  label={`Step ${index + 1}`}
                  value={step}
                  onChange={(event) => handleListChange('steps', index, event.target.value)}
                  fullWidth
                />
                <Button
                  type="button"
                  variant="outlined"
                  color="error"
                  onClick={() => handleRemoveListItem('steps', index)}
                  disabled={formData.steps.length === 1}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button type="button" variant="text" onClick={() => handleAddListItem('steps')} className="mui-add">
              Add Step
            </Button>
          </div>

        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} className="mui-cancel">Cancel</Button>
          <Button type="submit" variant="contained" className="mui-primary">
            {isEditMode ? 'Save Changes' : 'Save Recipe'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default RecipeForm;
