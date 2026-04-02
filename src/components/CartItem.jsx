import { useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart } from '../store/cartSlice';
import { Plus, Minus, Trash2 } from 'lucide-react';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleIncrease = () => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeFromCart(item.id));
    }
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
  };

  return (
    <div className="flex gap-4 bg-white p-4 rounded-xl shadow-sm">
      {/* Image */}
      <img
        src={item.image}
        alt={item.name}
        className="w-24 h-24 object-cover rounded-lg"
      />

      {/* Details */}
      <div className="flex-grow">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-gray-800">{item.name}</h3>
            <p className="text-sm text-gray-500">₹{item.price} each</p>
          </div>
          <button
            onClick={handleRemove}
            className="text-red-500 hover:text-red-600 p-1"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>

        {/* Quantity Controls */}
        <div className="flex justify-between items-center mt-3">
          <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-1">
            <button
              onClick={handleDecrease}
              className="p-1 hover:bg-gray-200 rounded transition-colors"
            >
              <Minus className="h-4 w-4 text-gray-600" />
            </button>
            <span className="font-medium text-gray-800 w-8 text-center">
              {item.quantity}
            </span>
            <button
              onClick={handleIncrease}
              className="p-1 hover:bg-gray-200 rounded transition-colors"
            >
              <Plus className="h-4 w-4 text-gray-600" />
            </button>
          </div>
          <span className="font-bold text-gray-800">
            ₹{item.price * item.quantity}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
