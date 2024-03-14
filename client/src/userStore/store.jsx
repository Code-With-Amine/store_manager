import { configureStore } from "@reduxjs/toolkit";
import storeReducer from "../feauturs/storeReducer";
import ProductsReducer from "../feauturs/ProductsReducer";

export const store = configureStore({
  reducer: {
    storeReducer: storeReducer,
    ProductsReducer: ProductsReducer
  },
});
