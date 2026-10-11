import React, { useState, useEffect } from 'react';
import { X, Sparkles, Check, ArrowRight, ShieldCheck } from 'lucide-react';

interface TrialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TrialModal: React.FC<TrialModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<'pro' | 'unlimited'>('pro');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setIsSubmitted(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="trial-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-lg bg-[#0E111F] border border-[#a082dc]/30 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close Modal"
          className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center text-[#A4A5B5] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <img src="/brand-design/bikin-video-logo-icon.png" alt="Bikin Video" className="w-5 h-5 object-contain" />
              <span className="text-xs font-semibold text-purple-300 uppercase tracking-wider">
                Risk-Free Access
              </span>
            </div>

            <h3 id="trial-modal-title" className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
              Start Your 7-Day Free Trial
            </h3>

            <p className="text-sm text-[#A4A5B5] mb-6 leading-relaxed">
              Unlock unlimited AI short video generations, 4K rendering, and premium realistic neural voices with no upfront charge.
            </p>

            {/* Plan selector pills */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                type="button"
                onClick={() => setSelectedPlan('pro')}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  selectedPlan === 'pro'
                    ? 'bg-[#1D2138] border-purple-500 shadow-[0_0_15px_rgba(139,53,232,0.3)]'
                    : 'bg-[#131626] border-white/10 opacity-70 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-white">Pro Creator</span>
                  <span className="text-[10px] bg-purple-900/60 text-purple-200 px-1.5 py-0.5 rounded">Popular</span>
                </div>
                <div className="text-lg font-bold text-white">$19/mo</div>
                <div className="text-[11px] text-[#A4A5B5]">After 7 days free</div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedPlan('unlimited')}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  selectedPlan === 'unlimited'
                    ? 'bg-[#1D2138] border-purple-500 shadow-[0_0_15px_rgba(139,53,232,0.3)]'
                    : 'bg-[#131626] border-white/10 opacity-70 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-white">Unlimited Studio</span>
                  <span className="text-[10px] bg-pink-900/60 text-pink-200 px-1.5 py-0.5 rounded">Best Value</span>
                </div>
                <div className="text-lg font-bold text-white">$49/mo</div>
                <div className="text-[11px] text-[#A4A5B5]">After 7 days free</div>
              </button>
            </div>

            {/* Included highlights */}
            <div className="space-y-2 mb-6 text-xs text-[#D2D2DE]">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Unlimited video exports without watermark</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Automated multi-language subtitle translation</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Cancel anytime with 1-click in account dashboard</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#A4A5B5] mb-1.5">
                  Work or Creator Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-[#141829] border border-[#a082dc]/20 text-white placeholder-[#585a70] focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#8B35E8] to-[#D946EF] hover:from-[#9D44F2] hover:to-[#E056F5] transition-all cursor-pointer shadow-[0_4px_20px_rgba(139,53,232,0.5)] active:scale-98 flex items-center justify-center gap-2"
              >
                <span>Claim 7 Days Free Trial</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-[#737588]">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Instant access · No surprise fees · Cancel anytime</span>
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 p-3 shadow-xl mx-auto mb-4 flex items-center justify-center">
              <img src="/brand-design/bikin-video-logo-icon.png" alt="Bikin Video" className="w-full h-full object-contain" />
            </div>

            <h3 className="text-2xl font-bold text-white mb-2">Welcome to Bikin Video!</h3>
            <p className="text-sm text-[#A4A5B5] mb-6 leading-relaxed">
              We sent your trial activation credentials to <strong className="text-white">{email}</strong>. Check your inbox to begin generating viral shorts!
            </p>

            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-[#8B35E8] text-white font-semibold text-sm cursor-pointer hover:bg-[#9E45E8] transition-colors"
            >
              Continue to Workspace
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
