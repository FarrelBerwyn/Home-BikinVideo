import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  ChevronDown,
  Play,
  Pause,
  SlidersHorizontal,
  Layers,
  Sparkle,
  Wand2,
  Ratio,
  Shuffle,
  Volume2,
  CheckCircle2,
  Maximize2,
  Check,
  RefreshCw,
} from 'lucide-react';
import {
  SkatingElephantSvg,
  StarryNightElephantSvg,
  WaterLilyElephantSvg,
} from './ElephantIllustrations';

interface HeroGeneratorProps {
  onOpenPreviewModal: (title: string, type: string) => void;
  onOpenTrial: () => void;
  preselectedPlatform?: string | null;
}

const PRESET_PROMPTS = [
  'Imagine a playful elephant calf skating on snow, decked out in a vibrant patchwork outfit and oversized glasses. It glides effortlessly on sparkling ice skates, leaving a colorful trail behind.',
  'A neon-lit cyberpunk cat riding a hoverboard through Tokyo rain puddles, wearing high-tech holographic goggles and an oversized streetwear hoodie.',
  'A wise ancient dragon hosting an afternoon matcha tea ceremony on a misty Himalayan mountain peak, steam curling into auspicious cloud symbols.',
  'An adventurous astronaut panda planting a bamboo seedling on the rust-colored soil of Mars under a glowing double moon sky.',
];

const VIDEO_TYPES = [
  'I want Explainer Videos',
  'I want Product Promos',
  'I want Story Videos',
  'I want Educational Shorts',
  'I want Viral TikToks',
];

export const HeroGenerator: React.FC<HeroGeneratorProps> = ({
  onOpenPreviewModal,
  onOpenTrial,
  preselectedPlatform,
}) => {
  const [videoType, setVideoType] = useState('I want Explainer Videos');
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const [prompt, setPrompt] = useState(PRESET_PROMPTS[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generationStep, setGenerationStep] = useState('');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeToolbarTool, setActiveToolbarTool] = useState<string | null>(null);
  const [selectedAspectRatio, setSelectedAspectRatio] = useState('9:16');
  const [selectedSceneIndex, setSelectedSceneIndex] = useState(0);
  const [activeCapability, setActiveCapability] = useState<'voice' | 'backgrounds' | 'script'>('voice');

  // If a social platform preset was selected from Social Tools section
  useEffect(() => {
    if (preselectedPlatform) {
      if (preselectedPlatform.includes('Reels') || preselectedPlatform.includes('TikTok') || preselectedPlatform.includes('Shorts')) {
        setSelectedAspectRatio('9:16');
      } else if (preselectedPlatform.includes('Twitter')) {
        setSelectedAspectRatio('16:9');
      } else {
        setSelectedAspectRatio('1:1');
      }
      setVideoType(`I want ${preselectedPlatform}`);
    }
  }, [preselectedPlatform]);

  // Audio waveform animation state
  const [audioPlayhead, setAudioPlayhead] = useState(14); // seconds
  const audioIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlayingAudio) {
      audioIntervalRef.current = setInterval(() => {
        setAudioPlayhead((prev) => (prev >= 30 ? 0 : prev + 1));
      }, 1000);
    } else {
      if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
    }
    return () => {
      if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
    };
  }, [isPlayingAudio]);

  // Simulated AI Generation sequence
  const handleGenerate = () => {
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    setGenerationProgress(5);
    setGenerationStep('Analyzing story prompt...');

    const steps = [
      { progress: 25, label: 'Synthesizing neural voiceover...' },
      { progress: 55, label: 'Rendering 3D character animation...' },
      { progress: 80, label: 'Generating soundscape & auto-subtitles...' },
      { progress: 100, label: 'Video ready!' },
    ];

    let currentStepIdx = 0;
    const interval = setInterval(() => {
      if (currentStepIdx < steps.length) {
        setGenerationProgress(steps[currentStepIdx].progress);
        setGenerationStep(steps[currentStepIdx].label);
        currentStepIdx++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsGenerating(false);
          onOpenPreviewModal('AI Generated Short: ' + prompt.slice(0, 40) + '...', videoType);
        }, 500);
      }
    }, 600);
  };

  const handleNextPromptPreset = () => {
    const currentIndex = PRESET_PROMPTS.indexOf(prompt);
    const nextIndex = (currentIndex + 1) % PRESET_PROMPTS.length;
    setPrompt(PRESET_PROMPTS[nextIndex]);
  };

  // 68 waveform bars with variable heights
  const waveformBars = [
    18, 22, 28, 35, 42, 50, 45, 60, 72, 85, 92, 78, 65, 88, 95, 70, 55, 62, 80, 90,
    98, 84, 76, 68, 52, 60, 74, 86, 92, 100, 88, 70, 60, 48, 56, 72, 85, 90, 78, 64,
    58, 70, 82, 94, 86, 72, 65, 50, 42, 55, 68, 75, 82, 70, 60, 45, 38, 50, 62, 55,
    42, 35, 28, 22, 18, 14, 12, 10,
  ];

  return (
    <div id="hero-demo" className="relative w-full max-w-[1060px] mx-auto">
      {/* Outer ambient glow frame */}
      <div className="relative rounded-2xl md:rounded-3xl p-3 sm:p-5 lg:p-6 bg-[#0E101D]/90 border border-[#a082dc]/20 shadow-[0_20px_60px_rgba(0,0,0,0.65),0_0_40px_rgba(139,53,232,0.15)] backdrop-blur-xl">
        {/* Main 3-column / stacked composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5 items-stretch">
          
          {/* ================= LEFT PROMPT PANEL (Col 1-4) ================= */}
          <div className="lg:col-span-4 flex flex-col justify-between p-4 sm:p-5 rounded-2xl bg-[#121524] border border-[#a082dc]/15 shadow-inner">
            <div>
              {/* Card Title */}
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-[#C084FC]" />
                <h3 className="text-[15px] sm:text-[16px] font-semibold text-white tracking-tight">
                  Turn your Text into <span className="text-[#C084FC]">Video</span>
                </h3>
              </div>

              {/* Video Type Selector */}
              <div className="mb-4 relative">
                <label className="block text-[11px] font-medium text-[#A4A5B5] uppercase tracking-wider mb-1.5">
                  Select video type
                </label>
                <button
                  type="button"
                  onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#181B2D] border border-[#a082dc]/20 text-[13px] text-white hover:border-[#a082dc]/40 transition-colors cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
                >
                  <span className="truncate">{videoType}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#A4A5B5] transition-transform duration-200 ${
                      isTypeDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isTypeDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 py-1 rounded-xl bg-[#191B2E] border border-[#a082dc]/30 shadow-2xl z-30 animate-in fade-in zoom-in-95 duration-150">
                    {VIDEO_TYPES.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => {
                          setVideoType(type);
                          setIsTypeDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-2 text-[12px] transition-colors flex items-center justify-between ${
                          videoType === type
                            ? 'text-purple-300 bg-purple-950/40 font-medium'
                            : 'text-[#A4A5B5] hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <span>{type}</span>
                        {videoType === type && <Check className="w-3.5 h-3.5 text-purple-400" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Prompt Input Field */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-[11px] font-medium text-[#A4A5B5] uppercase tracking-wider">
                    Write your #Prompt in your language
                  </label>
                  <button
                    type="button"
                    onClick={handleNextPromptPreset}
                    title="Load next prompt example"
                    className="inline-flex items-center gap-1 text-[11px] text-purple-400 hover:text-purple-300 cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Shuffle</span>
                  </button>
                </div>
                <div className="relative">
                  <textarea
                    rows={5}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe your short video scene, characters, setting..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#181B2D] border border-[#a082dc]/20 text-[12.5px] leading-relaxed text-[#F1F0F6] placeholder-[#5d5f75] resize-none focus:outline-none focus:border-[#C084FC] focus:ring-1 focus:ring-[#C084FC]/50 transition-all font-sans"
                  />
                  <div className="absolute bottom-2 right-2.5 text-[10px] text-[#737588]">
                    {prompt.length} chars
                  </div>
                </div>
              </div>
            </div>

            {/* Generate Button / Progress Bar */}
            <div>
              {isGenerating ? (
                <div className="p-3 rounded-xl bg-[#181B2E] border border-purple-500/30">
                  <div className="flex items-center justify-between text-[11px] text-purple-300 mb-2">
                    <span className="font-medium animate-pulse">{generationStep}</span>
                    <span className="font-mono">{generationProgress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 rounded-full"
                      style={{ width: `${generationProgress}%` }}
                    />
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleGenerate}
                  className="w-full relative group overflow-hidden py-3 px-4 rounded-xl font-semibold text-[13px] text-white cursor-pointer transition-all duration-200 active:scale-[0.98] shadow-md shadow-black/40 hover:shadow-lg hover:shadow-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
                  style={{
                    background: 'linear-gradient(135deg, rgba(139, 53, 232, 0.45) 0%, rgba(217, 70, 239, 0.35) 100%)',
                    border: '1px solid rgba(192, 132, 252, 0.4)',
                  }}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-200 group-hover:rotate-12 transition-transform duration-200" />
                    <span>Generate</span>
                  </div>
                </button>
              )}
            </div>
          </div>

          {/* ================= CENTER PREVIEW PANEL (Col 5-11) ================= */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-3">
            {/* 3 Visual Preview Tiles Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 h-[240px] sm:h-[260px]">
              
              {/* Tile 1: Large Left Thumbnail (Col 1-7) */}
              <div
                onClick={() => {
                  setSelectedSceneIndex(0);
                  onOpenPreviewModal('Playful Elephant Skating on Snow (Scene 1)', videoType);
                }}
                className={`sm:col-span-7 relative rounded-2xl overflow-hidden cursor-pointer group border transition-all duration-300 shadow-md ${
                  selectedSceneIndex === 0
                    ? 'border-[#C084FC] ring-2 ring-[#C084FC]/30 shadow-md shadow-black/50'
                    : 'border-[#a082dc]/20 hover:border-[#a082dc]/50'
                }`}
              >
                <SkatingElephantSvg className="transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                
                {/* Overlay Badge */}
                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] text-white flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Scene 01 · 4K HDR</span>
                </div>

                {/* Click to expand hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-10 h-10 rounded-full bg-black/70 border border-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-lg">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px] text-white/90">
                  <span className="font-medium drop-shadow-md truncate">Elephant Ice Skating</span>
                  <span className="font-mono text-[10px] bg-black/50 px-1.5 py-0.5 rounded">00:08</span>
                </div>
              </div>

              {/* Stacked Right Thumbnails (Col 8-12) */}
              <div className="sm:col-span-5 flex flex-col gap-3 h-full">
                {/* Tile 2: Starry Night Elephant */}
                <div
                  onClick={() => {
                    setSelectedSceneIndex(1);
                    onOpenPreviewModal('Cute Elephant Under Starry Sky (Scene 2)', videoType);
                  }}
                  className={`relative flex-1 rounded-xl overflow-hidden cursor-pointer group border transition-all duration-300 shadow-sm ${
                    selectedSceneIndex === 1
                      ? 'border-[#C084FC] ring-2 ring-[#C084FC]/30 shadow-md shadow-black/50'
                      : 'border-[#a082dc]/20 hover:border-[#a082dc]/50'
                  }`}
                >
                  <StarryNightElephantSvg className="transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] text-white">
                    <span className="truncate">Celestial Wonder</span>
                    <span className="font-mono text-[9px] bg-black/60 px-1 rounded">00:12</span>
                  </div>
                </div>

                {/* Tile 3: Water Lily Pond Elephant */}
                <div
                  onClick={() => {
                    setSelectedSceneIndex(2);
                    onOpenPreviewModal('Baby Elephant in Lily Pond (Scene 3)', videoType);
                  }}
                  className={`relative flex-1 rounded-xl overflow-hidden cursor-pointer group border transition-all duration-300 shadow-sm ${
                    selectedSceneIndex === 2
                      ? 'border-[#C084FC] ring-2 ring-[#C084FC]/30 shadow-md shadow-black/50'
                      : 'border-[#a082dc]/20 hover:border-[#a082dc]/50'
                  }`}
                >
                  <WaterLilyElephantSvg className="transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] text-white">
                    <span className="truncate">Water Lily Bath</span>
                    <span className="font-mono text-[9px] bg-black/60 px-1 rounded">00:10</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Audio Waveform Panel */}
            <div className="p-3 sm:p-3.5 rounded-2xl bg-[#121524] border border-[#a082dc]/15 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                    aria-label={isPlayingAudio ? 'Pause waveform demo' : 'Play waveform demo'}
                    className="w-7 h-7 rounded-full bg-[#8B35E8] hover:bg-[#9E45E8] active:scale-95 text-white flex items-center justify-center transition-transform cursor-pointer shadow-sm shadow-black/40"
                  >
                    {isPlayingAudio ? (
                      <Pause className="w-3.5 h-3.5" />
                    ) : (
                      <Play className="w-3.5 h-3.5 ml-0.5 fill-white" />
                    )}
                  </button>
                  <span className="text-[12px] font-medium text-white/90">
                    BGM & AI Voice Track
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[11px] font-mono text-[#A4A5B5]">
                  <span>00:{audioPlayhead < 10 ? `0${audioPlayhead}` : audioPlayhead}</span>
                  <span>/</span>
                  <span>00:30</span>
                </div>
              </div>

              {/* Waveform graphic visualization */}
              <div className="h-10 flex items-center justify-between gap-[2px] sm:gap-[3px] px-1 overflow-hidden">
                {waveformBars.map((height, idx) => {
                  const isCurrentPlayhead = idx <= (audioPlayhead / 30) * waveformBars.length;
                  const animatedHeight = isPlayingAudio
                    ? Math.max(15, (height + Math.sin(idx + audioPlayhead * 2) * 20))
                    : height;

                  return (
                    <div
                      key={idx}
                      className="flex-1 rounded-full transition-all duration-150"
                      style={{
                        height: `${animatedHeight}%`,
                        backgroundColor: isCurrentPlayhead ? '#D946EF' : '#8B35E8',
                        opacity: isCurrentPlayhead ? 0.95 : 0.45,
                        boxShadow: 'none',
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {/* ================= RIGHT TOOLBAR (Col 12) ================= */}
          <div className="lg:col-span-1 flex lg:flex-col items-center justify-center lg:justify-start gap-2.5 p-2 rounded-2xl bg-[#121524] border border-[#a082dc]/15 relative">
            {[
              { id: 'audio', label: 'Audio & Music', icon: Volume2 },
              { id: 'sliders', label: 'Voice Tuning', icon: SlidersHorizontal },
              { id: 'layers', label: 'Layers & Scenes', icon: Layers },
              { id: 'ratio', label: 'Aspect Ratio', icon: Ratio },
              { id: 'effects', label: 'Magic FX', icon: Sparkle },
              { id: 'shuffle', label: 'Transitions', icon: Shuffle },
              { id: 'enhance', label: 'AI Upscaler', icon: Wand2 },
            ].map((tool) => {
              const Icon = tool.icon;
              const isActive = activeToolbarTool === tool.id;
              return (
                <div key={tool.id} className="relative group">
                  <button
                    type="button"
                    onClick={() => setActiveToolbarTool(isActive ? null : tool.id)}
                    aria-label={tool.label}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 ${
                      isActive
                        ? 'bg-[#8B35E8] text-white shadow-md shadow-black/50 scale-105'
                        : 'bg-[#181B2D] text-[#A4A5B5] hover:text-white hover:bg-[#20243C]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </button>

                  {/* Tooltip */}
                  <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-md bg-[#1B1E32] border border-[#a082dc]/30 text-[11px] text-white whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-40 hidden lg:block shadow-lg">
                    {tool.label}
                  </div>
                </div>
              );
            })}

            {/* Quick Tool Drawer / Popover */}
            {activeToolbarTool && (
              <div className="absolute right-0 lg:right-full lg:mr-2 top-full lg:top-0 mt-2 lg:mt-0 p-3.5 rounded-xl bg-[#171A2E] border border-[#a082dc]/30 shadow-2xl w-60 z-50 text-[12px] animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-2.5">
                  <span className="font-semibold text-white capitalize">
                    {activeToolbarTool} Settings
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveToolbarTool(null)}
                    className="text-[#737588] hover:text-white"
                  >
                    ×
                  </button>
                </div>

                {activeToolbarTool === 'ratio' && (
                  <div className="flex flex-col gap-2">
                    <span className="text-[11px] text-[#A4A5B5]">Target Orientation:</span>
                    <div className="grid grid-cols-3 gap-1.5">
                      {['9:16', '16:9', '1:1'].map((r) => (
                        <button
                          key={r}
                          onClick={() => setSelectedAspectRatio(r)}
                          className={`py-1.5 rounded-lg border text-center font-mono text-[11px] cursor-pointer transition-colors ${
                            selectedAspectRatio === r
                              ? 'bg-[#8B35E8] border-[#8B35E8] text-white'
                              : 'bg-black/30 border-white/10 text-[#A4A5B5] hover:text-white'
                          }`}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {activeToolbarTool === 'audio' && (
                  <div className="flex flex-col gap-2 text-[#A4A5B5]">
                    <div className="flex justify-between text-[11px]">
                      <span>Music Volume</span>
                      <span className="text-white font-mono">85%</span>
                    </div>
                    <input type="range" defaultValue={85} className="accent-purple-500" />
                    <div className="flex justify-between text-[11px]">
                      <span>Voice Clarity</span>
                      <span className="text-white font-mono">High</span>
                    </div>
                  </div>
                )}

                {activeToolbarTool === 'sliders' && (
                  <div className="flex flex-col gap-2 text-[#A4A5B5]">
                    <div className="flex justify-between text-[11px]">
                      <span>Narrator Speed</span>
                      <span className="text-white font-mono">1.1x</span>
                    </div>
                    <input type="range" defaultValue={60} className="accent-purple-500" />
                    <div className="flex justify-between text-[11px]">
                      <span>Pitch</span>
                      <span className="text-white font-mono">Warm & Natural</span>
                    </div>
                  </div>
                )}

                {activeToolbarTool === 'effects' && (
                  <div className="flex flex-col gap-1.5">
                    {['Cinematic 4K Glow', 'Anime Shading', 'Vintage VHS', 'Cyber Hologram'].map((eff, i) => (
                      <button
                        key={eff}
                        onClick={() => setActiveToolbarTool(null)}
                        className={`text-left px-2.5 py-1.5 rounded-md text-[11px] transition-colors ${
                          i === 0 ? 'bg-purple-900/40 text-purple-200 border border-purple-500/30' : 'hover:bg-white/5 text-[#A4A5B5]'
                        }`}
                      >
                        {eff}
                      </button>
                    ))}
                  </div>
                )}

                {['layers', 'shuffle', 'enhance'].includes(activeToolbarTool) && (
                  <div className="text-[11px] text-[#A4A5B5] leading-relaxed">
                    Tool active in live preview mode. Realtime neural upscaling enabled with GPU hardware acceleration.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ================= BOTTOM CAPABILITY BAR ================= */}
        <div className="mt-4 pt-3.5 border-t border-[#a082dc]/15 flex items-center justify-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-3 sm:gap-6 px-4 py-2 rounded-full bg-[#121524] border border-[#a082dc]/20 text-[12px] sm:text-[13px] text-[#A4A5B5]">
            <button
              type="button"
              onClick={() => setActiveCapability('voice')}
              className={`inline-flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeCapability === 'voice' ? 'text-white font-semibold' : 'hover:text-white'
              }`}
            >
              <Volume2 className="w-3.5 h-3.5 text-purple-400" />
              <span>AI Voice</span>
            </button>

            <span className="w-1.5 h-1.5 rotate-45 bg-[#8B35E8]/60" />

            <button
              type="button"
              onClick={() => setActiveCapability('backgrounds')}
              className={`inline-flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeCapability === 'backgrounds' ? 'text-white font-semibold' : 'hover:text-white'
              }`}
            >
              <Play className="w-3.5 h-3.5 text-purple-400 fill-purple-400/30" />
              <span>AI Backgrounds</span>
            </button>

            <span className="w-1.5 h-1.5 rotate-45 bg-[#8B35E8]/60" />

            <button
              type="button"
              onClick={() => setActiveCapability('script')}
              className={`inline-flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeCapability === 'script' ? 'text-white font-semibold' : 'hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>AI Script Generator</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
