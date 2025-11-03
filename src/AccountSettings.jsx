import React, { useState, useEffect } from 'react';
import { ArrowLeft, User, Mail, CreditCard, Crown, Check, AlertCircle, LogOut } from 'lucide-react';

export default function AccountSettings({ onNavigate, onLogout }) {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [selectedTier, setSelectedTier] = useState('');

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('incdrops_user') || 'null');
    if (userData) {
      setUser(userData);
      setFormData({ name: userData.name, email: userData.email });
    } else {
      onNavigate('auth');
    }
  }, [onNavigate]);

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

  const handleSave = () => {
    const users = JSON.parse(localStorage.getItem('incdrops_users') || '[]');
    const updatedUsers = users.map(u => 
      u.id === user.id ? { ...u, name: formData.name, email: formData.email } : u
    );
    localStorage.setItem('incdrops_users', JSON.stringify(updatedUsers));
    
    const updatedUser = { ...user, name: formData.name, email: formData.email };
    setUser(updatedUser);
    localStorage.setItem('incdrops_user', JSON.stringify(updatedUser));
    setEditing(false);
  };

  const handleUpgrade = (tierId) => {
    setSelectedTier(tierId);
    setShowUpgradeModal(true);
  };

  const confirmUpgrade = () => {
    // Update user tier
    const users = JSON.parse(localStorage.getItem('incdrops_users') || '[]');
    const updatedUsers = users.map(u => 
      u.id === user.id ? { ...u, tier: selectedTier } : u
    );
    localStorage.setItem('incdrops_users', JSON.stringify(updatedUsers));
    
    const updatedUser = { ...user, tier: selectedTier };
    setUser(updatedUser);
    localStorage.setItem('incdrops_user', JSON.stringify(updatedUser));
    localStorage.setItem('incdrops_tier', selectedTier);
    
    setShowUpgradeModal(false);
    setSelectedTier('');
  };

  const handleLogout = () => {
    localStorage.removeItem('incdrops_user');
    onLogout();
    onNavigate('landing');
  };

  if (!user) return null;

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
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-white/30 border border-gray-600 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
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
                    className="px-6 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-semibold transition-all duration-300"
                  >
                    Save Changes
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
                  onClick={() => handleUpgrade(user.tier === 'free' ? 'basic' : user.tier === 'basic' ? 'pro' : 'business')}
                  className="px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                >
                  Upgrade Plan
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

                  {tier.id !== user.tier && (
                    <button
                      onClick={() => handleUpgrade(tier.id)}
                      className="w-full py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-semibold transition-all duration-300"
                    >
                      {tier.price > tiers.find(t => t.id === user.tier).price ? 'Upgrade' : 'Downgrade'}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6" onClick={() => setShowUpgradeModal(false)}>
          <div className="bg-gray-900 border border-gray-700 rounded-2xl max-w-md w-full p-8" onClick={(e) => e.stopPropagation()}>
            <div className="text-center mb-6">
              <AlertCircle className="mx-auto mb-4 text-gray-400" size={48} />
              <h3 className="text-2xl font-bold text-gray-100 mb-2">Confirm Subscription Change</h3>
              <p className="text-gray-400">
                Change your plan to <span className="font-bold capitalize text-white">{tiers.find(t => t.id === selectedTier)?.name}</span>
              </p>
              <p className="text-gray-400 mt-2">
                Price: <span className="font-bold text-white">${tiers.find(t => t.id === selectedTier)?.price}/month</span>
              </p>
            </div>

            <div className="bg-gray-800 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-400 mb-2">Note: This is a demo application. In production:</p>
              <ul className="text-sm text-gray-400 space-y-1 ml-4">
                <li>• Payment processing would be handled securely</li>
                <li>• Changes take effect immediately</li>
                <li>• You'll receive a confirmation email</li>
              </ul>
            </div>

            <div className="flex gap-3">
              <button
                onClick={confirmUpgrade}
                className="flex-1 py-3 bg-gradient-to-br from-gray-400 via-gray-300 to-gray-500 text-gray-900 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
              >
                Confirm Change
              </button>
              <button
                onClick={() => setShowUpgradeModal(false)}
                className="flex-1 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-semibold transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
