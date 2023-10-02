import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
};

export const authenticationSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    signUp: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { signUp, logout } = authenticationSlice.actions;

export default authenticationSlice.reducer;
