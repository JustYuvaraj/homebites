import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Simulate API call for placing order
export const placeOrder = createAsyncThunk(
  'orders/placeOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const order = {
        id: `ORD${Date.now()}`,
        ...orderData,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
        estimatedDelivery: new Date(Date.now() + 45 * 60000).toISOString(),
      };
      
      return order;
    } catch (error) {
      return rejectWithValue('Failed to place order');
    }
  }
);

const initialState = {
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    updateOrderStatus: (state, action) => {
      const { orderId, status } = action.payload;
      const order = state.orders.find(o => o.id === orderId);
      if (order) {
        order.status = status;
      }
      if (state.currentOrder?.id === orderId) {
        state.currentOrder.status = status;
      }
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.unshift(action.payload);
        state.currentOrder = action.payload;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { updateOrderStatus, clearCurrentOrder } = orderSlice.actions;
export default orderSlice.reducer;
