import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    value: [],
  },
  reducers: {
    add: (state, action) => {
      // check if a product's already in the cart
      let i = state.value.findIndex((el) => el.name === action.payload.name);

      // if it is, update it

      // if not, add it
      state.value = [...state.value, action.payload];
      console.log(state.value);
    },
  },
});

export const { add } = cartSlice.actions;

export default cartSlice.reducer;
