import { configureStore } from "@reduxjs/toolkit";
import storeReducer from "../feauturs/storeReducer";

export const store = configureStore({
  reducer: {
    storeReducer: storeReducer,
  },
});
