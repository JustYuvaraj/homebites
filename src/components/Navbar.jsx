import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ShoppingCart, User, ChefHat } from 'lucide-react';

const Navbar = () => {
  const { totalItems } = useSelector((state) => state.cart);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <ChefHat className="h-8 w-8 text-orange-500" />
            <span className="text-2xl font-bold text-gray-800">
              Home<span className="text-orange-500">Bites</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-gray-600 hover:text-orange-500 transition-colors">
              Menu
            </Link>
            <Link to="/orders" className="text-gray-600 hover:text-orange-500 transition-colors">
              My Orders
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-orange-500 transition-colors">
              About Us
            </Link>
          </div>

          {/* Right side icons */}
          <div className="flex items-center gap-4">
            <Link 
              to="/cart" 
              className="relative p-2 text-gray-600 hover:text-orange-500 transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center cart-bounce">
                  {totalItems}
                </span>
              )}
            </Link>
            <Link 
              to="/login" 
              className="p-2 text-gray-600 hover:text-orange-500 transition-colors"
            >
              <User className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
