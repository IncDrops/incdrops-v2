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

import { auth, db } from './firebase'; // Import db
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore'; // Import Firestore doc functions

export default function App() {
  const [page, setPage] = useState('landing');
  const [user, setUser] = useState(null); // This will hold the full user profile from Firestore

  // --- THIS FUNCTION IS NOW SMARTER ---
  // It checks for a local user, then verifies and gets fresh data from Firestore
  useEffect(() => {
    const checkUser = async () => {
      const localUser = JSON.parse(localStorage.getItem('incdrops_user') || 'null');
      if (localUser && localUser.id) {
        // We have a user in localStorage. Let's get their REAL data from Firestore
        const userDocRef = doc(db, 'users', localUser.id);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          // User exists, save their DB data to our app state
          setUser(userDocSnap.data());
        } else {
          // This user is in localStorage but not in our DB. Log them out.
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

  // --- THIS FUNCTION IS NOW ASYNC AND FETCHES FROM DB ---
  const handleLogin = async (authUserData) => {
    // 1. Get the user's profile from Firestore
    const userDocRef = doc(db, 'users', authUserData.uid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      // 2. User profile exists, save it to state
      const userData = userDocSnap.data();
      setUser(userData);
      
      // 3. Save to localStorage (for persistence on refresh)
      localStorage.setItem('incdrops_user', JSON.stringify(userData));
      localStorage.setItem('incdrops_tier', userData.tier);
      
      // 4. Redirect to generator
      setPage('generator');
    } else {
      // This should not happen if signup is correct, but it's a good safety check
      console.error("No user profile found in database!");
      // We can still log them in with basic info, but 'tier' will be missing
      setUser({ id: authUserData.uid, email: authUserData.email, name: authUserData.displayName });
      setPage('generator');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth); 
    } catch (error) {
      console.error("Error signing out: ", error);
    }
    setUser(null);
    localStorage.removeItem('incdrops_user');
    localStorage.removeItem('incdrops_tier'); // Also remove tier
  };

  // This hash-based routing is great
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