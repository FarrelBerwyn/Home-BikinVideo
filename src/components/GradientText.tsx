import React from 'react';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

export const GradientText: React.FC<GradientTextProps> = ({
  children,
  className = '',
  glow = false,
}) => {
  return (
    <span
      className={`animated-gradient-text inline-block font-bold tracking-tight ${className}`}
    >
      {children}
    </span>
  );
};
