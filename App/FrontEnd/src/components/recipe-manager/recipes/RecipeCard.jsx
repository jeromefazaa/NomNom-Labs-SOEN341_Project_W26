import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import './RecipeCard.css';
import RecipeDetail from './RecipeDetails';

function RecipeCard({ recipe, onEdit, onDelete }) {

  const [open, setOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const handleCardClick = () => {

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);

  };

  const handleDeleteClick = () => {
    setConfirmDeleteOpen(true);
  };

  const handleDeleteCancel = () => {
    setConfirmDeleteOpen(false);
  };

  const handleDeleteConfirm = () => {
    // backend deletion logic here
    
    onDelete();
    setConfirmDeleteOpen(false);
  };

  return (
    <>
    <div className="recipe-card">
      {/* displays basic recipe attributes */}

      <h3 className="recipeTitle">{recipe.title}</h3>
      <p><strong>Preparation Time:</strong> {recipe.prepTime}m</p>
      <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
      <p><strong>Diet:</strong> {recipe.diet}  </p> 
      <p><strong>Cost:</strong> {recipe.cost}$</p>
      
      <div className="recipeInteractions">
          <button className="btnView" onClick={handleCardClick}>Details</button>
          <button className="btnEdit" onClick={onEdit}>Edit</button>
          <button className="btnDelete" onClick={handleDeleteClick}>Delete</button>
      </div>
    </div>

     {/* displays recipe instructions and ingredients in a modal */}
     <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{recipe.title} ({recipe.prepTime} minutes)</DialogTitle>
        <DialogContent>
          <RecipeDetail recipe={recipe} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={confirmDeleteOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Delete Recipe</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this recipe?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>No</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">Yes</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default RecipeCard;
