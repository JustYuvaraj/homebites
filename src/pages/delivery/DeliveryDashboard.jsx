import { Link, Outlet, useLocation } from 'react-router-dom';
import { Truck, Package, CheckCircle, MapPin } from 'lucide-react';

const DeliveryDashboard = () => {
  const location = useLocation();

  const navItems = [
    { path: '/delivery/dashboard', icon: Package, label: 'Assigned Orders', exact: true },
    { path: '/delivery/dashboard/completed', icon: CheckCircle, label: 'Completed' },
  ];

  const isActive = (path, exact = false) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
              <Truck className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-gray-800">Delivery Dashboard</h1>
              <p className="text-sm text-gray-500">Manage your deliveries</p>
            </div>
          </div>
          <Link to="/" className="text-gray-600 hover:text-orange-500 font-medium">
            Back to Home
          </Link>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors border-b-2 -mb-px ${
                  isActive(item.path, item.exact)
                    ? 'text-blue-500 border-blue-500'
                    : 'text-gray-600 border-transparent hover:text-gray-800'
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <Outlet />
    </div>
  );
};

export default DeliveryDashboard;
