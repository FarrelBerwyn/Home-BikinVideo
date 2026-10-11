import React, { useState } from 'react';
import {
  ArrowLeft,
  Sparkles,
  Scissors,
  CheckCircle2,
  Volume2,
  Pause,
  Square,
  Bot,
} from 'lucide-react';

interface DirectorInspectorPanelProps {
  onBackToText?: () => void;
  onPauseWorkflow?: () => void;
  onStopWorkflow?: () => void;
}

export const DirectorInspectorPanel: React.FC<DirectorInspectorPanelProps> = ({
  onBackToText,
  onPauseWorkflow,
  onStopWorkflow,
}) => {
  const [activeTab, setActiveTab] = useState<'director' | 'clipper'>('director');

  return (
    <aside className="bikin-inspector-panel p-3 flex flex-col justify-between">
      {/* Top Header & Navigation */}
      <div>
        {/* Back to Text Link */}
        <div className="mb-3">
          <button
            type="button"
            onClick={onBackToText}
            className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Text</span>
          </button>
        </div>

        {/* Tab Switcher: Director vs Clipper */}
        <div className="flex items-center border-b border-white/[0.08] mb-4">
          <button
            type="button"
            onClick={() => setActiveTab('director')}
            className={`flex items-center gap-1.5 pb-2.5 px-2 text-xs font-bold transition-all relative ${
              activeTab === 'director'
                ? 'text-purple-300'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Director</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block ml-0.5 animate-pulse" />
            {activeTab === 'director' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-indigo-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('clipper')}
            className={`flex items-center gap-1.5 pb-2.5 px-3 text-xs font-bold transition-all relative ${
              activeTab === 'clipper'
                ? 'text-purple-300'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Scissors className="w-3.5 h-3.5" />
            <span>Clipper</span>
            {activeTab === 'clipper' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500" />
            )}
          </button>
        </div>

        {/* AI Task Progress / Status Cards */}
        <div className="space-y-3.5">
          {/* Item 1: Timeline Tools Initialized */}
          <div className="flex items-start gap-2.5 text-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span className="text-zinc-300 font-medium leading-relaxed">
              Timeline · 2 editing tools
            </span>
          </div>

          {/* Item 2: Listening & Understanding Request */}
          <div className="flex items-start gap-2.5 text-xs">
            <Volume2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5 animate-pulse" />
            <span className="text-zinc-300 font-medium leading-relaxed">
              Understanding request...
            </span>
          </div>
        </div>
      </div>

      {/* Control Buttons (Pause / Stop) */}
      <div className="pt-4 border-t border-white/[0.06]">
        <div className="flex items-center gap-2">
          {/* Pause Button with Yellow Border Styling */}
          <button
            type="button"
            onClick={onPauseWorkflow}
            className="flex-1 py-1.5 px-3 rounded-lg border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <Pause className="w-3.5 h-3.5" />
            <span>Pause</span>
          </button>

          {/* Stop Button with Crimson Border Styling */}
          <button
            type="button"
            onClick={onStopWorkflow}
            className="flex-1 py-1.5 px-3 rounded-lg border border-red-500/40 bg-red-500/10 hover:bg-red-500/20 text-red-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <Square className="w-3 h-3 fill-current" />
            <span>Stop</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
