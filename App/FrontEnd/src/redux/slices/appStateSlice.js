import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setCurrentUser } from "./currentUserSlice";
import { setRecipes } from "./recipesSlice";

const initialState = {
  isLoggedIn: false,
  isLoading: false,
  hasErrors: false,
};
// This function will go fetch all the user data and set the current user and recipes in the state.
// It will assume perfect input, becasue before this function is called, a previous request was made to actually validate the user, so this function expects an email that exists
export const loginUser = createAsyncThunk(
  'appState/loginUser',
  async (userId, thunkAPI) => {
    try {
      const response = await fetch(`http://localhost:3000/profile/${userId}`);
      const data = await response.json();
      const user = data.user;
      const recipes = data.userRecipes
      thunkAPI.dispatch(setCurrentUser(user));
      console.log(`received recipes:${recipes}`)
      if (Array.isArray(recipes)) {
        thunkAPI.dispatch(setRecipes(recipes))
      }
      else {
        thunkAPI.dispatch(setRecipes([]))

      }
    } catch (error) {
      // Server error --> Global eror handler
    }

  }
);

const appStateSlice = createSlice({
  name: "appState",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.hasErrors = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.hasErrors = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.hasErrors = false;

      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.hasErrors = true;
      });
  },
});

export const { logout } = appStateSlice.actions;
export default appStateSlice.reducer;