const express = require('express');
const db = require('../../database');

const router = express.Router();


// create new recipe
router.post("/", (req, res) => {
    const { title, ingredients, steps, cost, userId } = req.body;
    const id = `${userId.toLowerCase()}_${title.toLowerCase()}`;
    const recipes = db.read('recipes')
    if (recipes[id]) {
        res.status(400).json({ msg: "Recipe already exists" });
        return;
    }

    recipeData = {
        title,
        ingredients,
        steps,
        cost,
        userId
    };
    recipes[id] = recipeData;
    if (db.write('recipes', recipeData)) {
        res.status(200).json({ message: 'Recipes created successfully' });
    } else {
        res.status(500).json({ error: 'Failed to create recipe' });
    }
});

//update specific recipe
router.post("/update/:title/:userId", (req, res) => {
    const title = req.params.title.toLowerCase();
    const userId = req.params.userId.toLowerCase();
    const { ingredients, steps, cost } = req.body;
    const id = `${userId.toLowerCase()}_${title.toLowerCase()}`;
    const recipes = db.read('recipes')
    if (!recipes[id]) {
        res.status(400).json({ msg: "Recipe does not exists" });
        return;
    }
    if (recipes[id].ingredients !== ingredients) {
        recipes[id].ingredients = ingredients
    }

    if (recipes[id].steps !== steps) {
        recipes[id].steps = steps
    }
    if (recipes[id].cost !== cost) {
        recipes[id].cost = cost
    }
    if (db.write('recipes', recipeData)) {
        res.status(200).json({ message: 'Recipe updated successfully' });
    } else {
        res.status(500).json({ error: 'Failed to update recipe' });
    }
});


//delete speicifc recipe 

router.post("/delete/:title/:userId", (req, res) => {
    const title = req.params.title.toLowerCase();
    const userId = req.params.userId.toLowerCase();
    const id = `${userId.toLowerCase()}_${title.toLowerCase()}`;
    const recipes = db.read('recipes')
    if (!recipes[id]) {
        res.status(400).json({ msg: "Recipe does not exists" });
        return;
    }
    delete recipes[id];
    if (db.write('recipes', recipeData)) {
        res.status(200).json({ message: 'Recipe deleted successfully' });
    } else {
        res.status(500).json({ error: 'Failed to delete recipe' });
    }
});



module.exports = router;
