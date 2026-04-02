import { Package, Clock, Truck, CheckCircle, XCircle } from 'lucide-react';

const statusConfig = {
  confirmed: { icon: Package, color: 'text-blue-500', bg: 'bg-blue-50', label: 'Order Confirmed' },
  preparing: { icon: Clock, color: 'text-yellow-500', bg: 'bg-yellow-50', label: 'Preparing' },
  'out-for-delivery': { icon: Truck, color: 'text-purple-500', bg: 'bg-purple-50', label: 'Out for Delivery' },
  delivered: { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50', label: 'Delivered' },
  cancelled: { icon: XCircle, color: 'text-red-500', bg: 'bg-red-50', label: 'Cancelled' },
};

const OrderCard = ({ order }) => {
  const status = statusConfig[order.status] || statusConfig.confirmed;
  const StatusIcon = status.icon;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-100">
        <div>
          <p className="text-sm text-gray-500">Order ID</p>
          <p className="font-semibold text-gray-800">{order.id}</p>
        </div>
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${status.bg}`}>
          <StatusIcon className={`h-4 w-4 ${status.color}`} />
          <span className={`text-sm font-medium ${status.color}`}>{status.label}</span>
        </div>
      </div>

      {/* Items */}
      <div className="p-4">
        <div className="space-y-3">
          {order.items.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 object-cover rounded-lg"
              />
              <div className="flex-grow">
                <p className="font-medium text-gray-800">{item.name}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
              <p className="font-medium text-gray-800">₹{item.price * item.quantity}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center p-4 bg-gray-50">
        <div>
          <p className="text-sm text-gray-500">Ordered on</p>
          <p className="text-sm font-medium text-gray-700">{formatDate(order.createdAt)}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Total Amount</p>
          <p className="text-lg font-bold text-orange-500">₹{order.totalAmount}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
