// This is your new file: src/Pricing.jsx
import React, { useState } from 'react';
import { ArrowLeft, Check, Sparkles, Loader2 } from 'lucide-react';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { loadStripe } from '@stripe/stripe-js';

// --- ADD YOUR VITE_STRIPE_PUBLISHABLE_KEY to your .env file ---
// This is your *public* key, not the secret one.
// You can find it in your Stripe Dashboard under "Developers" > "API keys".
// It starts with 'pk_...'
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// --- YOUR STRIPE PRICE IDs ---
const priceIDs = {
  basic: 'price_1SPUKaHK4G9ZDA0FqdzT1Hae',
  pro: 'price_1SPUM6HK4G9ZDA0FWqZJOLVH',
  business: 'price_1SPUNGHK4G9ZDA0FrNIo8Dzt' // <-- Add your Business plan ID
};

export default function Pricing({ onNavigate, user }) {
  const [loadingPlan, setLoadingPlan] = useState(null); // 'basic', 'pro', or 'business'
  const [error, setError] = useState('');

  // This is the function that calls your Cloud Function
  const redirectToCheckout = async (priceId) => {
    if (!user) {
      // User isn't logged in, send them to the auth page first.
      // The auth page will send them to the generator, but they can
      // navigate to pricing from there.
      onNavigate('auth');
      return;
    }

    setLoadingPlan(priceId);
    setError('');

    try {
      // 1. Get a reference to your cloud function
      const functions = getFunctions();
      const createCheckoutSession = httpsCallable(functions, 'createCheckoutSession');

      // 2. Call the function with the priceId
      const { data } = await createCheckoutSession({ priceId: priceId });
      
      // 3. We get a session ID back. Redirect to Stripe.
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: data.id });

    } catch (err) {
      console.error("Stripe checkout error:", err);
      setError('An error occurred. Please try again.');
      setLoadingPlan(null);
    }
  };

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
          
          {/* Free Plan (Matches your landing page) */}
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

          {/* Business Plan (Add your Price ID above) */}
          {/* <div className="bg-gradient-to-br from-gray-400 via-gray-300 to-gray-500 rounded-2xl p-8 shadow-xl shadow-gray-700/50">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Business</h3>
            ... your plan details ...
            <button 
              onClick={() => redirectToCheckout(priceIDs.business)}
              disabled={loadingPlan === priceIDs.business}
              ...
            >
              {loadingPlan === priceIDs.business ? (
                <Loader2 className="animate-spin" size={24} />
              ) : (
                'Contact Sales'
              )}
            </button>
          </div> */}
          
        </div>
      </div>
    </div>
  );
}