import React, { useState } from 'react';
import { Mail, Lock, User, ArrowLeft, Eye, EyeOff, Check, Sparkles } from 'lucide-react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword 
} from "firebase/auth"; // Import Firebase auth functions

// NOTE: The 'auth' prop must be passed down from your main App.jsx
// where you initialize Firebase.
export default function AuthPage({ onNavigate, auth }) {
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
  const [generalError, setGeneralError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    setGeneralError('');
  };

  const validateForm = () => {
    const newErrors = {};
    setGeneralError('');

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

  // Helper to translate Firebase errors
  const handleAuthError = (error) => {
    console.error("Firebase Auth Error:", error.code);
    switch (error.code) {
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        setGeneralError('Invalid email or password.');
        break;
      case 'auth/email-already-in-use':
        setErrors({ email: 'This email is already registered.' });
        break;
      case 'auth/invalid-email':
        setErrors({ email: 'That email address is invalid.' });
        break;
      case 'auth/weak-password':
        setErrors({ password: 'Password is too weak (min 6 characters).' });
        break;
      default:
        setGeneralError('An unexpected error occurred. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    if (!auth) {
      setGeneralError("Auth service is not available. Please try again later.");
      return;
    }

    setLoading(true);
    setGeneralError('');

    try {
      if (isLogin) {
        // --- SECURE LOGIN ---
        // Call Firebase to sign in
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        // onLogin(userCredential.user) is no longer needed
        // The onAuthStateChanged listener in App.jsx will handle navigation.
        // For now, we'll just navigate to the generator.
        onNavigate('generator');
        
      } else {
        // --- SECURE SIGNUP ---
        // 1. Create the user in Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        const user = userCredential.user;

        // 2. Create the user's profile in our *own* database (Vercel Postgres)
        // This securely stores their tier and usage info, associated with their Firebase ID.
        const response = await fetch('/api/create-user-profile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            uid: user.uid,
            email: user.email,
            name: formData.name,
          }),
        });

        if (!response.ok) {
          // If our backend fails, we should ideally delete the Firebase user,
          // but for now, we'll just show an error.
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to create user profile.');
        }

        // 3. Navigate. The listener in App.jsx will handle the rest.
        onNavigate('generator');
      }
    } catch (error) {
      // Handle errors from Firebase or our backend
      if (error.code) { // This is a Firebase error
        handleAuthError(error);
      } else { // This is our backend error
        setGeneralError(error.message);
      }
    } finally {
      setLoading(false);
    }
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
    setGeneralError('');
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
              {/* General Error Message */}
              {generalError && (
                <div className="bg-red-200 border border-red-500 text-red-800 text-sm p-3 rounded-lg">
                  {generalError}
                </div>
              )}

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

