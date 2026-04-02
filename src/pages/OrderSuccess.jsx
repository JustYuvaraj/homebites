import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateOrderStatus, clearCurrentOrder } from '../store/orderSlice';
import { CheckCircle, Package, Clock, Truck, MapPin, Phone } from 'lucide-react';

const OrderSuccess = () => {
  const dispatch = useDispatch();
  const { currentOrder } = useSelector((state) => state.orders);
  const [currentStatus, setCurrentStatus] = useState(0);

  const statuses = [
    { id: 'confirmed', label: 'Order Confirmed', icon: CheckCircle },
    { id: 'preparing', label: 'Preparing', icon: Package },
    { id: 'out-for-delivery', label: 'Out for Delivery', icon: Truck },
    { id: 'delivered', label: 'Delivered', icon: CheckCircle },
  ];

  // Simulate order status updates
  useEffect(() => {
    if (!currentOrder) return;

    const timers = [
      setTimeout(() => {
        setCurrentStatus(1);
        dispatch(updateOrderStatus({ orderId: currentOrder.id, status: 'preparing' }));
      }, 5000),
      setTimeout(() => {
        setCurrentStatus(2);
        dispatch(updateOrderStatus({ orderId: currentOrder.id, status: 'out-for-delivery' }));
      }, 10000),
      setTimeout(() => {
        setCurrentStatus(3);
        dispatch(updateOrderStatus({ orderId: currentOrder.id, status: 'delivered' }));
      }, 15000),
    ];

    return () => timers.forEach(clearTimeout);
  }, [currentOrder, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(clearCurrentOrder());
    };
  }, [dispatch]);

  if (!currentOrder) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No active order</h2>
          <Link
            to="/"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-medium transition-colors"
          >
            Browse Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-10 w-10 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Order Placed Successfully!</h1>
          <p className="text-gray-500">Order ID: {currentOrder.id}</p>
        </div>

        {/* Order Tracking */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Order Status</h3>
          
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />
            <div 
              className="absolute left-6 top-0 w-0.5 bg-orange-500 transition-all duration-500"
              style={{ height: `${(currentStatus / (statuses.length - 1)) * 100}%` }}
            />

            {/* Status Steps */}
            <div className="space-y-6">
              {statuses.map((status, index) => {
                const Icon = status.icon;
                const isCompleted = index <= currentStatus;
                const isCurrent = index === currentStatus;

                return (
                  <div key={status.id} className="flex items-center gap-4 relative">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center z-10 transition-colors ${
                      isCompleted ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-400'
                    } ${isCurrent ? 'ring-4 ring-orange-200' : ''}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className={`font-medium ${isCompleted ? 'text-gray-800' : 'text-gray-400'}`}>
                        {status.label}
                      </p>
                      {isCurrent && (
                        <p className="text-sm text-orange-500 flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          In progress...
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Delivery Info */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Delivery Details</h3>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-orange-500 mt-0.5" />
              <div>
                <p className="font-medium text-gray-800">{currentOrder.deliveryAddress.name}</p>
                <p className="text-gray-500 text-sm">{currentOrder.deliveryAddress.address}</p>
                {currentOrder.deliveryAddress.landmark && (
                  <p className="text-gray-400 text-sm">Landmark: {currentOrder.deliveryAddress.landmark}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-orange-500" />
              <p className="text-gray-600">{currentOrder.deliveryAddress.phone}</p>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Items</h3>
          
          <div className="space-y-3">
            {currentOrder.items.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-grow">
                  <p className="font-medium text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p className="font-medium text-gray-800">₹{item.price * item.quantity}</p>
              </div>
            ))}
          </div>

          <div className="border-t mt-4 pt-4">
            <div className="flex justify-between text-lg font-bold text-gray-800">
              <span>Total Paid</span>
              <span className="text-orange-500">₹{currentOrder.totalAmount}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Link
            to="/orders"
            className="flex-1 text-center bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-xl font-medium transition-colors"
          >
            View All Orders
          </Link>
          <Link
            to="/"
            className="flex-1 text-center bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-medium transition-colors"
          >
            Order More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
