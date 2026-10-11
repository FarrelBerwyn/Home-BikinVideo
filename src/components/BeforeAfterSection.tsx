import React, { useState } from 'react';
import { SectionLabel } from './SectionLabel';
import { GradientText } from './GradientText';
import { ScrollReveal } from './ScrollReveal';
import { Play, Pause, Split, CheckCircle2, ArrowRight } from 'lucide-react';

interface BeforeAfterSectionProps {
  onOpenPreviewModal: (title: string, type: string) => void;
}

export const BeforeAfterSection: React.FC<BeforeAfterSectionProps> = ({
  onOpenPreviewModal,
}) => {
  const [activeProject, setActiveProject] = useState(0);
  const [viewMode, setViewMode] = useState<'after' | 'before'>('after');

  const projects = [
    {
      id: 0,
      title: 'Tech Podcast Discussion',
      category: 'Podcast Clip',
      before: {
        duration: '45 mins uncut',
        issues: '14 dead air pauses (>2.5s), uncentered speaker, quiet audio, zero visual hooks.',
        visual: 'Raw wide-angle webcam footage with background hum.',
      },
      after: {
        duration: '38s viral short',
        improvements: 'Punchy 3-second hook, word-by-word karaoke captions, facial tracking reframe, B-roll chart cutaways.',
        retention: '+340% completion rate',
      },
    },
    {
      id: 1,
      title: 'SaaS Feature Walkthrough',
      category: 'Product Demo',
      before: {
        duration: '12 mins recording',
        issues: 'Monotone cursor clicking, slow loading pauses, technical jargon without summary.',
        visual: 'Static screen share with silent navigation delays.',
      },
      after: {
        duration: '30s showcase reel',
        improvements: 'Auto-cut loading pauses, 1.25x animated zoom on feature buttons, upbeat background music.',
        retention: '+280% click-through rate',
      },
    },
    {
      id: 2,
      title: 'Creator Daily Story',
      category: 'Vlog & Lifestyle',
      before: {
        duration: '8 mins raw footage',
        issues: 'Wind noise, rambling intro, unfocused storyline, shaky handheld camera.',
        visual: 'Uncut phone video with distracting background echo.',
      },
      after: {
        duration: '26s vertical short',
        improvements: 'Studio voice noise reduction, fast-paced scene cuts, auto-color pop, text sticker emphasis.',
        retention: '+410% follower growth',
      },
    },
  ];

  const current = projects[activeProject];

  return (
    <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 z-10 bg-[#090B16]/50 border-t border-white/[0.06]">
      <div className="max-w-[1240px] mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <ScrollReveal delay={0}>
            <SectionLabel label="Before & After Transformation" className="mb-4" />
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <h2 className="text-[32px] sm:text-[42px] md:text-[50px] font-bold text-white tracking-tight leading-[1.12] mb-4 text-balance">
              The difference <GradientText glow>intelligent editing makes.</GradientText>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <p className="text-[15px] sm:text-[17px] text-[#A4A5B5] leading-relaxed max-w-2xl mx-auto">
              Compare unedited raw recordings with finished, high-retention shorts directed by Bikin Video.
            </p>
          </ScrollReveal>
        </div>

        {/* Project Selector Pills */}
        <ScrollReveal delay={250}>
          <div className="flex items-center justify-center gap-2 mb-8 overflow-x-auto pb-1">
            {projects.map((p, i) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setActiveProject(i)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  activeProject === i
                    ? 'bg-[#8B35E8] text-white shadow-[0_0_15px_rgba(139,53,232,0.5)]'
                    : 'bg-[#121526] text-[#A4A5B5] hover:text-white border border-white/5'
                }`}
              >
                {p.title}
              </button>
            ))}
          </div>

          {/* Interactive Transformation Card */}
          <div className="rounded-3xl bg-[#0E1122] border border-white/[0.08] p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            
            {/* View Mode Toggle */}
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/[0.08] flex-wrap gap-4">
              <div>
                <span className="text-xs font-mono text-purple-300 bg-purple-950/60 px-2.5 py-1 rounded border border-purple-500/30">
                  {current.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  {current.title}
                </h3>
              </div>

              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#14172B] border border-white/5 text-xs">
                <button
                  type="button"
                  onClick={() => setViewMode('before')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                    viewMode === 'before'
                      ? 'bg-[#2A2E4E] text-white shadow'
                      : 'text-[#A4A5B5] hover:text-white'
                  }`}
                >
                  Raw Footage (Before)
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('after')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                    viewMode === 'after'
                      ? 'bg-[#8B35E8] text-white shadow-[0_0_12px_rgba(139,53,232,0.5)]'
                      : 'text-[#A4A5B5] hover:text-white'
                  }`}
                >
                  Bikin Video Edit (After)
                </button>
              </div>
            </div>

            {/* Split Comparison Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              
              {/* Before Card */}
              <div className={`p-6 rounded-2xl border transition-all ${
                viewMode === 'before'
                  ? 'bg-[#181A2D] border-red-500/50 ring-1 ring-red-500/30'
                  : 'bg-[#121424] border-white/5 opacity-75'
              }`}>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/5">
                  <span className="text-xs font-bold text-red-400 uppercase tracking-wider">
                    Raw Input
                  </span>
                  <span className="text-xs font-mono text-[#77798B]">
                    {current.before.duration}
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-[11px] font-semibold text-[#77798B] block mb-1">
                      Visual State:
                    </span>
                    <p className="text-[#A4A5B5] leading-relaxed">
                      {current.before.visual}
                    </p>
                  </div>

                  <div>
                    <span className="text-[11px] font-semibold text-[#77798B] block mb-1">
                      Detected Flaws:
                    </span>
                    <p className="text-red-300/90 leading-relaxed font-mono">
                      {current.before.issues}
                    </p>
                  </div>
                </div>
              </div>

              {/* After Card */}
              <div className={`p-6 rounded-2xl border transition-all ${
                viewMode === 'after'
                  ? 'bg-[#191C36] border-purple-500 ring-2 ring-purple-500/40 shadow-[0_0_25px_rgba(139,53,232,0.25)]'
                  : 'bg-[#121424] border-white/5 opacity-75'
              }`}>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/5">
                  <span className="text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>AI Directed Cut</span>
                  </span>
                  <span className="text-xs font-mono text-emerald-300 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">
                    {current.after.duration}
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-[11px] font-semibold text-[#77798B] block mb-1">
                      Applied Transformations:
                    </span>
                    <p className="text-[#E0E0ED] leading-relaxed">
                      {current.after.improvements}
                    </p>
                  </div>

                  <div>
                    <span className="text-[11px] font-semibold text-[#77798B] block mb-1">
                      Measured Outcome:
                    </span>
                    <p className="text-emerald-400 font-bold font-mono">
                      {current.after.retention}
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Inspect Action */}
            <div className="mt-8 pt-4 border-t border-white/[0.08] flex items-center justify-between">
              <span className="text-xs text-[#A4A5B5]">
                Want to test this transformation on your raw footage?
              </span>
              <button
                type="button"
                onClick={() => onOpenPreviewModal(current.title, current.category)}
                className="text-xs font-bold text-purple-400 hover:text-purple-300 cursor-pointer flex items-center gap-1.5"
              >
                <span>Inspect in Preview Player</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
