import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import './RecipeCard.css';
import RecipeDetail from './RecipeDetails';

function RecipeCard({recipe}) {

  const [open, setOpen] = useState(false);

  const handleCardClick = () => {

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);

  };

  return (
    <>
    <div className="recipe-card">
      <h3>{recipe.title}</h3>
      <p><u>Preparation Time:</u> {recipe.prepTime} minutes</p>
      <p><u>Difficulty:</u> {recipe.difficulty}</p>
      <p><u>Diet:</u> {recipe.diet}  </p> {/* None/Vegan/Vegeterian/Gluten-Free/Dairy-Free */}
      <p><u>Cost:</u> {recipe.cost}$</p>
      
      <div className="recipeInteractions">
          <button className="btnView" onClick={handleCardClick}>Details</button>
          <button className="btnEdit" /*onClick={() => onEdit(recipe)}*/>Edit</button>
          <button className="btnDelete" /*onClick={() => onDelete(recipe)}*/>Delete</button>
      </div>
    </div>

     <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{recipe.title} ({recipe.prepTime} minutes)</DialogTitle>
        <DialogContent>
          <RecipeDetail recipe={recipe} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default RecipeCard;