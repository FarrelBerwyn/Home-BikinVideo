import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Sliders,
  CheckCircle2,
  Layers,
  Subtitles,
  Volume2,
  Scissors,
  Wand2,
  ChevronRight,
  Split,
  Eye,
  Download,
  Info,
} from 'lucide-react';
import { SectionLabel } from './SectionLabel';
import { GradientText } from './GradientText';
import { ScrollReveal } from './ScrollReveal';

interface ProductDemoSectionProps {
  onOpenTrial: () => void;
  onOpenPreviewModal: (title: string, type: string) => void;
}

export const ProductDemoSection: React.FC<ProductDemoSectionProps> = ({
  onOpenTrial,
  onOpenPreviewModal,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playheadTime, setPlayheadTime] = useState(12.4); // seconds
  const [activeTab, setActiveTab] = useState<'after' | 'before' | 'split'>('after');
  const [activeStep, setActiveStep] = useState(4);
  const [customCommand, setCustomCommand] = useState(
    'Make this video more engaging. Strengthen the opening, remove unnecessary pauses, and add relevant visual support where appropriate.'
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [splitPosition, setSplitPosition] = useState(50); // percentage for split view

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Playhead timer
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setPlayheadTime((prev) => {
          if (prev >= 28.5) return 0;
          return Number((prev + 0.2).toFixed(1));
        });
      }, 200);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  const handleRunCommand = () => {
    setIsProcessing(true);
    setIsPlaying(false);
    setActiveStep(1);

    const stepInterval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev >= 6) {
          clearInterval(stepInterval);
          setIsProcessing(false);
          setIsPlaying(true);
          return 6;
        }
        return prev + 1;
      });
    }, 450);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setPlayheadTime(0);
    setActiveStep(5);
    setActiveTab('after');
  };

  const steps = [
    {
      id: 1,
      title: 'Ingest & Audio Cadence Analysis',
      desc: 'Transcribed 1,420 words. Detected 14 filler pauses (>400ms) and natural inflection points.',
      status: 'complete',
      tag: '0.4s',
    },
    {
      id: 2,
      title: 'Hook & Viral Moment Scoring',
      desc: 'Identified primary hook at 00:04.2 (Retention Index: 96/100). Flagged secondary takeaway at 00:18.0.',
      status: 'complete',
      tag: '0.8s',
    },
    {
      id: 3,
      title: 'Editorial Plan & Timeline Trimming',
      desc: 'Removed 18.2s of dead air. Reordered setup to place strongest punchline in first 3 seconds.',
      status: 'complete',
      tag: '1.2s',
    },
    {
      id: 4,
      title: 'Dynamic B-Roll & Visual Enhancements',
      desc: 'Inserted 3 context-aware 4K B-roll clips. Applied subtle dynamic punch-in zoom (1.18x) on emphasis.',
      status: 'complete',
      tag: '1.6s',
    },
    {
      id: 5,
      title: 'Kinetic Subtitles & Audio Ducking',
      desc: 'Generated word-by-word animated captions with keyword highlights. Ducked background music to -18dB.',
      status: 'complete',
      tag: '1.9s',
    },
    {
      id: 6,
      title: 'Editorial Quality Verification',
      desc: 'Passed rhythm pace check. Video ready for 9:16 export across YouTube Shorts, TikTok & Reels.',
      status: 'complete',
      tag: 'Verified',
    },
  ];

  return (
    <section id="interactive-demo" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 z-10">
      <div id="hero-demo" className="absolute -top-16 left-0" />
      <div className="max-w-[1280px] mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <ScrollReveal delay={0}>
            <SectionLabel label="Interactive Product Demo" className="mb-4" />
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <h2 className="text-[32px] sm:text-[42px] md:text-[48px] font-bold text-white tracking-tight leading-[1.12] mb-4 text-balance">
              See Bikin Video <GradientText glow>in Action</GradientText>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <p className="text-[15px] sm:text-[17px] text-[#A4A5B5] leading-relaxed max-w-2xl mx-auto">
              Test how natural language instructions translate directly into intelligent cuts, context-aware B-roll, kinetic captions, and verified edits.
            </p>
          </ScrollReveal>
        </div>

        {/* Demo Stage Container */}
        <ScrollReveal delay={250}>
          <div className="relative rounded-2xl md:rounded-3xl bg-[#0D0F1D] border border-white/[0.09] shadow-[0_24px_70px_rgba(0,0,0,0.8),0_0_40px_rgba(139,53,232,0.12)] overflow-hidden">
            
            {/* Top Toolbar / Mode Switcher */}
            <div className="px-4 sm:px-6 py-3.5 bg-[#121526] border-b border-white/[0.07] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-semibold text-white tracking-wide">
                  Project: Podcast_Ep42_Hook_Cut.mp4
                </span>
                <span className="text-[10px] font-mono text-[#77798B] bg-black/40 px-2 py-0.5 rounded border border-white/5 hidden sm:inline">
                  1080x1920 · 60 FPS
                </span>
              </div>

              {/* View Switcher: Before vs After vs Split */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#1A1D33] border border-white/5 text-xs">
                <button
                  type="button"
                  onClick={() => setActiveTab('before')}
                  className={`px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                    activeTab === 'before'
                      ? 'bg-[#2A2E4E] text-white shadow-sm'
                      : 'text-[#A4A5B5] hover:text-white'
                  }`}
                >
                  Raw Footage (Before)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('after')}
                  className={`px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                    activeTab === 'after'
                      ? 'bg-[#8B35E8] text-white shadow-[0_0_12px_rgba(139,53,232,0.5)]'
                      : 'text-[#A4A5B5] hover:text-white'
                  }`}
                >
                  AI Edited (After)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('split')}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                    activeTab === 'split'
                      ? 'bg-[#2A2E4E] text-white shadow-sm'
                      : 'text-[#A4A5B5] hover:text-white'
                  }`}
                >
                  <Split className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Compare</span>
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleReset}
                  title="Reset Demo"
                  className="p-1.5 rounded-lg text-[#A4A5B5] hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onOpenPreviewModal('Bikin Video AI Edited Demo', 'Podcast Short')}
                  className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#8B35E8] to-[#A855F7] text-white text-xs font-semibold hover:brightness-110 active:scale-95 transition-all cursor-pointer shadow-md flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect Result</span>
                </button>
              </div>
            </div>

            {/* AI Command Bar */}
            <div className="p-4 sm:p-5 bg-[#101322] border-b border-white/[0.07]">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-purple-400">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={customCommand}
                    onChange={(e) => setCustomCommand(e.target.value)}
                    placeholder="Direct your AI editor in natural language..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#171A2E] border border-white/[0.08] text-xs sm:text-sm text-white placeholder-[#606378] focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all font-sans"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleRunCommand}
                  disabled={isProcessing}
                  className="px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-[#8B35E8] to-[#D946EF] hover:from-[#9B45F2] hover:to-[#E256F6] disabled:opacity-50 active:scale-95 transition-all cursor-pointer shadow-[0_0_20px_rgba(139,53,232,0.4)] flex items-center justify-center gap-2 shrink-0"
                >
                  {isProcessing ? (
                    <>
                      <Wand2 className="w-4 h-4 animate-spin" />
                      <span>Directing Edit...</span>
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4" />
                      <span>Execute Direction</span>
                    </>
                  )}
                </button>
              </div>

              {/* Quick suggestion prompt chips */}
              <div className="flex items-center gap-2 mt-2.5 overflow-x-auto text-[11px] text-[#A4A5B5] pb-0.5">
                <span className="shrink-0 text-[#77798B]">Suggestions:</span>
                {[
                  'Remove all silent pauses over 400ms',
                  'Add punch-in zoom on every punchline',
                  'Place vibrant B-roll over the second topic',
                  'Translate subtitles to Indonesian',
                ].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      setCustomCommand(s);
                      handleRunCommand();
                    }}
                    className="shrink-0 px-2.5 py-1 rounded-full bg-[#171A2E] hover:bg-[#20243C] text-[#C4C5D4] hover:text-white border border-white/5 transition-colors cursor-pointer"
                  >
                    + {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Demo Grid: Stage Left (Video Preview & Controls) + Stage Right (AI Editorial Activity Log) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-white/[0.07]">
              
              {/* STAGE LEFT: Video Player & Multi-Track Timeline (Col 1-7) */}
              <div className="lg:col-span-7 p-4 sm:p-6 flex flex-col justify-between gap-4">
                
                {/* Video Preview Canvas */}
                <div className="relative aspect-[16/9] sm:aspect-[16/10] bg-black rounded-xl overflow-hidden border border-white/[0.06] flex items-center justify-center select-none shadow-inner">
                  
                  {/* Simulated Scene Graphic */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#1C2038] via-[#0E1122] to-black flex items-center justify-center">
                    {/* Simulated Creator on Camera with Framed Punch-in */}
                    <div className="relative flex flex-col items-center justify-center text-center p-6 transition-transform duration-500">
                      {/* Avatar / Silhouette */}
                      <div className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-purple-600 via-indigo-600 to-pink-500 p-1 mb-3 shadow-[0_0_35px_rgba(139,53,232,0.4)] ${activeTab === 'after' ? 'scale-110' : ''} transition-transform`}>
                        <div className="w-full h-full rounded-full bg-[#121526] flex items-center justify-center text-white">
                          <span className="text-2xl font-bold font-mono">BK</span>
                        </div>
                      </div>

                      {/* Video Speaker Badge */}
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur border border-white/10 text-xs text-white mb-2">
                        <span>Farrel (Founder & Creator)</span>
                      </div>

                      {/* Kinetic Animated Captions Overlay */}
                      {activeTab !== 'before' && (
                        <div className="mt-2 text-center max-w-sm">
                          <span className="inline-block px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur border border-purple-500/40 text-white font-extrabold text-sm sm:text-base tracking-wide shadow-2xl">
                            {playheadTime < 6 ? (
                              <>
                                "The secret to <span className="text-purple-400">viral retention</span> is..."
                              </>
                            ) : playheadTime < 15 ? (
                              <>
                                "...cutting the <span className="text-pink-400">dead air</span> in the first 2 seconds!"
                              </>
                            ) : (
                              <>
                                "Bikin Video directs the <span className="text-yellow-400">entire edit</span> automatically."
                              </>
                            )}
                          </span>
                        </div>
                      )}

                      {/* Raw pauses indicator for "Before" view */}
                      {activeTab === 'before' && (
                        <div className="mt-2 text-center text-xs text-red-400 font-mono bg-red-950/40 border border-red-500/30 px-2.5 py-1 rounded">
                          ⚠️ 2.4s awkward pause detected [No B-roll]
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Split Screen Overlay if activeTab === 'split' */}
                  {activeTab === 'split' && (
                    <div
                      className="absolute inset-y-0 left-0 bg-black/40 border-r-2 border-purple-400 pointer-events-none flex items-center justify-center overflow-hidden"
                      style={{ width: `${splitPosition}%` }}
                    >
                      <span className="absolute top-3 left-3 text-[10px] font-mono bg-black/70 px-2 py-0.5 rounded text-[#A4A5B5]">
                        Raw Ingest (Before)
                      </span>
                    </div>
                  )}

                  {/* Watermark badge */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/60 backdrop-blur px-2.5 py-1 rounded-full border border-white/10 text-[10px] text-white/80 font-mono">
                    <span>9:16 Shorts Crop</span>
                  </div>

                  {/* Playhead Time Overlay */}
                  <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur px-2 py-0.5 rounded text-[11px] font-mono text-purple-300">
                    00:{playheadTime < 10 ? `0${playheadTime.toFixed(0)}` : playheadTime.toFixed(0)} / 00:28
                  </div>
                </div>

                {/* Multi-Track Interactive Timeline */}
                <div className="p-3.5 rounded-xl bg-[#14172B] border border-white/[0.07] flex flex-col gap-2">
                  <div className="flex items-center justify-between text-[11px] text-[#A4A5B5] mb-1">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setIsPlaying(!isPlaying)}
                        aria-label={isPlaying ? 'Pause' : 'Play'}
                        className="w-7 h-7 rounded-full bg-[#8B35E8] hover:bg-[#9E45E8] text-white flex items-center justify-center transition-transform cursor-pointer shadow-md"
                      >
                        {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5 fill-white" />}
                      </button>
                      <span className="font-semibold text-white">Multi-Track Editor Timeline</span>
                    </div>
                    <span className="font-mono text-[10px] text-[#77798B]">Auto-Trimmed: -18.2s</span>
                  </div>

                  {/* Track 1: Video Track */}
                  <div className="flex items-center gap-2">
                    <span className="w-14 text-[10px] text-[#77798B] font-mono shrink-0">Video</span>
                    <div className="flex-1 h-5 bg-[#1F233E] rounded-md relative overflow-hidden flex items-center p-0.5 gap-1">
                      <div className="h-full w-1/4 bg-purple-600/70 rounded text-[9px] text-white flex items-center px-1 font-mono truncate">
                        Scene 01 (Hook)
                      </div>
                      <div className="h-full w-1/3 bg-purple-700/70 rounded text-[9px] text-white flex items-center px-1 font-mono truncate">
                        Scene 02 (Body)
                      </div>
                      <div className="h-full w-1/3 bg-purple-600/70 rounded text-[9px] text-white flex items-center px-1 font-mono truncate">
                        Scene 03 (Callout)
                      </div>
                    </div>
                  </div>

                  {/* Track 2: B-Roll Track */}
                  <div className="flex items-center gap-2">
                    <span className="w-14 text-[10px] text-indigo-400 font-mono shrink-0">B-Roll</span>
                    <div className="flex-1 h-5 bg-[#191D33] rounded-md relative overflow-hidden flex items-center p-0.5 gap-1">
                      <div className="h-full w-1/5 ml-12 bg-indigo-500/80 rounded text-[8.5px] text-white flex items-center px-1 font-mono">
                        📊 Retention Graph
                      </div>
                      <div className="h-full w-1/4 ml-4 bg-indigo-500/80 rounded text-[8.5px] text-white flex items-center px-1 font-mono">
                        ⚡ Quick Cut
                      </div>
                    </div>
                  </div>

                  {/* Track 3: Kinetic Captions */}
                  <div className="flex items-center gap-2">
                    <span className="w-14 text-[10px] text-pink-400 font-mono shrink-0">Captions</span>
                    <div className="flex-1 h-4 bg-[#191D33] rounded-md relative overflow-hidden flex items-center p-0.5">
                      <div className="h-full w-full bg-gradient-to-r from-pink-600/60 via-purple-600/60 to-pink-600/60 rounded text-[8px] text-white flex items-center px-1.5 font-mono">
                        CC: Word-by-word synced highlights (28s)
                      </div>
                    </div>
                  </div>

                  {/* Track 4: Audio Track Waveform */}
                  <div className="flex items-center gap-2">
                    <span className="w-14 text-[10px] text-emerald-400 font-mono shrink-0">Audio</span>
                    <div className="flex-1 h-4 bg-[#191D33] rounded-md relative overflow-hidden flex items-center px-1 gap-[2px]">
                      {[40, 60, 80, 50, 70, 90, 80, 60, 40, 70, 85, 95, 60, 40, 30, 70, 90, 100, 80, 60].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-emerald-500/70 rounded-full"
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* STAGE RIGHT: AI Editorial Activity & Decision Pipeline (Col 8-12) */}
              <div className="lg:col-span-5 p-4 sm:p-6 bg-[#0F1122] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.08]">
                    <div className="flex items-center gap-2">
                      <Wand2 className="w-4 h-4 text-purple-400" />
                      <h3 className="text-sm font-bold text-white tracking-tight">
                        Editorial Decision Pipeline
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono text-purple-300 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-500/30">
                      Step {activeStep} of {steps.length}
                    </span>
                  </div>

                  {/* Step List */}
                  <div className="space-y-3">
                    {steps.map((st) => {
                      const isCurrent = activeStep === st.id;
                      const isDone = activeStep > st.id;

                      return (
                        <div
                          key={st.id}
                          onClick={() => setActiveStep(st.id)}
                          className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                            isCurrent
                              ? 'bg-[#1A1D34] border-purple-500/70 shadow-[0_0_15px_rgba(139,53,232,0.25)]'
                              : isDone
                              ? 'bg-[#131627] border-white/5 opacity-85 hover:opacity-100'
                              : 'bg-transparent border-white/5 opacity-50'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2">
                              {isDone ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                              ) : isCurrent ? (
                                <span className="w-3.5 h-3.5 rounded-full border-2 border-purple-400 border-t-transparent animate-spin shrink-0" />
                              ) : (
                                <span className="w-3.5 h-3.5 rounded-full border border-white/20 shrink-0" />
                              )}
                              <span className="text-xs font-semibold text-white">
                                {st.title}
                              </span>
                            </div>
                            <span className="text-[10px] font-mono text-[#A4A5B5] bg-black/40 px-1.5 py-0.2 rounded shrink-0">
                              {st.tag}
                            </span>
                          </div>

                          <p className="text-[11px] text-[#A4A5B5] mt-1 pl-6 leading-relaxed">
                            {st.desc}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Conversion Callout */}
                <div className="mt-5 pt-4 border-t border-white/[0.08] flex items-center justify-between">
                  <div className="text-xs text-[#A4A5B5]">
                    <strong className="text-white">Ready to test with your video?</strong>
                    <p className="text-[11px] text-[#77798B]">Instant 7-day free trial · No watermark</p>
                  </div>
                  <button
                    type="button"
                    onClick={onOpenTrial}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#8B35E8] to-[#A855F7] hover:brightness-110 active:scale-95 transition-all cursor-pointer shadow-md shrink-0"
                  >
                    Start Creating
                  </button>
                </div>

              </div>

            </div>

          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
