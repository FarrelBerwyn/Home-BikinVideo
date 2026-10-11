import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  Download,
  Upload,
  Link,
  ArrowRight,
  Bot,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { GradientText } from './GradientText';
import { CreatorVideoCanvas } from './CreatorVideoCanvas';
import { AnimatedCarouselBackground } from './AnimatedCarouselBackground';
import { VideoTimelineLayout } from './VideoTimelineLayout';

interface InteractiveDemoSectionProps {
  onOpenTrial: () => void;
}

export const InteractiveDemoSection: React.FC<InteractiveDemoSectionProps> = ({ onOpenTrial }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [comparisonSliderPos, setComparisonSliderPos] = useState(50); // 0 to 100 percentage
  const [activeTab, setActiveTab] = useState<'edit' | 'shorts' | 'prompt'>('edit');
  const [videoUrl, setVideoUrl] = useState('');
  const [promptText, setPromptText] = useState(
    'Make this video more engaging. Strengthen the opening, remove unnecessary pauses, and add relevant visual support where appropriate.'
  );
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [targetDuration, setTargetDuration] = useState('30s-60s');
  const [aspectRatio, setAspectRatio] = useState('9:16');
  const [isProcessing, setIsProcessing] = useState(false);

  // Responsive container width for pixel-perfect Before/After comparison slider
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [canvasContainerWidth, setCanvasContainerWidth] = useState<number>(600);

  useEffect(() => {
    const updateWidth = () => {
      if (canvasContainerRef.current) {
        setCanvasContainerWidth(canvasContainerRef.current.clientWidth);
      }
    };
    updateWidth();

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && canvasContainerRef.current) {
      ro = new ResizeObserver(() => {
        updateWidth();
      });
      ro.observe(canvasContainerRef.current);
    }

    window.addEventListener('resize', updateWidth);
    return () => {
      window.removeEventListener('resize', updateWidth);
      if (ro) ro.disconnect();
    };
  }, []);

  const handleSimulateUpload = () => {
    if (uploadedFileName) {
      setUploadedFileName('');
    } else {
      setUploadedFileName('raw_podcast_footage_cam01.mp4');
    }
  };

  const handleStartWorkflow = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onOpenTrial();
    }, 1200);
  };

  return (
    <section id="interactive-demo" className="section--carousel-bleed relative pt-12 sm:pt-20 lg:pt-28 pb-10 sm:pb-16 lg:pb-24 z-10 bg-[#080914] overflow-hidden">
      {/* Unified Ambient Lighting for the entire section */}
      <div
        className="absolute inset-0 pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(ellipse 85% 65% at 50% 32%, rgba(139, 53, 232, 0.18), rgba(88, 28, 135, 0.05) 55%, transparent 75%)',
        }}
      />

      {/* Section Header */}
      <div className="page-container px-4 sm:px-6 text-center mb-6 sm:mb-10 relative z-30">
        <h2 className="text-[clamp(27px,6.5vw,34px)] sm:text-[clamp(34px,4.5vw,46px)] lg:text-[50px] font-extrabold text-[#F1F0F6] tracking-tight leading-[1.12] mb-3 sm:mb-4 text-balance">
          See How Your AI Director <GradientText>Edits Footage.</GradientText>
        </h2>
        <p className="text-[14px] sm:text-[16px] text-[#A4A5B5] leading-relaxed max-w-2xl mx-auto">
          Experience what happens after you give Bikin Video an instruction. Compare raw source footage directly against the polished AI-directed result.
        </p>
      </div>

      {/* 3D Animated Carousel Stage (Positioned below the text, orbiting in the background, z-10 below editor z-20) */}
      <div className="relative z-10 w-full h-[320px] sm:h-[340px] md:h-[350px] overflow-visible my-1 sm:my-2">
        <AnimatedCarouselBackground />
      </div>

      {/* ================= MAIN INTERACTIVE DEMO STAGE: UNTITLED PROJECT v3.4-DIRECTOR (Foreground, z-20) ================= */}
      <div className="relative z-20 hero-editor-container -mt-16 sm:-mt-20 md:-mt-[85px]">
        <div className="hero-editor-card flex flex-col rounded-2xl glass-panel overflow-hidden">
            
            {/* Editor Top Bar (matching Section 1 - Untitled Project v3.4-director) */}
            <div className="h-10 px-3.5 bg-[#0e0c24]/80 backdrop-blur-md border-b border-purple-500/20 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                {/* Bikin Logo Icon */}
                <img
                  src="/brand-design/bikin-video-logo-icon.png"
                  alt="Bikin Video"
                  className="w-5 h-5 rounded-[5px] object-contain shadow-sm"
                />
                <span className="font-semibold text-white/90 truncate">Untitled Project</span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-mono glass-badge">
                  v3.4-director
                </span>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                {/* AutoSave ON */}
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-[10px] text-emerald-400 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>AutoSave ON</span>
                </div>

                <button
                  type="button"
                  onClick={onOpenTrial}
                  className="px-3 py-1 rounded-lg bg-gradient-to-r from-[#6D28D9] to-[#8B35F2] hover:brightness-110 text-white font-semibold text-xs flex items-center gap-1 shadow-sm cursor-pointer transition-all border border-purple-400/30"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export</span>
                </button>
              </div>
            </div>

            {/* Main Stage Grid: Input Panel (Left) + Video Player with Comparison Slider (Center) + Director Panel (Right) */}
            <div className="grid grid-cols-1 md:grid-cols-12 border-b border-white/[0.08]">
              
              {/* ================= INPUT VIDEO PANEL (Col 1-4 on desktop & tablet) ================= */}
              <div className="col-span-12 md:col-span-4 flex flex-col justify-between h-full p-3 sm:p-3.5 lg:p-4 bg-transparent border-b md:border-b-0 md:border-r border-purple-500/15 min-w-0">
                <div>
                  {/* Segmented Mode Selector Tabs */}
                  <div className="flex items-center p-1 rounded-xl glass-inset mb-3 sm:mb-3.5">
                    {[
                      { id: 'edit', label: 'Edit Existing Video', shortLabel: 'Edit Video' },
                      { id: 'shorts', label: 'Create Shorts', shortLabel: 'Shorts' },
                      { id: 'prompt', label: 'Create from Prompt', shortLabel: 'From Prompt' },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`flex-1 py-1.5 sm:py-2 px-1 text-[10.5px] sm:text-[11px] xl:text-[12.5px] font-semibold rounded-lg transition-all text-center cursor-pointer truncate ${
                          activeTab === tab.id
                            ? 'bg-gradient-to-r from-[#6D28D9] to-[#8B35F2] text-white shadow-md border border-purple-400/30'
                            : 'text-[#B7B2CC] hover:text-white'
                        }`}
                      >
                        <span className="hidden xl:inline">{tab.label}</span>
                        <span className="xl:hidden">{tab.shortLabel}</span>
                      </button>
                    ))}
                  </div>

                  {/* Mode 1: Edit Existing Video */}
                  {activeTab === 'edit' && (
                    <div className="space-y-4">
                      {/* Upload Dropzone */}
                      <div
                        onClick={handleSimulateUpload}
                        className="p-3 sm:p-3.5 rounded-xl border border-dashed border-purple-400/30 hover:border-purple-300 glass-inset transition-all cursor-pointer flex flex-col items-center justify-center text-center gap-1"
                      >
                        <Upload className="w-5 h-5 text-purple-400 mb-1" />
                        {uploadedFileName ? (
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 font-mono">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>{uploadedFileName}</span>
                          </div>
                        ) : (
                          <>
                            <span className="text-xs font-semibold text-white">
                              Drop footage or click to browse
                            </span>
                            <span className="text-[11px] text-[#737588]">
                              MP4, MOV, ProRes up to 4K 60fps
                            </span>
                          </>
                        )}
                      </div>

                      {/* Or Video URL input */}
                      <div>
                        <label className="block text-[11px] font-medium text-[#A4A5B5] uppercase tracking-wider mb-1.5">
                          Or Paste Video Link
                        </label>
                        <div className="relative">
                          <Link className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737588]" />
                          <input
                            type="url"
                            value={videoUrl}
                            onChange={(e) => setVideoUrl(e.target.value)}
                            placeholder="https://youtube.com/watch?v=... or Google Drive"
                            className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#14172B] border border-white/[0.08] text-xs text-white placeholder-[#585A70] focus:outline-none focus:border-purple-400"
                          />
                        </div>
                      </div>

                      {/* Director Editing Instruction */}
                      <div>
                        <label className="block text-[11px] font-medium text-[#A4A5B5] uppercase tracking-wider mb-1.5">
                          Director Instruction
                        </label>
                        <textarea
                          rows={3}
                          value={promptText}
                          onChange={(e) => setPromptText(e.target.value)}
                          placeholder="Describe editing intent..."
                          className="w-full px-3 py-2.5 rounded-xl bg-[#14172B] border border-white/[0.08] text-xs leading-relaxed text-white placeholder-[#585A70] resize-none focus:outline-none focus:border-purple-400"
                        />
                      </div>
                    </div>
                  )}

                  {/* Mode 2: Create Shorts */}
                  {activeTab === 'shorts' && (
                    <div className="space-y-4">
                      <div
                        onClick={handleSimulateUpload}
                        className="p-3.5 rounded-xl border border-dashed border-[#a082dc]/30 bg-[#14172B]/60 text-center cursor-pointer"
                      >
                        <span className="text-xs font-semibold text-white">
                          {uploadedFileName || 'Drop long-form podcast or video'}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-medium text-[#A4A5B5] mb-1">
                            Clip Duration
                          </label>
                          <select
                            value={targetDuration}
                            onChange={(e) => setTargetDuration(e.target.value)}
                            className="w-full px-2.5 py-2 rounded-xl bg-[#14172B] border border-white/[0.08] text-xs text-white"
                          >
                            <option value="30s-60s">Auto (30s–60s)</option>
                            <option value="under-30s">Under 30s</option>
                            <option value="60s-90s">60s–90s</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] font-medium text-[#A4A5B5] mb-1">
                            Aspect Ratio
                          </label>
                          <select
                            value={aspectRatio}
                            onChange={(e) => setAspectRatio(e.target.value)}
                            className="w-full px-2.5 py-2 rounded-xl bg-[#14172B] border border-white/[0.08] text-xs text-white"
                          >
                            <option value="9:16">9:16 (Shorts/TikTok/Reels)</option>
                            <option value="1:1">1:1 (Square Feed)</option>
                            <option value="16:9">16:9 (Landscape)</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-medium text-[#A4A5B5] mb-1">
                          Viral Hook Strategy
                        </label>
                        <div className="p-2.5 rounded-xl bg-[#14172B] border border-white/[0.08] text-[11.5px] text-[#C4B5FD]">
                          AI will analyze speaker emotion, topic density, and retention drop-offs to extract top viral moments.
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Mode 3: Create from Prompt */}
                  {activeTab === 'prompt' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[11px] font-medium text-[#A4A5B5] mb-1.5">
                          Creative Idea or Topic
                        </label>
                        <textarea
                          rows={3}
                          defaultValue="Create a compelling 45-second explainer about how neural AI video editing replaces manual cutting without losing creative control."
                          className="w-full px-3 py-2.5 rounded-xl bg-[#14172B] border border-white/[0.08] text-xs leading-relaxed text-white resize-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-medium text-[#A4A5B5] mb-1">
                            Video Style
                          </label>
                          <select className="w-full px-2.5 py-2 rounded-xl bg-[#14172B] border border-white/[0.08] text-xs text-white">
                            <option>Product Explainer</option>
                            <option>Cinematic Story</option>
                            <option>Educational Short</option>
                            <option>Social Media Promo</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] font-medium text-[#A4A5B5] mb-1">
                            Format
                          </label>
                          <select className="w-full px-2.5 py-2 rounded-xl bg-[#14172B] border border-white/[0.08] text-xs text-white">
                            <option>9:16 Vertical</option>
                            <option>16:9 Landscape</option>
                            <option>1:1 Square</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="mt-3.5 sm:mt-4 pt-3 sm:pt-3.5 border-t border-white/[0.08] flex items-center gap-1.5 sm:gap-2.5">
                  <button
                    type="button"
                    onClick={handleStartWorkflow}
                    className="flex-1 py-2 sm:py-2.5 px-2 sm:px-3 rounded-xl font-bold text-[10.5px] sm:text-xs text-white bg-gradient-to-r from-[#8B35E8] to-[#D946EF] hover:brightness-110 active:scale-98 transition-all cursor-pointer shadow-[0_4px_20px_rgba(139,53,232,0.4)] flex items-center justify-center gap-1 sm:gap-1.5 min-w-0"
                  >
                    <span className="truncate">{isProcessing ? 'Directing AI...' : 'Start Creating'}</span>
                    <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenTrial()}
                    className="py-2 sm:py-2.5 px-2 sm:px-2.5 rounded-xl text-[10.5px] sm:text-xs font-semibold text-[#A4A5B5] hover:text-white bg-[#15182B] hover:bg-[#1E233C] border border-white/[0.08] transition-colors cursor-pointer shrink-0"
                  >
                    See How It Works
                  </button>
                </div>
              </div>

              {/* ================= VIDEO PLAYER WITH INTERACTIVE COMPARISON SLIDER (Col 5 on desktop & tablet - Gambar 3) ================= */}
              <div className="col-span-12 md:col-span-5 relative bg-black flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/[0.08] min-w-0">
                {/* Preview Panel Tabs */}
                <div className="px-2.5 sm:px-3 py-2 bg-[#0A0D1A] border-b border-white/[0.08] flex items-center justify-between text-[10px] sm:text-[10.5px] lg:text-[11px] text-[#A4A5B5] shrink-0 overflow-x-auto scrollbar-none">
                  <div className="flex items-center gap-2 sm:gap-2.5 whitespace-nowrap">
                    <span className="text-white font-semibold border-b-2 border-purple-500 pb-1.5 -mb-2 cursor-pointer">
                      Player-Timeline
                    </span>
                    <span className="hover:text-white cursor-pointer transition-colors">Main</span>
                    <span className="hover:text-white cursor-pointer transition-colors">Workflow</span>
                    <span className="hover:text-white cursor-pointer transition-colors">Video Clipping</span>
                  </div>

                  <div className="hidden xl:flex items-center gap-1.5 text-[#737588] text-[9.5px] sm:text-[10px]">
                    <span>Track Target: track-v1</span>
                  </div>
                </div>

                {/* Dual Before / After Layer Composition with Draggable Split Slider (Gambar 3) */}
                <div
                  ref={canvasContainerRef}
                  className="relative w-full flex-1 flex items-center justify-center overflow-hidden bg-black min-h-[235px] sm:min-h-[245px] select-none"
                >
                  {/* Layer 1: "After" Layer (Polished Video with Captions, B-roll & Zoom) */}
                  <div className="absolute inset-0">
                    <CreatorVideoCanvas
                      isPlaying={isPlaying}
                      isAfter={true}
                      zoomLevel="punch-in"
                      showCaptions={true}
                      showBrollOverlay={true}
                    />
                  </div>

                  {/* Layer 2: "Before" Layer (Raw Uncut Footage clipped by slider percentage) */}
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ width: `${comparisonSliderPos}%` }}
                  >
                    <div className="h-full" style={{ width: `${canvasContainerWidth}px` }}>
                      <CreatorVideoCanvas
                        isPlaying={isPlaying}
                        isAfter={false}
                        zoomLevel="normal"
                        showCaptions={false}
                        showBrollOverlay={false}
                      />
                    </div>

                    {/* Raw Input · Uncut Active badge (from Screenshot 3) */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/85 backdrop-blur-md border border-white/15 flex items-center gap-1.5 text-white font-mono text-[11px] z-20">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Raw Input · Uncut Active</span>
                    </div>
                  </div>

                  {/* Draggable Divider Line (from Screenshot 3) */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 sm:w-1 bg-white cursor-ew-resize z-30 shadow-[0_0_4px_rgba(0,0,0,0.5)] pointer-events-none"
                    style={{ left: `${comparisonSliderPos}%` }}
                  >
                    {/* Slider Circular Handle (⇄ from Screenshot 3) */}
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white text-black font-bold flex items-center justify-center text-[10px] shadow-2xl select-none">
                      ⇄
                    </div>
                  </div>

                  {/* Invisible Range Input for Dragging */}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={comparisonSliderPos}
                    onChange={(e) => setComparisonSliderPos(Number(e.target.value))}
                    aria-label="Before and after comparison slider"
                    className="absolute inset-0 opacity-0 cursor-ew-resize z-40 w-full h-full"
                  />
                </div>

                {/* Player Bottom Control Bar */}
                <div className="px-2.5 sm:px-3 py-1.5 bg-[#0e0c24]/85 backdrop-blur-md border-t border-purple-500/20 flex items-center justify-between text-[10.5px] sm:text-[11px] font-mono text-white/90">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <button
                      type="button"
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 text-white flex items-center justify-center cursor-pointer transition-all shadow-sm"
                    >
                      {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 ml-0.5 fill-white" />}
                    </button>
                    <span className="text-purple-300">00:00:52:29</span>
                    <span className="text-[#B7B2CC]">/ 00:01:00:00</span>
                  </div>

                  <span className="hidden xl:inline-block text-[10px] text-[#B7B2CC] font-sans">
                    Drag slider to compare
                  </span>

                  <span className="px-1.5 py-0.5 rounded glass-badge text-[9.5px] sm:text-[10px]">
                    16:9
                  </span>
                </div>
              </div>

              {/* ================= DIRECTOR AI PANEL (Col 3 on desktop & tablet - Screenshot 1) ================= */}
              <div className="col-span-12 md:col-span-3 p-2.5 sm:p-3 lg:p-3.5 bg-transparent border-t md:border-t-0 border-purple-500/15 flex flex-col justify-between text-xs min-w-0">
                <div>
                  <div className="flex items-center gap-1.5 pb-2 mb-2 border-b border-purple-500/20">
                    <Bot className="w-3.5 h-3.5 text-purple-400" />
                    <span className="font-semibold text-white">Director</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 ml-auto shadow-xs" />
                  </div>

                  {/* Active Prompt in Editor */}
                  <div className="p-2 rounded-lg glass-inset text-[11px] text-white/90 leading-relaxed mb-2.5">
                    "Make this video more engaging and add relevant visual support based on understanding..."
                  </div>

                  {/* Activity Reasoning feedback (from Screenshot 1) */}
                  <div className="p-2 rounded-lg glass-inset text-[10px] font-mono text-purple-200 leading-tight space-y-1">
                    <div className="text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 shrink-0" />
                      <span>Cut 8s silence at 00:18</span>
                    </div>
                    <div className="text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 shrink-0" />
                      <span>Inserted B-roll on track-v2</span>
                    </div>
                    <div className="text-purple-200 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                      <span>Dynamic zoom cut at 00:52</span>
                    </div>
                  </div>

                  {/* Interactive Directives to experiment */}
                  <div className="mt-2.5 pt-2 border-t border-white/[0.08]">
                    <div className="text-[10px] text-[#A4A5B5] font-medium mb-1.5 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-purple-400" />
                      <span>Try Directives:</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      {[
                        { label: 'Cut silence & punch-in zoom', prompt: 'Cut 8s silence at intro and punch in with dynamic 1.1x zoom' },
                        { label: 'Insert B-roll on AI explanation', prompt: 'Add B-roll graphic overlay when speaker mentions AI timeline reasoning' },
                        { label: 'Add kinetic animated subtitles', prompt: 'Generate dynamic word-by-word highlighted captions with audio ducking' },
                      ].map((d, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setPromptText(d.prompt)}
                          className="text-left px-2 py-1 rounded bg-[#151930] hover:bg-[#1E2342] text-[#A4A5B5] hover:text-white text-[9.5px] border border-white/5 transition-colors cursor-pointer truncate"
                        >
                          • {d.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-2 text-[10px] text-[#737588] text-right">
                  Timeline synchronized
                </div>
              </div>

            </div>

            {/* ================= PRO VIDEO TIMELINE EDITOR (Matching Section 1) ================= */}
            <VideoTimelineLayout
              embedded={true}
              initialTime={52}
              totalDuration={65}
              clipDurationText="00:01:05:00"
            />

          </div>
        </div>
    </section>
  );
};

export default InteractiveDemoSection;
