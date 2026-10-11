import React, { useState } from 'react';
import { SectionLabel } from './SectionLabel';
import { GradientText } from './GradientText';
import { ScrollReveal } from './ScrollReveal';
import {
  Undo2,
  Redo2,
  Scissors,
  Wand2,
  Sliders,
  Sparkles,
  Layers,
  History,
  CheckCircle,
  Play,
  RotateCcw,
} from 'lucide-react';

export const HumanControlEditorSection: React.FC = () => {
  const [activeClipId, setActiveClipId] = useState(0);
  const [historyIndex, setHistoryIndex] = useState(2);
  const [isZoomed, setIsZoomed] = useState(false);

  const editHistory = [
    { id: 0, text: 'Raw Ingest: 48s uncut video' },
    { id: 1, text: 'Auto-cut: 14 silent pauses removed (-14.2s)' },
    { id: 2, text: 'Applied: Punch-in 1.2x on hook at 00:02.1' },
    { id: 3, text: 'Added: Contextual B-roll (Crypto Chart) at 00:14' },
  ];

  const clips = [
    {
      id: 0,
      title: 'Clip 01: The Hook',
      duration: '00:00 - 00:04.2',
      zoom: '1.2x Punch-in',
      captions: 'Active (Bold Yellow)',
      broll: 'None (Speaker focus)',
    },
    {
      id: 1,
      title: 'Clip 02: Core Argument',
      duration: '00:04.2 - 00:16.8',
      zoom: '1.0x Normal',
      captions: 'Active (Purple highlights)',
      broll: 'Inserted (Retention Chart)',
    },
    {
      id: 2,
      title: 'Clip 03: The Callout',
      duration: '00:16.8 - 00:28.0',
      zoom: '1.15x Subtle',
      captions: 'Active (Standard)',
      broll: 'Product Walkthrough',
    },
  ];

  const activeClip = clips[activeClipId];

  return (
    <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-[1240px] mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <ScrollReveal delay={0}>
            <SectionLabel label="Director Control" className="mb-4" />
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <h2 className="text-[32px] sm:text-[42px] md:text-[50px] font-bold text-white tracking-tight leading-[1.12] mb-4 text-balance">
              AI handles the work.{' '}
              <br className="hidden sm:inline" />
              You keep <GradientText glow>creative control.</GradientText>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <p className="text-[15px] sm:text-[17px] text-[#A4A5B5] leading-relaxed max-w-2xl mx-auto">
              Direct edits with natural language, then fine-tune every transition, caption font, and B-roll placement down to the exact millisecond.
            </p>
          </ScrollReveal>
        </div>

        {/* Interactive Editor Workspace Card */}
        <ScrollReveal delay={250}>
          <div className="rounded-3xl bg-[#0D0F1E] border border-white/[0.08] p-5 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
            
            {/* Top Editor Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-6 border-b border-white/[0.07]">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white tracking-wide">
                  Bikin Video Studio Canvas
                </span>
                <span className="text-[10px] font-mono text-purple-400 bg-purple-950/50 px-2 py-0.5 rounded border border-purple-500/20">
                  Non-Destructive Editing
                </span>
              </div>

              {/* Undo / Redo & Timeline Tools */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#14172B] border border-white/5">
                <button
                  type="button"
                  onClick={() => setHistoryIndex(Math.max(0, historyIndex - 1))}
                  disabled={historyIndex === 0}
                  className="p-1.5 rounded-lg text-[#A4A5B5] hover:text-white disabled:opacity-30 cursor-pointer"
                  title="Undo"
                >
                  <Undo2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setHistoryIndex(Math.min(editHistory.length - 1, historyIndex + 1))}
                  disabled={historyIndex === editHistory.length - 1}
                  className="p-1.5 rounded-lg text-[#A4A5B5] hover:text-white disabled:opacity-30 cursor-pointer"
                  title="Redo"
                >
                  <Redo2 className="w-4 h-4" />
                </button>
                <div className="w-[1px] h-4 bg-white/10 mx-1" />
                <button
                  type="button"
                  onClick={() => setIsZoomed(!isZoomed)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                    isZoomed ? 'bg-[#8B35E8] text-white' : 'text-[#A4A5B5] hover:text-white'
                  }`}
                >
                  {isZoomed ? 'Zoom 1.2x (Active)' : 'Zoom 1.0x'}
                </button>
              </div>
            </div>

            {/* Split: Left Natural Language Direction vs Right Timeline Inspector */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              
              {/* Left Column: Natural Language Direction & 4-Stage Trace (Col 1-6) */}
              <div className="lg:col-span-6 p-5 sm:p-6 rounded-2xl bg-[#121527] border border-white/[0.07] flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-purple-400 uppercase tracking-wider block mb-2">
                    Direct With Natural Language:
                  </span>
                  <div className="p-3.5 rounded-xl bg-[#181B30] border border-purple-500/30 text-xs text-white leading-relaxed mb-4 shadow-sm">
                    "Make the opening stronger and shorten the pauses without changing the main message."
                  </div>

                  {/* 4-Stage Trace */}
                  <div className="space-y-3 text-xs">
                    <div className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-purple-900/60 text-purple-300 font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5 border border-purple-500/30">
                        1
                      </span>
                      <div>
                        <strong className="text-white block">User Instruction</strong>
                        <span className="text-[#A4A5B5]">Requested punchier pacing and pause pruning.</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-indigo-900/60 text-indigo-300 font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5 border border-indigo-500/30">
                        2
                      </span>
                      <div>
                        <strong className="text-white block">AI Interpretation</strong>
                        <span className="text-[#A4A5B5]">Identified 3 dead-air segments totaling 6.8 seconds; suggested 1.2x punch-in.</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-pink-900/60 text-pink-300 font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5 border border-pink-500/30">
                        3
                      </span>
                      <div>
                        <strong className="text-white block">Executed Changes</strong>
                        <span className="text-[#A4A5B5]">Trimmed timeline, added keyframe zoom, synced animated captions.</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-emerald-900/60 text-emerald-300 font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/30">
                        4
                      </span>
                      <div>
                        <strong className="text-white block">Verified Result</strong>
                        <span className="text-emerald-300">Ready for review. Retention score improved from 72 → 94/100.</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Edit History Log */}
                <div className="mt-5 pt-4 border-t border-white/[0.07] flex items-center justify-between text-[11px] text-[#77798B]">
                  <span className="flex items-center gap-1 font-mono">
                    <History className="w-3.5 h-3.5" />
                    <span>State: {editHistory[historyIndex].text}</span>
                  </span>
                </div>
              </div>

              {/* Right Column: Interactive Clip Fine-Tuning (Col 7-12) */}
              <div className="lg:col-span-6 p-5 sm:p-6 rounded-2xl bg-[#121527] border border-white/[0.07] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.07]">
                    <span className="text-xs font-bold text-white tracking-tight">
                      Selected Clip Inspector
                    </span>
                    <span className="text-[10px] font-mono text-purple-300">
                      Clip 0{activeClipId + 1} of 03
                    </span>
                  </div>

                  {/* Select Clip Selector */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {clips.map((cl, i) => (
                      <button
                        key={cl.id}
                        type="button"
                        onClick={() => setActiveClipId(i)}
                        className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                          activeClipId === i
                            ? 'bg-[#1C2038] border-purple-500 text-white shadow-sm'
                            : 'bg-[#15182B] border-white/5 text-[#A4A5B5] hover:text-white'
                        }`}
                      >
                        <span className="block text-[11px] font-bold truncate">
                          {cl.title}
                        </span>
                        <span className="block text-[9.5px] font-mono text-[#77798B]">
                          {cl.duration}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Clip Detailed Controls */}
                  <div className="space-y-3 text-xs bg-[#171A2E] p-4 rounded-xl border border-white/5 font-mono">
                    <div className="flex items-center justify-between">
                      <span className="text-[#A4A5B5]">Framing & Zoom:</span>
                      <span className="text-white font-bold">{activeClip.zoom}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#A4A5B5]">Subtitle Style:</span>
                      <span className="text-white font-bold">{activeClip.captions}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#A4A5B5]">Contextual B-Roll:</span>
                      <span className="text-purple-300 font-bold">{activeClip.broll}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.07] flex items-center justify-between text-xs">
                  <span className="text-[#A4A5B5]">
                    Override any cut manually with 1 click.
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveClipId((activeClipId + 1) % clips.length)}
                    className="text-purple-400 hover:text-purple-300 font-semibold cursor-pointer"
                  >
                    Next Clip →
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
