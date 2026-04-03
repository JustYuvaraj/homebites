import { useSelector, useDispatch } from 'react-redux';
import { pickupOrder, deliverOrder } from '../../store/orderSlice';
import { Package, MapPin, Phone, Navigation, CheckCircle, Clock, User } from 'lucide-react';

const DeliveryOrders = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.orders);

  // Filter orders assigned to delivery (has delivery agent and not delivered)
  const assignedOrders = orders.filter(
    o => o.deliveryAgent && o.deliveryStatus !== 'delivered' && o.status !== 'cancelled'
  );

  const handlePickup = (orderId) => {
    dispatch(pickupOrder(orderId));
  };

  const handleDeliver = (orderId) => {
    dispatch(deliverOrder(orderId));
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadge = (order) => {
    if (order.deliveryStatus === 'picked') {
      return { text: 'Out for Delivery', color: 'bg-purple-100 text-purple-700' };
    }
    if (order.cookStatus === 'ready') {
      return { text: 'Ready for Pickup', color: 'bg-green-100 text-green-700' };
    }
    return { text: 'Preparing', color: 'bg-yellow-100 text-yellow-700' };
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Assigned Orders</h1>
        <p className="text-gray-500">Orders assigned to you for delivery</p>
      </div>

      {assignedOrders.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center">
          <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-600 mb-2">No assigned orders</h3>
          <p className="text-gray-500">Orders will appear here when assigned to you</p>
        </div>
      ) : (
        <div className="space-y-4">
          {assignedOrders.map((order) => {
            const status = getStatusBadge(order);
            
            return (
              <div key={order.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                {/* Header */}
                <div className="flex justify-between items-center p-4 bg-gray-50 border-b">
                  <div>
                    <p className="font-bold text-gray-800">{order.id}</p>
                    <p className="text-sm text-gray-500">Ordered at {formatTime(order.createdAt)}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${status.color}`}>
                    {status.text}
                  </span>
                </div>

                {/* Content */}
                <div className="p-4">
                  {/* Customer Info */}
                  <div className="flex items-start gap-4 mb-4 pb-4 border-b">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-orange-500" />
                    </div>
                    <div className="flex-grow">
                      <p className="font-semibold text-gray-800">{order.deliveryAddress?.name}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                        <Phone className="h-4 w-4" />
                        <a href={`tel:${order.deliveryAddress?.phone}`} className="text-blue-500">
                          {order.deliveryAddress?.phone}
                        </a>
                      </div>
                    </div>
                    <p className="text-xl font-bold text-orange-500">₹{order.totalAmount}</p>
                  </div>

                  {/* Delivery Address */}
                  <div className="flex items-start gap-3 mb-4">
                    <MapPin className="h-5 w-5 text-red-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-800">Delivery Address</p>
                      <p className="text-gray-600">{order.deliveryAddress?.address}</p>
                      {order.deliveryAddress?.landmark && (
                        <p className="text-sm text-gray-500">Landmark: {order.deliveryAddress?.landmark}</p>
                      )}
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <p className="font-medium text-gray-700 mb-2">Order Items ({order.items.length})</p>
                    <div className="space-y-1">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span className="text-gray-600">{item.quantity}x {item.name}</span>
                          <span className="text-gray-500">₹{item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    {order.deliveryStatus === 'assigned' && order.cookStatus === 'ready' && (
                      <button
                        onClick={() => handlePickup(order.id)}
                        className="flex-1 flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-xl font-medium transition-colors"
                      >
                        <Package className="h-5 w-5" />
                        Mark as Picked Up
                      </button>
                    )}

                    {order.deliveryStatus === 'assigned' && order.cookStatus !== 'ready' && (
                      <div className="flex-1 flex items-center justify-center gap-2 bg-yellow-100 text-yellow-700 py-3 rounded-xl font-medium">
                        <Clock className="h-5 w-5" />
                        Waiting for food to be ready
                      </div>
                    )}

                    {order.deliveryStatus === 'picked' && (
                      <button
                        onClick={() => handleDeliver(order.id)}
                        className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-medium transition-colors"
                      >
                        <CheckCircle className="h-5 w-5" />
                        Mark as Delivered
                      </button>
                    )}

                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(order.deliveryAddress?.address || '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-medium transition-colors"
                    >
                      <Navigation className="h-5 w-5" />
                      Navigate
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DeliveryOrders;
