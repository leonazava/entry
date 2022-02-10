import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    value: {
      totalPrice: 0,
      contents: [],
    },
  },
  reducers: {
    addToCart: (state, action) => {
      //update the sum of all costs
      state.value.totalPrice += 1;

      // check if a product's already in the cart
      let i = state.value.contents.findIndex(
        (el) => el.name === action.payload.name
      );

      // if it is, update it
      if (i >= 0) {
        state.value.contents[i].quantity += 1;
        return;
      }

      // if not, add it
      state.value.contents.push({ ...action.payload, quantity: 1 });
    },

    removeFromCart: (state, action) => {
      state.value.totalPrice -= 1;

      let i = state.value.contents.findIndex(
        (el) => el.name === action.payload.name
      );

      if (state.value.contents[i].quantity > 1) {
        state.value.contents[i].quantity -= 1;
        return;
      }

      state.value.contents.splice(i, 1);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
