import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addMenuItem, updateMenuItem, deleteMenuItem, toggleAvailability } from '../../store/menuSlice';
import { Plus, Edit2, Trash2, Eye, EyeOff, X, Save, ChefHat } from 'lucide-react';
import { categories } from '../../data/menuData';

const CookMenu = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.menu);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'main-course',
    image: '',
    isVeg: true,
    preparationTime: 30,
    isAvailable: true,
  });

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      category: 'main-course',
      image: '',
      isVeg: true,
      preparationTime: 30,
      isAvailable: true,
    });
    setEditingItem(null);
  };

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        name: item.name,
        description: item.description,
        price: item.price.toString(),
        category: item.category,
        image: item.image,
        isVeg: item.isVeg,
        preparationTime: item.preparationTime,
        isAvailable: item.isAvailable,
      });
    } else {
      resetForm();
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const itemData = {
      ...formData,
      price: parseInt(formData.price),
      preparationTime: parseInt(formData.preparationTime),
    };

    if (editingItem) {
      dispatch(updateMenuItem({ id: editingItem.id, ...itemData }));
    } else {
      dispatch(addMenuItem(itemData));
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      dispatch(deleteMenuItem(id));
    }
  };

  const handleToggleAvailability = (id) => {
    dispatch(toggleAvailability(id));
  };

  const availableItems = items.filter(item => item.isAvailable);
  const unavailableItems = items.filter(item => !item.isAvailable);

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Menu Management</h1>
            <p className="text-gray-500">Add, edit, or remove items from your menu</p>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-medium transition-colors"
          >
            <Plus className="h-5 w-5" />
            Add New Item
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-3xl font-bold text-gray-800">{items.length}</p>
            <p className="text-gray-500">Total Items</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-3xl font-bold text-green-600">{availableItems.length}</p>
            <p className="text-gray-500">Available</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-3xl font-bold text-red-500">{unavailableItems.length}</p>
            <p className="text-gray-500">Unavailable</p>
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className={`bg-white rounded-xl shadow-sm overflow-hidden ${
                !item.isAvailable ? 'opacity-60' : ''
              }`}
            >
              <div className="relative h-40">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  {item.isVeg ? (
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">Veg</span>
                  ) : (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">Non-Veg</span>
                  )}
                </div>
                {!item.isAvailable && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium">
                      Unavailable
                    </span>
                  </div>
                )}
              </div>

              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-800 line-clamp-1">{item.name}</h3>
                  <span className="font-bold text-orange-500">₹{item.price}</span>
                </div>
                <p className="text-sm text-gray-500 line-clamp-2 mb-4">{item.description}</p>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleToggleAvailability(item.id)}
                    className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                      item.isAvailable
                        ? 'bg-red-50 text-red-600 hover:bg-red-100'
                        : 'bg-green-50 text-green-600 hover:bg-green-100'
                    }`}
                  >
                    {item.isAvailable ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    {item.isAvailable ? 'Hide' : 'Show'}
                  </button>
                  <button
                    onClick={() => handleOpenModal(item)}
                    className="flex-1 flex items-center justify-center gap-1 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-sm font-medium transition-colors"
                  >
                    <Edit2 className="h-4 w-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 bg-gray-50 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {items.length === 0 && (
          <div className="text-center py-16">
            <ChefHat className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-600 mb-2">No menu items yet</h3>
            <p className="text-gray-500 mb-6">Start adding dishes to your menu</p>
            <button
              onClick={() => handleOpenModal()}
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-medium transition-colors"
            >
              <Plus className="h-5 w-5" />
              Add First Item
            </button>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-bold text-gray-800">
                {editingItem ? 'Edit Item' : 'Add New Item'}
              </h3>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600">
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Item Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Chicken Biryani"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your dish..."
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹) *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="149"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prep Time (mins)</label>
                  <input
                    type="number"
                    min="5"
                    value={formData.preparationTime}
                    onChange={(e) => setFormData({ ...formData, preparationTime: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  {categories.filter(c => c.id !== 'all').map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isVeg}
                    onChange={(e) => setFormData({ ...formData, isVeg: e.target.checked })}
                    className="w-5 h-5 text-green-500 rounded focus:ring-green-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Vegetarian</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isAvailable}
                    onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                    className="w-5 h-5 text-orange-500 rounded focus:ring-orange-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Available</span>
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
                >
                  <Save className="h-5 w-5" />
                  {editingItem ? 'Update Item' : 'Add Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CookMenu;
