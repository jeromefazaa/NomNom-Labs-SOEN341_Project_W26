import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    recipes: [],
    allergies: [],
    dietaryPreferences: [],
    isAuthenticated: false,
};

const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {
        setUser: (state, action) => {
            return { ...state, ...action.payload, isAuthenticated: true };
        },
        updateUserField: (state, action) => {
            const { field, value } = action.payload;
            state[field] = value;
        },
        addRecipe: (state, action) => {
            state.recipes.push(action.payload);
        },
        removeRecipe: (state, action) => {
            state.recipes = state.recipes.filter(recipe => recipe.id !== action.payload);
        },
        addAllergy: (state, action) => {
            if (!state.allergies.includes(action.payload)) {
                state.allergies.push(action.payload);
            }
        },
        removeAllergy: (state, action) => {
            state.allergies = state.allergies.filter(allergy => allergy !== action.payload);
        },
        addDietaryPreference: (state, action) => {
            if (!state.dietaryPreferences.includes(action.payload)) {
                state.dietaryPreferences.push(action.payload);
            }
        },
        removeDietaryPreference: (state, action) => {
            state.dietaryPreferences = state.dietaryPreferences.filter(pref => pref !== action.payload);
        },
        logout: (state) => {
            return initialState;
        },
    },
});

export const {
    setUser,
    updateUserField,
    addRecipe,
    removeRecipe,
    addAllergy,
    removeAllergy,
    addDietaryPreference,
    removeDietaryPreference,
    logout,
} = currentUserSlice.actions;

export default currentUserSlice.reducer;
