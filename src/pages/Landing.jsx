import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, ChefHat, Truck, Users, Star, ArrowRight, Search } from 'lucide-react';

const Landing = () => {
  const [address, setAddress] = useState('');

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🍛</span>
            <span className="text-2xl font-bold text-gray-800">
              Veetu<span className="text-orange-500">Saapadu</span>
            </span>
          </div>
          <Link
            to="/menu"
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Order Now
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-red-50" />
        
        <div className="relative max-w-7xl mx-auto px-4 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <p className="text-orange-500 font-semibold mb-2">வீட்டு சாப்பாடு</p>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Home cooked food,
                <span className="text-orange-500"> delivered</span> fresh
              </h1>
              
              <p className="mt-6 text-xl text-gray-600 leading-relaxed">
                Authentic Tamil home-cooked meals made with love by local home chefs.
                Taste the warmth of Amma's cooking delivered to your doorstep.
              </p>

              {/* Address Input */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <div className="flex-grow relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Enter your delivery address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>
                <Link
                  to="/menu"
                  className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:shadow-lg hover:shadow-orange-200"
                >
                  Find Food
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>

              {/* Trust badges */}
              <div className="mt-8 flex flex-wrap gap-6">
                <div className="flex items-center gap-2 text-gray-600">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Clock className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="font-medium">30-45 min delivery</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Star className="h-5 w-5 text-yellow-600" />
                  </div>
                  <span className="font-medium">4.8★ Average rating</span>
                </div>
              </div>
            </div>

            {/* Right - Hero Image */}
            <div className="relative">
              <div className="relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600"
                  alt="Delicious homemade food"
                  className="rounded-3xl shadow-2xl w-full object-cover"
                />
              </div>
              {/* Floating cards */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 z-20">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <ChefHat className="h-6 w-6 text-orange-500" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">50+</p>
                    <p className="text-sm text-gray-500">Home Chefs</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 z-20">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">2000+</p>
                    <p className="text-sm text-gray-500">Happy Customers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900">How HomeBites Works</h2>
            <p className="mt-4 text-xl text-gray-600">Get delicious homemade food in 3 simple steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                icon: Search,
                title: "Browse Menu",
                description: "Explore our diverse menu of authentic homemade dishes prepared by local home chefs"
              },
              {
                step: "2",
                icon: ChefHat,
                title: "Chef Prepares",
                description: "Your chosen home chef accepts and freshly prepares your order with love"
              },
              {
                step: "3",
                icon: Truck,
                title: "Fast Delivery",
                description: "Hot, fresh food delivered to your doorstep in 30-45 minutes"
              }
            ].map((item, index) => (
              <div key={index} className="relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow">
                <div className="absolute -top-4 left-8 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                  {item.step}
                </div>
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6">
                  <item.icon className="h-8 w-8 text-orange-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Role Selection */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900">Join Our Community</h2>
            <p className="mt-4 text-xl text-gray-600">Whether you cook, eat, or deliver - there's a place for you</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Customer Card */}
            <Link to="/menu" className="group">
              <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl p-8 text-white hover:shadow-2xl hover:shadow-orange-200 transition-all hover:-translate-y-2">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Order Food</h3>
                <p className="text-orange-100 mb-6">
                  Browse our menu and enjoy delicious homemade meals delivered to your door
                </p>
                <div className="flex items-center gap-2 font-semibold">
                  Start Ordering <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Cook Card */}
            <Link to="/cook/dashboard" className="group">
              <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-3xl p-8 text-white hover:shadow-2xl hover:shadow-green-200 transition-all hover:-translate-y-2">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                  <ChefHat className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Cook Dashboard</h3>
                <p className="text-green-100 mb-6">
                  Manage your menu, accept orders, and track your cooking business
                </p>
                <div className="flex items-center gap-2 font-semibold">
                  Go to Dashboard <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Delivery Card */}
            <Link to="/delivery/dashboard" className="group">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-500 rounded-3xl p-8 text-white hover:shadow-2xl hover:shadow-blue-200 transition-all hover:-translate-y-2">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                  <Truck className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Delivery Partner</h3>
                <p className="text-blue-100 mb-6">
                  View assigned orders, manage pickups, and complete deliveries
                </p>
                <div className="flex items-center gap-2 font-semibold">
                  Start Delivering <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl lg:text-5xl font-bold text-orange-400">50+</div>
              <div className="mt-2 text-gray-400">Home Chefs</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold text-orange-400">2000+</div>
              <div className="mt-2 text-gray-400">Orders Delivered</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold text-orange-400">4.8</div>
              <div className="mt-2 text-gray-400">Average Rating</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold text-orange-400">30min</div>
              <div className="mt-2 text-gray-400">Avg Delivery</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to taste the difference?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Order now and experience authentic home-cooked meals made with love
          </p>
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:shadow-lg"
          >
            <ChefHat className="h-6 w-6" />
            Browse Menu
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;
