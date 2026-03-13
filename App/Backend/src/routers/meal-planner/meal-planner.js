const express = require("express");
const db = require("../../database");

const router = express.Router();

// Get meal plan for a user
router.get("/:userId", (req, res) => {
  let mealPlans = db.read("meal-plans");
  const userId = req.params.userId;
  const userMealPlan = mealPlans[userId];
  if (userMealPlan) {
    return res.status(200).json({ mealPlan: userMealPlan });
  }
  return res.status(200).json({
    mealPlan: {
      Monday: {
        Breakfast: "",
        Lunch: "",
        Dinner: "",
        Snack: "",
      },
      Tuesday: {
        Breakfast: "",
        Lunch: "",
        Dinner: "",
        Snack: "",
      },
      Wednesday: {
        Breakfast: "",
        Lunch: "",
        Dinner: "",
        Snack: "",
      },
      Thursday: {
        Breakfast: "",
        Lunch: "",
        Dinner: "",
        Snack: "",
      },
      Friday: {
        Breakfast: "",
        Lunch: "",
        Dinner: "",
        Snack: "",
      },
      Saturday: {
        Breakfast: "",
        Lunch: "",
        Dinner: "",
        Snack: "",
      },
      Sunday: {
        Breakfast: "",
        Lunch: "",
        Dinner: "",
        Snack: "",
      },
    },
  });
});

// Save meal plan for a user
router.post("/:userId", (req, res) => {
  console.log(`request received`);
  let mealPlans = db.read("meal-plans");
  const userId = req.params.userId;
  const { mealPlan } = req.body;
  console.log(`userMealPlans: ${mealPlan}`);
  mealPlans[userId] = mealPlan;
  console.log(`mealPlans: ${mealPlans["Monday"]}`);
  if (db.write("meal-plans", mealPlans)) {
    return res.status(200).json({ message: "Meal plan saved successfully" });
  }
  return res.status(500).json({ error: "Failed to save meal plan" });
});

module.exports = router;
