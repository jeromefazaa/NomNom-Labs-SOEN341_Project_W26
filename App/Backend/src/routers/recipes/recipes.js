const express = require('express');
const db = require('../../database');

const router = express.Router();


// create new recipe
router.post("/:userId", (req, res) => {
    console.log(`receied request`)
    let recipes = db.read('recipes');
    console.log(`recipes in db:${JSON.stringify(recipes)}`)
    const userId = req.params.userId; 
    const newUserRecipes = req.body.recipeData
    const userRecipes = Object.keys(recipes).filter(id => {
        const email = id.split("_")[0];
        return email === userId
    });
    userRecipes.forEach(recipe => delete recipes[recipe]);
    recipes = {
        ...recipes,
        ...newUserRecipes
    }
    if (db.write('recipes', recipes)) {
        res.status(200).json({ message: 'Recipes saved successfully' });
    } else {
        res.status(500).json({ error: 'Failed to save recipe' });
    }
});





module.exports = router;
