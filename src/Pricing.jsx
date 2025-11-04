import React, { useState } from 'react';
import { ArrowLeft, Check, Sparkles, Loader2 } from 'lucide-react';
import { getFunctions, httpsCallable } from 'firebase/functions';

// --- PASTE YOUR NEW TEST PRICE IDs HERE ---
const priceIDs = {
  basic: 'price_1SPUR3HK4G9ZDA0FoWrY7Qak',
  pro: 'price_1SPdMsHK4G9ZDA0FGibpxGrG',
  business: 'price_1SPdNCHK4G9ZDA0Fjay2IoFD'
};

export default function Pricing({ onNavigate, user }) {
  const [loadingPlan, setLoadingPlan] = useState(null); 
  const [error, setError] = useState('');

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

  // --- ALL YOUR JSX IS UNCHANGED ---
  return (
    <div className="min-h-screen bg-black text-white">
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

      {/* Pricing Section */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-20">
          <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
            Choose Your Plan
          </h2>
          <p className="text-xl text-gray-400">
            Scale as you grow. Cancel anytime.
          </p>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Free Plan */}
          <div className="bg-gradient-to-br from-gray-400 via-gray-300 to-gray-500 rounded-2xl p-8 shadow-xl shadow-gray-700/50">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Starter</h3>
            <div className="text-5xl font-bold text-gray-900 mb-4">Free</div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start text-gray-800"><Check className="mr-2 mt-1 flex-shrink-0 text-gray-700" size={20} /><span>5 ideas per month</span></li>
              <li className="flex items-start text-gray-800"><Check className="mr-2 mt-1 flex-shrink-0 text-gray-700" size={20} /><span>Social posts only</span></li>
              <li className="flex items-start text-gray-800"><Check className="mr-2 mt-1 flex-shrink-0 text-gray-700" size={20} /><span>Save favorites</span></li>
            </ul>
            <button 
              onClick={() => user ? onNavigate('generator') : onNavigate('auth')}
              className="w-full py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105"
            >
              {user ? 'Go to Dashboard' : 'Get Started'}
            </button>
          </div>

          {/* Basic Plan */}
          <div className="bg-gradient-to-br from-gray-400 via-gray-300 to-gray-500 rounded-2xl p-8 shadow-xl shadow-gray-700/50">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Basic</h3>
            <div className="flex items-baseline mb-4">
              <span className="text-5xl font-bold text-gray-900">$29</span>
              <span className="text-gray-700 ml-2">/month</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start text-gray-800"><Check className="mr-2 mt-1 flex-shrink-0 text-gray-700" size={20} /><span>50 ideas per month</span></li>
              <li className="flex items-start text-gray-800"><Check className="mr-2 mt-1 flex-shrink-0 text-gray-700" size={20} /><span>All content types</span></li>
              <li className="flex items-start text-gray-800"><Check className="mr-2 mt-1 flex-shrink-0 text-gray-700" size={20} /><span>Generation history</span></li>
            </ul>
            <button 
              onClick={() => redirectToCheckout(priceIDs.basic)}
              disabled={loadingPlan === priceIDs.basic}
              className="w-full py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 flex items-center justify-center"
            >
              {loadingPlan === priceIDs.basic ? (
                <Loader2 className="animate-spin" size={24} />
              ) : (
                'Upgrade to Basic'
              )}
            </button>
          </div>

          {/* Pro Plan */}
          <div className="bg-gradient-to-br from-gray-300 via-gray-200 to-gray-400 rounded-2xl p-8 relative scale-105 shadow-2xl shadow-gray-600/70">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-gray-700 to-gray-900 px-4 py-1 rounded-full text-sm font-semibold text-white">MOST POPULAR</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Pro</h3>
            <div className="flex items-baseline mb-4">
              <span className="text-5xl font-bold text-gray-900">$49</span>
              <span className="text-gray-700 ml-2">/month</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start text-gray-800"><Check className="mr-2 mt-1 flex-shrink-0 text-gray-700" size={20} /><span>200 ideas per month</span></li>
              <li className="flex items-start text-gray-800"><Check className="mr-2 mt-1 flex-shrink-0 text-gray-700" size={20} /><span>Everything in Basic</span></li>
              <li className="flex items-start text-gray-800"><Check className="mr-2 mt-1 flex-shrink-0 text-gray-700" size={20} /><span>Priority support</span></li>
            </ul>
            <button 
              onClick={() => redirectToCheckout(priceIDs.pro)}
              disabled={loadingPlan === priceIDs.pro}
              className="w-full py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 flex items-center justify-center"
            >
              {loadingPlan === priceIDs.pro ? (
                <Loader2 className="animate-spin" size={24} />
              ) : (
                'Upgrade to Pro'
              )}
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
}