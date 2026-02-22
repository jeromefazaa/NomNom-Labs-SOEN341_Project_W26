import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { use } from "react";

const singleRecipe = {
    title: "",
    difficulty: "Beginner",
    prepTime: 0,
    diet: "",
    cost: 0,
    ingredients: [],
    steps: [],
}

const initialState = {
    recipesArray: [],
    hasErrors: false,
    isLoading: false,
    unsaved: 0
}

// Async thunk - add your logic here
export const saveRecipes = createAsyncThunk(
    'recipes/saveRecipes',
    async (userId, thunkAPI) => {
        try {
            data = {};
            state = thunkAPI.getState();
            state.recipes.recipesArray.array.forEach(element => {
                element.userId = userId;
                data[`${userId}_${element.title}`] = element;
            });
            const response = await fetch(`http://localhost:3000/recipes/${userId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (response.status === 200) {
                return
            }
            else {
                return thunkAPI.rejectWithValue(error.message);
            }

        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const recipesSlice = createSlice({
    name: "recipes",
    initialState,
    reducers: {
        addRecipe: (state, action) => {
            state.recipesArray.push(action.payload);
            state.unsaved = state.unsaved + 1
        },
        editRecipe: (state, action) => {
            const index = state.recipesArray.findIndex(recipe => recipe.title === action.payload.title);
            if (index !== -1) {
                if (!state.recipesArray[index].isEdited) {
                    state.unsaved = state.unsaved + 1
                }
                state.recipesArray[index] = {
                    ...state.recipesArray[index],
                    ...action.payload,
                    isEdited: true
                };
            }
        },
        deleteRecipe: (state, action) => {
            state.unsaved = state.unsaved + 1;
            state.recipesArray = state.recipesArray.filter(recipe => recipe.title !== action.payload);
        },
        setRecipes: (state, action) => {
            state.recipesArray = action.payload;
        }
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
    }
});

export const { addRecipe, editRecipe, deleteRecipe, setRecipes } = recipesSlice.actions;
export default recipesSlice.reducer;