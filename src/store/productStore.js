import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    value: {
      active: "",
      data: {},
    },
  },
  reducers: {
    select: (state, action) => {
      state.value.active = action.payload.id;
      state.value.data = action.payload.data;
    },
  },
});

export const { assign, select } = productSlice.actions;

export default productSlice.reducer;
