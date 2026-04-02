const CategoryFilter = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
            activeCategory === category.id
              ? 'bg-orange-500 text-white shadow-lg shadow-orange-200'
              : 'bg-white text-gray-600 hover:bg-orange-50 border border-gray-200'
          }`}
        >
          <span>{category.icon}</span>
          <span className="font-medium">{category.name}</span>
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
