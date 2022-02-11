import { createSlice } from "@reduxjs/toolkit";

function isEqual(obj1, obj2) {
  let keys = Object.keys(obj1);
  let isEqual = true;
  keys.forEach((el) => {
    if (obj1[el] !== obj2[el]) {
      return (isEqual = false);
    }
  });
  return isEqual;
}

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
      // check if a product's already in the cart
      let i = state.value.contents.findIndex(
        (el) => el.name === action.payload.name
      );
      // if it is, and the selected options are the same, update it
      if (
        i >= 0 &&
        isEqual(state.value.contents[i].options, action.payload.options)
      ) {
        state.value.contents[i].quantity += 1;
        return;
      }

      // if not, add it
      state.value.contents.push({ ...action.payload, quantity: 1 });
    },

    removeFromCart: (state, action) => {
      let i = state.value.contents.findIndex(
        (el) => el.name === action.payload.name
      );

      if (state.value.contents[i].quantity > 1) {
        state.value.contents[i].quantity -= 1;
        return;
      }

      state.value.contents.splice(i, 1);
    },

    calculateTotalPrice: (state, action) => {
      let total = 0;
      state.value.contents.forEach((el) => {
        el.prices.forEach((price) => {
          if (price.currency.label === action.payload.label) {
            return (total += price.amount * el.quantity);
          }
        });
      });
      state.value.totalPrice = total;
    },
  },
});

export const { addToCart, removeFromCart, calculateTotalPrice } =
  cartSlice.actions;

export default cartSlice.reducer;
