# HomeBites - Home Cook Food Delivery Platform 🍳

A modern food delivery web application built with React, Redux Toolkit, and Tailwind CSS. This project demonstrates a complete e-commerce flow for a home-based food delivery service.

## 🚀 Live Demo
Run locally: `npm run dev` → http://localhost:5173

## ✨ Features

### Customer Features
- 🍽️ **Menu Browsing** - View all available dishes with images, descriptions, and prices
- 🔍 **Search & Filter** - Find dishes by name, category, or veg/non-veg preference
- 🛒 **Shopping Cart** - Add/remove items with quantity management (Redux)
- 💳 **Checkout** - Complete order with delivery address and payment method
- 📦 **Order Tracking** - Real-time order status updates
- 📜 **Order History** - View all past orders

### Technical Highlights
- **State Management**: Redux Toolkit with createSlice and createAsyncThunk
- **Routing**: React Router v6 with protected routes
- **Styling**: Tailwind CSS for responsive design
- **Icons**: Lucide React for beautiful SVG icons
- **Performance**: React hooks (useState, useEffect, useMemo, useSelector, useDispatch)

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18 | UI Framework |
| Redux Toolkit | State Management |
| React Router v6 | Client-side Routing |
| Tailwind CSS | Styling |
| Vite | Build Tool |
| Lucide React | Icons |

## 📁 Project Structure

```
homebites/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── MenuCard.jsx
│   │   ├── CartItem.jsx
│   │   ├── CategoryFilter.jsx
│   │   └── OrderCard.jsx
│   ├── pages/             # Page components
│   │   ├── Home.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── OrderSuccess.jsx
│   │   ├── Orders.jsx
│   │   └── About.jsx
│   ├── store/             # Redux store & slices
│   │   ├── index.js
│   │   ├── cartSlice.js
│   │   ├── orderSlice.js
│   │   └── authSlice.js
│   ├── data/              # Mock data
│   │   └── menuData.js
│   ├── App.jsx
│   └── main.jsx
└── package.json
```

## 🏃‍♂️ Getting Started

```bash
# Clone the repository
git clone https://github.com/JustYuvaraj/homebites.git

# Navigate to project directory
cd homebites

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🎯 Key Implementation Details

### Redux Store Configuration
```javascript
// Centralized store with multiple slices
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    orders: orderReducer,
    auth: authReducer,
  },
});
```

### Async Operations with createAsyncThunk
```javascript
export const placeOrder = createAsyncThunk(
  'orders/placeOrder',
  async (orderData, { rejectWithValue }) => {
    // Handles loading states automatically
  }
);
```

### Custom Hooks Pattern
- Uses `useSelector` for reading state
- Uses `useDispatch` for actions
- Uses `useMemo` for computed/filtered data

## 📱 Responsive Design

The application is fully responsive and works on:
- 📱 Mobile devices (320px+)
- 📱 Tablets (768px+)
- 💻 Desktops (1024px+)

## 🔮 Future Enhancements

- [ ] User authentication with JWT
- [ ] Backend API integration
- [ ] Payment gateway integration
- [ ] Push notifications
- [ ] Admin dashboard for cook

## 👨‍💻 Author

**Yuvaraj**
- GitHub: [@JustYuvaraj](https://github.com/JustYuvaraj)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ for Juspay Frontend SDE Internship Application
