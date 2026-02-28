const express = require('express');
const db = require('../../database');

const router = express.Router();

// create new recipe
router.post('/:userId', (req, res) => {
    console.log('receied request');
    let recipes = db.read('recipes');
    console.log(`recipes in db:${JSON.stringify(recipes)}`);

    const userId = req.params.userId;
    const newUserRecipes = req.body.recipeData;

    const userRecipes = Object.keys(recipes).filter((id) => {
        const email = id.split('_')[0];
        return email === userId;
    });

    const incomingUserRecipes = Object.values(newUserRecipes || {}).filter(
        (recipe) => recipe && recipe.userId === userId
    );

    const normalizedTitles = incomingUserRecipes
        .map((recipe) => recipe.title)
        .filter((title) => typeof title === 'string')
        .map((title) => title.trim().toLowerCase());

    const hasDuplicateTitle = new Set(normalizedTitles).size !== normalizedTitles.length;

    if (hasDuplicateTitle) {
        return res.status(400).json({ error: 'Recipe name already in use. This recipe already exists.' });
    }

    userRecipes.forEach((recipe) => delete recipes[recipe]);
    recipes = {
        ...recipes,
        ...newUserRecipes
    };

    if (db.write('recipes', recipes)) {
        return res.status(200).json({ message: 'Recipes saved successfully' });
    }

    return res.status(500).json({ error: 'Failed to save recipe' });
});

module.exports = router;
