import React from 'react';
import { ArrowLeft, Scale, FileText, Shield, AlertCircle } from 'lucide-react';

export default function TermsOfService({ onNavigate }) {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-gray-800">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <button 
            onClick={() => onNavigate('landing')}
            className="flex items-center space-x-2 text-gray-800 hover:text-gray-900 font-medium transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </button>
          <h1 className="text-xl font-bold bg-gradient-to-r from-gray-300 via-gray-100 to-gray-400 bg-clip-text text-transparent">
            IncDrops
          </h1>
        </div>
      </nav>

      {/* Header */}
      <header className="pt-20 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-gray-400 via-gray-300 to-gray-500 rounded-2xl mb-6 shadow-xl">
            <Scale className="text-gray-900" size={40} />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-300 via-gray-100 to-gray-400 bg-clip-text text-transparent">
            Terms of Service
          </h1>
          <p className="text-xl text-gray-400 mb-4">
            Last updated: January 1, 2025
          </p>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Please read these terms carefully before using IncDrops. By accessing or using our service, you agree to be bound by these terms.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          
          {/* Quick Links */}
          <div className="bg-gradient-to-br from-gray-400 via-gray-300 to-gray-500 rounded-2xl p-8 mb-12 border border-gray-600 shadow-xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <FileText className="mr-3 text-gray-700" size={24} />
              Quick Navigation
            </h2>
            <div className="grid md:grid-cols-2 gap-3 text-sm">
              <a href="#acceptance" className="text-gray-800 hover:text-gray-900 font-medium transition-colors">1. Acceptance of Terms</a>
              <a href="#services" className="text-gray-800 hover:text-gray-900 font-medium transition-colors">2. Description of Services</a>
              <a href="#account" className="text-gray-800 hover:text-gray-900 font-medium transition-colors">3. Account Registration</a>
              <a href="#subscription" className="text-gray-800 hover:text-gray-900 font-medium transition-colors">4. Subscription & Billing</a>
              <a href="#usage" className="text-gray-800 hover:text-gray-900 font-medium transition-colors">5. Acceptable Use Policy</a>
              <a href="#intellectual" className="text-gray-800 hover:text-gray-900 font-medium transition-colors">6. Intellectual Property</a>
              <a href="#content" className="text-gray-800 hover:text-gray-900 font-medium transition-colors">7. User-Generated Content</a>
              <a href="#termination" className="text-gray-800 hover:text-gray-900 font-medium transition-colors">8. Termination</a>
              <a href="#warranties" className="text-gray-800 hover:text-gray-900 font-medium transition-colors">9. Disclaimers & Warranties</a>
              <a href="#limitation" className="text-gray-800 hover:text-gray-900 font-medium transition-colors">10. Limitation of Liability</a>
              <a href="#indemnification" className="text-gray-800 hover:text-gray-900 font-medium transition-colors">11. Indemnification</a>
              <a href="#changes" className="text-gray-800 hover:text-gray-900 font-medium transition-colors">12. Changes to Terms</a>
            </div>
          </div>

          {/* Terms Sections */}
          <div className="space-y-8">
            
            {/* Section 1 */}
            <section id="acceptance" className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-8">
              <h2 className="text-3xl font-bold text-gray-100 mb-4">1. Acceptance of Terms</h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  By accessing and using IncDrops ("the Service"), you accept and agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not access or use the Service.
                </p>
                <p>
                  These Terms apply to all visitors, users, and others who access or use the Service. We reserve the right to update and change these Terms at any time without notice.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section id="services" className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-8">
              <h2 className="text-3xl font-bold text-gray-100 mb-4">2. Description of Services</h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  IncDrops is an AI-powered content ideation platform that helps creators generate ideas for social media posts, blog articles, ad campaigns, email newsletters, video scripts, and more.
                </p>
                <p>
                  We offer various subscription tiers with different feature sets and usage limits. The Service may be modified, updated, interrupted, or discontinued at any time without notice or liability.
                </p>
              </div>
            </section>

            {/* Section 3 */}
            <section id="account" className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-8">
              <h2 className="text-3xl font-bold text-gray-100 mb-4">3. Account Registration</h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  To access certain features of the Service, you must register for an account. When registering, you agree to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide accurate, current, and complete information</li>
                  <li>Maintain and promptly update your account information</li>
                  <li>Maintain the security of your password and account</li>
                  <li>Notify us immediately of any unauthorized use of your account</li>
                  <li>Accept responsibility for all activities that occur under your account</li>
                </ul>
                <p>
                  You must be at least 18 years old to use the Service. Accounts registered by "bots" or other automated methods are not permitted.
                </p>
              </div>
            </section>

            {/* Section 4 */}
            <section id="subscription" className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-8">
              <h2 className="text-3xl font-bold text-gray-100 mb-4">4. Subscription & Billing</h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  <strong className="text-gray-300">Subscription Plans:</strong> We offer free and paid subscription plans with varying features and usage limits. Paid subscriptions are billed on a monthly basis unless otherwise specified.
                </p>
                <p>
                  <strong className="text-gray-300">Automatic Renewal:</strong> Your subscription will automatically renew at the end of each billing period unless you cancel before the renewal date. You authorize us to charge your payment method for the renewal.
                </p>
                <p>
                  <strong className="text-gray-300">Cancellation:</strong> You may cancel your subscription at any time through your account settings. Cancellation will take effect at the end of your current billing period. No refunds will be provided for partial months.
                </p>
                <p>
                  <strong className="text-gray-300">Price Changes:</strong> We reserve the right to change our subscription prices. We will notify you of any price changes at least 30 days in advance.
                </p>
                <p>
                  <strong className="text-gray-300">Payment Information:</strong> You must provide current, complete, and accurate billing information. You must promptly update all payment information to keep it current, complete, and accurate.
                </p>
              </div>
            </section>

            {/* Section 5 */}
            <section id="usage" className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-8">
              <h2 className="text-3xl font-bold text-gray-100 mb-4">5. Acceptable Use Policy</h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  You agree not to use the Service to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Violate any laws or regulations</li>
                  <li>Infringe on any third party's intellectual property rights</li>
                  <li>Generate content that is harmful, threatening, abusive, harassing, defamatory, or otherwise objectionable</li>
                  <li>Generate spam, phishing attempts, or malicious content</li>
                  <li>Attempt to gain unauthorized access to the Service or related systems</li>
                  <li>Interfere with or disrupt the Service or servers</li>
                  <li>Use automated means to access the Service without permission</li>
                  <li>Resell or redistribute the Service without authorization</li>
                  <li>Reverse engineer, decompile, or disassemble any part of the Service</li>
                </ul>
                <p>
                  We reserve the right to investigate and take appropriate action against anyone who violates this policy, including removing content, suspending or terminating accounts, and reporting to law enforcement.
                </p>
              </div>
            </section>

            {/* Section 6 */}
            <section id="intellectual" className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-8">
              <h2 className="text-3xl font-bold text-gray-100 mb-4">6. Intellectual Property</h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  The Service and its original content, features, and functionality are owned by IncDrops and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
                </p>
                <p>
                  Our trademarks, logos, and service marks displayed on the Service are our property or the property of third parties. You are not permitted to use these marks without our prior written consent or the consent of the third party owner.
                </p>
              </div>
            </section>

            {/* Section 7 */}
            <section id="content" className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-8">
              <h2 className="text-3xl font-bold text-gray-100 mb-4">7. User-Generated Content</h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  <strong className="text-gray-300">Ownership:</strong> You retain all ownership rights to content you input into the Service and content generated through your use of the Service. You are solely responsible for all content you create using our Service.
                </p>
                <p>
                  <strong className="text-gray-300">License to IncDrops:</strong> By using the Service, you grant us a limited, non-exclusive, royalty-free license to store, process, and display your input data solely for the purpose of providing the Service to you and improving our AI models.
                </p>
                <p>
                  <strong className="text-gray-300">Content Responsibility:</strong> You are responsible for ensuring that your use of AI-generated content complies with all applicable laws and does not infringe on any third-party rights. We do not claim ownership of AI-generated content.
                </p>
              </div>
            </section>

            {/* Section 8 */}
            <section id="termination" className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-8">
              <h2 className="text-3xl font-bold text-gray-100 mb-4">8. Termination</h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  We may terminate or suspend your account and access to the Service immediately, without prior notice or liability, for any reason, including if you breach these Terms.
                </p>
                <p>
                  Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may do so by discontinuing use of the Service and canceling your subscription.
                </p>
                <p>
                  All provisions of these Terms which by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
                </p>
              </div>
            </section>

            {/* Section 9 */}
            <section id="warranties" className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-8">
              <h2 className="text-3xl font-bold text-gray-100 mb-4">9. Disclaimers & Warranties</h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p className="uppercase font-semibold text-gray-300">
                  THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.
                </p>
                <p>
                  We do not warrant that:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>The Service will function uninterrupted, secure, or error-free</li>
                  <li>Defects will be corrected</li>
                  <li>The Service is free of viruses or harmful components</li>
                  <li>The results of using the Service will meet your requirements</li>
                  <li>AI-generated content will be accurate, complete, or suitable for your purposes</li>
                </ul>
                <p>
                  You acknowledge that AI-generated content may contain errors, inaccuracies, or inappropriate material. You are responsible for reviewing and verifying all generated content before use.
                </p>
              </div>
            </section>

            {/* Section 10 */}
            <section id="limitation" className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-8">
              <h2 className="text-3xl font-bold text-gray-100 mb-4">10. Limitation of Liability</h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p className="uppercase font-semibold text-gray-300">
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, INCDROPS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES.
                </p>
                <p>
                  Our total liability to you for any damages arising from or related to these Terms or the Service shall not exceed the amount you have paid us in the twelve (12) months prior to the event giving rise to the liability, or $100, whichever is greater.
                </p>
              </div>
            </section>

            {/* Section 11 */}
            <section id="indemnification" className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-8">
              <h2 className="text-3xl font-bold text-gray-100 mb-4">11. Indemnification</h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  You agree to defend, indemnify, and hold harmless IncDrops and its affiliates, officers, directors, employees, and agents from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees arising out of or relating to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Your violation of these Terms</li>
                  <li>Your use of the Service</li>
                  <li>Your content or AI-generated content you create using the Service</li>
                  <li>Your violation of any third-party rights</li>
                </ul>
              </div>
            </section>

            {/* Section 12 */}
            <section id="changes" className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-8">
              <h2 className="text-3xl font-bold text-gray-100 mb-4">12. Changes to Terms</h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  We reserve the right to modify or replace these Terms at any time at our sole discretion. If we make material changes, we will notify you by email or by posting a notice on the Service prior to the changes taking effect.
                </p>
                <p>
                  Your continued use of the Service after any changes to these Terms constitutes acceptance of those changes. If you do not agree to the new Terms, you must stop using the Service.
                </p>
              </div>
            </section>

            {/* Contact Section */}
            <section className="bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl p-8 border border-gray-600 shadow-xl">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <AlertCircle className="text-gray-300" size={32} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">Questions About These Terms?</h2>
                  <p className="text-gray-400 mb-4">
                    If you have any questions about these Terms of Service, please contact us at:
                  </p>
                  <div className="space-y-2 text-gray-400">
                    <p><strong className="text-gray-300">Email:</strong> legal@incdrops.com</p>
                    <p><strong className="text-gray-300">Address:</strong> IncDrops Legal Team, 123 AI Street, San Francisco, CA 94105</p>
                  </div>
                </div>
              </div>
            </section>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-500 text-sm mb-4">© 2025 IncDrops. All rights reserved.</p>
          <div className="flex justify-center space-x-6 text-sm">
            <button onClick={() => onNavigate('privacy')} className="text-gray-500 hover:text-gray-300 transition-colors">Privacy Policy</button>
            <button onClick={() => onNavigate('terms')} className="text-gray-400 font-semibold">Terms of Service</button>
            <button onClick={() => onNavigate('landing')} className="text-gray-500 hover:text-gray-300 transition-colors">Back to Home</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
