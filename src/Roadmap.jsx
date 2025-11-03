import React from 'react';
import { ArrowLeft, Lightbulb, Rocket, CheckCircle } from 'lucide-react';

export default function Roadmap({ onNavigate }) {

  const roadmap = {
    planned: [
      { id: 'p1', title: 'Advanced Analytics', description: 'Track idea performance and engagement.' },
      { id: 'p2', title: 'AI Image Generation', description: 'Create accompanying images for social posts.' },
      { id: 'p3', title: 'Team Workspaces', description: 'Collaborate with your team on content calendars.' },
    ],
    inProgress: [
      { id: 'i1', title: 'Zapier Integration', description: 'Connecting IncDrops to 5,000+ apps.' },
      { id: 'i2', title: 'Content Scheduler', description: 'Schedule your posts directly from the app.' },
    ],
    launched: [
      { id: 'l1', title: 'Generation History', description: 'View and reload past idea generation sessions.' },
      { id: 'l2', title: 'Export to CSV/TXT', description: 'Easily export your saved ideas.' },
    ],
  };

  const RoadmapColumn = ({ title, icon: Icon, items }) => (
    <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 flex-1">
      <div className="flex items-center mb-6">
        <Icon className="text-gray-400 mr-3" size={24} />
        <h3 className="text-2xl font-semibold text-white">{title}</h3>
      </div>
      <div className="space-y-4">
        {items.map(item => (
          <div key={item.id} className="bg-gray-800 border border-gray-700 rounded-lg p-4 shadow-lg">
            <h4 className="font-semibold text-gray-100">{item.title}</h4>
            <p className="text-sm text-gray-400">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );

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
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-5xl font-bold mb-8 text-center bg-gradient-to-r from-gray-300 via-gray-100 to-gray-400 bg-clip-text text-transparent">
          Public Roadmap
        </h2>
        <p className="text-xl text-center text-gray-400 mb-12">
          See what we're building next and suggest features.
        </p>

        {/* Roadmap Columns */}
        <div className="flex flex-col md:flex-row gap-8">
          <RoadmapColumn title="Planned" icon={Lightbulb} items={roadmap.planned} />
          <RoadmapColumn title="In Progress" icon={Rocket} items={roadmap.inProgress} />
          <RoadmapColumn title="Launched" icon={CheckCircle} items={roadmap.launched} />
        </div>
      </div>
    </div>
  );
}
