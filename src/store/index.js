import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./categoryStore";
import cartReducer from "./cartStore";

export default configureStore({
  reducer: {
    category: categoryReducer,
    cart: cartReducer,
  },
});
