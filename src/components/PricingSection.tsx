import React, { useState } from 'react';
import { SectionLabel } from './SectionLabel';
import { GradientText } from './GradientText';
import { Check, ArrowRight, ShieldCheck } from 'lucide-react';

interface PricingSectionProps {
  onOpenTrial: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenTrial }) => {
  const [isAnnual, setIsAnnual] = useState(true);

  const tiers = [
    {
      name: 'Starter',
      price: '$0',
      period: 'Forever free',
      desc: 'Test the AI Director engine on short clips and personal tests.',
      minutes: '30 processing minutes / mo',
      features: [
        'Up to 1080p video exports',
        'Auto silence & pause detection',
        'Standard word-by-word subtitles',
        'Lossless XML export for Premiere Pro',
        'Basic video templates',
      ],
      button: 'Start Free',
      popular: false,
    },
    {
      name: 'Pro Creator',
      price: isAnnual ? '$15' : '$19',
      period: 'per month',
      desc: 'Everything you need to grow on YouTube Shorts, TikTok, and Instagram.',
      minutes: '200 processing minutes / mo',
      features: [
        'Unlimited short video exports',
        '1080p 60fps Full HD export',
        'Context-aware AI B-roll generation',
        'Kinetic animated captions (30+ languages)',
        'Active speaker face reframe',
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
      desc: 'For power podcasters, professional editors, and creative agencies.',
      minutes: 'Unlimited processing minutes',
      features: [
        'Everything in Pro Creator',
        '4K Ultra HDR video exports',
        'Priority GPU generation cluster',
        'Custom multi-speaker voice cloning',
        'Team brand kits & shared workspaces',
        'Full DaVinci Resolve & Premiere bridge',
        'Dedicated 24/7 priority support',
      ],
      button: 'Upgrade to Studio',
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="relative py-10 sm:py-16 z-10">
      <div className="page-container">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-7 sm:mb-9">
          <SectionLabel label="Simple Transparent Pricing" className="mb-3.5" />
          <h2 className="text-[30px] sm:text-[42px] md:text-[50px] font-extrabold text-[#F1F0F6] tracking-tight leading-[1.12] mb-4 text-balance">
            Transparent Pricing. <GradientText glow>Zero Hidden Lock-in.</GradientText>
          </h2>
          <p className="text-[15px] sm:text-[17px] text-[#A4A5B5] leading-relaxed max-w-2xl mx-auto mb-6">
            Choose the plan that fits your production volume. Switch or cancel anytime with one click.
          </p>

          {/* Monthly / Annual Toggle */}
          <div className="inline-flex items-center gap-2 p-1.5 rounded-full bg-[#111426] border border-white/10 shadow-md">
            <button
              type="button"
              onClick={() => setIsAnnual(false)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                !isAnnual ? 'bg-[#8B35E8] text-white shadow' : 'text-[#A4A5B5] hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setIsAnnual(true)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                isAnnual ? 'bg-[#8B35E8] text-white shadow' : 'text-[#A4A5B5] hover:text-white'
              }`}
            >
              <span>Annual</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded-full border border-emerald-500/30">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 items-stretch">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`flex flex-col justify-between p-5 md:p-5 lg:p-8 rounded-2xl md:rounded-3xl transition-all duration-300 ${
                t.popular
                  ? 'glass-card-featured relative'
                  : 'glass-card glass-card-hover'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <h3 className="text-lg font-bold text-white tracking-tight">{t.name}</h3>
                  {t.popular && (
                    <span className="px-2.5 py-0.5 rounded-full bg-[#321080]/90 border border-purple-300/40 text-[10px] font-mono font-bold text-purple-200 tracking-widest uppercase shadow-xs">
                      POPULAR
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#B7B2CC] mb-4 min-h-[32px] leading-relaxed">{t.desc}</p>

                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-extrabold text-white font-mono tracking-tight drop-shadow-sm">{t.price}</span>
                  <span className="text-xs text-[#9591AB]">/{t.period}</span>
                </div>

                <div className="text-xs font-mono text-purple-300 font-semibold mb-6">
                  {t.minutes}
                </div>

                <div className="space-y-2.5 pt-5 border-t border-white/[0.1] mb-8 text-xs text-[#E1DEF0]">
                  {t.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-purple-500/20 border border-purple-400/30 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 text-purple-300" />
                      </div>
                      <span className="leading-snug">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={onOpenTrial}
                className={`w-full py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  t.popular
                    ? 'bg-white hover:bg-white/95 text-[#1D0845] font-extrabold shadow-[0_12px_28px_rgba(255,255,255,0.25)] hover:scale-[1.02]'
                    : 'bg-white/10 hover:bg-white/15 text-white border border-purple-300/25 hover:border-purple-300/50 backdrop-blur-md'
                }`}
              >
                {t.button}
              </button>
            </div>
          ))}
        </div>

        {/* Usage Guarantee Strip */}
        <div className="mt-10 p-4 rounded-2xl glass-card flex flex-wrap items-center justify-between gap-4 text-xs text-[#B7B2CC]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Usage is only deducted for completed video exports. Previews and timeline scrubbers are always free.</span>
          </div>
          <span className="text-purple-300 font-mono">Cancel anytime with 1 click</span>
        </div>

      </div>
    </section>
  );
};
