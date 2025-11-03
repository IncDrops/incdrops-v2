import React from 'react';
import { ArrowLeft } from 'lucide-react';

export default function CookiePolicy({ onNavigate }) {
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
          Cookie Policy
        </h2>

        {/* Legal Text Container */}
        <div className="bg-gradient-to-br from-gray-300 via-gray-200 to-gray-400 rounded-2xl p-8 md:p-12 shadow-xl shadow-gray-700/50 text-gray-900 prose prose-lg max-w-none">
          <p className="lead">Last updated: November 2, 2025</p>
          
          <p>This Cookie Policy explains how IncDrops ("us", "we", or "our") uses cookies and similar technologies when you visit our Website or use our App. It explains what these technologies are and why we use them, as well as your rights to control our use of them.</p>
          
          <h3>What Are Cookies?</h3>
          <p>Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.</p>

          <h3>Why Do We Use Cookies?</h3>
          <p>We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our Website and App to operate, and we refer to these as "essential" or "strictly necessary" cookies.</p>
          <p>Other cookies also enable us to track and target the interests of our users to enhance the experience on our Services. For example:</p>
          <ul>
            <li><strong>Authentication:</strong> We use cookies to verify your account and determine when you're logged in so we can make it easier for you to access the Services.</li>
            <li><strong>Analytics and Performance:</strong> We use cookies to collect information about how you interact with our Services and to help us improve them.</li>
            <li><strong>Preferences:</strong> We use cookies to remember your settings and preferences, such as your preferred language.</li>
          </ul>

          <h3>Types of Cookies We Use</h3>
          <ol>
            <li><strong>Strictly Necessary Cookies:</strong> These are essential for you to browse the website and use its features, such as accessing secure areas of the site.</li>
            <li><strong>Performance Cookies:</strong> These collect information about how you use our Website, like which pages you visited and which links you clicked on.</li>
            <li><strong>Functionality Cookies:</strong> These cookies allow us to remember choices you make when you use our Service.</li>
          </ol>

          <h3>How Can You Control Cookies?</h3>
          <p>You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by setting or amending your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted.</p>
          <p>Most browsers allow you to manage your cookie settings. These settings can usually be found in the "Settings", "Options" or "Preferences" menu of your browser.</p>

          <h3>Changes to This Policy</h3>
          <p>We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal or regulatory reasons. Please therefore re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.</p>
          
          <h3>Contact Us</h3>
          <p>If you have questions or comments about this policy, you may email us at support@incdrops.com.</p>
        </div>
      </div>
    </div>
  );
}
