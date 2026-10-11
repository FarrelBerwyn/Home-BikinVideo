import React from 'react';
import {
  ChevronDown,
  Sparkles,
  Plus,
  Video,
  Play,
  Pause,
  Maximize2,
  Layers,
  PauseOctagon,
} from 'lucide-react';
import { PresenterCanvas } from './PresenterCanvas';

interface PreviewPlayerPanelProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  currentTime?: string;
  totalTime?: string;
  projectName?: string;
}

export const PreviewPlayerPanel: React.FC<PreviewPlayerPanelProps> = ({
  isPlaying,
  onTogglePlay,
  currentTime = '00:00:27:00',
  totalTime = '00:00:36:09',
  projectName = 'Bikin-Studio-1',
}) => {
  return (
    <section className="bikin-preview-panel">
      {/* Top Header Tabs & Actions */}
      <div className="h-11 px-3 border-b border-white/[0.07] bg-[#090b16] flex items-center justify-between shrink-0 z-20">
        {/* Left Tabs */}
        <div className="flex items-center gap-2">
          {/* Active Project Dropdown */}
          <button
            type="button"
            className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#16192d] hover:bg-[#1d223c] text-white text-xs font-semibold border border-white/10 transition-colors"
          >
            <span>{projectName}</span>
            <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
          </button>

          {/* Workflow Tab */}
          <button
            type="button"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-zinc-400 hover:text-white hover:bg-white/5 text-xs font-medium transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Workflow</span>
          </button>

          {/* New Tab Button */}
          <button
            type="button"
            title="Add Tab"
            className="w-6 h-6 rounded flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/5 text-sm transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right Action Badges */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-md shadow-purple-900/40 transition-all cursor-pointer"
          >
            <Video className="w-3.5 h-3.5" />
            <span>Video Clipping</span>
          </button>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 border border-white/10 text-[11px] text-zinc-300 font-medium">
            <span className="text-purple-400 font-bold">✦</span>
            <span>AI EDITING</span>
          </div>
        </div>
      </div>

      {/* Main Canvas Viewport Area */}
      <div className="flex-1 relative flex items-center justify-center p-3 bg-[#06070e] overflow-hidden">
        <div className="relative w-full max-w-[640px] aspect-video rounded-lg overflow-hidden border border-white/[0.08] shadow-2xl bg-black">
          {/* Presenter Canvas (SVG Studio Vector) */}
          <PresenterCanvas />

          {/* Bottom Right Floating Badge on video: "> Video" */}
          <div className="absolute right-3 bottom-3 px-2 py-0.5 rounded bg-black/60 border border-white/10 backdrop-blur-sm flex items-center gap-1 text-[10px] text-zinc-300 font-medium pointer-events-none">
            <Play className="w-2.5 h-2.5 fill-current text-zinc-300" />
            <span>Video</span>
          </div>
        </div>
      </div>

      {/* Bottom Player Control Bar */}
      <div className="h-10 px-4 bg-[#090b16] border-t border-white/[0.07] flex items-center justify-between shrink-0 z-20">
        {/* Left: Timecode Display */}
        <div className="flex items-center gap-3">
          <div className="flex items-center font-mono text-xs font-bold tracking-wider">
            <span className="text-[#a855f7]">{currentTime}</span>
            <span className="text-zinc-500 mx-1.5">/</span>
            <span className="text-zinc-400">{totalTime}</span>
          </div>
          <button
            type="button"
            title="Split/Pause Markers"
            className="text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <PauseOctagon className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Center: Main Play/Pause Button */}
        <div className="flex items-center justify-center">
          <button
            type="button"
            onClick={onTogglePlay}
            title={isPlaying ? 'Pause' : 'Play'}
            className="w-7 h-7 rounded-full flex items-center justify-center text-white hover:text-purple-300 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 fill-white" />
            ) : (
              <Play className="w-4 h-4 fill-white translate-x-0.5" />
            )}
          </button>
        </div>

        {/* Right: Aspect Ratio & Fullscreen */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-[11px] font-mono text-zinc-300 transition-colors"
          >
            16:9
          </button>
          <button
            type="button"
            title="Fullscreen"
            className="text-zinc-400 hover:text-white transition-colors"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
