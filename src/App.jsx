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

// --- Imports for Firebase ---
import { auth, db } from './firebase';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore'; 

export default function App() {
  const [page, setPage] = useState('landing');
  const [user, setUser] = useState(null); 

  useEffect(() => {
    const checkUser = async () => {
      const localUser = JSON.parse(localStorage.getItem('incdrops_user') || 'null');
      if (localUser && localUser.id) {
        const userDocRef = doc(db, 'users', localUser.id);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const firestoreData = userDocSnap.data();
          // Make sure to include the id field
          setUser({
            id: localUser.id,
            ...firestoreData
          });
        } else {
          handleLogout();
        }
      }
    };
    checkUser();
  }, []);

  const handleNavigate = (targetPage) => {
    if ((targetPage === 'generator' || targetPage === 'account') && !user) {
      setPage('auth');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    setPage(targetPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = async (authUserData) => {
    // The userData is already passed from AuthPage with all the info we need
    // No need to fetch from Firestore again - just use it directly
    setUser(authUserData);
    
    // Save to localStorage (for persistence on refresh)
    localStorage.setItem('incdrops_user', JSON.stringify(authUserData));
    localStorage.setItem('incdrops_tier', authUserData.tier || 'free');
    
    // Redirect to generator immediately
    setPage('generator');
    window.location.hash = 'generator';
  };

  const handleLogout = async () => {
    try {
      await signOut(auth); 
    } catch (error) {
      console.error("Error signing out: ", error);
    }
    setUser(null);
    localStorage.removeItem('incdrops_user');
    localStorage.removeItem('incdrops_tier'); 
  };

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['generator', 'landing', 'pricing', 'terms', 'privacy', 'auth', 'account', 'api-access', 'integrations', 'roadmap', 'help-center', 'documentation', 'contact-us', 'status-page', 'community', 'cookie-policy', 'security', 'gdpr'].includes(hash)) {
        if ((hash === 'generator' || hash === 'account') && !user) {
          setPage('auth');
        } else {
          setPage(hash);
        }
      }
    };
    onHashChange();
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [user]);

  useEffect(() => {
    if (page) window.location.hash = page;
  }, [page]);

  return (
    <div>
      {page === 'landing' && <LandingPage onNavigate={handleNavigate} user={user} />}
      {page === 'generator' && <Generator onNavigate={handleNavigate} user={user} />}
      {page === 'pricing' && <Pricing onNavigate={handleNavigate} user={user} />}
      {page === 'auth' && <AuthPage onNavigate={handleNavigate} onLogin={handleLogin} />}
      {page === 'account' && <AccountSettings onNavigate={handleNavigate} onLogout={handleLogout} user={user} />}
      {page === 'terms' && <TermsOfService onNavigate={handleNavigate} />}
      {/* --- THIS IS THE FIXED LINE --- */}
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