# VeetuSaapadu - Home Cook Food Delivery Platform 🍛

A production-ready full-stack food delivery application connecting home cooks with customers. Built with React, Redux Toolkit, Tailwind CSS (Frontend) and Spring Boot, MySQL (Backend).

## 🌟 Overview

VeetuSaapadu (வீட்டு சாப்பாடு - "Home Food" in Tamil) is a Swiggy-like platform specifically designed for home cooks to sell their homemade food directly to customers.

## 🚀 Live Repositories

| Component | Repository |
|-----------|------------|
| **Frontend** | [veetusaapadu-frontend](https://github.com/JustYuvaraj/homebites) |
| **Backend** | [veetusaapadu-backend](https://github.com/JustYuvaraj/veetusaapadu-backend) |

## ✨ Features

### 👥 Customer Features
- 🍽️ Browse menu with search, category filter, veg/non-veg toggle
- 🛒 Shopping cart with quantity management
- 📍 Multiple delivery addresses
- 💳 Checkout with order placement
- 📦 Real-time order tracking
- 📜 Order history

### 👨‍🍳 Cook Features
- 📋 Menu management (CRUD operations)
- 🔔 Incoming order notifications
- ✅ Accept/Reject orders
- 🍳 Order status updates (Preparing → Ready)
- 📊 Dashboard with earnings and stats

### 🚗 Delivery Agent Features
- 📦 View orders ready for pickup
- ✅ Accept delivery assignments
- 🏃 Mark orders as Picked Up / Delivered
- 📜 Completed deliveries history

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React 18 | UI Framework |
| Redux Toolkit | State Management (createSlice, createAsyncThunk) |
| React Router v6 | Client-side Routing |
| Tailwind CSS | Styling |
| Axios | HTTP Client |
| Vite | Build Tool |
| Lucide React | Icons |

### Backend
| Technology | Purpose |
|------------|---------|
| Java 17 | Programming Language |
| Spring Boot 3.2 | REST API Framework |
| Spring Security | JWT Authentication |
| Spring Data JPA | ORM |
| MySQL / H2 | Database |
| Swagger/OpenAPI | API Documentation |
| Lombok | Boilerplate Reduction |

## 📁 Project Structure

```
veetusaapadu/
├── frontend/ (React)
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Page components
│   │   │   ├── cook/         # Cook dashboard pages
│   │   │   └── delivery/     # Delivery dashboard pages
│   │   ├── store/            # Redux store & slices
│   │   ├── services/         # API service layer
│   │   └── data/             # Mock data
│   └── package.json
│
└── backend/ (Spring Boot)
    └── src/main/java/com/veetusaapadu/
        ├── config/           # Security, CORS config
        ├── controller/       # REST controllers
        ├── dto/              # Request/Response DTOs
        ├── entity/           # JPA entities
        ├── exception/        # Custom exceptions
        ├── repository/       # JPA repositories
        ├── security/         # JWT components
        └── service/          # Business logic
```

## 🏃‍♂️ Getting Started

### Frontend
```bash
cd homebites
npm install
npm run dev
# Open http://localhost:5173
```

### Backend
```bash
cd veetusaapadu-backend
./mvnw spring-boot:run
# API: http://localhost:8080
# Swagger: http://localhost:8080/swagger-ui.html
```

### Test Credentials
| Role | Email | Password |
|------|-------|----------|
| Cook | lakshmi@veetusaapadu.com | password123 |
| Customer | rajesh@gmail.com | password123 |
| Delivery | kumar@veetusaapadu.com | password123 |

## 📊 Order Lifecycle

```
Customer places order
        ↓
    PENDING
        ↓
Cook accepts → ACCEPTED → PREPARING → READY
        ↓
   (or REJECTED)
        ↓
Delivery accepts → ASSIGNED → PICKED_UP → DELIVERED
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user

### Menu (Public)
- `GET /api/menu` - Browse all items
- `GET /api/menu/search?query=` - Search items
- `GET /api/menu/categories` - Get categories

### Customer (Protected)
- `POST /api/customer/orders` - Place order
- `GET /api/customer/orders` - Order history
- `POST /api/customer/addresses` - Add address

### Cook (Protected)
- `GET /api/cook/menu` - My menu items
- `POST /api/cook/menu` - Add item
- `POST /api/cook/orders/{id}/accept` - Accept order
- `POST /api/cook/orders/{id}/ready` - Mark ready

### Delivery (Protected)
- `GET /api/delivery/orders/available` - Available pickups
- `POST /api/delivery/orders/{id}/deliver` - Mark delivered

## 🎯 Key Implementation Highlights

### Redux Async Thunks
```javascript
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    const response = await authAPI.login(credentials);
    localStorage.setItem('token', response.data.token);
    return response.data;
  }
);
```

### JWT Authentication (Spring Security)
```java
@Bean
public SecurityFilterChain filterChain(HttpSecurity http) {
    http.csrf(csrf -> csrf.disable())
        .sessionManagement(s -> s.sessionCreationPolicy(STATELESS))
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/api/auth/**").permitAll()
            .requestMatchers("/api/cook/**").hasRole("COOK")
            .anyRequest().authenticated()
        );
}
```

### Role-Based Access Control
- **CUSTOMER** - Browse, order, track
- **COOK** - Manage menu, handle orders
- **DELIVERY** - Pickup and deliver orders
- **ADMIN** - Full access

## 📱 Responsive Design

- 📱 Mobile-first approach
- 💻 Desktop-optimized dashboards
- 🎨 DoorDash-inspired UI

## 👨‍💻 Author

**Yuvaraj**
- GitHub: [@JustYuvaraj](https://github.com/JustYuvaraj)

---

Built with ❤️ for Juspay Frontend SDE Internship Application

**Demonstrating:** React.js, Redux Toolkit, Hooks, RESTful APIs, Spring Boot, JWT Authentication
