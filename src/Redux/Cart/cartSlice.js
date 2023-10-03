import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;

      const existingItem = state.cart.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
      state.totalPrice += newItem.price;
    },
    removeFromCart(state, action) {
      const itemIdToBeRemoved = action.payload;

      const itemToRemove = state.cart.find(
        (item) => item.id === itemIdToBeRemoved
      );

      if (itemToRemove) {
        if (itemToRemove.quantity > 1) {
          itemToRemove.quantity -= 1;
        } else {
          state.cart = state.cart.filter(
            (item) => item.id !== itemIdToBeRemoved
          );
        }
        state.totalPrice -= itemToRemove.price;
      }
    },
    editCartQuantity(state, action) {
      const { itemIdToBeEdited, newQuantity } = action.payload;
      console.log(newQuantity);
      const itemToEdit = state.cart.find(
        (item) => item.id === itemIdToBeEdited
      );

      if (itemToEdit) {
        state.totalPrice -= itemToEdit.price * itemToEdit.quantity;
        itemToEdit.quantity = newQuantity;
        state.totalPrice += itemToEdit.price * newQuantity;
      }
    },
    clearCart(state) {
      state.cart = [];
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, editCartQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
