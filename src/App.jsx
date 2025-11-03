import React, { useState, useEffect } from 'react';
import LandingPage from './LandingPage';
import Generator from './Generator';
import Pricing from './Pricing';
import TermsOfService from './TermsOfService';
import PrivacyPolicy from './PrivacyPolicy';
import AuthPage from './AuthPage';
import AccountSettings from './AccountSettings';
import APIAccess from './APIAccess';
import Integrations from './Integrations';
import Roadmap from './Roadmap';
import HelpCenter from './HelpCenter';
import Documentation from './Documentation';
import ContactUs from './ContactUs';
import StatusPage from './StatusPage';
import Community from './Community';
import CookiePolicy from './CookiePolicy';
import Security from './Security';
import GDPR from './GDPR';

export default function App() {
  const [page, setPage] = useState('landing'); // 'landing' | 'generator' | 'pricing' | 'terms' | 'privacy' | 'auth' | 'account' | 'api-access' | 'integrations' | 'roadmap' | 'help-center' | 'documentation' | 'contact-us' | 'status-page' | 'community' | 'cookie-policy' | 'security' | 'gdpr'
  const [user, setUser] = useState(null);

  // Check if user is logged in on mount
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('incdrops_user') || 'null');
    if (userData) {
      setUser(userData);
    }
  }, []);

  const handleNavigate = (targetPage) => {
    // Protect generator and account pages - require authentication
    if ((targetPage === 'generator' || targetPage === 'account') && !user) {
      setPage('auth');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    setPage(targetPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('incdrops_user');
  };

  // Lightweight hash-based routing so refresh/back/forward work
  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['generator', 'landing', 'pricing', 'terms', 'privacy', 'auth', 'account', 'api-access', 'integrations', 'roadmap', 'help-center', 'documentation', 'contact-us', 'status-page', 'community', 'cookie-policy', 'security', 'gdpr'].includes(hash)) {
        // Check if trying to access protected pages without being logged in
        if ((hash === 'generator' || hash === 'account') && !user) {
          setPage('auth');
        } else {
          setPage(hash);
        }
      }
    };
    onHashChange(); // initialize from current hash
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [user]);

  useEffect(() => {
    // keep the URL in sync so you can deep-link to #generator / #pricing / #terms / #privacy
    if (page) window.location.hash = page;
  }, [page]);

  return (
    <div>
      {page === 'landing' && <LandingPage onNavigate={handleNavigate} user={user} />}
      {page === 'generator' && <Generator onNavigate={handleNavigate} user={user} />}
      {page === 'pricing' && <Pricing onNavigate={handleNavigate} user={user} />}
      {page === 'auth' && <AuthPage onNavigate={handleNavigate} onLogin={handleLogin} />}
      {page === 'account' && <AccountSettings onNavigate={handleNavigate} onLogout={handleLogout} />}
      {page === 'terms' && <TermsOfService onNavigate={handleNavigate} />}
      {page === 'privacy' && <PrivacyPolicy onNavigate={handleNavigate} />}
      {page === 'api-access' && <APIAccess onNavigate={handleNavigate} />}
      {page === 'integrations' && <Integrations onNavigate={handleNavigate} />}
      {page === 'roadmap' && <Roadmap onNavigate={handleNavigate} />}
      {page === 'help-center' && <HelpCenter onNavigate={handleNavigate} />}
      {page === 'documentation' && <Documentation onNavigate={handleNavigate} />}
      {page === 'contact-us' && <ContactUs onNavigate={handleNavigate} />}
      {page === 'status-page' && <StatusPage onNavigate={handleNavigate} />}
      {page === 'community' && <Community onNavigate={handleNavigate} />}
      {page === 'cookie-policy' && <CookiePolicy onNavigate={handleNavigate} />}
      {page === 'security' && <Security onNavigate={handleNavigate} />}
      {page === 'gdpr' && <GDPR onNavigate={handleNavigate} />}
    </div>
  );
}
