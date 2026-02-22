import { createSlice } from "@reduxjs/toolkit";

const singleRecipe = {
    title: "",
    difficulty: "Beginner",
    prepTime: 0,
    diet: "",
    cost: 0,
    ingredients: [],
    steps: [],

}
const initialState = []

const recipesSlice = createSlice({
    name: "recipes",
    initialState,
    reducers: {
        addRecipe: (state, action) => {
            const newRecipe = {
                title: action.payload.title,
                difficulty: action.payload.difficulty,
                prepTime: action.payload.prepTime,
                diet: action.payload.diet,
                cost: action.payload.cost,
                ingredients: action.payload.ingredients,
                steps: action.payload.steps,

            }
           return [...state, newRecipe]
        },
        editRecipes: (state, action) => {
            const editedRecipe = {
                difficulty: action.payload.difficulty,
                prepTime: action.payload.prepTime,
                diet: action.payload.diet,
                cost: action.payload.cost,
                ingredients: action.payload.ingredients,
                steps: action.payload.steps,

            }
           return [...state.map(recipe => {
                if (recipe.title === action.payload.title) {
                    return {
                        title: recipe.title,
                        ...editedRecipe
                    }
                }
                else return recipe
            })]
        },
        deleteRecipe: (state, action) => {
           return [...state.filter(recipe => recipe.title !== action.payload)]
        }
    },
});
export const { addRecipe, editRecipes, deleteRecipe } = recipesSlice.actions;
export default recipesSlice.reducer;
