import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Simulate API call for placing order
export const placeOrder = createAsyncThunk(
  'orders/placeOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const order = {
        id: `ORD${Date.now()}`,
        ...orderData,
        status: 'pending',
        cookStatus: 'pending', // pending, accepted, rejected, preparing, ready
        deliveryStatus: 'unassigned', // unassigned, assigned, picked, delivered
        deliveryAgent: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        estimatedDelivery: null,
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
    // Cook actions
    acceptOrder: (state, action) => {
      const order = state.orders.find(o => o.id === action.payload);
      if (order) {
        order.cookStatus = 'accepted';
        order.status = 'confirmed';
        order.updatedAt = new Date().toISOString();
        order.estimatedDelivery = new Date(Date.now() + 45 * 60000).toISOString();
      }
    },
    rejectOrder: (state, action) => {
      const { orderId, reason } = action.payload;
      const order = state.orders.find(o => o.id === orderId);
      if (order) {
        order.cookStatus = 'rejected';
        order.status = 'cancelled';
        order.rejectionReason = reason;
        order.updatedAt = new Date().toISOString();
      }
    },
    startPreparing: (state, action) => {
      const order = state.orders.find(o => o.id === action.payload);
      if (order) {
        order.cookStatus = 'preparing';
        order.status = 'preparing';
        order.updatedAt = new Date().toISOString();
      }
    },
    markReady: (state, action) => {
      const order = state.orders.find(o => o.id === action.payload);
      if (order) {
        order.cookStatus = 'ready';
        order.status = 'ready';
        order.updatedAt = new Date().toISOString();
      }
    },
    // Delivery agent assignment
    assignDeliveryAgent: (state, action) => {
      const { orderId, agentName, agentPhone } = action.payload;
      const order = state.orders.find(o => o.id === orderId);
      if (order) {
        order.deliveryAgent = { name: agentName, phone: agentPhone };
        order.deliveryStatus = 'assigned';
        order.updatedAt = new Date().toISOString();
      }
    },
    pickupOrder: (state, action) => {
      const order = state.orders.find(o => o.id === action.payload);
      if (order) {
        order.deliveryStatus = 'picked';
        order.status = 'out-for-delivery';
        order.updatedAt = new Date().toISOString();
      }
    },
    deliverOrder: (state, action) => {
      const order = state.orders.find(o => o.id === action.payload);
      if (order) {
        order.deliveryStatus = 'delivered';
        order.status = 'delivered';
        order.deliveredAt = new Date().toISOString();
        order.updatedAt = new Date().toISOString();
      }
    },
    updateOrderStatus: (state, action) => {
      const { orderId, status } = action.payload;
      const order = state.orders.find(o => o.id === orderId);
      if (order) {
        order.status = status;
        order.updatedAt = new Date().toISOString();
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

export const { 
  acceptOrder, 
  rejectOrder, 
  startPreparing, 
  markReady,
  assignDeliveryAgent,
  pickupOrder,
  deliverOrder,
  updateOrderStatus, 
  clearCurrentOrder 
} = orderSlice.actions;
export default orderSlice.reducer;
