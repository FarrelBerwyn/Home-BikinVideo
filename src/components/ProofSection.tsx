import React from 'react';
import { Zap, TrendingUp, FileCode2, Sliders, ShieldCheck } from 'lucide-react';

export const ProofSection: React.FC = () => {
  const metrics = [
    {
      value: '10x',
      label: 'Faster Turnaround',
      description: 'Go from a 60-minute raw podcast to polished multi-platform shorts in under 5 minutes.',
      icon: Zap,
    },
    {
      value: '94%',
      label: 'Retention Boost',
      description: 'Dynamic zoom punch-ins, silence cuts, and context-aware B-roll elevate completion rates.',
      icon: TrendingUp,
    },
    {
      value: 'Lossless XML',
      label: 'Zero Timeline Lock-in',
      description: 'Export directly to Adobe Premiere Pro & DaVinci Resolve with standard tracks and cuts preserved.',
      icon: FileCode2,
    },
    {
      value: '100%',
      label: 'Human Creative Control',
      description: 'You are always the director. Tweak any cut, slide keyframes, or override AI suggestions anytime.',
      icon: Sliders,
    },
  ];

  return (
    <section className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-y border-white/[0.06] bg-[#090B16]/60 z-10">
      <div className="max-w-[1360px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {metrics.map((m, idx) => {
            const IconComponent = m.icon;
            return (
              <div
                key={idx}
                className="flex flex-col justify-between p-5 rounded-2xl bg-[#0E1122]/70 border border-white/[0.06] hover:border-purple-500/30 transition-all duration-200"
              >
                <div>
                  <div className="w-9 h-9 rounded-xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-300 mb-4">
                    <IconComponent className="w-4 h-4" />
                  </div>

                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight mb-1">
                    {m.value}
                  </div>
                  <div className="text-sm font-bold text-[#E6E6E6] mb-2">
                    {m.label}
                  </div>
                </div>

                <p className="text-xs text-[#A4A5B5] leading-relaxed">
                  {m.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
