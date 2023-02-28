import { configureStore } from '@reduxjs/toolkit';
import storeReducer from "../features/ourstore/storeSlice"

export const store = configureStore({
  reducer: {
    ourstore: storeReducer,
  }
});
