import React, { useState, useEffect } from 'react';
import { X, DollarSign, Users, Sparkles, Check } from 'lucide-react';

interface AffiliateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AffiliateModal: React.FC<AffiliateModalProps> = ({ isOpen, onClose }) => {
  const [referrals, setReferrals] = useState(50);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // 30% recurring on $19/mo average pro plan
  const estimatedMonthlyEarnings = Math.round(referrals * 19 * 0.3);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="affiliate-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-lg bg-[#0E111F] border border-[#a082dc]/30 rounded-3xl shadow-2xl p-6 sm:p-8">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close Modal"
          className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center text-[#A4A5B5] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <img src="/brand-design/bikin-video-logo-icon.png" alt="Bikin Video" className="w-4 h-4 object-contain" />
          <span className="text-xs font-bold text-purple-300 uppercase tracking-wider">
            Bikin Video Partner Program
          </span>
        </div>

        <h3 id="affiliate-modal-title" className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
          Earn 30% Recurring Commission
        </h3>

        <p className="text-xs sm:text-sm text-[#A4A5B5] mb-6 leading-relaxed">
          Share Bikin Video with your audience. Earn a continuous monthly recurring revenue for every creator who subscribes through your link.
        </p>

        {/* Earnings Calculator */}
        <div className="p-4 rounded-2xl bg-[#141829] border border-white/10 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-[#A4A5B5]">Referred Active Creators:</span>
            <span className="text-sm font-bold text-white font-mono">{referrals} creators</span>
          </div>

          <input
            type="range"
            min={5}
            max={300}
            step={5}
            value={referrals}
            onChange={(e) => setReferrals(Number(e.target.value))}
            className="w-full accent-purple-500 mb-4 cursor-pointer"
          />

          <div className="flex justify-between items-baseline pt-2 border-t border-white/10">
            <span className="text-xs text-[#A4A5B5]">Est. Monthly Income:</span>
            <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-mono">
              ${estimatedMonthlyEarnings.toLocaleString()}/mo
            </span>
          </div>
        </div>

        {/* Affiliate Link Generation */}
        <div className="flex items-center gap-2 p-2 rounded-xl bg-[#131627] border border-white/10 mb-6">
          <span className="text-xs text-purple-300 font-mono truncate px-2 select-all">
            https://bikinvideo.ai/ref?partner=creator
          </span>
          <button
            type="button"
            onClick={() => {
              setCopied(true);
              navigator.clipboard?.writeText('https://bikinvideo.ai/ref?partner=creator');
              setTimeout(() => setCopied(false), 2000);
            }}
            className="ml-auto px-3 py-1.5 rounded-lg bg-purple-600 text-white text-xs font-semibold cursor-pointer hover:bg-purple-500 transition-colors shrink-0"
          >
            {copied ? 'Copied!' : 'Copy Link'}
          </button>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#8B35E8] to-[#A855F7] hover:brightness-110 transition-all cursor-pointer shadow-lg"
        >
          Join Partner Network
        </button>
      </div>
    </div>
  );
};
