import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    error: null,
    isLoggedIn: false,
};

const appStateSlice = createSlice({
    name: 'appState',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
        setLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        },
        login: (state) => {
            state.isLoggedIn = true;
        },
        logout: (state) => {
            state.isLoggedIn = false;
        },
    },
});

export const { setLoading, setError, clearError, setLoggedIn, login, logout } = appStateSlice.actions;
export default appStateSlice.reducer;
