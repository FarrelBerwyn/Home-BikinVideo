import React from 'react';
import { SectionLabel } from './SectionLabel';
import { GradientText } from './GradientText';
import { ScrollReveal } from './ScrollReveal';
import { ChevronRight, Instagram, Youtube, Facebook, Video } from 'lucide-react';
import { SocialOrbitalAtomBackground } from './SocialOrbitalAtomBackground';

interface SocialToolsSectionProps {
  onOpenTrial: () => void;
  onSelectPlatform: (platform: string) => void;
}

// Brand SVG icons for TikTok, Twitter (X), and Threads
const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.59-1.01-.01 2.62.02 5.24-.02 7.86-.08 2.04-.84 4.05-2.29 5.51-1.63 1.66-4.04 2.5-6.38 2.3-2.6-.19-5.02-1.69-6.23-3.99-1.2-2.26-1.04-5.18.42-7.27 1.34-1.92 3.69-3.03 6.07-2.92.11 0 .22.01.32.02.02 1.48-.04 2.96.02 4.44-.76-.09-1.55.08-2.2.49-.8.49-1.33 1.37-1.41 2.31-.1 1.18.49 2.37 1.5 2.98 1.05.65 2.45.62 3.49-.07.82-.54 1.33-1.48 1.36-2.47.05-4.52.02-9.05.03-13.57z" />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const ThreadsIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12.186 24c-3.567 0-6.425-1.18-8.264-3.414C2.18 18.448 1.25 15.395 1.25 11.8c0-3.642.946-6.685 2.738-8.804C5.818.823 8.683 0 12.247 0c3.58 0 6.46 1.05 8.328 3.037 1.868 1.986 2.801 4.793 2.775 8.12v.19h-3.67c-.01-2.404-.6-4.32-1.755-5.54-1.154-1.22-2.883-1.85-5.143-1.85-2.484 0-4.417.84-5.748 2.5C5.69 8.12 5.02 10.4 5.02 13.25c0 2.91.68 5.23 2.02 6.89 1.34 1.66 3.29 2.5 5.8 2.5 2.16 0 3.86-.63 5.06-1.87 1.2-1.24 1.82-3.05 1.84-5.38h-7.37v-3.4h11.04v.93c0 3.63-.98 6.54-2.91 8.65-1.93 2.11-4.8 3.43-8.27 3.43z" />
  </svg>
);

export const SocialToolsSection: React.FC<SocialToolsSectionProps> = ({
  onOpenTrial,
  onSelectPlatform,
}) => {
  const platforms = [
    {
      id: 'instagram',
      name: 'Instagram Reels',
      icon: Instagram,
      description: 'Transform Instagram Reels into engaging content by adding gameplay to captivate viewers.',
      aspectRatio: '9:16',
      resolution: '1080 x 1920',
    },
    {
      id: 'tiktok',
      name: 'Tiktok Videos',
      icon: TikTokIcon,
      isCustomSvg: true,
      description: 'Elevate your TikTok videos by adding gameplay to create captivating and entertaining content.',
      aspectRatio: '9:16',
      resolution: '1080 x 1920',
    },
    {
      id: 'youtube',
      name: 'Youtube Shorts',
      icon: Youtube,
      description: 'Enhance your YouTube Shorts by adding gameplay to create dynamic and engaging content.',
      aspectRatio: '9:16',
      resolution: '1080 x 1920',
    },
    {
      id: 'facebook',
      name: 'Facebook Reels',
      icon: Facebook,
      description: 'Transform Facebook Reels into engaging content by adding gameplay to captivate your viewers.',
      aspectRatio: '9:16',
      resolution: '1080 x 1920',
    },
    {
      id: 'twitter',
      name: 'Twitter (X) videos',
      icon: XIcon,
      isCustomSvg: true,
      description: 'Enhance your X videos by incorporating gameplay to grab attention and keep viewers hooked.',
      aspectRatio: '16:9',
      resolution: '1920 x 1080',
    },
    {
      id: 'threads',
      name: 'Thread Videos',
      icon: ThreadsIcon,
      isCustomSvg: true,
      description: 'Boost your Thread videos with gameplay! Engaging visuals captivate viewers and enhance your content.',
      aspectRatio: '1:1',
      resolution: '1080 x 1080',
    },
  ];

  return (
    <section id="social-tools" className="section--orbit-bleed relative pt-16 sm:pt-20 md:pt-24 pb-12 sm:pb-16 z-10 overflow-hidden">
      {/* Animated Circular Orbital Atom Background (Exception: full orbital layout preserved) */}
      <SocialOrbitalAtomBackground />

      <div className="container-wide relative z-30">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <ScrollReveal delay={0}>
            <SectionLabel label="Social Tools" className="mb-4 sm:mb-5" />
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <h2 className="text-[32px] sm:text-[42px] md:text-[50px] font-bold text-[#F1F0F6] tracking-tight leading-[1.12] mb-5 text-balance">
              Powerful tool for
              <br className="hidden sm:inline" /> boosting social media <GradientText glow>growth</GradientText>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <p className="text-[15px] sm:text-[17px] text-[#A4A5B5] leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-9">
              Produce unlimited short videos simultaneously with automatic generation of captions, effects, backgrounds, and music.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <button
              type="button"
              onClick={onOpenTrial}
              className="group inline-flex items-center gap-2 px-6 sm:px-7 py-3 rounded-full text-[14px] font-semibold text-white bg-gradient-to-r from-[#8B35E8] to-[#A855F7] hover:from-[#9D44F2] hover:to-[#B352FA] active:scale-95 transition-all duration-200 cursor-pointer shadow-[0_4px_20px_rgba(139,53,232,0.4)]"
            >
              <span>Try now</span>
              <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
          </ScrollReveal>
        </div>

        {/* 6 Social Cards Grid (3 cols x 2 rows) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {platforms.map((platform, idx) => {
            const IconComponent = platform.icon;
            return (
              <ScrollReveal key={platform.id} delay={100 + idx * 70} className="h-full">
                <div
                  onClick={() => onSelectPlatform(platform.name)}
                  className="group relative h-full flex flex-col justify-between p-6 sm:p-7 rounded-2xl glass-card glass-card-hover cursor-pointer"
                >
                  {/* Subtle corner crosshair accents */}
                  <div className="absolute top-2.5 left-2.5 w-1.5 h-1.5 border-t border-l border-purple-300/40 group-hover:border-purple-300 transition-colors" />
                  <div className="absolute top-2.5 right-2.5 w-1.5 h-1.5 border-t border-r border-purple-300/40 group-hover:border-purple-300 transition-colors" />
                  <div className="absolute bottom-2.5 left-2.5 w-1.5 h-1.5 border-b border-l border-purple-300/40 group-hover:border-purple-300 transition-colors" />
                  <div className="absolute bottom-2.5 right-2.5 w-1.5 h-1.5 border-b border-r border-purple-300/40 group-hover:border-purple-300 transition-colors" />

                  {/* Top: Icon + Faint Wireframe Lines */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-12 h-12 rounded-xl glass-icon-box flex items-center justify-center text-purple-200 group-hover:scale-105 group-hover:text-white transition-all duration-300">
                      <IconComponent />
                    </div>

                    {/* Subtle wireframe telemetry lines */}
                    <div className="flex flex-col gap-1 w-24 opacity-30 group-hover:opacity-60 transition-opacity">
                      <div className="h-[1.5px] bg-purple-300 w-full" />
                      <div className="h-[1.5px] bg-purple-300 w-3/4" />
                      <div className="h-[1.5px] bg-purple-300 w-1/2" />
                    </div>
                  </div>

                  {/* Bottom: Title & Description */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-[17px] sm:text-[18px] font-bold text-white group-hover:text-purple-200 transition-colors">
                        {platform.name}
                      </h3>
                      <span className="text-[10px] font-mono glass-badge px-2 py-0.5 rounded">
                        {platform.aspectRatio}
                      </span>
                    </div>

                    <p className="text-[13px] text-[#B7B2CC] group-hover:text-white leading-relaxed transition-colors">
                      {platform.description}
                    </p>

                    <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between text-[11px] text-[#B7B2CC]">
                      <span>Click to load demo preset</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-purple-300" />
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
};
