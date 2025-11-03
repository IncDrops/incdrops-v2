import React from 'react';
import { ArrowLeft, Check, Sparkles } from 'lucide-react';

export default function Pricing({ onNavigate }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-xl border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button 
            onClick={() => onNavigate('landing')}
            className="flex items-center space-x-2 text-gray-400 hover:text-gray-200 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </button>
          <h1 className="text-xl font-bold bg-gradient-to-r from-gray-300 via-gray-100 to-gray-400 bg-clip-text text-transparent">
            IncDrops
          </h1>
          <button
            onClick={() => onNavigate('generator')}
            className="px-6 py-2 bg-gradient-to-r from-gray-700 to-gray-900 rounded-lg font-semibold hover:scale-105 transition-transform shadow-lg"
          >
            Try Free
          </button>
        </div>
      </nav>

      {/* Header */}
      <header className="pt-20 pb-12 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl mb-6 shadow-xl">
            <Sparkles className="text-gray-300" size={40} />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-300 via-gray-100 to-gray-400 bg-clip-text text-transparent">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Start free and scale as you grow. All plans include our core AI-powered content ideation features.
          </p>
        </div>
      </header>

      {/* Pricing Cards */}
      <section className="pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            
            {/* Starter Plan */}
            <div className="bg-gradient-to-br from-gray-400 via-gray-300 to-gray-500 rounded-2xl p-8 shadow-xl shadow-gray-700/50 hover:shadow-2xl hover:shadow-gray-600/50 transition-all duration-300 hover:scale-105">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Starter</h3>
              <div className="text-5xl font-bold text-gray-900 mb-4">Free</div>
              <p className="text-gray-700 mb-6">Perfect for trying out</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start text-gray-800">
                  <Check className="mr-2 mt-1 flex-shrink-0 text-gray-700" size={20} />
                  <span>5 ideas per month</span>
                </li>
                <li className="flex items-start text-gray-800">
                  <Check className="mr-2 mt-1 flex-shrink-0 text-gray-700" size={20} />
                  <span>Social posts only</span>
                </li>
                <li className="flex items-start text-gray-800">
                  <Check className="mr-2 mt-1 flex-shrink-0 text-gray-700" size={20} />
                  <span>Basic templates</span>
                </li>
                <li className="flex items-start text-gray-800">
                  <Check className="mr-2 mt-1 flex-shrink-0 text-gray-700" size={20} />
                  <span>Community support</span>
                </li>
              </ul>
              <button 
                onClick={() => onNavigate('generator')} 
                className="w-full py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105"
              >
                Get Started
              </button>
            </div>

            {/* Basic Plan */}
            <div className="bg-gradient-to-br from-gray-400 via-gray-300 to-gray-500 rounded-2xl p-8 shadow-xl shadow-gray-700/50 hover:shadow-2xl hover:shadow-gray-600/50 transition-all duration-300 hover:scale-105">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Basic</h3>
              <div className="flex items-baseline mb-4">
                <span className="text-5xl font-bold text-gray-900">$29</span>
                <span className="text-gray-700 ml-2">/month</span>
              </div>
              <p className="text-gray-700 mb-6">For regular creators</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start text-gray-800">
                  <Check className="mr-2 mt-1 flex-shrink-0 text-gray-700" size={20} />
                  <span>50 ideas per month</span>
                </li>
                <li className="flex items-start text-gray-800">
                  <Check className="mr-2 mt-1 flex-shrink-0 text-gray-700" size={20} />
                  <span>All content types</span>
                </li>
                <li className="flex items-start text-gray-800">
                  <Check className="mr-2 mt-1 flex-shrink-0 text-gray-700" size={20} />
                  <span>Save favorites</span>
                </li>
                <li className="flex items-start text-gray-800">
                  <Check className="mr-2 mt-1 flex-shrink-0 text-gray-700" size={20} />
                  <span>Export to CSV/TXT</span>
                </li>
                <li className="flex items-start text-gray-800">
                  <Check className="mr-2 mt-1 flex-shrink-0 text-gray-700" size={20} />
                  <span>Email support</span>
                </li>
              </ul>
              <button 
                onClick={() => onNavigate('generator')} 
                className="w-full py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105"
              >
                Start Basic
              </button>
            </div>

            {/* Pro Plan */}
            <div className="bg-gradient-to-br from-gray-300 via-gray-200 to-gray-400 rounded-2xl p-8 relative scale-105 shadow-2xl shadow-gray-600/70">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-gray-700 to-gray-900 px-4 py-1 rounded-full text-sm font-semibold text-white">
                MOST POPULAR
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Pro</h3>
              <div className="flex items-baseline mb-4">
                <span className="text-5xl font-bold text-gray-900">$49</span>
                <span className="text-gray-700 ml-2">/month</span>
              </div>
              <p className="text-gray-700 mb-6">For power users</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start text-gray-800">
                  <Check className="mr-2 mt-1 flex-shrink-0 text-gray-700" size={20} />
                  <span>200 ideas per month</span>
                </li>
                <li className="flex items-start text-gray-800">
                  <Check className="mr-2 mt-1 flex-shrink-0 text-gray-700" size={20} />
                  <span>Everything in Basic</span>
                </li>
                <li className="flex items-start text-gray-800">
                  <Check className="mr-2 mt-1 flex-shrink-0 text-gray-700" size={20} />
                  <span>Priority email support</span>
                </li>
                <li className="flex items-start text-gray-800">
                  <Check className="mr-2 mt-1 flex-shrink-0 text-gray-700" size={20} />
                  <span>Advanced filters</span>
                </li>
                <li className="flex items-start text-gray-800">
                  <Check className="mr-2 mt-1 flex-shrink-0 text-gray-700" size={20} />
                  <span>Generation history</span>
                </li>
              </ul>
              <button 
                onClick={() => onNavigate('generator')} 
                className="w-full py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105"
              >
                Start Pro
              </button>
            </div>

            {/* Business Plan */}
            <div className="bg-gradient-to-br from-gray-400 via-gray-300 to-gray-500 rounded-2xl p-8 shadow-xl shadow-gray-700/50 hover:shadow-2xl hover:shadow-gray-600/50 transition-all duration-300 hover:scale-105">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Business</h3>
              <div className="flex items-baseline mb-4">
                <span className="text-5xl font-bold text-gray-900">$99</span>
                <span className="text-gray-700 ml-2">/month</span>
              </div>
              <p className="text-gray-700 mb-6">For teams & agencies</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start text-gray-800">
                  <Check className="mr-2 mt-1 flex-shrink-0 text-gray-700" size={20} />
                  <span>Unlimited ideas</span>
                </li>
                <li className="flex items-start text-gray-800">
                  <Check className="mr-2 mt-1 flex-shrink-0 text-gray-700" size={20} />
                  <span>Everything in Pro</span>
                </li>
                <li className="flex items-start text-gray-800">
                  <Check className="mr-2 mt-1 flex-shrink-0 text-gray-700" size={20} />
                  <span>Team collaboration (5 users)</span>
                </li>
                <li className="flex items-start text-gray-800">
                  <Check className="mr-2 mt-1 flex-shrink-0 text-gray-700" size={20} />
                  <span>API access</span>
                </li>
                <li className="flex items-start text-gray-800">
                  <Check className="mr-2 mt-1 flex-shrink-0 text-gray-700" size={20} />
                  <span>White-label exports</span>
                </li>
              </ul>
              <button className="w-full py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105">
                Contact Sales
              </button>
            </div>

          </div>

          {/* FAQ Section */}
          <div className="mt-20 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-gray-300 via-gray-100 to-gray-400 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-6 border border-gray-700/50">
                <h3 className="text-xl font-semibold text-gray-200 mb-2">Can I change plans later?</h3>
                <p className="text-gray-400">Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
              </div>
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-6 border border-gray-700/50">
                <h3 className="text-xl font-semibold text-gray-200 mb-2">What payment methods do you accept?</h3>
                <p className="text-gray-400">We accept all major credit cards, debit cards, and PayPal.</p>
              </div>
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-6 border border-gray-700/50">
                <h3 className="text-xl font-semibold text-gray-200 mb-2">Is there a free trial?</h3>
                <p className="text-gray-400">Yes! Our Starter plan is completely free with no credit card required. Try it risk-free.</p>
              </div>
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-6 border border-gray-700/50">
                <h3 className="text-xl font-semibold text-gray-200 mb-2">Can I cancel anytime?</h3>
                <p className="text-gray-400">Absolutely. Cancel your subscription at any time with no questions asked. No long-term contracts.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-500 text-sm mb-4">© 2025 IncDrops. All rights reserved.</p>
          <div className="flex justify-center space-x-6 text-sm">
            <button onClick={() => onNavigate('privacy')} className="text-gray-500 hover:text-gray-300 transition-colors">Privacy Policy</button>
            <button onClick={() => onNavigate('terms')} className="text-gray-500 hover:text-gray-300 transition-colors">Terms of Service</button>
            <button onClick={() => onNavigate('landing')} className="text-gray-500 hover:text-gray-300 transition-colors">Back to Home</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
