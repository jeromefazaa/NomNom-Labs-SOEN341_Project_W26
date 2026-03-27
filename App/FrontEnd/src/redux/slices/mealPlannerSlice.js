import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const plannerDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const plannerMeals = ["Breakfast", "Lunch", "Dinner", "Snack"];

const createEmptyMealPlan = () =>
  plannerDays.reduce((plan, day) => {
    plan[day] = plannerMeals.reduce((meals, meal) => {
      meals[meal] = "";
      return meals;
    }, {});
    return plan;
  }, {});

const createEmptyMacros = () =>
  plannerDays.reduce((totals, day) => {
    totals[day] = {
      Calories: 0,
      Protein: 0,
      Carbs: 0,
      Fats: 0,
    };
    return totals;
  }, {});

const initialState = {
  mealPlan: createEmptyMealPlan(),
  macrosByDay: createEmptyMacros(),
  isLoading: false,
  hasErrors: false,
};

export const fetchMealPlan = createAsyncThunk(
  "mealPlanner/fetchMealPlan",
  async (_, thunkAPI) => {
    const userId = thunkAPI.getState().currentUser.email;
    try {
      const response = await fetch(
        `http://localhost:3000/meal-planner/${userId}`,
      );
      if (!response.ok) throw new Error("Failed to fetch meal plan");
      const data = await response.json();
      return data.mealPlan;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const saveMealPlan = createAsyncThunk(
  "mealPlanner/saveMealPlan",
  async (_, thunkAPI) => {
    const userId = thunkAPI.getState().currentUser.email;
    const mealPlan = thunkAPI.getState().mealPlanner.mealPlan;
    console.log(`sending meal plan ${mealPlan}`)
    try {
      const response = await fetch(
        `http://localhost:3000/meal-planner/${userId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mealPlan }),
        },
      );
      if (!response.ok) throw new Error("Failed to save meal plan");
      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const fetchMealPlanMacros = createAsyncThunk(
  "mealPlanner/fetchMealPlanMacros",
  async (_, thunkAPI) => {
    const userId = thunkAPI.getState().currentUser.email;
    try {
      const response = await fetch(
        `http://localhost:3000/meal-planner/${userId}/macros`,
      );
      if (!response.ok) throw new Error("Failed to calculate macros");
      const data = await response.json();
      return data.macros;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const mealPlannerSlice = createSlice({
  name: "mealPlanner",
  initialState,
  reducers: {
    updateMeal: (state, action) => {
      const { day, meal, recipeTitle } = action.payload;
      state.mealPlan[day][meal] = recipeTitle;
    },
    resetMealPlan: (state) => {
      state.mealPlan = createEmptyMealPlan();
      state.macrosByDay = createEmptyMacros();
    },
    setMealPlan: (state, action) => {
      state.mealPlan = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMealPlan.pending, (state) => {
        state.isLoading = true;
        state.hasErrors = false;
      })
      .addCase(fetchMealPlan.fulfilled, (state, action) => {
        state.isLoading = false;
        state.mealPlan = action.payload;
        state.hasErrors = false;
      })
      .addCase(fetchMealPlan.rejected, (state) => {
        state.isLoading = false;
        state.hasErrors = true;
      })
      .addCase(saveMealPlan.pending, (state) => {
        state.isLoading = true;
        state.hasErrors = false;
      })
      .addCase(saveMealPlan.fulfilled, (state) => {
        state.isLoading = false;
        state.hasErrors = false;
      })
      .addCase(saveMealPlan.rejected, (state) => {
        state.isLoading = false;
        state.hasErrors = true;
      })
      .addCase(fetchMealPlanMacros.pending, (state) => {
        state.isLoading = true;
        state.hasErrors = false;
      })
      .addCase(fetchMealPlanMacros.fulfilled, (state, action) => {
        state.isLoading = false;
        state.macrosByDay = action.payload || createEmptyMacros();
        state.hasErrors = false;
      })
      .addCase(fetchMealPlanMacros.rejected, (state) => {
        state.isLoading = false;
        state.hasErrors = true;
      });
  },
});

export const { updateMeal, resetMealPlan, setMealPlan } =
  mealPlannerSlice.actions;
export default mealPlannerSlice.reducer;
