import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Auth Pages
import Auth from './pages/Auth';

// Customer Pages
import Landing from './pages/Landing';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Orders from './pages/Orders';
import About from './pages/About';

// Cook Pages
import CookDashboard from './pages/cook/CookDashboard';
import CookOverview from './pages/cook/CookOverview';
import CookOrders from './pages/cook/CookOrders';
import CookMenu from './pages/cook/CookMenu';

// Delivery Pages
import DeliveryDashboard from './pages/delivery/DeliveryDashboard';
import DeliveryOrders from './pages/delivery/DeliveryOrders';
import DeliveryCompleted from './pages/delivery/DeliveryCompleted';

// Layout wrapper for pages with Navbar + Footer
const PageLayout = ({ children }) => (
  <>
    <Navbar />
    <main className="min-h-[calc(100vh-64px)]">{children}</main>
    <Footer />
  </>
);

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          gutter={8}
          toastOptions={{
            duration: 3000,
            className: 'toast-custom',
            style: {
              background: '#0f172a',
              color: '#f8fafc',
              fontSize: '14px',
              borderRadius: '12px',
              padding: '12px 16px',
            },
            success: {
              iconTheme: { primary: '#22c55e', secondary: '#fff' },
            },
            error: {
              iconTheme: { primary: '#ef4444', secondary: '#fff' },
            },
          }}
        />

        <Routes>
          {/* Landing Page - No Navbar/Footer */}
          <Route path="/" element={<Landing />} />

          {/* Auth */}
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Auth />} />

          {/* Customer Routes */}
          <Route path="/menu" element={<PageLayout><Home /></PageLayout>} />
          <Route path="/cart" element={<PageLayout><Cart /></PageLayout>} />
          <Route path="/checkout" element={<PageLayout><Checkout /></PageLayout>} />
          <Route path="/order-success" element={<PageLayout><OrderSuccess /></PageLayout>} />
          <Route path="/orders" element={<PageLayout><Orders /></PageLayout>} />
          <Route path="/about" element={<PageLayout><About /></PageLayout>} />

          {/* Cook Dashboard Routes */}
          <Route path="/cook/dashboard" element={<CookDashboard />}>
            <Route index element={<CookOverview />} />
            <Route path="orders" element={<CookOrders />} />
            <Route path="menu" element={<CookMenu />} />
          </Route>

          {/* Delivery Dashboard Routes */}
          <Route path="/delivery/dashboard" element={<DeliveryDashboard />}>
            <Route index element={<DeliveryOrders />} />
            <Route path="completed" element={<DeliveryCompleted />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
