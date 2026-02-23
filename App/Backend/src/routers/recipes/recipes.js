const express = require('express');
const db = require('../../database');

const router = express.Router();


// create new recipe
router.post("/:userId", (req, res) => {
    console.log(`receied request`)
    let recipes = db.read('recipes');
    const userId = req.params.userId; 
    const recipeData = req.body.recipeData
    const newUserRecipes = req.body.recipes;
    const userRecipes = Object.keys(recipes).filter(id => id.startsWith(userId));
    userRecipes.forEach(recipe => delete recipes[recipe])
    recipes = {
        ...recipes,
        ...newUserRecipes
    }
    if (db.write('recipes', recipeData)) {
        res.status(200).json({ message: 'Recipes saved successfully' });
    } else {
        res.status(500).json({ error: 'Failed to save recipe' });
    }
});





module.exports = router;
