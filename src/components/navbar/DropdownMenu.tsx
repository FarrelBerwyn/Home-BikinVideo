import React from 'react';
import { DropdownLinkItem } from './navData';

interface DropdownMenuProps {
  isOpen: boolean;
  title: string;
  items: DropdownLinkItem[];
  align?: 'left' | 'center' | 'right';
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
  onOpenItemModal?: (title: string, description: string) => void;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  isOpen,
  title,
  items,
  align = 'center',
  onClose,
  onNavigate,
  onOpenItemModal,
}) => {
  if (!isOpen) return null;

  const handleItemClick = (item: DropdownLinkItem) => {
    onClose();
    if (onOpenItemModal) {
      onOpenItemModal(item.title, item.description);
    } else if (item.targetSection) {
      onNavigate(item.targetSection);
    }
  };

  const alignClass =
    align === 'right'
      ? 'right-0'
      : align === 'left'
      ? 'left-0'
      : 'left-1/2 -translate-x-1/2';

  return (
    <div
      role="region"
      aria-label={`${title} Dropdown Menu`}
      className={`absolute top-full ${alignClass} mt-2.5 w-[360px] max-w-[calc(100vw-32px)] rounded-3xl p-4 z-50 animate-in fade-in zoom-in-98 duration-150 overflow-hidden border border-[rgba(192,132,252,0.26)] backdrop-blur-[28px] [-webkit-backdrop-filter:blur(28px)] before:content-[''] before:absolute before:-top-3 before:left-0 before:right-0 before:h-3`}
      style={{
        background: 'linear-gradient(165deg, rgba(88, 28, 135, 0.32) 0%, rgba(59, 20, 110, 0.20) 25%, rgba(17, 13, 38, 0.85) 65%, rgba(10, 8, 22, 0.95) 100%), rgba(10, 8, 22, 0.92)',
        boxShadow: 'inset 0 1.5px 2px 0 rgba(255, 255, 255, 0.22), 0 28px 70px -10px rgba(0, 0, 0, 0.85), 0 0 40px -5px rgba(124, 58, 237, 0.18)',
      }}
    >
      {/* Subtle top ambient light */}
      <div
        className="absolute -top-20 left-1/2 -translate-x-1/2 w-[240px] h-[100px] pointer-events-none rounded-full blur-2xl opacity-40 -z-10"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.45) 0%, rgba(59, 91, 255, 0.2) 60%, transparent 80%)',
        }}
      />

      <div className="text-[11px] font-bold text-purple-200/90 uppercase tracking-wider mb-2.5 px-2 pt-0.5">
        {title}
      </div>

      <div className="flex flex-col gap-1.5">
        {items.map((item) => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleItemClick(item)}
              className="group w-full flex items-start gap-3 p-2.5 rounded-[14px] bg-[rgba(16,14,35,0.45)] hover:bg-[rgba(28,22,60,0.65)] border border-purple-500/18 hover:border-purple-400/40 transition-all duration-180 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-400/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] hover:shadow-[0_6px_16px_-4px_rgba(139,53,232,0.22)]"
            >
              <div className="w-[34px] h-[34px] rounded-[10px] bg-gradient-to-br from-[#8B35E8]/30 via-[#6366F1]/20 to-[#120d2b] border border-purple-400/30 group-hover:border-purple-300/60 flex items-center justify-center shrink-0 text-purple-200 group-hover:text-white transition-all duration-180 shadow-[0_2px_8px_rgba(139,53,232,0.2)]">
                <IconComponent className="w-4 h-4" />
              </div>

              <div className="flex-1 min-w-0 pt-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-[13px] font-semibold text-[#F1F0F6] group-hover:text-white tracking-tight">
                    {item.title}
                  </span>
                  {item.badge && (
                    <span className="text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded-[4px] bg-[#321080]/80 text-purple-200 border border-purple-400/35 leading-none">
                      {item.badge}
                    </span>
                  )}
                </div>
                <p className="text-[11.5px] text-[#A4A5B5] group-hover:text-[#D1D2DE] leading-[1.35] line-clamp-2 mt-0.5 transition-colors">
                  {item.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
