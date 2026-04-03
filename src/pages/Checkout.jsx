import { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { placeOrder } from '../store/orderSlice';
import { clearCart } from '../store/cartSlice';
import {
  setStep,
  setPaymentMethod,
  calculatePricing,
  setPaymentSuccess,
  setPaymentFailed,
  resetCheckout,
} from '../store/checkoutSlice';
import { simulatePayment } from '../services/paymentService';
import {
  MapPin, CreditCard, Wallet, Loader2, CheckCircle2, Shield,
  Smartphone, Building2, ArrowLeft, ChevronRight, Clock,
  AlertCircle, Truck, Banknote, Zap, LockKeyhole
} from 'lucide-react';
import toast from 'react-hot-toast';

const PAYMENT_METHODS = [
  {
    id: 'upi',
    label: 'UPI',
    subtitle: 'Google Pay, PhonePe, Paytm',
    icon: Smartphone,
    recommended: true,
  },
  {
    id: 'card',
    label: 'Credit / Debit Card',
    subtitle: 'Visa, Mastercard, Rupay',
    icon: CreditCard,
  },
  {
    id: 'netbanking',
    label: 'Net Banking',
    subtitle: 'All major banks',
    icon: Building2,
  },
  {
    id: 'cod',
    label: 'Cash on Delivery',
    subtitle: 'Pay when your order arrives',
    icon: Banknote,
  },
];

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, totalAmount } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const checkout = useSelector((state) => state.checkout);
  const { loading } = useSelector((state) => state.orders);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: '',
    landmark: '',
    pincode: '',
  });
  const [selectedPayment, setSelectedPayment] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState('details'); // 'details' | 'processing' | 'success'
  const [errors, setErrors] = useState({});

  // Calculate pricing
  const pricing = useMemo(() => {
    const subtotal = totalAmount;
    const deliveryFee = subtotal > 500 ? 0 : 40;
    const platformFee = Math.round(subtotal * 0.02);
    const taxes = Math.round(subtotal * 0.05);
    const total = subtotal + deliveryFee + platformFee + taxes;
    return { subtotal, deliveryFee, platformFee, taxes, total };
  }, [totalAmount]);

  useEffect(() => {
    dispatch(calculatePricing({ subtotal: totalAmount }));
  }, [totalAmount, dispatch]);

  // Redirect if no items
  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
    }
  }, [items, navigate]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\D/g, '').slice(-10)))
      newErrors.phone = 'Enter a valid 10-digit phone number';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsProcessing(true);
    setPaymentStep('processing');

    try {
      const orderData = {
        items: items.map((item) => ({
          menuItemId: item.id,
          quantity: item.quantity,
          unitPrice: item.price,
        })),
        totalAmount: pricing.total,
        deliveryAddress: {
          name: formData.name,
          phone: formData.phone,
          fullAddress: formData.address,
          landmark: formData.landmark,
          pincode: formData.pincode,
        },
        paymentMethod: selectedPayment === 'cod' ? 'COD' : 'ONLINE',
        specialInstructions: '',
      };

      // Step 1: Create order
      const result = await dispatch(placeOrder(orderData));

      if (placeOrder.fulfilled.match(result)) {
        if (selectedPayment === 'cod') {
          // COD: Skip payment, go straight to success
          handlePaymentComplete();
        } else {
          // Online: Simulate Razorpay payment (or use real Razorpay)
          try {
            const paymentResult = await simulatePayment({
              amount: pricing.total,
              orderId: result.payload.id || result.payload.orderId,
            });

            dispatch(setPaymentSuccess({ paymentId: paymentResult.razorpayPaymentId }));
            handlePaymentComplete();
          } catch (paymentError) {
            if (paymentError.code === 'PAYMENT_CANCELLED') {
              toast.error('Payment was cancelled');
              setPaymentStep('details');
            } else {
              dispatch(setPaymentFailed(paymentError.message));
              toast.error('Payment failed. Please try again.');
              setPaymentStep('details');
            }
          }
        }
      } else {
        toast.error('Failed to create order. Please try again.');
        setPaymentStep('details');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
      setPaymentStep('details');
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePaymentComplete = () => {
    setPaymentStep('success');
    dispatch(clearCart());
    toast.success('Order placed successfully! 🎉');

    // Navigate after brief delay for animation
    setTimeout(() => {
      dispatch(resetCheckout());
      navigate('/order-success');
    }, 1500);
  };

  if (items.length === 0) return null;

  // ============ PROCESSING STATE ============
  if (paymentStep === 'processing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-sm w-full text-center animate-fade-in">
          <div className="relative mx-auto w-20 h-20 mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-orange-100" />
            <div className="absolute inset-0 rounded-full border-4 border-t-orange-500 animate-spin" />
            <div className="absolute inset-3 bg-orange-50 rounded-full flex items-center justify-center">
              <LockKeyhole className="h-6 w-6 text-orange-500" />
            </div>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Processing Payment
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Please wait while we securely process your payment...
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
            <Shield className="h-4 w-4" />
            <span>Secured by Razorpay</span>
          </div>
        </div>
      </div>
    );
  }

  // ============ PAYMENT SUCCESS STATE ============
  if (paymentStep === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-sm w-full text-center animate-slide-up">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-10 w-10 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Payment Successful!
          </h2>
          <p className="text-gray-500 mb-2">₹{pricing.total} paid via {selectedPayment.toUpperCase()}</p>
          <p className="text-sm text-gray-400">Redirecting to order tracking...</p>
        </div>
      </div>
    );
  }

  // ============ MAIN CHECKOUT FORM ============
  return (
    <div className="min-h-screen bg-gray-50 py-6 lg:py-10">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/cart')}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Checkout</h1>
            <p className="text-sm text-gray-500">{items.length} items • ₹{pricing.total}</p>
          </div>
        </div>

        {/* Checkout Steps Indicator */}
        <div className="flex items-center gap-3 mb-8 px-4">
          {['Address', 'Payment', 'Confirm'].map((step, i) => (
            <div key={step} className="flex items-center gap-3 flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                  i === 0
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {i + 1}
              </div>
              <span className={`text-sm font-medium ${i === 0 ? 'text-gray-800' : 'text-gray-400'}`}>
                {step}
              </span>
              {i < 2 && <ChevronRight className="h-4 w-4 text-gray-300 ml-auto" />}
            </div>
          ))}
        </div>

        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column: Address + Payment */}
            <div className="lg:col-span-2 space-y-6">
              {/* Delivery Address */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="flex items-center gap-3 p-5 border-b border-gray-50 bg-gray-50/50">
                  <div className="w-9 h-9 bg-orange-100 rounded-lg flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Delivery Address</h3>
                    <p className="text-xs text-gray-500">Where should we deliver your food?</p>
                  </div>
                </div>
                <div className="p-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Full Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-shadow ${
                          errors.name ? 'border-red-300 bg-red-50' : 'border-gray-200'
                        }`}
                        placeholder="Yuvaraj S"
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" /> {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Phone Number <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">+91</span>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`w-full pl-12 pr-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-shadow ${
                            errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-200'
                          }`}
                          placeholder="9876543210"
                          maxLength={10}
                        />
                      </div>
                      {errors.phone && (
                        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" /> {errors.phone}
                        </p>
                      )}
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Delivery Address <span className="text-red-400">*</span>
                      </label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        rows={3}
                        className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none transition-shadow ${
                          errors.address ? 'border-red-300 bg-red-50' : 'border-gray-200'
                        }`}
                        placeholder="House/Flat No., Building, Street, Area"
                      />
                      {errors.address && (
                        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" /> {errors.address}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Landmark
                      </label>
                      <input
                        type="text"
                        name="landmark"
                        value={formData.landmark}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-shadow"
                        placeholder="Near Metro Station, Opposite Park, etc."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Pincode
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-shadow"
                        placeholder="600001"
                        maxLength={6}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="flex items-center gap-3 p-5 border-b border-gray-50 bg-gray-50/50">
                  <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Payment Method</h3>
                    <p className="text-xs text-gray-500">Choose how you'd like to pay</p>
                  </div>
                  <div className="ml-auto flex items-center gap-1.5 text-xs text-gray-400">
                    <Shield className="h-3.5 w-3.5" />
                    <span>100% Secure</span>
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  {PAYMENT_METHODS.map((method) => {
                    const Icon = method.icon;
                    const isSelected = selectedPayment === method.id;
                    return (
                      <label
                        key={method.id}
                        className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                          isSelected
                            ? 'border-orange-500 bg-orange-50/50 shadow-sm'
                            : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50/50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value={method.id}
                          checked={isSelected}
                          onChange={() => setSelectedPayment(method.id)}
                          className="sr-only"
                        />
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                            isSelected ? 'border-orange-500' : 'border-gray-300'
                          }`}
                        >
                          {isSelected && (
                            <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                          )}
                        </div>
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          isSelected ? 'bg-orange-100' : 'bg-gray-100'
                        }`}>
                          <Icon className={`h-5 w-5 ${isSelected ? 'text-orange-500' : 'text-gray-500'}`} />
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-gray-800 text-sm">{method.label}</p>
                            {method.recommended && (
                              <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded-full uppercase">
                                Recommended
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500">{method.subtitle}</p>
                        </div>
                        {isSelected && (
                          <CheckCircle2 className="h-5 w-5 text-orange-500" />
                        )}
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 sticky top-24 overflow-hidden">
                <div className="p-5 border-b border-gray-50 bg-gray-50/50">
                  <h3 className="font-semibold text-gray-800">Order Summary</h3>
                </div>

                {/* Items */}
                <div className="p-5 space-y-3 max-h-56 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={item.imageUrl || item.image || `https://placehold.co/48x48/fff7ed/f97316?text=${item.name?.[0] || 'F'}`}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-grow min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">{item.name}</p>
                        <div className="flex items-center gap-1">
                          <span className={item.isVeg ? 'veg-badge' : 'nonveg-badge'} style={{ width: 12, height: 12 }} />
                        </div>
                      </div>
                      <p className="text-sm font-semibold text-gray-800">₹{item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="p-5 border-t border-gray-100 space-y-2.5">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{pricing.subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Delivery Fee</span>
                    <span className={pricing.deliveryFee === 0 ? 'text-green-600 font-medium' : ''}>
                      {pricing.deliveryFee === 0 ? 'FREE' : `₹${pricing.deliveryFee}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Platform Fee</span>
                    <span>₹{pricing.platformFee}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>GST (5%)</span>
                    <span>₹{pricing.taxes}</span>
                  </div>
                </div>

                {/* Total */}
                <div className="p-5 border-t-2 border-gray-100 bg-gray-50/50">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-bold text-gray-800">Total</span>
                    <span className="text-lg font-bold text-gray-800">₹{pricing.total}</span>
                  </div>

                  {/* Delivery ETA */}
                  <div className="flex items-center gap-2 mb-4 p-3 bg-green-50 rounded-xl">
                    <Truck className="h-4 w-4 text-green-600" />
                    <span className="text-xs font-medium text-green-700">
                      Estimated delivery: 30-45 mins
                    </span>
                  </div>

                  {/* CTA Button */}
                  <button
                    type="submit"
                    disabled={isProcessing || loading}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-orange-300 disabled:to-orange-300 text-white py-3.5 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 active:scale-[0.98]"
                  >
                    {isProcessing || loading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Processing...
                      </>
                    ) : selectedPayment === 'cod' ? (
                      <>
                        <Banknote className="h-5 w-5" />
                        Place Order • ₹{pricing.total}
                      </>
                    ) : (
                      <>
                        <Zap className="h-5 w-5" />
                        Pay ₹{pricing.total}
                      </>
                    )}
                  </button>

                  {/* Security Badge */}
                  <div className="flex items-center justify-center gap-1.5 mt-3 text-[11px] text-gray-400">
                    <LockKeyhole className="h-3 w-3" />
                    <span>Payments powered by Razorpay • 256-bit SSL</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
