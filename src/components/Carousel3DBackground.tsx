/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Sliders,
  Edit3,
  Plus,
  Trash2,
  Eye,
  TrendingUp,
  Layers,
  Film,
  Scissors,
  Check,
  X,
  Volume2,
  ChevronLeft,
  ChevronRight,
  Maximize2
} from 'lucide-react';

export interface CarouselCardItem {
  id: string;
  title: string;
  category: string;
  creator: string;
  views: string;
  hookScore: number;
  tags: string[];
  duration: string;
  gradient: string;
  accentColor: string;
  directiveApplied: string;
}

export const INITIAL_CAROUSEL_CARDS: CarouselCardItem[] = [
  {
    id: 'card-1',
    title: 'Podcast Clip: Future of Neural Agents',
    category: 'Viral Short',
    creator: '@lex_clips',
    views: '2.4M',
    hookScore: 98,
    tags: ['Hook Cut', 'Kinetic Text', 'Speaker Lock'],
    duration: '00:48',
    gradient: 'from-purple-900/80 via-indigo-950/90 to-black',
    accentColor: '#A855F7',
    directiveApplied: 'Cut 12s silence & punch in 1.15x on AI hook',
  },
  {
    id: 'card-2',
    title: 'SaaS Launch: Zero to 10k ARR in 30 Days',
    category: 'Product Teaser',
    creator: '@techfounder',
    views: '840K',
    hookScore: 94,
    tags: ['Lossless XML', 'Audio Ducking', 'B-Roll'],
    duration: '00:58',
    gradient: 'from-violet-900/80 via-slate-950/90 to-black',
    accentColor: '#8B5CF6',
    directiveApplied: 'Auto-insert UI screen captures on feature mention',
  },
  {
    id: 'card-3',
    title: 'Street Talk: What Would You Do With $1M?',
    category: 'Interviews',
    creator: '@streetculture',
    views: '3.8M',
    hookScore: 99,
    tags: ['Dual Face Tracking', 'Sound FX', 'Subtitles'],
    duration: '00:42',
    gradient: 'from-fuchsia-950/80 via-purple-950/90 to-black',
    accentColor: '#D946EF',
    directiveApplied: 'Split cuts between interviewer and passerby',
  },
  {
    id: 'card-4',
    title: 'High-Energy Fitness Reel: 5am Routine',
    category: 'Reels / TikTok',
    creator: '@coach_marcus',
    views: '1.9M',
    hookScore: 96,
    tags: ['Beat Sync', 'Speed Ramp', 'Visual Glow'],
    duration: '00:35',
    gradient: 'from-purple-950/90 via-black to-slate-950',
    accentColor: '#C084FC',
    directiveApplied: 'Sync cuts to snare hits with dynamic zoom-out',
  },
  {
    id: 'card-5',
    title: 'AI Philosophy: The Human Agency Paradox',
    category: 'YouTube Longform',
    creator: '@deepthoughts',
    views: '920K',
    hookScore: 92,
    tags: ['Editorial Reasoning', 'Citation Card', 'Chapters'],
    duration: '01:14',
    gradient: 'from-indigo-950/80 via-purple-950/90 to-black',
    accentColor: '#818CF8',
    directiveApplied: 'Timeline reasoning log automatically verified cuts',
  },
  {
    id: 'card-6',
    title: 'Speed Cooking: 60s Crispy Wagyu Bowl',
    category: 'Culinary Short',
    creator: '@chef_dan',
    views: '4.6M',
    hookScore: 97,
    tags: ['Sizzle Audio Boost', 'Dynamic Zoom', 'Hook Alert'],
    duration: '00:39',
    gradient: 'from-rose-950/80 via-purple-950/90 to-black',
    accentColor: '#F43F5E',
    directiveApplied: 'Boost sizzling acoustic track by +6dB with ducking',
  },
  {
    id: 'card-7',
    title: 'Crypto Macro Trends: 2026 Liquidity',
    category: 'FinTech',
    creator: '@marketpulse',
    views: '1.1M',
    hookScore: 91,
    tags: ['Chart B-Roll', 'Lower Thirds', 'Multi-Track'],
    duration: '00:52',
    gradient: 'from-purple-950/80 via-neutral-950 to-black',
    accentColor: '#A78BFA',
    directiveApplied: 'Overlay candlestick graph when speaker says inflation',
  },
  {
    id: 'card-8',
    title: 'Indonesian Tech Talk: AI Developer Era',
    category: 'Tech Talk',
    creator: '@bikin_creator',
    views: '2.1M',
    hookScore: 95,
    tags: ['Indonesian Audio', 'Auto Subtitles', 'Track Sync'],
    duration: '00:50',
    gradient: 'from-violet-950/90 via-purple-900/70 to-black',
    accentColor: '#9333EA',
    directiveApplied: 'Transcribe Indonesian audio and highlight keywords',
  },
];

interface Carousel3DBackgroundProps {
  className?: string;
  onSelectCard?: (card: CarouselCardItem) => void;
}

export const Carousel3DBackground: React.FC<Carousel3DBackgroundProps> = ({
  className = '',
  onSelectCard,
}) => {
  const [cards, setCards] = useState<CarouselCardItem[]>(INITIAL_CAROUSEL_CARDS);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [rotationDirection, setRotationDirection] = useState<1 | -1>(1); // 1: clockwise/right, -1: counter-clockwise
  const [ringRadius, setRingRadius] = useState(820); // in px
  const [perspectiveDepth, setPerspectiveDepth] = useState<'standard' | 'wide' | 'intense'>('standard');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('All');

  // Drag interaction state
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartAngleRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());

  // Edit Card modal state
  const [editingCard, setEditingCard] = useState<CarouselCardItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inspectedCard, setInspectedCard] = useState<CarouselCardItem | null>(null);

  // Responsive radius calculation
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setRingRadius(480);
      } else if (w < 1024) {
        setRingRadius(650);
      } else if (w < 1440) {
        setRingRadius(820);
      } else {
        setRingRadius(950);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Smooth rotational loop
  const updateLoop = useCallback((timestamp: number) => {
    const delta = timestamp - lastTimeRef.current;
    lastTimeRef.current = timestamp;

    if (isPlaying && !isDraggingRef.current) {
      // Base rotation rate: ~0.045 deg per ms at 1x
      const degStep = 0.035 * speedMultiplier * rotationDirection * (delta / 16.6);
      setRotationAngle((prev) => (prev + degStep) % 360);
    }

    animFrameRef.current = requestAnimationFrame(updateLoop);
  }, [isPlaying, speedMultiplier, rotationDirection]);

  useEffect(() => {
    animFrameRef.current = requestAnimationFrame(updateLoop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [updateLoop]);

  // Mouse & Touch Drag Handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartAngleRef.current = rotationAngle;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - dragStartXRef.current;
    // Map pixels dragged to degrees
    const angleDelta = (deltaX / 5);
    setRotationAngle((dragStartAngleRef.current + angleDelta) % 360);
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  // Card filter
  const displayedCards = activeCategoryFilter === 'All'
    ? cards
    : cards.filter((c) => c.category.toLowerCase().includes(activeCategoryFilter.toLowerCase()));

  const totalCards = displayedCards.length;
  const anglePerCard = 360 / Math.max(totalCards, 1);

  // Handle Card Edit Save
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCard) return;

    setCards((prev) =>
      prev.map((c) => (c.id === editingCard.id ? editingCard : c))
    );
    setIsModalOpen(false);
    setEditingCard(null);
  };

  // Handle Add New Card
  const handleAddNewCard = () => {
    const newId = `card-${Date.now()}`;
    const newCard: CarouselCardItem = {
      id: newId,
      title: 'New Video Project: High Retention Cut',
      category: 'Viral Short',
      creator: '@your_channel',
      views: '1.5M',
      hookScore: 95,
      tags: ['AI Hook', 'Auto Captions'],
      duration: '00:45',
      gradient: 'from-purple-950/90 via-indigo-950 to-black',
      accentColor: '#A855F7',
      directiveApplied: 'AI Director analyzed footage and added 3 retention hooks',
    };
    setCards((prev) => [newCard, ...prev]);
    setEditingCard(newCard);
    setIsModalOpen(true);
  };

  // Handle Delete Card
  const handleDeleteCard = (id: string) => {
    if (cards.length <= 4) {
      alert('Keep at least 4 cards in the 3D ring carousel.');
      return;
    }
    setCards((prev) => prev.filter((c) => c.id !== id));
    if (inspectedCard?.id === id) setInspectedCard(null);
  };

  // Handle Reset to Default
  const handleResetCards = () => {
    setCards(INITIAL_CAROUSEL_CARDS);
    setRotationAngle(0);
    setSpeedMultiplier(1);
    setRotationDirection(1);
  };

  // Perspective style config
  const perspectiveVal =
    perspectiveDepth === 'wide' ? '1600px' : perspectiveDepth === 'intense' ? '900px' : '1200px';

  return (
    <div
      className={`relative w-full overflow-hidden select-none pointer-events-auto ${className}`}
      style={{ minHeight: '620px' }}
    >
      {/* ================= COMPACT FLOATING CAROUSEL CONTROLS BAR ================= */}
      <div className="relative z-30 mb-6 flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 rounded-2xl bg-[#0B0E1E]/80 backdrop-blur-md border border-white/[0.08] shadow-lg max-w-[1200px] mx-auto text-xs">
        
        {/* Left: Interactive Controls */}
        <div className="flex items-center gap-2">
          {/* Play / Pause */}
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            title={isPlaying ? 'Pause 3D Carousel' : 'Start 3D Rotation'}
            className="w-8 h-8 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 border border-purple-500/30 flex items-center justify-center transition-colors cursor-pointer"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5 fill-current" />}
          </button>

          {/* Direction toggle */}
          <button
            type="button"
            onClick={() => setRotationDirection(rotationDirection === 1 ? -1 : 1)}
            title="Reverse Rotation Direction"
            className="px-2.5 py-1.5 rounded-xl bg-[#151930] hover:bg-[#1E2342] text-[#A4A5B5] hover:text-white border border-white/[0.06] flex items-center gap-1 transition-colors cursor-pointer"
          >
            {rotationDirection === 1 ? <ChevronRight className="w-3.5 h-3.5 text-purple-400" /> : <ChevronLeft className="w-3.5 h-3.5 text-purple-400" />}
            <span className="hidden sm:inline">Direction</span>
          </button>

          {/* Speed Pill Selector */}
          <div className="flex items-center rounded-xl bg-[#12162C] border border-white/[0.06] p-0.5">
            {[0.5, 1, 1.5].map((spd) => (
              <button
                key={spd}
                type="button"
                onClick={() => setSpeedMultiplier(spd)}
                className={`px-2 py-1 rounded-lg text-[11px] font-mono transition-colors cursor-pointer ${
                  speedMultiplier === spd
                    ? 'bg-purple-600 text-white font-bold shadow-sm'
                    : 'text-[#8A8B9C] hover:text-white'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>

          {/* Perspective selector */}
          <div className="hidden md:flex items-center gap-1 pl-2 border-l border-white/[0.08]">
            <span className="text-[11px] text-[#737588]">Ring:</span>
            {(['standard', 'wide', 'intense'] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setPerspectiveDepth(mode)}
                className={`px-2 py-0.5 rounded-md text-[10px] capitalize transition-colors cursor-pointer ${
                  perspectiveDepth === mode
                    ? 'bg-[#22294F] text-purple-200 border border-purple-500/30'
                    : 'text-[#737588] hover:text-[#C5C6D0]'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* Center: Live 3D Ring Status Hint */}
        <div className="hidden lg:flex items-center gap-2 text-[11px] text-[#7E8094]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>3D Perspective Carousel ({displayedCards.length} Projects orbiting) · Drag to spin</span>
        </div>

        {/* Right: Editable Actions */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Add Project Card */}
          <button
            type="button"
            onClick={handleAddNewCard}
            className="px-2.5 py-1.5 rounded-xl bg-purple-950/70 hover:bg-purple-900/80 text-purple-200 border border-purple-500/40 flex items-center gap-1.5 transition-colors cursor-pointer font-medium"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Card</span>
          </button>

          {/* Reset Cards */}
          <button
            type="button"
            onClick={handleResetCards}
            title="Reset cards and rotation"
            className="w-8 h-8 rounded-xl bg-[#14182E] hover:bg-[#1C2140] text-[#8E90A4] hover:text-white border border-white/[0.06] flex items-center justify-center transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* ================= 3D PERSPECTIVE CYLINDER STAGE ================= */}
      <div
        className="relative w-full h-[580px] sm:h-[640px] flex items-center justify-center cursor-grab active:cursor-grabbing overflow-visible"
        style={{
          perspective: perspectiveVal,
          perspectiveOrigin: '50% 45%',
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {/* Ambient Cylinder Center Core Glow */}
        <div
          className="absolute w-[450px] h-[450px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(139, 53, 232, 0.18) 0%, rgba(168, 85, 247, 0.05) 50%, transparent 70%)',
            transform: 'translateZ(-200px)',
          }}
        />

        {/* 3D Rotating Ring Container */}
        <div
          className="relative w-0 h-0 transition-transform duration-75 ease-out"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateY(${rotationAngle}deg)`,
          }}
        >
          {displayedCards.map((card, idx) => {
            const cardBaseAngle = idx * anglePerCard;
            // Calculate absolute angle relative to front camera (0 deg = front-center)
            let relativeAngle = (cardBaseAngle + rotationAngle) % 360;
            if (relativeAngle > 180) relativeAngle -= 360;
            if (relativeAngle < -180) relativeAngle += 360;

            // z-depth calculation: 1 at front (0 deg), -1 at back (180 deg)
            const rad = (relativeAngle * Math.PI) / 180;
            const zCosine = Math.cos(rad); // 1 = closest front, -1 = furthest back
            const isFacingFront = zCosine > -0.25;

            // Depth attenuation factors
            const normalizedDepth = (zCosine + 1) / 2; // 0 to 1
            const cardOpacity = Math.max(0.25, Math.min(1, 0.3 + 0.7 * normalizedDepth));
            const cardScale = 0.82 + 0.18 * normalizedDepth;
            const cardBrightness = 0.65 + 0.45 * normalizedDepth;
            const cardBlur = (1 - normalizedDepth) * 2.2; // slight blur for distant cards

            return (
              <div
                key={card.id}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                style={{
                  width: '260px',
                  height: '370px',
                  transformStyle: 'preserve-3d',
                  transform: `rotateY(${cardBaseAngle}deg) translateZ(${ringRadius}px) scale(${cardScale})`,
                  opacity: cardOpacity,
                  filter: `brightness(${cardBrightness}) blur(${cardBlur}px)`,
                  transition: 'opacity 180ms ease, filter 180ms ease',
                  zIndex: Math.round(normalizedDepth * 100),
                }}
              >
                {/* 3D Card Shell */}
                <div
                  className={`group relative w-full h-full rounded-2xl p-4 flex flex-col justify-between overflow-hidden border transition-all duration-300 ${
                    zCosine > 0.6
                      ? 'border-[#a082dc]/40 shadow-[0_15px_35px_rgba(0,0,0,0.7),0_0_20px_rgba(168,85,247,0.2)]'
                      : 'border-white/[0.08] shadow-[0_10px_25px_rgba(0,0,0,0.85)]'
                  } bg-[#0A0D1B] bg-gradient-to-b ${card.gradient}`}
                >
                  {/* Subtle top edge glow beam */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] opacity-80"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${card.accentColor}, transparent)`,
                    }}
                  />

                  {/* Card Header */}
                  <div className="flex items-center justify-between text-[11px] relative z-10">
                    <span className="px-2 py-0.5 rounded-full bg-white/[0.08] border border-white/[0.06] text-white/90 font-medium tracking-wide">
                      {card.category}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <span className="flex items-center gap-1 text-emerald-400 font-mono font-bold bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/20 text-[10px]">
                        <TrendingUp className="w-2.5 h-2.5" />
                        {card.views}
                      </span>

                      {/* Quick Edit Pencil Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingCard(card);
                          setIsModalOpen(true);
                        }}
                        title="Edit this card"
                        className="w-6 h-6 rounded-lg bg-white/10 hover:bg-purple-600 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Card Center: Visual Video Preview Stage Mockup */}
                  <div className="my-2 relative flex-1 rounded-xl bg-black/60 border border-white/[0.08] p-3 flex flex-col justify-between overflow-hidden">
                    {/* Simulated Waveform & Sound Bars */}
                    <div className="flex items-end gap-1 h-12 w-full px-1">
                      {[35, 65, 45, 85, 95, 60, 40, 75, 90, 50, 70, 85, 60, 30, 80, 55].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-full transition-all duration-300"
                          style={{
                            height: `${h}%`,
                            backgroundColor: i % 3 === 0 ? card.accentColor : 'rgba(255, 255, 255, 0.25)',
                          }}
                        />
                      ))}
                    </div>

                    {/* Dynamic kinetic caption preview bubble */}
                    <div className="mt-2 p-1.5 rounded-lg bg-black/80 border border-purple-500/30 text-[10px] text-center font-bold text-white shadow-sm flex items-center justify-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-purple-400 shrink-0" />
                      <span className="truncate">"{card.directiveApplied.slice(0, 32)}..."</span>
                    </div>

                    {/* Retention Hook Score Meter */}
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#A4A5B5] pt-1">
                      <span className="flex items-center gap-1">
                        <Scissors className="w-2.5 h-2.5 text-purple-400" />
                        Hook Score
                      </span>
                      <span className="font-bold text-purple-300">{card.hookScore}/100</span>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="relative z-10 pt-1">
                    <h4 className="text-[12.5px] font-bold text-white leading-snug line-clamp-2 mb-1.5">
                      {card.title}
                    </h4>

                    <div className="flex items-center justify-between text-[10px] text-[#8E90A4]">
                      <span className="font-medium text-purple-300/90 truncate">{card.creator}</span>
                      <span className="font-mono">{card.duration}</span>
                    </div>

                    {/* Directive Tags */}
                    <div className="flex flex-wrap gap-1 mt-2">
                      {card.tags.slice(0, 2).map((t, ti) => (
                        <span
                          key={ti}
                          className="px-1.5 py-0.5 rounded bg-[#161B33] text-[#A4A5B5] text-[9px] border border-white/5"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Interactive Inspect Button Overlay on Card */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setInspectedCard(card);
                      if (onSelectCard) onSelectCard(card);
                    }}
                    className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 bg-purple-950/60 backdrop-blur-[2px] flex items-center justify-center gap-1.5 text-xs font-bold text-white transition-opacity cursor-pointer rounded-2xl"
                  >
                    <Eye className="w-4 h-4 text-purple-300" />
                    <span>Inspect Details</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= EDIT CARD MODAL ================= */}
      {isModalOpen && editingCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="relative w-full max-w-md rounded-2xl bg-[#0D1022] border border-purple-500/30 p-6 shadow-2xl text-white">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-purple-400" />
                <h3 className="text-base font-bold text-white">Customize 3D Carousel Card</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-7 h-7 rounded-lg bg-white/10 text-white/70 hover:text-white flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-[#A4A5B5] mb-1 font-medium">Project Title</label>
                <input
                  type="text"
                  value={editingCard.title}
                  onChange={(e) => setEditingCard({ ...editingCard, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#141830] border border-white/10 text-white focus:outline-none focus:border-purple-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#A4A5B5] mb-1 font-medium">Category</label>
                  <input
                    type="text"
                    value={editingCard.category}
                    onChange={(e) => setEditingCard({ ...editingCard, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#141830] border border-white/10 text-white focus:outline-none focus:border-purple-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#A4A5B5] mb-1 font-medium">Creator Handle</label>
                  <input
                    type="text"
                    value={editingCard.creator}
                    onChange={(e) => setEditingCard({ ...editingCard, creator: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#141830] border border-white/10 text-white focus:outline-none focus:border-purple-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#A4A5B5] mb-1 font-medium">Views Metric</label>
                  <input
                    type="text"
                    value={editingCard.views}
                    onChange={(e) => setEditingCard({ ...editingCard, views: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#141830] border border-white/10 text-white focus:outline-none focus:border-purple-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#A4A5B5] mb-1 font-medium">Hook Score (1-100)</label>
                  <input
                    type="number"
                    min="50"
                    max="100"
                    value={editingCard.hookScore}
                    onChange={(e) => setEditingCard({ ...editingCard, hookScore: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-[#141830] border border-white/10 text-white focus:outline-none focus:border-purple-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#A4A5B5] mb-1 font-medium">AI Directive Applied</label>
                <textarea
                  rows={2}
                  value={editingCard.directiveApplied}
                  onChange={(e) => setEditingCard({ ...editingCard, directiveApplied: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#141830] border border-white/10 text-white focus:outline-none focus:border-purple-500 resize-none"
                  required
                />
              </div>

              {/* Accent Color Chooser */}
              <div>
                <label className="block text-[#A4A5B5] mb-1.5 font-medium">Accent Color Theme</label>
                <div className="flex items-center gap-2">
                  {['#A855F7', '#8B5CF6', '#D946EF', '#818CF8', '#F43F5E', '#10B981', '#38BDF8'].map((col) => (
                    <button
                      key={col}
                      type="button"
                      onClick={() => setEditingCard({ ...editingCard, accentColor: col })}
                      className={`w-7 h-7 rounded-full border-2 transition-transform cursor-pointer ${
                        editingCard.accentColor === col ? 'scale-115 border-white shadow-md' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: col }}
                    />
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-3 flex items-center justify-between gap-3 border-t border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => {
                    handleDeleteCard(editingCard.id);
                    setIsModalOpen(false);
                  }}
                  className="px-3 py-2 rounded-xl bg-red-950/60 hover:bg-red-900/80 text-red-200 border border-red-500/30 flex items-center gap-1.5 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white/80 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 hover:brightness-110 text-white font-bold cursor-pointer shadow-lg flex items-center gap-1.5"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= CARD DETAIL INSPECTION MODAL ================= */}
      {inspectedCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="relative w-full max-w-lg rounded-2xl bg-[#0B0D1E] border border-purple-500/40 p-6 shadow-2xl text-white">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <Film className="w-4 h-4 text-purple-400" />
                <h3 className="text-base font-bold text-white">AI Directed Project Insight</h3>
              </div>
              <button
                type="button"
                onClick={() => setInspectedCard(null)}
                className="w-7 h-7 rounded-lg bg-white/10 text-white/70 hover:text-white flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <span className="text-[11px] text-purple-300 font-medium">{inspectedCard.category}</span>
                <h4 className="text-lg font-bold text-white mt-0.5">{inspectedCard.title}</h4>
                <p className="text-[#8E90A4] text-xs mt-1">Created by {inspectedCard.creator} · Total Reach: {inspectedCard.views}</p>
              </div>

              {/* Directive box */}
              <div className="p-3.5 rounded-xl bg-[#13162C] border border-white/[0.08]">
                <span className="text-[11px] text-[#737588] font-mono uppercase block mb-1">
                  AI Editorial Directive Executed:
                </span>
                <p className="text-purple-200 font-medium leading-relaxed">
                  "{inspectedCard.directiveApplied}"
                </p>
              </div>

              {/* Metric Highlights */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2.5 rounded-xl bg-[#12162B] border border-white/5">
                  <span className="text-[10px] text-[#7E8094] block">Hook Retention</span>
                  <span className="text-sm font-bold text-emerald-400">{inspectedCard.hookScore}%</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#12162B] border border-white/5">
                  <span className="text-[10px] text-[#7E8094] block">Duration</span>
                  <span className="text-sm font-bold text-purple-300">{inspectedCard.duration}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#12162B] border border-white/5">
                  <span className="text-[10px] text-[#7E8094] block">Total Views</span>
                  <span className="text-sm font-bold text-white">{inspectedCard.views}</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditingCard(inspectedCard);
                    setInspectedCard(null);
                    setIsModalOpen(true);
                  }}
                  className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white flex items-center gap-1.5 cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Values</span>
                </button>
                <button
                  type="button"
                  onClick={() => setInspectedCard(null)}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
