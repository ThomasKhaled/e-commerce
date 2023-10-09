import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  favoriteProducts: [],
};

export const authenticationSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    signUp: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    addToFavorite: (state, action) => {
      const itemIDToBeAdded = action.payload.id;
      const existingItem = state.favoriteProducts.find(
        (item) => item.id === itemIDToBeAdded
      );
      if (!existingItem) state.favoriteProducts.push({ ...action.payload });
    },
    removeFromFavorite: (state, action) => {
      const itemIDToBeRemoved = action.payload;
      const existingItem = state.favoriteProducts.find(
        (item) => item.id === itemIDToBeRemoved
      );
      if (existingItem)
        state.favoriteProducts = state.favoriteProducts.filter(
          (item) => item.id !== itemIDToBeRemoved
        );
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { signUp, logout, addToFavorite, removeFromFavorite } =
  authenticationSlice.actions;

export default authenticationSlice.reducer;
