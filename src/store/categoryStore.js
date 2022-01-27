import { createSlice, configureStore } from "@reduxjs/toolkit";

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

const categoryStore = configureStore({
  reducer: categorySlice.reducer,
});

export default categoryStore;
