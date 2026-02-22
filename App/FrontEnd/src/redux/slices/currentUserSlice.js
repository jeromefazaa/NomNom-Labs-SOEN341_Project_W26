import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    allergies: [],
    dietaryPreferences: [],
};

const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload
        },
        setPassword: (state, action) => {
            state.password = action.payload
        },
        setFirstName: (state, action) => {
            state.firstName = action.payload
        },
        setLastName: (state, action) => {
            state.lastName = action.payload
        },
        setAllergies: (state, action) => {
            state.allergies = action.payload
        },
        addAllergy: (state, action) => {
            state.allergies = [...state.allergies, ...action.payload]
        },
        removeAllergy: (state, action) => {
            state.allergies = [...state.allergies.filter(allergy => !(allergy in action.payload))]
        },
        setDietaryPref: (state, action) => {
            state.dietaryPreferences = action.payload
        },
        addDietaryPref: (state, action) => {
            state.dietaryPreferences = [...state.dietaryPreferences, ...action.payload]
        },
        removeDietaryPref: (state, action) => {
            state.dietaryPreferences = [...state.dietaryPreferences.filter(dietPref => !(dietPref in action.payload))]
        }
    },
});

export const {
   setEmail,
   setPassword,
   setLastName,
   setFirstName,
   setAllergies,
   addAllergy,
   removeAllergy,
   setDietaryPref,
   addDietaryPref,
   removeDietaryPref
} = currentUserSlice.actions;

export default currentUserSlice.reducer;
