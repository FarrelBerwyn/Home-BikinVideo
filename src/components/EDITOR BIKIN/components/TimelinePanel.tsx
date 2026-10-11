import React from 'react';
import {
  Plus,
  MousePointer2,
  Scissors,
  Trash2,
  Bookmark,
  Mic,
  Maximize2,
  ZoomIn,
  ZoomOut,
  Sliders,
  Type,
  Video,
  Music,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Volume2,
  VolumeX,
  MoreHorizontal,
  Image as ImageIcon,
  Sparkles,
} from 'lucide-react';
import { SUBTITLE_SEGMENTS, VIDEO_CLIPS, RULER_TIMESTAMPS } from '../mockData';

interface TimelinePanelProps {
  playheadPosition?: number; // e.g. 78% or pixel value
  onSeek?: (pixel: number) => void;
}

export const TimelinePanel: React.FC<TimelinePanelProps> = ({
  playheadPosition = 780, // around 00:27:00 mark
  onSeek,
}) => {
  return (
    <section className="bikin-timeline-panel flex flex-col">
      {/* 1. Timeline Top Toolbar */}
      <div className="h-9 px-3 bg-[#0d0f1b] border-b border-white/[0.07] flex items-center justify-between shrink-0">
        {/* Left Toolbar Icons */}
        <div className="flex items-center gap-1.5 text-zinc-400">
          <button
            type="button"
            title="Add Media / Layer"
            className="w-6 h-6 rounded flex items-center justify-center hover:text-white hover:bg-white/5 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            type="button"
            title="Selection Tool"
            className="w-6 h-6 rounded flex items-center justify-center text-white bg-white/10 transition-colors"
          >
            <MousePointer2 className="w-3.5 h-3.5 fill-current" />
          </button>
          <button
            type="button"
            title="Split Tool"
            className="w-6 h-6 rounded flex items-center justify-center hover:text-white hover:bg-white/5 transition-colors"
          >
            <Scissors className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            title="Delete Selected"
            className="w-6 h-6 rounded flex items-center justify-center hover:text-red-400 hover:bg-white/5 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            title="Marker"
            className="w-6 h-6 rounded flex items-center justify-center hover:text-white hover:bg-white/5 transition-colors"
          >
            <Bookmark className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right Toolbar Tools */}
        <div className="flex items-center gap-1 text-zinc-400">
          <button
            type="button"
            title="Record Voiceover"
            className="w-6 h-6 rounded flex items-center justify-center hover:text-white hover:bg-white/5 transition-colors"
          >
            <Mic className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            title="Snapping / Magnetic Timeline"
            className="px-2 h-6 rounded bg-[#201c38] text-purple-300 border border-purple-500/30 flex items-center gap-1 text-xs font-semibold"
          >
            <span>⟷</span>
          </button>
          <button
            type="button"
            title="AI Tools"
            className="w-6 h-6 rounded bg-purple-600/30 text-purple-300 border border-purple-500/40 flex items-center justify-center text-xs"
          >
            <Sparkles className="w-3 h-3" />
          </button>
          <button
            type="button"
            title="Zoom Out"
            className="w-6 h-6 rounded flex items-center justify-center hover:text-white hover:bg-white/5 transition-colors"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            title="Zoom In"
            className="w-6 h-6 rounded flex items-center justify-center hover:text-white hover:bg-white/5 transition-colors"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. Tracks Container (Headers on Left + Track Canvas on Right) */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Track Headers (Left Column) */}
        <div className="w-36 bg-[#090b16] border-r border-white/[0.07] flex flex-col shrink-0 select-none z-30">
          {/* Ruler Corner Spacer */}
          <div className="h-6 border-b border-white/[0.07] bg-[#0c0e1a] flex items-center justify-end px-2">
            <span className="text-[10px] text-zinc-600 font-mono">+</span>
          </div>

          {/* Track 1 Header: Subtitles */}
          <div className="h-8 border-b border-white/[0.05] px-2 flex items-center justify-between text-zinc-400">
            <div className="flex items-center gap-1.5">
              <Type className="w-3.5 h-3.5 text-orange-400 font-bold" />
              <Lock className="w-3 h-3 text-zinc-500 hover:text-zinc-300 cursor-pointer" />
              <Eye className="w-3 h-3 text-zinc-500 hover:text-zinc-300 cursor-pointer" />
            </div>
            <MoreHorizontal className="w-3 h-3 text-zinc-600" />
          </div>

          {/* Track 2 Header: Motion Graphics */}
          <div className="h-10 border-b border-white/[0.05] px-2 flex items-center justify-between text-zinc-400">
            <div className="flex items-center gap-1.5">
              <Video className="w-3.5 h-3.5 text-purple-400" />
              <Lock className="w-3 h-3 text-zinc-500 hover:text-zinc-300 cursor-pointer" />
              <Eye className="w-3 h-3 text-zinc-500 hover:text-zinc-300 cursor-pointer" />
            </div>
            <MoreHorizontal className="w-3 h-3 text-zinc-600" />
          </div>

          {/* Track 3 Header: Main Video Track */}
          <div className="h-16 border-b border-white/[0.05] px-2 flex items-center justify-between text-zinc-400">
            <div className="flex items-center gap-1.5">
              <Video className="w-3.5 h-3.5 text-purple-400" />
              <Lock className="w-3 h-3 text-zinc-500 hover:text-zinc-300 cursor-pointer" />
              <Eye className="w-3 h-3 text-zinc-500 hover:text-zinc-300 cursor-pointer" />
            </div>
            {/* Cover Button */}
            <button
              type="button"
              className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-white/5 hover:bg-white/10 text-[9px] text-zinc-300 border border-white/10"
            >
              <ImageIcon className="w-2.5 h-2.5" />
              <span>Cover</span>
            </button>
          </div>

          {/* Track 4 Header: Audio Track 1 */}
          <div className="h-10 border-b border-white/[0.05] px-2 flex items-center justify-between text-zinc-400">
            <div className="flex items-center gap-1.5">
              <Music className="w-3.5 h-3.5 text-indigo-400" />
              <Lock className="w-3 h-3 text-zinc-500 hover:text-zinc-300 cursor-pointer" />
              <Volume2 className="w-3 h-3 text-zinc-500 hover:text-zinc-300 cursor-pointer" />
            </div>
            <MoreHorizontal className="w-3 h-3 text-zinc-600" />
          </div>

          {/* Track 5 Header: Audio Track 2 */}
          <div className="h-10 border-b border-white/[0.05] px-2 flex items-center justify-between text-zinc-400">
            <div className="flex items-center gap-1.5">
              <Music className="w-3.5 h-3.5 text-indigo-400" />
              <Lock className="w-3 h-3 text-zinc-500 hover:text-zinc-300 cursor-pointer" />
              <Volume2 className="w-3 h-3 text-zinc-500 hover:text-zinc-300 cursor-pointer" />
            </div>
            <MoreHorizontal className="w-3 h-3 text-zinc-600" />
          </div>
        </div>

        {/* Tracks Timeline Scrollable Canvas (Right Column) */}
        <div className="flex-1 overflow-x-auto overflow-y-hidden relative bikin-scrollbar bg-[#080912]">
          {/* Minimal Timeline Width for ruler scrolling */}
          <div className="min-w-[1000px] h-full relative">
            {/* Playhead Vertical Line */}
            <div
              className="bikin-playhead"
              style={{ left: `${playheadPosition}px` }}
            >
              <div className="bikin-playhead-head" />
            </div>

            {/* Timecode Ruler */}
            <div className="h-6 border-b border-white/[0.07] bg-[#0c0e1a] relative flex items-center text-[10px] text-zinc-400 font-mono select-none">
              {RULER_TIMESTAMPS.map((t) => (
                <div
                  key={t.label}
                  className="absolute flex flex-col items-start"
                  style={{ left: `${t.pixel}px` }}
                >
                  <div className="h-1.5 w-[1px] bg-white/20 mb-0.5" />
                  <span>{t.label}</span>
                </div>
              ))}
            </div>

            {/* TRACK 1: Subtitle Segment Pills */}
            <div className="h-8 border-b border-white/[0.04] relative flex items-center">
              {SUBTITLE_SEGMENTS.map((seg) => (
                <div
                  key={seg.id}
                  className="bikin-subtitle-pill absolute cursor-pointer hover:brightness-110 active:scale-95 transition-all"
                  style={{
                    left: `${seg.startPixel}px`,
                    width: `${seg.widthPixel}px`,
                  }}
                  title={seg.text}
                >
                  {seg.text}
                </div>
              ))}
            </div>

            {/* TRACK 2: Motion Graphics Card */}
            <div className="h-10 border-b border-white/[0.04] relative flex items-center">
              <div
                className="bikin-motion-pill absolute cursor-pointer hover:brightness-110"
                style={{ left: '62px', width: '104px' }}
              >
                <span className="truncate">Motion...</span>
                <span className="px-1 py-0.2 rounded bg-purple-400/20 text-[9px] text-purple-200 border border-purple-300/30">
                  AI
                </span>
              </div>
            </div>

            {/* TRACK 3: Video Clips with Waveforms & Duration Tags */}
            <div className="h-16 border-b border-white/[0.04] relative flex items-center py-1">
              {VIDEO_CLIPS.map((clip) => (
                <div
                  key={clip.id}
                  className="bikin-video-clip absolute cursor-pointer"
                  style={{
                    left: `${clip.startPixel}px`,
                    width: `${clip.widthPixel}px`,
                  }}
                >
                  {/* Clip Header Label */}
                  <div className="px-1.5 py-0.5 flex items-center gap-1 bg-black/60 border-b border-white/10 z-10">
                    <Video className="w-2.5 h-2.5 text-purple-400 shrink-0" />
                    <span className="text-[9px] font-mono text-zinc-200 truncate font-semibold">
                      {clip.durationLabel}
                    </span>
                  </div>

                  {/* Thumbnail Studio Backdrop */}
                  <div className="absolute inset-0 bg-[#16182c] opacity-60 flex items-center justify-center pointer-events-none">
                    <div className="w-6 h-6 rounded-full bg-[#1e2240] opacity-40" />
                  </div>

                  {/* Audio Waveform Graphic */}
                  <div className="relative h-4 px-1 flex items-end gap-[1.5px] z-10 opacity-80 pb-1">
                    <div className="w-[2px] h-2 bg-indigo-400 rounded-full" />
                    <div className="w-[2px] h-3 bg-purple-400 rounded-full" />
                    <div className="w-[2px] h-1.5 bg-indigo-400 rounded-full" />
                    <div className="w-[2px] h-2.5 bg-purple-400 rounded-full" />
                    <div className="w-[2px] h-3.5 bg-indigo-300 rounded-full" />
                    <div className="w-[2px] h-2 bg-indigo-400 rounded-full" />
                    <div className="w-[2px] h-1 bg-indigo-400 rounded-full" />
                  </div>

                  {/* Trim Handles (White Dots at Corners) */}
                  <div className="bikin-clip-handle left" />
                  <div className="bikin-clip-handle right" />
                </div>
              ))}
            </div>

            {/* TRACK 4: Audio Track 1 */}
            <div className="h-10 border-b border-white/[0.04] relative flex items-center">
              {/* Music Badge Pill */}
              <div
                className="absolute flex items-center gap-1 px-2 py-1 rounded bg-[#201d3f] border border-purple-500/30 text-purple-300 cursor-pointer shadow-sm"
                style={{ left: '60px' }}
              >
                <Music className="w-3 h-3 text-purple-400" />
              </div>

              {/* Drop media placeholder prompt */}
              <div className="absolute left-[450px] text-[11px] text-zinc-600 font-medium">
                Drop media here
              </div>
            </div>

            {/* TRACK 5: Audio Track 2 */}
            <div className="h-10 border-b border-white/[0.04] relative flex items-center">
              {/* Audio Waveform Pill */}
              <div
                className="absolute flex items-center gap-1 px-2 py-1 rounded bg-[#171a32] border border-white/10 text-zinc-400 cursor-pointer"
                style={{ left: '60px' }}
              >
                <Music className="w-3 h-3 text-zinc-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
