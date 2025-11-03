import React from 'react';
import { ArrowLeft, Shield, Lock, Eye, Database, UserCheck, Globe } from 'lucide-react';

export default function PrivacyPolicy({ onNavigate }) {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-gray-800">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <button 
            onClick={() => onNavigate('landing')}
            className="flex items-center space-x-2 text-gray-400 hover:text-gray-200 transition-colors"
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
            <Shield className="text-gray-900" size={40} />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-300 via-gray-100 to-gray-400 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-800 mb-4">
            Last updated: January 1, 2025
          </p>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          
          {/* Key Points */}
          <div className="bg-gradient-to-br from-gray-400 via-gray-300 to-gray-500 rounded-2xl p-8 mb-12 border border-gray-600 shadow-xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Privacy at a Glance</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <Lock className="text-gray-700 flex-shrink-0 mt-1" size={20} />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Secure Data</h3>
                  <p className="text-sm text-gray-800">We use industry-standard encryption to protect your information</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Eye className="text-gray-700 flex-shrink-0 mt-1" size={20} />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Transparent Usage</h3>
                  <p className="text-sm text-gray-800">We're clear about what data we collect and why</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <UserCheck className="text-gray-700 flex-shrink-0 mt-1" size={20} />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Your Control</h3>
                  <p className="text-sm text-gray-800">You can access, modify, or delete your data anytime</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Globe className="text-gray-700 flex-shrink-0 mt-1" size={20} />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">GDPR Compliant</h3>
                  <p className="text-sm text-gray-800">We comply with international privacy regulations</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="bg-gradient-to-br from-gray-400 via-gray-300 to-gray-500 rounded-2xl p-8 mb-12 border border-gray-600 shadow-xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Database className="mr-3 text-gray-700" size={24} />
              Quick Navigation
            </h2>
            <div className="grid md:grid-cols-2 gap-3 text-sm">
              <a href="#information" className="text-gray-800 hover:text-gray-900 transition-colors font-medium">1. Information We Collect</a>
              <a href="#usage" className="text-gray-800 hover:text-gray-900 transition-colors font-medium">2. How We Use Your Information</a>
              <a href="#sharing" className="text-gray-800 hover:text-gray-900 transition-colors font-medium">3. Information Sharing</a>
              <a href="#cookies" className="text-gray-800 hover:text-gray-900 transition-colors font-medium">4. Cookies & Tracking</a>
              <a href="#security" className="text-gray-800 hover:text-gray-900 transition-colors font-medium">5. Data Security</a>
              <a href="#retention" className="text-gray-800 hover:text-gray-900 transition-colors font-medium">6. Data Retention</a>
              <a href="#rights" className="text-gray-800 hover:text-gray-900 transition-colors font-medium">7. Your Privacy Rights</a>
              <a href="#international" className="text-gray-800 hover:text-gray-900 transition-colors font-medium">8. International Data Transfers</a>
              <a href="#children" className="text-gray-800 hover:text-gray-900 transition-colors font-medium">9. Children's Privacy</a>
              <a href="#changes" className="text-gray-800 hover:text-gray-900 transition-colors font-medium">10. Changes to This Policy</a>
            </div>
          </div>

          {/* Privacy Sections */}
          <div className="space-y-8">
            
            {/* Section 1 */}
            <section id="information" className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-8">
              <h2 className="text-3xl font-bold text-gray-100 mb-4">1. Information We Collect</h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  We collect several types of information to provide and improve our Service:
                </p>
                
                <div className="mt-4">
                  <h3 className="text-xl font-semibold text-gray-200 mb-2">Account Information</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Name and email address</li>
                    <li>Password (encrypted)</li>
                    <li>Profile information you choose to provide</li>
                    <li>Billing information (processed securely through third-party payment processors)</li>
                  </ul>
                </div>

                <div className="mt-4">
                  <h3 className="text-xl font-semibold text-gray-200 mb-2">Usage Information</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Content you input into the Service (prompts, industry selections, etc.)</li>
                    <li>Ideas and content generated through the Service</li>
                    <li>Features you use and how you interact with the Service</li>
                    <li>Saved favorites and content history</li>
                  </ul>
                </div>

                <div className="mt-4">
                  <h3 className="text-xl font-semibold text-gray-200 mb-2">Technical Information</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>IP address and device information</li>
                    <li>Browser type and version</li>
                    <li>Operating system</li>
                    <li>Access times and referring URLs</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </div>

                <div className="mt-4">
                  <h3 className="text-xl font-semibold text-gray-200 mb-2">Communication Information</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Support requests and correspondence</li>
                    <li>Survey responses</li>
                    <li>Feedback you provide</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section id="usage" className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-8">
              <h2 className="text-3xl font-bold text-gray-100 mb-4">2. How We Use Your Information</h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  We use the collected information for various purposes:
                </p>
                
                <div className="mt-4">
                  <h3 className="text-xl font-semibold text-gray-200 mb-2">Service Delivery</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>To provide and maintain the Service</li>
                    <li>To generate AI-powered content ideas based on your inputs</li>
                    <li>To personalize your experience</li>
                    <li>To manage your account and subscription</li>
                  </ul>
                </div>

                <div className="mt-4">
                  <h3 className="text-xl font-semibold text-gray-200 mb-2">Communication</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>To send you service-related notifications</li>
                    <li>To respond to your support requests</li>
                    <li>To send you updates about new features (you can opt out)</li>
                    <li>To send marketing communications (with your consent)</li>
                  </ul>
                </div>

                <div className="mt-4">
                  <h3 className="text-xl font-semibold text-gray-200 mb-2">Improvement & Analytics</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>To improve and optimize our Service</li>
                    <li>To train and improve our AI models</li>
                    <li>To analyze usage patterns and trends</li>
                    <li>To detect and prevent technical issues</li>
                  </ul>
                </div>

                <div className="mt-4">
                  <h3 className="text-xl font-semibold text-gray-200 mb-2">Legal & Security</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>To comply with legal obligations</li>
                    <li>To enforce our Terms of Service</li>
                    <li>To protect against fraud and abuse</li>
                    <li>To ensure security of the Service</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section id="sharing" className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-8">
              <h2 className="text-3xl font-bold text-gray-100 mb-4">3. Information Sharing</h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  We do not sell your personal information. We may share your information in the following circumstances:
                </p>
                
                <div className="mt-4">
                  <h3 className="text-xl font-semibold text-gray-200 mb-2">Service Providers</h3>
                  <p>
                    We work with third-party service providers who perform services on our behalf, such as:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                    <li>Cloud hosting providers (for data storage and processing)</li>
                    <li>Payment processors (for billing and subscription management)</li>
                    <li>Email service providers (for communications)</li>
                    <li>Analytics providers (for usage analysis)</li>
                    <li>Customer support tools</li>
                  </ul>
                  <p className="mt-2">
                    These providers are contractually obligated to protect your information and use it only for the services they provide to us.
                  </p>
                </div>

                <div className="mt-4">
                  <h3 className="text-xl font-semibold text-gray-200 mb-2">Business Transfers</h3>
                  <p>
                    If we are involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction. We will notify you before your information is transferred and becomes subject to a different privacy policy.
                  </p>
                </div>

                <div className="mt-4">
                  <h3 className="text-xl font-semibold text-gray-200 mb-2">Legal Requirements</h3>
                  <p>
                    We may disclose your information if required by law or in response to valid legal requests, such as:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                    <li>Compliance with legal obligations</li>
                    <li>Response to subpoenas or court orders</li>
                    <li>Protection of our rights and property</li>
                    <li>Investigation of fraud or security issues</li>
                    <li>Protection of user safety</li>
                  </ul>
                </div>

                <div className="mt-4">
                  <h3 className="text-xl font-semibold text-gray-200 mb-2">With Your Consent</h3>
                  <p>
                    We may share your information for other purposes with your explicit consent.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section id="cookies" className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-8">
              <h2 className="text-3xl font-bold text-gray-100 mb-4">4. Cookies & Tracking Technologies</h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  We use cookies and similar tracking technologies to track activity on our Service and hold certain information.
                </p>
                
                <div className="mt-4">
                  <h3 className="text-xl font-semibold text-gray-200 mb-2">Types of Cookies We Use</h3>
                  
                  <div className="mt-3">
                    <p className="font-semibold text-gray-300">Essential Cookies</p>
                    <p className="mt-1">Required for the Service to function. These enable core functionality like security, authentication, and accessibility.</p>
                  </div>

                  <div className="mt-3">
                    <p className="font-semibold text-gray-300">Preference Cookies</p>
                    <p className="mt-1">Remember your settings and preferences, such as language and region.</p>
                  </div>

                  <div className="mt-3">
                    <p className="font-semibold text-gray-300">Analytics Cookies</p>
                    <p className="mt-1">Help us understand how visitors interact with our Service by collecting and reporting information anonymously.</p>
                  </div>

                  <div className="mt-3">
                    <p className="font-semibold text-gray-300">Marketing Cookies</p>
                    <p className="mt-1">Track your activity to deliver more relevant advertising (only with your consent).</p>
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="text-xl font-semibold text-gray-200 mb-2">Managing Cookies</h3>
                  <p>
                    You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section id="security" className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-8">
              <h2 className="text-3xl font-bold text-gray-100 mb-4">5. Data Security</h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  We take the security of your personal information seriously and implement industry-standard security measures:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Encryption of data in transit (TLS/SSL)</li>
                  <li>Encryption of sensitive data at rest</li>
                  <li>Regular security audits and assessments</li>
                  <li>Access controls and authentication measures</li>
                  <li>Employee training on data protection</li>
                  <li>Incident response procedures</li>
                </ul>
                <p className="mt-4">
                  However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to protect your personal information, we cannot guarantee its absolute security.
                </p>
                <p>
                  You are responsible for maintaining the confidentiality of your account credentials. Please notify us immediately if you become aware of any unauthorized access to your account.
                </p>
              </div>
            </section>

            {/* Section 6 */}
            <section id="retention" className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-8">
              <h2 className="text-3xl font-bold text-gray-100 mb-4">6. Data Retention</h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  We retain your personal information for as long as necessary to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide you with the Service</li>
                  <li>Comply with legal obligations</li>
                  <li>Resolve disputes</li>
                  <li>Enforce our agreements</li>
                </ul>
                <p className="mt-4">
                  When you delete your account, we will delete or anonymize your personal information within 90 days, except where we are required to retain it for legal or legitimate business purposes.
                </p>
                <p>
                  Generated content and usage data may be retained in anonymized form for AI model improvement and analytics purposes.
                </p>
              </div>
            </section>

            {/* Section 7 */}
            <section id="rights" className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-8">
              <h2 className="text-3xl font-bold text-gray-100 mb-4">7. Your Privacy Rights</h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Depending on your location, you may have the following rights regarding your personal information:
                </p>
                
                <div className="mt-4">
                  <h3 className="text-xl font-semibold text-gray-200 mb-2">Access & Portability</h3>
                  <p>Request access to the personal information we hold about you and receive a copy in a portable format.</p>
                </div>

                <div className="mt-4">
                  <h3 className="text-xl font-semibold text-gray-200 mb-2">Correction</h3>
                  <p>Request correction of inaccurate or incomplete personal information.</p>
                </div>

                <div className="mt-4">
                  <h3 className="text-xl font-semibold text-gray-200 mb-2">Deletion</h3>
                  <p>Request deletion of your personal information, subject to certain legal exceptions.</p>
                </div>

                <div className="mt-4">
                  <h3 className="text-xl font-semibold text-gray-200 mb-2">Objection & Restriction</h3>
                  <p>Object to or request restriction of certain processing of your personal information.</p>
                </div>

                <div className="mt-4">
                  <h3 className="text-xl font-semibold text-gray-200 mb-2">Withdraw Consent</h3>
                  <p>Withdraw consent for processing where we rely on your consent as the legal basis.</p>
                </div>

                <div className="mt-4">
                  <h3 className="text-xl font-semibold text-gray-200 mb-2">Lodge a Complaint</h3>
                  <p>Lodge a complaint with a data protection authority about our processing of your personal information.</p>
                </div>

                <p className="mt-6 font-semibold text-gray-300">
                  To exercise any of these rights, please contact us at privacy@incdrops.com. We will respond to your request within 30 days.
                </p>
              </div>
            </section>

            {/* Section 8 */}
            <section id="international" className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-8">
              <h2 className="text-3xl font-bold text-gray-100 mb-4">8. International Data Transfers</h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Your information may be transferred to and processed in countries other than your country of residence. These countries may have data protection laws that are different from the laws of your country.
                </p>
                <p>
                  We take appropriate safeguards to ensure that your personal information remains protected in accordance with this Privacy Policy, including:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Standard contractual clauses approved by the European Commission</li>
                  <li>Ensuring third parties are certified under appropriate frameworks</li>
                  <li>Implementing technical and organizational security measures</li>
                </ul>
              </div>
            </section>

            {/* Section 9 */}
            <section id="children" className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-8">
              <h2 className="text-3xl font-bold text-gray-100 mb-4">9. Children's Privacy</h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Our Service is not directed to individuals under the age of 18. We do not knowingly collect personal information from children under 18.
                </p>
                <p>
                  If you are a parent or guardian and believe your child has provided us with personal information, please contact us. If we become aware that we have collected personal information from children without verification of parental consent, we will take steps to remove that information from our servers.
                </p>
              </div>
            </section>

            {/* Section 10 */}
            <section id="changes" className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-8">
              <h2 className="text-3xl font-bold text-gray-100 mb-4">10. Changes to This Privacy Policy</h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  We may update our Privacy Policy from time to time. We will notify you of any changes by:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Posting the new Privacy Policy on this page</li>
                  <li>Updating the "Last updated" date</li>
                  <li>Sending you an email notification (for material changes)</li>
                  <li>Displaying a prominent notice on our Service</li>
                </ul>
                <p className="mt-4">
                  You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
                </p>
                <p>
                  Your continued use of the Service after any changes constitutes acceptance of the updated Privacy Policy.
                </p>
              </div>
            </section>

            {/* Contact Section */}
            <section className="bg-gradient-to-br from-gray-400 via-gray-300 to-gray-500 rounded-xl p-8 border border-gray-600 shadow-xl">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Shield className="text-gray-900" size={32} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">Contact Us About Privacy</h2>
                  <p className="text-gray-800 mb-4">
                    If you have any questions about this Privacy Policy or our privacy practices, please contact us:
                  </p>
                  <div className="space-y-2 text-gray-400">
                    <p><strong className="text-gray-900">Email:</strong> privacy@incdrops.com</p>
                    <p><strong className="text-gray-900">Data Protection Officer:</strong> dpo@incdrops.com</p>
                    <p><strong className="text-gray-900">Address:</strong> IncDrops Privacy Team, 123 AI Street, San Francisco, CA 94105</p>
                  </div>
                  <div className="mt-6 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                    <p className="text-sm text-gray-400">
                      <strong className="text-gray-900">EU Representative:</strong> For users in the European Union, our GDPR representative can be contacted at eu-privacy@incdrops.com
                    </p>
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
            <button onClick={() => onNavigate('privacy')} className="text-gray-400 font-semibold">Privacy Policy</button>
            <button onClick={() => onNavigate('terms')} className="text-gray-500 hover:text-gray-300 transition-colors">Terms of Service</button>
            <button onClick={() => onNavigate('landing')} className="text-gray-500 hover:text-gray-300 transition-colors">Back to Home</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
