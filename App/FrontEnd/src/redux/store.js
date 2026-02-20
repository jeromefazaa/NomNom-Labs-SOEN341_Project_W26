import { configureStore } from '@reduxjs/toolkit';
import appStateReducer from './slices/appStateSlice';
import currentUserReducer from './slices/currentUserSlice';

export const store = configureStore({
    reducer: {
        appState: appStateReducer,
        currentUser: currentUserReducer,
    },
});

export default store;
