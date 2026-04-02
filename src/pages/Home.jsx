import { useState, useMemo } from 'react';
import { Search, MapPin, Clock, Star } from 'lucide-react';
import MenuCard from '../components/MenuCard';
import CategoryFilter from '../components/CategoryFilter';
import { menuItems, categories } from '../data/menuData';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [vegOnly, setVegOnly] = useState(false);

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesVeg = !vegOnly || item.isVeg;
      return matchesSearch && matchesCategory && matchesVeg;
    });
  }, [searchQuery, activeCategory, vegOnly]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-500 to-orange-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Homemade Food,<br />
              <span className="text-orange-200">Delivered Fresh</span>
            </h1>
            <p className="text-orange-100 text-lg mb-6">
              Authentic home-cooked meals made with love. Order now and taste the difference.
            </p>
            
            {/* Info badges */}
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <Clock className="h-5 w-5" />
                <span>30-45 min delivery</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <Star className="h-5 w-5 fill-white" />
                <span>4.8 rating</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <MapPin className="h-5 w-5" />
                <span>Bangalore</span>
              </div>
            </div>

            {/* Search bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-300 shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex-grow overflow-hidden">
            <CategoryFilter
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>
          
          {/* Veg Toggle */}
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-200">
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
                className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  vegOnly ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Menu Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No dishes found matching your criteria</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
                setVegOnly(false);
              }}
              className="mt-4 text-orange-500 font-medium hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
