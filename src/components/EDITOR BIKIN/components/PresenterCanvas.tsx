import React from 'react';

interface PresenterCanvasProps {
  isPlaying: boolean;
  showSubtitles?: boolean;
}

export const PresenterCanvas: React.FC<PresenterCanvasProps> = ({
  isPlaying,
  showSubtitles = true,
}) => {
  return (
    <div className="relative w-full h-full bg-[#070810] flex items-center justify-center overflow-hidden select-none">
      {/* 16:9 Aspect Video Container */}
      <div className="relative w-full max-w-[760px] aspect-video bg-[#0C0E1A] rounded-xl overflow-hidden shadow-2xl border border-white/[0.08]">
        {/* SVG Presenter Scene Matching Screenshot */}
        <svg viewBox="0 0 800 450" className="w-full h-full object-cover">
          <defs>
            <linearGradient id="wallGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E1916" />
              <stop offset="40%" stopColor="#2A221C" />
              <stop offset="100%" stopColor="#141210" />
            </linearGradient>

            <linearGradient id="warmLight" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#B45309" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="skinTone" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F3BFA0" />
              <stop offset="100%" stopColor="#D99B77" />
            </linearGradient>

            <linearGradient id="shirtDark" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1C202E" />
              <stop offset="100%" stopColor="#0F111A" />
            </linearGradient>
          </defs>

          {/* Studio Back Wall */}
          <rect width="800" height="450" fill="url(#wallGradient)" />

          {/* Ambient Warm Shelf Glow on Left */}
          <rect x="80" y="90" width="12" height="260" rx="3" fill="#3D2E24" />
          <rect x="92" y="140" width="40" height="8" rx="2" fill="#4A3B2F" />
          <circle cx="110" cy="130" r="18" fill="url(#warmLight)" />
          <circle cx="110" cy="130" r="5" fill="#FDE68A" />

          {/* Ambient Warm Glow on Right */}
          <circle cx="680" cy="150" r="120" fill="url(#warmLight)" opacity="0.3" />

          {/* Desk Surface */}
          <rect x="0" y="360" width="800" height="90" fill="#181512" />
          <line x1="0" y1="360" x2="800" y2="360" stroke="#3D2E24" strokeWidth="2" />

          {/* Right Desk Setup: Modern Lamp & Book */}
          {/* Desk Lamp */}
          <g transform="translate(580, 240)">
            <ellipse cx="20" cy="90" rx="24" ry="8" fill="#111827" />
            <path d="M20,90 Q40,40 10,10" stroke="#1F2937" strokeWidth="6" fill="none" strokeLinecap="round" />
            <path d="M5,15 L-20,30 L0,45 Z" fill="#111827" />
            {/* Lamp Bulb Glow */}
            <circle cx="-10" cy="30" r="12" fill="#FEF08A" opacity="0.7" />
          </g>

          {/* "Livin" Studio Book on Desk */}
          <g transform="translate(620, 290)">
            <rect x="0" y="0" width="70" height="55" rx="5" fill="#0284C7" stroke="#38BDF8" strokeWidth="1.5" />
            <text x="35" y="32" fill="#FFFFFF" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
              livin'
            </text>
            <circle cx="56" cy="18" r="3" fill="#FACC15" />
          </g>

          {/* Presenter (Speaker with Glasses & Black Shirt) */}
          <g transform="translate(420, 160)">
            {/* Torso / Black Studio Shirt */}
            <path
              d="M-120,240 C-120,130 -50,110 0,110 C50,110 120,130 120,240 Z"
              fill="url(#shirtDark)"
            />
            {/* Collar & Buttons */}
            <path d="M-30,115 L0,150 L30,115" stroke="#283046" strokeWidth="3" fill="none" />
            <line x1="0" y1="150" x2="0" y2="240" stroke="#283046" strokeWidth="2" strokeDasharray="4 8" />

            {/* Neck */}
            <rect x="-24" y="60" width="48" height="60" rx="10" fill="url(#skinTone)" />

            {/* Head */}
            <ellipse cx="0" cy="35" rx="42" ry="52" fill="url(#skinTone)" />
            {/* Ears */}
            <ellipse cx="-43" cy="35" rx="8" ry="14" fill="url(#skinTone)" />
            <ellipse cx="43" cy="35" rx="8" ry="14" fill="url(#skinTone)" />

            {/* Receding Hairline / Modern Cut */}
            <path
              d="M-42,25 C-42,-15 -25,-25 0,-25 C25,-25 42,-15 42,25 C36,20 20,5 0,8 C-20,5 -36,20 -42,25 Z"
              fill="#18181B"
            />

            {/* Eyebrows */}
            <path d="M-28,18 Q-16,13 -4,17" stroke="#27272A" strokeWidth="3" strokeLinecap="round" />
            <path d="M4,17 Q16,13 28,18" stroke="#27272A" strokeWidth="3" strokeLinecap="round" />

            {/* Eyes */}
            <circle cx="-16" cy="28" r="4.5" fill="#18181B" />
            <circle cx="-15" cy="26" r="1.5" fill="#FFFFFF" />
            <circle cx="16" cy="28" r="4.5" fill="#18181B" />
            <circle cx="17" cy="26" r="1.5" fill="#FFFFFF" />

            {/* Rectangular Glasses (Matching Screenshot) */}
            <rect x="-32" y="18" width="30" height="20" rx="5" stroke="#1F2937" strokeWidth="2.5" fill="none" opacity="0.9" />
            <rect x="2" y="18" width="30" height="20" rx="5" stroke="#1F2937" strokeWidth="2.5" fill="none" opacity="0.9" />
            <line x1="-2" y1="26" x2="2" y2="26" stroke="#1F2937" strokeWidth="2.5" />
            <line x1="-32" y1="23" x2="-42" y2="23" stroke="#1F2937" strokeWidth="2" />
            <line x1="32" y1="23" x2="42" y2="23" stroke="#1F2937" strokeWidth="2" />

            {/* Nose */}
            <path d="M0,25 L-2,46 L4,46" stroke="#B87D56" strokeWidth="2" fill="none" strokeLinecap="round" />

            {/* Speaking Mouth */}
            <path
              d="M-12,62 Q0,74 12,62 Q0,66 -12,62 Z"
              fill="#7F1D1D"
              stroke="#991B1B"
              strokeWidth="1.5"
            />

            {/* Gesture Hand (Explaining Concept) */}
            <g transform="translate(-100, 160)">
              <ellipse cx="25" cy="30" rx="14" ry="10" fill="url(#skinTone)" />
              <path d="M12,28 Q20,12 35,16 Q40,24 35,32" stroke="url(#skinTone)" strokeWidth="6" fill="none" strokeLinecap="round" />
            </g>
          </g>
        </svg>

        {/* Top-Left Badge: "3 layers" */}
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/10 flex items-center gap-1.5 text-[10px] text-[#C4B5FD] font-medium z-20">
          <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" />
            <path d="M2 17L12 22L22 17" />
            <path d="M2 12L12 17L22 12" />
          </svg>
          <span>3 layers</span>
        </div>

        {/* Subtitles Overlay at Bottom Center: "and then to the customer." */}
        {showSubtitles && (
          <div className="absolute bottom-6 left-0 right-0 flex justify-center pointer-events-none z-20">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-black/80 backdrop-blur-sm border border-black/40 text-sm font-extrabold tracking-wide drop-shadow-md">
              <span className="text-[#FACC15]">and then</span>
              <span className="text-white">to the customer.</span>
            </div>
          </div>
        )}

        {/* Bottom-Right Watermark: "Video" */}
        <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/60 border border-white/10 flex items-center gap-1 text-[10px] text-white/80 font-mono z-20">
          <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 fill-current">
            <path d="M8 5v14l11-7z" />
          </svg>
          <span>Video</span>
        </div>
      </div>
    </div>
  );
};
