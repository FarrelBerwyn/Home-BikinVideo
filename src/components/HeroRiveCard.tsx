import React, { useState, useCallback } from 'react';
import { useRive, Layout, Fit, Alignment } from '@rive-app/react-canvas';
import { Sparkles, AlertCircle, RotateCcw } from 'lucide-react';

interface HeroRiveCardProps {
  onOpenTrial?: () => void;
  className?: string;
}

const LOCAL_RIV_PATH = '/editor_new.riv';
const FALLBACK_CDN_URL = 'https://public.cdn.opus.pro/assets/editor_new.riv';

export const HeroRiveCard: React.FC<HeroRiveCardProps> = ({
  onOpenTrial,
  className = '',
}) => {
  const [currentSrc, setCurrentSrc] = useState<string>(LOCAL_RIV_PATH);
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const handleError = useCallback((err: any) => {
    console.warn('[Rive] Failed loading source:', currentSrc, err);
    // If local path failed, try remote CDN fallback once
    if (currentSrc === LOCAL_RIV_PATH) {
      console.info('[Rive] Switching to remote CDN fallback:', FALLBACK_CDN_URL);
      setCurrentSrc(FALLBACK_CDN_URL);
    } else {
      setHasError(true);
      setErrorMessage(
        'Animasi visual editor tidak dapat dimuat. Periksa koneksi internet atau kompatibilitas WebGL pada browser Anda.'
      );
    }
  }, [currentSrc]);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    setHasError(false);
  }, []);

  const { RiveComponent, rive } = useRive({
    src: currentSrc,
    stateMachines: 'State Machine 1',
    autoplay: true,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
    onLoad: handleLoad,
    onLoadError: handleError,
  });

  React.useEffect(() => {
    if (rive) {
      try {
        rive.play();
      } catch (err) {
        console.warn('[Rive] Autoplay error:', err);
      }
    }
  }, [rive]);

  const handleRetry = () => {
    setHasError(false);
    setIsLoaded(false);
    setCurrentSrc(LOCAL_RIV_PATH);
  };

  return (
    <div className={`w-full max-w-[360px] xs:max-w-[380px] sm:max-w-[640px] md:max-w-[720px] lg:max-w-[860px] mx-auto px-4 sm:px-6 min-w-0 box-border ${className}`}>
      <div className="hero-editor-card relative flex flex-col rounded-2xl sm:rounded-3xl glass-panel overflow-hidden w-full">
        
        {/* Editor Window Top Bar */}
        <div className="h-9 sm:h-10 px-2.5 sm:px-4 bg-[#0e0c24]/80 backdrop-blur-md border-b border-purple-500/20 flex items-center justify-between text-xs select-none">
          <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
            {/* Bikin Logo Icon */}
            <img
              src="/brand-design/bikin-video-logo-icon.png"
              alt="Bikin Video"
              className="w-4 h-4 sm:w-5 sm:h-5 rounded-[4px] sm:rounded-[5px] object-contain shadow-sm shrink-0"
            />
            <span className="font-semibold text-white/90 text-[11px] sm:text-xs truncate">Bikin Video AI Studio</span>
            <span className="hidden md:inline-block px-1.5 py-0.5 rounded text-[10px] font-mono glass-badge">
              Visual Preview Demo
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Live Indicator */}
            <div className="flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-[9px] sm:text-[10px] text-emerald-400 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live Animation</span>
            </div>

            {onOpenTrial && (
              <button
                type="button"
                onClick={onOpenTrial}
                className="px-2 sm:px-3 py-1 rounded-lg bg-gradient-to-r from-[#6D28D9] to-[#8B35F2] hover:brightness-110 text-white font-semibold text-[11px] sm:text-xs flex items-center gap-1 shadow-sm cursor-pointer transition-all border border-purple-400/30"
              >
                <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>Try Studio</span>
              </button>
            )}
          </div>
        </div>

        {/* Animation Display Area */}
        <div className="relative w-full bg-[#070913] flex items-center justify-center overflow-hidden aspect-[16/10] sm:aspect-[16/9] min-h-[190px] xs:min-h-[210px] sm:min-h-[340px] md:min-h-[400px] lg:min-h-[460px]">
          
          {/* Subtle Ambient Background Glows */}
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-purple-600/[0.08] blur-[100px] pointer-events-none rounded-full" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-blue-600/[0.06] blur-[100px] pointer-events-none rounded-full" />

          {/* Loading State Skeleton */}
          {!isLoaded && !hasError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#080914] z-10">
              <div className="w-10 h-10 rounded-full border-2 border-purple-500/20 border-t-purple-400 animate-spin" />
              <div className="text-xs font-mono text-[#A4A5B5] tracking-wide animate-pulse">
                Memuat Animasi Rive Editor...
              </div>
            </div>
          )}

          {/* Error Fallback State */}
          {hasError ? (
            <div className="p-6 text-center max-w-md mx-auto flex flex-col items-center gap-3 z-10">
              <div className="w-12 h-12 rounded-2xl bg-amber-950/50 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-semibold text-white">Preview Animasi Tidak Dapat Dimuat</h3>
              <p className="text-xs text-[#A4A5B5] leading-relaxed">
                {errorMessage}
              </p>
              <button
                type="button"
                onClick={handleRetry}
                className="mt-2 px-3.5 py-1.5 rounded-lg bg-[#181D33] hover:bg-[#202745] text-purple-200 border border-purple-500/30 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Coba Muat Ulang</span>
              </button>
            </div>
          ) : (
            /* Rive Web Canvas Component */
            <div className="relative w-full h-full flex items-center justify-center">
              <RiveComponent
                className="w-full h-full object-contain cursor-default"
                aria-label="Animasi Demo Visual AI Video Editor"
              />
            </div>
          )}

          {/* Bottom Watermark / Disclaimer Badge */}
          <div className="absolute bottom-2 right-2.5 sm:bottom-2.5 sm:right-3 px-1.5 sm:px-2 py-0.5 rounded bg-black/60 backdrop-blur border border-white/10 text-[8.5px] sm:text-[9.5px] font-mono text-[#737588] pointer-events-none select-none z-10">
            Visual Reference Preview
          </div>
        </div>

      </div>
    </div>
  );
};

export default HeroRiveCard;
