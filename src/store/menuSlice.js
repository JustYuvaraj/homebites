import { createSlice } from '@reduxjs/toolkit';
import { menuItems as initialMenuItems } from '../data/menuData';

const initialState = {
  items: initialMenuItems,
  loading: false,
  error: null,
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    addMenuItem: (state, action) => {
      const newItem = {
        ...action.payload,
        id: Date.now(),
        rating: 4.5,
        reviewCount: 0,
      };
      state.items.push(newItem);
    },
    updateMenuItem: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
      }
    },
    deleteMenuItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    toggleAvailability: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        item.isAvailable = !item.isAvailable;
      }
    },
  },
});

export const { addMenuItem, updateMenuItem, deleteMenuItem, toggleAvailability } = menuSlice.actions;
export default menuSlice.reducer;
