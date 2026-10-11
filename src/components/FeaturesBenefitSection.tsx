import React, { useState } from 'react';
import { SectionLabel } from './SectionLabel';
import { GradientText } from './GradientText';
import {
  Zap,
  Sparkles,
  Sliders,
  Scissors,
  Captions,
  FileCode2,
  Film,
  Mic,
  Crop,
  Layers,
  PanelsTopLeft,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

export const FeaturesBenefitSection: React.FC<{ onOpenTrial: () => void }> = ({ onOpenTrial }) => {
  const [activeGroup, setActiveGroup] = useState<'speed' | 'quality' | 'control'>('speed');

  const groups = [
    {
      id: 'speed',
      label: 'Editing Speed',
      headline: 'Cut Hours of Editing Down to Minutes',
      subtitle: 'Eliminate manual tedious timeline scrubbing. Let AI understand speech, detect silences, and organize your best takes.',
      icon: Zap,
      features: [
        {
          title: 'Text-Based Editing',
          description: 'Edit your video like a text document. Delete words from the transcript to cut them from the timeline.',
          badge: 'Popular',
          icon: Scissors,
        },
        {
          title: 'Automated Silence Trimming',
          description: 'Instantly remove unnatural pauses, hesitation breaths, and dead air with customizable threshold sliders.',
          badge: 'Auto',
          icon: Zap,
        },
        {
          title: 'Best-Take Recognition',
          description: 'When repeating lines during a recording, Bikin Video selects the clearest delivery automatically.',
          badge: 'AI Director',
          icon: Sparkles,
        },
        {
          title: 'Instant 1-Click Viral Shorts',
          description: 'Turn a 60-minute podcast into 10 high-retention short clips ready for TikTok, Shorts, and Reels.',
          badge: 'Fast',
          icon: Film,
        },
      ],
      showcaseVisual: {
        title: 'Transcript-Driven Cut Matrix',
        detail: 'Deleted 14 filler words in 1 click · Pacing increased by +34%',
      },
    },
    {
      id: 'quality',
      label: 'Visual & Audio Quality',
      headline: 'Cinematic Polish with Zero Complex Plugins',
      subtitle: 'Automatically enhance audio intelligibility, generate context-aware B-roll, and craft viral kinetic captions.',
      icon: Sparkles,
      features: [
        {
          title: 'Contextual AI B-Roll Insertion',
          description: 'Automatically detects when concepts need visual support and places relevant B-roll clips on Track 2.',
          badge: 'New',
          icon: Film,
        },
        {
          title: 'Kinetic Animated Captions',
          description: 'Word-by-word karaoke style highlighted subtitles in 30+ languages, including Indonesian slang & accents.',
          badge: 'Updated',
          icon: Captions,
        },
        {
          title: 'AI Active Speaker Reframe',
          description: 'Keeps the speaking subject centered in 9:16 vertical video even with erratic camera movements.',
          badge: 'Smart Crop',
          icon: Crop,
        },
        {
          title: 'Broadcast Speech Enhancer',
          description: 'Removes room reverb, fan hum, and background noise to make budget mics sound like a studio setup.',
          badge: 'Pro Audio',
          icon: Mic,
        },
      ],
      showcaseVisual: {
        title: 'B-Roll & Audio Ducking Engine',
        detail: 'Synchronized visual overlay on Track V2 · -14dB smart speech ducking',
      },
    },
    {
      id: 'control',
      label: 'Creative Control',
      headline: 'No Black Boxes. Full Timeline Freedom.',
      subtitle: 'Unlike rigid text-to-video tools, every cut in Bikin Video is standard, non-destructive, and exportable to Premiere.',
      icon: Sliders,
      features: [
        {
          title: 'Lossless XML / EDL Export',
          description: 'Send projects directly to Adobe Premiere Pro, DaVinci Resolve, or Final Cut with zero quality loss.',
          badge: 'No Lock-in',
          icon: FileCode2,
        },
        {
          title: 'Full Multitrack Timeline',
          description: 'Adjust cuts, keyframes, transitions, and audio levels frame-by-frame on traditional video/audio tracks.',
          badge: 'Studio',
          icon: Layers,
        },
        {
          title: 'Reusable Brand Kits',
          description: 'Save custom subtitle fonts, color schemes, watermark logos, and intros for automated team consistency.',
          badge: 'Teams',
          icon: PanelsTopLeft,
        },
        {
          title: 'Non-Destructive History',
          description: 'Unlimited undo/redo stack allows experimentation without risk of losing original source footage.',
          badge: 'Safe',
          icon: Sliders,
        },
      ],
      showcaseVisual: {
        title: 'Lossless Premiere XML Bridge',
        detail: 'Direct export with native tracks, markers, and clip metadata intact',
      },
    },
  ];

  const currentGroup = groups.find((g) => g.id === activeGroup) || groups[0];

  return (
    <section id="features" className="relative py-10 sm:py-14 z-10">
      <div className="page-container">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-7 sm:mb-9">
          <SectionLabel label="Engineered for Production" className="mb-3.5" />
          <h2 className="text-[30px] sm:text-[42px] md:text-[50px] font-extrabold text-[#F1F0F6] tracking-tight leading-[1.12] mb-4 text-balance">
            Powerful Features. <GradientText glow>Zero Clutter.</GradientText>
          </h2>
          <p className="text-[15px] sm:text-[17px] text-[#A4A5B5] leading-relaxed max-w-2xl mx-auto">
            Organized around what matters: how fast you can edit, how good your video looks, and how much control you keep over the final cut.
          </p>
        </div>

        {/* 3 Benefit Selector Tabs */}
        <div className="flex items-center justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-2xl glass-inset shadow-lg">
            {groups.map((g) => {
              const IconComponent = g.icon;
              const isActive = activeGroup === g.id;
              return (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setActiveGroup(g.id as any)}
                  className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#6D28D9] to-[#8B35F2] text-white shadow-[0_0_24px_rgba(139,53,242,0.45)] border border-purple-400/40'
                      : 'text-[#B7B2CC] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{g.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ================= ACTIVE BENEFIT SHOWCASE CONTAINER ================= */}
        <div className="rounded-3xl glass-panel p-6 sm:p-10">
          
          <div className="max-w-2xl mb-8">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
              {currentGroup.headline}
            </h3>
            <p className="text-sm text-[#B7B2CC] leading-relaxed">
              {currentGroup.subtitle}
            </p>
          </div>

          {/* 4 Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {currentGroup.features.map((feat, i) => {
              const IconComp = feat.icon;
              return (
                <div
                  key={i}
                  className="p-5 sm:p-6 rounded-2xl glass-card glass-card-hover flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-xl glass-icon-box flex items-center justify-center text-purple-200 shrink-0">
                    <IconComp className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <h4 className="text-base font-bold text-white tracking-tight">
                        {feat.title}
                      </h4>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold glass-badge">
                        {feat.badge}
                      </span>
                    </div>

                    <p className="text-xs sm:text-[13px] text-[#B7B2CC] leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Action strip */}
          <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-mono text-purple-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Active in current engine: {currentGroup.showcaseVisual.title}</span>
            </div>

            <button
              type="button"
              onClick={onOpenTrial}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-[#8B35E8] to-[#A855F7] hover:brightness-110 transition-all cursor-pointer shadow-md"
            >
              <span>Try {currentGroup.label} Features</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
