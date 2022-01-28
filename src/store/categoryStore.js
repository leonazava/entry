import { createSlice, configureStore } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    value: "all",
    test: 1,
  },
  reducers: {
    assign: (state, action) => {
      state.value = action.payload;
    },
    increment: (state) => {
      state.num += 1;
    },
  },
});

export const { assign, increment } = categorySlice.actions;

const categoryStore = configureStore({
  reducer: categorySlice.reducer,
});

export default categoryStore;
