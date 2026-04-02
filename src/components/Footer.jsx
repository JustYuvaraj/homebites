import { ChefHat, Phone, Mail, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <ChefHat className="h-8 w-8 text-orange-500" />
              <span className="text-2xl font-bold text-white">
                Home<span className="text-orange-500">Bites</span>
              </span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Authentic homemade food delivered to your doorstep. Made with love, 
              served with care. Experience the taste of home-cooked meals.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-orange-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-orange-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-orange-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-orange-500 transition-colors">Menu</Link>
              </li>
              <li>
                <Link to="/orders" className="hover:text-orange-500 transition-colors">My Orders</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-orange-500 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-orange-500 transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-orange-500" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-orange-500" />
                <span>hello@homebites.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-orange-500 mt-1" />
                <span>123 Food Street, Bangalore, Karnataka 560001</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} HomeBites. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
