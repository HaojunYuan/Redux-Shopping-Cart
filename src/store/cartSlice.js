import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./uiSlice";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    itemsList: [],
    totalQuantity: 0,
    showCart: false,
    changed: false,
  },
  reducers: {
    replaceData(state, action) {
      state.itemsList = action.payload.itemsList;
      state.totalQuantity = action.payload.totalQuantity;
    },
    addToCart(state, action) {
      state.changed = true;
      const newItem = action.payload;
      const existingItem = state.itemsList.find(
        (item) => item.id === newItem.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice += newItem.price;
      } else {
        state.itemsList.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.name,
        })
      }
      state.totalQuantity += 1;
    },
    removeFromCart(state, action) {
      state.changed = true;
      const id = action.payload;
      const existingItem = state.itemsList.find(
        (item) => item.id === id
      );
      if (existingItem.quantity === 1) {
        state.itemsList = state.itemsList.filter(
          (item) => item.id !== id
        );
        state.totalQuantity -= 1;
      } else {
        existingItem.quantity -= 1;
        existingItem.totalPrice -= existingItem.price;
      }
    },
    toggleCart(state) {
      state.showCart = !state.showCart;
    }
  }
});


export const cartActions = cartSlice.actions;
export default cartSlice;
