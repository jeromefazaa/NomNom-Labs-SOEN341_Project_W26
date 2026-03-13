import { configureStore } from '@reduxjs/toolkit';
import appStateReducer from './slices/appStateSlice';
import currentUserReducer from './slices/currentUserSlice';
import recipesReducer from './slices/recipesSlice';
import mealPlannerReducer from './slices/mealPlannerSlice';

export const store = configureStore({
    reducer: {
        appState: appStateReducer,
        currentUser: currentUserReducer,
        recipes: recipesReducer,
        mealPlanner: mealPlannerReducer

    },
});

export default store;
