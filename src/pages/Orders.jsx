import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import OrderCard from '../components/OrderCard';
import { Package, ArrowRight } from 'lucide-react';

const Orders = () => {
  const { orders } = useSelector((state) => state.orders);

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <Package className="h-24 w-24 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No orders yet</h2>
          <p className="text-gray-500 mb-6">Start exploring our delicious menu!</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-medium transition-colors"
          >
            Browse Menu
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">My Orders</h1>
        
        <div className="space-y-4">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
