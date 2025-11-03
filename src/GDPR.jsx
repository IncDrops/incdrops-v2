import React from 'react';
import { ArrowLeft } from 'lucide-react';

export default function GDPR({ onNavigate }) {
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
          GDPR Compliance
        </h2>

        {/* Legal Text Container */}
        <div className="bg-gradient-to-br from-gray-300 via-gray-200 to-gray-400 rounded-2xl p-8 md:p-12 shadow-xl shadow-gray-700/50 text-gray-900 prose prose-lg max-w-none">
          <p className="lead">IncDrops is committed to the principles of data protection and privacy, including the General Data Protection Regulation (GDPR). This statement outlines our approach to ensuring compliance.</p>
          
          <h3>Our Commitment</h3>
          <p>We are committed to processing personal data in accordance with its responsibilities under the GDPR. We have implemented appropriate technical and organizational measures to ensure that user data is processed lawfully, fairly, and transparently.</p>

          <h3>Data Processing</h3>
          <p>As a data controller, we determine the purposes and means of processing your personal data when you use our Service. We process data to provide and improve our Service, manage user accounts, process payments, and communicate with users. Our legal basis for processing includes user consent, contractual necessity, and legitimate business interests.</p>
          <p>We also use third-party data processors (like our cloud provider and payment processor) who are also compliant with the GDPR and other applicable data protection laws.</p>

          <h3>Your Data Subject Rights</h3>
          <p>Under the GDPR, you have several rights with respect to your personal data. IncDrops is committed to upholding these rights. You have the right to:</p>
          <ul>
            <li><strong>Access Your Data:</strong> You can request a copy of the personal information we hold about you from your account settings.</li>
            <li><strong>Rectify Your Data:</strong> You can modify or update inaccurate personal information directly in your account settings.</li>
            <li><strong>Erase Your Data:</strong> You have the "right to be forgotten" and can request the permanent deletion of your account and all associated personal data.</li>
            <li><strong>Restrict Processing:</strong> You can request that we stop processing your data in certain circumstances.</li>
            <li><strong>Data Portability:</strong> You can request an export of your personal data in a machine-readable format.</li>
            <li><strong>Object to Processing:</strong> You can object to our processing of your data for marketing purposes at any time.</li>
          </ul>
          <p>To exercise any of these rights, please visit your account settings page or contact us at privacy@incdrops.com.</p>

          <h3>Data Protection Officer (DPO)</h3>
          <p>While not required for all organizations, we have appointed a data protection lead to oversee our privacy and data protection practices. For any GDPR-specific inquiries, you can contact them at privacy@incdrops.com.</p>

          <h3>Data Transfers</h3>
          <p>Information that we collect may be stored and processed in and transferred between any of the countries in which we operate to enable the use of the information in accordance with this policy. For users in the European Economic Area (EEA), we ensure that any transfers of personal data to countries outside the EEA are subject to appropriate safeguards, such as Standard Contractual Clauses (SCCs).</p>
        </div>
      </div>
    </div>
  );
}
