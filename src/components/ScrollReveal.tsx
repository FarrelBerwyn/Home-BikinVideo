import React from 'react';
import { useIntersectionReveal } from '../hooks/useIntersectionReveal';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // ms
  threshold?: number;
  direction?: 'up' | 'none';
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  threshold = 0.15,
  direction = 'up',
}) => {
  const { ref, isRevealed } = useIntersectionReveal({ threshold });

  const style: React.CSSProperties = {
    transitionProperty: 'opacity, transform',
    transitionDuration: '700ms',
    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    transitionDelay: `${delay}ms`,
  };

  const transformStyle = direction === 'up'
    ? isRevealed ? 'translateY(0)' : 'translateY(28px)'
    : 'none';

  return (
    <div
      ref={ref}
      style={{
        ...style,
        opacity: isRevealed ? 1 : 0,
        transform: transformStyle,
      }}
      className={className}
    >
      {children}
    </div>
  );
};
