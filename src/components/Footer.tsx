import React from 'react';

interface FooterProps {
  onOpenModal: (title: string, content: string) => void;
  onNavigateSection?: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenModal, onNavigateSection }) => {
  const handleLegalClick = (type: 'privacy' | 'terms') => {
    if (type === 'privacy') {
      onOpenModal(
        'Privacy Policy',
        'Bikin Video values your privacy. All raw footage, video scripts, audio tracks, and generated timeline edits remain 100% your intellectual property. We do not use your private content to train foundational public models without explicit consent. Video synthesis and project exports are encrypted at rest with industry-standard AES-256 protocols.'
      );
    } else {
      onOpenModal(
        'Terms of Service',
        'By using Bikin Video, you agree to direct responsible, original content creation. You retain 100% commercial distribution rights to all generated videos and exported XML sequences under your active tier. Video rendering is backed by dedicated GPU compute nodes with fair-use guidelines.'
      );
    }
  };

  const handleCompanyClick = (item: 'updates' | 'status' | 'about' | 'contact') => {
    if (item === 'updates') {
      onOpenModal(
        'Bikin Video Product Updates - v3.4 Director Engine',
        'What is new in Bikin Video v3.4:\n\n• Autonomous AI Video Director with reasoning feedback\n• Native Indonesian speech and colloquial slang parsing\n• Context-aware B-roll insertion on Track V2\n• Lossless XML & EDL export for Adobe Premiere Pro and DaVinci Resolve\n• Broadcast-grade speech isolator with automatic chillhop music ducking\n• 4K 60fps vertical shorts rendering'
      );
    } else if (item === 'status') {
      onOpenModal(
        'System Status - All GPU Clusters Operational',
        '• GPU Cloud Clusters: 99.99% Uptime (Asia-Jakarta, US-West, EU-Frankfurt)\n• Speech Semantic Parser: Online (Latency: 280ms)\n• Autonomous Director Engine: Online\n• Premiere XML Export Service: Online\n• Multi-track Timeline Mixer: Online'
      );
    } else if (item === 'contact') {
      onOpenModal(
        'Contact Bikin Video Team',
        'Have custom enterprise requirements or agency volume inquiries?\n\nEmail: contact@bikinvideo.ai\nPartnership: partner@bikinvideo.ai\nCreator Support: support@bikinvideo.ai\n\nOur Jakarta & international team responds within 2 business hours.'
      );
    } else {
      onOpenModal(
        'About Bikin Video',
        'Bikin Video was created with a single mission: "You direct. Bikin edits." We believe creators shouldn\'t spend entire weekends scrubbing timelines, trimming dead air, or hunting for stock B-roll. Bikin Video combines semantic video understanding with non-destructive multitrack timeline engineering to give creators the speed of AI with 100% creative control.'
      );
    }
  };

  const handleProductRoute = (routeName: string, sectionId: string) => {
    if (onNavigateSection) {
      onNavigateSection(sectionId);
    }
  };

  return (
    <footer className="relative pt-16 pb-16 border-t border-white/[0.08] bg-[#060812] z-10">
      <div className="page-container">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 sm:gap-10 mb-12">
          
          {/* Col 1: Brand & Positioning */}
          <div className="col-span-2 md:col-span-1 space-y-3">
            <div className="flex items-center gap-2.5">
              <img
                src="/brand-design/bikin-video-logo.png"
                alt="Bikin Video - Bikin Video. Jadi."
                className="h-10 sm:h-11 w-auto object-contain"
              />
            </div>
            <p className="text-xs text-[#A4A5B5] leading-relaxed">
              Your AI Video Director. You direct, Bikin edits. Raw footage into finished videos.
            </p>
            <div className="pt-2 text-[11px] font-mono text-purple-400">
              v3.4-director-engine
            </div>
          </div>

          {/* Col 2: Product Pages (Preserving SEO slugs) */}
          <div className="flex flex-col gap-2.5 text-xs">
            <span className="text-[11px] font-bold text-white uppercase tracking-wider mb-1">
              Products
            </span>
            <a
              href="/bikin-ai-video-editor/"
              onClick={(e) => {
                e.preventDefault();
                handleProductRoute('bikin-ai-video-editor', 'interactive-demo');
              }}
              className="text-[#A4A5B5] hover:text-white transition-colors"
            >
              AI Video Editor
            </a>
            <a
              href="/bikin-short/"
              onClick={(e) => {
                e.preventDefault();
                handleProductRoute('bikin-short', 'hero-demo');
              }}
              className="text-[#A4A5B5] hover:text-white transition-colors"
            >
              Bikin Short
            </a>
            <a
              href="/bikin-brand/"
              onClick={(e) => {
                e.preventDefault();
                handleProductRoute('bikin-brand', 'use-cases');
              }}
              className="text-[#A4A5B5] hover:text-white transition-colors"
            >
              Bikin Brand
            </a>
            <a
              href="/bikin-editor/"
              onClick={(e) => {
                e.preventDefault();
                handleProductRoute('bikin-editor', 'editor-control');
              }}
              className="text-[#A4A5B5] hover:text-white transition-colors"
            >
              Timeline Studio
            </a>
          </div>

          {/* Col 3: Use Cases */}
          <div className="flex flex-col gap-2.5 text-xs">
            <span className="text-[11px] font-bold text-white uppercase tracking-wider mb-1">
              Use Cases
            </span>
            <button
              type="button"
              onClick={() => handleProductRoute('creators', 'use-cases')}
              className="text-[#A4A5B5] hover:text-white transition-colors text-left cursor-pointer"
            >
              Content Creators
            </button>
            <button
              type="button"
              onClick={() => handleProductRoute('podcasts', 'use-cases')}
              className="text-[#A4A5B5] hover:text-white transition-colors text-left cursor-pointer"
            >
              Podcasters
            </button>
            <button
              type="button"
              onClick={() => handleProductRoute('marketing', 'use-cases')}
              className="text-[#A4A5B5] hover:text-white transition-colors text-left cursor-pointer"
            >
              Marketing Teams
            </button>
            <button
              type="button"
              onClick={() => handleProductRoute('agencies', 'use-cases')}
              className="text-[#A4A5B5] hover:text-white transition-colors text-left cursor-pointer"
            >
              Agencies & Studios
            </button>
          </div>

          {/* Col 4: Resources & Company */}
          <div className="flex flex-col gap-2.5 text-xs">
            <span className="text-[11px] font-bold text-white uppercase tracking-wider mb-1">
              Resources
            </span>
            <button
              type="button"
              onClick={() => handleCompanyClick('updates')}
              className="text-[#A4A5B5] hover:text-white transition-colors text-left cursor-pointer"
            >
              Changelog & Updates
            </button>
            <button
              type="button"
              onClick={() => handleCompanyClick('status')}
              className="text-[#A4A5B5] hover:text-white transition-colors text-left cursor-pointer"
            >
              System Status
            </button>
            <button
              type="button"
              onClick={() => handleCompanyClick('about')}
              className="text-[#A4A5B5] hover:text-white transition-colors text-left cursor-pointer"
            >
              About Us
            </button>
            <button
              type="button"
              onClick={() => handleCompanyClick('contact')}
              className="text-[#A4A5B5] hover:text-white transition-colors text-left cursor-pointer"
            >
              Contact Support
            </button>
          </div>

          {/* Col 5: Legal & Social */}
          <div className="flex flex-col gap-2.5 text-xs">
            <span className="text-[11px] font-bold text-white uppercase tracking-wider mb-1">
              Legal & Social
            </span>
            <button
              type="button"
              onClick={() => handleLegalClick('privacy')}
              className="text-[#A4A5B5] hover:text-white transition-colors text-left cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => handleLegalClick('terms')}
              className="text-[#A4A5B5] hover:text-white transition-colors text-left cursor-pointer"
            >
              Terms of Service
            </button>
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://discord.com"
                target="_blank"
                rel="noreferrer"
                className="text-[#A4A5B5] hover:text-white transition-colors"
              >
                Discord
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="text-[#A4A5B5] hover:text-white transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="text-[#A4A5B5] hover:text-white transition-colors"
              >
                X (Twitter)
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#737588]">
          <span>© {new Date().getFullYear()} Bikin Video Inc. All rights reserved.</span>
          <span className="mt-2 sm:mt-0 font-mono">
            Direct your AI editor with natural language · You direct. Bikin edits.
          </span>
        </div>
      </div>
    </footer>
  );
};
