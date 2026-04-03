import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  acceptOrder, 
  rejectOrder, 
  startPreparing, 
  markReady,
  assignDeliveryAgent 
} from '../../store/orderSlice';
import { 
  ChefHat, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Package,
  Truck,
  Phone,
  MapPin,
  AlertCircle
} from 'lucide-react';

const CookOrders = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.orders);
  const [rejectModal, setRejectModal] = useState({ open: false, orderId: null });
  const [rejectReason, setRejectReason] = useState('');
  const [assignModal, setAssignModal] = useState({ open: false, orderId: null });
  const [agentDetails, setAgentDetails] = useState({ name: '', phone: '' });

  // Filter orders for cook view
  const pendingOrders = orders.filter(o => o.cookStatus === 'pending');
  const activeOrders = orders.filter(o => ['accepted', 'preparing'].includes(o.cookStatus));
  const readyOrders = orders.filter(o => o.cookStatus === 'ready' && o.deliveryStatus !== 'delivered');
  const completedOrders = orders.filter(o => o.status === 'delivered' || o.status === 'cancelled');

  const handleAccept = (orderId) => {
    dispatch(acceptOrder(orderId));
  };

  const handleReject = () => {
    if (rejectReason.trim()) {
      dispatch(rejectOrder({ orderId: rejectModal.orderId, reason: rejectReason }));
      setRejectModal({ open: false, orderId: null });
      setRejectReason('');
    }
  };

  const handleStartPreparing = (orderId) => {
    dispatch(startPreparing(orderId));
  };

  const handleMarkReady = (orderId) => {
    dispatch(markReady(orderId));
  };

  const handleAssignAgent = () => {
    if (agentDetails.name && agentDetails.phone) {
      dispatch(assignDeliveryAgent({ 
        orderId: assignModal.orderId, 
        agentName: agentDetails.name,
        agentPhone: agentDetails.phone
      }));
      setAssignModal({ open: false, orderId: null });
      setAgentDetails({ name: '', phone: '' });
    }
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const OrderCard = ({ order, type }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-gray-50 border-b">
        <div>
          <p className="font-bold text-gray-800">{order.id}</p>
          <p className="text-sm text-gray-500">{formatTime(order.createdAt)}</p>
        </div>
        <div className="text-right">
          <p className="font-bold text-orange-500">₹{order.totalAmount}</p>
          <p className="text-sm text-gray-500">{order.items.length} items</p>
        </div>
      </div>

      {/* Items */}
      <div className="p-4">
        <div className="space-y-2 mb-4">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex justify-between text-sm">
              <span className="text-gray-700">{item.quantity}x {item.name}</span>
              <span className="text-gray-500">₹{item.price * item.quantity}</span>
            </div>
          ))}
        </div>

        {/* Customer Info */}
        <div className="border-t pt-4 space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Phone className="h-4 w-4" />
            <span>{order.deliveryAddress?.phone}</span>
          </div>
          <div className="flex items-start gap-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4 mt-0.5" />
            <span className="line-clamp-2">{order.deliveryAddress?.address}</span>
          </div>
        </div>

        {/* Actions based on type */}
        <div className="mt-4 pt-4 border-t">
          {type === 'pending' && (
            <div className="flex gap-3">
              <button
                onClick={() => handleAccept(order.id)}
                className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium transition-colors"
              >
                <CheckCircle className="h-5 w-5" />
                Accept
              </button>
              <button
                onClick={() => setRejectModal({ open: true, orderId: order.id })}
                className="flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-medium transition-colors"
              >
                <XCircle className="h-5 w-5" />
                Reject
              </button>
            </div>
          )}

          {type === 'active' && order.cookStatus === 'accepted' && (
            <button
              onClick={() => handleStartPreparing(order.id)}
              className="w-full flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg font-medium transition-colors"
            >
              <ChefHat className="h-5 w-5" />
              Start Preparing
            </button>
          )}

          {type === 'active' && order.cookStatus === 'preparing' && (
            <button
              onClick={() => handleMarkReady(order.id)}
              className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium transition-colors"
            >
              <Package className="h-5 w-5" />
              Mark as Ready
            </button>
          )}

          {type === 'ready' && order.deliveryStatus === 'unassigned' && (
            <button
              onClick={() => setAssignModal({ open: true, orderId: order.id })}
              className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition-colors"
            >
              <Truck className="h-5 w-5" />
              Assign Delivery Agent
            </button>
          )}

          {type === 'ready' && order.deliveryStatus === 'assigned' && (
            <div className="bg-blue-50 rounded-lg p-3">
              <p className="text-sm text-blue-600 font-medium">Assigned to: {order.deliveryAgent?.name}</p>
              <p className="text-sm text-blue-500">{order.deliveryAgent?.phone}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Order Management</h1>
            <p className="text-gray-500">Manage incoming orders and assign delivery</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-lg font-medium">
              {pendingOrders.length} Pending
            </div>
            <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-medium">
              {activeOrders.length} Active
            </div>
            <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-medium">
              {readyOrders.length} Ready
            </div>
          </div>
        </div>

        {/* Orders Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Pending Orders */}
          <div>
            <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4">
              <AlertCircle className="h-5 w-5 text-yellow-500" />
              New Orders ({pendingOrders.length})
            </h2>
            <div className="space-y-4">
              {pendingOrders.length === 0 ? (
                <div className="bg-white rounded-xl p-8 text-center text-gray-500">
                  No pending orders
                </div>
              ) : (
                pendingOrders.map(order => (
                  <OrderCard key={order.id} order={order} type="pending" />
                ))
              )}
            </div>
          </div>

          {/* Active Orders */}
          <div>
            <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4">
              <Clock className="h-5 w-5 text-blue-500" />
              Preparing ({activeOrders.length})
            </h2>
            <div className="space-y-4">
              {activeOrders.length === 0 ? (
                <div className="bg-white rounded-xl p-8 text-center text-gray-500">
                  No active orders
                </div>
              ) : (
                activeOrders.map(order => (
                  <OrderCard key={order.id} order={order} type="active" />
                ))
              )}
            </div>
          </div>

          {/* Ready for Delivery */}
          <div>
            <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4">
              <Package className="h-5 w-5 text-green-500" />
              Ready for Pickup ({readyOrders.length})
            </h2>
            <div className="space-y-4">
              {readyOrders.length === 0 ? (
                <div className="bg-white rounded-xl p-8 text-center text-gray-500">
                  No orders ready
                </div>
              ) : (
                readyOrders.map(order => (
                  <OrderCard key={order.id} order={order} type="ready" />
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Reject Modal */}
      {rejectModal.open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Reject Order</h3>
            <p className="text-gray-600 mb-4">Please provide a reason for rejection:</p>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="e.g., Ingredients not available, Too busy..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
              rows={3}
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setRejectModal({ open: false, orderId: null })}
                className="flex-1 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                disabled={!rejectReason.trim()}
                className="flex-1 py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 disabled:bg-gray-300 transition-colors"
              >
                Reject Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assign Agent Modal */}
      {assignModal.open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Assign Delivery Agent</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Agent Name</label>
                <input
                  type="text"
                  value={agentDetails.name}
                  onChange={(e) => setAgentDetails(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter agent name"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Agent Phone</label>
                <input
                  type="tel"
                  value={agentDetails.phone}
                  onChange={(e) => setAgentDetails(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="Enter phone number"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setAssignModal({ open: false, orderId: null })}
                className="flex-1 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAssignAgent}
                disabled={!agentDetails.name || !agentDetails.phone}
                className="flex-1 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 disabled:bg-gray-300 transition-colors"
              >
                Assign Agent
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CookOrders;
