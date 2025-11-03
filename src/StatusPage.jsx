import React from 'react';
import { ArrowLeft, CheckCircle, AlertTriangle, Clock } from 'lucide-react';

export default function StatusPage({ onNavigate }) {

  const systems = [
    { id: 'app', name: 'Web Application', status: 'operational' },
    { id: 'api', name: 'API Access', status: 'operational' },
    { id: 'generation', name: 'Content Generation Service', status: 'operational' },
    { id: 'billing', name: 'Billing and Subscriptions', status: 'maintenance' },
    { id: 'support', name: 'Support Tickets', status: 'degraded' },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'operational':
        return <CheckCircle size={24} className="text-green-400" />;
      case 'maintenance':
        return <Clock size={24} className="text-yellow-400" />;
      case 'degraded':
        return <AlertTriangle size={24} className="text-orange-400" />;
      default:
        return <AlertTriangle size={24} className="text-red-400" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'operational':
        return 'All Systems Operational';
      case 'maintenance':
        return 'Undergoing Scheduled Maintenance';
      case 'degraded':
        return 'Experiencing Degraded Performance';
      default:
        return 'Major Outage';
    }
  };

  const overallStatus = systems.every(s => s.status === 'operational') ? 'operational' : 'degraded';

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
          System Status
        </h2>

        {/* Overall Status */}
        <div className={`p-6 rounded-2xl mb-12 flex items-center space-x-4 ${overallStatus === 'operational' ? 'bg-green-900/50 border border-green-700' : 'bg-orange-900/50 border border-orange-700'}`}>
          {getStatusIcon(overallStatus)}
          <h3 className="text-2xl font-semibold text-white">{getStatusText(overallStatus)}</h3>
        </div>

        {/* System List */}
        <div className="space-y-4">
          {systems.map((system) => (
            <div key={system.id} className="bg-gray-900 border border-gray-700 rounded-2xl p-6 flex items-center justify-between shadow-xl">
              <span className="text-xl text-gray-200">{system.name}</span>
              <div className="flex items-center space-x-3">
                <span className={`text-lg font-semibold ${
                  system.status === 'operational' ? 'text-green-400' : 
                  system.status === 'maintenance' ? 'text-yellow-400' : 
                  system.status === 'degraded' ? 'text-orange-400' : 'text-red-400'
                }`}>
                  {system.status.charAt(0).toUpperCase() + system.status.slice(1)}
                </span>
                {getStatusIcon(system.status)}
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-500 mt-12">
          Last updated: November 2, 2025, 6:43 PM PST
        </p>

      </div>
    </div>
  );
}
