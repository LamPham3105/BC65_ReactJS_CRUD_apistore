import { configureStore } from "@reduxjs/toolkit";
import storeReducer from "./reducers/storeReducer";

export const store = configureStore({
  reducer: {
    stores: storeReducer,
  },
});
