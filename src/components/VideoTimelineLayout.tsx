import React, { useState, useRef, useCallback } from 'react';
import {
  Plus,
  MousePointer,
  Scissors,
  Split,
  Bookmark,
  Magnet,
  Mic,
  Link2,
  Maximize2,
  ZoomIn,
  ZoomOut,
  Video,
  Lock,
  Eye,
  EyeOff,
  MoreHorizontal,
  Music,
  Volume2,
  VolumeX,
  Edit3,
  X,
  ChevronDown,
  Layers,
} from 'lucide-react';

export interface VideoTimelineLayoutProps {
  /** Initial playhead position in seconds (default: 21) */
  initialTime?: number;
  /** Total timeline duration in seconds (default: 70) */
  totalDuration?: number;
  /** Video clip duration string (default: "00:01:25:00") */
  clipDurationText?: string;
  /** Optional custom preview image for the video frames */
  thumbnailUrl?: string;
  /** Additional container CSS classes */
  className?: string;
  /** Callback when time changes via playhead scrubbing */
  onTimeChange?: (time: number) => void;
  /** Enable/disable interactive dragging & tools (default: true) */
  interactive?: boolean;
  /** Whether the timeline is embedded seamlessly inside a parent card */
  embedded?: boolean;
}

export const VideoTimelineLayout: React.FC<VideoTimelineLayoutProps> = ({
  initialTime = 52,
  totalDuration = 65,
  clipDurationText = '00:01:05:00',
  thumbnailUrl,
  className = '',
  onTimeChange,
  interactive = true,
  embedded = false,
}) => {
  const [currentTime, setCurrentTime] = useState(initialTime);
  const [zoom, setZoom] = useState(50);
  const [activeTool, setActiveTool] = useState<'select' | 'split' | 'cut' | 'bookmark'>('cut');
  const [isSnapping, setIsSnapping] = useState(true);
  const [isVideoLocked, setIsVideoLocked] = useState(false);
  const [isVideoVisible, setIsVideoVisible] = useState(true);
  const [isAudioLocked, setIsAudioLocked] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isClipSelected, setIsClipSelected] = useState(true);

  const rulerRef = useRef<HTMLDivElement>(null);
  const isDraggingPlayhead = useRef(false);

  // Time formatting helper: converts seconds to MM:SS
  const formatTimecode = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Generate ruler tick intervals every 5 seconds
  const tickIntervals = [];
  for (let sec = 0; sec <= totalDuration; sec += 5) {
    tickIntervals.push(sec);
  }

  // Handle clicking & dragging on the timeline ruler / tracks
  const handleSeek = useCallback(
    (clientX: number) => {
      if (!rulerRef.current) return;
      const rect = rulerRef.current.getBoundingClientRect();
      const clickX = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percentage = clickX / rect.width;
      const newTime = Math.round(percentage * totalDuration * 10) / 10;
      setCurrentTime(newTime);
      onTimeChange?.(newTime);
    },
    [totalDuration, onTimeChange]
  );

  const handleMouseDownRuler = (e: React.MouseEvent) => {
    if (!interactive) return;
    isDraggingPlayhead.current = true;
    handleSeek(e.clientX);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (isDraggingPlayhead.current) {
        handleSeek(moveEvent.clientX);
      }
    };

    const handleMouseUp = () => {
      isDraggingPlayhead.current = false;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const playheadPercent = Math.min(100, Math.max(0, (currentTime / totalDuration) * 100));

  // Realistic randomized audio waveform heights (deterministic seed pattern)
  const waveformBars = [
    22, 35, 60, 85, 45, 90, 75, 40, 20, 15, 65, 80, 95, 70, 50, 88, 60, 30, 25, 70,
    85, 90, 60, 35, 55, 80, 100, 75, 45, 30, 65, 90, 80, 50, 75, 95, 70, 40, 25, 60,
    85, 75, 45, 80, 90, 65, 35, 50, 70, 85, 60, 30, 60, 90, 80, 50, 70, 85, 40, 20,
    55, 75, 90, 60, 40, 70, 95, 85, 50, 35, 65, 80, 60, 40, 75, 90, 80, 55, 40, 70,
    85, 65, 40, 60, 85, 95, 70, 45, 30, 55, 75, 85, 60, 40, 65, 80, 50, 30, 20, 15
  ];

  return (
    <div
      className={
        embedded
          ? `w-full select-none border-t border-white/[0.08] bg-[#0A0D18] text-zinc-300 font-sans overflow-hidden ${className}`
          : `w-full select-none rounded-xl border border-[#231f3d] bg-[#0d0b18] text-zinc-300 font-sans shadow-2xl overflow-hidden backdrop-blur-md ${className}`
      }
    >
      {/* ─────────────────────────────────────────────────────────────
          1. TOP TOOLBAR
      ───────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-2 sm:px-3 py-1.5 border-b border-[#1f1b38] bg-[#120f24] text-zinc-400 text-xs overflow-x-auto scrollbar-none min-w-0 gap-2">
        {/* Left Toolbar Icons */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Add Item / Track */}
          <button
            type="button"
            className="p-1.5 rounded hover:bg-white/5 hover:text-zinc-200 transition text-zinc-400"
            title="Add Media / Track"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>

          {/* Select Tool */}
          <button
            type="button"
            onClick={() => interactive && setActiveTool('select')}
            className={`p-1.5 rounded transition ${
              activeTool === 'select'
                ? 'bg-purple-600/25 text-purple-300 border border-purple-500/40 shadow-sm'
                : 'hover:bg-white/5 hover:text-zinc-200 text-zinc-400'
            }`}
            title="Selection Tool (V)"
          >
            <MousePointer className="w-3.5 h-3.5" />
          </button>

          {/* Split / Cut Tools */}
          <button
            type="button"
            onClick={() => interactive && setActiveTool('split')}
            className={`p-1.5 rounded transition ${
              activeTool === 'split'
                ? 'bg-purple-600/25 text-purple-300 border border-purple-500/40 shadow-sm'
                : 'hover:bg-white/5 hover:text-zinc-200 text-zinc-400'
            }`}
            title="Split Clip (S)"
          >
            <Split className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            className="p-1.5 rounded hover:bg-white/5 hover:text-zinc-200 transition text-zinc-400"
            title="Delete / Ripple Delete"
          >
            <span className="font-mono text-[11px] font-bold tracking-tight">][</span>
          </button>

          <button
            type="button"
            className="p-1.5 rounded hover:bg-white/5 hover:text-zinc-200 transition text-zinc-400"
            title="Split Left"
          >
            <span className="font-mono text-[11px] font-bold tracking-tight">| [</span>
          </button>

          {/* Bookmark / Marker */}
          <button
            type="button"
            onClick={() => interactive && setActiveTool('bookmark')}
            className={`p-1.5 rounded transition ${
              activeTool === 'bookmark'
                ? 'bg-purple-600/25 text-purple-300 border border-purple-500/40'
                : 'hover:bg-white/5 hover:text-zinc-200 text-zinc-400'
            }`}
            title="Add Bookmark (M)"
          >
            <Bookmark className="w-3.5 h-3.5" />
          </button>

          {/* Snapping Toggle */}
          <button
            type="button"
            onClick={() => interactive && setIsSnapping(!isSnapping)}
            className={`flex items-center gap-0.5 px-1.5 py-1 rounded transition ${
              isSnapping ? 'text-purple-400 hover:bg-purple-500/10' : 'text-zinc-500 hover:text-zinc-300'
            }`}
            title="Toggle Snapping (N)"
          >
            <Magnet className="w-3.5 h-3.5" />
            <ChevronDown className="w-2.5 h-2.5 opacity-60" />
          </button>
        </div>

        {/* Right Toolbar Icons */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Record Voiceover */}
          <button
            type="button"
            className="p-1.5 rounded hover:bg-white/5 hover:text-zinc-200 transition text-zinc-400"
            title="Record Audio / Voiceover"
          >
            <Mic className="w-3.5 h-3.5" />
          </button>

          {/* Playhead Split Action */}
          <button
            type="button"
            className="p-1.5 rounded hover:bg-white/5 hover:text-zinc-200 transition text-zinc-400 border border-white/5"
            title="Split at Playhead"
          >
            <div className="flex items-center justify-center w-3.5 h-3.5 text-[9px] font-bold border border-current rounded-sm">
              ▶|
            </div>
          </button>

          {/* Active Razor / Scissors Cut Tool */}
          <button
            type="button"
            onClick={() => interactive && setActiveTool('cut')}
            className={`flex items-center justify-center px-2 py-1 rounded-md transition ${
              activeTool === 'cut'
                ? 'bg-purple-600/30 text-purple-200 border border-purple-500/60 shadow-[0_0_10px_rgba(168,85,247,0.3)]'
                : 'hover:bg-white/5 text-zinc-400'
            }`}
            title="Razor Cut Tool (C)"
          >
            <Scissors className="w-3.5 h-3.5 text-purple-300" />
          </button>

          {/* Link Audio/Video */}
          <button
            type="button"
            className="flex items-center gap-0.5 p-1 rounded hover:bg-white/5 hover:text-zinc-200 transition text-zinc-400"
            title="Link / Group Clips"
          >
            <Link2 className="w-3.5 h-3.5" />
            <ChevronDown className="w-2.5 h-2.5 opacity-60" />
          </button>

          {/* Auto Align / Magnetic Track */}
          <button
            type="button"
            className="p-1.5 rounded hover:bg-white/5 hover:text-zinc-200 transition text-zinc-400"
            title="Main Track Snapping"
          >
            <Layers className="w-3.5 h-3.5" />
          </button>

          {/* Fullscreen / Fit Preview */}
          <button
            type="button"
            className="p-1.5 rounded hover:bg-white/5 hover:text-zinc-200 transition text-zinc-400"
            title="Fit to Timeline"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>

          {/* Zoom Controls */}
          <div className="flex items-center gap-1.5 ml-1 pl-2 border-l border-white/10">
            <button
              type="button"
              onClick={() => interactive && setZoom((z) => Math.max(10, z - 10))}
              className="p-1 hover:text-zinc-200 text-zinc-400 transition"
              title="Zoom Out"
            >
              <ZoomOut className="w-3 h-3" />
            </button>

            {/* Zoom Slider */}
            <input
              type="range"
              min="10"
              max="100"
              value={zoom}
              onChange={(e) => interactive && setZoom(Number(e.target.value))}
              className="w-16 sm:w-20 h-1 bg-zinc-700/60 rounded-lg appearance-none cursor-pointer accent-white"
              title="Timeline Zoom"
            />

            <button
              type="button"
              onClick={() => interactive && setZoom((z) => Math.min(100, z + 10))}
              className="p-1 hover:text-zinc-200 text-zinc-400 transition"
              title="Zoom In"
            >
              <ZoomIn className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. TIMELINE RULER & PLAYHEAD
      ───────────────────────────────────────────────────────────── */}
      <div className="flex border-b border-[#1b1733] bg-[#0f0c1f]">
        {/* Left header gutter for ruler (+ button) */}
        <div className="w-20 sm:w-24 shrink-0 flex items-center justify-center border-r border-[#1e1a38] py-1 text-zinc-500">
          <button
            type="button"
            className="p-1 rounded hover:bg-white/5 hover:text-zinc-300 transition"
            title="Add Track"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Ruler area with timecodes */}
        <div
          ref={rulerRef}
          onMouseDown={handleMouseDownRuler}
          className="relative flex-1 h-6 cursor-pointer overflow-hidden flex items-end select-none"
        >
          {/* Subtle horizontal baseline */}
          <div className="absolute inset-x-0 bottom-0 h-px bg-white/10" />

          {/* Render time ticks */}
          {tickIntervals.map((sec) => {
            const leftPercent = (sec / totalDuration) * 100;
            return (
              <div
                key={sec}
                className="absolute bottom-0 flex flex-col items-start pointer-events-none"
                style={{ left: `${leftPercent}%` }}
              >
                <span className="text-[10px] font-mono font-medium text-zinc-400 mb-0.5 tracking-tight -translate-x-1">
                  {formatTimecode(sec)}
                </span>
                <div className="w-px h-2 bg-zinc-500" />
              </div>
            );
          })}

          {/* Sub-ticks between 5s intervals */}
          {Array.from({ length: Math.floor(totalDuration) }).map((_, i) => {
            if (i % 5 === 0) return null;
            const leftPercent = (i / totalDuration) * 100;
            return (
              <div
                key={`sub-${i}`}
                className="absolute bottom-0 w-px h-1 bg-zinc-700 pointer-events-none"
                style={{ left: `${leftPercent}%` }}
              />
            );
          })}

          {/* Playhead indicator & scrubber head on ruler */}
          <div
            className="absolute top-0 bottom-0 pointer-events-none z-30"
            style={{ left: `${playheadPercent}%` }}
          >
            {/* Scrubber Pentagon Needle Head */}
            <div className="absolute -top-0.5 -translate-x-1/2 flex flex-col items-center">
              <svg
                width="16"
                height="18"
                viewBox="0 0 16 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
              >
                <path
                  d="M1 2C1 1.44772 1.44772 1 2 1H14C14.5523 1 15 1.44772 15 2V12L8 17L1 12V2Z"
                  fill="#ffffff"
                  stroke="#1c192d"
                  strokeWidth="1.5"
                />
                <circle cx="8" cy="7" r="1.5" fill="#1c192d" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. TIMELINE TRACKS AREA
      ───────────────────────────────────────────────────────────── */}
      <div className="relative">
        {/* Full-height vertical playhead line dropping across all tracks */}
        <div className="absolute top-0 bottom-0 left-20 sm:left-24 right-0 pointer-events-none z-20 overflow-visible">
          <div
            className="absolute top-0 bottom-0 -translate-x-1/2 w-[1.5px] bg-white shadow-[0_0_8px_rgba(255,255,255,0.7)]"
            style={{ left: `${playheadPercent}%` }}
          />
        </div>

        {/* ── TRACK 1: MAIN VIDEO TRACK ── */}
        <div className="flex border-b border-[#1b1733] min-h-[58px] bg-[#0c0a17]">
          {/* Left Track Control Header */}
          <div className="w-20 sm:w-24 shrink-0 bg-[#120f24] border-r border-[#1e1a38] p-1.5 flex flex-col justify-center gap-1.5 text-zinc-400">
            <div className="flex items-center justify-between">
              <button
                type="button"
                className="hover:text-zinc-200 transition"
                title="Video Track"
              >
                <Video className="w-3.5 h-3.5 text-zinc-300" />
              </button>

              <button
                type="button"
                onClick={() => interactive && setIsVideoLocked(!isVideoLocked)}
                className={`transition ${isVideoLocked ? 'text-amber-400' : 'hover:text-zinc-200 text-zinc-400'}`}
                title={isVideoLocked ? 'Unlock Track' : 'Lock Track'}
              >
                <Lock className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => interactive && setIsVideoVisible(!isVideoVisible)}
                className={`transition ${!isVideoVisible ? 'text-red-400' : 'hover:text-zinc-200 text-zinc-400'}`}
                title="Toggle Visibility"
              >
                {isVideoVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              </button>

              <button
                type="button"
                className="hover:text-zinc-200 transition text-zinc-500"
                title="Track Settings"
              >
                <MoreHorizontal className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Track Content Row */}
          <div className="relative flex-1 flex items-center p-1.5 overflow-hidden">
            {/* Background vertical guideline grid */}
            {tickIntervals.map((sec) => (
              <div
                key={`grid-1-${sec}`}
                className="absolute top-0 bottom-0 w-px bg-white/[0.03] pointer-events-none"
                style={{ left: `${(sec / totalDuration) * 100}%` }}
              />
            ))}

            {/* "Cover" Button */}
            <div className="mr-2 shrink-0">
              <button
                type="button"
                className="flex flex-col items-center justify-center w-11 h-12 rounded-lg bg-[#1a1630] border border-[#2f2954] hover:border-purple-500/50 hover:bg-[#201c3c] transition text-zinc-300 group shadow-md"
                title="Set Video Cover / Thumbnail"
              >
                <Edit3 className="w-3.5 h-3.5 mb-0.5 text-zinc-400 group-hover:text-purple-300 transition" />
                <span className="text-[9px] font-medium tracking-tight text-zinc-400 group-hover:text-zinc-200">
                  Cover
                </span>
              </button>
            </div>

            {/* ── Active Video Clip (with glowing border & handles) ── */}
            <div
              onClick={() => interactive && setIsClipSelected(!isClipSelected)}
              className={`relative flex-1 h-12 rounded-md overflow-visible cursor-pointer transition-all ${
                isClipSelected
                  ? 'ring-2 ring-white shadow-[0_0_15px_rgba(255,255,255,0.4),0_0_30px_rgba(168,85,247,0.3)]'
                  : 'border border-purple-500/30'
              }`}
              style={{ maxWidth: '94%' }}
            >
              {/* Left Resize / Trim Handle */}
              <div className="absolute -left-1 top-0 bottom-0 w-2.5 bg-white rounded-l-md z-20 flex items-center justify-center cursor-ew-resize shadow-md">
                <div className="flex flex-col gap-0.5">
                  <div className="w-0.5 h-0.5 rounded-full bg-zinc-800" />
                  <div className="w-0.5 h-0.5 rounded-full bg-zinc-800" />
                  <div className="w-0.5 h-0.5 rounded-full bg-zinc-800" />
                </div>
              </div>

              {/* Right Resize / Trim Handle */}
              <div className="absolute -right-1 top-0 bottom-0 w-2.5 bg-white rounded-r-md z-20 flex items-center justify-center cursor-ew-resize shadow-md">
                <div className="flex flex-col gap-0.5">
                  <div className="w-0.5 h-0.5 rounded-full bg-zinc-800" />
                  <div className="w-0.5 h-0.5 rounded-full bg-zinc-800" />
                  <div className="w-0.5 h-0.5 rounded-full bg-zinc-800" />
                </div>
              </div>

              {/* Clip Body Container */}
              <div className="w-full h-full rounded-md overflow-hidden flex flex-col bg-[#1e1338]">
                {/* Clip Top Header Strip (Purple with timecode & badge) */}
                <div className="h-3.5 px-2 bg-gradient-to-r from-[#4c1d95] to-[#581c87] flex items-center justify-between text-[8px] font-mono text-purple-100 z-10 border-b border-purple-400/20">
                  <div className="flex items-center gap-1.5 font-bold tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-300/80 animate-pulse" />
                    <span>{clipDurationText}</span>
                  </div>

                  {/* Red badge / close icon */}
                  <div className="flex items-center justify-center w-2.5 h-2.5 rounded-full bg-red-500/80 hover:bg-red-500 text-white cursor-pointer">
                    <X className="w-2 h-2" />
                  </div>
                </div>

                {/* Filmstrip Row: Repeating video frame previews */}
                <div className="relative flex-1 bg-[#140f29] overflow-hidden flex items-center">
                  <div className="absolute inset-0 flex">
                    {/* Simulated filmstrip frames across the clip */}
                    {Array.from({ length: 24 }).map((_, idx) => (
                      <div
                        key={`frame-${idx}`}
                        className="relative h-full shrink-0 border-r border-black/40 overflow-hidden bg-[#18132d]"
                        style={{ width: '48px' }}
                      >
                        {thumbnailUrl ? (
                          <img
                            src={thumbnailUrl}
                            alt="Frame"
                            className="w-full h-full object-cover opacity-80"
                          />
                        ) : (
                          /* Built-in high-fidelity creator frame mockup */
                          <div className="w-full h-full relative flex items-center justify-center bg-gradient-to-b from-[#1c162e] via-[#140f26] to-[#0d091a] overflow-hidden">
                            {/* Ambient background studio light */}
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-transparent to-amber-900/20" />
                            {/* Speaker avatar matching Hero Creator */}
                            <div className="relative z-10 flex flex-col items-center">
                              {/* Cap */}
                              <div className="w-4 h-1.5 rounded-t-full bg-[#0d0f17]" />
                              {/* Face & Glasses */}
                              <div className="w-3.5 h-3 rounded-b-md bg-[#d8a47f] flex items-center justify-center relative shadow-sm">
                                <div className="flex gap-[1px] items-center">
                                  <div className="w-1.5 h-1 border border-[#0d0f17] rounded-[1px] bg-white/20" />
                                  <div className="w-1.5 h-1 border border-[#0d0f17] rounded-[1px] bg-white/20" />
                                </div>
                              </div>
                              {/* Black Studio Tee */}
                              <div className="w-6 h-3 bg-[#0d0f17] rounded-t-sm" />
                            </div>
                            {/* Subtle studio floor/desk */}
                            <div className="absolute bottom-0 inset-x-0 h-0.5 bg-[#251e3b]" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Audio Waveform Layer (Attached at the bottom of the video) */}
                  <div className="absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-[#0e0a1f]/90 via-[#0e0a1f]/60 to-transparent flex items-end px-1 gap-[1.5px] pointer-events-none z-10">
                    {waveformBars.map((barHeight, idx) => (
                      <div
                        key={`bar-${idx}`}
                        className="flex-1 rounded-t-[1px] bg-gradient-to-t from-[#7c3aed] to-[#38bdf8] opacity-85 transition-all"
                        style={{ height: `${(barHeight / 100) * 12 + 2}px` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── TRACK 2: SECONDARY / AUDIO TRACK ("Drop media here") ── */}
        <div className="flex min-h-[44px] bg-[#090812]">
          {/* Left Track Control Header */}
          <div className="w-20 sm:w-24 shrink-0 bg-[#120f24] border-r border-[#1e1a38] p-1.5 flex flex-col justify-center gap-1.5 text-zinc-400">
            <div className="flex items-center justify-between">
              <button
                type="button"
                className="hover:text-zinc-200 transition"
                title="Audio Track"
              >
                <Music className="w-3.5 h-3.5 text-zinc-400" />
              </button>

              <button
                type="button"
                onClick={() => interactive && setIsAudioLocked(!isAudioLocked)}
                className={`transition ${isAudioLocked ? 'text-amber-400' : 'hover:text-zinc-200 text-zinc-400'}`}
                title={isAudioLocked ? 'Unlock Audio' : 'Lock Audio'}
              >
                <Lock className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => interactive && setIsAudioMuted(!isAudioMuted)}
                className={`transition ${isAudioMuted ? 'text-red-400' : 'hover:text-zinc-200 text-zinc-400'}`}
                title="Mute Track"
              >
                {isAudioMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>

              <button
                type="button"
                className="hover:text-zinc-200 transition text-zinc-500"
                title="Track Settings"
              >
                <MoreHorizontal className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Empty Track Content Area */}
          <div className="relative flex-1 flex items-center justify-center p-2 overflow-hidden border-t border-dashed border-white/5">
            {/* Background vertical guideline grid */}
            {tickIntervals.map((sec) => (
              <div
                key={`grid-2-${sec}`}
                className="absolute top-0 bottom-0 w-px bg-white/[0.02] pointer-events-none"
                style={{ left: `${(sec / totalDuration) * 100}%` }}
              />
            ))}

            {/* Drop media placeholder text */}
            <div className="text-[11px] font-medium text-zinc-600/70 select-none tracking-wide">
              {isAudioLocked ? 'Track locked' : 'Drop media here'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoTimelineLayout;
