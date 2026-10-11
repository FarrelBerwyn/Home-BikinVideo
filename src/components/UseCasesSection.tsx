import React, { useState } from 'react';
import { SectionLabel } from './SectionLabel';
import { GradientText } from './GradientText';
import { Video, Mic, Users, Briefcase, ChevronRight, Check } from 'lucide-react';

interface UseCase {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  tagline: string;
  description: string;
  targetFormat: string;
  aspectRatio: string;
  platforms: string[];
  workflowSteps: string[];
}

const USE_CASES: UseCase[] = [
  {
    id: 'creators',
    name: 'Content Creators',
    icon: Video,
    tagline: 'Turn Long Stream VODs into Viral Shorts in 5 Minutes',
    description:
      'Stop spending entire days re-watching your 3-hour Twitch streams or YouTube vlogs. Bikin Video flags your top highlight moments and exports 9:16 vertical shorts with energetic dynamic captions.',
    targetFormat: '1080x1920 60fps (9:16)',
    aspectRatio: '9:16',
    platforms: ['TikTok', 'YouTube Shorts', 'Instagram Reels'],
    workflowSteps: [
      'Auto-detect highest energy gaming/speaking moments',
      'Smart 9:16 face-tracking reframe',
      'Generate trendy karaoke-style word captions',
    ],
  },
  {
    id: 'podcasters',
    name: 'Podcasters',
    icon: Mic,
    tagline: 'Multiply Episode Reach Across Every Social Platform',
    description:
      'Extract the 5 most thought-provoking arguments from your podcast interview. Bikin Video handles speaker switching, cuts rambling questions, and inserts contextual B-roll seamlessly.',
    targetFormat: '1080x1920 (Shorts) & 1920x1080 (YouTube)',
    aspectRatio: '9:16 / 16:9',
    platforms: ['Spotify Video', 'Apple Podcasts', 'YouTube', 'TikTok'],
    workflowSteps: [
      'Multi-speaker audio transcription & pause trimming',
      'Auto-identify controversial & high-impact quotes',
      'Lossless XML export for fine-tuning in Premiere Pro',
    ],
  },
  {
    id: 'marketing',
    name: 'Marketing Teams',
    icon: Users,
    tagline: 'Repurpose Customer Webinars into Product Ad Creatives',
    description:
      'Transform recorded Zoom demos, product launches, and customer testimonials into high-converting social ads and LinkedIn thought leadership clips.',
    targetFormat: '1080x1080 (1:1) & 1080x1920 (9:16)',
    aspectRatio: '1:1 / 9:16',
    platforms: ['LinkedIn Video', 'Instagram Ads', 'X (Twitter)', 'Meta Ads'],
    workflowSteps: [
      'Enforce corporate brand template & typography',
      'Generate punchy 30-second problem-solution cuts',
      'Clean broadcast audio with voice isolation',
    ],
  },
  {
    id: 'agencies',
    name: 'Agencies & Businesses',
    icon: Briefcase,
    tagline: 'Scale Client Video Production by 10x Without Burnout',
    description:
      'Manage multiple client workspaces with distinct brand kits, custom typography, and team review pipelines. Export clean Premiere XML to keep your senior editors happy.',
    targetFormat: 'Multi-Aspect Ratio Batch Render',
    aspectRatio: '9:16, 16:9, 1:1, 4:5',
    platforms: ['Multi-Client Client Portals', 'YouTube', 'Meta', 'TikTok'],
    workflowSteps: [
      'Centralized client brand kits and watermark assets',
      'Batch process 20+ episodes simultaneously',
      'Zero vendor lock-in with DaVinci & Premiere project export',
    ],
  },
];

export const UseCasesSection: React.FC<{ onOpenTrial: () => void }> = ({ onOpenTrial }) => {
  const [activeTabId, setActiveTabId] = useState('creators');
  const activeCase = USE_CASES.find((c) => c.id === activeTabId) || USE_CASES[0];

  return (
    <section id="use-cases" className="relative py-10 sm:py-16 z-10 bg-[#070914]/60">
      <div className="page-container">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-7 sm:mb-9">
          <SectionLabel label="Domain Tailored Workflows" className="mb-3.5" />
          <h2 className="text-[30px] sm:text-[42px] md:text-[50px] font-extrabold text-[#F1F0F6] tracking-tight leading-[1.12] mb-4 text-balance">
            One Editing Workflow. <GradientText glow>Different Creative Goals.</GradientText>
          </h2>
          <p className="text-[15px] sm:text-[17px] text-[#A4A5B5] leading-relaxed max-w-2xl mx-auto">
            Whether you are a solo streamer, a studio podcast host, or a marketing agency managing dozens of client brands.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center justify-center mb-10 overflow-x-auto pb-2">
          <div className="inline-flex p-1.5 rounded-2xl glass-inset shadow-lg shrink-0">
            {USE_CASES.map((uc) => {
              const IconComp = uc.icon;
              const isSelected = activeTabId === uc.id;
              return (
                <button
                  key={uc.id}
                  type="button"
                  onClick={() => setActiveTabId(uc.id)}
                  className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#6D28D9] to-[#8B35F2] text-white shadow-[0_0_20px_rgba(139,53,242,0.45)] border border-purple-400/40'
                      : 'text-[#B7B2CC] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <IconComp className="w-4 h-4" />
                  <span>{uc.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Use Case Details Container */}
        <div className="rounded-3xl glass-panel p-5 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-center">
            
            {/* Left Content (Col 1-7 on desktop & tablet) */}
            <div className="col-span-12 md:col-span-7 lg:col-span-7 space-y-4 sm:space-y-5">
              <div>
                <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider block mb-2">
                  Use Case: {activeCase.name}
                </span>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight mb-3">
                  {activeCase.tagline}
                </h3>
                <p className="text-sm text-[#B7B2CC] leading-relaxed">
                  {activeCase.description}
                </p>
              </div>

              {/* Workflow Highlights Checklist */}
              <div className="space-y-2 pt-2">
                {activeCase.workflowSteps.map((step, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-[#E1E0E8]">
                    <div className="w-4 h-4 rounded-full bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    <span>{step}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex items-center gap-3">
                <button
                  type="button"
                  onClick={onOpenTrial}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#8B35E8] to-[#A855F7] hover:brightness-110 transition-all cursor-pointer shadow-md"
                >
                  Start {activeCase.name} Workflow
                </button>
              </div>
            </div>

            {/* Right Target Output Spec Card (Col 8-12 on desktop & tablet) */}
            <div className="col-span-12 md:col-span-5 lg:col-span-5 p-5 sm:p-6 rounded-2xl glass-card flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[11px] font-mono text-[#B7B2CC] uppercase tracking-wider block mb-1">
                  Preset Target Output
                </span>
                <div className="text-xl font-bold text-white font-mono mb-2">
                  {activeCase.targetFormat}
                </div>
                <div className="text-xs text-[#B7B2CC] leading-relaxed">
                  Optimized bitrate, frame rates, and mobile aspect ratios for social algorithm feeds.
                </div>
              </div>

              <div>
                <span className="text-[11px] font-mono text-[#B7B2CC] uppercase tracking-wider block mb-2">
                  Validated Distribution Channels:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeCase.platforms.map((plat) => (
                    <span
                      key={plat}
                      className="px-2.5 py-1 rounded-lg glass-pill text-xs font-medium"
                    >
                      {plat}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
