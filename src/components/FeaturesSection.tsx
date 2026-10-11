import React, { useState } from 'react';
import { SectionLabel } from './SectionLabel';
import { GradientText } from './GradientText';
import { ScrollReveal } from './ScrollReveal';
import {
  ChevronRight,
  Sparkles,
  Play,
  Volume2,
  Subtitles,
  Languages,
  Monitor,
  Film,
  Music,
} from 'lucide-react';

interface FeaturesSectionProps {
  onOpenTrial: () => void;
  onOpenPreviewModal: (title: string, type: string) => void;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({
  onOpenTrial,
  onOpenPreviewModal,
}) => {
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const [activeSubtitleLang, setActiveSubtitleLang] = useState<'en' | 'ru' | 'zh'>('en');

  return (
    <section id="features" className="relative py-10 sm:py-14 z-10">
      <div className="page-container">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <ScrollReveal delay={0}>
            <SectionLabel label="Features" className="mb-4 sm:mb-5" />
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <h2 className="text-[32px] sm:text-[42px] md:text-[50px] font-bold text-[#F1F0F6] tracking-tight leading-[1.12] mb-5 text-balance">
              Your go-to tool for crafting
              <br className="hidden sm:inline" /> viral Shorts <GradientText glow>using AI.</GradientText>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <p className="text-[15px] sm:text-[17px] text-[#A4A5B5] leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-9">
              Produce an endless number of short videos simultaneously. Automatically generate captions, effects, backgrounds, and music for you.
            </p>
          </ScrollReveal>

          {/* Action Buttons */}
          <ScrollReveal delay={300}>
            <div className="flex items-center justify-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={onOpenTrial}
                className="group inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-[13px] sm:text-[14px] font-semibold text-white bg-gradient-to-r from-[#8B35E8] to-[#9E45E8] hover:from-[#9D44F2] hover:to-[#B352FA] active:scale-95 transition-all duration-200 cursor-pointer shadow-md shadow-black/40"
              >
                <span>Try now</span>
                <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>

              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('hero-demo');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-[13px] sm:text-[14px] font-semibold text-[#A4A5B5] hover:text-white bg-[#121524] border border-[#a082dc]/20 hover:border-[#a082dc]/40 active:scale-95 transition-all duration-200 cursor-pointer"
              >
                <span>Learn more</span>
                <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
            </div>
          </ScrollReveal>
        </div>

        {/* 6-Card Bento Grid */}
        <div className="space-y-6 lg:space-y-7">
          
          {/* ================= ROW 1 (3 Cards, center is wider) ================= */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-7 items-stretch">
            
            {/* Card 1: Instantly Automate Videos (Col 1-4) */}
            <ScrollReveal delay={100} className="md:col-span-4 h-full">
              <div className="h-full flex flex-col justify-between p-6 sm:p-7 rounded-2xl glass-card glass-card-hover group">
                {/* Visual: Floating chips */}
                <div className="h-[140px] rounded-xl glass-inset p-4 flex flex-col justify-center gap-2.5 relative overflow-hidden mb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-pill text-[11px] w-fit transition-transform group-hover:translate-x-1 duration-300">
                    <Film className="w-3 h-3 text-purple-300" />
                    <span>Video Background</span>
                  </div>

                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-600/40 to-pink-600/40 border border-purple-300/40 text-[11px] text-white w-fit ml-4 transition-transform group-hover:-translate-x-1 duration-300 shadow-sm">
                    <Sparkles className="w-3 h-3 text-pink-200" />
                    <span>Script Creation</span>
                  </div>

                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-pill text-[11px] w-fit transition-transform group-hover:translate-x-1 duration-300">
                    <Volume2 className="w-3 h-3 text-purple-300" />
                    <span>Voice Narrator</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-[17px] sm:text-[18px] font-bold text-white mb-2">
                    Instantly automate videos.
                  </h3>
                  <p className="text-[13px] text-[#B7B2CC] leading-relaxed">
                    Generate captions, effects, music, & backgrounds in a second.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Card 2: Centerpiece AI Video Creator (Col 5-8, WIDER MARQUEE) - Level B Featured Glass Card */}
            <ScrollReveal delay={200} className="md:col-span-4 lg:col-span-5 h-full">
              <div className="h-full flex flex-col items-center justify-center text-center p-6 sm:p-8 rounded-2xl glass-card-featured relative overflow-hidden group">
                {/* Central sparkle icon */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-full border border-purple-300/25 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#8B35E8] to-[#D946EF] flex items-center justify-center shadow-lg shadow-black/50 group-hover:scale-110 transition-transform duration-300 border border-white/20">
                      <svg
                        viewBox="0 0 24 24"
                        className="w-7 h-7 text-white fill-white"
                      >
                        <path d="M12 2L14.2 9.8L22 12L14.2 14.2L12 22L9.8 14.2L2 12L9.8 9.8L12 2Z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <h3 className="text-[20px] sm:text-[22px] font-bold text-white tracking-tight mb-2">
                  Your AI-powered
                  <br />
                  video <GradientText>creator</GradientText>
                </h3>
              </div>
            </ScrollReveal>

            {/* Card 3: Video Background (Col 9-12) */}
            <ScrollReveal delay={300} className="md:col-span-4 lg:col-span-3 h-full">
              <div className="h-full flex flex-col justify-between p-6 sm:p-7 rounded-2xl glass-card glass-card-hover group">
                {/* Visual: 3 portrait-style preview thumbnails */}
                <div className="h-[140px] rounded-xl glass-inset p-3 flex items-center justify-center gap-2 mb-6 overflow-hidden">
                  {[
                    { name: 'Forest', grad: 'from-emerald-700 to-teal-900', label: 'Mythic Woods' },
                    { name: 'Sunset', grad: 'from-pink-600 to-purple-900', label: 'Neon Skies' },
                    { name: 'Crystal', grad: 'from-blue-600 to-indigo-950', label: 'Glacier' },
                  ].map((thumb, i) => (
                    <div
                      key={thumb.name}
                      className={`w-16 h-24 rounded-lg bg-gradient-to-b ${thumb.grad} p-1.5 flex flex-col justify-end border border-white/15 shadow-sm transition-all duration-300 ${
                        i === 1 ? 'scale-105 border-purple-300 ring-2 ring-purple-400/40 -translate-y-1 z-10 shadow-md shadow-black/40' : 'opacity-80'
                      }`}
                    >
                      <span className="text-[8px] font-semibold text-white drop-shadow truncate">
                        {thumb.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div>
                  <h3 className="text-[17px] sm:text-[18px] font-bold text-white mb-2">
                    Video Background
                  </h3>
                  <p className="text-[13px] text-[#B7B2CC] leading-relaxed">
                    Choose an AI-generated custom video template from our library.
                  </p>
                </div>
              </div>
            </ScrollReveal>

          </div>

          {/* ================= ROW 2 (3 Balanced Cards) ================= */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7 items-stretch">
            
            {/* Card 4: AI Voice Narrator */}
            <ScrollReveal delay={150} className="h-full">
              <div className="h-full flex flex-col justify-between p-6 sm:p-7 rounded-2xl glass-card glass-card-hover group">
                {/* Visual: Audio Player Capsule */}
                <div className="h-[140px] rounded-xl glass-inset p-4 flex flex-col items-center justify-center mb-6">
                  {/* Pill voice track */}
                  <div className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-full bg-gradient-to-r from-purple-950/70 to-pink-950/70 border border-purple-400/30">
                    <button
                      type="button"
                      onClick={() => setIsPlayingVoice(!isPlayingVoice)}
                      aria-label="Toggle voice sample"
                      className="w-6 h-6 rounded-full bg-[#8B35E8] flex items-center justify-center text-white cursor-pointer hover:scale-105 transition-transform"
                    >
                      {isPlayingVoice ? <Volume2 className="w-3.5 h-3.5" /> : <Play className="w-3 h-3 ml-0.5 fill-white" />}
                    </button>
                    <span className="text-[12px] font-medium text-purple-200">
                      Mermaid Deep Ocean
                    </span>
                    <span className="text-[10px] font-mono text-purple-400">
                      {isPlayingVoice ? 'Playing...' : '0:34'}
                    </span>
                  </div>

                  {/* Audio frequency wave dots */}
                  <div className="flex items-center gap-1 mt-3">
                    {[12, 18, 26, 34, 22, 16, 28, 36, 18, 14].map((h, i) => (
                      <div
                        key={i}
                        className="w-1 rounded-full bg-purple-400/60 transition-all duration-200"
                        style={{
                          height: isPlayingVoice ? `${Math.max(8, h * 0.9)}px` : `${h * 0.6}px`,
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-[17px] sm:text-[18px] font-bold text-white mb-2">
                    AI Voice Narrator
                  </h3>
                  <p className="text-[13px] text-[#B7B2CC] leading-relaxed">
                    Quickly generate lifelike AI voiceovers, converting text into natural-sounding narration.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Card 5: Cross Platform Videos */}
            <ScrollReveal delay={250} className="h-full">
              <div className="h-full flex flex-col justify-between p-6 sm:p-7 rounded-2xl glass-card glass-card-hover group">
                {/* Visual: Video monitor frame with play button */}
                <div className="h-[140px] rounded-xl glass-inset p-4 flex items-center justify-center mb-6">
                  <div className="w-48 h-24 rounded-lg bg-[#14122c]/80 border border-purple-400/25 flex items-center justify-center relative shadow-inner">
                    <button
                      type="button"
                      onClick={() => onOpenPreviewModal('Cross-Platform Multi-Aspect Ratio Preview', 'Explainer Videos')}
                      aria-label="Open cross platform video preview"
                      className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#6D28D9] to-[#8B35F2] hover:brightness-110 active:scale-95 text-white flex items-center justify-center shadow-md shadow-black/50 cursor-pointer transition-transform border border-white/25"
                    >
                      <Play className="w-4 h-4 ml-0.5 fill-white" />
                    </button>
                    {/* Corner dimension labels */}
                    <span className="absolute bottom-1.5 left-2 text-[9px] font-mono text-[#B7B2CC]">
                      9:16 / 16:9 / 1:1
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-[17px] sm:text-[18px] font-bold text-white mb-2">
                    Cross Platform Videos
                  </h3>
                  <p className="text-[13px] text-[#B7B2CC] leading-relaxed">
                    Create videos tailored for various platforms, including YouTube, Instagram, and TikTok.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Card 6: Auto Subtitle Generation */}
            <ScrollReveal delay={350} className="h-full">
              <div className="h-full flex flex-col justify-between p-6 sm:p-7 rounded-2xl glass-card glass-card-hover group">
                {/* Visual: Subtitle translation chips */}
                <div className="h-[140px] rounded-xl glass-inset p-3 flex flex-col justify-center gap-2 mb-6">
                  <button
                    type="button"
                    onClick={() => setActiveSubtitleLang('en')}
                    className={`text-left px-2.5 py-1.5 rounded-lg text-[11px] font-sans truncate transition-colors cursor-pointer ${
                      activeSubtitleLang === 'en'
                        ? 'bg-purple-950/70 text-purple-200 border border-purple-400/40 shadow-sm'
                        : 'text-[#B7B2CC] bg-[#121028]/60 border border-white/5 hover:border-purple-400/20'
                    }`}
                  >
                    There lived a certain man in Russia long ago
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveSubtitleLang('ru')}
                    className={`text-left px-2.5 py-1.5 rounded-lg text-[11px] font-sans truncate transition-colors cursor-pointer ${
                      activeSubtitleLang === 'ru'
                        ? 'bg-gradient-to-r from-purple-800 to-pink-800 text-white border border-purple-300 shadow-sm'
                        : 'text-[#B7B2CC] bg-[#121028]/60 border border-white/5 hover:border-purple-400/20'
                    }`}
                  >
                    Давным-давно в России жил человек
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveSubtitleLang('zh')}
                    className={`text-left px-2.5 py-1.5 rounded-lg text-[11px] font-sans truncate transition-colors cursor-pointer ${
                      activeSubtitleLang === 'zh'
                        ? 'bg-purple-950/70 text-purple-200 border border-purple-400/40 shadow-sm'
                        : 'text-[#B7B2CC] bg-[#121028]/60 border border-white/5 hover:border-purple-400/20'
                    }`}
                  >
                    很久以前，在俄罗斯有一个人。
                  </button>
                </div>

                <div>
                  <h3 className="text-[17px] sm:text-[18px] font-bold text-white mb-2">
                    Auto Subtitle Generation.
                  </h3>
                  <p className="text-[13px] text-[#B7B2CC] leading-relaxed">
                    Automatically generate clear subtitles in any language, from Chinese to Russian and beyond.
                  </p>
                </div>
              </div>
            </ScrollReveal>

          </div>

        </div>

      </div>
    </section>
  );
};
