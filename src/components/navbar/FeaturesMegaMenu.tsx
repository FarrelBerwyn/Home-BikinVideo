import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import {
  FeatureItem,
  MAIN_PRODUCTS,
  AI_TOOLS,
  WORKFLOWS_INTEGRATIONS,
} from './navData';

interface FeaturesMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
  onOpenFeatureModal?: (feature: FeatureItem) => void;
}

/**
 * Main Product Card (Column 1)
 * Enhanced visual hierarchy with prominent icon, gradient border, and spacious layout
 */
const MainProductCard: React.FC<{
  item: FeatureItem;
  onClick: () => void;
}> = ({ item, onClick }) => {
  const IconComponent = item.icon;

  const cardContent = (
    <>
      {/* Subtle hover gradient glow inside card */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/[0.12] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

      {/* Prominent Square Icon Container */}
      <div className="w-[38px] h-[38px] rounded-[10px] bg-gradient-to-br from-[#8B35E8]/30 via-[#6366F1]/20 to-[#120d2b] border border-purple-400/35 group-hover:border-purple-300/60 flex items-center justify-center shrink-0 text-purple-200 group-hover:text-white transition-all duration-200 shadow-[0_2px_10px_rgba(139,53,232,0.22)] group-hover:shadow-[0_4px_16px_rgba(168,85,247,0.4)] group-hover:scale-[1.04]">
        {item.isCustomIcon && item.customIconLabel ? (
          <span className="text-[11px] font-bold tracking-tight text-white select-none">
            {item.customIconLabel}
          </span>
        ) : (
          <IconComponent className="w-[18px] h-[18px]" />
        )}
      </div>

      {/* Text Container */}
      <div className="flex-1 min-w-0 pt-0 relative z-10">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[13px] font-semibold text-[#F1F0F6] group-hover:text-white tracking-tight leading-snug">
            {item.title}
          </span>
          {item.badge && (
            <span
              className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-[4px] leading-none shrink-0 ${
                item.badge === 'Core'
                  ? 'bg-[#321080]/90 text-purple-200 border border-purple-400/40 shadow-xs'
                  : item.badge === 'New'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-[#8B35E8]/25 text-[#D8B4FE] border border-purple-400/35'
              }`}
            >
              {item.badge}
            </span>
          )}
        </div>
        <p className="text-[11.5px] text-[#A4A5B5] group-hover:text-[#D1D2DE] leading-[1.35] mt-0.5 transition-colors">
          {item.description}
        </p>
      </div>

      {/* Subtle directional chevron indicator on hover */}
      <ArrowRight className="w-3.5 h-3.5 text-purple-300/70 group-hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-180 shrink-0 mt-1 mr-0.5 group-hover:translate-x-0.5" />
    </>
  );

  const cardClassName = "group w-full flex items-start gap-3 p-2.5 rounded-[14px] bg-[rgba(16,14,35,0.45)] hover:bg-[rgba(30,22,65,0.65)] border border-purple-500/18 hover:border-purple-400/45 transition-all duration-200 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-400/40 relative overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] hover:shadow-[0_8px_20px_-6px_rgba(139,53,232,0.25),inset_0_1px_1.5px_rgba(255,255,255,0.12)]";

  if (item.href) {
    return (
      <a
        href={item.href}
        className={cardClassName}
      >
        {cardContent}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={cardClassName}
    >
      {cardContent}
    </button>
  );
};

/**
 * Standard Feature Card (Column 2 & 3)
 * Streamlined item with clear icon, title, badge, and crisp description
 */
const StandardFeatureCard: React.FC<{
  item: FeatureItem;
  onClick: () => void;
}> = ({ item, onClick }) => {
  const IconComponent = item.icon;

  return (
    <button
      type="button"
      onClick={onClick}
      className="group w-full flex items-start gap-2.5 px-2.5 py-1.5 rounded-[10px] hover:bg-purple-500/10 border border-transparent hover:border-purple-400/25 transition-all duration-150 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-400/30"
    >
      {/* Square Icon Container */}
      <div className="w-[30px] h-[30px] rounded-[8px] bg-purple-950/60 group-hover:bg-[#8B35E8]/25 border border-purple-400/20 group-hover:border-purple-400/50 flex items-center justify-center shrink-0 text-purple-300 group-hover:text-white transition-all duration-150 mt-0.5 shadow-xs">
        {item.isCustomIcon && item.customIconLabel ? (
          <span className="text-[10px] font-bold tracking-tight text-[#E5E5E5] group-hover:text-white select-none">
            {item.customIconLabel}
          </span>
        ) : (
          <IconComponent className="w-[15px] h-[15px]" />
        )}
      </div>

      {/* Text Container */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[12.5px] font-medium text-[#EDEDED] group-hover:text-white tracking-tight leading-snug">
            {item.title}
          </span>
          {item.badge && (
            <span
              className={`text-[8.5px] font-medium px-1.5 py-0.5 rounded-[4px] leading-none shrink-0 ${
                item.badge === 'New'
                  ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/25'
                  : 'bg-[#8B35E8]/25 text-[#D8B4FE] border border-purple-400/30'
              }`}
            >
              {item.badge}
            </span>
          )}
        </div>
        <p className="text-[11px] text-[#A4A5B5] group-hover:text-[#CBD0DF] leading-[1.3] mt-0.5 transition-colors">
          {item.description}
        </p>
      </div>
    </button>
  );
};

export const FeaturesMegaMenu: React.FC<FeaturesMegaMenuProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenFeatureModal,
}) => {
  if (!isOpen) return null;

  const handleItemClick = (item: FeatureItem) => {
    onClose();
    if (item.href) {
      window.location.href = item.href;
      return;
    }
    if (onOpenFeatureModal) {
      onOpenFeatureModal(item);
    } else if (item.targetSection) {
      onNavigate(item.targetSection);
    }
  };

  const handleLaunchStudio = () => {
    onClose();
    window.location.href = 'https://bikinvideo.com/editor';
  };

  return (
    <div
      role="region"
      aria-label="Features Mega Menu"
      className="absolute top-full left-0 md:-left-14 lg:left-0 mt-2.5 w-[960px] max-w-[calc(100vw-32px)] rounded-3xl p-5 sm:p-6 z-50 animate-in fade-in zoom-in-98 duration-150 overflow-hidden border border-[rgba(192,132,252,0.26)] backdrop-blur-[28px] [-webkit-backdrop-filter:blur(28px)] before:content-[''] before:absolute before:-top-3 before:left-0 before:right-0 before:h-3"
      style={{
        background: 'linear-gradient(165deg, rgba(88, 28, 135, 0.32) 0%, rgba(59, 20, 110, 0.20) 25%, rgba(17, 13, 38, 0.85) 65%, rgba(10, 8, 22, 0.95) 100%), rgba(10, 8, 22, 0.92)',
        boxShadow: 'inset 0 1.5px 2px 0 rgba(255, 255, 255, 0.22), 0 28px 70px -10px rgba(0, 0, 0, 0.85), 0 0 40px -5px rgba(124, 58, 237, 0.18)',
      }}
    >
      {/* Subtle top ambient light matching Section Glass Cards */}
      <div
        className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[150px] pointer-events-none rounded-full blur-3xl opacity-40 -z-10"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.45) 0%, rgba(59, 91, 255, 0.2) 60%, transparent 80%)',
        }}
      />

      {/* 3 Columns in ONE single horizontal row */}
      <div className="grid grid-cols-3 divide-x divide-purple-500/15 items-stretch">
        
        {/* =========================================================================
            COLUMN 1: PRODUK UTAMA (Main Products)
            Visual hierarchy paling kuat, prioritas utama produk Bikin Video
            ========================================================================= */}
        <div className="pr-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-[11.5px] font-bold text-purple-200 uppercase tracking-wider">
                Produk Utama
              </span>
              <span className="text-[9.5px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#321080]/90 text-purple-200 border border-purple-400/40 shadow-xs uppercase tracking-wider">
                Core Suite
              </span>
            </div>

            <div className="flex flex-col gap-2">
              {MAIN_PRODUCTS.map((item) => (
                <MainProductCard
                  key={item.id}
                  item={item}
                  onClick={() => handleItemClick(item)}
                />
              ))}
            </div>
          </div>

          {/* Quick Launch Banner to Balance Column Height */}
          <div className="mt-3 pt-3 border-t border-purple-500/20">
            <a
              href="https://bikinvideo.com/editor"
              onClick={onClose}
              className="w-full p-2.5 rounded-2xl bg-gradient-to-r from-purple-900/35 via-purple-700/20 to-purple-900/30 hover:from-purple-900/50 hover:via-purple-700/30 hover:to-purple-900/45 border border-purple-400/30 hover:border-purple-300/55 flex items-center justify-between group transition-all cursor-pointer text-left shadow-[0_8px_20px_-6px_rgba(139,53,232,0.3)] hover:shadow-[0_10px_25px_-5px_rgba(139,53,232,0.45)]"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-[30px] h-[30px] rounded-[10px] bg-purple-950/80 border border-purple-400/35 flex items-center justify-center p-1 shrink-0 shadow-[0_2px_8px_rgba(139,53,232,0.25)]">
                  <img src="/brand-design/bikin-video-logo-icon.png" alt="Bikin Video" className="w-full h-full object-contain" />
                </div>
                <div>
                  <div className="text-[12px] font-semibold text-white leading-tight">
                    Coba Studio Editor Demo
                  </div>
                  <div className="text-[10.5px] text-[#B7B2CC] leading-tight mt-0.5">
                    Langsung edit video dengan prompt AI
                  </div>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-purple-300 group-hover:text-white group-hover:translate-x-1 transition-all shrink-0" />
            </a>
          </div>
        </div>

        {/* =========================================================================
            COLUMN 2: TOOLS AI (AI Tools)
            Fitur AI pendukung editing
            ========================================================================= */}
        <div className="px-5 flex flex-col">
          <div className="flex items-center justify-between mb-2.5 px-1">
            <span className="text-[11.5px] font-bold text-purple-200/80 uppercase tracking-wider">
              Tools AI
            </span>
            <span className="text-[9.5px] font-mono font-semibold px-2 py-0.5 rounded-full bg-purple-950/60 text-purple-300 border border-purple-400/25">
              8 Fitur
            </span>
          </div>

          <div className="flex flex-col gap-0.5">
            {AI_TOOLS.map((item) => (
              <StandardFeatureCard
                key={item.id}
                item={item}
                onClick={() => handleItemClick(item)}
              />
            ))}
          </div>
        </div>

        {/* =========================================================================
            COLUMN 3: WORKFLOW & INTEGRASI (Workflows & Integrations)
            Kolaborasi, otomatisasi, ekspor, dan integrasi teknis
            ========================================================================= */}
        <div className="pl-5 flex flex-col">
          <div className="flex items-center justify-between mb-2.5 px-1">
            <span className="text-[11.5px] font-bold text-purple-200/80 uppercase tracking-wider">
              Workflow & Integrasi
            </span>
            <span className="text-[9.5px] font-mono font-semibold px-2 py-0.5 rounded-full bg-purple-950/60 text-purple-300 border border-purple-400/25">
              Ekosistem
            </span>
          </div>

          <div className="flex flex-col gap-0.5">
            {WORKFLOWS_INTEGRATIONS.map((item) => (
              <StandardFeatureCard
                key={item.id}
                item={item}
                onClick={() => handleItemClick(item)}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
