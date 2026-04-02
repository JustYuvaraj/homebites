import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { Plus, Star, Clock, Leaf } from 'lucide-react';

const MenuCard = ({ item }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(item));
  };

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
        {item.isVeg && (
          <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <Leaf className="h-3 w-3" />
            Veg
          </div>
        )}
        {!item.isAvailable && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-semibold">Not Available</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{item.name}</h3>
          <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded">
            <Star className="h-4 w-4 text-green-600 fill-green-600" />
            <span className="text-sm font-medium text-green-600">{item.rating}</span>
          </div>
        </div>

        <p className="text-gray-500 text-sm line-clamp-2 mb-3 flex-grow">{item.description}</p>

        <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
          <Clock className="h-4 w-4" />
          <span>{item.preparationTime} mins</span>
        </div>

        {/* Price and Add Button */}
        <div className="flex justify-between items-center mt-auto">
          <span className="text-xl font-bold text-gray-800">₹{item.price}</span>
          <button
            onClick={handleAddToCart}
            disabled={!item.isAvailable}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white px-4 py-2 rounded-xl font-medium transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
