import React from "react";

export default function Footer({ onShowTerms, onShowPrivacy, onShowPortal }) {
  return (
    <footer className="mt-16 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
        <div>© {new Date().getFullYear()} IncDrops</div>
        <div className="flex items-center gap-4">
          <button onClick={onShowTerms} className="hover:text-white">Terms</button>
          <button onClick={onShowPrivacy} className="hover:text-white">Privacy</button>
          {onShowPortal && <button onClick={onShowPortal} className="hover:text-white">Billing Portal</button>}
        </div>
      </div>
    </footer>
  );
}
