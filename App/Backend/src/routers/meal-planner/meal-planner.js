const express = require('express');
const db = require('../../database');

const router = express.Router();

// create new recipe
router.get("/:userId", (req, res) => {
    let mealPlans = db.read('meal-plans');
    const userId = req.params.userId;
    const userMealPlans = mealPlans[userId];
    if (userMealPlans) {
        return res.status(200).json({ userMealPlans: userMealPlans })
    }
    return res.status(200).json({ userMealPlans: {} });

})

const plannerDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const plannerMeals = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
router.post('/:userId', (req, res) => {
    let mealPlans = db.read('meal-plans');
    const userId = req.params.userId;
    const newMealPlans = req.body.mealPlans
    mealPlans[userId] = newMealPlans;
    if (db.write('meal-plans', mealPlans)) {
        return res.status(200).json({ message: 'Meal plans saved successfully' });
    }

    return res.status(500).json({ error: 'Failed to save meal plans' })

});

module.exports = router;
