import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import orderReducer from './orderSlice';
import authReducer from './authSlice';
import menuReducer from './menuSlice';
import checkoutReducer from './checkoutSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    orders: orderReducer,
    auth: authReducer,
    menu: menuReducer,
    checkout: checkoutReducer,
  },
  // Enable Redux DevTools in development
  devTools: import.meta.env.DEV,
});

export default store;
