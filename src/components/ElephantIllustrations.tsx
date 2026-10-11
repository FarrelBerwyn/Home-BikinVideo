import React from 'react';

// Tile 1: Playful elephant calf skating on snow in vibrant patchwork hoodie & oversized sunglasses
export const SkatingElephantSvg: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 500 500"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-full h-full object-cover select-none ${className}`}
  >
    <defs>
      {/* Sky & Mountain gradients */}
      <linearGradient id="skyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4A7596" />
        <stop offset="50%" stopColor="#82A6C2" />
        <stop offset="100%" stopColor="#D8E8F5" />
      </linearGradient>
      <linearGradient id="mountainGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#F8FAFC" />
        <stop offset="40%" stopColor="#CBD5E1" />
        <stop offset="100%" stopColor="#64748B" />
      </linearGradient>
      <linearGradient id="snowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#E2E8F0" />
      </linearGradient>

      {/* Elephant skin gradients */}
      <linearGradient id="skinGrad" x1="20%" y1="0%" x2="80%" y2="100%">
        <stop offset="0%" stopColor="#94A3B8" />
        <stop offset="50%" stopColor="#64748B" />
        <stop offset="100%" stopColor="#475569" />
      </linearGradient>
      <linearGradient id="earInnerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F472B6" />
        <stop offset="100%" stopColor="#DB2777" />
      </linearGradient>

      {/* Patchwork outfit gradients */}
      <linearGradient id="patch1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F97316" />
        <stop offset="100%" stopColor="#EA580C" />
      </linearGradient>
      <linearGradient id="patch2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#06B6D4" />
        <stop offset="100%" stopColor="#0284C7" />
      </linearGradient>
      <linearGradient id="patch3" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#EAB308" />
        <stop offset="100%" stopColor="#CA8A04" />
      </linearGradient>
      <linearGradient id="patch4" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#EC4899" />
        <stop offset="100%" stopColor="#BE185D" />
      </linearGradient>
      <linearGradient id="sunglassLens" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FBBF24" />
        <stop offset="40%" stopColor="#F97316" />
        <stop offset="100%" stopColor="#EF4444" />
      </linearGradient>
      <linearGradient id="bladeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#E2E8F0" />
        <stop offset="50%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#94A3B8" />
      </linearGradient>
    </defs>

    {/* Background Landscape */}
    <rect width="500" height="500" fill="url(#skyGrad)" />
    
    {/* Distant snowy mountains */}
    <polygon points="40,280 140,140 230,280" fill="url(#mountainGrad)" opacity="0.9" />
    <polygon points="120,165 140,140 160,165 140,180" fill="#FFFFFF" />
    
    <polygon points="170,290 280,110 390,290" fill="url(#mountainGrad)" />
    <polygon points="255,145 280,110 305,145 280,160" fill="#FFFFFF" />
    
    <polygon points="310,290 410,160 500,290" fill="url(#mountainGrad)" opacity="0.85" />
    <polygon points="390,185 410,160 430,185 410,200" fill="#FFFFFF" />

    {/* Snowy Ice Foreground */}
    <path d="M0,270 Q160,250 300,270 T500,280 L500,500 L0,500 Z" fill="url(#snowGrad)" />
    
    {/* Ice skate trail swirls */}
    <path
      d="M100,430 Q200,460 300,420 T480,450"
      stroke="#38BDF8"
      strokeWidth="4"
      strokeLinecap="round"
      opacity="0.6"
      strokeDasharray="8 6"
    />
    <path
      d="M80,440 Q180,480 320,440 T460,465"
      stroke="#F472B6"
      strokeWidth="3"
      strokeLinecap="round"
      opacity="0.5"
    />

    {/* ELEPHANT CALF */}
    <g transform="translate(140, 100)">
      {/* Left Ear */}
      <ellipse cx="30" cy="120" rx="48" ry="60" fill="url(#skinGrad)" transform="rotate(-15 30 120)" />
      <ellipse cx="32" cy="120" rx="32" ry="44" fill="url(#earInnerGrad)" opacity="0.75" transform="rotate(-15 32 120)" />

      {/* Right Ear */}
      <ellipse cx="190" cy="120" rx="48" ry="60" fill="url(#skinGrad)" transform="rotate(15 190 120)" />
      <ellipse cx="188" cy="120" rx="32" ry="44" fill="url(#earInnerGrad)" opacity="0.75" transform="rotate(15 188 120)" />

      {/* Head */}
      <ellipse cx="110" cy="115" rx="65" ry="60" fill="url(#skinGrad)" />

      {/* Cute Tuft of hair */}
      <path d="M105,55 Q110,40 115,55 Q120,42 122,58" stroke="#475569" strokeWidth="4" strokeLinecap="round" />

      {/* Trunk (curling up playfully) */}
      <path
        d="M110,135 Q105,175 95,200 Q88,215 105,215 Q120,215 115,190 Q122,165 125,135"
        fill="url(#skinGrad)"
      />

      {/* Big Cheerful Smile under trunk */}
      <path d="M85,160 Q110,175 135,160" stroke="#334155" strokeWidth="3" fill="none" strokeLinecap="round" />
      <ellipse cx="80" cy="150" rx="8" ry="5" fill="#F472B6" opacity="0.7" />
      <ellipse cx="140" cy="150" rx="8" ry="5" fill="#F472B6" opacity="0.7" />

      {/* Oversized Cool Sunglasses */}
      {/* Left Lens Frame */}
      <rect x="52" y="85" width="50" height="42" rx="14" fill="#F59E0B" stroke="#B45309" strokeWidth="4" />
      <rect x="56" y="89" width="42" height="34" rx="10" fill="url(#sunglassLens)" />
      <ellipse cx="70" cy="98" rx="8" ry="4" fill="#FFFFFF" opacity="0.6" transform="rotate(-20 70 98)" />

      {/* Bridge */}
      <path d="M102,102 Q110,96 118,102" stroke="#B45309" strokeWidth="5" strokeLinecap="round" fill="none" />

      {/* Right Lens Frame */}
      <rect x="118" y="85" width="50" height="42" rx="14" fill="#F59E0B" stroke="#B45309" strokeWidth="4" />
      <rect x="122" y="89" width="42" height="34" rx="10" fill="url(#sunglassLens)" />
      <ellipse cx="136" cy="98" rx="8" ry="4" fill="#FFFFFF" opacity="0.6" transform="rotate(-20 136 98)" />

      {/* Body / Vibrant Patchwork Winter Outfit */}
      <g transform="translate(45, 175)">
        {/* Main coat torso */}
        <path d="M15,0 L115,0 L125,95 L5,95 Z" fill="#1E293B" />
        
        {/* Patchwork sections */}
        <polygon points="15,0 65,0 60,45 10,45" fill="url(#patch1)" />
        <polygon points="65,0 115,0 120,45 60,45" fill="url(#patch2)" />
        <polygon points="10,45 60,45 55,95 5,95" fill="url(#patch3)" />
        <polygon points="60,45 120,45 125,95 55,95" fill="url(#patch4)" />

        {/* Patchwork seam stitches */}
        <line x1="60" y1="0" x2="57" y2="95" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="3 3" />
        <line x1="12" y1="45" x2="120" y2="45" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="3 3" />

        {/* Fluffy collar */}
        <path d="M5,0 Q65,-12 125,0 Q65,10 5,0 Z" fill="#F8FAFC" />
        
        {/* Colorful scarf fringe */}
        <path d="M60,10 L50,40 L65,42 L72,10" fill="#10B981" />
      </g>

      {/* Legs & Ice Skates */}
      {/* Left Leg */}
      <rect x="65" y="270" width="28" height="35" rx="8" fill="url(#skinGrad)" />
      {/* Left Skate Boot */}
      <path d="M60,300 L95,300 L98,322 L55,322 Z" fill="#EF4444" />
      {/* Left Blade */}
      <rect x="48" y="322" width="58" height="5" rx="2" fill="url(#bladeGrad)" />
      <path d="M106,322 Q112,315 110,327" stroke="#CBD5E1" strokeWidth="3" fill="none" />

      {/* Right Leg (gliding backwards) */}
      <rect x="125" y="260" width="28" height="40" rx="8" fill="url(#skinGrad)" transform="rotate(-20 125 260)" />
      {/* Right Skate Boot */}
      <g transform="translate(142, 292) rotate(-20)">
        <path d="M0,0 L35,0 L38,22 L-5,22 Z" fill="#8B5CF6" />
        <rect x="-12" y="22" width="58" height="5" rx="2" fill="url(#bladeGrad)" />
        <path d="M46,22 Q52,15 50,27" stroke="#CBD5E1" strokeWidth="3" fill="none" />
      </g>
    </g>

    {/* Sparkle flakes */}
    <circle cx="80" cy="180" r="3" fill="#FFFFFF" opacity="0.8" />
    <circle cx="120" cy="220" r="2" fill="#FFFFFF" opacity="0.9" />
    <circle cx="410" cy="310" r="4" fill="#FFFFFF" opacity="0.9" />
    <circle cx="440" cy="260" r="2.5" fill="#FFFFFF" opacity="0.7" />
    <polygon points="360,380 363,388 371,391 363,394 360,402 357,394 349,391 357,388" fill="#FDE047" opacity="0.85" />
    <polygon points="120,410 122,416 128,418 122,420 120,426 118,420 112,418 118,416" fill="#67E8F9" opacity="0.85" />
  </svg>
);

// Tile 2: Cute baby elephant under starry night sky
export const StarryNightElephantSvg: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 500 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-full h-full object-cover select-none ${className}`}
  >
    <defs>
      <linearGradient id="nightSky" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0B132B" />
        <stop offset="50%" stopColor="#1C2541" />
        <stop offset="100%" stopColor="#3A506B" />
      </linearGradient>
      <linearGradient id="moonGlow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FDF2E9" />
        <stop offset="100%" stopColor="#F9D423" />
      </linearGradient>
      <linearGradient id="babySkin" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#94A3B8" />
        <stop offset="100%" stopColor="#64748B" />
      </linearGradient>
    </defs>

    {/* Night sky background */}
    <rect width="500" height="300" fill="url(#nightSky)" />

    {/* Glowing Crescent Moon */}
    <path
      d="M410,40 A45,45 0 0,0 450,95 A38,38 0 1,1 410,40 Z"
      fill="url(#moonGlow)"
      filter="drop-shadow(0 0 12px rgba(249,212,35,0.7))"
    />

    {/* Stars & Stardust */}
    {[
      [60, 40, 2], [110, 70, 3], [180, 35, 1.5], [230, 80, 2.5],
      [310, 45, 2], [360, 95, 2.5], [40, 120, 1.5], [470, 110, 2]
    ].map(([x, y, r], idx) => (
      <circle key={idx} cx={x} cy={y} r={r} fill="#E2E8F0" opacity={0.8} />
    ))}
    {/* Big Twinkle Star */}
    <polygon points="150,50 153,60 163,63 153,66 150,76 147,66 137,63 147,60" fill="#FDE047" />
    <polygon points="280,30 282,37 289,39 282,41 280,48 278,41 271,39 278,37" fill="#67E8F9" />

    {/* Dark rolling hill foreground */}
    <path d="M0,230 Q250,180 500,220 L500,300 L0,300 Z" fill="#0F172A" />

    {/* Cute Baby Elephant Looking up in wonder */}
    <g transform="translate(190, 110)">
      {/* Ears */}
      <ellipse cx="25" cy="85" rx="35" ry="45" fill="url(#babySkin)" transform="rotate(-10 25 85)" />
      <ellipse cx="25" cy="85" rx="22" ry="32" fill="#F472B6" opacity="0.6" transform="rotate(-10 25 85)" />
      
      <ellipse cx="115" cy="85" rx="35" ry="45" fill="url(#babySkin)" transform="rotate(10 115 85)" />
      <ellipse cx="115" cy="85" rx="22" ry="32" fill="#F472B6" opacity="0.6" transform="rotate(10 115 85)" />

      {/* Head */}
      <circle cx="70" cy="85" r="48" fill="url(#babySkin)" />

      {/* Big Cute Disney/Pixar Eyes looking at moon */}
      <ellipse cx="50" cy="72" rx="12" ry="15" fill="#1E293B" />
      <circle cx="48" cy="67" r="5" fill="#FFFFFF" />
      <circle cx="53" cy="76" r="2.5" fill="#FFFFFF" />

      <ellipse cx="88" cy="72" rx="12" ry="15" fill="#1E293B" />
      <circle cx="86" cy="67" r="5" fill="#FFFFFF" />
      <circle cx="91" cy="76" r="2.5" fill="#FFFFFF" />

      {/* Little trunk raised to the stars */}
      <path
        d="M70,105 Q70,135 60,145 Q50,150 48,135 Q50,120 62,105"
        fill="url(#babySkin)"
      />

      {/* Rosy Cheeks */}
      <ellipse cx="38" cy="98" rx="8" ry="5" fill="#FB7185" opacity="0.65" />
      <ellipse cx="102" cy="98" rx="8" ry="5" fill="#FB7185" opacity="0.65" />
    </g>
  </svg>
);

// Tile 3: Cute baby elephant in water with water lilies
export const WaterLilyElephantSvg: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 500 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-full h-full object-cover select-none ${className}`}
  >
    <defs>
      <linearGradient id="daySky" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#BAE6FD" />
        <stop offset="100%" stopColor="#E0F2FE" />
      </linearGradient>
      <linearGradient id="pondWater" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#38BDF8" />
        <stop offset="50%" stopColor="#0284C7" />
        <stop offset="100%" stopColor="#0369A1" />
      </linearGradient>
      <linearGradient id="lilyGreen" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4ADE80" />
        <stop offset="100%" stopColor="#15803D" />
      </linearGradient>
      <linearGradient id="lotusPink" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F472B6" />
        <stop offset="100%" stopColor="#DB2777" />
      </linearGradient>
    </defs>

    {/* Sky & background foliage */}
    <rect width="500" height="300" fill="url(#daySky)" />
    
    {/* Distant trees */}
    <ellipse cx="60" cy="110" rx="80" ry="50" fill="#22C55E" opacity="0.7" />
    <ellipse cx="180" cy="100" rx="90" ry="60" fill="#16A34A" opacity="0.7" />
    <ellipse cx="360" cy="95" rx="100" ry="65" fill="#15803D" opacity="0.75" />
    <ellipse cx="460" cy="110" rx="70" ry="50" fill="#22C55E" opacity="0.7" />

    {/* Clear Pond Water */}
    <path d="M0,130 C150,115 350,145 500,130 L500,300 L0,300 Z" fill="url(#pondWater)" />

    {/* Gentle water ripples */}
    <ellipse cx="250" cy="180" rx="180" ry="12" stroke="#BAE6FD" strokeWidth="2" opacity="0.5" fill="none" />
    <ellipse cx="250" cy="220" rx="210" ry="14" stroke="#BAE6FD" strokeWidth="2.5" opacity="0.4" fill="none" />

    {/* Cute Baby Elephant Bathing happily */}
    <g transform="translate(190, 80)">
      {/* Big Flapping Ears */}
      <ellipse cx="20" cy="75" rx="35" ry="45" fill="#94A3B8" transform="rotate(-15 20 75)" />
      <ellipse cx="20" cy="75" rx="22" ry="30" fill="#F472B6" opacity="0.6" transform="rotate(-15 20 75)" />
      
      <ellipse cx="100" cy="75" rx="35" ry="45" fill="#94A3B8" transform="rotate(15 100 75)" />
      <ellipse cx="100" cy="75" rx="22" ry="30" fill="#F472B6" opacity="0.6" transform="rotate(15 100 75)" />

      {/* Head */}
      <circle cx="60" cy="75" r="44" fill="#94A3B8" />

      {/* Cute eyes squinting happily */}
      <path d="M42,68 Q50,60 58,68" stroke="#1E293B" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <path d="M72,68 Q80,60 88,68" stroke="#1E293B" strokeWidth="3.5" fill="none" strokeLinecap="round" />

      {/* Rosy cheeks */}
      <ellipse cx="38" cy="82" rx="7" ry="4" fill="#FB7185" opacity="0.8" />
      <ellipse cx="92" cy="82" rx="7" ry="4" fill="#FB7185" opacity="0.8" />

      {/* Trunk splashing a gentle fountain of water */}
      <path
        d="M60,90 Q65,115 50,118 Q40,110 45,95 Q52,88 60,90"
        fill="#94A3B8"
      />

      {/* Water droplets from trunk */}
      <circle cx="36" cy="72" r="3" fill="#E0F2FE" />
      <circle cx="30" cy="58" r="4" fill="#E0F2FE" />
      <circle cx="38" cy="46" r="3" fill="#E0F2FE" />
      <circle cx="48" cy="40" r="2.5" fill="#E0F2FE" />
    </g>

    {/* Lily pads & Lotus flowers */}
    {/* Left Lily Pad */}
    <ellipse cx="80" cy="220" rx="55" ry="22" fill="url(#lilyGreen)" />
    <path d="M80,220 L125,210 L110,235 Z" fill="url(#pondWater)" />
    {/* Left Pink Lotus */}
    <g transform="translate(65, 185)">
      <ellipse cx="15" cy="20" rx="12" ry="20" fill="url(#lotusPink)" transform="rotate(-20 15 20)" />
      <ellipse cx="35" cy="20" rx="12" ry="20" fill="url(#lotusPink)" transform="rotate(20 35 20)" />
      <ellipse cx="25" cy="16" rx="10" ry="22" fill="#F472B6" />
      <circle cx="25" cy="22" r="5" fill="#FACC15" />
    </g>

    {/* Right Lily Pad */}
    <ellipse cx="420" cy="235" rx="60" ry="24" fill="url(#lilyGreen)" />
    <path d="M420,235 L370,228 L380,250 Z" fill="url(#pondWater)" />
    {/* Right Lotus Flower */}
    <g transform="translate(410, 205)">
      <ellipse cx="10" cy="18" rx="10" ry="18" fill="url(#lotusPink)" transform="rotate(-25 10 18)" />
      <ellipse cx="30" cy="18" rx="10" ry="18" fill="url(#lotusPink)" transform="rotate(25 30 18)" />
      <ellipse cx="20" cy="15" rx="8" ry="20" fill="#F472B6" />
      <circle cx="20" cy="20" r="4" fill="#FACC15" />
    </g>
  </svg>
);
