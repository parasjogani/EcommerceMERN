import { configureStore } from '@reduxjs/toolkit';
import storeReducer from "../features/ourstore/storeSlice"
import authRouter from "../features/auth/authSlice"

export const store = configureStore({
  reducer: {
    ourstore: storeReducer,
    auth: authRouter
  }
});
