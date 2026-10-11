import React from 'react';

interface SectionLabelProps {
  label: string;
  className?: string;
}

export const SectionLabel: React.FC<SectionLabelProps> = ({ label, className = '' }) => {
  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#131626]/80 border border-[#a082dc]/20 text-[12px] sm:text-[13px] font-medium text-[#c4b5fd] tracking-wide backdrop-blur-md shadow-[0_2px_12px_rgba(139,53,232,0.12)]">
        <span className="opacity-50 select-none">-</span>
        <span>{label}</span>
        <span className="opacity-50 select-none">-</span>
      </div>
    </div>
  );
};
