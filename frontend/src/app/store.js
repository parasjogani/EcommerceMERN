import { configureStore } from '@reduxjs/toolkit';
import storeReducer from "../features/ourstore/storeSlice"
import authReducer from "../features/auth/authSlice"
import cartReducer from "../features/cart/cartSlice"

export const store = configureStore({
  reducer: {
    ourstore: storeReducer,
    auth: authReducer,
    cart: cartReducer
  }
});
