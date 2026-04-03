import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error.response?.data || error);
  }
);

// ============ AUTH API ============
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
};

// ============ MENU API ============
export const menuAPI = {
  getAll: () => api.get('/menu'),
  getById: (id) => api.get(`/menu/${id}`),
  search: (query) => api.get(`/menu/search?query=${query}`),
  getByCategory: (category) => api.get(`/menu/category/${category}`),
  getCategories: () => api.get('/menu/categories'),
  getByCook: (cookId) => api.get(`/menu/cook/${cookId}`),
  getVeg: (isVeg) => api.get(`/menu/veg?isVeg=${isVeg}`),
};

// ============ CUSTOMER API ============
export const customerAPI = {
  // Orders
  placeOrder: (data) => api.post('/customer/orders', data),
  getOrders: () => api.get('/customer/orders'),
  getOrder: (id) => api.get(`/customer/orders/${id}`),
  
  // Addresses
  getAddresses: () => api.get('/customer/addresses'),
  addAddress: (data) => api.post('/customer/addresses', data),
  updateAddress: (id, data) => api.put(`/customer/addresses/${id}`, data),
  deleteAddress: (id) => api.delete(`/customer/addresses/${id}`),
};

// ============ COOK API ============
export const cookAPI = {
  // Profile
  getProfile: () => api.get('/cook/profile'),
  updateDeliveryZone: (data) => api.put('/cook/delivery-zone', data),
  
  // Menu
  getMyMenu: () => api.get('/cook/menu'),
  addMenuItem: (data) => api.post('/cook/menu', data),
  updateMenuItem: (id, data) => api.put(`/cook/menu/${id}`, data),
  deleteMenuItem: (id) => api.delete(`/cook/menu/${id}`),
  toggleAvailability: (id) => api.patch(`/cook/menu/${id}/toggle`),
  
  // Orders
  getOrders: () => api.get('/cook/orders'),
  getPendingOrders: () => api.get('/cook/orders/pending'),
  getOrder: (id) => api.get(`/cook/orders/${id}`),
  acceptOrder: (id) => api.post(`/cook/orders/${id}/accept`),
  rejectOrder: (id, reason) => api.post(`/cook/orders/${id}/reject`, { reason }),
  startPreparing: (id) => api.post(`/cook/orders/${id}/preparing`),
  markReady: (id) => api.post(`/cook/orders/${id}/ready`),
};

// ============ COOKS (PUBLIC) API ============
export const cooksAPI = {
  getCooksNearLocation: (lat, lng) => api.get(`/cooks/near?lat=${lat}&lng=${lng}`),
  getMenuNearLocation: (lat, lng) => api.get(`/cooks/menu/near?lat=${lat}&lng=${lng}`),
  checkDeliveryAvailability: (cookId, lat, lng) => api.get(`/cooks/${cookId}/delivers-to?lat=${lat}&lng=${lng}`),
  getAllCooks: () => api.get('/cooks'),
};

// ============ DELIVERY API ============
export const deliveryAPI = {
  getAvailableOrders: () => api.get('/delivery/orders/available'),
  getMyOrders: () => api.get('/delivery/orders'),
  getOrder: (id) => api.get(`/delivery/orders/${id}`),
  acceptOrder: (id) => api.post(`/delivery/orders/${id}/accept`),
  pickupOrder: (id) => api.post(`/delivery/orders/${id}/pickup`),
  deliverOrder: (id) => api.post(`/delivery/orders/${id}/deliver`),
};

export default api;
