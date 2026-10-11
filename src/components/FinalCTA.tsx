import React from 'react';
import { GradientText } from './GradientText';
import { ScrollReveal } from './ScrollReveal';
import { ChevronRight, ArrowRight } from 'lucide-react';

interface FinalCTAProps {
  onOpenTrial: () => void;
  onExploreEditor: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenTrial, onExploreEditor }) => {
  return (
    <section className="relative py-10 sm:py-16 z-10">
      <div className="page-container">
        <ScrollReveal delay={100}>
          {/* Rounded Cosmic Panel */}
          <div className="relative rounded-3xl p-8 sm:p-14 lg:p-16 glass-panel overflow-hidden text-center">
            
            {/* Panel Internal Ambient Lighting */}
            <div
              className="absolute -top-24 -left-20 w-[450px] h-[450px] rounded-full blur-[90px] pointer-events-none opacity-60"
              style={{
                background: 'radial-gradient(circle, rgba(217, 70, 239, 0.45) 0%, rgba(168, 85, 247, 0.25) 50%, transparent 75%)',
              }}
            />
            <div
              className="absolute -bottom-24 -right-20 w-[480px] h-[480px] rounded-full blur-[100px] pointer-events-none opacity-60"
              style={{
                background: 'radial-gradient(circle, rgba(139, 53, 232, 0.5) 0%, rgba(168, 85, 247, 0.3) 50%, transparent 75%)',
              }}
            />

            {/* Content */}
            <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
              <div className="w-12 h-12 rounded-2xl glass-icon-box p-2.5 shadow-[0_8px_24px_rgba(0,0,0,0.6)] mb-4 flex items-center justify-center">
                <img src="/brand-design/bikin-video-logo-icon.png" alt="Bikin Video" className="w-full h-full object-contain" />
              </div>

              <span className="text-xs font-mono font-bold text-purple-300 uppercase tracking-widest block mb-3">
                You direct. Bikin edits.
              </span>

              <h2 className="text-[32px] sm:text-[44px] md:text-[52px] font-extrabold text-white tracking-tight leading-[1.1] mb-4 text-balance">
                Ready to Direct Your <GradientText>Next Video?</GradientText>
              </h2>

              <p className="text-[15px] sm:text-[17px] text-[#A4A5B5] leading-relaxed mb-8 sm:mb-9 max-w-xl">
                Start with your raw footage, an editing instruction, or a new creative concept. Take full creative control over your finished cut today.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={onOpenTrial}
                  className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-[14px] font-bold text-white bg-gradient-to-r from-[#8B35E8] to-[#A855F7] hover:from-[#9D44F2] hover:to-[#B352FA] active:scale-95 transition-all duration-200 cursor-pointer shadow-[0_4px_22px_rgba(139,53,232,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
                >
                  <span>Start Creating</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </button>

                <button
                  type="button"
                  onClick={onExploreEditor}
                  className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-[14px] font-bold text-[#E6E6E6] hover:text-white bg-[#141728] border border-[#a082dc]/25 hover:border-[#a082dc]/50 active:scale-95 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
                >
                  <span>Explore the Editor</span>
                  <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>

          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
