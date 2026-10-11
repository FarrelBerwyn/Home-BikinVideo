import React, { useState, useEffect } from 'react';
import {
  X,
  Play,
  Pause,
  Download,
  Volume2,
  VolumeX,
  Maximize2,
  Sparkles,
  Subtitles,
  Check,
} from 'lucide-react';
import {
  SkatingElephantSvg,
  StarryNightElephantSvg,
  WaterLilyElephantSvg,
} from './ElephantIllustrations';

interface VideoPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  videoType: string;
}

export const VideoPreviewModal: React.FC<VideoPreviewModalProps> = ({
  isOpen,
  onClose,
  title,
  videoType,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(25);
  const [isMuted, setIsMuted] = useState(false);
  const [showCaptions, setShowCaptions] = useState(true);
  const [isDownloaded, setIsDownloaded] = useState(false);

  // Keyboard navigation: Escape key closes modal, Space toggles play
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === ' ' && (e.target as HTMLElement).tagName !== 'INPUT' && (e.target as HTMLElement).tagName !== 'TEXTAREA') {
        e.preventDefault();
        setIsPlaying((p) => !p);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Video progress animation
  useEffect(() => {
    if (!isOpen || !isPlaying) return;

    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 200);

    return () => clearInterval(interval);
  }, [isOpen, isPlaying]);

  if (!isOpen) return null;

  const handleDownload = () => {
    setIsDownloaded(true);
    // Create text file blob to simulate download
    const blob = new Blob([`Bikin Video Export\nTitle: ${title}\nType: ${videoType}\nTimestamp: ${new Date().toISOString()}`], {
      type: 'text/plain',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bikinvideo-${title.slice(0, 20).replace(/\s+/g, '-').toLowerCase()}.mp4`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setTimeout(() => setIsDownloaded(false), 2500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-preview-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-2xl bg-[#0E111F] border border-[#a082dc]/30 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-[#131627]">
          <div className="flex items-center gap-2 truncate pr-4">
            <img src="/brand-design/bikin-video-logo-icon.png" alt="Bikin Video" className="w-4 h-4 object-contain shrink-0" />
            <h3 id="video-preview-title" className="text-sm sm:text-base font-semibold text-white truncate">
              {title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Preview"
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#A4A5B5] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Canvas Area */}
        <div className="relative flex-1 bg-black flex items-center justify-center min-h-[320px] sm:min-h-[400px] overflow-hidden select-none">
          {/* Main SVG Animated Artwork */}
          <div className="w-full h-full max-h-[450px]">
            {title.includes('Starry') ? (
              <StarryNightElephantSvg className="w-full h-full object-contain" />
            ) : title.includes('Lily') ? (
              <WaterLilyElephantSvg className="w-full h-full object-contain" />
            ) : (
              <SkatingElephantSvg className="w-full h-full object-contain" />
            )}
          </div>

          {/* Dynamic Subtitle Overlay */}
          {showCaptions && (
            <div className="absolute bottom-16 left-6 right-6 text-center pointer-events-none">
              <span className="inline-block px-3 py-1.5 rounded-lg bg-black/80 border border-purple-500/30 text-white font-bold text-sm sm:text-base tracking-wide shadow-lg">
                {progress < 30
                  ? '✨ Skating through the winter mountains...'
                  : progress < 65
                  ? '❄️ Gliding effortlessly with colorful ice skates!'
                  : '🌟 Leaving a sparkling rainbow trail behind!'}
              </span>
            </div>
          )}

          {/* Central Play/Pause Watermark on click */}
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? 'Pause' : 'Play'}
            className="absolute inset-0 flex items-center justify-center bg-transparent group cursor-pointer"
          >
            {!isPlaying && (
              <div className="w-16 h-16 rounded-full bg-[#8B35E8]/90 border border-white/20 flex items-center justify-center text-white shadow-2xl transition-transform group-hover:scale-110">
                <Play className="w-7 h-7 ml-1 fill-white" />
              </div>
            )}
          </button>
        </div>

        {/* Media Controls Bar */}
        <div className="p-4 sm:p-5 bg-[#121524] border-t border-white/10 flex flex-col gap-3">
          {/* Timeline Scrubber */}
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono text-[#A4A5B5]">
              00:{Math.floor((progress * 0.3)).toString().padStart(2, '0')}
            </span>
            <div
              className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden cursor-pointer relative"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const pos = (e.clientX - rect.left) / rect.width;
                setProgress(Math.floor(pos * 100));
              }}
            >
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-[11px] font-mono text-[#A4A5B5]">00:30</span>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white cursor-pointer transition-colors"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
              </button>

              <button
                type="button"
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white cursor-pointer transition-colors"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={() => setShowCaptions(!showCaptions)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                  showCaptions
                    ? 'bg-purple-900/50 text-purple-200 border border-purple-500/40'
                    : 'bg-white/5 text-[#A4A5B5] hover:text-white'
                }`}
              >
                <Subtitles className="w-3.5 h-3.5" />
                <span>CC</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#737588] hidden sm:inline">
                1080x1920 · 60 FPS
              </span>

              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-[#8B35E8] to-[#A855F7] hover:from-[#9D44F2] hover:to-[#B352FA] active:scale-95 transition-all cursor-pointer shadow-md"
              >
                {isDownloaded ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-white" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5" />
                    <span>Download MP4</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
