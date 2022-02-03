import { configureStore } from "@reduxjs/toolkit";

import categoryReducer from "./categoryStore";
import cartReducer from "./cartStore";
import currencyReducer from "./currencyStore";

export default configureStore({
  reducer: {
    category: categoryReducer,
    cart: cartReducer,
    currency: currencyReducer,
  },
});
