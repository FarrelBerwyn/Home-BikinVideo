import { useEffect, useRef, useState } from 'react';

interface UseIntersectionRevealOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useIntersectionReveal(options: UseIntersectionRevealOptions = {}) {
  const { threshold = 0.15, rootMargin = '0px 0px -40px 0px' } = options;
  const ref = useRef<HTMLDivElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    // If user prefers reduced motion, reveal immediately
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsRevealed(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  return { ref, isRevealed };
}
