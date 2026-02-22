const express = require('express');
const db = require('../../database');

const router = express.Router();


// create new recipe
router.post("/:userId", (req, res) => {
    const id = `${userId.toLowerCase()}_${title.toLowerCase()}`;
    const recipes = db.read('recipes');
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
