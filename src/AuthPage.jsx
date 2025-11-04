import React, { useState } from 'react';
import { Mail, Lock, User, ArrowLeft, Eye, EyeOff, Check, Sparkles, Loader2 } from 'lucide-react'; 
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import { auth, db } from './firebase'; 
import { doc, setDoc, getDoc } from "firebase/firestore"; 

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
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

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
    setErrors({}); 

    let userData; 

    try {
      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
        const user = userCredential.user;

        // Fetch user data from Firestore to get the current tier
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const firestoreData = userDocSnap.data();
          userData = {
            id: user.uid,
            email: user.email,
            name: user.displayName || firestoreData.name || 'User',
            tier: firestoreData.tier || 'free',
            createdAt: firestoreData.createdAt || new Date().toISOString()
          };
        } else {
          // Fallback if no Firestore document exists
          userData = {
            id: user.uid,
            email: user.email,
            name: user.displayName || 'User',
            tier: 'free',
            createdAt: new Date().toISOString()
          };
        }

      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        const user = userCredential.user;

        await updateProfile(user, {
          displayName: formData.name
        });

        const userProfileData = {
          uid: user.uid, 
          name: formData.name,
          email: user.email,
          tier: 'free',
          createdAt: new Date(),
        };
        await setDoc(doc(db, "users", user.uid), userProfileData);

        userData = {
          id: user.uid,
          email: user.email,
          name: formData.name,
          tier: 'free', 
          createdAt: new Date().toISOString()
        };
      }

      setLoading(false);
      setShowSuccess(true); 

      // Redirect after brief success message
      setTimeout(() => {
        onLogin(userData); // This handles everything: state update, localStorage, and navigation
      }, 1000); // Reduced from 1500ms to 1000ms for faster redirect 

    } catch (err) {
      setLoading(false); 
      if (err.code === 'auth/invalid-credential') {
        setErrors({ email: 'Invalid email or password' });
      } else if (err.code === 'auth/email-already-in-use') {
        setErrors({ email: 'This email is already registered. Try logging in.' });
      } else if (err.code === 'auth/weak-password') {
        setErrors({ password: 'Password must be at least 6 characters' });
      } else {
        setErrors({ email: `Error: ${err.message}` });
        console.error("Firebase Auth Error: ", err);
      }
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
  };

  // --- ALL YOUR JSX IS UNCHANGED ---
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gray-700/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gray-600/20 rounded-full blur-3xl"></div>
      </div>

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

      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] px-6 py-12">
        <div className="w-full max-w-md">
          <div className="bg-gradient-to-br from-gray-400 via-gray-300 to-gray-500 rounded-2xl p-8 shadow-2xl">
            
            {showSuccess ? (
              <div className="text-center py-10">
                <Check size={56} className="mx-auto text-green-800" />
                <h2 className="text-2xl font-bold text-gray-900 mt-4">
                  {isLogin ? 'Login Successful!' : 'Account Created!'}
                </h2>
                <p className="text-gray-700 mt-2">
                  Redirecting you to the app...
                </p>
              </div>
            ) : (
              <>
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

                <form onSubmit={handleSubmit} className="space-y-4">
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

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center"
                  >
                    {loading ? (
                      <Loader2 className="animate-spin" size={20} /> 
                    ) : (
                      isLogin ? 'Sign In' : 'Create Account'
                    )}
                  </button>
                </form>

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
              </>
            )}

          </div>

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