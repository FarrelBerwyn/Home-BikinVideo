import React from 'react';
import { Sparkles, Play, Clock, CheckCircle, TrendingUp, Layers, Video } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface TrustProofSectionProps {
  onOpenPreviewModal: (title: string, type: string) => void;
}

export const TrustProofSection: React.FC<TrustProofSectionProps> = ({
  onOpenPreviewModal,
}) => {
  const benchmarks = [
    {
      value: '1.2M+',
      label: 'Shorts Processed',
      desc: 'High-retention vertical clips generated',
    },
    {
      value: '68%',
      label: 'Editing Time Saved',
      desc: 'From raw footage to final export',
    },
    {
      value: '99.4%',
      label: 'Speech Sync Accuracy',
      desc: 'Precision word-level kinetic captions',
    },
    {
      value: '4K 60fps',
      label: 'Maximum Resolution',
      desc: 'Lossless studio rendering pipeline',
    },
  ];

  const sampleProjects = [
    {
      id: 'podcast',
      title: 'Founder Podcast Highlight',
      category: 'Podcast Clip',
      duration: '00:38',
      score: '98/100 Hook',
      bgGrad: 'from-purple-950 via-slate-900 to-black',
      highlight: 'Cut 12 pauses · Dynamic zoom 1.2x on climax',
    },
    {
      id: 'saas',
      title: 'SaaS Product Feature Drop',
      category: 'Product Demo',
      duration: '00:30',
      score: '95/100 Hook',
      bgGrad: 'from-indigo-950 via-slate-900 to-black',
      highlight: 'Added UI demo overlay · Sound ducking -18dB',
    },
    {
      id: 'commentary',
      title: 'Tech Analysis & Opinion',
      category: 'Explainer Reel',
      duration: '00:44',
      score: '93/100 Hook',
      bgGrad: 'from-pink-950 via-slate-900 to-black',
      highlight: 'Bilingual captions · B-roll pacing auto-synced',
    },
  ];

  return (
    <section className="relative py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-y border-white/[0.06] bg-[#0A0C18]/60 z-10">
      <div className="max-w-[1240px] mx-auto">
        
        {/* Benchmarks Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pb-12 border-b border-white/[0.06]">
          {benchmarks.map((b, i) => (
            <ScrollReveal key={b.label} delay={i * 80}>
              <div className="flex flex-col">
                <span className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-purple-300 font-mono tracking-tight mb-1">
                  {b.value}
                </span>
                <span className="text-sm font-semibold text-white mb-0.5">
                  {b.label}
                </span>
                <span className="text-xs text-[#77798B]">
                  {b.desc}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Verified Sample Projects Showcase */}
        <div className="pt-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider block mb-1">
                Verified Sample Projects
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Inspect Real AI Editing Outputs
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#A4A5B5]">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Click any project to inspect editorial timeline</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {sampleProjects.map((p, i) => (
              <ScrollReveal key={p.id} delay={100 + i * 100}>
                <div
                  onClick={() => onOpenPreviewModal(p.title, p.category)}
                  className="group p-5 rounded-2xl bg-[#0F1222] border border-white/[0.08] hover:border-purple-500/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.4)] flex flex-col justify-between"
                >
                  {/* Thumbnail Banner */}
                  <div className={`h-36 rounded-xl bg-gradient-to-tr ${p.bgGrad} p-3 flex flex-col justify-between border border-white/5 relative overflow-hidden mb-4`}>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono bg-black/60 backdrop-blur px-2 py-0.5 rounded text-white border border-white/10">
                        {p.category}
                      </span>
                      <span className="text-[10px] font-mono bg-purple-900/60 text-purple-200 px-2 py-0.5 rounded border border-purple-500/30">
                        {p.score}
                      </span>
                    </div>

                    {/* Centered Play Hover Button */}
                    <div className="self-center w-10 h-10 rounded-full bg-[#8B35E8]/80 group-hover:bg-[#8B35E8] flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110">
                      <Play className="w-4 h-4 ml-0.5 fill-white" />
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-white/80">
                      <span>9:16 Vertical Short</span>
                      <span>{p.duration}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-white group-hover:text-purple-200 transition-colors mb-1">
                      {p.title}
                    </h4>
                    <p className="text-xs text-[#A4A5B5] leading-relaxed">
                      {p.highlight}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
