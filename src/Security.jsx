import React from 'react';
import { ArrowLeft } from 'lucide-react';

export default function Security({ onNavigate }) {
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
          Security Overview
        </h2>

        {/* Legal Text Container */}
        <div className="bg-gradient-to-br from-gray-300 via-gray-200 to-gray-400 rounded-2xl p-8 md:p-12 shadow-xl shadow-gray-700/50 text-gray-900 prose prose-lg max-w-none">
          <p className="lead">At IncDrops, we take the security of your data seriously. We have implemented a variety of measures to ensure your information is protected, private, and available.</p>
          
          <h3>Data Encryption</h3>
          <p><strong>Encryption in Transit:</strong> All data transmitted between your device and our servers is encrypted using industry-standard TLS 1.2 or higher. We force HTTPS for all connections.</p>
          <p><strong>Encryption at Rest:</strong> Your personal data, account information, and generated content are encrypted at rest using AES-256 encryption.</p>

          <h3>Infrastructure Security</h3>
          <p>Our application and database infrastructure are hosted on secure, world-class cloud providers (e.g., Vercel, Google Cloud, AWS) that are SOC 2, ISO 27001, and GDPR compliant. Access to our production environment is strictly limited to authorized personnel.</p>

          <h3>Payment Processing</h3>
          <p>We do not store your full credit card information on our servers. All payment processing is handled by our third-party payment processor, Stripe, which is a certified PCI Level 1 Service Provider.</p>

          <h3>Account Security</h3>
          <p>We enforce strong password requirements for all user accounts. We recommend all users enable Two-Factor Authentication (2FA) if available, and use a unique, complex password for their IncDrops account.</p>

          <h3>Vulnerability Reporting</h3>
          <p>We are committed to working with security researchers to identify and resolve potential vulnerabilities. If you believe you have found a security issue in our Service, please contact us immediately at security@incdrops.com.</p>
          <p>Please do not publicly disclose the issue until we have had a chance to address it. We will make every effort to respond to your report promptly.</p>
          
          <h3>Compliance</h3>
          <p>We are actively working towards industry-standard compliance certifications to demonstrate our commitment to your data's security and privacy. For more information on our data privacy practices, please see our Privacy Policy and GDPR statement.</p>
        </div>
      </div>
    </div>
  );
}
