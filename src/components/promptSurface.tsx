import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Loader2 } from 'lucide-react';

/**
 * The Bikin Video prompt box's visual identity (Homepage hero, Bikin Shorts):
 * one surface, one glow, one action button, so every prompt box reads the same.
 */
export const PROMPT_SURFACE_CLASS =
  'backdrop-blur-2xl bg-gradient-to-br from-[#181333]/95 via-[#11142e]/95 to-[#14183d]/95 border border-purple-500/30 hover:border-purple-400/50 focus-within:border-indigo-400/70 shadow-[0_20px_50px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.18)]';

export const PROMPT_SPRING = { type: 'spring' as const, stiffness: 420, damping: 32, mass: 0.8 };

/** Ambient glass glow orbs inside the surface. */
export const PromptAmbientOrbs: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[inherit]">
    <div className="absolute -top-16 -left-16 w-44 h-44 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
    <div className="absolute -bottom-16 -right-16 w-44 h-44 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
  </div>
);

/** The round action button: waveform when idle, arrow when there is something to send. */
export const PromptSendButton: React.FC<{
  active: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  title: string;
  busy?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
}> = ({ active, onClick, title, busy = false, disabled = false, ariaLabel }) => (
  <motion.button
    type="button"
    onClick={onClick}
    disabled={disabled}
    aria-label={ariaLabel ?? title}
    whileHover={disabled ? undefined : { scale: 1.05 }}
    whileTap={disabled ? undefined : { scale: 0.95 }}
    className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer shrink-0 transition-all duration-200 disabled:cursor-not-allowed shadow-[0_2px_8px_rgba(0,0,0,0.4)] ${active
        ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white'
        : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 text-white'
      }`}
    title={title}
  >
    {busy ? (
      <Loader2 className="w-3.5 h-3.5 animate-spin" />
    ) : active ? (
      <ArrowRight className="w-3.5 h-3.5" />
    ) : (
      /* Waveform 4 bars */
      <div className="flex items-center gap-[2.5px] h-3.5">
        <span className="w-[2px] bg-white rounded-full h-2" />
        <span className="w-[2px] bg-white rounded-full h-3.5" />
        <span className="w-[2px] bg-white rounded-full h-2.5" />
        <span className="w-[2px] bg-white rounded-full h-1.5" />
      </div>
    )}
  </motion.button>
);
