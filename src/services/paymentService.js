import api from './api';

// ============ RAZORPAY CONFIGURATION ============

const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_YOUR_KEY_HERE';

// ============ PAYMENT API ============

export const paymentAPI = {
  // Create a Razorpay order via your Spring Boot backend
  createOrder: (orderId, amount) => 
    api.post('/payments/create-order', { orderId, amount }),
  
  // Verify payment signature via backend
  verifyPayment: ({ razorpayOrderId, razorpayPaymentId, razorpaySignature }) =>
    api.post('/payments/verify', {
      razorpay_order_id: razorpayOrderId,
      razorpay_payment_id: razorpayPaymentId,
      razorpay_signature: razorpaySignature,
    }),
  
  // Get payment status
  getPaymentStatus: (orderId) => 
    api.get(`/payments/status/${orderId}`),
  
  // Request refund
  requestRefund: (orderId, reason) =>
    api.post(`/payments/refund`, { orderId, reason }),
};

// ============ RAZORPAY CHECKOUT HANDLER ============

/**
 * Opens the Razorpay checkout modal and returns a promise
 * that resolves with payment details on success or rejects on failure.
 * 
 * This is the core payment orchestration function — the kind of logic
 * Juspay builds at scale across multiple payment gateways.
 * 
 * Flow:
 * 1. Load Razorpay SDK script dynamically
 * 2. Create Razorpay instance with order details
 * 3. Open checkout modal
 * 4. Return payment credentials on success
 */
export const openRazorpayCheckout = ({
  razorpayOrderId,
  amount,
  currency = 'INR',
  customerName,
  customerEmail,
  customerPhone,
  orderId,
  onPaymentSuccess,
  onPaymentFailure,
}) => {
  return new Promise((resolve, reject) => {
    // Ensure Razorpay SDK is loaded
    if (!window.Razorpay) {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => initCheckout();
      script.onerror = () => reject(new Error('Failed to load Razorpay SDK'));
      document.body.appendChild(script);
    } else {
      initCheckout();
    }

    function initCheckout() {
      const options = {
        key: RAZORPAY_KEY_ID,
        amount: amount * 100, // Razorpay expects paise
        currency,
        name: 'HomeBites',
        description: `Order #${orderId}`,
        order_id: razorpayOrderId,
        image: '/vite.svg', // Your logo
        
        // Prefill customer details
        prefill: {
          name: customerName || '',
          email: customerEmail || '',
          contact: customerPhone || '',
        },
        
        // Notes for your records
        notes: {
          orderId,
          platform: 'HomeBites',
        },
        
        // Theme
        theme: {
          color: '#f97316', // Brand orange
          backdrop_color: 'rgba(0, 0, 0, 0.7)',
        },
        
        // Payment methods to show
        config: {
          display: {
            blocks: {
              utib: { name: 'Pay using UPI', instruments: [{ method: 'upi' }] },
              banks: { name: 'Pay using Cards/Net Banking', instruments: [{ method: 'card' }, { method: 'netbanking' }] },
            },
            sequence: ['block.utib', 'block.banks'],
            preferences: { show_default_blocks: true },
          },
        },
        
        // Success handler
        handler: function (response) {
          const paymentData = {
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
          };
          
          if (onPaymentSuccess) onPaymentSuccess(paymentData);
          resolve(paymentData);
        },
        
        // Modal close without payment
        modal: {
          ondismiss: function () {
            const error = new Error('Payment cancelled by user');
            error.code = 'PAYMENT_CANCELLED';
            if (onPaymentFailure) onPaymentFailure(error);
            reject(error);
          },
        },
      };

      try {
        const rzp = new window.Razorpay(options);
        
        // Handle payment failure
        rzp.on('payment.failed', function (response) {
          const error = new Error(response.error.description || 'Payment failed');
          error.code = response.error.code;
          error.reason = response.error.reason;
          error.metadata = response.error.metadata;
          if (onPaymentFailure) onPaymentFailure(error);
          reject(error);
        });
        
        rzp.open();
      } catch (err) {
        reject(new Error('Failed to initialize Razorpay checkout'));
      }
    }
  });
};

/**
 * Simulated payment for development/demo mode.
 * When the backend is not connected, this provides a realistic
 * payment experience with a mock confirmation flow.
 */
export const simulatePayment = ({ amount, orderId }) => {
  return new Promise((resolve) => {
    // Simulate 2-second processing delay
    setTimeout(() => {
      resolve({
        razorpayOrderId: `order_demo_${Date.now()}`,
        razorpayPaymentId: `pay_demo_${Date.now()}`,
        razorpaySignature: `sig_demo_${Date.now()}`,
        amount,
        orderId,
        status: 'success',
        method: 'upi',
      });
    }, 2000);
  });
};

export default paymentAPI;
