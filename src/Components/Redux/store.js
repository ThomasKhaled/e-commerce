import { configureStore } from "@reduxjs/toolkit";
import authenticationSlice from "./Authentication/authenticationSlice";
import cartSlice from "./Cart/cartSlice";

const store = configureStore({
  reducer: {
    auth: authenticationSlice,
    cart: cartSlice,
  },
});

export default store;
