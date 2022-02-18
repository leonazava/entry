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
      totalItems: 0,
      totalPrice: 0,
      contents: [],
    },
  },
  reducers: {
    addToCart: (state, action) => {
      state.value.totalItems += 1;
      if (state.value.contents.length > 0) {
        let twins = [];
        let target;
        // search all of the cart for all emenets with the same name as the one we're trying to add
        // store them in the twins array
        state.value.contents.forEach((el, i) => {
          if (el.name === action.payload.name) {
            twins.push(el);
          }
        });
        // if there are duplicates, search if there's one with the same options as what we;re trying to add        /
        // if there is, update its quantity
        if (twins.length > 0) {
          twins.forEach((el, i) => {
            if (isEqual(el.options, action.payload.options)) {
              target = el;
              el.quantity += 1;
              return;
            }
          });
        }
        // if the duplicate exists, stop
        if (target) return;
      }

      // if not, add a new entry
      state.value.contents.push({ ...action.payload, quantity: 1 });
    },

    increment: (state, action) => {
      state.value.totalItems += 1;
      state.value.contents[action.payload].quantity += 1;
    },

    decrement: (state, action) => {
      state.value.totalItems -= 1;
      if (state.value.contents[action.payload].quantity > 1) {
        state.value.contents[action.payload].quantity -= 1;
        return;
      }
      state.value.contents.splice(action.payload, 1);
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

export const {
  addToCart,
  removeFromCart,
  calculateTotalPrice,
  increment,
  decrement,
} = cartSlice.actions;

export default cartSlice.reducer;
