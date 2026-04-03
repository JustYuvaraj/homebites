import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page - No Navbar/Footer */}
        <Route path="/" element={<Landing />} />

        {/* Customer Routes - With Navbar/Footer */}
        <Route
          path="/menu"
          element={
            <>
              <Navbar />
              <Home />
              <Footer />
            </>
          }
        />
        <Route
          path="/cart"
          element={
            <>
              <Navbar />
              <Cart />
              <Footer />
            </>
          }
        />
        <Route
          path="/checkout"
          element={
            <>
              <Navbar />
              <Checkout />
              <Footer />
            </>
          }
        />
        <Route
          path="/order-success"
          element={
            <>
              <Navbar />
              <OrderSuccess />
              <Footer />
            </>
          }
        />
        <Route
          path="/orders"
          element={
            <>
              <Navbar />
              <Orders />
              <Footer />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <Navbar />
              <About />
              <Footer />
            </>
          }
        />

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
  );
}

export default App;
