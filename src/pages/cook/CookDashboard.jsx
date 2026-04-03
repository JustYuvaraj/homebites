import { Link, Outlet, useLocation } from 'react-router-dom';
import { ChefHat, ClipboardList, UtensilsCrossed, BarChart3, Settings } from 'lucide-react';

const CookDashboard = () => {
  const location = useLocation();

  const navItems = [
    { path: '/cook/dashboard', icon: BarChart3, label: 'Overview', exact: true },
    { path: '/cook/dashboard/orders', icon: ClipboardList, label: 'Orders' },
    { path: '/cook/dashboard/menu', icon: UtensilsCrossed, label: 'Menu' },
  ];

  const isActive = (path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
              <ChefHat className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-gray-800">Cook Dashboard</h1>
              <p className="text-sm text-gray-500">Manage your kitchen</p>
            </div>
          </div>
          <Link
            to="/"
            className="text-gray-600 hover:text-orange-500 font-medium"
          >
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
                    ? 'text-orange-500 border-orange-500'
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

export default CookDashboard;
