import { useState, useMemo, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Search, MapPin, Clock, Star, Filter, X, ChefHat, Navigation, Loader2 } from 'lucide-react';
import MenuCard from '../components/MenuCard';
import CategoryFilter from '../components/CategoryFilter';
import { CooksMap, LocationPicker } from '../components/map';
import { cooksAPI, menuAPI } from '../services/api';
import { setItems } from '../store/menuSlice';

const Home = () => {
  const dispatch = useDispatch();
  const { items: menuItems } = useSelector((state) => state.menu);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [vegOnly, setVegOnly] = useState(false);
  const [sortBy, setSortBy] = useState('default');
  
  // Location state
  const [userLocation, setUserLocation] = useState(null);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [locationName, setLocationName] = useState('');
  const [cooks, setCooks] = useState([]);
  const [selectedCook, setSelectedCook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Categories from fetched data
  const categories = useMemo(() => {
    const cats = new Set(menuItems.map(item => item.category).filter(Boolean));
    return [
      { id: 'all', name: 'All', emoji: '🍽️' },
      ...Array.from(cats).map(cat => ({
        id: cat,
        name: cat,
        emoji: getCategoryEmoji(cat)
      }))
    ];
  }, [menuItems]);

  // Fetch menu items from API
  const fetchMenu = useCallback(async (lat, lng) => {
    try {
      setLoading(true);
      setError(null);
      
      let menuData;
      let cooksData;
      
      if (lat && lng) {
        // Fetch cooks and menu for this location
        const [cooksRes, menuRes] = await Promise.all([
          cooksAPI.getCooksNearLocation(lat, lng).catch(() => ({ data: [] })),
          cooksAPI.getMenuNearLocation(lat, lng).catch(() => ({ data: [] }))
        ]);
        cooksData = cooksRes.data || [];
        menuData = menuRes.data || [];
      } else {
        // Fetch all menu items
        const res = await menuAPI.getAll().catch(() => ({ data: [] }));
        menuData = res.data || [];
        cooksData = [];
      }
      
      setCooks(cooksData);
      dispatch(setItems(menuData));
      
      if (menuData.length === 0 && lat && lng) {
        setError('No cooks deliver to your location. Try a different area.');
      }
    } catch (err) {
      console.error('Error fetching menu:', err);
      setError('Failed to load menu. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  // Initial load - try to get user location
  useEffect(() => {
    const savedLocation = localStorage.getItem('userLocation');
    if (savedLocation) {
      const loc = JSON.parse(savedLocation);
      setUserLocation(loc);
      setLocationName(loc.name || 'Saved Location');
      fetchMenu(loc.lat, loc.lng);
    } else {
      // Try to get current location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (pos) => {
            const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
            setUserLocation(loc);
            // Reverse geocode for location name
            try {
              const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${loc.lat}&lon=${loc.lng}`
              );
              const data = await response.json();
              const name = data.address?.suburb || data.address?.neighbourhood || data.address?.city || 'Current Location';
              setLocationName(name);
              localStorage.setItem('userLocation', JSON.stringify({ ...loc, name }));
            } catch {
              setLocationName('Current Location');
            }
            fetchMenu(loc.lat, loc.lng);
          },
          () => {
            // Location denied - show all menu items
            fetchMenu(null, null);
          }
        );
      } else {
        fetchMenu(null, null);
      }
    }
  }, [fetchMenu]);

  const handleLocationSelect = async (loc) => {
    setUserLocation(loc);
    setShowLocationPicker(false);
    
    // Reverse geocode
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${loc.lat}&lon=${loc.lng}`
      );
      const data = await response.json();
      const name = data.address?.suburb || data.address?.neighbourhood || data.address?.city || 'Selected Location';
      setLocationName(name);
      localStorage.setItem('userLocation', JSON.stringify({ ...loc, name }));
    } catch {
      setLocationName('Selected Location');
    }
    
    fetchMenu(loc.lat, loc.lng);
  };

  const handleCookSelect = (cook) => {
    setSelectedCook(cook);
    // Filter menu to this cook's items
    if (cook) {
      setActiveCategory('all');
      setSearchQuery('');
    }
  };

  const filteredItems = useMemo(() => {
    let items = menuItems.filter((item) => {
      const matchesSearch = item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesVeg = !vegOnly || item.isVeg;
      const matchesCook = !selectedCook || item.cookId === selectedCook.id;
      const isAvailable = item.isAvailable !== false;
      return matchesSearch && matchesCategory && matchesVeg && matchesCook && isAvailable;
    });

    // Sort
    if (sortBy === 'price-low') {
      items = [...items].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      items = [...items].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      items = [...items].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return items;
  }, [menuItems, searchQuery, activeCategory, vegOnly, sortBy, selectedCook]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-500 via-orange-500 to-red-500 text-white py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-3xl lg:text-5xl font-bold mb-4">
              What are you craving today?
            </h1>
            <p className="text-orange-100 text-lg mb-6">
              Fresh, homemade food from local home cooks, delivered to your door
            </p>
            
            {/* Location Bar */}
            <button
              onClick={() => setShowLocationPicker(true)}
              className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-3 rounded-lg text-left w-full sm:w-auto hover:bg-white/30 transition-colors mb-6"
            >
              <MapPin className="h-5 w-5 text-white" />
              <div>
                <p className="text-xs text-orange-200">Delivering to</p>
                <p className="font-medium">{locationName || 'Select your location'}</p>
              </div>
              <Navigation className="h-4 w-4 ml-2" />
            </button>
            
            {/* Info badges */}
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                <Clock className="h-4 w-4" />
                <span>30-45 min</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                <ChefHat className="h-4 w-4" />
                <span>{cooks.length} cooks nearby</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                <Star className="h-4 w-4 fill-white" />
                <span>4.8 avg rating</span>
              </div>
            </div>

            {/* Search bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for biryani, paneer, desserts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-orange-300 shadow-lg"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Location Picker Modal */}
      {showLocationPicker && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Select Delivery Location</h2>
              <button
                onClick={() => setShowLocationPicker(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <LocationPicker
              initialPosition={userLocation ? [userLocation.lat, userLocation.lng] : null}
              onLocationSelect={handleLocationSelect}
              height="350px"
            />
            <p className="text-sm text-gray-500 mt-4">
              We'll show you home cooks that deliver to this location
            </p>
          </div>
        </div>
      )}

      {/* Cooks Map Section (if location selected) */}
      {userLocation && cooks.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-6">
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <ChefHat className="h-5 w-5 text-orange-500" />
                Home Cooks Near You
              </h2>
              <p className="text-sm text-gray-500">Click on a cook to see their menu</p>
            </div>
            <CooksMap
              userLocation={userLocation}
              cooks={cooks}
              selectedCook={selectedCook}
              onCookSelect={handleCookSelect}
              height="300px"
            />
            
            {/* Cook chips */}
            <div className="p-4 flex gap-2 flex-wrap">
              <button
                onClick={() => setSelectedCook(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  !selectedCook ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Cooks
              </button>
              {cooks.map(cook => (
                <button
                  key={cook.id}
                  onClick={() => handleCookSelect(cook)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                    selectedCook?.id === cook.id ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cook.kitchenName || cook.name}
                  <span className="text-xs opacity-75">★ {cook.rating?.toFixed(1) || 'New'}</span>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Menu Section */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-700">
            <p>{error}</p>
            <button
              onClick={() => setShowLocationPicker(true)}
              className="mt-2 text-sm font-medium text-amber-800 hover:underline"
            >
              Change location →
            </button>
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-10 w-10 text-orange-500 animate-spin mb-4" />
            <p className="text-gray-500">Finding home cooks near you...</p>
          </div>
        ) : (
          <>
            {/* Filters Row */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
              {/* Categories */}
              <div className="flex-grow overflow-x-auto pb-2">
                <CategoryFilter
                  categories={categories}
                  activeCategory={activeCategory}
                  onCategoryChange={setActiveCategory}
                />
              </div>
              
              {/* Right side filters */}
              <div className="flex items-center gap-4">
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="default">Sort by</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Rating</option>
                </select>

                {/* Veg Toggle */}
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200">
                  <span className={`text-sm font-medium ${vegOnly ? 'text-green-600' : 'text-gray-500'}`}>
                    Veg Only
                  </span>
                  <button
                    onClick={() => setVegOnly(!vegOnly)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      vegOnly ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform shadow ${
                        vegOnly ? 'translate-x-7' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Results count */}
            <p className="text-gray-600 mb-6">
              Showing <span className="font-semibold">{filteredItems.length}</span> dishes
              {selectedCook && (
                <span> from <span className="font-semibold">{selectedCook.kitchenName || selectedCook.name}</span></span>
              )}
              {activeCategory !== 'all' && (
                <span> in <span className="font-semibold">{categories.find(c => c.id === activeCategory)?.name}</span></span>
              )}
            </p>

            {/* Menu Grid */}
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredItems.map((item) => (
                  <MenuCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl">
                <Filter className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-600 mb-2">No dishes found</h3>
                <p className="text-gray-500 mb-6">
                  {!userLocation 
                    ? 'Select your location to see available home cooks'
                    : 'Try adjusting your filters or search terms'}
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  {!userLocation && (
                    <button
                      onClick={() => setShowLocationPicker(true)}
                      className="bg-orange-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-600"
                    >
                      Select Location
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setActiveCategory('all');
                      setVegOnly(false);
                      setSortBy('default');
                      setSelectedCook(null);
                    }}
                    className="text-orange-500 font-medium hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

// Helper function
function getCategoryEmoji(category) {
  const emojiMap = {
    'South Indian': '🥘',
    'North Indian': '🍛',
    'Biryani': '🍚',
    'Chinese': '🥡',
    'Desserts': '🍰',
    'Snacks': '🍟',
    'Beverages': '🥤',
    'Breakfast': '🍳',
    'Rice': '🍚',
    'Roti': '🫓',
    'Curry': '🍛',
  };
  return emojiMap[category] || '🍽️';
}

export default Home;
