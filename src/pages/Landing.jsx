import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, ChefHat, Truck, Users, Star, ArrowRight, Search, Utensils, ShoppingBag } from 'lucide-react';

const Landing = () => {
  const [address, setAddress] = useState('');

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🍛</span>
            <span className="text-2xl font-bold text-gray-800">
              Veetu<span className="text-orange-500">Saapadu</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/cook/dashboard" className="text-gray-600 hover:text-orange-500 font-medium hidden sm:block">
              Cook Login
            </Link>
            <Link to="/delivery/dashboard" className="text-gray-600 hover:text-orange-500 font-medium hidden sm:block">
              Delivery Login
            </Link>
            <Link
              to="/menu"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-full font-medium transition-colors"
            >
              Order Now
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-7xl mx-auto px-4 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <span>🏠</span> வீட்டு சாப்பாடு - Home Cooked Food
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Fresh home food,
                <br />
                <span className="text-orange-500">delivered fast</span>
              </h1>
              
              <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-lg">
                Order authentic Tamil home-cooked meals from local home chefs. 
                Like eating at Amma's house, but delivered to you.
              </p>

              {/* Search Bar */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <div className="flex-grow relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Enter delivery address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-full focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>
                <Link
                  to="/menu"
                  className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all"
                >
                  Find Food
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>

              {/* Stats */}
              <div className="mt-10 flex gap-8">
                <div>
                  <p className="text-3xl font-bold text-gray-900">30+</p>
                  <p className="text-gray-500">Home Chefs</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900">2000+</p>
                  <p className="text-gray-500">Orders Delivered</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900">4.8★</p>
                  <p className="text-gray-500">Average Rating</p>
                </div>
              </div>
            </div>

            {/* Right - Hero Image */}
            <div className="relative hidden lg:block">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600"
                  alt="South Indian Thali"
                  className="rounded-3xl shadow-2xl w-full h-[500px] object-cover"
                />
                {/* Floating badge */}
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Clock className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">30-45 min</p>
                    <p className="text-sm text-gray-500">Fast delivery</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">How it works</h2>
            <p className="mt-4 text-lg text-gray-600">Get delicious home food in 3 simple steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Search className="h-10 w-10 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">1. Browse Menu</h3>
              <p className="text-gray-600">Explore dishes from home chefs in your area</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Utensils className="h-10 w-10 text-green-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">2. Freshly Prepared</h3>
              <p className="text-gray-600">Your food is cooked fresh after you order</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Truck className="h-10 w-10 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">3. Fast Delivery</h3>
              <p className="text-gray-600">Hot food delivered in 30-45 minutes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Dishes */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Popular dishes</h2>
              <p className="mt-2 text-lg text-gray-600">Most loved by our customers</p>
            </div>
            <Link to="/menu" className="text-orange-500 font-semibold hover:underline flex items-center gap-1">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Chicken Biryani", price: 249, img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=300", rating: 4.8 },
              { name: "Sambar Rice", price: 129, img: "https://images.unsplash.com/photo-1630383249896-483b7e57b61e?w=300", rating: 4.7 },
              { name: "Curd Rice", price: 99, img: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=300", rating: 4.9 },
              { name: "Paneer Butter Masala", price: 199, img: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=300", rating: 4.6 },
            ].map((dish, i) => (
              <Link to="/menu" key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group">
                <div className="h-40 overflow-hidden">
                  <img src={dish.img} alt={dish.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-gray-900">{dish.name}</h3>
                    <span className="flex items-center gap-1 text-sm bg-green-50 text-green-700 px-2 py-0.5 rounded">
                      <Star className="h-3 w-3 fill-green-600" />{dish.rating}
                    </span>
                  </div>
                  <p className="mt-2 font-bold text-orange-500">₹{dish.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-orange-500">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Hungry? Order now!</h2>
          <p className="text-xl text-orange-100 mb-8">
            Fresh, homemade Tamil food delivered to your doorstep
          </p>
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 bg-white text-orange-500 hover:bg-orange-50 px-8 py-4 rounded-full font-semibold text-lg transition-colors"
          >
            <ShoppingBag className="h-5 w-5" />
            Start Ordering
          </Link>
        </div>
      </section>

      {/* Join Our Community Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900">Join Our Community</h2>
            <p className="mt-4 text-xl text-gray-600">Whether you cook, eat, or deliver - there's a place for you</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Link className="group" to="/menu">
              <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl p-8 text-white hover:shadow-2xl hover:shadow-orange-200 transition-all hover:-translate-y-2">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Order Food</h3>
                <p className="text-orange-100 mb-6">Browse our menu and enjoy delicious homemade meals delivered to your door</p>
                <div className="flex items-center gap-2 font-semibold">
                  Start Ordering <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>
            <Link className="group" to="/cook/dashboard">
              <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-3xl p-8 text-white hover:shadow-2xl hover:shadow-green-200 transition-all hover:-translate-y-2">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                  <ChefHat className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Cook Dashboard</h3>
                <p className="text-green-100 mb-6">Manage your menu, accept orders, and track your cooking business</p>
                <div className="flex items-center gap-2 font-semibold">
                  Go to Dashboard <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>
            <Link className="group" to="/delivery/dashboard">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-500 rounded-3xl p-8 text-white hover:shadow-2xl hover:shadow-blue-200 transition-all hover:-translate-y-2">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                  <Truck className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Delivery Partner</h3>
                <p className="text-blue-100 mb-6">View assigned orders, manage pickups, and complete deliveries</p>
                <div className="flex items-center gap-2 font-semibold">
                  Start Delivering <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🍛</span>
              <span className="text-xl font-bold text-white">
                Veetu<span className="text-orange-500">Saapadu</span>
              </span>
            </div>
            <div className="flex gap-6 text-sm">
              <Link to="/menu" className="hover:text-white">Menu</Link>
              <Link to="/about" className="hover:text-white">About</Link>
              <Link to="/cook/dashboard" className="hover:text-white">Cook Dashboard</Link>
              <Link to="/delivery/dashboard" className="hover:text-white">Delivery</Link>
            </div>
            <p className="text-sm">© 2024 VeetuSaapadu. Made with ❤️</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
