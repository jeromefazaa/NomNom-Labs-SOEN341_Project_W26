import { configureStore } from '@reduxjs/toolkit';
import appStateReducer from './slices/appStateSlice';
import currentUserReducer from './slices/currentUserSlice';
import recipesReducer from './slices/recipesSlice';

export const store = configureStore({
    reducer: {
        appState: appStateReducer,
        currentUser: currentUserReducer,
        recipes: recipesReducer
    },
});

export default store;
