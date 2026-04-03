import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser, registerUser, clearError } from '../store/authSlice';
import { Mail, Lock, User, Phone, ChefHat, Truck, Users, Eye, EyeOff } from 'lucide-react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'CUSTOMER',
    kitchenName: '',
    kitchenAddress: '',
    speciality: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) dispatch(clearError());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      let result;
      if (isLogin) {
        result = await dispatch(loginUser({
          email: formData.email,
          password: formData.password,
        })).unwrap();
      } else {
        result = await dispatch(registerUser(formData)).unwrap();
      }
      
      // Redirect based on role
      const role = result.role?.toLowerCase();
      if (role === 'cook') {
        navigate('/cook/dashboard');
      } else if (role === 'delivery') {
        navigate('/delivery/dashboard');
      } else {
        navigate('/menu');
      }
    } catch (err) {
      console.error('Auth error:', err);
    }
  };

  const roles = [
    { value: 'CUSTOMER', label: 'Customer', icon: Users, color: 'orange' },
    { value: 'COOK', label: 'Cook', icon: ChefHat, color: 'green' },
    { value: 'DELIVERY', label: 'Delivery', icon: Truck, color: 'blue' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <span className="text-4xl">🍛</span>
          <span className="text-3xl font-bold text-gray-800">
            Veetu<span className="text-orange-500">Saapadu</span>
          </span>
        </Link>

        {/* Auth Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Tabs */}
          <div className="flex mb-8 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => { setIsLogin(true); dispatch(clearError()); }}
              className={`flex-1 py-2.5 rounded-md font-medium transition-all ${
                isLogin ? 'bg-white text-orange-500 shadow' : 'text-gray-500'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => { setIsLogin(false); dispatch(clearError()); }}
              className={`flex-1 py-2.5 rounded-md font-medium transition-all ${
                !isLogin ? 'bg-white text-orange-500 shadow' : 'text-gray-500'
              }`}
            >
              Register
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name (Register only) */}
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required={!isLogin}
                  className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>
            )}

            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                className="w-full pl-11 pr-11 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            {/* Phone (Register only) */}
            {!isLogin && (
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required={!isLogin}
                  className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>
            )}

            {/* Role Selection (Register only) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">I want to</label>
                <div className="grid grid-cols-3 gap-2">
                  {roles.map((role) => (
                    <button
                      key={role.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, role: role.value })}
                      className={`p-3 rounded-lg border-2 transition-all flex flex-col items-center gap-1 ${
                        formData.role === role.value
                          ? `border-${role.color}-500 bg-${role.color}-50 text-${role.color}-600`
                          : 'border-gray-200 text-gray-500 hover:border-gray-300'
                      }`}
                      style={{
                        borderColor: formData.role === role.value ? 
                          (role.color === 'orange' ? '#f97316' : role.color === 'green' ? '#22c55e' : '#3b82f6') : undefined,
                        backgroundColor: formData.role === role.value ?
                          (role.color === 'orange' ? '#fff7ed' : role.color === 'green' ? '#f0fdf4' : '#eff6ff') : undefined,
                        color: formData.role === role.value ?
                          (role.color === 'orange' ? '#ea580c' : role.color === 'green' ? '#16a34a' : '#2563eb') : undefined,
                      }}
                    >
                      <role.icon className="h-5 w-5" />
                      <span className="text-xs font-medium">{role.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Cook-specific fields */}
            {!isLogin && formData.role === 'COOK' && (
              <div className="space-y-4 pt-2 border-t">
                <input
                  type="text"
                  name="kitchenName"
                  placeholder="Kitchen Name (e.g., Amma's Kitchen)"
                  value={formData.kitchenName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500"
                />
                <input
                  type="text"
                  name="kitchenAddress"
                  placeholder="Kitchen Address"
                  value={formData.kitchenAddress}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500"
                />
                <input
                  type="text"
                  name="speciality"
                  placeholder="Speciality (e.g., South Indian, North Indian)"
                  value={formData.speciality}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500"
                />
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Processing...
                </span>
              ) : (
                isLogin ? 'Login' : 'Create Account'
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          {isLogin && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500 mb-2">Demo Credentials (password: password123)</p>
              <div className="space-y-1 text-xs">
                <p><span className="font-medium">Cook:</span> lakshmi@veetusaapadu.com</p>
                <p><span className="font-medium">Customer:</span> rajesh@gmail.com</p>
                <p><span className="font-medium">Delivery:</span> kumar@veetusaapadu.com</p>
              </div>
            </div>
          )}
        </div>

        {/* Back to Home */}
        <p className="text-center mt-6 text-gray-500">
          <Link to="/" className="text-orange-500 hover:underline">← Back to Home</Link>
        </p>
      </div>
    </div>
  );
};

export default Auth;
