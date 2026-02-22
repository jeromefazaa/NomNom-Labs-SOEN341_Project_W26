import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    allergies: [],
    dietaryPreferences: [],
    isLoading: false,
    hasErrors: false,
};

// Async thunk for saving current user
export const saveCurrentUser = createAsyncThunk(
    'currentUser/saveCurrentUser',
    async (userData, thunkAPI) => {
        try {
            const response = await fetch(`http://localhost:3000/profile/${userData.email}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                throw new Error('Failed to save user');
            }
            thunkAPI.dispatch(setCurrentUser(userData))
            return await response.json();
        } catch (error) {
        }
    }
);

const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {
        setCurrentUser: (state, action) => {
            return { ...action.payload, isLoading: false, hasErrors: false };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(saveCurrentUser.pending, (state) => {
                state.isLoading = true;
                state.hasErrors = false;
            })
            .addCase(saveCurrentUser.fulfilled, (state) => {
                state.isLoading = false;
                state.hasErrors = false;
            })
            .addCase(saveCurrentUser.rejected, (state) => {
                state.isLoading = false;
                state.hasErrors = true;
            });
    },
});

export const { setCurrentUser } = currentUserSlice.actions;

export default currentUserSlice.reducer;