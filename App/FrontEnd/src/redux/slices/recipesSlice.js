import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const singleRecipe = {
  title: "",
  difficulty: "Beginner",
  prepTime: 0,
  diet: "",
  cost: 0,
  ingredients: [],
  steps: [],
};

const initialState = {
  recipesArray: [],
  hasErrors: false,
  isLoading: false,
  unsaved: 0,
};

// Async thunk 
export const saveRecipes = createAsyncThunk(
  "recipes/saveRecipes",
  async (_, thunkAPI) => {
    try {
      console.log(`received click`);
      const data = {};
      const state = thunkAPI.getState();
      const userId = state.currentUser.email;
      state.recipes.recipesArray.forEach((element) => {
        data[`${userId}_${element.title}`] = {
          ...element,
          userId: userId,
        };
      });
      console.log(`making request to save ${data} `);
      // Small save-flow fix: return the real request result so the button can show success only after a true save.
      const response = await fetch(
        `http://localhost:3000/recipes/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ recipeData: data }),
        },
      );
      console.log(`request succesfull`);
      if (response.status === 200) {
        return await response.json();
      } else {
        const errorData = await response.json().catch(() => null);
        return thunkAPI.rejectWithValue(
          errorData?.error || "Failed to save recipes",
        );
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    addRecipe: (state, action) => {
      state.recipesArray.push(action.payload);
      state.unsaved = state.unsaved + 1;
    },
    editRecipe: (state, action) => {
      const index = state.recipesArray.findIndex(
        (recipe) => recipe.title === action.payload.title,
      );
      if (index !== -1) {
        if (!state.recipesArray[index].isEdited) {
          state.unsaved = state.unsaved + 1;
        }
        state.recipesArray[index] = {
          ...state.recipesArray[index],
          ...action.payload,
          isEdited: true,
        };
      }
    },
    deleteRecipe: (state, action) => {
      state.unsaved = state.unsaved + 1;
      state.recipesArray = state.recipesArray.filter(
        (recipe) => recipe.title !== action.payload,
      );
    },
    setRecipes: (state, action) => {
      state.recipesArray = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveRecipes.pending, (state) => {
        state.isLoading = true;
        state.hasErrors = false;
      })
      .addCase(saveRecipes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasErrors = false;
        state.unsaved = 0;
      })
      .addCase(saveRecipes.rejected, (state, action) => {
        state.hasErrors = true;
        state.isLoading = false;
      });
  },
});

export const { addRecipe, editRecipe, deleteRecipe, setRecipes } =
  recipesSlice.actions;
export default recipesSlice.reducer;
