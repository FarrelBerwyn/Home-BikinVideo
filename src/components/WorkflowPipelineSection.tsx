import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { GradientText } from './GradientText';
import {
  Brain,
  ListOrdered,
  Scissors,
  CheckCircle2,
  Wrench,
  Download,
  ShieldCheck,
  Waves,
} from 'lucide-react';

interface WorkflowNode {
  id: string;
  stepNumber: string;
  stepCount: string;
  title: string;
  subtitle: string;
  headline: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  deliverable: string;
}

const NODES: WorkflowNode[] = [
  {
    id: 'understand',
    stepNumber: '01',
    stepCount: '01 / 06',
    title: 'Understand',
    subtitle: 'Footage & Speech Analysis',
    headline: 'Understand every important moment before editing begins.',
    description:
      'Transcribes multi-speaker audio, parses sentence semantics, and flags silence pauses and speaker topic shifts.',
    icon: Brain,
    deliverable: 'Semantic Transcript Matrix (Indonesian + English)',
  },
  {
    id: 'plan',
    stepNumber: '02',
    stepCount: '02 / 06',
    title: 'Plan',
    subtitle: 'Editorial Decision Map',
    headline: 'Every cut and transition is planned with director-grade intent.',
    description:
      'Evaluates hook moments, designs timing cuts, chooses between B-roll or dynamic zoom, and plans audio ducking curves.',
    icon: ListOrdered,
    deliverable: 'Director Cut Decision Tree',
  },
  {
    id: 'execute',
    stepNumber: '03',
    stepCount: '03 / 06',
    title: 'Execute',
    subtitle: 'Timeline Synthesis',
    headline: 'Deterministic timeline assembly across multi-track architecture.',
    description:
      'Performs deterministic split cuts on Track 1, places B-roll assets on Track 2, and renders kinetic subtitles.',
    icon: Scissors,
    deliverable: '3 Timeline Tracks (Video, Overlay, Audio)',
  },
  {
    id: 'verify',
    stepNumber: '04',
    stepCount: '04 / 06',
    title: 'Verify',
    subtitle: 'Quality & Invariant Validation',
    headline: 'Rigorous automated QA verifies editorial invariants before output.',
    description:
      'Automated inspection verifies that speech audio remains intelligible, keyframe alignments match, and clips do not overlap.',
    icon: CheckCircle2,
    deliverable: 'Automated Timeline QA Assertion Report',
  },
  {
    id: 'repair',
    stepNumber: '05',
    stepCount: '05 / 06',
    title: 'Repair',
    subtitle: 'Autonomous Healing',
    headline: 'Autonomous self-healing resolves timeline friction in real time.',
    description:
      'If an asset targets an unrecognized track or a cut creates an audio pop, the Director autonomously heals and aligns the track.',
    icon: Wrench,
    deliverable: 'Error Recovery & Track Alignment Pass',
  },
  {
    id: 'export',
    stepNumber: '06',
    stepCount: '06 / 06',
    title: 'Export',
    subtitle: 'Lossless Production Ready',
    headline: 'Lossless multi-format output ready for social publishing or NLE handoff.',
    description:
      'Download ready-to-publish 4K HDR shorts (MP4) or export XML/EDL project files for Adobe Premiere Pro and DaVinci Resolve.',
    icon: Download,
    deliverable: '4K MP4 + Adobe Premiere XML Export',
  },
];

const STAGE_DURATION_MS = 4000;
const MANUAL_PAUSE_MS = 6000;

export const WorkflowPipelineSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isHoverPaused, setIsHoverPaused] = useState<boolean>(false);
  const [isManualPaused, setIsManualPaused] = useState<boolean>(false);
  const manualPauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isDocumentVisibleRef = useRef<boolean>(true);
  const shouldReduceMotion = useReducedMotion();

  const activeNode = NODES[activeIndex] || NODES[0];

  // Tab visibility listener
  useEffect(() => {
    const handleVisibility = () => {
      isDocumentVisibleRef.current = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  // Synchronized Auto-Progress Timer: Advances 01 -> 02 -> 03 -> 04 -> 05 -> 06 -> 01 every 4 seconds
  useEffect(() => {
    if (shouldReduceMotion) return;
    if (isHoverPaused || isManualPaused) return;

    const timer = setInterval(() => {
      if (!isDocumentVisibleRef.current) return;
      setActiveIndex((prev) => (prev + 1) % NODES.length);
    }, STAGE_DURATION_MS);

    return () => clearInterval(timer);
  }, [isHoverPaused, isManualPaused, shouldReduceMotion]);

  // Clean up manual pause timer on unmount
  useEffect(() => {
    return () => {
      if (manualPauseTimeoutRef.current) {
        clearTimeout(manualPauseTimeoutRef.current);
      }
    };
  }, []);

  // User click on stage card: activates stage immediately and pauses timer briefly
  const handleSelectStage = (index: number) => {
    setActiveIndex(index);
    setIsManualPaused(true);
    if (manualPauseTimeoutRef.current) {
      clearTimeout(manualPauseTimeoutRef.current);
    }
    manualPauseTimeoutRef.current = setTimeout(() => {
      setIsManualPaused(false);
    }, MANUAL_PAUSE_MS);
  };

  return (
    <section id="workflow" className="relative pt-3 sm:pt-4 pb-10 sm:pb-14 z-10 bg-[#070914]/80">
      <div className="page-container">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-7 sm:mb-9">
          <h2 className="text-[30px] sm:text-[42px] md:text-[50px] font-extrabold text-[#F1F0F6] tracking-tight leading-[1.12] mb-3 sm:mb-4 text-balance">
            From Instruction to <GradientText>Verified Result.</GradientText>
          </h2>
          <p className="text-[15px] sm:text-[17px] text-[#A4A5B5] leading-relaxed max-w-2xl mx-auto">
            Bikin Video executes an engineering-grade editorial cycle. Every cut is planned, executed, verified, and auto-repaired before final export.
          </p>
        </div>

        {/* ================= TWO-COLUMN EDITORIAL STAGES LAYOUT ================= */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-6 items-stretch">
          
          {/* ── LEFT COLUMN: 6 SEPARATE STAGE CARDS WITH CONNECTOR IN GAPS ONLY (Col 1-4, ~33%) ── */}
          <div
            className="col-span-12 md:col-span-5 lg:col-span-4 flex flex-col relative"
            role="tablist"
            aria-label="Editorial Workflow Stages"
            onMouseEnter={() => setIsHoverPaused(true)}
            onMouseLeave={() => setIsHoverPaused(false)}
          >
            {NODES.map((node, index) => {
              const IconComponent = node.icon;
              const isSelected = activeIndex === index;
              const isCompleted = index < activeIndex;

              return (
                <React.Fragment key={node.id}>
                  {/* Stage Card */}
                  <button
                    id={`stage-tab-${node.id}`}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    aria-controls={`stage-panel-${node.id}`}
                    tabIndex={0}
                    onFocus={() => setIsHoverPaused(true)}
                    onBlur={() => setIsHoverPaused(false)}
                    onClick={() => handleSelectStage(index)}
                    className={`w-full p-4 rounded-2xl text-left transition-all duration-300 cursor-pointer flex items-center gap-3.5 group relative ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#1c143d] via-[#1a1738] to-[#141630] border border-purple-400/50 shadow-[0_16px_36px_-8px_rgba(0,0,0,0.8)] ring-1 ring-purple-400/20'
                        : isCompleted
                        ? 'bg-[#0a0c1a]/70 border border-purple-500/15 hover:bg-[#10132b]/80 hover:border-purple-500/30'
                        : 'bg-[#090b17]/60 border border-white/[0.06] hover:bg-[#101328]/70 hover:border-white/12'
                    }`}
                  >
                    {/* Step Number & Marker Icon */}
                    <div className="flex items-center gap-2.5 shrink-0">
                      <span
                        className={`text-xs font-mono font-bold tracking-wider w-5 text-center transition-colors duration-300 ${
                          isSelected
                            ? 'text-purple-300 font-extrabold'
                            : isCompleted
                            ? 'text-purple-400/70 font-semibold'
                            : 'text-[#64677c]'
                        }`}
                      >
                        {node.stepNumber}
                      </span>

                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${
                          isSelected
                            ? 'bg-gradient-to-br from-[#4C1D95] via-[#7C3AED] to-[#8B35E8] text-white shadow-md shadow-purple-950/60 border border-white/25 ring-1 ring-purple-400/30'
                            : isCompleted
                            ? 'bg-[#141730] text-purple-300/80 border border-purple-500/20'
                            : 'bg-[#101326] text-[#6E7186] border border-white/[0.05] group-hover:text-white group-hover:bg-[#171b35] group-hover:border-white/10'
                        }`}
                      >
                        <IconComponent className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Title & Subtitle */}
                    <div className="min-w-0 flex-1">
                      <h3
                        className={`text-sm font-bold tracking-tight truncate transition-colors duration-300 ${
                          isSelected
                            ? 'text-white'
                            : isCompleted
                            ? 'text-[#D0D1DF]'
                            : 'text-[#B8B9CA] group-hover:text-white'
                        }`}
                      >
                        {node.title}
                      </h3>
                      <p
                        className={`text-[11.5px] truncate mt-0.5 transition-colors duration-300 ${
                          isSelected
                            ? 'text-purple-200/80'
                            : isCompleted
                            ? 'text-[#7D7F96]'
                            : 'text-[#686A7E]'
                        }`}
                      >
                        {node.subtitle}
                      </p>
                    </div>
                  </button>

                  {/* Connector Segment: Exists ONLY in the vertical GAP between adjacent cards.
                     Progress flows strictly from Stage 01 at the TOP downwards to Stage 06 */}
                  {index < NODES.length - 1 && (() => {
                    const isCompletedSegment = index < activeIndex;
                    const isActiveFlowingSegment = index === activeIndex;

                    return (
                      <div
                        className="relative h-4 w-full flex items-center justify-start pointer-events-none select-none"
                        aria-hidden="true"
                      >
                        <div
                          style={{ left: '64px', transform: 'translateX(-50%)' }}
                          className="absolute top-0 bottom-0 w-[4px] flex items-center justify-center overflow-visible"
                        >
                          <svg
                            className="w-[2px] h-full overflow-visible"
                            preserveAspectRatio="none"
                            viewBox="0 0 2 16"
                          >
                            {/* Base guide track line (always present, subtle dashed indigo track) */}
                            <line
                              x1="1"
                              y1="0"
                              x2="1"
                              y2="16"
                              stroke="#252945"
                              strokeWidth="2"
                              strokeDasharray="2.5 2.5"
                              strokeLinecap="round"
                            />

                            {/* Completed stage progress line: Illuminated solid purple descending from top */}
                            {isCompletedSegment && (
                              <line
                                x1="1"
                                y1="0"
                                x2="1"
                                y2="16"
                                stroke="#A855F7"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                style={{
                                  filter: 'drop-shadow(0 0 4px rgba(168, 85, 247, 0.85))',
                                }}
                              />
                            )}

                            {/* Active flowing progress overlay: Animated neon stream flowing DOWN towards next stage */}
                            {isActiveFlowingSegment && (
                              <line
                                x1="1"
                                y1="0"
                                x2="1"
                                y2="16"
                                stroke="#C084FC"
                                strokeWidth="2.5"
                                strokeDasharray="4 4"
                                strokeLinecap="round"
                                className="connector-active-flow"
                                style={{
                                  filter: 'drop-shadow(0 0 6px rgba(192, 132, 252, 0.95))',
                                }}
                              />
                            )}
                          </svg>
                        </div>
                      </div>
                    );
                  })()}
                </React.Fragment>
              );
            })}
          </div>

          {/* ── RIGHT COLUMN: PREMIUM EDITORIAL WORKFLOW PRESENTATION (Col 5-12, ~67%) ── */}
          <div
            className="col-span-12 md:col-span-7 lg:col-span-8 rounded-2xl md:rounded-3xl glass-panel p-4 sm:p-6 lg:p-8 flex flex-col justify-between min-h-[540px] md:min-h-[580px] lg:min-h-[600px] relative overflow-hidden"
            onMouseEnter={() => setIsHoverPaused(true)}
            onMouseLeave={() => setIsHoverPaused(false)}
          >
            
            {/* Subtle background ambient highlight */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/[0.06] blur-[90px] pointer-events-none rounded-full" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/[0.04] blur-[80px] pointer-events-none rounded-full" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeNode.id}
                id={`stage-panel-${activeNode.id}`}
                role="tabpanel"
                aria-labelledby={`stage-tab-${activeNode.id}`}
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
                animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col h-full justify-between gap-6 relative z-10"
              >
                {/* Top Content: Indicators, Headline, Description, Deliverable */}
                <div className="space-y-4">
                  {/* Stage Header Badge & Stage Indicator (01 / 06) */}
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300 font-mono text-xs font-bold tracking-wider">
                        STAGE {activeNode.stepNumber}: {activeNode.title.toUpperCase()}
                      </span>
                      <span className="text-xs text-[#737588] font-medium hidden sm:inline">
                        · {activeNode.subtitle}
                      </span>
                    </div>

                    <div className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs font-mono font-bold text-purple-300 tracking-wider">
                      {activeNode.stepCount}
                    </div>
                  </div>

                  {/* Main Headline */}
                  <h3 className="text-xl sm:text-2xl md:text-[25px] font-bold text-white tracking-tight leading-snug">
                    {activeNode.headline}
                  </h3>

                  {/* Explanatory Paragraph */}
                  <p className="text-[13.5px] sm:text-[14.5px] text-[#A4A5B5] leading-relaxed max-w-2xl">
                    {activeNode.description}
                  </p>

                  {/* Verified Deliverable Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs sm:text-sm font-mono text-emerald-400">
                    <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
                    <span>
                      <strong className="font-semibold text-emerald-400">Verified Deliverable:</strong>{' '}
                      <span className="text-emerald-300">{activeNode.deliverable}</span>
                    </span>
                  </div>
                </div>

                {/* Bottom Content: Stage-Specific Visual Component */}
                <div className="w-full">
                  {activeNode.id === 'understand' && (
                    <div className="rounded-2xl glass-inset p-4 sm:p-5 flex flex-col gap-3.5">
                      {/* Panel Header */}
                      <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                        <div className="flex items-center gap-2 text-xs font-mono text-[#A4A5B5]">
                          <Waves className="w-3.5 h-3.5 text-purple-400" />
                          <span>SPEECH DIARIZATION & SEMANTIC PARSER</span>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 font-mono text-[10.5px]">
                          2 Speakers · 99.4% Confidence
                        </span>
                      </div>

                      {/* Waveform Visualization */}
                      <div className="p-3 rounded-xl bg-[#0A0D1D]/80 border border-white/[0.05] flex flex-col gap-1.5">
                        <div className="flex items-center justify-between text-[11px] font-mono text-[#737588]">
                          <span>AUDIO ENERGY WAVEFORM</span>
                          <span className="text-purple-300">00:00:00 — 00:01:00</span>
                        </div>
                        <div className="h-8 flex items-end gap-1 px-1 py-0.5 overflow-hidden">
                          {[45, 60, 85, 70, 95, 80, 65, 40, 20, 10, 8, 8, 15, 55, 75, 90, 100, 85, 70, 60, 45, 30, 70, 85, 90, 65, 50, 35].map(
                            (height, i) => {
                              const isPause = i >= 8 && i <= 11;
                              return (
                                <div
                                  key={i}
                                  style={{ height: `${height}%` }}
                                  className={`flex-1 rounded-full transition-all duration-300 ${
                                    isPause
                                      ? 'bg-amber-400/90'
                                      : 'bg-gradient-to-t from-purple-600/60 to-purple-400'
                                  }`}
                                />
                              );
                            }
                          )}
                        </div>
                        <div className="flex items-center justify-between text-[10px] font-mono text-amber-400/90 pt-0.5">
                          <span>00:14.2 ── 0.8s Hesitation Silence Flagged ── 00:15.0</span>
                          <span className="text-emerald-400 font-semibold">✓ Auto-Cut Candidate</span>
                        </div>
                      </div>

                      {/* Transcript Segments */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <div className="p-2.5 rounded-xl bg-[#0E1224]/80 border border-purple-500/20 text-left">
                          <div className="flex items-center justify-between text-[10.5px] font-mono mb-1">
                            <span className="text-purple-300 font-semibold">Speaker 01 (Host · ID)</span>
                            <span className="text-[#737588]">00:00 - 00:14</span>
                          </div>
                          <p className="text-xs text-[#E1E0E8] leading-relaxed">
                            "Selamat datang di BikinVideo. Hari ini kita bahas otomatisasi multi-track editing..."
                          </p>
                        </div>
                        <div className="p-2.5 rounded-xl bg-[#0E1224]/80 border border-white/[0.06] text-left">
                          <div className="flex items-center justify-between text-[10.5px] font-mono mb-1">
                            <span className="text-cyan-300 font-semibold">Speaker 02 (Guest · EN)</span>
                            <span className="text-[#737588]">00:15 - 00:32</span>
                          </div>
                          <p className="text-xs text-[#E1E0E8] leading-relaxed">
                            "The core architecture relies on deterministic cut decisions and QA invariants."
                          </p>
                        </div>
                      </div>

                      {/* Telemetry Footer */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/[0.06] text-[11px] font-mono text-[#A4A5B5]">
                        <span>Topic Shifts: <strong className="text-white">4 Identified</strong></span>
                        <span>Hesitation Silences: <strong className="text-white">3 Flagged</strong></span>
                        <span>Loudness: <strong className="text-emerald-400">-14.2 LUFS Balanced</strong></span>
                      </div>
                    </div>
                  )}

                  {activeNode.id === 'plan' && (
                    <div className="rounded-2xl glass-inset p-4 sm:p-5 flex flex-col gap-3.5">
                      {/* Panel Header */}
                      <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                        <div className="flex items-center gap-2 text-xs font-mono text-[#A4A5B5]">
                          <ListOrdered className="w-3.5 h-3.5 text-purple-400" />
                          <span>DIRECTOR EDITORIAL DECISION ENGINE</span>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 font-mono text-[10.5px]">
                          Pacing Target: 1.8s Avg Cut
                        </span>
                      </div>

                      {/* Flow Steps / Decision Nodes */}
                      <div className="space-y-2">
                        <div className="p-2.5 rounded-xl bg-[#0E1224]/80 border border-white/[0.06] flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="w-5 h-5 rounded-md bg-purple-600/30 border border-purple-400/40 text-purple-300 font-mono text-[10px] flex items-center justify-center shrink-0">
                              01
                            </span>
                            <div className="min-w-0">
                              <div className="text-xs font-semibold text-white truncate">
                                Hook Engagement Optimization (00:00 - 00:03)
                              </div>
                              <div className="text-[11px] text-[#A4A5B5] truncate mt-0.5">
                                Plan Punch-in Zoom (1.15x) + Kinetic Hook Title to prevent drop-off
                              </div>
                            </div>
                          </div>
                          <span className="px-2 py-0.5 rounded-md bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] shrink-0">
                            High Retention
                          </span>
                        </div>

                        <div className="p-2.5 rounded-xl bg-[#0E1224]/80 border border-white/[0.06] flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="w-5 h-5 rounded-md bg-purple-600/30 border border-purple-400/40 text-purple-300 font-mono text-[10px] flex items-center justify-center shrink-0">
                              02
                            </span>
                            <div className="min-w-0">
                              <div className="text-xs font-semibold text-white truncate">
                                Hesitation Silence Cut (00:14 - 00:15)
                              </div>
                              <div className="text-[11px] text-[#A4A5B5] truncate mt-0.5">
                                Schedule 0.8s dead air removal · Maintain speech cadence curve
                              </div>
                            </div>
                          </div>
                          <span className="px-2 py-0.5 rounded-md bg-purple-950/60 border border-purple-500/30 text-purple-300 font-mono text-[10px] shrink-0">
                            Jump Cut
                          </span>
                        </div>

                        <div className="p-2.5 rounded-xl bg-[#0E1224]/80 border border-white/[0.06] flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="w-5 h-5 rounded-md bg-purple-600/30 border border-purple-400/40 text-purple-300 font-mono text-[10px] flex items-center justify-center shrink-0">
                              03
                            </span>
                            <div className="min-w-0">
                              <div className="text-xs font-semibold text-white truncate">
                                B-Roll Cutaway & Audio Ducking (00:18 - 00:26)
                              </div>
                              <div className="text-[11px] text-[#A4A5B5] truncate mt-0.5">
                                Overlay Track-V2 studio asset · Apply -14dB dialog ducking envelope
                              </div>
                            </div>
                          </div>
                          <span className="px-2 py-0.5 rounded-md bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 font-mono text-[10px] shrink-0">
                            Track-V2
                          </span>
                        </div>
                      </div>

                      {/* Telemetry Footer */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/[0.06] text-[11px] font-mono text-[#A4A5B5]">
                        <span>Planned Edits: <strong className="text-white">12 Decisions</strong></span>
                        <span>B-Roll Cutaways: <strong className="text-white">3 Scheduled</strong></span>
                        <span>Audio Ducking: <strong className="text-emerald-400">-14dB Envelope</strong></span>
                      </div>
                    </div>
                  )}

                  {activeNode.id === 'execute' && (
                    <div className="rounded-2xl glass-inset p-4 sm:p-5 flex flex-col gap-3.5">
                      {/* Panel Header */}
                      <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                        <div className="flex items-center gap-2 text-xs font-mono text-[#A4A5B5]">
                          <Scissors className="w-3.5 h-3.5 text-purple-400" />
                          <span>MULTI-TRACK TIMELINE SYNTHESIZER</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-400" />
                          <span className="font-mono text-[10.5px] text-purple-300">00:18:10 / 00:59:12 · Snap ON</span>
                        </div>
                      </div>

                      {/* Multi-Track Timeline */}
                      <div className="p-3 rounded-xl bg-[#0A0D1D]/90 border border-white/[0.06] space-y-2">
                        {/* Track V2: Overlay / B-Roll */}
                        <div className="flex items-center gap-2.5">
                          <span className="w-7 text-[10.5px] font-mono font-bold text-violet-300 shrink-0">V2</span>
                          <div className="flex-1 h-6 rounded-lg bg-[#14172B] relative flex items-center px-1 overflow-hidden">
                            <div className="absolute left-[28%] w-[36%] h-5 rounded bg-gradient-to-r from-violet-600/70 to-purple-500/70 border border-violet-400/40 flex items-center px-2 text-[9.5px] font-mono text-white truncate shadow-sm">
                              B-Roll: Studio Setup (00:18 - 00:26)
                            </div>
                          </div>
                        </div>

                        {/* Track V1: Primary A-Roll */}
                        <div className="flex items-center gap-2.5">
                          <span className="w-7 text-[10.5px] font-mono font-bold text-purple-300 shrink-0">V1</span>
                          <div className="flex-1 h-6 rounded-lg bg-[#14172B] flex items-center gap-1 px-1 overflow-hidden">
                            <div className="w-[28%] h-5 rounded bg-purple-700/60 border border-purple-400/30 flex items-center px-1.5 text-[9.5px] font-mono text-white truncate">
                              Cam 1 [Hook]
                            </div>
                            <div className="w-[38%] h-5 rounded bg-purple-800/60 border border-purple-400/30 flex items-center px-1.5 text-[9.5px] font-mono text-white truncate">
                              Cam 1 [Punch 1.15x]
                            </div>
                            <div className="flex-1 h-5 rounded bg-purple-700/60 border border-purple-400/30 flex items-center px-1.5 text-[9.5px] font-mono text-white truncate">
                              Cam 1 [Wide]
                            </div>
                          </div>
                        </div>

                        {/* Track A1: Dialog Ducking */}
                        <div className="flex items-center gap-2.5">
                          <span className="w-7 text-[10.5px] font-mono font-bold text-emerald-300 shrink-0">A1</span>
                          <div className="flex-1 h-6 rounded-lg bg-[#14172B] relative flex items-center px-2 overflow-hidden">
                            <div className="w-full flex items-center justify-between text-[9px] font-mono text-emerald-400/90">
                              <span>Speech Envelope</span>
                              <span className="text-purple-300 font-bold">-14dB Ducking Under V2</span>
                              <span>Master (-6dB)</span>
                            </div>
                          </div>
                        </div>

                        {/* Track T1: Subtitle Sync */}
                        <div className="flex items-center gap-2.5">
                          <span className="w-7 text-[10.5px] font-mono font-bold text-cyan-300 shrink-0">T1</span>
                          <div className="flex-1 h-6 rounded-lg bg-[#14172B] flex items-center gap-1.5 px-1 overflow-hidden">
                            <div className="px-2 h-5 rounded bg-cyan-950/80 border border-cyan-500/30 flex items-center text-[9px] font-mono text-cyan-300">
                              [BikinVideo]
                            </div>
                            <div className="px-2 h-5 rounded bg-cyan-950/80 border border-cyan-500/30 flex items-center text-[9px] font-mono text-cyan-300">
                              [Otomatisasi]
                            </div>
                            <div className="px-2 h-5 rounded bg-cyan-950/80 border border-cyan-500/30 flex items-center text-[9px] font-mono text-cyan-300">
                              [Multi-Track]
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Telemetry Footer */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/[0.06] text-[11px] font-mono text-[#A4A5B5]">
                        <span>Deterministic Cuts: <strong className="text-white">00:18:10 & 00:34:00</strong></span>
                        <span>Subtitle Sync: <strong className="text-emerald-400">&lt; 2ms Delta</strong></span>
                        <span>Frame Drops: <strong className="text-emerald-400">0 Detected</strong></span>
                      </div>
                    </div>
                  )}

                  {activeNode.id === 'verify' && (
                    <div className="rounded-2xl glass-inset p-4 sm:p-5 flex flex-col gap-3.5">
                      {/* Panel Header */}
                      <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                        <div className="flex items-center gap-2 text-xs font-mono text-[#A4A5B5]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>AUTOMATED TIMELINE QA ASSERTIONS</span>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 font-mono text-[10.5px] font-bold">
                          4 / 4 Assertions Passed
                        </span>
                      </div>

                      {/* 4 Invariant Validation Cards */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <div className="p-2.5 rounded-xl bg-[#0E1224]/80 border border-emerald-500/20 text-left">
                          <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                            <span className="font-semibold text-white">Lip-Sync Alignment</span>
                            <span className="text-emerald-400 font-bold">✓ PASSED</span>
                          </div>
                          <p className="text-[11px] text-[#A4A5B5]">
                            Delta measured at <strong className="text-white">+3.8ms</strong> (Invariant threshold: &lt; 8ms)
                          </p>
                        </div>

                        <div className="p-2.5 rounded-xl bg-[#0E1224]/80 border border-emerald-500/20 text-left">
                          <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                            <span className="font-semibold text-white">Zero Clip Overlap</span>
                            <span className="text-emerald-400 font-bold">✓ PASSED</span>
                          </div>
                          <p className="text-[11px] text-[#A4A5B5]">
                            Track V1/V2 bounds verified: <strong className="text-white">0 negative durations</strong>
                          </p>
                        </div>

                        <div className="p-2.5 rounded-xl bg-[#0E1224]/80 border border-emerald-500/20 text-left">
                          <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                            <span className="font-semibold text-white">Loudness Standards</span>
                            <span className="text-emerald-400 font-bold">✓ COMPLIANT</span>
                          </div>
                          <p className="text-[11px] text-[#A4A5B5]">
                            Integrated loudness at <strong className="text-white">-14.2 LUFS</strong> (0 clipping peaks)
                          </p>
                        </div>

                        <div className="p-2.5 rounded-xl bg-[#0E1224]/80 border border-emerald-500/20 text-left">
                          <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                            <span className="font-semibold text-white">9:16 Safe-Zone Margin</span>
                            <span className="text-emerald-400 font-bold">✓ VERIFIED</span>
                          </div>
                          <p className="text-[11px] text-[#A4A5B5]">
                            Subtitles within TikTok/Reels UI safety margins (<strong className="text-white">100% visible</strong>)
                          </p>
                        </div>
                      </div>

                      {/* Telemetry Footer */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/[0.06] text-[11px] font-mono text-[#A4A5B5]">
                        <span>QA Mode: <strong className="text-white">Automated Pipeline</strong></span>
                        <span>Human Intervention: <strong className="text-emerald-400">0 Needed</strong></span>
                        <span>Readiness: <strong className="text-emerald-400">Production Approved</strong></span>
                      </div>
                    </div>
                  )}

                  {activeNode.id === 'repair' && (
                    <div className="rounded-2xl glass-inset p-4 sm:p-5 flex flex-col gap-3.5">
                      {/* Panel Header */}
                      <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                        <div className="flex items-center gap-2 text-xs font-mono text-[#A4A5B5]">
                          <Wrench className="w-3.5 h-3.5 text-purple-400" />
                          <span>AUTONOMOUS REPAIR & SELF-HEALING PASS</span>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 font-mono text-[10.5px] font-bold">
                          2 Anomalies Self-Healed
                        </span>
                      </div>

                      {/* Healing Comparison Cases */}
                      <div className="space-y-2">
                        <div className="p-2.5 rounded-xl bg-[#0E1224]/80 border border-white/[0.06] flex items-center justify-between gap-3 text-left">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 text-xs font-semibold text-white">
                              <span className="px-1.5 py-0.5 rounded bg-amber-950/80 border border-amber-500/30 text-amber-300 font-mono text-[9.5px]">
                                Anomaly
                              </span>
                              <span>Unknown Track Reference at 00:15:10</span>
                            </div>
                            <div className="text-[11px] text-[#A4A5B5] mt-1">
                              Auto-Resolution: Routed overlay asset to <strong className="text-purple-300">Track-V2</strong> with clean crossfade
                            </div>
                          </div>
                          <span className="px-2 py-0.5 rounded-md bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] shrink-0 font-bold">
                            ✓ Self-Healed
                          </span>
                        </div>

                        <div className="p-2.5 rounded-xl bg-[#0E1224]/80 border border-white/[0.06] flex items-center justify-between gap-3 text-left">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 text-xs font-semibold text-white">
                              <span className="px-1.5 py-0.5 rounded bg-amber-950/80 border border-amber-500/30 text-amber-300 font-mono text-[9.5px]">
                                Anomaly
                              </span>
                              <span>Audio Seam Pop at 00:27:04</span>
                            </div>
                            <div className="text-[11px] text-[#A4A5B5] mt-1">
                              Auto-Resolution: Synthesized <strong className="text-purple-300">12ms equal-power micro-fade</strong> across cut seam
                            </div>
                          </div>
                          <span className="px-2 py-0.5 rounded-md bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] shrink-0 font-bold">
                            ✓ Pop Eliminated
                          </span>
                        </div>
                      </div>

                      {/* Telemetry Footer */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/[0.06] text-[11px] font-mono text-[#A4A5B5]">
                        <span>Total Detected: <strong className="text-white">2 Anomalies</strong></span>
                        <span>Auto-Healed: <strong className="text-emerald-400">2 (100%)</strong></span>
                        <span>User Intervention: <strong className="text-emerald-400">Zero Clicks</strong></span>
                      </div>
                    </div>
                  )}

                  {activeNode.id === 'export' && (
                    <div className="rounded-2xl glass-inset p-4 sm:p-5 flex flex-col gap-3.5">
                      {/* Panel Header */}
                      <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                        <div className="flex items-center gap-2 text-xs font-mono text-[#A4A5B5]">
                          <Download className="w-3.5 h-3.5 text-purple-400" />
                          <span>LOSSLESS PRODUCTION EXPORT PIPELINE</span>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 font-mono text-[10.5px] font-bold">
                          Ready for Production
                        </span>
                      </div>

                      {/* 2 Output Format Deliverables */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <div className="p-3 rounded-xl bg-[#0E1224]/80 border border-purple-500/20 text-left flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                              <span className="font-bold text-white">4K Master Short (MP4)</span>
                              <span className="px-1.5 py-0.5 rounded bg-purple-950/80 text-purple-300 text-[9.5px]">Direct Publish</span>
                            </div>
                            <p className="text-[11px] text-[#A4A5B5] leading-relaxed">
                              1080x1920 (9:16 Vertical) · 60fps · H.265 / HEVC · 48kHz Stereo (-14 LUFS)
                            </p>
                          </div>
                          <div className="mt-3 pt-2 border-t border-white/[0.06] flex items-center justify-between text-[10.5px] font-mono">
                            <span className="text-[#737588]">Size: 48.2 MB</span>
                            <span className="text-emerald-400 font-bold">✓ Render Complete</span>
                          </div>
                        </div>

                        <div className="p-3 rounded-xl bg-[#0E1224]/80 border border-white/[0.06] text-left flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                              <span className="font-bold text-white">NLE Interchange (XML / EDL)</span>
                              <span className="px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-300 text-[9.5px]">Lossless Handoff</span>
                            </div>
                            <p className="text-[11px] text-[#A4A5B5] leading-relaxed">
                              Adobe Premiere Pro & DaVinci Resolve 19 bundle · Multi-track markers & subtitle SRT
                            </p>
                          </div>
                          <div className="mt-3 pt-2 border-t border-white/[0.06] flex items-center justify-between text-[10.5px] font-mono">
                            <span className="text-[#737588]">Format: Premiere XML</span>
                            <span className="text-cyan-300 font-bold">✓ Metadata Bundled</span>
                          </div>
                        </div>
                      </div>

                      {/* Telemetry Footer */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/[0.06] text-[11px] font-mono text-[#A4A5B5]">
                        <span>Color Profile: <strong className="text-white">Rec.709 HDR</strong></span>
                        <span>Compression: <strong className="text-emerald-400">Lossless Master</strong></span>
                        <span>Destination: <strong className="text-purple-300">Social Reels + Premiere Pro</strong></span>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
};

export default WorkflowPipelineSection;
