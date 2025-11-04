import React, { useState, useEffect, useMemo } from 'react';
import { Sparkles, Zap, TrendingUp, Users, Copy, Heart, RefreshCw, X, Filter, Loader2, Clock, Mic, Image, Video, FileText, Mail, ArrowLeft, Download, User } from 'lucide-react';

import { db } from './firebase';
import { doc, updateDoc, increment } from 'firebase/firestore'; 

export default function ContentGenerator({ onNavigate, user }) { // 'user' prop is now our source of truth
  const [formData, setFormData] = useState({
    industry: '',
    targetAudience: '',
    services: '',
    contentType: 'social',
  });

  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [currentTier, setCurrentTier] = useState('free');
  const [usage, setUsage] = useState({ month: '', count: 0 }); 

  const [generationHistory, setGenerationHistory] = useState([]);
  const [copiedId, setCopiedId] = useState(null);
  const [showSavedModal, setShowSavedModal] = useState(false);
  const [savedIdeas, setSavedIdeas] =useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [platformFilter, setPlatformFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [showStats, setShowStats] = useState(false);

  const tierLimits = {
    free: 5,
    basic: 50,
    pro: 200,
    business: Infinity
  };
  const maxIdeas = tierLimits[currentTier];

  const monthKey = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
  };

  // --- THIS useEffect IS NOW FIXED ---
  useEffect(() => {
    // THIS IS THE FIX: We wait for 'user' AND 'user.uid' to exist
    // This stops the crash on line 51
    if (user && user.uid) { 
      // 1. Set the user's tier
      setCurrentTier(user.tier || 'free');

      // 2. Set their usage count
      const mk = monthKey();
      const userUsage = user.usage || {}; 
      
      if (userUsage.month !== mk) {
        // User's saved month is old, reset their count
        setUsage({ month: mk, count: 0 });
        
        // This was the line (51) that was crashing. It's now safe.
        const userDocRef = doc(db, 'users', user.uid); 
        updateDoc(userDocRef, {
          usage: { month: mk, count: 0 }
        });
      } else {
        // Usage month is current, load it
        setUsage(userUsage);
      }
    }

    // 3. Load saved ideas & history from localStorage
    const savedStored = localStorage.getItem('incdrops_saved');
    if (savedStored) {
      try { setSavedIdeas(JSON.parse(savedStored)); } catch {}
    }
    const historyStored = localStorage.getItem('incdrops_history');
    if (historyStored) {
      try { setGenerationHistory(JSON.parse(historyStored)); } catch {}
    }
  }, [user]); // This effect re-runs whenever the user object changes

  const stats = useMemo(() => {
    const totalGenerated = generationHistory.reduce((acc, h) => acc + (h.ideas?.length || 0), 0);
    const platformsCount = {};
    const typesCount = {};
    generationHistory.forEach(h => {
      (h.ideas || []).forEach(idea => {
        (idea.platforms || []).forEach(p => {
          platformsCount[p] = (platformsCount[p] || 0) + 1;
        });
        const t = idea.type || 'unknown';
        typesCount[t] = (typesCount[t] || 0) + 1;
      });
    });
    const topPlatform = Object.entries(platformsCount).sort((a,b)=>b[1]-a[1])[0]?.[0] || 'N/A';
    const topType = Object.entries(typesCount).sort((a,b)=>b[1]-a[1])[0]?.[0] || 'N/A';
    return {
      totalGenerated,
      topPlatform,
      mostUsedType: topType,
      totalSessions: generationHistory.length
    };
  }, [generationHistory]);

  const contentTypes = [
    { id: 'social', name: 'Social Posts', icon: Sparkles },
    { id: 'blog', name: 'Blog Ideas', icon: Zap },
    { id: 'ads', name: 'Ad Copy', icon: TrendingUp },
    { id: 'email', name: 'Email Campaigns', icon: Mail },
    { id: 'video', name: 'Video Scripts', icon: Video },
    { id: 'podcast', name: 'Podcast Topics', icon: Mic },
    { id: 'infographic', name: 'Infographics', icon: Image },
    { id: 'whitepaper', name: 'Whitepapers', icon: FileText },
  ];

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // This is your working "flawless" API call, it needs no changes
  const callGeminiAPI = async (formData) => {
    const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
    if (!GEMINI_API_KEY) {
      alert('API Key is missing. Please add VITE_GEMINI_API_KEY to your Vercel project settings.');
      return { success: false, error: 'API key not configured' };
    }
    const MODEL = 'gemini-2.0-flash-exp'; 
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
    const { industry, targetAudience, services, contentType } = formData;
    
    const prompt = `
      You are an expert content marketing strategist. Generate 5 content ideas based on the following inputs.
      Return the ideas as a valid JSON array. Do NOT include any text before or after the JSON array.

      Each idea in the array should be an object with this exact structure:
      {
        "title": "A catchy, short title for the content",
        "description": "A 2-3 sentence detailed description of the content idea, explaining the angle and value.",
        "platforms": ["Platform 1", "Platform 2"],
        "hashtags": ["#hashtag1", "#hashtag2"],
        "type": "${contentType || 'social'}"
      }

      Here is the user's data:
      - Industry: ${industry || 'general business'}
      - Target Audience: ${targetAudience || 'general audience'}
      - Services/Products: ${services || 'various products'}
      - Content Type: ${contentType || 'social post'}
    `;
    
    try {
      const response = await fetch(`${API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { maxOutputTokens: 2000, temperature: 0.7 }
        })
      });
      if (!response.ok) throw new Error(`API Error: ${response.status}`);
      const data = await response.json();
      let text = data.candidates[0].content.parts[0].text;

      let parsed = [];
      try {
        const match = text.match(/\[[\s\S]*\]/); 
        if (match) {
          parsed = JSON.parse(match[0]);
        } else {
          throw new Error("No JSON array found in AI response");
        }
      } catch (parseError) {
        console.error("Failed to parse JSON from AI, response was:", text);
        parsed = Array.from({ length: 5 }).map((_, i) => ({
          id: `${Date.now()}-${i}`,
          title: `Idea ${i + 1} for ${formData.industry || 'your brand'}`,
          description: `A quick concept targeting ${formData.targetAudience || 'your audience'}.`,
          platforms: ['Instagram', 'TikTok'].slice(0, (i % 2) + 1),
          hashtags: ['#growth', '#brand'].slice(0, (i % 2) + 1),
          type: formData.contentType || 'social',
        }));
      }

      const ideas = parsed.map((it, i) => ({ 
          ...it, 
          id: it.id || `${Date.now()}-${i}`,
          timestamp: new Date().toISOString(),
          contentType: contentType
      }));
      
      return { success: true, ideas };

    } catch (error) {
      console.error('Gemini API Error:', error);
      return { success: false, error: error.message };
    }
  };

  // This function is also now safe because 'user.uid' will exist
  const handleSubmit = async (e) => {
    e.preventDefault();
    const mk = monthKey();

    if (usage.month !== mk) {
      setUsage({ month: mk, count: 0 });
    }
    
    if (usage.count >= maxIdeas) {
      alert(`You've reached your monthly limit (${maxIdeas}). Upgrade your tier for more generations!`);
      return;
    }

    setLoading(true);
    const result = await callGeminiAPI(formData); 
    setLoading(false);

    if (result.success) {
      setIdeas(result.ideas); 
      
      const newUsageCount = usage.count + 1;
      const newUsage = { month: mk, count: newUsageCount };
      setUsage(newUsage);

      // This is safe now
      if (user && user.uid) { 
        const userDocRef = doc(db, 'users', user.uid);
        updateDoc(userDocRef, {
          "usage.month": mk,
          "usage.count": increment(1)
        }).catch(err => {
          console.error("Failed to update usage count in Firestore: ", err);
        });
      }

      const newHistoryEntry = {
        ts: Date.now(),
        form: { ...formData },
        ideas: result.ideas,
      };
      const updatedHistory = [newHistoryEntry, ...generationHistory].slice(0, 50);
      setGenerationHistory(updatedHistory);
      localStorage.setItem('incdrops_history', JSON.stringify(updatedHistory));
    } else {
      alert(result.error || 'Error generating ideas. Please try again.');
    }
  };

  // --- ALL OTHER FUNCTIONS AND JSX ARE UNCHANGED ---

  const copyToClipboard = (idea) => {
    const text = `${idea.title}\n\n${idea.description}\n\nPlatforms: ${(idea.platforms || []).join(', ')}\n\nHashtags: ${(idea.hashtags || []).join(' ')}`;
    navigator.clipboard.writeText(text);
    setCopiedId(idea.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const saveIdea = (idea) => {
    const exists = savedIdeas.find(s => s.id === idea.id);
    const updated = exists
      ? savedIdeas.filter(s => s.id !== idea.id)
      : [...savedIdeas, idea];
    setSavedIdeas(updated);
    localStorage.setItem('incdrops_saved', JSON.stringify(updated));
  };

  const removeSavedIdea = (id) => {
    const updated = savedIdeas.filter(s => s.id !== id);
    setSavedIdeas(updated);
    localStorage.setItem('incdrops_saved', JSON.stringify(updated));
  };

  const exportToTXT = () => {
    if (savedIdeas.length === 0) return;
    let content = '====================================\n';
    content += '     INCDROPS - SAVED IDEAS\n';
    content += '====================================\n\n';
    savedIdeas.forEach((idea, index) => {
      content += `\n${'='.repeat(50)}\nIDEA #${index + 1}\n${'='.repeat(50)}\n\n`;
      content += `Title: ${idea.title}\n\nDescription:\n${idea.description}\n\n`;
      if (idea.platforms && idea.platforms.length > 0) content += `Platforms: ${idea.platforms.join(', ')}\n\n`;
      if (idea.hashtags && idea.hashtags.length > 0) content += `Hashtags: ${idea.hashtags.join(' ')}\n\n`;
      if (idea.type) content += `Type: ${idea.type}\n\n`;
    });
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `incdrops-saved-ideas.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportToCSV = () => {
    if (savedIdeas.length === 0) return;
    let csv = 'Title,Description,Platforms,Hashtags,Type\n';
    savedIdeas.forEach(idea => {
      const title = `"${(idea.title || '').replace(/"/g, '""')}"`;
      const description = `"${(idea.description || '').replace(/"/g, '""')}"`;
      const platforms = `"${(idea.platforms || []).join(', ')}"`;
      const hashtags = `"${(idea.hashtags || []).join(' ')}"`;
      const type = `"${idea.type || ''}"`;
      csv += `${title},${description},${platforms},${hashtags},${type}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `incdrops-saved-ideas.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportToJSON = () => {
    if (savedIdeas.length === 0) return;
    const exportData = { exportDate: new Date().toISOString(), totalIdeas: savedIdeas.length, ideas: savedIdeas };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `incdrops-saved-ideas.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportCurrentIdeas = (format) => {
    if (ideas.length === 0) return;
    if (format === 'txt') {
      let content = '====================================\n';
      content += '     INCDROPS - GENERATED IDEAS\n';
      content += '====================================\n\n';
      ideas.forEach((idea, index) => {
        content += `\n${'='.repeat(50)}\nIDEA #${index + 1}\n${'='.repeat(50)}\n\n`;
        content += `Title: ${idea.title}\n\nDescription:\n${idea.description}\n\n`;
        if (idea.platforms && idea.platforms.length > 0) content += `Platforms: ${idea.platforms.join(', ')}\n\n`;
        if (idea.hashtags && idea.hashtags.length > 0) content += `Hashtags: ${idea.hashtags.join(' ')}\n\n`;
      });
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `incdrops-ideas.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else if (format === 'csv') {
      let csv = 'Title,Description,Platforms,Hashtags,Type\n';
      ideas.forEach(idea => {
        const title = `"${(idea.title || '').replace(/"/g, '""')}"`;
        const description = `"${(idea.description || '').replace(/"/g, '""')}"`;
        const platforms = `"${(idea.platforms || []).join(', ')}"`;
        const hashtags = `"${(idea.hashtags || []).join(' ')}"`;
        const type = `"${idea.type || ''}"`;
        csv += `${title},${description},${platforms},${hashtags},${type}\n`;
      });
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `incdrops-ideas.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative">
      <div className="relative z-10">
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

          <div className="flex items-center space-x-3">
            <button
              onClick={() => onNavigate('account')}
              className="px-4 py-2 rounded-lg bg-gradient-to-br from-gray-400 via-gray-300 to-gray-500 text-gray-900 font-semibold hover:scale-105 transition-all duration-300"
            >
              <User size={18} className="inline mr-1" />
              Account
            </button>
            <button
              onClick={() => setShowStats(true)}
              className="px-4 py-2 rounded-lg bg-gradient-to-br from-gray-400 via-gray-300 to-gray-500 text-gray-900 font-semibold hover:scale-105 transition-all duration-300 shadow-xl shadow-gray-700/50 hover:shadow-2xl hover:shadow-gray-600/50"
            >
              Stats
            </button>
            <button
              onClick={() => setShowHistory(true)}
              className="px-4 py-2 rounded-lg bg-gradient-to-br from-gray-400 via-gray-300 to-gray-500 text-gray-900 font-semibold hover:scale-105 transition-all duration-300 shadow-xl shadow-gray-700/50 hover:shadow-2xl hover:shadow-gray-600/50"
            >
              <Clock size={18} className="inline mr-1" />
              History
            </button>
            <button
              onClick={() => setShowSavedModal(true)}
              className="px-4 py-2 rounded-lg bg-gradient-to-br from-gray-400 via-gray-300 to-gray-500 text-gray-900 font-semibold hover:scale-105 transition-all duration-300 shadow-xl shadow-gray-700/50 hover:shadow-2xl hover:shadow-gray-600/50 relative"
            >
              <Heart size={18} className="inline mr-1" />
              Saved ({savedIdeas.length})
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pb-3">
          <div className="text-sm text-gray-400">
            Usage this month: <span className="font-semibold text-gray-200">{usage.count}</span> / {maxIdeas === Infinity ? '∞' : maxIdeas}
            {currentTier !== 'business' && (
              <span className="ml-2 text-xs text-gray-500 capitalize">(Tier: {currentTier})</span>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-gray-300 via-gray-100 to-gray-400 bg-clip-text text-transparent">
            Generate Fresh Ideas
          </h2>
          <p className="text-xl text-gray-400">AI-powered content ideation in seconds</p>
        </div>

        <div className="bg-gradient-to-br from-gray-400 via-gray-300 to-gray-500 rounded-2xl p-8 mb-12 shadow-xl shadow-gray-700/50">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-3">Content Type</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {contentTypes.map((type) => {
                  const Icon = type.icon;
                  const isSelected = formData.contentType === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, contentType: type.id })}
                      className={`p-4 rounded-xl transition-all duration-300 ${
                        isSelected
                          ? 'bg-gray-900 text-white shadow-lg scale-105'
                          : 'bg-white/30 text-gray-800 hover:bg-white/50'
                      }`}
                    >
                      <Icon className="mx-auto mb-2" size={24} />
                      <div className="text-sm font-semibold">{type.name}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Industry</label>
                <input
                  type="text"
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  placeholder="e.g., Tech, Fashion, Food"
                  className="w-full px-4 py-3 rounded-lg bg-white/30 border border-gray-700 text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Target Audience</label>
                <input
                  type="text"
                  name="targetAudience"
                  value={formData.targetAudience}
                  onChange={handleInputChange}
                  placeholder="e.g., Gen Z, Professionals"
                  className="w-full px-4 py-3 rounded-lg bg-white/30 border border-gray-700 text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Services/Products</label>
                <input
                  type="text"
                  name="services"
                  value={formData.services}
                  onChange={handleInputChange}
                  placeholder="e.g., SaaS, E-commerce"
                  className="w-full px-4 py-3 rounded-lg bg-white/30 border border-gray-700 text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || usage.count >= maxIdeas}
              className="w-full py-4 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  <span>Generate Ideas</span>
                </>
              )}
            </button>
          </form>
        </div>

        <div>
          {loading && (
            <div className="text-center py-12">
              <Loader2 className="animate-spin mx-auto mb-4 text-gray-400" size={48} />
              <p className="text-gray-300">Generating your content ideas...</p>
            </div>
          )}

          {!loading && ideas.length === 0 && (
            <div className="text-center py-12 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 rounded-2xl border border-gray-700">
              <Sparkles size={48} className="mx-auto mb-4 text-gray-500" />
              <p className="text-gray-300">No ideas yet. Fill out the form above and click Generate!</p>
            </div>
          )}

          {!loading && ideas.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <h3 className="text-2xl font-bold text-white">Your Ideas ({ideas.length})</h3>
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => exportCurrentIdeas('txt')}
                    className="px-3 py-2 bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 rounded-lg text-white text-sm font-semibold transition-all duration-300 shadow-lg flex items-center gap-2"
                    title="Export current ideas as TXT"
                  >
                    <Download size={16} />
                    TXT
                  </button>
                  <button
                    onClick={() => exportCurrentIdeas('csv')}
                    className="px-3 py-2 bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 rounded-lg text-white text-sm font-semibold transition-all duration-300 shadow-lg flex items-center gap-2"
                    title="Export current ideas as CSV"
                  >
                    <Download size={16} />
                    CSV
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="px-4 py-2 rounded-lg bg-gradient-to-br from-gray-400 via-gray-300 to-gray-500 text-gray-900 font-semibold hover:scale-105 transition-all duration-300 shadow-xl shadow-gray-700/50 hover:shadow-2xl hover:shadow-gray-600/50 flex items-center space-x-2"
                    disabled={loading || usage.count >= maxIdeas}
                  >
                    <RefreshCw size={18} />
                    <span>Regenerate</span>
                  </button>
                </div>
              </div>

              {ideas.map((idea) => {
                const platforms = Array.isArray(idea.platforms) ? idea.platforms : [];
                const hashtags = Array.isArray(idea.hashtags) ? idea.hashtags : [];
                const isSaved = savedIdeas.some(s => s.id === idea.id);

                return (
                  <div
                    key={idea.id}
                    className="bg-gradient-to-br from-gray-400 via-gray-300 to-gray-500 rounded-2xl p-6 shadow-xl shadow-gray-700/50 hover:shadow-2xl hover:shadow-gray-600/50 transition-all duration-300 hover:scale-105"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900 flex-1">{idea.title}</h3>
                      <div className="flex space-x-2 ml-4">
                        <button
                          onClick={() => copyToClipboard(idea)}
                          className="relative p-2 hover:bg-white/30 rounded-lg transition-all duration-300 hover:scale-110"
                          title="Copy to clipboard"
                        >
                          <Copy size={18} className="text-gray-700 hover:text-gray-900" />
                          {copiedId === idea.id && (
                            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                              Copied!
                            </span>
                          )}
                        </button>
                        <button
                          onClick={() => saveIdea(idea)}
                          className="p-2 hover:bg-white/30 rounded-lg transition-all duration-300 hover:scale-110"
                          title={isSaved ? 'Remove from saved' : 'Save idea'}
                        >
                          <Heart size={18} className={isSaved ? 'text-pink-600 fill-pink-600' : 'text-gray-700 hover:text-gray-900'} />
                        </button>
                      </div>
                    </div>

                    <p className="text-gray-800 mb-4">{idea.description}</p>

                    {platforms.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-2">
                        <span className="text-xs text-gray-700 font-semibold">Platforms:</span>
                        {platforms.map((p, i) => (
                          <span key={i} className="px-3 py-1 bg-white/40 rounded-full text-xs text-gray-900 font-medium">{p}</span>
                        ))}
                      </div>
                    )}

                    {hashtags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {hashtags.map((tag, i) => (
                          <span key={i} className="text-sm text-gray-900 font-semibold">{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* All your modals (Saved, History, Stats) are unchanged and fine */}
      {showSavedModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6" onClick={() => setShowSavedModal(false)}>
          <div className="bg-gray-900 border border-gray-700 rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-100">Saved Ideas ({savedIdeas.length})</h2>
                <button onClick={() => setShowSavedModal(false)} className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                  <X size={24} className="text-gray-400" />
                </button>
              </div>
              
              {savedIdeas.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={exportToTXT}
                    className="px-4 py-2 bg-gradient-to-br from-gray-400 via-gray-300 to-gray-500 rounded-lg text-gray-900 font-semibold hover:scale-105 transition-all duration-300 shadow-lg flex items-center gap-2"
                  >
                    <Download size={18} />
                    Export TXT
                  </button>
                  <button
                    onClick={exportToCSV}
                    className="px-4 py-2 bg-gradient-to-br from-gray-400 via-gray-300 to-gray-500 rounded-lg text-gray-900 font-semibold hover:scale-105 transition-all duration-300 shadow-lg flex items-center gap-2"
                  >
                    <Download size={18} />
                    Export CSV
                  </button>
                  <button
                    onClick={exportToJSON}
                    className="px-4 py-2 bg-gradient-to-br from-gray-400 via-gray-300 to-gray-500 rounded-lg text-gray-900 font-semibold hover:scale-105 transition-all duration-300 shadow-lg flex items-center gap-2"
                  >
                    <Download size={18} />
                    Export JSON
                  </button>
                </div>
              )}
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              {savedIdeas.length === 0 ? (
                <div className="text-center py-12">
                  <Heart size={48} className="mx-auto mb-4 text-gray-500" />
                  <p className="text-gray-400">No saved ideas yet. Click the heart icon on any idea to save it!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {savedIdeas.map((idea) => (
                    <div key={idea.id} className="bg-gradient-to-br from-gray-400 via-gray-300 to-gray-500 rounded-xl p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold text-gray-900">{idea.title}</h3>
                        <div className="flex space-x-2">
                          <button onClick={() => removeSavedIdea(idea.id)} className="p-2 hover:bg-white/30 rounded-lg transition-all duration-300 hover:scale-110" title="Remove from saved">
                            <X size={18} className="text-red-600" />
                          </button>
                          <button onClick={() => copyToClipboard(idea)} className="relative p-2 hover:bg-white/30 rounded-lg transition-colors" title="Copy to clipboard">
                            <Copy size={18} className="text-gray-700 hover:text-gray-900" />
                            {copiedId === idea.id && (
                              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                                Copied!
                              </span>
                            )}
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-800 mb-4">{idea.description}</p>
                      {idea.platforms && idea.platforms.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="text-xs text-gray-700 font-semibold">Platforms:</span>
                          {idea.platforms.map((platform, i) => (
                            <span key={i} className="px-3 py-1 bg-white/40 rounded-full text-xs text-gray-900 font-medium">{platform}</span>
                          ))}
                        </div>
                      )}
                      {idea.hashtags && idea.hashtags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {idea.hashtags.map((tag, i) => (
                            <span key={i} className="text-sm text-gray-900 font-semibold">{tag}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {showHistory && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6" onClick={() => setShowHistory(false)}>
          <div className="bg-gray-900 border border-gray-700 rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-800 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-100">Generation History ({generationHistory.length})</h2>
              <button onClick={() => setShowHistory(false)} className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                <X size={24} className="text-gray-400" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {generationHistory.length === 0 ? (
                <div className="text-center py-12 text-gray-400">No history yet.</div>
              ) : generationHistory.map((h) => (
                <div key={h.ts} className="bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 border border-gray-700 rounded-xl p-5">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-400">
                      <span className="font-semibold">Session:</span> {new Date(h.ts).toLocaleString()}
                    </div>
                    <button
                      onClick={() => { setIdeas(h.ideas || []); setShowHistory(false); }}
                      className="px-3 py-1.5 rounded-lg bg-gradient-to-br from-gray-400 via-gray-300 to-gray-500 text-gray-900 font-semibold hover:scale-105 transition-all duration-300 text-sm"
                    >
                      Load ideas
                    </button>
                  </div>
                  <div className="mt-3 grid sm:grid-cols-2 gap-3">
                    {(h.ideas || []).slice(0, 4).map((idea) => (
                      <div key={idea.id} className="bg-gray-800 border border-gray-700 rounded-lg p-3">
                        <div className="font-semibold text-gray-100">{idea.title}</div>
                        <div className="text-xs text-gray-400 line-clamp-2">{idea.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showStats && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6" onClick={() => setShowStats(false)}>
          <div className="bg-gray-900 border border-gray-700 rounded-2xl max-w-2xl w-full overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-800 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-100">Usage Stats</h2>
              <button onClick={() => setShowStats(false)} className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                <X size={24} className="text-gray-400" />
              </button>
            </div>
            <div className="p-6 grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-gray-400 via-gray-300 to-gray-500 rounded-xl p-4">
                <div className="text-sm text-gray-700 font-semibold">Total Ideas Generated</div>
                <div className="text-2xl font-bold text-gray-900">{stats.totalGenerated}</div>
              </div>
              <div className="bg-gradient-to-br from-gray-400 via-gray-300 to-gray-500 rounded-xl p-4">
                <div className="text-sm text-gray-700 font-semibold">Total Sessions</div>
                <div className="text-2xl font-bold text-gray-900">{stats.totalSessions}</div>
              </div>
              <div className="bg-gradient-to-br from-gray-400 via-gray-300 to-gray-500 rounded-xl p-4">
                <div className="text-sm text-gray-700 font-semibold">Top Platform</div>
                <div className="text-2xl font-bold text-gray-900">{stats.topPlatform}</div>
              </div>
              <div className="bg-gradient-to-br from-gray-400 via-gray-300 to-gray-500 rounded-xl p-4">
                <div className="text-sm text-gray-700 font-semibold">Most Used Type</div>
                <div className="text-xl font-bold text-gray-900 capitalize">{stats.mostUsedType}</div>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}