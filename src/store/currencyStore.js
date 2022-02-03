import { createSlice } from "@reduxjs/toolkit";

const currencySlice = createSlice({
  name: "currency",
  initialState: {
    value: {
      currencies: [],
      active: "USD",
    },
  },
  reducers: {
    assign: (state, action) => {
      state.value.currencies = action.payload;
      state.value.active = state.value.currencies[0];
    },
    select: (state, action) => {
      state.value.active = action.payload;
    },
  },
});

export const { assign, select } = currencySlice.actions;

export default currencySlice.reducer;
