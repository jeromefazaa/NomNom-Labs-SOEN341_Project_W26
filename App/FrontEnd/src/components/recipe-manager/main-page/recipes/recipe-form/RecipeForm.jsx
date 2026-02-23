import { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from '@mui/material';

const getDefaultFormData = () => ({
  title: '',
  difficulty: 'Beginner',
  prepTime: '',
  diet: 'None',
  cost: '',
  ingredients: [''],
  steps: ['']
});

const createFormData = (recipe) => ({
  title: recipe?.title ?? '',
  difficulty: recipe?.difficulty ?? 'Beginner',
  prepTime: recipe?.prepTime?.toString() ?? '',
  diet: recipe?.diet ?? 'None',
  cost: recipe?.cost?.toString() ?? '',
  ingredients: Array.isArray(recipe?.ingredients) && recipe.ingredients.length > 0 ? recipe.ingredients : [''],
  steps: Array.isArray(recipe?.steps) && recipe.steps.length > 0 ? recipe.steps : ['']
});

function RecipeForm({ open, onClose, onSave, initialData, isEditMode }) {
  const [formData, setFormData] = useState(getDefaultFormData());

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
  };

  const handleListChange = (fieldName, index, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: prevFormData[fieldName].map((item, itemIndex) =>
        itemIndex === index ? value : item
      )
    }));
  };

  const handleAddListItem = (fieldName) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: [...prevFormData[fieldName], '']
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

    const newRecipe = {
      ...formData,
      title: resolvedTitle,
      prepTime: Number(formData.prepTime) || 0,
      cost: Number(formData.cost) || 0,
      ingredients: formData.ingredients.map((ingredient) => ingredient.trim()).filter(Boolean),
      steps: formData.steps.map((step) => step.trim()).filter(Boolean)
    };

    onSave(newRecipe);
    setFormData(getDefaultFormData());
    onClose();
  };

  const handleClose = () => {
    setFormData(getDefaultFormData());
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
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
            helperText={isEditMode ? 'Title cannot be modified.' : ''}
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
                  value={ingredient}
                  onChange={(event) => handleListChange('ingredients', index, event.target.value)}
                  fullWidth
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
            <Button type="button" variant="text" onClick={() => handleAddListItem('ingredients')}>
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
            <Button type="button" variant="text" onClick={() => handleAddListItem('steps')}>
              Add Step
            </Button>
          </div>

        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            {isEditMode ? 'Save Changes' : 'Save Recipe'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default RecipeForm;
