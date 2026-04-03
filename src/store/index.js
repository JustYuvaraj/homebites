import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import orderReducer from './orderSlice';
import authReducer from './authSlice';
import menuReducer from './menuSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    orders: orderReducer,
    auth: authReducer,
    menu: menuReducer,
  },
});

export default store;
