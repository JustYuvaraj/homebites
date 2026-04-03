import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Package, Clock, CheckCircle, XCircle, TrendingUp, IndianRupee } from 'lucide-react';

const CookOverview = () => {
  const { orders } = useSelector((state) => state.orders);
  const { items } = useSelector((state) => state.menu);

  const stats = {
    pending: orders.filter(o => o.cookStatus === 'pending').length,
    preparing: orders.filter(o => ['accepted', 'preparing'].includes(o.cookStatus)).length,
    completed: orders.filter(o => o.status === 'delivered').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
    totalRevenue: orders.filter(o => o.status === 'delivered').reduce((sum, o) => sum + o.totalAmount, 0),
    activeMenuItems: items.filter(i => i.isAvailable).length,
  };

  const recentOrders = orders.slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-800">{stats.pending}</p>
              <p className="text-sm text-gray-500">Pending Orders</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-800">{stats.preparing}</p>
              <p className="text-sm text-gray-500">Being Prepared</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-800">{stats.completed}</p>
              <p className="text-sm text-gray-500">Completed</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <IndianRupee className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-800">₹{stats.totalRevenue}</p>
              <p className="text-sm text-gray-500">Total Revenue</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link
              to="/cook/dashboard/orders"
              className="flex flex-col items-center gap-2 p-4 bg-yellow-50 rounded-xl hover:bg-yellow-100 transition-colors"
            >
              <Clock className="h-8 w-8 text-yellow-600" />
              <span className="font-medium text-gray-700">View Orders</span>
              {stats.pending > 0 && (
                <span className="text-sm text-yellow-600">{stats.pending} pending</span>
              )}
            </Link>
            <Link
              to="/cook/dashboard/menu"
              className="flex flex-col items-center gap-2 p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors"
            >
              <TrendingUp className="h-8 w-8 text-green-600" />
              <span className="font-medium text-gray-700">Manage Menu</span>
              <span className="text-sm text-green-600">{stats.activeMenuItems} active items</span>
            </Link>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">Recent Orders</h2>
            <Link to="/cook/dashboard/orders" className="text-orange-500 hover:underline text-sm font-medium">
              View All
            </Link>
          </div>
          
          {recentOrders.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No orders yet</p>
          ) : (
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">{order.id}</p>
                    <p className="text-sm text-gray-500">{order.items.length} items</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-orange-500">₹{order.totalAmount}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      order.status === 'preparing' ? 'bg-blue-100 text-blue-700' :
                      order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CookOverview;
