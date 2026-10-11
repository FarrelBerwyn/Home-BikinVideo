import React, { useMemo } from 'react';

interface Star {
  id: number;
  top: number;
  left: number;
  size: number;
  opacity: number;
  delay: number;
  duration: number;
  isSparkle: boolean;
}

export const AmbientBackground: React.FC = () => {
  // Deterministic star field generation
  const stars = useMemo<Star[]>(() => {
    const list: Star[] = [];
    const count = 52;
    for (let i = 0; i < count; i++) {
      // Deterministic pseudorandom values based on index
      const seed1 = Math.sin(i * 997.13) * 10000;
      const seed2 = Math.cos(i * 433.79) * 10000;
      const seed3 = Math.sin(i * 123.45) * 10000;
      
      const top = Math.abs(seed1 - Math.floor(seed1)) * 100;
      const left = Math.abs(seed2 - Math.floor(seed2)) * 100;
      const isSparkle = i % 7 === 0;
      const size = isSparkle ? 3.5 : (i % 3 === 0 ? 2 : 1.2);
      const opacity = 0.25 + (Math.abs(seed3 - Math.floor(seed3)) * 0.55);
      const delay = (i % 10) * 0.7;
      const duration = 3.5 + (i % 5) * 1.1;

      list.push({
        id: i,
        top,
        left,
        size,
        opacity,
        delay,
        duration,
        isSparkle,
      });
    }
    return list;
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden select-none z-0"
      aria-hidden="true"
    >
      {/* Layer 1: Base dark background is provided by html/body #080914 */}

      {/* Layer 2: Symmetrical Center-Balanced Purple Ambient Glow for Hero */}
      <div
        className="absolute -top-36 left-1/2 -translate-x-1/2 w-[1200px] max-w-[100vw] h-[750px] rounded-full blur-[130px] pointer-events-none will-change-[opacity]"
        style={{
          opacity: 'var(--scroll-bg-opacity, 1)',
          background:
            'radial-gradient(ellipse at 50% 35%, rgba(168, 85, 247, 0.38) 0%, rgba(139, 53, 232, 0.28) 35%, rgba(217, 70, 239, 0.14) 60%, transparent 75%)',
        }}
      />

      {/* Layer 4: Lower page magenta-purple ambient glow for bottom sections */}
      <div
        className="absolute bottom-40 left-1/2 -translate-x-1/2 w-[850px] h-[550px] rounded-full blur-[130px] opacity-40 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(168, 85, 247, 0.3) 0%, rgba(217, 70, 239, 0.18) 45%, transparent 75%)',
        }}
      />

      {/* Layer 5: Decorative starfield with subtle pulsing and 4-point sparkles */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute transition-opacity"
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animation: `star-twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
            }}
          >
            {star.isSparkle ? (
              // 4-point sparkle icon
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-3.5 h-3.5 -translate-x-1/2 -translate-y-1/2 text-purple-200/80 drop-shadow-[0_0_6px_rgba(168,85,247,0.7)]"
                style={{
                  animation: `star-rotate ${star.duration * 4}s linear infinite`,
                }}
              >
                <path
                  d="M12 2L14.2 9.8L22 12L14.2 14.2L12 22L9.8 14.2L2 12L9.8 9.8L12 2Z"
                  fill="currentColor"
                />
              </svg>
            ) : (
              // Tiny dot star
              <div
                className="w-full h-full rounded-full bg-purple-100/70 shadow-[0_0_4px_rgba(192,132,252,0.6)]"
                style={{ opacity: star.opacity }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
