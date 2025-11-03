import React from 'react';
import { ArrowLeft } from 'lucide-react';

export default function Documentation({ onNavigate }) {
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
          Developer Documentation
        </h2>

        {/* Docs Container */}
        <div className="bg-gradient-to-br from-gray-300 via-gray-200 to-gray-400 rounded-2xl p-8 md:p-12 shadow-xl shadow-gray-700/50 text-gray-900 prose prose-lg max-w-none">
          
          <h3>Introduction</h3>
          <p>Welcome to the IncDrops API documentation. Our API allows you to integrate content idea generation directly into your applications, services, and workflows. Access is available to all subscribers on our Business plan.</p>

          <h3>Authentication</h3>
          <p>All API requests must be authenticated using an API key. You can generate your key from your account settings page.</p>
          <p>Include your API key in the `Authorization` header of your request:</p>
          <pre><code>Authorization: Bearer YOUR_API_KEY</code></pre>
          <p>Do not expose this key in any client-side code. All requests should be made from a secure backend server.</p>

          <h3>Endpoints</h3>
          
          <h4>POST /api/v1/generate</h4>
          <p>This is the primary endpoint for generating new content ideas. You must send a JSON body with your parameters.</p>
          
          <p><strong>Request Body:</strong></p>
          <ul>
            <li><code>contentType</code> (string, required): The type of content. e.g., 'social', 'blog', 'email'.</li>
            <li><code>industry</code> (string, optional): The industry focus.</li>
            <li><code>targetAudience</code> (string, optional): The target audience.</li>
            <li><code>services</code> (string, optional): The products/services to focus on.</li>
          </ul>

          <p><strong>Example Request (cURL):</strong></p>
          <pre><code>{`
curl -X POST 'https://api.incdrops.com/v1/generate' \\
-H 'Authorization: Bearer YOUR_API_KEY' \\
-H 'Content-Type: application/json' \\
-d '{
  "contentType": "blog",
  "industry": "SaaS",
  "targetAudience": "Product Managers"
}'
`}</code></pre>

          <p><strong>Example Response (200 OK):</strong></p>
          <pre><code>{`
{
  "success": true,
  "ideas": [
    {
      "id": "gen-12345",
      "title": "5 Ways Product Managers Can Use SaaS...",
      "description": "A deep dive into..."
      /* ...other fields */
    },
    // ... 7 more ideas
  ]
}
`}</code></pre>

          <h3>Rate Limits</h3>
          <p>The API is rate-limited to 1,000 requests per day (UTC) on the standard Business plan. Your response headers will include `X-RateLimit-Limit`, `X-RateLimit-Remaining`, and `X-RateLimit-Reset` to track your usage.</p>
        </div>
      </div>
    </div>
  );
}

