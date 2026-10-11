import React, { useEffect, useRef, useState, useCallback } from 'react';

export interface BikinCursorAnimationProps {
  // Mode 1: Headline text target (Hero Section)
  containerRef?: React.RefObject<HTMLDivElement | null>;
  targetRef?: React.RefObject<HTMLSpanElement | null>;
  onClickStepChange?: (step: number) => void;

  // Mode 2: Carousel Banner target (InteractiveDemoSection)
  mode?: 'headline' | 'carousel';
  carouselContainerRef?: React.RefObject<HTMLDivElement | null>;
  onHoverBanner?: (cardIndex: number | null) => void;
  isUserInteracting?: boolean;

  // Color customization
  colorScheme?: 'purple' | 'primary';
  arrowFill?: string;
  arrowStroke?: string;
  badgeBg?: string;
  badgeText?: string;
  badgeBorder?: string;
}

export interface CursorTheme {
  arrowFill: string;
  arrowStroke: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  badgeShadow?: string;
  rippleBorder: string;
  rippleBg: string;
}

export const CURSOR_THEMES: Record<'purple' | 'primary', CursorTheme> = {
  purple: {
    arrowFill: '#D9A1FF',
    arrowStroke: '#8B35E8',
    badgeBg: '#8B35E8',
    badgeText: '#FFFFFF',
    badgeBorder: 'rgba(255, 255, 255, 0.2)',
    badgeShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
    rippleBorder: '#60A5FA',
    rippleBg: 'rgba(59, 130, 246, 0.25)',
  },
  primary: {
    arrowFill: '#93C5FD',
    arrowStroke: '#2563EB',
    badgeBg: '#2563EB',
    badgeText: '#FFFFFF',
    badgeBorder: 'rgba(255, 255, 255, 0.25)',
    badgeShadow: '0 4px 14px rgba(37, 99, 235, 0.55)',
    rippleBorder: '#38BDF8',
    rippleBg: 'rgba(56, 189, 248, 0.25)',
  },
};

export interface Ripple {
  id: number;
  x: number;
  y: number;
}

// Helper to normalize angle difference for smooth shortest-arc rotation
export const normalizeAngleDiff = (from: number, to: number) => {
  let diff = (to - from) % 360;
  if (diff > 180) diff -= 360;
  if (diff < -180) diff += 360;
  return diff;
};

/**
 * Compute dynamic badge placement:
 * 1. The pointer tip is ALWAYS the leading element pointing towards the target.
 * 2. The badge ALWAYS follows from behind, placed snugly on the opposite side of the pointer direction.
 * 3. The badge is tightly nestled right behind the pointer arrow body (consistent tight gap).
 * 4. Badge remains horizontal, upright, and legible.
 */
export const computeBadgeOffset = (angleDeg: number, isMobile: boolean = false) => {
  const normalized = ((angleDeg % 360) + 360) % 360;

  // Snug distances keeping badge tightly attached to the back of the arrow
  const distH = isMobile ? 30 : 34;
  const distV = isMobile ? 22 : 25;
  const distDiagX = isMobile ? 24 : 27;
  const distDiagY = isMobile ? 18 : 20;

  if (normalized >= 337.5 || normalized < 22.5) {
    // Pointing RIGHT (0°) -> badge tightly to the LEFT of pointer
    return { x: -distH, y: 0 };
  } else if (normalized >= 22.5 && normalized < 67.5) {
    // Pointing DOWN-RIGHT (45°) -> badge tightly TOP-LEFT of pointer
    return { x: -distDiagX, y: -distDiagY };
  } else if (normalized >= 67.5 && normalized < 112.5) {
    // Pointing DOWN (90°) -> badge tightly ABOVE pointer
    return { x: 0, y: -distV };
  } else if (normalized >= 112.5 && normalized < 157.5) {
    // Pointing DOWN-LEFT (135°) -> badge tightly TOP-RIGHT of pointer
    return { x: distDiagX, y: -distDiagY };
  } else if (normalized >= 157.5 && normalized < 202.5) {
    // Pointing LEFT (180°) -> badge tightly to the RIGHT of pointer
    return { x: distH, y: 0 };
  } else if (normalized >= 202.5 && normalized < 247.5) {
    // Pointing UP-LEFT (225°) -> badge tightly BOTTOM-RIGHT of pointer
    return { x: distDiagX, y: distDiagY };
  } else if (normalized >= 247.5 && normalized < 292.5) {
    // Pointing UP (270°) -> badge tightly BELOW pointer
    return { x: 0, y: distV };
  } else {
    // Pointing UP-RIGHT (315°) -> badge tightly BOTTOM-LEFT of pointer
    return { x: -distDiagX, y: distDiagY };
  }
};

/**
 * Shared Visual presentation of the BIKIN Pointer Arrow and Pill Badge
 */
export const BikinCursorVisual: React.FC<{
  rootRef?: React.RefObject<HTMLDivElement | null>;
  position: { x: number; y: number };
  pointerAngle: number;
  badgeOffset: { x: number; y: number };
  isClicking: boolean;
  isVisible: boolean;
  opacity?: number;
  ripples?: Ripple[];
  colorScheme?: 'purple' | 'primary';
  arrowFill?: string;
  arrowStroke?: string;
  badgeBg?: string;
  badgeText?: string;
  badgeBorder?: string;
}> = ({
  rootRef,
  position,
  pointerAngle,
  badgeOffset,
  isClicking,
  isVisible,
  opacity = 1,
  ripples = [],
  colorScheme = 'purple',
  arrowFill,
  arrowStroke,
  badgeBg,
  badgeText,
  badgeBorder,
}) => {
  const theme = CURSOR_THEMES[colorScheme] || CURSOR_THEMES.purple;
  const currentArrowFill = arrowFill || theme.arrowFill;
  const currentArrowStroke = arrowStroke || theme.arrowStroke;
  const currentBadgeBg = badgeBg || theme.badgeBg;
  const currentBadgeText = badgeText || theme.badgeText;
  const currentBadgeBorder = badgeBorder || theme.badgeBorder;
  const currentBadgeShadow = theme.badgeShadow;
  const currentRippleBorder = theme.rippleBorder;
  const currentRippleBg = theme.rippleBg;

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none select-none z-50 overflow-visible transition-opacity duration-300"
      style={{ opacity: isVisible ? opacity : 0 }}
    >
      {/* Click ripple rings expanding from exact cursor tip */}
      {ripples.map((r) => (
        <span
          key={r.id}
          className="absolute rounded-full border-2 pointer-events-none animate-cursor-ripple"
          style={{
            borderColor: currentRippleBorder,
            backgroundColor: currentRippleBg,
            left: `${r.x}px`,
            top: `${r.y}px`,
            width: '36px',
            height: '36px',
            marginLeft: '-18px',
            marginTop: '-18px',
          }}
        />
      ))}

      {/* Animated BIKIN Cursor Group - Translated to exact tip coordinate (position.x, position.y) */}
      <div
        className="absolute"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0px)`,
          willChange: 'transform',
        }}
      >
        {/* Pointer Arrow */}
        <div
          className={`transition-transform duration-150 ease-out ${
            isClicking ? 'scale-[0.85]' : 'scale-100'
          }`}
          style={{
            transform: `rotate(${pointerAngle}deg)`,
            transformOrigin: '0px 0px',
            filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.75))',
            willChange: 'transform',
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="-16 -12 24 24"
            fill="none"
            className="overflow-visible block"
          >
            {/* Crisp mouse cursor pointing straight to the right at 0° with tip at (0, 0) */}
            <path
              d="M 0 0 L -14 -5.5 L -11 0 L -14 5.5 Z"
              fill={currentArrowFill}
              stroke={currentArrowStroke}
              strokeWidth="1.3"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Pill Badge: "BIKIN" */}
        <div
          className="absolute top-0 left-0 transition-transform duration-200 ease-out pointer-events-none"
          style={{
            transform: `translate3d(calc(-50% + ${badgeOffset.x}px), calc(-50% + ${badgeOffset.y}px), 0px)`,
            willChange: 'transform',
          }}
        >
          <div
            className="px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full text-[10.5px] sm:text-[11px] font-bold tracking-wide select-none flex items-center gap-1 justify-center backdrop-blur-sm whitespace-nowrap leading-tight transition-colors duration-200"
            style={{
              backgroundColor: currentBadgeBg,
              color: currentBadgeText,
              borderColor: currentBadgeBorder,
              borderWidth: '1px',
              borderStyle: 'solid',
              boxShadow: currentBadgeShadow,
            }}
          >
            <span>BIKIN</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Controller Mode 1: Headline text perimeter orbit & click sequence (HeroSection)
 */
const BikinHeadlineCursorController: React.FC<{
  containerRef: React.RefObject<HTMLDivElement | null>;
  targetRef: React.RefObject<HTMLSpanElement | null>;
  onClickStepChange?: (step: number) => void;
  colorScheme?: 'purple' | 'primary';
  arrowFill?: string;
  arrowStroke?: string;
  badgeBg?: string;
  badgeText?: string;
  badgeBorder?: string;
}> = ({
  containerRef,
  targetRef,
  onClickStepChange,
  colorScheme = 'purple',
  arrowFill,
  arrowStroke,
  badgeBg,
  badgeText,
  badgeBorder,
}) => {
  const rootRef = useRef<HTMLDivElement | null>(null);

  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [pointerAngle, setPointerAngle] = useState<number>(315);
  const [badgeOffset, setBadgeOffset] = useState<{ x: number; y: number }>({ x: -16, y: 24 });
  const [isClicking, setIsClicking] = useState<boolean>(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isInView, setIsInView] = useState<boolean>(true);

  const animFrameRef = useRef<number | null>(null);
  const sequenceTimersRef = useRef<NodeJS.Timeout[]>([]);
  const isMountedRef = useRef<boolean>(true);
  const currentAngleRef = useRef<number>(315);
  const isAnimatingRef = useRef<boolean>(false);

  // Measure exact target coordinates anchored directly to the start of "Finished Video."
  const getTargetCoordinates = useCallback(() => {
    const container = rootRef.current || containerRef.current;
    const target = targetRef.current;
    if (!container || !target) return null;

    const cRect = container.getBoundingClientRect();
    const tRect = target.getBoundingClientRect();

    const isMobile = window.innerWidth < 640;
    const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024;

    // Pointer tip targets the top-left start edge of "Finished Video."
    const tipX = tRect.left - cRect.left + tRect.width * (isMobile ? 0.08 : 0.12);

    // Vertically placed near top edge of the text so headline typography remains completely unobstructed
    const tipY = tRect.top - cRect.top + tRect.height * (isMobile ? 0.12 : 0.15);

    // Pill badge BIKIN floats above-left in open space, never covering headline letters
    const bOffset = {
      x: isMobile ? -20 : -18,
      y: isMobile ? -20 : -18,
    };

    return {
      tipX,
      tipY,
      bOffset,
      tRect,
      cRect,
      isMobile,
    };
  }, [containerRef, targetRef]);

  // Pause when scrolled out of view to save resources
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        setIsInView(entries[0].isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [containerRef]);

  // ResizeObserver & window resize listener for responsive positioning
  useEffect(() => {
    const handleRecalculate = () => {
      const coords = getTargetCoordinates();
      if (!coords) return;
      if (!isAnimatingRef.current) {
        setPosition({ x: coords.tipX, y: coords.tipY });
        setPointerAngle(315);
        currentAngleRef.current = 315;
        setBadgeOffset(coords.bOffset);
      }
    };

    window.addEventListener('resize', handleRecalculate);

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => {
        handleRecalculate();
      });
      if (containerRef.current) ro.observe(containerRef.current);
      if (targetRef.current) ro.observe(targetRef.current);
      if (rootRef.current) ro.observe(rootRef.current);
    }

    return () => {
      window.removeEventListener('resize', handleRecalculate);
      if (ro) ro.disconnect();
    };
  }, [containerRef, targetRef, getTargetCoordinates]);

  // Main Animation & Editorial Click Lifecycle
  useEffect(() => {
    isMountedRef.current = true;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      const coords = getTargetCoordinates();
      if (coords) {
        setPosition({ x: coords.tipX, y: coords.tipY });
        setBadgeOffset(coords.bOffset);
      }
      setPointerAngle(315);
      setIsVisible(true);
      return;
    }

    if (!isInView) {
      setIsVisible(false);
      return;
    }

    // Initial positioning right at the target
    const initCoords = getTargetCoordinates();
    if (initCoords) {
      setPosition({ x: initCoords.tipX, y: initCoords.tipY });
      setBadgeOffset(initCoords.bOffset);
      setPointerAngle(315);
      currentAngleRef.current = 315;
      setIsVisible(true);
    }

    const delay = (ms: number) =>
      new Promise<void>((resolve) => {
        const timer = setTimeout(() => resolve(), ms);
        sequenceTimersRef.current.push(timer);
      });

    // Smooth position and angle interpolation
    const animateTo = (
      startX: number,
      startY: number,
      endX: number,
      endY: number,
      durationMs: number,
      targetPoint?: { x: number; y: number }
    ) => {
      return new Promise<void>((resolve) => {
        isAnimatingRef.current = true;
        const startTime = performance.now();
        const deltaX = endX - startX;
        const deltaY = endY - startY;

        const aimPt = targetPoint || { x: endX, y: endY };
        const rawTargetAngle =
          (Math.atan2(aimPt.y - startY, aimPt.x - startX) * 180) / Math.PI;
        const normalizedTarget = (rawTargetAngle + 360) % 360;

        const startAngle = currentAngleRef.current;
        const angleDiff = normalizeAngleDiff(startAngle, normalizedTarget);
        const endAngle = startAngle + angleDiff;

        const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);
        const isMobile = window.innerWidth < 640;

        const step = (now: number) => {
          if (!isMountedRef.current) {
            isAnimatingRef.current = false;
            resolve();
            return;
          }
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / durationMs, 1);
          const ease = easeOutQuart(progress);

          const currentX = startX + deltaX * ease;
          const currentY = startY + deltaY * ease;

          let currentA: number;
          if (targetPoint) {
            const liveDiffX = targetPoint.x - currentX;
            const liveDiffY = targetPoint.y - currentY;
            if (Math.hypot(liveDiffX, liveDiffY) > 4) {
              const liveAngle = (Math.atan2(liveDiffY, liveDiffX) * 180) / Math.PI;
              const normLive = (liveAngle + 360) % 360;
              const diff = normalizeAngleDiff(currentAngleRef.current, normLive);
              currentA = currentAngleRef.current + diff * Math.min(1, ease * 1.5);
            } else {
              currentA = endAngle;
            }
          } else {
            currentA = startAngle + angleDiff * ease;
          }

          currentAngleRef.current = currentA;
          const newBadgeOffset = computeBadgeOffset(currentA, isMobile);

          setPosition({ x: currentX, y: currentY });
          setPointerAngle(currentA);
          setBadgeOffset(newBadgeOffset);

          if (progress < 1) {
            animFrameRef.current = requestAnimationFrame(step);
          } else {
            setPosition({ x: endX, y: endY });
            currentAngleRef.current = endAngle;
            setPointerAngle(endAngle);
            setBadgeOffset(computeBadgeOffset(endAngle, isMobile));
            isAnimatingRef.current = false;
            resolve();
          }
        };

        animFrameRef.current = requestAnimationFrame(step);
      });
    };

    // Trigger visual click effect & ripple directly at the start of "Finished Video."
    const performClick = async (stepNum: number, clickX: number, clickY: number) => {
      if (!isMountedRef.current) return;
      setIsClicking(true);

      const rippleId = Date.now() + Math.random();
      setRipples((prev) => [...prev, { id: rippleId, x: clickX, y: clickY }]);
      setTimeout(() => {
        if (isMountedRef.current) {
          setRipples((prev) => prev.filter((r) => r.id !== rippleId));
        }
      }, 700);

      // Trigger headline gradient color shift
      onClickStepChange?.(stepNum);

      await delay(200);
      if (!isMountedRef.current) return;
      setIsClicking(false);
    };

    // Autonomous editorial loop:
    // 1. Focuses directly on the beginning of "Finished Video."
    // 2. Executes editorial clicks (1 -> 2 -> 3) with ripples and styling shifts
    // 3. Gentle editorial glide strictly within the heading boundaries
    // 4. Returns directly to the beginning of "Finished Video."
    const runSequence = async () => {
      // Small initial settle pause
      await delay(300);

      while (isMountedRef.current && isInView) {
        const coords = getTargetCoordinates();
        if (!coords) {
          await delay(300);
          continue;
        }

        const pTarget = { x: coords.tipX, y: coords.tipY };

        // Ensure cursor is squarely settled at the start of "Finished Video."
        setPosition(pTarget);
        setPointerAngle(315);
        currentAngleRef.current = 315;
        setBadgeOffset(coords.bOffset);

        // Pause focused right before the word "Finished"
        await delay(420);
        if (!isMountedRef.current) break;

        // Click 1: Purple to Pink (#EC4899)
        await performClick(1, pTarget.x, pTarget.y);
        await delay(480);
        if (!isMountedRef.current) break;

        // Click 2: Pink to Sky Blue (#38BDF8)
        await performClick(2, pTarget.x, pTarget.y);
        await delay(480);
        if (!isMountedRef.current) break;

        // Click 3: Sky Blue back to Vibrant Violet (#A068FF)
        await performClick(3, pTarget.x, pTarget.y);
        await delay(600);
        if (!isMountedRef.current) break;

        // Reset text gradient back to default state
        onClickStepChange?.(0);
        await delay(400);
        if (!isMountedRef.current) break;

        // Subtle glide strictly across the characters of "Finished Video."
        const isMobile = coords.isMobile;
        const glideDeltaX = Math.min(coords.tRect.width * 0.32, isMobile ? 65 : 100);

        const pGlideAway = {
          x: pTarget.x + glideDeltaX,
          y: pTarget.y - (isMobile ? 2 : 4),
        };

        // Smooth glide across the text characters towards "Video."
        await animateTo(pTarget.x, pTarget.y, pGlideAway.x, pGlideAway.y, 700);
        if (!isMountedRef.current) break;

        await delay(250);
        if (!isMountedRef.current) break;

        // Re-read coordinates in case of layout shift during animation
        const liveCoords = getTargetCoordinates();
        const liveTarget = liveCoords ? { x: liveCoords.tipX, y: liveCoords.tipY } : pTarget;

        // Glide gracefully back right to the beginning of "Finished Video."
        await animateTo(pGlideAway.x, pGlideAway.y, liveTarget.x, liveTarget.y, 800, liveTarget);
        if (!isMountedRef.current) break;

        // Re-align precisely to canonical 315° orientation
        setPointerAngle(315);
        currentAngleRef.current = 315;
        setBadgeOffset(liveCoords ? liveCoords.bOffset : coords.bOffset);

        await delay(350);
      }
    };

    runSequence();

    return () => {
      isMountedRef.current = false;
      isAnimatingRef.current = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      sequenceTimersRef.current.forEach(clearTimeout);
      onClickStepChange?.(0);
    };
  }, [containerRef, targetRef, onClickStepChange, isInView, getTargetCoordinates]);

  if (!isInView) return null;

  return (
    <BikinCursorVisual
      rootRef={rootRef}
      position={position}
      pointerAngle={pointerAngle}
      badgeOffset={badgeOffset}
      isClicking={isClicking}
      isVisible={isVisible}
      ripples={ripples}
      colorScheme={colorScheme}
      arrowFill={arrowFill}
      arrowStroke={arrowStroke}
      badgeBg={badgeBg}
      badgeText={badgeText}
      badgeBorder={badgeBorder}
    />
  );
};

const BikinCarouselCursorController: React.FC<{
  containerRef: React.RefObject<HTMLDivElement | null>;
  onHoverBanner?: (cardIndex: number | null) => void;
  isUserInteracting?: boolean;
  colorScheme?: 'purple' | 'primary';
  arrowFill?: string;
  arrowStroke?: string;
  badgeBg?: string;
  badgeText?: string;
  badgeBorder?: string;
}> = ({
  containerRef,
  onHoverBanner,
  isUserInteracting = false,
  colorScheme = 'primary',
  arrowFill,
  arrowStroke,
  badgeBg,
  badgeText,
  badgeBorder,
}) => {
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [pointerAngle, setPointerAngle] = useState<number>(315);
  const [badgeOffset, setBadgeOffset] = useState<{ x: number; y: number }>({ x: -27, y: 20 });
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isInView, setIsInView] = useState<boolean>(false);

  // Stable refs for callbacks and dynamic states to prevent effect re-triggering / freezing
  const onHoverBannerRef = useRef(onHoverBanner);
  onHoverBannerRef.current = onHoverBanner;

  const isUserInteractingRef = useRef(isUserInteracting);
  isUserInteractingRef.current = isUserInteracting;

  const isMountedRef = useRef<boolean>(true);
  const currentAngleRef = useRef<number>(315);
  const animFrameRef = useRef<number | null>(null);
  const sequenceTimersRef = useRef<NodeJS.Timeout[]>([]);
  const lastCardIndexRef = useRef<number | null>(null);
  const isDocumentVisibleRef = useRef<boolean>(true);

  const clearAllTimers = useCallback(() => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    sequenceTimersRef.current.forEach(clearTimeout);
    sequenceTimersRef.current = [];
  }, []);

  const delay = useCallback((ms: number) => {
    return new Promise<void>((resolve) => {
      const timer = setTimeout(() => resolve(), ms);
      sequenceTimersRef.current.push(timer);
    });
  }, []);

  // Listen to tab visibility to pause and resume animations cleanly
  useEffect(() => {
    const handleVisibility = () => {
      isDocumentVisibleRef.current = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  // IntersectionObserver to only animate when carousel section is in viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        setIsInView(entries[0].isIntersecting);
      },
      { threshold: 0.15 }
    );
    observer.observe(el);

    return () => observer.disconnect();
  }, [containerRef]);

  // Main autonomous cursor flight and hover loop
  useEffect(() => {
    isMountedRef.current = true;

    // Accessibility & touch screen checks
    const isTouch =
      typeof window !== 'undefined' &&
      (window.matchMedia('(hover: none) and (pointer: coarse)').matches ||
        ('ontouchstart' in window && !window.matchMedia('(hover: hover)').matches));
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouch || prefersReducedMotion) {
      setIsVisible(false);
      return;
    }

    if (!isInView || isUserInteracting) {
      setIsVisible(false);
      clearAllTimers();
      if (!isUserInteractingRef.current) {
        onHoverBannerRef.current?.(null);
      }
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const cRect = container.getBoundingClientRect();
    let currentPos = {
      x: cRect.width * 0.5,
      y: cRect.height * 0.45,
    };
    setPosition(currentPos);
    setPointerAngle(315);
    setBadgeOffset(computeBadgeOffset(315, window.innerWidth < 640));
    setIsVisible(true);

    const runLoop = async () => {
      // Natural entrance pause before initiating first flight
      await delay(350);

      while (isMountedRef.current && isInView && !isUserInteractingRef.current) {
        if (!isDocumentVisibleRef.current) {
          await delay(250);
          continue;
        }

        const parentEl = containerRef.current;
        if (!parentEl) {
          await delay(250);
          continue;
        }

        const parentRect = parentEl.getBoundingClientRect();

        // Check foreground editor panel in #interactive-demo to ensure cursor coordinates never hide behind it
        const demoSection =
          parentEl.closest('#interactive-demo') ||
          document.getElementById('interactive-demo');
        const editorEl = demoSection
          ? (demoSection.querySelector('.hero-editor-card') as HTMLElement) ||
            (demoSection.querySelector('.hero-editor-container') as HTMLElement)
          : null;
        const editorRect = editorEl ? editorEl.getBoundingClientRect() : null;

        // 1. Locate all rendered carousel cards with data-card-index
        const cardElements = Array.from(
          parentEl.querySelectorAll('[data-card-index]')
        ) as HTMLElement[];

        if (cardElements.length === 0) {
          await delay(250);
          continue;
        }

        // Filter cards that are comfortably within the visible stage area (front view)
        interface ValidCardCandidate {
          element: HTMLElement;
          index: number;
          maxSafeRelY: number;
          isCenterOverlap: boolean;
        }

        const validCandidates: ValidCardCandidate[] = [];
        cardElements.forEach((el) => {
          const idx = Number(el.getAttribute('data-card-index'));
          if (isNaN(idx)) return;
          const rect = el.getBoundingClientRect();
          const cardCenterX = rect.left + rect.width / 2;
          const computedOpacity = parseFloat(window.getComputedStyle(el).opacity || '1');

          // Must be facing user and visible on screen (width >= 70px, opacity >= 0.25)
          if (
            cardCenterX >= parentRect.left + 30 &&
            cardCenterX <= parentRect.right - 30 &&
            rect.width >= 70 &&
            computedOpacity >= 0.25
          ) {
            let maxSafeRelY = 0.85;
            let isCenterOverlap = false;

            if (editorRect) {
              const overlapsH = rect.right > editorRect.left + 15 && rect.left < editorRect.right - 15;
              if (overlapsH) {
                isCenterOverlap = true;
                const visibleBottom = Math.min(rect.bottom, editorRect.top - 12);
                maxSafeRelY = (visibleBottom - rect.top) / rect.height;
                // If less than 20% of card is visible above editor, skip
                if (maxSafeRelY < 0.20) return;
              }
            }

            validCandidates.push({
              element: el,
              index: idx,
              maxSafeRelY,
              isCenterOverlap,
            });
          }
        });

        if (validCandidates.length === 0) {
          await delay(250);
          continue;
        }

        // Avoid picking the same banner consecutively if alternatives exist
        let candidates = validCandidates.filter(
          (c) => c.index !== lastCardIndexRef.current
        );
        if (candidates.length === 0) candidates = validCandidates;

        // Differentiate between center banners and flank banners so center is visited regularly
        const parentCenterX = parentRect.left + parentRect.width / 2;
        const centerCards = candidates.filter((c) => {
          const cRect = c.element.getBoundingClientRect();
          const cCenterX = cRect.left + cRect.width / 2;
          return Math.abs(cCenterX - parentCenterX) < parentRect.width * 0.28;
        });
        const flankCards = candidates.filter((c) => !centerCards.includes(c));

        // Prioritize center banners (~60% chance) so cursor prominently visits center cards as requested
        let targetCard: ValidCardCandidate;
        const preferCenter = Math.random() < 0.60;
        if (preferCenter && centerCards.length > 0) {
          targetCard = centerCards[Math.floor(Math.random() * centerCards.length)];
        } else if (flankCards.length > 0) {
          targetCard = flankCards[Math.floor(Math.random() * flankCards.length)];
        } else {
          targetCard = candidates[Math.floor(Math.random() * candidates.length)];
        }
        lastCardIndexRef.current = targetCard.index;

        // 2. Pick flexible random target zone on the banner (atas, tengah, bawah + horizontal)
        let relY: number;
        if (targetCard.isCenterOverlap) {
          // Center card: partially occluded at bottom by editor panel
          // Target visible upper (18-28%) or middle (34-50%) portion safely above editor
          const zone = Math.random() < 0.5 ? 0 : 1;
          if (zone === 0) {
            // Atas: 18–28% (creator badge & upper portrait)
            relY = 0.18 + Math.random() * 0.10;
          } else {
            // Tengah: 34–50% (points near middle face/title, safely above editor top edge)
            const maxMid = Math.min(0.52, targetCard.maxSafeRelY - 0.08);
            const minMid = Math.min(0.34, maxMid);
            relY = minMid + Math.random() * Math.max(0.04, maxMid - minMid);
          }
        } else {
          // Full height visible on side flank cards:
          // Atas (20-30%), Tengah (45-60%), Bawah (70-84%)
          const zone = Math.floor(Math.random() * 3);
          if (zone === 0) {
            relY = 0.20 + Math.random() * 0.10; // Atas
          } else if (zone === 1) {
            relY = 0.45 + Math.random() * 0.15; // Tengah
          } else {
            relY = 0.70 + Math.random() * 0.14; // Bawah
          }
        }

        // Horizontal variation: Kiri (24-35%), Tengah (45-55%), Kanan (65-76%)
        const hZone = Math.floor(Math.random() * 3);
        let relX: number;
        if (hZone === 0) {
          relX = 0.24 + Math.random() * 0.11; // Kiri
        } else if (hZone === 1) {
          relX = 0.45 + Math.random() * 0.10; // Tengah
        } else {
          relX = 0.65 + Math.random() * 0.11; // Kanan
        }

        // 3. Smooth flight towards moving target card (~450–650 ms)
        const flightDuration = Math.floor(450 + Math.random() * 180);
        const startX = currentPos.x;
        const startY = currentPos.y;
        const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

        await new Promise<void>((resolve) => {
          const startTime = performance.now();

          const step = (now: number) => {
            if (
              !isMountedRef.current ||
              !parentEl ||
              !isDocumentVisibleRef.current ||
              isUserInteractingRef.current
            ) {
              resolve();
              return;
            }

            const elapsed = now - startTime;
            const progress = Math.min(elapsed / flightDuration, 1);
            const ease = easeOutQuart(progress);

            // Re-calculate target card rect in real time as carousel rotates
            const tRect = targetCard.element.getBoundingClientRect();
            const pRect = parentEl.getBoundingClientRect();

            // Check if card moved offscreen during flight
            if (tRect.right < pRect.left + 25 || tRect.left > pRect.right - 25) {
              resolve();
              return;
            }

            const liveTargetX = tRect.left - pRect.left + tRect.width * relX;
            const liveTargetY = tRect.top - pRect.top + tRect.height * relY;

            const curX = startX + (liveTargetX - startX) * ease;
            const curY = startY + (liveTargetY - startY) * ease;

            const dx = liveTargetX - curX;
            const dy = liveTargetY - curY;
            let currentAngle = currentAngleRef.current;

            if (Math.hypot(dx, dy) > 8) {
              const targetAngle = (Math.atan2(dy, dx) * 180) / Math.PI;
              const normalizedTarget = (targetAngle + 360) % 360;
              const angleDiff = normalizeAngleDiff(currentAngleRef.current, normalizedTarget);
              currentAngle = currentAngleRef.current + angleDiff * Math.min(1, ease * 1.5);
            } else {
              const angleDiff = normalizeAngleDiff(currentAngleRef.current, 315);
              currentAngle = currentAngleRef.current + angleDiff * 0.2;
            }

            currentAngleRef.current = currentAngle;
            currentPos = { x: curX, y: curY };

            setPosition({ x: curX, y: curY });
            setPointerAngle(currentAngle);
            setBadgeOffset(computeBadgeOffset(currentAngle, window.innerWidth < 640));

            if (progress < 1) {
              animFrameRef.current = requestAnimationFrame(step);
            } else {
              resolve();
            }
          };

          animFrameRef.current = requestAnimationFrame(step);
        });

        if (!isMountedRef.current || isUserInteractingRef.current) break;

        // 4. CURSOR ARRIVED! Trigger Visual Hover on Selected Banner (Requirements 4 & 6)
        onHoverBannerRef.current?.(targetCard.index);

        // Pointing angle settled onto card (315° = natural pointing arrow)
        currentAngleRef.current = 315;
        setPointerAngle(315);
        setBadgeOffset(computeBadgeOffset(315, window.innerWidth < 640));

        // 5. Hold hover state for EXACTLY 2 seconds (2000 ms) while following the rotating card
        const hoverHoldDuration = 2000;
        const holdStart = performance.now();

        await new Promise<void>((resolve) => {
          const holdStep = (now: number) => {
            if (
              !isMountedRef.current ||
              !parentEl ||
              !isDocumentVisibleRef.current ||
              isUserInteractingRef.current
            ) {
              resolve();
              return;
            }

            const elapsed = now - holdStart;
            const tRect = targetCard.element.getBoundingClientRect();
            const pRect = parentEl.getBoundingClientRect();

            // Cursor dynamically follows the moving banner card in real time
            const liveX = tRect.left - pRect.left + tRect.width * relX;
            const liveY = tRect.top - pRect.top + tRect.height * relY;

            currentPos = { x: liveX, y: liveY };
            setPosition({ x: liveX, y: liveY });

            if (elapsed < hoverHoldDuration) {
              animFrameRef.current = requestAnimationFrame(holdStep);
            } else {
              resolve();
            }
          };

          animFrameRef.current = requestAnimationFrame(holdStep);
        });

        if (!isMountedRef.current || isUserInteractingRef.current) break;

        // 6. 2.0 seconds complete! Release visual hover smoothly
        onHoverBannerRef.current?.(null);

        // Brief natural inter-interaction pause before smoothly traveling to the next banner
        await delay(120);
      }
    };

    runLoop();

    return () => {
      isMountedRef.current = false;
      clearAllTimers();
      if (!isUserInteractingRef.current) {
        onHoverBannerRef.current?.(null);
      }
    };
  }, [containerRef, isInView, isUserInteracting, clearAllTimers, delay]);

  if (!isInView || isUserInteracting) return null;

  return (
    <BikinCursorVisual
      position={position}
      pointerAngle={pointerAngle}
      badgeOffset={badgeOffset}
      isClicking={false}
      isVisible={isVisible}
      ripples={[]}
      colorScheme={colorScheme}
      arrowFill={arrowFill}
      arrowStroke={arrowStroke}
      badgeBg={badgeBg}
      badgeText={badgeText}
      badgeBorder={badgeBorder}
    />
  );
};

/**
 * Universal BikinCursorAnimation Component:
 * - When targetRef or containerRef without mode="carousel" is passed: runs headline text sequence (HeroSection)
 * - When mode="carousel" or carouselContainerRef is passed: runs random carousel banner hover sequence (InteractiveDemoSection)
 */
export const BikinCursorAnimation: React.FC<BikinCursorAnimationProps> = (props) => {
  if (props.mode === 'carousel' || props.carouselContainerRef) {
    return (
      <BikinCarouselCursorController
        containerRef={props.carouselContainerRef || (props.containerRef as any)}
        onHoverBanner={props.onHoverBanner}
        isUserInteracting={props.isUserInteracting}
        colorScheme={props.colorScheme || 'primary'}
        arrowFill={props.arrowFill}
        arrowStroke={props.arrowStroke}
        badgeBg={props.badgeBg}
        badgeText={props.badgeText}
        badgeBorder={props.badgeBorder}
      />
    );
  }

  return (
    <BikinHeadlineCursorController
      containerRef={props.containerRef!}
      targetRef={props.targetRef!}
      onClickStepChange={props.onClickStepChange}
      colorScheme={props.colorScheme || 'purple'}
      arrowFill={props.arrowFill}
      arrowStroke={props.arrowStroke}
      badgeBg={props.badgeBg}
      badgeText={props.badgeText}
      badgeBorder={props.badgeBorder}
    />
  );
};
