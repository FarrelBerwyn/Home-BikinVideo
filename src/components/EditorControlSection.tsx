import React, { useState } from 'react';
import { SectionLabel } from './SectionLabel';
import { GradientText } from './GradientText';
import { CreatorVideoCanvas } from './CreatorVideoCanvas';
import {
  Undo,
  Redo,
  Sliders,
  Scissors,
  Layers,
  Sparkles,
  Bot,
  Play,
  Pause,
  Split,
  Eye,
  Check,
} from 'lucide-react';

export const EditorControlSection: React.FC = () => {
  const [activeInstruction, setActiveInstruction] = useState(
    'Make the opening stronger and shorten pauses without altering core message.'
  );
  const [historyIndex, setHistoryIndex] = useState(2); // 0, 1, 2
  const [isPlaying, setIsPlaying] = useState(false);
  const [showBeforeAfter, setShowBeforeAfter] = useState<'after' | 'before'>('after');

  const historyStack = [
    { title: 'Initial Raw Import', note: 'Raw 60s footage imported onto Track V1' },
    { title: 'AI Cut: 8s Silence Trim', note: 'Removed dead-air between sentence clauses' },
    { title: 'B-Roll & Zoom Hook Applied', note: 'Scheduled 1.15x punch-in and track-v2 B-roll' },
  ];

  return (
    <section id="editor-control" className="relative py-10 sm:py-14 z-10">
      <div className="page-container">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <SectionLabel label="Deterministic Timeline Control" className="mb-3.5" />
          <h2 className="text-[30px] sm:text-[42px] md:text-[50px] font-extrabold text-[#F1F0F6] tracking-tight leading-[1.12] mb-4 text-balance">
            AI Handles the Work. <GradientText glow>You Keep Creative Control.</GradientText>
          </h2>
          <p className="text-[15px] sm:text-[17px] text-[#A4A5B5] leading-relaxed max-w-2xl mx-auto">
            You are never locked into a black-box AI render. Every instruction translates into standard, non-destructive timeline clips, keyframes, and layers that you can adjust at any frame.
          </p>
        </div>

        {/* ================= COMPREHENSIVE EDITOR STAGE ================= */}
        <div className="rounded-3xl glass-panel overflow-hidden">
          
          {/* Editor Header Bar */}
          <div className="px-3.5 sm:px-5 py-2.5 sm:py-3 bg-[#0e0c24]/80 backdrop-blur-md border-b border-purple-500/20 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-3">
              <span className="font-bold text-white">Bikin Timeline Studio</span>
              <div className="flex items-center gap-1 text-[#B7B2CC]">
                <button
                  type="button"
                  onClick={() => setHistoryIndex((i) => Math.max(0, i - 1))}
                  disabled={historyIndex === 0}
                  className="p-1 rounded hover:bg-white/10 hover:text-white disabled:opacity-30 cursor-pointer"
                  title="Undo"
                >
                  <Undo className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setHistoryIndex((i) => Math.min(historyStack.length - 1, i + 1))}
                  disabled={historyIndex === historyStack.length - 1}
                  className="p-1 rounded hover:bg-white/10 hover:text-white disabled:opacity-30 cursor-pointer"
                  title="Redo"
                >
                  <Redo className="w-3.5 h-3.5" />
                </button>
                <span className="font-mono text-[11px] text-purple-300 ml-1">
                  History step {historyIndex + 1}/{historyStack.length}
                </span>
              </div>
            </div>

            {/* Before / After Toggle */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-[#B7B2CC] hidden sm:inline">View Mode:</span>
              <div className="inline-flex p-0.5 rounded-lg glass-inset">
                <button
                  type="button"
                  onClick={() => setShowBeforeAfter('after')}
                  className={`px-3 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
                    showBeforeAfter === 'after'
                      ? 'bg-gradient-to-r from-[#6D28D9] to-[#8B35F2] text-white shadow'
                      : 'text-[#B7B2CC] hover:text-white'
                  }`}
                >
                  AI Directed
                </button>
                <button
                  type="button"
                  onClick={() => setShowBeforeAfter('before')}
                  className={`px-3 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
                    showBeforeAfter === 'before'
                      ? 'bg-gradient-to-r from-[#6D28D9] to-[#8B35F2] text-white shadow'
                      : 'text-[#B7B2CC] hover:text-white'
                  }`}
                >
                  Raw Source
                </button>
              </div>
            </div>
          </div>

          {/* Central Grid: Player + Natural Language Command Interface */}
          <div className="grid grid-cols-1 md:grid-cols-12 min-h-[320px] border-b border-purple-500/15">
            {/* Video Canvas (Col 1-8 on desktop, 1-7 on tablet) */}
            <div className="col-span-12 md:col-span-7 lg:col-span-8 relative bg-black flex flex-col justify-between min-w-0">
              <CreatorVideoCanvas
                isPlaying={isPlaying}
                isAfter={showBeforeAfter === 'after'}
                zoomLevel="punch-in"
                showCaptions={showBeforeAfter === 'after'}
                showBrollOverlay={showBeforeAfter === 'after'}
              />

              {/* Bottom Playbar */}
              <div className="px-4 py-2 bg-[#0e0c24]/90 backdrop-blur-md border-t border-purple-500/20 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-3 text-white">
                  <button
                    type="button"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-6 h-6 rounded bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center cursor-pointer shadow-sm"
                  >
                    {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 ml-0.5 fill-white" />}
                  </button>
                  <span className="text-purple-300">00:00:52:29</span>
                  <span className="text-[#B7B2CC]">/ 00:01:00:00</span>
                </div>
                <span className="text-[11px] text-[#B7B2CC]">1080x1920 (Vertical 9:16)</span>
              </div>
            </div>

            {/* AI Command Bar & Edit History (Col 9-12 on desktop, 8-12 on tablet) */}
            <div className="col-span-12 md:col-span-5 lg:col-span-4 p-3.5 sm:p-4 bg-transparent border-t md:border-t-0 md:border-l border-purple-500/15 flex flex-col justify-between min-w-0">
              <div>
                <div className="flex items-center gap-2 pb-2 mb-3 border-b border-purple-500/20">
                  <Bot className="w-4 h-4 text-purple-400" />
                  <span className="font-bold text-white text-xs">Director Command Terminal</span>
                </div>

                <div className="mb-4">
                  <label className="block text-[11px] font-medium text-[#B7B2CC] uppercase tracking-wider mb-1">
                    Active Directing Intent:
                  </label>
                  <div className="p-3 rounded-xl glass-inset text-xs text-white leading-relaxed">
                    "{activeInstruction}"
                  </div>
                </div>

                <div>
                  <span className="block text-[11px] font-medium text-[#B7B2CC] uppercase tracking-wider mb-2">
                    Executed Timeline Stack:
                  </span>
                  <div className="space-y-2">
                    {historyStack.map((item, idx) => (
                      <div
                        key={idx}
                        className={`p-2.5 rounded-xl text-xs transition-colors ${
                          idx <= historyIndex
                            ? 'glass-card-selected'
                            : 'glass-card opacity-70'
                        }`}
                      >
                        <div className="font-bold mb-0.5 text-white">{item.title}</div>
                        <div className="text-[11px] text-[#B7B2CC]">{item.note}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-purple-500/15 text-[11px] text-[#B7B2CC]">
                Direct edits with language; refine clips frame-by-frame with standard handles.
              </div>
            </div>
          </div>

          {/* Multitrack Timeline Controls */}
          <div className="p-4 bg-transparent border-t border-purple-500/15 flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs font-mono text-[#B7B2CC]">
              <div className="flex items-center gap-3">
                <Scissors className="w-3.5 h-3.5 text-purple-400" />
                <span>Interactive Timeline Trim Handles</span>
              </div>
              <span className="text-purple-300 font-bold">Snap: ON · Ripple Edit: ON</span>
            </div>

            {/* Visual clip trim timeline */}
            <div className="h-10 rounded-xl glass-inset p-1 flex items-center gap-1.5 relative overflow-hidden">
              <div className="w-[30%] h-full rounded-lg bg-[#221c48]/70 border border-purple-500/30 flex items-center justify-between px-2 text-[10px] text-white font-mono">
                <span>Hook (Trimmed)</span>
                <span className="text-[#B7B2CC]">00:18</span>
              </div>
              <div className="w-1.5 h-full bg-purple-500" />
              <div className="w-[40%] h-full rounded-lg bg-[#221c48]/70 border border-purple-500/30 flex items-center justify-between px-2 text-[10px] text-white font-mono">
                <span>Core Argument</span>
                <span className="text-[#B7B2CC]">00:44</span>
              </div>
              <div className="w-1.5 h-full bg-purple-500" />
              <div className="flex-1 h-full rounded-lg bg-gradient-to-r from-purple-800/80 to-pink-800/80 border border-purple-300 flex items-center justify-between px-2 text-[10px] text-white font-mono shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                <span className="font-bold">Active Zoom Punch-In</span>
                <span className="text-emerald-300">00:52</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
