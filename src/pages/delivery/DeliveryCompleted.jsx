import { useSelector } from 'react-redux';
import { CheckCircle, Package, IndianRupee, Clock } from 'lucide-react';

const DeliveryCompleted = () => {
  const { orders } = useSelector((state) => state.orders);

  // Filter completed deliveries
  const completedOrders = orders.filter(
    o => o.deliveryAgent && o.deliveryStatus === 'delivered'
  );

  const totalEarnings = completedOrders.length * 30; // ₹30 per delivery

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-800">{completedOrders.length}</p>
              <p className="text-sm text-gray-500">Deliveries Completed</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <IndianRupee className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-800">₹{totalEarnings}</p>
              <p className="text-sm text-gray-500">Total Earnings</p>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-bold text-gray-800 mb-4">Delivery History</h2>

      {completedOrders.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center">
          <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-600 mb-2">No completed deliveries</h3>
          <p className="text-gray-500">Your completed deliveries will appear here</p>
        </div>
      ) : (
        <div className="space-y-3">
          {completedOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{order.id}</p>
                  <p className="text-sm text-gray-500">{order.deliveryAddress?.name}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-green-600">+₹30</p>
                <p className="text-sm text-gray-500">{formatDate(order.deliveredAt)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DeliveryCompleted;
