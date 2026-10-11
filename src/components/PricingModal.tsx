import React, { useState, useEffect } from 'react';
import { X, Check, Sparkles } from 'lucide-react';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlan: (plan: string) => void;
}

export const PricingModal: React.FC<PricingModalProps> = ({
  isOpen,
  onClose,
  onSelectPlan,
}) => {
  const [isAnnual, setIsAnnual] = useState(true);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const plans = [
    {
      name: 'Starter',
      price: '$0',
      period: 'Forever free',
      desc: 'Ideal for trying out AI short video generation.',
      features: [
        '5 short videos / month',
        '720p HD resolution',
        'Standard voice narrator',
        'Basic video templates',
      ],
      button: 'Start Free',
      popular: false,
    },
    {
      name: 'Pro Creator',
      price: isAnnual ? '$15' : '$19',
      period: 'per month',
      desc: 'Everything you need to grow on TikTok, Reels & Shorts.',
      features: [
        'Unlimited short videos',
        '1080p 60fps Full HD export',
        '40+ neural AI voice actors',
        'Automatic smart subtitles',
        'No Bikin Video watermark',
        'Commercial usage rights',
      ],
      button: 'Start 7-Day Trial',
      popular: true,
    },
    {
      name: 'Unlimited Studio',
      price: isAnnual ? '$39' : '$49',
      period: 'per month',
      desc: 'For power creators and marketing agencies.',
      features: [
        'Everything in Pro Creator',
        '4K Ultra HDR video exports',
        'Priority GPU generation speed',
        'Custom voice cloning',
        'Dedicated API access',
        'Brand kit & team workspaces',
      ],
      button: 'Upgrade to Studio',
      popular: false,
    },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="pricing-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-4xl bg-[#0E111F] border border-[#a082dc]/30 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close Modal"
          className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center text-[#A4A5B5] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 p-2 shadow-md mx-auto mb-3 flex items-center justify-center">
            <img src="/brand-design/bikin-video-logo-icon.png" alt="Bikin Video" className="w-full h-full object-contain" />
          </div>
          <h3 id="pricing-modal-title" className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
            Simple, Transparent Pricing
          </h3>
          <p className="text-sm text-[#A4A5B5] mb-5">
            Choose the plan that fits your creative ambitions. Switch or cancel anytime.
          </p>

          {/* Monthly / Annual Toggle */}
          <div className="inline-flex items-center gap-2 p-1 rounded-full bg-[#141829] border border-white/10">
            <button
              type="button"
              onClick={() => setIsAnnual(false)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                !isAnnual ? 'bg-[#8B35E8] text-white shadow' : 'text-[#A4A5B5] hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setIsAnnual(true)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
                isAnnual ? 'bg-[#8B35E8] text-white shadow' : 'text-[#A4A5B5] hover:text-white'
              }`}
            >
              <span>Annual</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded-full border border-emerald-500/30">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`h-full flex flex-col justify-between p-6 rounded-2xl border transition-all duration-300 ${
                p.popular
                  ? 'bg-[#15192E] border-purple-500 shadow-[0_0_25px_rgba(139,53,232,0.3)] ring-1 ring-purple-500/40 relative'
                  : 'bg-[#121524] border-white/10'
              }`}
            >
              {p.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-[10px] font-bold text-white tracking-wider uppercase shadow">
                  Most Popular
                </div>
              )}

              <div>
                <h4 className="text-base font-bold text-white mb-1">{p.name}</h4>
                <p className="text-xs text-[#A4A5B5] mb-4 min-h-[32px]">{p.desc}</p>

                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-3xl font-extrabold text-white tracking-tight">{p.price}</span>
                  <span className="text-xs text-[#737588]">/{p.period}</span>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-white/10 mb-6 text-xs text-[#D2D2DE]">
                  {p.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  onSelectPlan(p.name);
                  onClose();
                }}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  p.popular
                    ? 'bg-gradient-to-r from-[#8B35E8] to-[#D946EF] text-white shadow-lg hover:brightness-110'
                    : 'bg-[#1E2338] hover:bg-[#282F4C] text-white border border-white/10'
                }`}
              >
                {p.button}
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
