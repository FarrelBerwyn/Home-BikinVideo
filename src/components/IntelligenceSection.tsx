import React, { useState } from 'react';
import { SectionLabel } from './SectionLabel';
import { GradientText } from './GradientText';
import { CreatorVideoCanvas } from './CreatorVideoCanvas';
import {
  Sparkles,
  Layers,
  CheckCircle2,
  FileText,
  Eye,
  Sliders,
  ChevronRight,
} from 'lucide-react';

interface SceneData {
  id: number;
  timecode: string;
  title: string;
  summary: string;
  transcript: string;
  highlightWords: string[];
  bestTake: boolean;
  decisionReason: string;
  visualTreatment: 'B-ROLL' | 'MOTION OVERLAY' | 'UI DEMO' | 'FULLSCREEN' | 'SPATIAL COMPOSITE' | 'NONE';
  confidenceScore: string;
}

const SCENES: SceneData[] = [
  {
    id: 1,
    timecode: '00:00 - 00:18',
    title: 'Scene 01: The Attention Hook',
    summary: 'Opening statement introducing the shift in modern video editing workflows.',
    transcript: '“Banyak creator menghabiskan 8 jam hanya untuk potong footage kasar. Padahal esensinya bukan motong, tapi storytelling.”',
    highlightWords: ['8 jam', 'potong footage', 'storytelling'],
    bestTake: true,
    decisionReason: 'High vocal energy and clear thesis. Cut 2.4s initial microphone rustle; applied 1.15x punch-in zoom for immediate hook.',
    visualTreatment: 'MOTION OVERLAY',
    confidenceScore: '98.4%',
  },
  {
    id: 2,
    timecode: '00:18 - 00:34',
    title: 'Scene 02: The Real Struggle',
    summary: 'Speaker explains the bottleneck of manual dead-air trimming and pacing.',
    transcript: '“Ketika lo harus ngecek timeline detik demi detik, kreativitas lo abis di teknis daripada di ide kreatif.”',
    highlightWords: ['timeline detik demi detik', 'kreativitas lo abis'],
    bestTake: true,
    decisionReason: 'Trimming 3 hesitation pauses. Inserted subtle low-pass audio filter to accentuate voice clarity.',
    visualTreatment: 'NONE',
    confidenceScore: '96.2%',
  },
  {
    id: 3,
    timecode: '00:34 - 00:52',
    title: 'Scene 03: How AI Director Solves It',
    summary: 'Explains how Bikin Video understands context rather than applying random templates.',
    transcript: '“Bikin Video bekerja layaknya seorang sutradara. Dia mengerti konteks cerita, merencanakan cut, dan mengeksekusi b-roll otomatis.”',
    highlightWords: ['layaknya seorang sutradara', 'mengerti konteks cerita', 'eksekusi b-roll'],
    bestTake: true,
    decisionReason: 'High retention potential. Inserted B-roll overlay on track-v2 with synchronized audio ducking (-14dB).',
    visualTreatment: 'B-ROLL',
    confidenceScore: '99.1%',
  },
  {
    id: 4,
    timecode: '00:52 - 01:00',
    title: 'Scene 04: The Call to Action',
    summary: 'Final punchline on creative director ownership and workflow export.',
    transcript: '“You direct, Bikin edits. Lo tetap pegang kendali kreatif penuh atas timeline lo.”',
    highlightWords: ['You direct, Bikin edits', 'kendali kreatif penuh'],
    bestTake: true,
    decisionReason: 'Crisp sign-off with clear brand proposition. Scheduled final crossfade and kinetic subtitle badge.',
    visualTreatment: 'FULLSCREEN',
    confidenceScore: '97.8%',
  },
];

const TREATMENTS = [
  'B-ROLL',
  'MOTION OVERLAY',
  'UI DEMO',
  'FULLSCREEN',
  'SPATIAL COMPOSITE',
  'NONE',
] as const;

export const IntelligenceSection: React.FC = () => {
  const [selectedSceneId, setSelectedSceneId] = useState<number>(3);
  const activeScene = SCENES.find((s) => s.id === selectedSceneId) || SCENES[0];

  return (
    <section id="ai-intelligence" className="relative py-10 sm:py-14 z-10">
      <div className="page-container">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <SectionLabel label="Cognitive Video Understanding" className="mb-3.5" />
          <h2 className="text-[30px] sm:text-[42px] md:text-[50px] font-extrabold text-[#F1F0F6] tracking-tight leading-[1.12] mb-4 text-balance">
            AI That Understands the <GradientText glow>Story Behind Footage.</GradientText>
          </h2>
          <p className="text-[15px] sm:text-[17px] text-[#A4A5B5] leading-relaxed max-w-2xl mx-auto">
            Go beyond automatic clipping. Bikin Video understands scenes, evaluates speaker intent, and assigns the exact visual treatment required by the story.
          </p>
        </div>

        {/* ================= 2-COLUMN INTELLIGENCE STAGE ================= */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-8 items-stretch">
          
          {/* Left Column: Live Video Canvas & Scene Timeline (Col 1-7) */}
          <div className="col-span-12 md:col-span-7 lg:col-span-7 flex flex-col justify-between rounded-2xl md:rounded-3xl glass-panel overflow-hidden p-3.5 sm:p-4 lg:p-5">
            {/* Video Viewport */}
            <div className="relative rounded-2xl overflow-hidden bg-black aspect-video mb-4 border border-white/[0.08]">
              <CreatorVideoCanvas
                isPlaying={true}
                isAfter={true}
                zoomLevel={activeScene.id === 1 ? 'punch-in' : 'normal'}
                showCaptions={true}
                showBrollOverlay={activeScene.visualTreatment === 'B-ROLL'}
              />

              {/* Active Scene Overlay Badge */}
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur border border-white/10 text-xs font-mono text-purple-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                <span>{activeScene.title}</span>
                <span className="text-[#B7B2CC]">({activeScene.timecode})</span>
              </div>
            </div>

            {/* Interactive Scene Selector Buttons */}
            <div>
              <div className="text-[11px] font-medium text-[#B7B2CC] uppercase tracking-wider mb-2">
                Click to inspect scene understanding:
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {SCENES.map((scene) => (
                  <button
                    key={scene.id}
                    type="button"
                    onClick={() => setSelectedSceneId(scene.id)}
                    className={`p-2.5 rounded-xl text-left transition-all cursor-pointer ${
                      selectedSceneId === scene.id
                        ? 'glass-card-selected'
                        : 'glass-card glass-card-hover'
                    }`}
                  >
                    <div className="text-[10px] font-mono text-[#B7B2CC] mb-1">
                      {scene.timecode}
                    </div>
                    <div className="text-xs font-bold text-white truncate">
                      {scene.title.split(':')[1] || scene.title}
                    </div>
                    <div className="mt-1 flex items-center gap-1 text-[10px] text-purple-300 font-mono">
                      <span>{scene.visualTreatment}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Grounded Evidence Panel (Col 8-12) */}
          <div className="col-span-12 md:col-span-5 lg:col-span-5 flex flex-col justify-between p-4 sm:p-5 lg:p-6 rounded-2xl md:rounded-3xl glass-panel">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-purple-400" />
                  <span className="font-bold text-white text-sm">Editorial Evidence Panel</span>
                </div>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/20">
                  Confidence: {activeScene.confidenceScore}
                </span>
              </div>

              {/* Transcript with Highlighted Keywords */}
              <div className="mb-4">
                <span className="block text-[11px] font-medium text-[#B7B2CC] uppercase tracking-wider mb-1.5">
                  Semantic Audio Transcript
                </span>
                <div className="p-3.5 rounded-xl glass-inset text-xs text-[#E1E0E8] leading-relaxed italic">
                  {activeScene.transcript}
                </div>
              </div>

              {/* Editorial Reason for Decision */}
              <div className="mb-4">
                <span className="block text-[11px] font-medium text-[#B7B2CC] uppercase tracking-wider mb-1.5">
                  Why This Decision Was Made
                </span>
                <div className="p-3.5 rounded-xl glass-inset text-xs text-white/95 leading-relaxed">
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Best Take Selected</span>
                  </div>
                  <p>{activeScene.decisionReason}</p>
                </div>
              </div>

              {/* Visual Treatment Decision Matrix */}
              <div>
                <span className="block text-[11px] font-medium text-[#737588] uppercase tracking-wider mb-2">
                  Assigned Visual Treatment
                </span>
                <div className="grid grid-cols-3 gap-1.5">
                  {TREATMENTS.map((treatment) => {
                    const isSelected = activeScene.visualTreatment === treatment;
                    return (
                      <div
                        key={treatment}
                        className={`p-2 rounded-lg text-center font-mono text-[10px] font-bold transition-all ${
                          isSelected
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md ring-1 ring-white/30'
                            : 'bg-[#121526] text-[#737588] border border-white/5 opacity-60'
                        }`}
                      >
                        {treatment}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-white/[0.08] text-[11px] text-[#A4A5B5]">
              Every treatment is grounded in natural language reasoning, rendered directly onto non-destructive timeline tracks.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
