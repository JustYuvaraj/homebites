import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { customerAPI } from '../services/api';
import { paymentAPI } from '../services/paymentService';

// ============ ASYNC THUNKS ============

// Step 1: Create order on backend
export const initiateCheckout = createAsyncThunk(
  'checkout/initiate',
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await customerAPI.placeOrder(orderData);
      return response.data || response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to create order');
    }
  }
);

// Step 2: Create Razorpay payment order
export const createPaymentOrder = createAsyncThunk(
  'checkout/createPayment',
  async ({ orderId, amount }, { rejectWithValue }) => {
    try {
      const response = await paymentAPI.createOrder(orderId, amount);
      return response.data || response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to create payment');
    }
  }
);

// Step 3: Verify payment after Razorpay callback
export const verifyPayment = createAsyncThunk(
  'checkout/verifyPayment',
  async (paymentData, { rejectWithValue }) => {
    try {
      const response = await paymentAPI.verifyPayment(paymentData);
      return response.data || response;
    } catch (error) {
      return rejectWithValue(error.message || 'Payment verification failed');
    }
  }
);

// ============ INITIAL STATE ============

const initialState = {
  // Checkout steps: 'address' -> 'payment' -> 'processing' -> 'success' / 'failed'
  currentStep: 'address',
  
  // Address
  selectedAddress: null,
  deliveryInstructions: '',
  
  // Payment
  paymentMethod: 'online', // 'online' | 'cod'
  razorpayOrderId: null,
  razorpayPaymentId: null,
  
  // Order
  currentOrderId: null,
  orderDetails: null,
  
  // Status
  status: 'idle', // 'idle' | 'creating_order' | 'creating_payment' | 'awaiting_payment' | 'verifying' | 'success' | 'failed'
  error: null,
  
  // Price breakdown
  subtotal: 0,
  deliveryFee: 0,
  platformFee: 0,
  taxes: 0,
  discount: 0,
  total: 0,
};

// ============ SLICE ============

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.currentStep = action.payload;
    },
    
    setSelectedAddress: (state, action) => {
      state.selectedAddress = action.payload;
    },
    
    setDeliveryInstructions: (state, action) => {
      state.deliveryInstructions = action.payload;
    },
    
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
    
    calculatePricing: (state, action) => {
      const { subtotal } = action.payload;
      state.subtotal = subtotal;
      state.deliveryFee = subtotal > 500 ? 0 : 40;
      state.platformFee = Math.round(subtotal * 0.02); // 2% platform fee
      state.taxes = Math.round(subtotal * 0.05); // 5% GST
      state.total = subtotal + state.deliveryFee + state.platformFee + state.taxes - state.discount;
    },
    
    applyDiscount: (state, action) => {
      state.discount = action.payload;
      state.total = state.subtotal + state.deliveryFee + state.platformFee + state.taxes - state.discount;
    },
    
    setPaymentSuccess: (state, action) => {
      state.status = 'success';
      state.razorpayPaymentId = action.payload.paymentId;
      state.currentStep = 'success';
    },
    
    setPaymentFailed: (state, action) => {
      state.status = 'failed';
      state.error = action.payload || 'Payment failed. Please try again.';
    },
    
    resetCheckout: () => initialState,
  },
  
  extraReducers: (builder) => {
    builder
      // Initiate Checkout (Create Order)
      .addCase(initiateCheckout.pending, (state) => {
        state.status = 'creating_order';
        state.error = null;
      })
      .addCase(initiateCheckout.fulfilled, (state, action) => {
        state.currentOrderId = action.payload.id || action.payload.orderId;
        state.orderDetails = action.payload;
        state.status = 'creating_payment';
      })
      .addCase(initiateCheckout.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Create Payment Order
      .addCase(createPaymentOrder.pending, (state) => {
        state.status = 'creating_payment';
      })
      .addCase(createPaymentOrder.fulfilled, (state, action) => {
        state.razorpayOrderId = action.payload.razorpayOrderId || action.payload.orderId;
        state.status = 'awaiting_payment';
      })
      .addCase(createPaymentOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Verify Payment
      .addCase(verifyPayment.pending, (state) => {
        state.status = 'verifying';
      })
      .addCase(verifyPayment.fulfilled, (state) => {
        state.status = 'success';
        state.currentStep = 'success';
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const {
  setStep,
  setSelectedAddress,
  setDeliveryInstructions,
  setPaymentMethod,
  calculatePricing,
  applyDiscount,
  setPaymentSuccess,
  setPaymentFailed,
  resetCheckout,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
