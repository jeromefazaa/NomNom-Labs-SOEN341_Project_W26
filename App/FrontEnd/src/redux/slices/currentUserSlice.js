import { createSlice } from '@reduxjs/toolkit';

const { read } = require('../../database');
const userData = read('users')

const userEmail = email.toLowerCase();

if (userData[userEmail]) {
    firstName = userData[userEmail].firstName;
    lastName = userData[userEmail].lastName;
}

const initialState = {
    email: '',
    // password: '',
    firstName: '',
    lastName: '',
    allergies: [],
    dietaryPreferences: [],
};

const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {
        setEmailInState: (state, action) => {
            state.email = action.payload;
        },
        setFirstName: (state, action) => {
            state.firstName = action.payload;
        },
        setLastName: (state, action) => {
            state.lastName = action.payload;
        },
        setAllergies: (state, action) => {
            state.allergies = action.payload;
        },
        setDietaryPreferences: (state, action) => {
            state.dietaryPreferences = action.payload;
        },



        updateUserField: (state, action) => {
            const { field, value } = action.payload;
            state[field] = value;
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
