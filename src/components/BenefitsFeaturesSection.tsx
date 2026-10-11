import React, { useState } from 'react';
import { SectionLabel } from './SectionLabel';
import { GradientText } from './GradientText';
import { ScrollReveal } from './ScrollReveal';
import {
  Zap,
  Sparkles,
  Sliders,
  CheckCircle,
  Clock,
  Volume2,
  Crop,
  Layers,
  FileCode2,
  Wand2,
  Type,
} from 'lucide-react';

export const BenefitsFeaturesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'speed' | 'quality' | 'control'>('speed');

  const benefitGroups = {
    speed: {
      title: 'Editing Speed',
      headline: 'Turn hours of manual cuts into seconds.',
      desc: 'Bikin Video understands speech transcript cadence to instantly extract viral hooks and trim filler pauses.',
      features: [
        {
          name: 'Text-Based Editing',
          detail: 'Delete words in the transcript to automatically cut the corresponding video footage.',
          icon: Type,
        },
        {
          name: 'Auto-Pause Trimming',
          detail: 'Detect and remove awkward silences over 400ms across your entire timeline in 1 click.',
          icon: Clock,
        },
        {
          name: 'Best-Take Auto-Selection',
          detail: 'When multiple takes occur, the AI compares delivery confidence and picks the strongest.',
          icon: Sparkles,
        },
        {
          name: 'Batch Shorts Generation',
          detail: 'Extract up to 10 distinct viral vertical clips from a single 45-minute podcast episode.',
          icon: Zap,
        },
      ],
      previewHeadline: 'Transcript Cut Engine',
      previewGraphic: 'Text-Driven Fast Cut',
      previewStats: '10x Faster Turnaround',
    },
    quality: {
      title: 'Visual & Audio Quality',
      headline: 'Studio-grade B-roll, captions, and sound balance.',
      desc: 'High-retention shorts require pacing and motion. Bikin Video injects visual momentum automatically.',
      features: [
        {
          name: 'AI Contextual B-Roll',
          detail: 'Pulls context-aware 4K B-roll and motion cutaways that illustrate the speaker’s exact words.',
          icon: Layers,
        },
        {
          name: 'Kinetic Animated Captions',
          detail: 'Render animated word-by-word karaoke highlights with custom emoji and high-contrast styling.',
          icon: Sparkles,
        },
        {
          name: 'Smart 9:16 AI Reframe',
          detail: 'Keeps the speaker centered with smooth cinematic panning even during dynamic movement.',
          icon: Crop,
        },
        {
          name: 'Studio Voice Enhancement',
          detail: 'Eliminates room echo, background hum, and levels vocal presence with studio mastering.',
          icon: Volume2,
        },
      ],
      previewHeadline: 'Dynamic Visual Layering',
      previewGraphic: '4K B-Roll & Kinetic Text',
      previewStats: 'Broadcast Audio Standards',
    },
    control: {
      title: 'Creative Control',
      headline: 'The power of a professional NLE timeline.',
      desc: 'You are always in the director’s chair. Adjust every cut, swap B-roll, customize typography, or export to Premiere.',
      features: [
        {
          name: 'Multi-Track Timeline',
          detail: 'Independent tracks for speaker footage, B-roll layers, audio tracks, and caption overlays.',
          icon: Sliders,
        },
        {
          name: 'Brand Templates & Fonts',
          detail: 'Store brand colors, custom font uploads, logos, and lower-third overlays for consistency.',
          icon: Wand2,
        },
        {
          name: 'Premiere & DaVinci XML Export',
          detail: 'Export complete timeline sequences with non-destructive cuts into Adobe Premiere Pro.',
          icon: FileCode2,
        },
        {
          name: 'Precision Millisecond Trimming',
          detail: 'Fine-tune in/out cut points with scrubbable waveforms and frame-accurate playhead snapping.',
          icon: Sliders,
        },
      ],
      previewHeadline: 'Director’s Timeline Control',
      previewGraphic: 'Full NLE Interoperability',
      previewStats: 'Lossless XML Interop',
    },
  };

  const current = benefitGroups[activeTab];

  return (
    <section id="features" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 z-10 bg-[#090B16]/50 border-t border-white/[0.06]">
      <div className="max-w-[1240px] mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <ScrollReveal delay={0}>
            <SectionLabel label="Engineered for Creators" className="mb-4" />
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <h2 className="text-[32px] sm:text-[42px] md:text-[50px] font-bold text-white tracking-tight leading-[1.12] mb-4 text-balance">
              Engineered for <GradientText glow>impact, speed, and control.</GradientText>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <p className="text-[15px] sm:text-[17px] text-[#A4A5B5] leading-relaxed max-w-2xl mx-auto">
              Everything you need to transform raw footage into audience-growing short videos without repetitive manual editing tasks.
            </p>
          </ScrollReveal>
        </div>

        {/* 3 Benefit Selector Tabs */}
        <ScrollReveal delay={250}>
          <div className="flex items-center justify-center gap-2 mb-10">
            <div className="inline-flex items-center p-1.5 rounded-2xl bg-[#121526] border border-white/[0.08]">
              {(['speed', 'quality', 'control'] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    activeTab === tab
                      ? 'bg-[#8B35E8] text-white shadow-[0_0_18px_rgba(139,53,232,0.5)]'
                      : 'text-[#A4A5B5] hover:text-white'
                  }`}
                >
                  {benefitGroups[tab].title}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content Showcase */}
          <div className="rounded-3xl bg-[#0E1122] border border-white/[0.08] p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Features List (Col 1-7) */}
              <div className="lg:col-span-7">
                <div className="mb-6">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
                    {current.headline}
                  </h3>
                  <p className="text-sm text-[#A4A5B5] leading-relaxed">
                    {current.desc}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {current.features.map((feat) => {
                    const IconComp = feat.icon;
                    return (
                      <div
                        key={feat.name}
                        className="p-4 rounded-2xl bg-[#14172B] border border-white/5 hover:border-purple-500/30 transition-colors"
                      >
                        <div className="w-8 h-8 rounded-lg bg-purple-950/60 text-purple-300 flex items-center justify-center mb-2.5 border border-purple-500/20">
                          <IconComp className="w-4 h-4" />
                        </div>
                        <h4 className="text-sm font-bold text-white mb-1">
                          {feat.name}
                        </h4>
                        <p className="text-xs text-[#A4A5B5] leading-relaxed">
                          {feat.detail}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Showcase Graphic (Col 8-12) */}
              <div className="lg:col-span-5 p-6 rounded-2xl bg-[#14182E] border border-purple-500/20 flex flex-col justify-between min-h-[300px]">
                <div className="flex items-center justify-between pb-3 border-b border-white/5">
                  <span className="text-xs font-mono text-purple-300">
                    {current.previewHeadline}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded">
                    {current.previewStats}
                  </span>
                </div>

                <div className="my-8 text-center p-6 rounded-xl bg-black/40 border border-white/5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white mx-auto mb-3 shadow-[0_0_25px_rgba(139,53,232,0.4)]">
                    <Sparkles className="w-7 h-7" />
                  </div>
                  <strong className="text-base font-bold text-white block mb-1">
                    {current.previewGraphic}
                  </strong>
                  <p className="text-xs text-[#A4A5B5]">
                    Engineered with deterministic timeline validation and GPU cloud encoding.
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-[#77798B]">
                  <span>Export Format:</span>
                  <span className="text-white font-mono">1080x1920 MP4 & XML</span>
                </div>
              </div>

            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
