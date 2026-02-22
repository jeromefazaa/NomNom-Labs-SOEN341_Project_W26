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
        setCurrentUser: (state, action) => {
            return action.payload;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setPassword: (state, action) => {
            state.password = action.payload;
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
        addAllergy: (state, action) => {
            state.allergies.push(...action.payload); // Mutate directly
        },
        removeAllergy: (state, action) => {
            return {
                ...state,
                allergies: state.allergies.filter(allergy => !action.payload.includes(allergy))
            };
        },
        setDietaryPref: (state, action) => {
            state.dietaryPreferences = action.payload;
        },
        addDietaryPref: (state, action) => {
            state.dietaryPreferences.push(...action.payload); // Mutate directly
        },
        removeDietaryPref: (state, action) => {
            return {
                ...state,
                dietaryPreferences: state.dietaryPreferences.filter(dietPref => !action.payload.includes(dietPref))
            };
        }
    },
});

export const {
    setCurrentUser,
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