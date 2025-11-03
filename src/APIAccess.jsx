import React from 'react';
import { ArrowLeft, Key, Zap, Book } from 'lucide-react';

export default function APIAccess({ onNavigate }) {
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
          API Access
        </h2>
        
        <p className="text-xl text-center text-gray-400 mb-12">
          Integrate the power of IncDrops directly into your own applications.
        </p>

        <div className="space-y-8">
          {/* API Key Card */}
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 shadow-xl">
            <div className="flex items-center mb-4">
              <Key size={24} className="text-gray-400 mr-3" />
              <h3 className="text-2xl font-semibold text-white">Get Your API Key</h3>
            </div>
            <p className="text-gray-400 mb-6">
              API access is available on our Business plan. Once subscribed, you can generate and manage your API keys directly from your account settings.
            </p>
            <button 
              onClick={() => onNavigate('account')}
              className="px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:scale-105"
            >
              Go to Account Settings
            </button>
          </div>

          {/* Docs Card */}
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 shadow-xl">
            <div className="flex items-center mb-4">
              <Book size={24} className="text-gray-400 mr-3" />
              <h3 className="text-2xl font-semibold text-white">Full Documentation</h3>
            </div>
            <p className="text-gray-400 mb-6">
              Explore our comprehensive API documentation to learn about available endpoints, request parameters, and response formats.
            </p>
            <button 
              onClick={() => onNavigate('documentation')}
              className="px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:scale-105"
            >
              Read the Docs
            </button>
          </div>

          {/* Rate Limits Card */}
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 shadow-xl">
            <div className="flex items-center mb-4">
              <Zap size={24} className="text-gray-400 mr-3" />
              <h3 className="text-2xl font-semibold text-white">Rate Limits</h3>
            </div>
            <p className="text-gray-400">
              Our Business plan includes 1,000 API calls per day. For higher volume needs, please contact our sales team to discuss custom enterprise plans.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
