import React from "react";
import TermsPrivacyModal from "./TermsPrivacyModal";
import Footer from "./Footer";

export default function Shell({ children }) {
  const [showTerms, setShowTerms] = React.useState(false);
  const [showPrivacy, setShowPrivacy] = React.useState(false);

  const portalLink = import.meta.env.VITE_STRIPE_PORTAL_LINK;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Page content */}
      {children}

      {/* Global footer */}
      <Footer
        onShowTerms={() => setShowTerms(true)}
        onShowPrivacy={() => setShowPrivacy(true)}
        onShowPortal={portalLink ? () => window.open(portalLink, "_blank") : undefined}
      />

      {/* Global modals */}
      <TermsPrivacyModal open={showTerms} onClose={() => setShowTerms(false)} type="terms" />
      <TermsPrivacyModal open={showPrivacy} onClose={() => setShowPrivacy(false)} type="privacy" />
    </div>
  );
}
