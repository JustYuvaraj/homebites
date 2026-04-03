import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Search, MapPin, Clock, Star, Filter, X } from 'lucide-react';
import MenuCard from '../components/MenuCard';
import CategoryFilter from '../components/CategoryFilter';
import { categories } from '../data/menuData';

const Home = () => {
  const { items: menuItems } = useSelector((state) => state.menu);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [vegOnly, setVegOnly] = useState(false);
  const [sortBy, setSortBy] = useState('default');

  const filteredItems = useMemo(() => {
    let items = menuItems.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesVeg = !vegOnly || item.isVeg;
      const isAvailable = item.isAvailable;
      return matchesSearch && matchesCategory && matchesVeg && isAvailable;
    });

    // Sort
    if (sortBy === 'price-low') {
      items = [...items].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      items = [...items].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      items = [...items].sort((a, b) => b.rating - a.rating);
    }

    return items;
  }, [menuItems, searchQuery, activeCategory, vegOnly, sortBy]);

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
              Fresh, homemade food delivered in 30-45 minutes
            </p>
            
            {/* Info badges */}
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                <Clock className="h-4 w-4" />
                <span>30-45 min</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                <Star className="h-4 w-4 fill-white" />
                <span>4.8 rating</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                <MapPin className="h-4 w-4" />
                <span>Free delivery over ₹500</span>
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

      {/* Menu Section */}
      <section className="max-w-7xl mx-auto px-4 py-8">
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
            <p className="text-gray-500 mb-6">Try adjusting your filters or search terms</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
                setVegOnly(false);
                setSortBy('default');
              }}
              className="text-orange-500 font-medium hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
