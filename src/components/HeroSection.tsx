import React, { useState, useRef } from 'react';
import { BikinCursorAnimation } from './BikinCursorAnimation';
import HeroAiPromptBox from './HeroAiPromptBox';
import HeroRiveCard from './HeroRiveCard';

interface HeroSectionProps {
  onOpenTrial: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenTrial,
  onNavigateSection,
}) => {

  // Custom BIKIN Cursor state & refs
  const [cursorClickStep, setCursorClickStep] = useState<number>(0);
  const headerContainerRef = useRef<HTMLDivElement>(null);
  const finishedVideoRef = useRef<HTMLSpanElement>(null);

  // Background Video State & prefers-reduced-motion detection
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState<boolean>(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Dynamic gradient transition for "Finished Video." during simulated clicks:
  // Mayoritas Biru primary color (~70%) dan sisanya ungu primary (~30%)
  const getFinishedVideoGradientStyle = (step: number): React.CSSProperties => {
    switch (step) {
      case 1:
        return {
          backgroundImage: 'linear-gradient(90deg, #1E40AF 0%, #2563EB 35%, #38BDF8 65%, #7C3AED 85%, #8B35E8 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        };
      case 2:
        return {
          backgroundImage: 'linear-gradient(90deg, #1D4ED8 0%, #2563EB 40%, #60A5FA 70%, #7C3AED 88%, #8B35E8 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        };
      case 3:
        return {
          backgroundImage: 'linear-gradient(90deg, #0284C7 0%, #2563EB 35%, #3B82F6 68%, #8B35E8 88%, #A855F7 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        };
      default:
        return {
          backgroundImage: 'linear-gradient(90deg, #1D4ED8 0%, #2563EB 35%, #3B82F6 65%, #7C3AED 82%, #8B35E8 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        };
    }
  };

  const handleCreateVideo = async () => {
    // try {
    //   const newProj = await ProjectManager.createProject({ productType: 'bikin-editor' });
    //   navigate(`/editor?projectId=${encodeURIComponent(newProj.id)}`);
    // } catch {
    //   navigate('/editor');
    // }
  };

  const handlePromptSubmit = async (promptText: string, files: File[] = []) => {
    const submittedAt = Date.now();
    // try {
    //   const newProj = await ProjectManager.createProject({ productType: 'bikin-editor' });
    //   if (files.length) {
    //     // With media the editor imports it, places the footage and then RUNS the prompt
    //     // (HomeEditHandoff); a prompt alone is only put in the editor's Prompt Box.
    //     offerHomeEdit(newProj.id, { prompt: promptText, files, submittedAt });
    //     navigate(`/editor?projectId=${encodeURIComponent(newProj.id)}`);
    //     return;
    //   }
    //   navigate(`/editor?projectId=${encodeURIComponent(newProj.id)}&prompt=${encodeURIComponent(promptText)}`);
    // } catch {
    //   navigate(`/editor?prompt=${encodeURIComponent(promptText)}`);
    // }
  };



  return (
    <section id="hero-demo" className="relative min-h-[100svh] flex flex-col justify-center pt-20 sm:pt-24 lg:pt-28 pb-8 sm:pb-12 lg:pb-16 overflow-hidden z-10">
      {/* ================= PURPLE ABSTRACT VIDEO BACKGROUND ================= */}
      <div
        className="absolute inset-0 -z-10 overflow-hidden pointer-events-none select-none bg-[#080914] will-change-[opacity]"
        style={{ opacity: 'var(--scroll-bg-opacity, 1)' }}
        aria-hidden="true"
      >
        {/* Frame fallback / poster image (active during load or if prefers-reduced-motion is true) */}
        <img
          src="/images/hero-abstract-poster.jpg"
          alt=""
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ${videoLoaded && !prefersReducedMotion ? 'opacity-0' : 'opacity-85'
            }`}
        />

        {/* Seamlessly Looping Recolored Abstract Purple Video Background */}
        {!prefersReducedMotion && (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            poster="/images/hero-abstract-poster.jpg"
            onCanPlay={() => setVideoLoaded(true)}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ${videoLoaded ? 'opacity-85' : 'opacity-0'
              }`}
            style={{
              // Deep, cinematic recolor enhancement preserving darks and vibrant violet-lavender ribbons
              filter: 'contrast(1.12) brightness(0.96)',
            }}
          >
            <source src="/videos/hero-abstract-purple.mp4" type="video/mp4" />
          </video>
        )}

        {/* Readability Layer 1: Dark Radial Vignette behind Hero Heading & Supporting Copy */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 50% 32%, rgba(8, 9, 20, 0.4) 0%, rgba(8, 9, 20, 0.68) 55%, rgba(8, 9, 20, 0.94) 85%, #080914 100%)',
          }}
        />

        {/* Readability Layer 2: Top Fade ensuring crisp Navbar contrast */}
        <div className="absolute top-0 inset-x-0 h-28 sm:h-32 bg-gradient-to-b from-[#080914] via-[#080914]/80 to-transparent pointer-events-none" />

        {/* Readability Layer 3: Bottom Fade smoothly blending into next section */}
        <div className="absolute bottom-0 inset-x-0 h-32 sm:h-40 bg-gradient-to-t from-[#080914] via-[#080914]/90 to-transparent pointer-events-none" />
      </div>

      {/* ================= HERO TOP HEADER (MOBILE OPTIMIZED: CENTERED, BALANCED HIERARCHY) ================= */}
      <div
        className="page-container text-center flex flex-col items-center relative z-20"
      >
        {/* Dedicated Heading Box with Custom BIKIN Cursor Positioned at "Finished Video." */}
        <div
          ref={headerContainerRef}
          className="relative inline-block w-full max-w-[340px] xs:max-w-md sm:max-w-2xl lg:max-w-3xl mx-auto text-center"
        >
          {/* Custom Interactive BIKIN Cursor Animation (Original Purple Color) */}
          <BikinCursorAnimation
            containerRef={headerContainerRef}
            targetRef={finishedVideoRef}
            onClickStepChange={setCursorClickStep}
            colorScheme="purple"
          />

          {/* Main Headline */}
          <h1 className="text-[clamp(30px,7.5vw,38px)] sm:text-[clamp(36px,5vw,48px)] lg:text-[clamp(44px,4vw,60px)] font-extrabold text-[#F1F0F6] tracking-tight leading-[1.12] sm:leading-[1.08] mb-3 sm:mb-4 text-balance pt-1 sm:pt-2 max-w-[360px] xs:max-w-md sm:max-w-2xl lg:max-w-3xl mx-auto text-center">
            From Raw Footage{' '}
            <br className="hidden xs:inline sm:inline" />
            <span className="inline">to a </span>
            <span
              ref={finishedVideoRef}
              className="inline-block font-bold tracking-tight transition-all duration-500 ease-out"
              style={getFinishedVideoGradientStyle(cursorClickStep)}
            >
              Finished Video.
            </span>
          </h1>
        </div>

        {/* Supporting Text */}
        <p className="text-[13.5px] sm:text-[15.5px] md:text-[16.5px] text-[#A4A5B5] max-w-[340px] xs:max-w-lg sm:max-w-2xl leading-[1.6] text-center mx-auto mb-5 sm:mb-6">
          Direct your AI editor with natural language. Bikin Video helps you understand footage, shape the story, and refine the result.
        </p>

        {/* 2. Hero AI Prompt Box (Primary Hero Action) */}
        <div className="w-full flex justify-center px-4 sm:px-0">
          <HeroAiPromptBox
            onSubmitPrompt={handlePromptSubmit}
            onOpenEditor={handleCreateVideo}
          />
        </div>
      </div>

      {/* ================= HERO RIVE CARD (ANIMATION DEMO PREVIEW - SUPPORTING VISUAL) ================= */}
      <div className="w-full mt-6 sm:mt-8 lg:mt-10 relative z-20 flex justify-center">
        <HeroRiveCard onOpenTrial={onOpenTrial} />
      </div>
    </section>
  );
};
