import React from 'react';

interface CreatorVideoCanvasProps {
  className?: string;
  isAfter?: boolean;
  isPlaying?: boolean;
  zoomLevel?: 'normal' | 'punch-in';
  showCaptions?: boolean;
  showBrollOverlay?: boolean;
  compact?: boolean;
}

export const CreatorVideoCanvas: React.FC<CreatorVideoCanvasProps> = ({
  className = '',
  isAfter = true,
  isPlaying = false,
  zoomLevel = 'normal',
  showCaptions = true,
  showBrollOverlay = false,
  compact = false,
}) => {
  const isZoomed = isAfter && zoomLevel === 'punch-in';

  return (
    <div className={`relative w-full h-full bg-[#070913] overflow-hidden select-none ${className}`}>
      {/* Studio Background & Creator Artwork */}
      <svg
        viewBox="0 0 800 450"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-full object-cover transition-transform duration-500 ${
          isZoomed ? 'scale-110' : 'scale-100'
        }`}
      >
        <defs>
          {/* Studio Room Gradient */}
          <linearGradient id="studioWall" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0B0E1A" />
            <stop offset="40%" stopColor="#12172B" />
            <stop offset="100%" stopColor="#090C16" />
          </linearGradient>

          {/* Warm Ambient Accent Lamp */}
          <radialGradient id="warmLight" cx="80%" cy="30%" r="50%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.35" />
            <stop offset="60%" stopColor="#D97706" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>

          {/* Cool Studio Keylight */}
          <radialGradient id="coolKeyLight" cx="20%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#818CF8" stopOpacity="0.25" />
            <stop offset="70%" stopColor="#4F46E5" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>

          {/* Skin tones */}
          <linearGradient id="creatorSkin" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FBD5B5" />
            <stop offset="60%" stopColor="#E0AC82" />
            <stop offset="100%" stopColor="#C4885E" />
          </linearGradient>

          {/* Microphone metallic gradient */}
          <linearGradient id="micMetal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#374151" />
            <stop offset="50%" stopColor="#1F2937" />
            <stop offset="100%" stopColor="#111827" />
          </linearGradient>
        </defs>

        {/* Room Background */}
        <rect width="800" height="450" fill="url(#studioWall)" />
        <rect width="800" height="450" fill="url(#warmLight)" />
        <rect width="800" height="450" fill="url(#coolKeyLight)" />

        {/* Background Studio Shelf with awards & plant */}
        <g opacity="0.6">
          <rect x="110" y="140" width="160" height="8" rx="2" fill="#1E2438" />
          {/* YouTube Silver/Gold Creator Playbutton Plaques */}
          <rect x="130" y="90" width="35" height="48" rx="4" fill="#333A52" stroke="#D97706" strokeWidth="1.5" />
          <polygon points="144,110 144,118 152,114" fill="#D97706" />
          
          <rect x="175" y="96" width="32" height="42" rx="4" fill="#333A52" stroke="#94A3B8" strokeWidth="1.5" />
          <polygon points="188,114 188,120 195,117" fill="#94A3B8" />

          {/* Plant */}
          <ellipse cx="235" cy="130" rx="14" ry="10" fill="#10B981" opacity="0.8" />
          <ellipse cx="245" cy="124" rx="12" ry="8" fill="#059669" opacity="0.8" />
        </g>

        {/* Studio Window / Ambient Glow Right */}
        <rect x="680" y="80" width="90" height="260" rx="6" fill="#151A2E" opacity="0.5" />
        <line x1="725" y1="80" x2="725" y2="340" stroke="#252D4A" strokeWidth="3" />
        <line x1="680" y1="210" x2="770" y2="210" stroke="#252D4A" strokeWidth="3" />

        {/* ================= CREATOR (Indonesian podcaster matching screenshot 4) ================= */}
        <g id="creator-character">
          {/* Torso / Black Studio Tee */}
          <path
            d="M260,450 C260,330 330,300 400,300 C470,300 540,330 540,450 Z"
            fill="#0F111A"
          />
          {/* T-Shirt Collar line */}
          <path d="M370,305 Q400,325 430,305" stroke="#1F2438" strokeWidth="3" fill="none" />

          {/* Neck */}
          <rect x="375" y="240" width="50" height="70" rx="12" fill="url(#creatorSkin)" />

          {/* Head & Hair */}
          {/* Ears */}
          <ellipse cx="332" cy="195" rx="10" ry="16" fill="url(#creatorSkin)" />
          <ellipse cx="468" cy="195" rx="10" ry="16" fill="url(#creatorSkin)" />

          {/* Face */}
          <path
            d="M340,160 Q400,140 460,160 Q465,220 440,260 Q400,285 360,260 Q335,220 340,160 Z"
            fill="url(#creatorSkin)"
          />

          {/* Hair (modern side-part clean crop) */}
          <path
            d="M330,160 C325,110 380,85 410,85 C450,85 475,105 475,150 C465,145 450,140 435,140 C410,140 370,145 330,160 Z"
            fill="#0A0B0E"
          />

          {/* Eyebrows */}
          <path d="M360,165 Q375,158 390,163" stroke="#1F232D" strokeWidth="3" strokeLinecap="round" />
          <path d="M410,163 Q425,158 440,165" stroke="#1F232D" strokeWidth="3" strokeLinecap="round" />

          {/* Eyes behind glasses */}
          <ellipse cx="375" cy="178" rx="6" ry="4.5" fill="#111827" />
          <circle cx="377" cy="176" r="1.5" fill="#FFFFFF" />
          <ellipse cx="425" cy="178" rx="6" ry="4.5" fill="#111827" />
          <circle cx="427" cy="176" r="1.5" fill="#FFFFFF" />

          {/* Designer Round/Square Wireframe Glasses */}
          <rect x="355" y="166" width="38" height="28" rx="8" stroke="#374151" strokeWidth="2.5" fill="none" opacity="0.9" />
          <rect x="407" y="166" width="38" height="28" rx="8" stroke="#374151" strokeWidth="2.5" fill="none" opacity="0.9" />
          <line x1="393" y1="178" x2="407" y2="178" stroke="#374151" strokeWidth="2.5" />
          <line x1="334" y1="174" x2="355" y2="174" stroke="#374151" strokeWidth="2" />
          <line x1="445" y1="174" x2="466" y2="174" stroke="#374151" strokeWidth="2" />

          {/* Nose */}
          <path d="M400,175 Q404,198 396,204 Q402,206 408,202" stroke="#B87D56" strokeWidth="2" fill="none" strokeLinecap="round" />

          {/* Mouth (speaking expressively into mic) */}
          <path
            d="M385,225 Q400,240 415,225 Q400,222 385,225 Z"
            fill="#7F1D1D"
            stroke="#991B1B"
            strokeWidth="1.5"
          />

          {/* Expressive Gesturing Hand (left side of frame, explaining concept) */}
          <g transform="translate(300, 260)">
            <path
              d="M0,70 Q-15,40 -10,15 Q-5,0 10,10 Q20,20 15,40 Q30,25 38,35 Q40,48 20,60 Q32,55 35,65 Q30,75 18,80 L0,95 Z"
              fill="url(#creatorSkin)"
            />
          </g>
        </g>

        {/* ================= SHURE SM7B BROADCAST MICROPHONE & BOOM ARM ================= */}
        <g id="microphone-setup">
          {/* Boom Arm stand extending from right */}
          <line x1="590" y1="360" x2="475" y2="245" stroke="#1F2937" strokeWidth="8" strokeLinecap="round" />
          <line x1="475" y1="245" x2="455" y2="225" stroke="#111827" strokeWidth="6" strokeLinecap="round" />
          <circle cx="475" cy="245" r="7" fill="#374151" />

          {/* Shockmount bracket */}
          <rect x="440" y="215" width="8" height="40" rx="3" fill="#4B5563" transform="rotate(30 440 215)" />

          {/* Mic Capsule Body */}
          <rect x="420" y="200" width="34" height="65" rx="8" fill="url(#micMetal)" stroke="#111827" strokeWidth="2" transform="rotate(-30 420 200)" />
          {/* Foam windscreen top */}
          <rect x="408" y="180" width="28" height="35" rx="6" fill="#111827" transform="rotate(-30 408 180)" />
          {/* Shure silver badge band */}
          <rect x="427" y="222" width="28" height="4" fill="#9CA3AF" opacity="0.7" transform="rotate(-30 427 222)" />
        </g>
      </svg>

      {/* Realtime Playback Indicator Badge */}
      <div className={`absolute ${compact ? 'top-2 left-2 px-2 py-0.5 text-[10px]' : 'top-3 left-3 px-2.5 py-1 text-[11px]'} rounded-md bg-black/80 backdrop-blur-md border border-white/10 flex items-center gap-1.5 text-white font-mono z-10`}>
        <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
        <span>{isAfter ? (compact ? 'Director · Active' : 'Bikin Video Director · Active') : 'Raw Input · Uncut'}</span>
      </div>

      {/* Layers Badge (from screenshot 4: '2 layers') */}
      <div className={`absolute ${compact ? 'top-2 right-2 px-2 py-0.5 text-[9px]' : 'top-3 right-3 px-2 py-1 text-[10px]'} rounded-md bg-black/75 backdrop-blur-md border border-white/10 flex items-center gap-1 text-[#C4B5FD] font-medium z-10`}>
        <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 fill-current">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" />
          <path d="M2 17L12 22L22 17" />
          <path d="M2 12L12 17L22 12" />
        </svg>
        <span>{isAfter ? (compact ? '3 tracks' : '3 tracks · B-roll active') : '1 track · Raw'}</span>
      </div>

      {/* B-Roll Picture-in-Picture / Split Overlay when showBrollOverlay is true */}
      {isAfter && showBrollOverlay && (
        <div className={`absolute ${compact ? "top-8 right-2.5 w-32 sm:w-36 h-20 sm:h-22 rounded-lg" : "top-12 right-4 w-44 sm:w-56 h-28 sm:h-36 rounded-xl"} overflow-hidden border border-purple-500/50 shadow-2xl bg-black/90 animate-in fade-in zoom-in-95 duration-300`}>
          <div className="relative w-full h-full bg-gradient-to-tr from-purple-900/60 to-pink-900/40 p-2.5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-[9px] text-purple-200 font-mono">
              <span className="px-1.5 py-0.5 rounded bg-purple-950/80 border border-purple-400/30">
                B-ROLL OVERLAY
              </span>
              <span>track-v2</span>
            </div>
            {/* Visual simulation of high-tech AI flow diagram */}
            <div className="flex items-center justify-center gap-2 my-auto">
              <div className="w-8 h-8 rounded-lg bg-purple-500/30 border border-purple-400 flex items-center justify-center text-[10px] font-bold text-white">
                RAW
              </div>
              <div className="w-6 h-[2px] bg-purple-400" />
              <div className="w-10 h-10 rounded-lg bg-pink-500/40 border border-pink-400 flex items-center justify-center text-[10px] font-bold text-white shadow-lg">
                AI CUT
              </div>
            </div>
            <span className="text-[10px] font-semibold text-white/90 truncate">
              Autonomous Timeline Reasoning
            </span>
          </div>
        </div>
      )}

      {/* Kinetic Animated Captions Overlay (from Bikin Video subtitle engine) */}
      {isAfter && showCaptions && (
        <div className={`absolute ${compact ? 'bottom-2 left-2 right-2' : 'bottom-10 left-4 right-4'} text-center pointer-events-none`}>
          <div className={`inline-flex items-center gap-1.5 ${compact ? 'px-2.5 py-1 rounded-md text-[10.5px]' : 'px-3.5 py-1.5 rounded-lg text-xs sm:text-sm'} bg-black/85 border border-purple-500/40 backdrop-blur-md shadow-2xl`}>
            <span className="text-white font-extrabold tracking-wide drop-shadow whitespace-nowrap">
              "...jangan sampai
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-400 font-black underline decoration-purple-400 decoration-2 whitespace-nowrap">
              ketinggalan tren AI
            </span>
            <span className="text-white font-extrabold tracking-wide drop-shadow whitespace-nowrap">
              terbaru!"
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
