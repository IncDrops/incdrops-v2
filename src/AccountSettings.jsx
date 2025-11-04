import React, { useState, useEffect } from 'react';
import { ArrowLeft, User, Mail, CreditCard, Crown, Check, AlertCircle, LogOut, Loader2 } from 'lucide-react';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { auth, db } from './firebase'; 
import { updateProfile } from 'firebase/auth';
import { doc, updateDoc, getDoc } from 'firebase/firestore';

// --- PASTE YOUR NEW TEST PRICE IDs HERE ---
const priceIDs = {
  basic: 'price_1SPUKaHK4G9ZDA0FqdzT1Hae',
  pro: 'price_1SPUM6HK4G9ZDA0FWqZJOLVH',
  business: 'price_1SPUNGHK4G9ZDA0FrNIo8Dzt'
};

export default function AccountSettings({ onNavigate, onLogout, user: propUser }) {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });
  
  const [loadingPlan, setLoadingPlan] = useState(null); 
  const [error, setError] = useState('');
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      // First try to use the prop from App (which has fresh Firebase data)
      if (propUser) {
        setUser(propUser);
        setFormData({ name: propUser.name, email: propUser.email });
        return;
      }

      // Fallback: get from localStorage and fetch fresh data from Firebase
      const localUser = JSON.parse(localStorage.getItem('incdrops_user') || 'null');
      if (localUser && localUser.id) {
        try {
          const userDocRef = doc(db, 'users', localUser.id);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const freshData = userDocSnap.data();
            const userData = {
              id: localUser.id,
              ...freshData
            };
            setUser(userData);
            setFormData({ name: userData.name, email: userData.email });
            // Update localStorage with fresh data
            localStorage.setItem('incdrops_user', JSON.stringify(userData));
          } else {
            onNavigate('auth');
          }
        } catch (err) {
          console.error("Error fetching user data:", err);
          setUser(localUser);
          setFormData({ name: localUser.name, email: localUser.email });
        }
      } else {
        onNavigate('auth');
      }
    };

    fetchUserData();
  }, [onNavigate, propUser]);

  const tiers = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      features: ['5 ideas per month', 'Social posts only', 'Basic templates', 'Community support']
    },
    {
      id: 'basic',
      name: 'Basic',
      price: 29,
      features: ['50 ideas per month', 'All content types', 'Save favorites', 'Export to CSV/TXT']
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 49,
      popular: true,
      features: ['200 ideas per month', 'Everything in Basic', 'Priority support', 'Advanced filters', 'Generation history']
    },
    {
      id: 'business',
      name: 'Business',
      price: 99,
      features: ['Unlimited ideas', 'Everything in Pro', 'Team collaboration (5 users)', 'API access', 'White-label exports']
    }
  ];

  const handleSave = async () => {
    setSaveLoading(true);
    setError('');
    
    try {
      if (auth.currentUser && auth.currentUser.displayName !== formData.name) {
        await updateProfile(auth.currentUser, {
          displayName: formData.name
        });
      }

      const userDocRef = doc(db, 'users', user.id);
      await updateDoc(userDocRef, {
        name: formData.name
      });

      const updatedUser = { ...user, name: formData.name };
      setUser(updatedUser);
      localStorage.setItem('incdrops_user', JSON.stringify(updatedUser));
      
      setEditing(false);

    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Failed to update profile. Please try again.");
    } finally {
      setSaveLoading(false);
    }
  };

  const redirectToCheckout = async (priceId) => {
    if (!user) {
      onNavigate('auth');
      return;
    }

    setLoadingPlan(priceId);
    setError('');

    try {
      const functions = getFunctions();
      const createCheckoutSession = httpsCallable(functions, 'createCheckoutSession');

      const { data } = await createCheckoutSession({ priceId: priceId });
      
      if (data && data.url) {
        window.location.href = data.url; 
      } else {
        throw new Error("Could not retrieve checkout URL.");
      }

    } catch (err) {
      console.error("Stripe checkout error:", err);
      setError('An error occurred. Please try again.');
      setLoadingPlan(null);
    }
  };

  const handleLogout = () => {
    onLogout(); 
    onNavigate('landing'); 
  };

  if (!user) return null;

  // --- ALL YOUR JSX IS UNCHANGED ---
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="border-b border-gray-800 backdrop-blur-md sticky top-0 z-40 bg-black/80">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => onNavigate('generator')}
            className="flex items-center space-x-2 text-gray-400 hover:text-gray-200 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Generator</span>
          </button>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-300 via-gray-100 to-gray-400 bg-clip-text text-transparent">
            IncDrops
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 rounded-lg text-white font-semibold transition-all duration-300"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-gray-300 via-gray-100 to-gray-400 bg-clip-text text-transparent">
          Account Settings
        </h2>
        
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="space-y-6">
          {/* Profile Section */}
          <div className="bg-gradient-to-br from-gray-400 via-gray-300 to-gray-500 rounded-2xl p-8 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Profile Information</h3>
              {!editing && (
                <button
                  onClick={() => setEditing(true)}
                  className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-semibold transition-all duration-300"
                >
                  Edit
                </button>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Name</label>
                {editing ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white/30 border border-gray-600 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                ) : (
                  <p className="text-gray-800 text-lg">{user.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Email</label>
                {editing ? (
                  <>
                    <input
                      type="email"
                      value={formData.email}
                      disabled 
                      className="w-full px-4 py-3 bg-white/20 border border-gray-600 rounded-lg text-gray-700 cursor-not-allowed"
                    />
                    <p className="text-xs text-gray-700 mt-1">Changing email requires re-authentication (coming soon).</p>
                  </>
                ) : (
                  <p className="text-gray-800 text-lg">{user.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Member Since</label>
                <p className="text-gray-800 text-lg">
                  {new Date(user.createdAt).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>

              {editing && (
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleSave}
                    disabled={saveLoading}
                    className="px-6 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 flex items-center justify-center"
                  >
                    {saveLoading ? <Loader2 className="animate-spin" size={20} /> : 'Save Changes'}
                  </button>
                  <button
                    onClick={() => {
                      setEditing(false);
                      setFormData({ name: user.name, email: user.email });
                    }}
                    className="px-6 py-2 bg-white/30 hover:bg-white/40 text-gray-900 rounded-lg font-semibold transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Current Plan Section */}
          <div className="bg-gradient-to-br from-gray-400 via-gray-300 to-gray-500 rounded-2xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Current Subscription</h3>
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  {user.tier === 'business' && <Crown className="text-yellow-700" size={24} />}
                  <h4 className="text-3xl font-bold text-gray-900 capitalize">{user.tier}</h4>
                </div>
                <p className="text-gray-800">
                  {tiers.find(t => t.id === user.tier)?.features.length} features included
                </p>
              </div>
              {user.tier !== 'business' && (
                <button
                  onClick={() => redirectToCheckout(priceIDs.pro)} // Default to Pro
                  disabled={loadingPlan === priceIDs.pro}
                  className="px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 flex items-center justify-center"
                >
                  {loadingPlan === priceIDs.pro ? <Loader2 className="animate-spin" size={20} /> : 'Upgrade Plan'}
                </button>
              )}
            </div>
          </div>

          {/* All Plans */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">All Plans</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tiers.map((tier) => (
                <div
                  key={tier.id}
                  className={`rounded-2xl p-6 relative ${
                    tier.id === user.tier
                      ? 'bg-gradient-to-br from-gray-300 via-gray-200 to-gray-400 border-2 border-gray-600'
                      : 'bg-gradient-to-br from-gray-400 via-gray-300 to-gray-500'
                  } ${tier.popular ? 'scale-105' : ''}`}
                >
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-gray-700 to-gray-900 px-4 py-1 rounded-full text-sm font-semibold text-white">
                      MOST POPULAR
                    </div>
                  )}
                  {tier.id === user.tier && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gray-900 px-4 py-1 rounded-full text-sm font-semibold text-white">
                      CURRENT PLAN
                    </div>
                  )}

                  <h4 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h4>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">${tier.price}</span>
                    <span className="text-gray-700">/month</span>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm text-gray-800">
                        <Check size={16} className="mr-2 mt-0.5 flex-shrink-0 text-gray-900" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {tier.id !== 'free' && tier.id !== user.tier && (
                    <button
                      onClick={() => redirectToCheckout(priceIDs[tier.id])}
                      disabled={loadingPlan === priceIDs[tier.id]}
                      className="w-full py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 flex items-center justify-center"
                    >
                      {loadingPlan === priceIDs[tier.id] ? (
                        <Loader2 className="animate-spin" size={20} />
                      ) : (
                        tier.price > tiers.find(t => t.id === user.tier).price ? 'Upgrade' : 'Downgrade'
                      )}
                    </button>
                  )}
                  {tier.id === 'free' && tier.id !== user.tier && (
                    <button
                      onClick={() => alert("Please manage your subscription in your account.")} // Placeholder
                      className="w-full py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-semibold transition-all duration-300"
                    >
                      Downgrade
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}