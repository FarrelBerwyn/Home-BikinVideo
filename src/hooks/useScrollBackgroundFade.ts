import { useEffect } from 'react';

/**
 * Custom hook to smoothly manage scroll-driven background opacity.
 * - Computes normalized scroll progress: 0 at top, 1 at fadeDistance.
 * - Symmetrically drives opacity: 1 (fully visible) down to 0 (fully transparent).
 * - Updates the CSS variable `--scroll-bg-opacity` on document.documentElement
 *   for 60fps/120fps GPU compositor rendering with ZERO React re-render overhead.
 * - Fully synchronized in both scroll directions (scroll down & scroll back up).
 * - Respects prefers-reduced-motion.
 */
export function useScrollBackgroundFade(fadeDistance: number = 650) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      document.documentElement.style.setProperty('--scroll-bg-opacity', '1');
      return;
    }

    let rafId: number | null = null;

    const update = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      // Continuous scroll progress: 0 at page top, 1 at fadeDistance
      const progress = Math.min(Math.max(scrollY / fadeDistance, 0), 1);
      // Smooth linear center fade: 1.0 -> 0.0
      const currentOpacity = Math.max(0, Math.min(1, 1 - progress));

      document.documentElement.style.setProperty(
        '--scroll-bg-opacity',
        currentOpacity.toFixed(4)
      );
      rafId = null;
    };

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(update);
    };

    // Initialize immediately on mount
    update();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [fadeDistance]);
}
