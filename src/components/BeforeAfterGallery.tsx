import React, { useState } from 'react';
import { SectionLabel } from './SectionLabel';
import { GradientText } from './GradientText';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { CreatorVideoCanvas } from './CreatorVideoCanvas';

interface BeforeAfterItem {
  id: string;
  stepNumber: string;
  title: string;
  category: string;
  rawDuration: string;
  finalDuration: string;
  sourceNote: string;
  aiDirectorAction: string;
  retentionOutcome: string;
}

const ITEMS: BeforeAfterItem[] = [
  {
    id: 'podcast-indonesia',
    stepNumber: '01',
    title: 'Indonesian Tech & AI Podcast Episode 42',
    category: 'Podcast Repurposing',
    rawDuration: '48 min unedited recording',
    finalDuration: '58 sec viral short',
    sourceNote: 'Extended 8-minute rambling debate with 14 hesitation pauses and low vocal energy at the intro.',
    aiDirectorAction: 'Extracted key punchline at 32:10; trimmed dead air; scheduled 1.15x dynamic zoom and B-roll visual overlay.',
    retentionOutcome: 'Viewer drop-off eliminated in first 3 seconds · +89% completion rate',
  },
  {
    id: 'saas-demo',
    stepNumber: '02',
    title: 'Developer Tool Live Walkthrough & Coding',
    category: 'Product Marketing',
    rawDuration: '22 min screen recording',
    finalDuration: '42 sec product reel',
    sourceNote: 'Lengthy typing silences, terminal debug errors, and monotone explanation.',
    aiDirectorAction: 'Cut code compile wait times; highlighted key command line output; placed kinetic subtitles.',
    retentionOutcome: 'Converted technical tutorial into crisp LinkedIn demo short',
  },
  {
    id: 'founder-vlog',
    stepNumber: '03',
    title: 'Startup Founder Weekly Retrospective',
    category: 'Creator Story',
    rawDuration: '15 min smartphone video',
    finalDuration: '30 sec YouTube Short',
    sourceNote: 'Unstabilized camera, quiet background room hum, and scattered bullet points.',
    aiDirectorAction: 'Speech isolated with broadcast EQ; speech pauses removed; auto-reframed in 9:16 vertical.',
    retentionOutcome: '10x engagement boost compared to unedited full vlog upload',
  },
];

export const BeforeAfterGallery: React.FC<{ onOpenTrial?: () => void }> = ({ onOpenTrial }) => {
  const [selectedId, setSelectedId] = useState('founder-vlog');
  const activeItem = ITEMS.find((i) => i.id === selectedId) || ITEMS[0];

  return (
    <section id="showcase" className="relative py-10 sm:py-14 z-10">
      <div className="page-container">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-7 sm:mb-9">
          <SectionLabel label="Transformation Gallery" className="mb-3.5" />
          <h2 className="text-[30px] sm:text-[42px] md:text-[50px] font-extrabold text-[#F1F0F6] tracking-tight leading-[1.12] mb-4 text-balance">
            Before & After: <GradientText glow>Real Project Results.</GradientText>
          </h2>
          <p className="text-[15px] sm:text-[17px] text-[#A4A5B5] leading-relaxed max-w-2xl mx-auto">
            See the exact editorial transformations executed by Bikin Video on real footage.
          </p>
        </div>

        {/* ================= TWO-COLUMN EDITORIAL SHOWCASE LAYOUT ================= */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-6 items-stretch">
          
          {/* ── LEFT COLUMN: 3 VERTICAL PROJECT CARDS (Col 1-4 on desktop, 1-5 on tablet) ── */}
          <div className="col-span-12 md:col-span-5 lg:col-span-4 flex flex-col gap-3">
            {ITEMS.map((item) => {
              const isSelected = selectedId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedId(item.id)}
                  className={`w-full p-4 sm:p-5 rounded-2xl text-left transition-all duration-200 cursor-pointer flex flex-col justify-between flex-1 group ${
                    isSelected
                      ? 'glass-card-selected'
                      : 'glass-card glass-card-hover'
                  }`}
                >
                  <div className="space-y-2">
                    {/* Category & Duration Row */}
                    <div className="flex items-center justify-between gap-2 text-[11px] font-mono">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-bold tracking-wider shrink-0 ${
                            isSelected ? 'text-purple-300' : 'text-[#8E90A4]'
                          }`}
                        >
                          {item.stepNumber}
                        </span>
                        <span
                          className={`font-semibold whitespace-nowrap ${
                            isSelected ? 'text-purple-300' : 'text-[#B7B2CC]'
                          }`}
                        >
                          {item.category}
                        </span>
                      </div>
                      
                      <span className="shrink-0 text-purple-300 font-bold whitespace-nowrap">
                        {item.finalDuration}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      className={`text-sm sm:text-base font-bold tracking-tight ${
                        isSelected ? 'text-white' : 'text-[#E1E0E8] group-hover:text-white'
                      }`}
                    >
                      {item.title}
                    </h3>
                  </div>

                  {/* Source Note */}
                  <p className="text-xs text-[#B7B2CC] line-clamp-2 leading-relaxed pt-2">
                    {item.sourceNote}
                  </p>
                </button>
              );
            })}
          </div>

          {/* ── RIGHT COLUMN: ACTIVE TRANSFORMATION DETAIL PANEL (Col 5-12 on desktop, 6-12 on tablet) ── */}
          <div className="col-span-12 md:col-span-7 lg:col-span-8 rounded-2xl md:rounded-3xl glass-panel p-4 sm:p-6 lg:p-7 flex flex-col justify-between">
            
            {/* Header: Transformation Details & Active Title */}
            <div className="mb-5 pb-4 border-b border-white/[0.08]">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full glass-badge text-xs font-mono font-bold tracking-wider">
                  TRANSFORMATION DETAILS
                </span>
                <span className="text-xs text-[#B7B2CC] font-mono">· {activeItem.category}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                {activeItem.title}
              </h3>
            </div>

            {/* Main Interactive Comparison Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-stretch flex-1">
              
              {/* Left Sub-Column: Visual Canvas Preview (xl:col-span-7) */}
              <div className="xl:col-span-7 flex flex-col justify-between">
                <div className="relative rounded-2xl overflow-hidden bg-black border border-white/[0.08] shadow-xl w-full flex flex-col">
                  {/* Video Player Header Bar with Final Result Preview */}
                  <div className="flex items-center justify-between px-3.5 py-2 bg-[#0e0c24]/80 backdrop-blur border-b border-purple-500/20 text-[11px] font-mono text-purple-300">
                    <div className="flex items-center gap-1.5 whitespace-nowrap">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                      <span className="text-[#B7B2CC]">Final Result Preview:</span>
                    </div>
                    <span className="text-white font-bold whitespace-nowrap">{activeItem.finalDuration}</span>
                  </div>

                  {/* Video Player Canvas */}
                  <div className="relative aspect-video w-full overflow-hidden bg-black">
                    <CreatorVideoCanvas
                      isPlaying={true}
                      isAfter={true}
                      compact={true}
                      zoomLevel="normal"
                      showCaptions={true}
                      showBrollOverlay={true}
                    />
                  </div>
                </div>

                {/* Verified Engagement Outcome under video */}
                <div className="mt-3 p-3 rounded-xl glass-inset border border-emerald-500/30 flex items-center gap-2.5 text-xs text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="leading-snug">{activeItem.retentionOutcome}</span>
                </div>
              </div>

              {/* Right Sub-Column: Before vs After Breakdown + CTA (xl:col-span-5) */}
              <div className="xl:col-span-5 flex flex-col justify-between gap-3">
                {/* SOURCE FOOTAGE Card */}
                <div className="p-3.5 rounded-xl glass-inset flex flex-col justify-between flex-1">
                  <div>
                    <span className="text-[10px] text-[#B7B2CC] font-mono font-bold block mb-1 tracking-wider">
                      SOURCE FOOTAGE
                    </span>
                    <div className="text-white font-bold text-xs sm:text-sm">{activeItem.rawDuration}</div>
                  </div>
                  <div className="text-[11.5px] text-[#B7B2CC] mt-1.5 leading-relaxed">
                    {activeItem.sourceNote}
                  </div>
                </div>

                {/* AI DIRECTED OUTPUT Card */}
                <div className="p-3.5 rounded-xl glass-card flex flex-col justify-between flex-1">
                  <div>
                    <span className="text-[10px] text-purple-300 font-mono font-bold block mb-1 tracking-wider">
                      AI DIRECTED OUTPUT
                    </span>
                    <div className="text-white font-bold text-xs sm:text-sm text-purple-100">{activeItem.finalDuration}</div>
                  </div>
                  <div className="text-[11.5px] text-purple-200 mt-1.5 leading-relaxed">
                    {activeItem.aiDirectorAction}
                  </div>
                </div>

                {/* CTA Action Button */}
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={onOpenTrial}
                    className="w-full px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#8B35E8] to-[#A855F7] hover:brightness-110 transition-all cursor-pointer shadow-md flex items-center justify-center gap-2 group"
                  >
                    <span>Edit Your Footage Like This</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default BeforeAfterGallery;
