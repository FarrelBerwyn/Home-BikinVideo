import React from 'react';
import { Instagram, Youtube, Play, Sparkles, Video } from 'lucide-react';

// Brand TikTok SVG icon
const TikTokMiniIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.59-1.01-.01 2.62.02 5.24-.02 7.86-.08 2.04-.84 4.05-2.29 5.51-1.63 1.66-4.04 2.5-6.38 2.3-2.6-.19-5.02-1.69-6.23-3.99-1.2-2.26-1.04-5.18.42-7.27 1.34-1.92 3.69-3.03 6.07-2.92.11 0 .22.01.32.02.02 1.48-.04 2.96.02 4.44-.76-.09-1.55.08-2.2.49-.8.49-1.33 1.37-1.41 2.31-.1 1.18.49 2.37 1.5 2.98 1.05.65 2.45.62 3.49-.07.82-.54 1.33-1.48 1.36-2.47.05-4.52.02-9.05.03-13.57z" />
  </svg>
);

export const SocialOrbitalAtomBackground: React.FC = () => {
  return (
    <div
      aria-hidden="false"
      className="absolute top-[390px] sm:top-[420px] md:top-[450px] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[840px] h-[840px] pointer-events-none select-none z-0 flex items-center justify-center overflow-visible"
    >
      {/* Ambient Central Radial Glow */}
      <div
        className="absolute w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.22) 0%, rgba(139, 53, 232, 0.08) 40%, transparent 72%)',
          filter: 'blur(32px)',
        }}
      />

      {/* Outer ambient aura spreading behind heading and cards */}
      <div
        className="absolute w-[780px] h-[780px] rounded-full pointer-events-none opacity-50"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(124, 58, 237, 0.12) 0%, rgba(88, 28, 135, 0.04) 50%, transparent 75%)',
          filter: 'blur(45px)',
        }}
      />

      {/* Atom Responsive Scaler Container */}
      <div className="relative w-[820px] h-[820px] flex items-center justify-center scale-[0.52] sm:scale-[0.68] md:scale-[0.82] lg:scale-100 transition-transform duration-500 origin-center">

        {/* ========================================================================= */}
        {/* ORBIT 1: Innermost Ring (Diameter 320px, Radius 160px, Spins Counter 30s) */}
        {/* ========================================================================= */}
        <div
          className="absolute rounded-full border border-purple-400/25 animate-orbit-1 pointer-events-none"
          style={{
            width: '320px',
            height: '320px',
            boxShadow: '0 0 16px rgba(168, 85, 247, 0.15), inset 0 0 16px rgba(168, 85, 247, 0.08)',
          }}
        >
          {/* Node 1A: Timothy Ronald (Angle 45deg, Radius 160px) */}
          <div
            className="absolute top-1/2 left-1/2"
            style={{
              transform: 'translate(-50%, -50%) rotate(45deg) translate(160px) rotate(-45deg)',
            }}
          >
            <div className="animate-counter-orbit-1 pointer-events-auto">
              <a
                href="https://www.tiktok.com/@timothyronald22/video/7501254346877766930"
                target="_blank"
                rel="noopener noreferrer"
                title="Timothy Ronald — Konten Finansial & Mindset (Tonton di TikTok)"
                className="group block w-11 h-11 rounded-2xl overflow-hidden bg-[#0D111E] border border-purple-400/30 p-0.5 cursor-pointer transition-all duration-300 hover:scale-120 hover:border-purple-300 hover:shadow-[0_8px_20px_rgba(0,0,0,0.8)] shadow-[0_4px_12px_rgba(0,0,0,0.7)]"
              >
                <img
                  src="/thumbnails/timothy_ronald.jpg"
                  alt="Timothy Ronald"
                  className="w-full h-full object-cover rounded-[13px] transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
              </a>
            </div>
          </div>

          {/* Node 1B: TikTok Badge (Angle 225deg, Radius 160px) */}
          <div
            className="absolute top-1/2 left-1/2"
            style={{
              transform: 'translate(-50%, -50%) rotate(225deg) translate(160px) rotate(-225deg)',
            }}
          >
            <div className="animate-counter-orbit-1 pointer-events-auto">
              <a
                href="https://www.tiktok.com/"
                target="_blank"
                rel="noopener noreferrer"
                title="TikTok Platform — Integrasi Video Pendek Bikin Video"
                className="group flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-[#121424] to-[#0A0C16] border border-violet-400/30 text-white cursor-pointer transition-all duration-300 hover:scale-120 hover:border-violet-300 hover:shadow-[0_6px_16px_rgba(0,0,0,0.7)] shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
              >
                <TikTokMiniIcon />
              </a>
            </div>
          </div>

          {/* Subtle node accent on Orbit 1 */}
          <div
            className="absolute top-1/2 left-1/2"
            style={{
              transform: 'translate(-50%, -50%) rotate(135deg) translate(160px) rotate(-135deg)',
            }}
          >
            <div className="w-2 h-2 rounded-full bg-purple-300/80" />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ORBIT 2: Ring 2 (Diameter 480px, Radius 240px, Spins Clockwise 42s)       */}
        {/* ========================================================================= */}
        <div
          className="absolute rounded-full border border-violet-300/20 animate-orbit-2 pointer-events-none"
          style={{
            width: '480px',
            height: '480px',
          }}
        >
          {/* Node 2A: Raymond Chin (Angle 120deg, Radius 240px) */}
          <div
            className="absolute top-1/2 left-1/2"
            style={{
              transform: 'translate(-50%, -50%) rotate(120deg) translate(240px) rotate(-120deg)',
            }}
          >
            <div className="animate-counter-orbit-2 pointer-events-auto">
              <a
                href="https://www.tiktok.com/@raymondchins/video/7561775744150555925"
                target="_blank"
                rel="noopener noreferrer"
                title="Raymond Chin — Modal HP Bisa Menghasilkan (Tonton di TikTok)"
                className="group block w-12 h-12 rounded-full overflow-hidden bg-[#0D111E] border border-amber-400/40 p-0.5 cursor-pointer transition-all duration-300 hover:scale-120 hover:border-amber-300 hover:shadow-[0_8px_20px_rgba(0,0,0,0.8)] shadow-[0_4px_12px_rgba(0,0,0,0.7)]"
              >
                <img
                  src="/thumbnails/raymond_chin_modal_hp.jpg"
                  alt="Raymond Chin"
                  className="w-full h-full object-cover rounded-full transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
              </a>
            </div>
          </div>

          {/* Node 2B: Instagram Reels Badge (Angle 300deg, Radius 240px) */}
          <div
            className="absolute top-1/2 left-1/2"
            style={{
              transform: 'translate(-50%, -50%) rotate(300deg) translate(240px) rotate(-300deg)',
            }}
          >
            <div className="animate-counter-orbit-2 pointer-events-auto">
              <a
                href="https://www.instagram.com/reels/"
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram Reels — Format Video Pendek Viral"
                className="group flex items-center justify-center w-10 h-10 rounded-[14px] bg-gradient-to-tr from-[#fd5949]/80 via-[#d6249f]/80 to-[#285AEB]/80 border border-pink-400/30 text-white backdrop-blur-sm cursor-pointer transition-all duration-300 hover:scale-120 hover:border-pink-300 hover:shadow-[0_6px_16px_rgba(0,0,0,0.7)] shadow-[0_3px_10px_rgba(0,0,0,0.6)]"
              >
                <Instagram className="w-5 h-5 text-white transition-transform duration-300 group-hover:scale-110" />
              </a>
            </div>
          </div>

          {/* Node 2C: Sparkles AI Badge (Angle 15deg, Radius 240px) */}
          <div
            className="absolute top-1/2 left-1/2"
            style={{
              transform: 'translate(-50%, -50%) rotate(15deg) translate(240px) rotate(-15deg)',
            }}
          >
            <div className="animate-counter-orbit-2 pointer-events-auto">
              <a
                href="#interactive-demo"
                title="AI Director Clips — Coba generator demo interaktif"
                className="group flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#151930]/90 border border-purple-400/30 text-purple-200 text-[10.5px] font-medium backdrop-blur-sm cursor-pointer transition-all duration-300 hover:scale-115 hover:border-purple-300 hover:shadow-[0_6px_16px_rgba(0,0,0,0.7)] shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-300 transition-transform duration-300 group-hover:rotate-12" />
                <span>AI Clips</span>
              </a>
            </div>
          </div>

          {/* Subtle node accent on Orbit 2 */}
          <div
            className="absolute top-1/2 left-1/2"
            style={{
              transform: 'translate(-50%, -50%) rotate(210deg) translate(240px) rotate(-210deg)',
            }}
          >
            <div className="w-2.5 h-2.5 rounded-full bg-violet-300/80" />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ORBIT 3: Ring 3 (Diameter 640px, Radius 320px, Spins Clockwise 54s)       */}
        {/* ========================================================================= */}
        <div
          className="absolute rounded-full border border-purple-300/18 animate-orbit-3 pointer-events-none"
          style={{
            width: '640px',
            height: '640px',
          }}
        >
          {/* Node 3A: Gabriel Rey (Angle 80deg, Radius 320px) */}
          <div
            className="absolute top-1/2 left-1/2"
            style={{
              transform: 'translate(-50%, -50%) rotate(80deg) translate(320px) rotate(-80deg)',
            }}
          >
            <div className="animate-counter-orbit-3 pointer-events-auto">
              <a
                href="https://www.tiktok.com/@gabrielrey99/video/7555448923347848460"
                target="_blank"
                rel="noopener noreferrer"
                title="Gabriel Rey — Personal Branding & Creator Growth (Tonton di TikTok)"
                className="group block w-12 h-12 rounded-2xl overflow-hidden bg-[#0D111E] border border-blue-400/40 p-0.5 cursor-pointer transition-all duration-300 hover:scale-120 hover:border-blue-300 hover:shadow-[0_8px_20px_rgba(0,0,0,0.8)] shadow-[0_4px_14px_rgba(0,0,0,0.7)]"
              >
                <img
                  src="/thumbnails/gabriel_rey.jpg"
                  alt="Gabriel Rey"
                  className="w-full h-full object-cover rounded-[14px] transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
              </a>
            </div>
          </div>

          {/* Node 3B: YouTube Shorts Badge (Angle 250deg, Radius 320px) */}
          <div
            className="absolute top-1/2 left-1/2"
            style={{
              transform: 'translate(-50%, -50%) rotate(250deg) translate(320px) rotate(-250deg)',
            }}
          >
            <div className="animate-counter-orbit-3 pointer-events-auto">
              <a
                href="https://www.youtube.com/shorts/"
                target="_blank"
                rel="noopener noreferrer"
                title="YouTube Shorts — Distribusi Video Vertikal"
                className="group flex items-center justify-center w-10 h-10 rounded-full bg-[#18101E] border border-red-500/40 text-red-400 cursor-pointer transition-all duration-300 hover:scale-120 hover:border-red-400 hover:shadow-[0_6px_16px_rgba(0,0,0,0.7)] shadow-[0_3px_10px_rgba(0,0,0,0.6)]"
              >
                <Youtube className="w-5 h-5 text-red-400 transition-transform duration-300 group-hover:scale-110" />
              </a>
            </div>
          </div>

          {/* Node 3C: Dery Kasisolusi (Angle 170deg, Radius 320px) */}
          <div
            className="absolute top-1/2 left-1/2"
            style={{
              transform: 'translate(-50%, -50%) rotate(170deg) translate(320px) rotate(-170deg)',
            }}
          >
            <div className="animate-counter-orbit-3 pointer-events-auto">
              <a
                href="https://urlebird.com/video/ilmu-dari-2010-membangun-bisnis-7688265004381981972/"
                target="_blank"
                rel="noopener noreferrer"
                title="Dery Kasisolusi — Ilmu Membangun Bisnis (Tonton di TikTok/Urlebird)"
                className="group block w-11 h-11 rounded-full overflow-hidden bg-[#0D111E] border border-pink-400/40 p-0.5 cursor-pointer transition-all duration-300 hover:scale-120 hover:border-pink-300 hover:shadow-[0_8px_20px_rgba(0,0,0,0.8)] shadow-[0_4px_12px_rgba(0,0,0,0.7)]"
              >
                <img
                  src="/thumbnails/dery_kasisolusi.jpg"
                  alt="Dery Kasisolusi"
                  className="w-full h-full object-cover rounded-full transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
              </a>
            </div>
          </div>

          {/* Node 3D: 9:16 Portrait Badge (Angle 340deg, Radius 320px) */}
          <div
            className="absolute top-1/2 left-1/2"
            style={{
              transform: 'translate(-50%, -50%) rotate(340deg) translate(320px) rotate(-340deg)',
            }}
          >
            <div className="animate-counter-orbit-3 pointer-events-auto">
              <a
                href="https://www.tiktok.com/@timothyronald22/video/7501254346877766930"
                target="_blank"
                rel="noopener noreferrer"
                title="Format 9:16 — Rasio Standar Video Vertikal"
                className="group flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#14182E]/90 border border-purple-400/30 text-purple-200 text-[10.5px] font-mono backdrop-blur-sm cursor-pointer transition-all duration-300 hover:scale-115 hover:border-purple-300 hover:shadow-[0_6px_16px_rgba(0,0,0,0.7)] shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
              >
                <Video className="w-3.5 h-3.5 text-purple-300" />
                <span>9:16 Viral</span>
              </a>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ORBIT 4: Outermost Ring (Diameter 800px, Radius 400px, Spins Counter 66s) */}
        {/* ========================================================================= */}
        <div
          className="absolute rounded-full border border-purple-400/18 animate-orbit-4 pointer-events-none"
          style={{
            width: '800px',
            height: '800px',
          }}
        >
          {/* Node 4A: Raymond AI (Angle 25deg, Radius 400px) */}
          <div
            className="absolute top-1/2 left-1/2"
            style={{
              transform: 'translate(-50%, -50%) rotate(25deg) translate(400px) rotate(-25deg)',
            }}
          >
            <div className="animate-counter-orbit-4 pointer-events-auto">
              <a
                href="https://www.tiktok.com/@raymondchins/video/7692302310621416712"
                target="_blank"
                rel="noopener noreferrer"
                title="Raymond Chin — Peluang AI untuk Kreator (Tonton di TikTok)"
                className="group block w-12 h-12 rounded-2xl overflow-hidden bg-[#0D111E] border border-purple-400/40 p-0.5 cursor-pointer transition-all duration-300 hover:scale-120 hover:border-purple-300 hover:shadow-[0_8px_20px_rgba(0,0,0,0.8)] shadow-[0_4px_14px_rgba(0,0,0,0.7)]"
              >
                <img
                  src="/thumbnails/raymond_peluang_ai.jpg"
                  alt="Raymond Chin AI"
                  className="w-full h-full object-cover rounded-[14px] transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
              </a>
            </div>
          </div>

          {/* Node 4B: Video Camera Clip Badge (Angle 115deg, Radius 400px) */}
          <div
            className="absolute top-1/2 left-1/2"
            style={{
              transform: 'translate(-50%, -50%) rotate(115deg) translate(400px) rotate(-115deg)',
            }}
          >
            <div className="animate-counter-orbit-4 pointer-events-auto">
              <a
                href="#interactive-demo"
                title="Mulai Edit Video Otomatis di Bikin Video"
                className="group flex items-center justify-center w-10 h-10 rounded-xl bg-[#14172C]/90 border border-violet-400/30 text-violet-300 backdrop-blur-sm cursor-pointer transition-all duration-300 hover:scale-120 hover:border-violet-300 hover:shadow-[0_6px_16px_rgba(0,0,0,0.7)] shadow-[0_3px_10px_rgba(0,0,0,0.6)]"
              >
                <Play className="w-4 h-4 ml-0.5 fill-violet-300 text-violet-300 transition-transform duration-300 group-hover:scale-110" />
              </a>
            </div>
          </div>

          {/* Node 4C: Multi-platform Network Badge (Angle 205deg, Radius 400px) */}
          <div
            className="absolute top-1/2 left-1/2"
            style={{
              transform: 'translate(-50%, -50%) rotate(205deg) translate(400px) rotate(-205deg)',
            }}
          >
            <div className="animate-counter-orbit-4 pointer-events-auto">
              <a
                href="#social-tools"
                title="Multi-Platform Video Growth Ecosystem"
                className="group flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#12162C]/90 border border-purple-400/30 text-purple-200 text-[11px] font-semibold backdrop-blur-sm cursor-pointer transition-all duration-300 hover:scale-115 hover:border-purple-300 hover:shadow-[0_6px_16px_rgba(0,0,0,0.7)] shadow-[0_3px_10px_rgba(0,0,0,0.6)]"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Multi-Platform Sync</span>
              </a>
            </div>
          </div>

          {/* Node 4D: Subtle node accent on Orbit 4 (Angle 295deg) */}
          <div
            className="absolute top-1/2 left-1/2"
            style={{
              transform: 'translate(-50%, -50%) rotate(295deg) translate(400px) rotate(-295deg)',
            }}
          >
            <div className="w-2.5 h-2.5 rounded-full bg-purple-300/80" />
          </div>
        </div>

      </div>
    </div>
  );
};
