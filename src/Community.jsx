import React from 'react';
import { ArrowLeft, MessageSquare, Github, LifeBuoy } from 'lucide-react';

export default function Community({ onNavigate }) {

  const communities = [
    { 
      id: 'discord', 
      name: 'Discord Server', 
      description: 'Chat live with other creators, share tips, and get real-time help from the community.', 
      icon: MessageSquare,
      link: '#' 
    },
    { 
      id: 'forum', 
      name: 'Community Forum', 
      description: 'Ask long-form questions, post tutorials, and showcase what you\'ve built with IncDrops.', 
      icon: LifeBuoy,
      link: '#' 
    },
    { 
      id: 'github', 
      name: 'GitHub Discussions', 
      description: 'Report bugs, request features, and contribute to open-source projects.', 
      icon: Github,
      link: '#' 
    },
  ];

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
          Join the Community
        </h2>
        <p className="text-xl text-center text-gray-400 mb-12">
          Connect with other IncDrops users, share your creations, and get help.
        </p>

        {/* Community Links */}
        <div className="space-y-8">
          {communities.map((item) => (
            <a 
              key={item.id}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-900 border border-gray-700 rounded-2xl p-8 shadow-xl hover:shadow-gray-700/50 hover:border-gray-600 transition-all duration-300 flex items-start space-x-6"
            >
              <div className="p-4 bg-gray-800 rounded-xl">
                <item.icon size={32} className="text-gray-300" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-white mb-2">{item.name}</h3>
                <p className="text-gray-400 text-lg">{item.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
