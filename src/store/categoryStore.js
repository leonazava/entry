import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    value: "all",
  },
  reducers: {
    assign: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { assign } = categorySlice.actions;

export default categorySlice.reducer;
