import React, { useState } from 'react';
import { SectionLabel } from './SectionLabel';
import { GradientText } from './GradientText';
import { ScrollReveal } from './ScrollReveal';
import {
  Search,
  Calendar,
  Zap,
  ShieldCheck,
  Wrench,
  Download,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';

export const AutonomousWorkflowSection: React.FC = () => {
  const [activeNode, setActiveNode] = useState(0);

  const workflowSteps = [
    {
      id: 0,
      name: 'Understand',
      icon: Search,
      subtitle: 'Footage & Audio Analysis',
      desc: 'Parses word-by-word transcript, speaker vocal inflections, facial bounding boxes, and silent pauses over 400ms.',
      evidence: 'Identified 1,420 words, 3 distinct scene topics, and 14 removable pauses in raw footage.',
      metrics: 'Processing latency: 1.2s',
    },
    {
      id: 1,
      name: 'Plan',
      icon: Calendar,
      subtitle: 'Editorial Strategy & Hook Design',
      desc: 'Scores hook retention potential across all segments. Reorders timeline to lead with the most compelling takeaway.',
      evidence: 'Generated 3 timeline cut variations. Selected Strategy A (Retention Index: 96/100).',
      metrics: 'Hook score: 96/100',
    },
    {
      id: 2,
      name: 'Execute',
      icon: Zap,
      subtitle: 'Deterministic Timeline Editing',
      desc: 'Applies millisecond cuts, inserts contextual 4K B-roll, overlays kinetic typography, and ducks music.',
      evidence: 'Trimmed 18.2s of dead air, added 4 B-roll cuts, and synced word-by-word colored captions.',
      metrics: 'Edits executed: 22 operations',
    },
    {
      id: 3,
      name: 'Verify',
      icon: ShieldCheck,
      subtitle: 'Quality & Invariant Validation',
      desc: 'Runs an automated quality-check to confirm audio levels (-18dB ducking), subtitle sync, and 9:16 safe margins.',
      evidence: 'Verified audio peaking safe, zero text cutoffs under social UI buttons, sync offset <15ms.',
      metrics: 'Verification status: Passed (100%)',
    },
    {
      id: 4,
      name: 'Repair',
      icon: Wrench,
      subtitle: 'Self-Healing Timing Correction',
      desc: 'Automatically resolves overlapping subtitle keyframes or micro-stutters before final render generation.',
      evidence: 'Corrected 1 minor transition overlap at 00:14.2s without requiring manual intervention.',
      metrics: 'Repairs performed: 1 auto-fix',
    },
    {
      id: 5,
      name: 'Export',
      icon: Download,
      subtitle: 'Multi-Platform 4K Render',
      desc: 'Renders high-bitrate vertical video (1080x1920 60fps) or Premiere Pro / DaVinci Resolve XML format.',
      evidence: 'Video ready for 1-click download or scheduling across TikTok, YouTube Shorts & Instagram Reels.',
      metrics: 'Render time: 4.8s (GPU Cloud)',
    },
  ];

  const currentStep = workflowSteps[activeNode];

  return (
    <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 z-10 bg-[#090B16]/50 border-t border-white/[0.06]">
      <div className="max-w-[1240px] mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <ScrollReveal delay={0}>
            <SectionLabel label="Autonomous Pipeline" className="mb-4" />
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <h2 className="text-[32px] sm:text-[42px] md:text-[50px] font-bold text-white tracking-tight leading-[1.12] mb-4 text-balance">
              From instruction to <GradientText glow>verified result.</GradientText>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <p className="text-[15px] sm:text-[17px] text-[#A4A5B5] leading-relaxed max-w-2xl mx-auto">
              Every video follows a rigorous 6-stage engineering and editorial pipeline designed to eliminate hallucinations and deliver broadcast-grade shorts.
            </p>
          </ScrollReveal>
        </div>

        {/* 6-Node Interactive Pipeline Selector */}
        <ScrollReveal delay={250}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
            {workflowSteps.map((step, idx) => {
              const IconComponent = step.icon;
              const isActive = activeNode === idx;

              return (
                <button
                  key={step.name}
                  type="button"
                  onClick={() => setActiveNode(idx)}
                  className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[110px] ${
                    isActive
                      ? 'bg-[#181B34] border-purple-500 shadow-[0_0_20px_rgba(139,53,232,0.3)] ring-1 ring-purple-500/50'
                      : 'bg-[#0E1122] border-white/[0.07] hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-3">
                    <span className="text-[10px] font-mono text-[#77798B]">
                      0{idx + 1}
                    </span>
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                      isActive ? 'bg-[#8B35E8] text-white' : 'bg-white/5 text-[#A4A5B5]'
                    }`}>
                      <IconComponent className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div>
                    <span className={`text-xs sm:text-sm font-bold block ${
                      isActive ? 'text-white' : 'text-[#D0D0DE]'
                    }`}>
                      {step.name}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Node Detail Card */}
          <div className="rounded-3xl bg-[#0E1122] border border-white/[0.08] p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
              
              {/* Left Column: Description & Insights (Col 1-7) */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-900/50 text-purple-300 border border-purple-500/30 text-xs font-mono">
                    Stage 0{activeNode + 1} · {currentStep.name}
                  </span>
                  <span className="text-xs text-[#77798B] font-mono">
                    {currentStep.metrics}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {currentStep.subtitle}
                </h3>

                <p className="text-sm text-[#A4A5B5] leading-relaxed">
                  {currentStep.desc}
                </p>

                <div className="p-4 rounded-2xl bg-[#14172B] border border-white/5 flex flex-col gap-1.5 mt-2">
                  <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Pipeline Validation Record</span>
                  </span>
                  <p className="text-xs text-[#E0E0ED] font-mono leading-relaxed">
                    {currentStep.evidence}
                  </p>
                </div>
              </div>

              {/* Right Column: Visual Stage Graphic (Col 8-12) */}
              <div className="lg:col-span-5 p-6 rounded-2xl bg-[#14182E] border border-purple-500/20 flex flex-col justify-between min-h-[220px]">
                <div className="flex items-center justify-between pb-3 border-b border-white/5">
                  <span className="text-xs font-semibold text-white">
                    Verification Invariant Checks
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">
                    Active Guardrail
                  </span>
                </div>

                <div className="space-y-2.5 my-4 text-xs font-mono">
                  <div className="flex items-center justify-between text-[#A4A5B5]">
                    <span>Audio Ducking Balance:</span>
                    <span className="text-white">-18.0 dB (Verified)</span>
                  </div>
                  <div className="flex items-center justify-between text-[#A4A5B5]">
                    <span>Subtitle Readability:</span>
                    <span className="text-white">WCAG AAA (Passed)</span>
                  </div>
                  <div className="flex items-center justify-between text-[#A4A5B5]">
                    <span>9:16 UI Safe Zone:</span>
                    <span className="text-white">Clear of TikTok icons</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-[#77798B]">
                  <span>Next Stage:</span>
                  <button
                    type="button"
                    onClick={() => setActiveNode((activeNode + 1) % workflowSteps.length)}
                    className="text-purple-400 hover:text-purple-300 font-semibold cursor-pointer flex items-center gap-1"
                  >
                    <span>{workflowSteps[(activeNode + 1) % workflowSteps.length].name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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
