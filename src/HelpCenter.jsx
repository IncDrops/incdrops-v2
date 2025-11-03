import React from 'react';
import { ArrowLeft } from 'lucide-react';

export default function HelpCenter({ onNavigate }) {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 backdrop-blur-md sticky top-0 z-40 bg-black/80">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onNavigate('landing')}
              className="p-2 hover:bg-gray-800 rounded-lg transition-all duration-300 hover:scale-110"
              title="Back to home"
            >
              <ArrowLeft size={24} className="text-gray-400 hover:text-gray-200" />
            </button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-300 via-gray-100 to-gray-400 bg-clip-text text-transparent">
              IncDrops
            </h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-gray-300 via-gray-100 to-gray-400 bg-clip-text text-transparent">
          Help Center
        </h2>

        {/* Search Bar */}
        <div className="mb-12">
          <input
            type="search"
            placeholder="Search for articles..."
            className="w-full px-6 py-4 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>

        {/* FAQ Container */}
        <div className="bg-gradient-to-br from-gray-300 via-gray-200 to-gray-400 rounded-2xl p-8 md:p-12 shadow-xl shadow-gray-700/50 text-gray-900 prose prose-lg max-w-none">
          
          <h3>Frequently Asked Questions</h3>

          <h4>Getting Started</h4>
          <p><strong>How do I generate my first idea?</strong><br />
          Simply fill out the "Industry", "Target Audience", and "Services" fields on the generator page, select a content type, and click "Generate Ideas". Your first 8 concepts will appear below!</p>
          <p><strong>What do the different plans include?</strong><br />
          Our plans vary by the number of ideas you can generate per month and access to premium features like generation history and advanced content types. Check our "Pricing" section for a full breakdown.</p>

          <h4>Account & Billing</h4>
          <p><strong>How do I upgrade or downgrade my subscription?</strong><br />
          You can manage your subscription at any time from your "Account" page. Changes will be prorated and take effect immediately.</p>
          <p><strong>How do I cancel my subscription?</strong><br />
          You can cancel your subscription from your "Account" page. You will retain access to your plan's features until the end of your current billing cycle.</p>
          
          <h4>Using the App</h4>
          <p><strong>How do I save an idea?</strong><br />
          Click the "Heart" icon on any idea card to save it. You can view all your saved ideas by clicking the "Saved" button in the header.</p>
          <p><strong>How do I export my ideas?</strong><br />
          From the "Saved" ideas modal, you can export all your saved ideas to TXT, CSV, or JSON formats using the buttons at the top.</p>
          
          <hr />
          <p className="text-center">
            Can't find an answer? <button onClick={() => onNavigate('contact')} className="font-bold text-gray-800 hover:text-black">Contact our support team</button>.
          </p>
        </div>
      </div>
    </div>
  );
}
