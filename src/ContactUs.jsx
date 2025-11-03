import React, { useState } from 'react';
import { ArrowLeft, Send, CheckCircle, AlertTriangle } from 'lucide-react';

export default function ContactUs({ onNavigate }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setStatus('error');
      return;
    }
    setStatus('sending');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
    }, 1500);
  };

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
        <h2 className="text-5xl font-bold mb-8 text-center bg-gradient-to-r from-gray-300 via-gray-100 to-gray-400 bg-clip-text text-transparent">
          Contact Us
        </h2>
        <p className="text-xl text-center text-gray-400 mb-12">
          Have a question or feedback? We'd love to hear from you.
        </p>

        {/* Contact Form Container */}
        <div className="bg-gradient-to-br from-gray-300 via-gray-200 to-gray-400 rounded-2xl p-8 md:p-12 shadow-xl shadow-gray-700/50">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Your Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/30 border border-gray-700 text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-900"
                placeholder="Jane Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Your Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/30 border border-gray-700 text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-900"
                placeholder="jane@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                className="w-full px-4 py-3 rounded-lg bg-white/30 border border-gray-700 text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-900"
                placeholder="How can we help you?"
              />
            </div>
            
            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full py-4 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              <Send size={20} />
              <span>{status === 'sending' ? 'Sending...' : 'Send Message'}</span>
            </button>

            {status === 'success' && (
              <div className="flex items-center space-x-2 text-green-800 bg-green-200 p-4 rounded-lg">
                <CheckCircle size={20} />
                <p>Message sent! Our team will get back to you soon.</p>
              </div>
            )}
            {status === 'error' && (
              <div className="flex items-center space-x-2 text-red-800 bg-red-200 p-4 rounded-lg">
                <AlertTriangle size={20} />
                <p>Please fill out all the fields.</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
