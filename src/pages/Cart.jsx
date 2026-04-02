import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearCart } from '../store/cartSlice';
import CartItem from '../components/CartItem';
import { ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, totalAmount, totalItems } = useSelector((state) => state.cart);

  const deliveryFee = totalAmount > 500 ? 0 : 40;
  const taxes = Math.round(totalAmount * 0.05);
  const grandTotal = totalAmount + deliveryFee + taxes;

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      dispatch(clearCart());
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Looks like you haven't added anything yet</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-medium transition-colors"
          >
            Browse Menu
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Your Cart</h1>
            <p className="text-gray-500">{totalItems} items</p>
          </div>
          <button
            onClick={handleClearCart}
            className="flex items-center gap-2 text-red-500 hover:text-red-600 font-medium"
          >
            <Trash2 className="h-5 w-5" />
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h3>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{totalAmount}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span className={deliveryFee === 0 ? 'text-green-500' : ''}>
                    {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Taxes (5%)</span>
                  <span>₹{taxes}</span>
                </div>
              </div>

              {totalAmount < 500 && (
                <p className="text-sm text-orange-500 mb-4">
                  Add ₹{500 - totalAmount} more for free delivery!
                </p>
              )}

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between text-lg font-bold text-gray-800">
                  <span>Total</span>
                  <span>₹{grandTotal}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
              >
                Proceed to Checkout
                <ArrowRight className="h-5 w-5" />
              </button>

              <Link
                to="/"
                className="block text-center text-orange-500 hover:underline mt-4 font-medium"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
