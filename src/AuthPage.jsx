import React, { useState } from 'react';
import { Mail, Lock, User, ArrowLeft, Eye, EyeOff, Check, Sparkles } from 'lucide-react';

export default function AuthPage({ onNavigate, onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Signup-specific validations
    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = 'Name is required';
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (isLogin) {
        // Check if user exists in localStorage
        const users = JSON.parse(localStorage.getItem('incdrops_users') || '[]');
        const user = users.find(u => u.email === formData.email);

        if (user && user.password === formData.password) {
          // Login successful
          const userData = {
            id: user.id,
            email: user.email,
            name: user.name,
            tier: user.tier || 'free',
            createdAt: user.createdAt
          };
          localStorage.setItem('incdrops_user', JSON.stringify(userData));
          localStorage.setItem('incdrops_tier', userData.tier);
          onLogin(userData);
          onNavigate('generator');
        } else {
          setErrors({ email: 'Invalid email or password' });
        }
      } else {
        // Signup
        const users = JSON.parse(localStorage.getItem('incdrops_users') || '[]');
        
        // Check if email already exists
        if (users.find(u => u.email === formData.email)) {
          setErrors({ email: 'Email already registered' });
          setLoading(false);
          return;
        }

        // Create new user
        const newUser = {
          id: Date.now().toString(),
          email: formData.email,
          password: formData.password,
          name: formData.name,
          tier: 'free',
          createdAt: new Date().toISOString()
        };

        users.push(newUser);
        localStorage.setItem('incdrops_users', JSON.stringify(users));

        // Auto-login after signup
        const userData = {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          tier: newUser.tier,
          createdAt: newUser.createdAt
        };
        localStorage.setItem('incdrops_user', JSON.stringify(userData));
        localStorage.setItem('incdrops_tier', userData.tier);
        onLogin(userData);
        onNavigate('generator');
      }

      setLoading(false);
    }, 1000);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: '',
      password: '',
      name: '',
      confirmPassword: ''
    });
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gray-700/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gray-600/20 rounded-full blur-3xl"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 border-b border-gray-800 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => onNavigate('landing')}
            className="flex items-center space-x-2 text-gray-400 hover:text-gray-200 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </button>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-300 via-gray-100 to-gray-400 bg-clip-text text-transparent">
            IncDrops
          </h1>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] px-6 py-12">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-gradient-to-br from-gray-400 via-gray-300 to-gray-500 rounded-2xl p-8 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-900 rounded-2xl flex items-center justify-center">
                <Sparkles className="text-gray-300" size={32} />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {isLogin ? 'Welcome Back' : 'Get Started'}
              </h2>
              <p className="text-gray-700">
                {isLogin ? 'Sign in to continue creating' : 'Create your free account'}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name (Signup only) */}
              {!isLogin && (
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={20} />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full pl-12 pr-4 py-3 bg-white/30 border border-gray-600 rounded-lg text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    />
                  </div>
                  {errors.name && <p className="text-red-700 text-sm mt-1">{errors.name}</p>}
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={20} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@example.com"
                    className="w-full pl-12 pr-4 py-3 bg-white/30 border border-gray-600 rounded-lg text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  />
                </div>
                {errors.email && <p className="text-red-700 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-12 py-3 bg-white/30 border border-gray-600 rounded-lg text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && <p className="text-red-700 text-sm mt-1">{errors.password}</p>}
              </div>

              {/* Confirm Password (Signup only) */}
              {!isLogin && (
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={20} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="••••••••"
                      className="w-full pl-12 pr-4 py-3 bg-white/30 border border-gray-600 rounded-lg text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    />
                  </div>
                  {errors.confirmPassword && <p className="text-red-700 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
              </button>
            </form>

            {/* Toggle Mode */}
            <div className="mt-6 text-center">
              <p className="text-gray-800">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={toggleMode}
                  className="text-gray-900 font-semibold hover:underline"
                >
                  {isLogin ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>

            {/* Features (Signup only) */}
            {!isLogin && (
              <div className="mt-6 pt-6 border-t border-gray-600">
                <p className="text-sm font-semibold text-gray-900 mb-3">Free account includes:</p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-800">
                    <Check size={16} className="mr-2 text-gray-900" />
                    5 ideas per month
                  </div>
                  <div className="flex items-center text-sm text-gray-800">
                    <Check size={16} className="mr-2 text-gray-900" />
                    Social posts generation
                  </div>
                  <div className="flex items-center text-sm text-gray-800">
                    <Check size={16} className="mr-2 text-gray-900" />
                    Save your favorites
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Social Proof */}
          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              Join 10,000+ creators using IncDrops
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
