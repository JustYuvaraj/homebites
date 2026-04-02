import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { placeOrder } from '../store/orderSlice';
import { clearCart } from '../store/cartSlice';
import { MapPin, CreditCard, Wallet, Loader2 } from 'lucide-react';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, totalAmount } = useSelector((state) => state.cart);
  const { loading } = useSelector((state) => state.orders);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    landmark: '',
    paymentMethod: 'cod',
  });

  const deliveryFee = totalAmount > 500 ? 0 : 40;
  const taxes = Math.round(totalAmount * 0.05);
  const grandTotal = totalAmount + deliveryFee + taxes;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const orderData = {
      items,
      totalAmount: grandTotal,
      deliveryAddress: {
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        landmark: formData.landmark,
      },
      paymentMethod: formData.paymentMethod,
    };

    const result = await dispatch(placeOrder(orderData));
    
    if (placeOrder.fulfilled.match(result)) {
      dispatch(clearCart());
      navigate('/order-success');
    }
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Delivery Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Address Section */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="h-5 w-5 text-orange-500" />
                  <h3 className="text-lg font-semibold text-gray-800">Delivery Address</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Delivery Address *
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                      placeholder="House/Flat No., Building, Street, Area"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Landmark (Optional)
                    </label>
                    <input
                      type="text"
                      name="landmark"
                      value={formData.landmark}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Near Metro Station, Opposite Park, etc."
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center gap-2 mb-4">
                  <CreditCard className="h-5 w-5 text-orange-500" />
                  <h3 className="text-lg font-semibold text-gray-800">Payment Method</h3>
                </div>

                <div className="space-y-3">
                  <label className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                    formData.paymentMethod === 'cod' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleInputChange}
                      className="text-orange-500 focus:ring-orange-500"
                    />
                    <Wallet className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-800">Cash on Delivery</p>
                      <p className="text-sm text-gray-500">Pay when your order arrives</p>
                    </div>
                  </label>

                  <label className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                    formData.paymentMethod === 'online' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="online"
                      checked={formData.paymentMethod === 'online'}
                      onChange={handleInputChange}
                      className="text-orange-500 focus:ring-orange-500"
                    />
                    <CreditCard className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-800">Online Payment</p>
                      <p className="text-sm text-gray-500">UPI, Cards, Net Banking</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h3>
                
                {/* Items preview */}
                <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-grow">
                        <p className="text-sm font-medium text-gray-800 line-clamp-1">{item.name}</p>
                        <p className="text-xs text-gray-500">x{item.quantity}</p>
                      </div>
                      <p className="text-sm font-medium">₹{item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-3 mb-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{totalAmount}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery</span>
                    <span className={deliveryFee === 0 ? 'text-green-500' : ''}>
                      {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Taxes</span>
                    <span>₹{taxes}</span>
                  </div>
                </div>

                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between text-lg font-bold text-gray-800">
                    <span>Total</span>
                    <span>₹{grandTotal}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Placing Order...
                    </>
                  ) : (
                    `Place Order • ₹${grandTotal}`
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
