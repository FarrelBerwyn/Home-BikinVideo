import React, { useState } from 'react';
import { SectionLabel } from './SectionLabel';
import { GradientText } from './GradientText';
import { ScrollReveal } from './ScrollReveal';
import { Sparkles, Check, Music, Download } from 'lucide-react';

interface WorkflowSectionProps {
  onOpenTrial: () => void;
}

export const WorkflowSection: React.FC<WorkflowSectionProps> = ({ onOpenTrial }) => {
  const [selectedTone, setSelectedTone] = useState<'Funny' | 'Fairy' | 'Lullaby'>('Funny');
  const [selectedBgIndex, setSelectedBgIndex] = useState(1);
  const [selectedFormat, setSelectedFormat] = useState('1080p MP4');

  return (
    <section id="how-it-works" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-[1240px] mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <ScrollReveal delay={0}>
            <SectionLabel label="How it works" className="mb-5 sm:mb-6" />
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <h2 className="text-[32px] sm:text-[42px] md:text-[50px] font-bold text-[#F1F0F6] tracking-tight leading-[1.12] mb-5 text-balance">
              Turn ideas into
              <br className="hidden sm:inline" /> short videos in{' '}
              <GradientText glow>seconds.</GradientText>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <p className="text-[15px] sm:text-[17px] text-[#A4A5B5] leading-relaxed max-w-2xl mx-auto">
              Produce endless short videos instantly. Automatically generate captions, effects, backgrounds, and music.
            </p>
          </ScrollReveal>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          
          {/* Card 1: Write & Outline */}
          <ScrollReveal delay={150} className="h-full">
            <div className="group h-full flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-[#0F1220]/90 border border-[#a082dc]/15 hover:border-[#a082dc]/40 hover:-translate-y-1.5 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_15px_35px_rgba(139,53,232,0.15)]">
              {/* Card visual mock */}
              <div className="p-4 rounded-xl bg-[#141829] border border-[#a082dc]/15 mb-6 space-y-3.5">
                <div>
                  <span className="block text-[11px] font-medium text-[#A4A5B5] mb-1.5">
                    Enter Your Story Topic
                  </span>
                  <div className="px-3 py-2 rounded-lg bg-[#1A1F36] border border-[#a082dc]/15 text-[12px] text-white/90 font-mono truncate">
                    Playful baby elephant winter tale
                  </div>
                </div>

                <div>
                  <span className="block text-[11px] font-medium text-[#A4A5B5] mb-1.5">
                    Select Story Tone
                  </span>
                  <div className="flex items-center gap-1.5">
                    {(['Funny', 'Fairy', 'Lullaby'] as const).map((tone) => (
                      <button
                        key={tone}
                        type="button"
                        onClick={() => setSelectedTone(tone)}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer ${
                          selectedTone === tone
                            ? 'bg-[#8B35E8] text-white shadow-[0_0_10px_rgba(139,53,232,0.5)]'
                            : 'bg-[#1A1F36] text-[#A4A5B5] hover:text-white'
                        }`}
                      >
                        {tone}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-1">
                  <div className="flex justify-between text-[11px] text-[#737588] mb-1">
                    <span>Max Words</span>
                    <span className="text-purple-300 font-mono">150 words</span>
                  </div>
                  <div className="w-full h-1 bg-black/40 rounded-full overflow-hidden">
                    <div className="w-2/3 h-full bg-gradient-to-r from-purple-500 to-pink-500" />
                  </div>
                </div>
              </div>

              {/* Card Text Content */}
              <div>
                <h3 className="text-[18px] sm:text-[19px] font-bold text-white mb-2 tracking-tight">
                  1. Write & Outline
                </h3>
                <p className="text-[13.5px] text-[#A4A5B5] leading-relaxed">
                  Kick off by drafting a script with a prompt or by choosing from available template suggestions.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 2: Customise & Style */}
          <ScrollReveal delay={250} className="h-full">
            <div className="group h-full flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-[#0F1220]/90 border border-[#a082dc]/15 hover:border-[#a082dc]/40 hover:-translate-y-1.5 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_15px_35px_rgba(139,53,232,0.15)]">
              {/* Card visual mock */}
              <div className="p-4 rounded-xl bg-[#141829] border border-[#a082dc]/15 mb-6 space-y-3.5">
                <div>
                  <span className="block text-[11px] font-medium text-[#A4A5B5] mb-1.5">
                    Video Orientation
                  </span>
                  <div className="px-3 py-1.5 rounded-lg bg-[#1A1F36] border border-[#a082dc]/15 text-[12px] text-white/90 flex items-center justify-between">
                    <span>9:16 Vertical (Shorts / Reels)</span>
                    <span className="text-[10px] text-purple-400 font-medium">Standard</span>
                  </div>
                </div>

                <div>
                  <span className="block text-[11px] font-medium text-[#A4A5B5] mb-1.5">
                    Select Background Scene
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { name: 'Forest', grad: 'from-emerald-900 via-teal-800 to-green-950' },
                      { name: 'Sunset', grad: 'from-amber-700 via-rose-700 to-purple-950' },
                      { name: 'Celestial', grad: 'from-indigo-900 via-purple-900 to-slate-950' },
                    ].map((bg, idx) => (
                      <button
                        key={bg.name}
                        type="button"
                        onClick={() => setSelectedBgIndex(idx)}
                        className={`h-12 rounded-lg bg-gradient-to-tr ${bg.grad} p-1 relative border transition-all cursor-pointer ${
                          selectedBgIndex === idx
                            ? 'border-[#C084FC] ring-2 ring-[#C084FC]/40 scale-105'
                            : 'border-white/10 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <span className="absolute bottom-1 left-1 text-[9px] font-medium text-white/90 drop-shadow">
                          {bg.name}
                        </span>
                        {selectedBgIndex === idx && (
                          <Check className="absolute top-1 right-1 w-3 h-3 text-white" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] pt-1 border-t border-white/5">
                  <span className="text-[#A4A5B5] flex items-center gap-1">
                    <Music className="w-3 h-3 text-purple-400" />
                    <span>Lofi Chillhop Groove</span>
                  </span>
                  <span className="text-emerald-400 font-mono text-[10px]">Free License</span>
                </div>
              </div>

              {/* Card Text Content */}
              <div>
                <h3 className="text-[18px] sm:text-[19px] font-bold text-white mb-2 tracking-tight">
                  2. Customise & Style
                </h3>
                <p className="text-[13.5px] text-[#A4A5B5] leading-relaxed">
                  Select orientation and pick a background scene and music from free templates.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 3: Finish & Export */}
          <ScrollReveal delay={350} className="h-full">
            <div className="group h-full flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-[#0F1220]/90 border border-[#a082dc]/15 hover:border-[#a082dc]/40 hover:-translate-y-1.5 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_15px_35px_rgba(139,53,232,0.15)]">
              {/* Card visual mock: Glowing concentric rings with rotating sparkle */}
              <div className="p-4 rounded-xl bg-[#141829] border border-[#a082dc]/15 mb-6 flex flex-col items-center justify-center min-h-[155px] relative overflow-hidden">
                {/* Concentric rings */}
                <div className="w-24 h-24 rounded-full border border-purple-500/20 flex items-center justify-center relative">
                  <div className="w-18 h-18 rounded-full border border-purple-500/40 flex items-center justify-center animate-pulse">
                    {/* Glowing circular badge */}
                    <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#8B35E8] to-[#D946EF] flex items-center justify-center shadow-[0_0_25px_rgba(168,85,247,0.8)]">
                      <svg
                        viewBox="0 0 24 24"
                        className="w-6 h-6 text-white fill-white animate-spin-slow"
                        style={{ animationDuration: '12s' }}
                      >
                        <path d="M12 2L14.2 9.8L22 12L14.2 14.2L12 22L9.8 14.2L2 12L9.8 9.8L12 2Z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Export options row */}
                <div className="mt-3 flex items-center gap-1.5">
                  {['1080p MP4', 'Audio .WAV', 'Script .PDF'].map((fmt) => (
                    <button
                      key={fmt}
                      type="button"
                      onClick={() => setSelectedFormat(fmt)}
                      className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors cursor-pointer ${
                        selectedFormat === fmt
                          ? 'bg-purple-900/50 text-purple-200 border border-purple-500/40'
                          : 'bg-black/30 text-[#737588] hover:text-white'
                      }`}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Card Text Content */}
              <div>
                <h3 className="text-[18px] sm:text-[19px] font-bold text-white mb-2 tracking-tight">
                  3. Finish & Export
                </h3>
                <p className="text-[13.5px] text-[#A4A5B5] leading-relaxed">
                  Select the export format and download the generated videos, script, or narration.
                </p>
              </div>
            </div>
          </ScrollReveal>

        </div>

      </div>
    </section>
  );
};
