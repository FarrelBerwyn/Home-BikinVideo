import React, { useState } from 'react';
import { ChevronDown, X, LayoutDashboard } from 'lucide-react';
import {
  MAIN_PRODUCTS,
  AI_TOOLS,
  WORKFLOWS_INTEGRATIONS,
  SOLUTIONS_ITEMS,
  RESOURCES_ITEMS,
  LABS_ITEMS,
  FeatureItem,
} from './navData';

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
  onOpenPricing: () => void;
  onOpenDashboard: () => void;
}

export const MobileNavDrawer: React.FC<MobileNavDrawerProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenPricing,
  onOpenDashboard,
}) => {
  const [expandedSection, setExpandedSection] = useState<string | null>('features');

  if (!isOpen) return null;

  const toggleSection = (id: string) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  const handleLinkClick = (sectionId?: string) => {
    onClose();
    if (sectionId) onNavigate(sectionId);
  };

  const renderFeatureList = (items: FeatureItem[]) => {
    return (
      <div className="flex flex-col gap-1.5">
        {items.map((item) => {
          const IconComponent = item.icon;
          const cardContent = (
            <>
              <div className="w-[34px] h-[34px] rounded-[9px] bg-[#161828] border border-white/[0.08] flex items-center justify-center shrink-0 text-[#C4B5FD]">
                {item.isCustomIcon && item.customIconLabel ? (
                  <span className="text-[11px] font-bold text-white">
                    {item.customIconLabel}
                  </span>
                ) : (
                  <IconComponent className="w-4 h-4" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[13px] font-semibold text-white">
                    {item.title}
                  </span>
                  {item.badge && (
                    <span
                      className={`text-[8.5px] px-1.5 py-0.5 rounded leading-none ${item.badge === 'Core'
                        ? 'bg-[#8B35E8]/30 text-[#E9D5FF] border border-[#c084fc]/30'
                        : item.badge === 'New'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-[#8B35E8]/20 text-[#D8B4FE]'
                        }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
                <p className="text-[11.5px] text-[#A4A5B5] leading-snug mt-0.5">
                  {item.description}
                </p>
              </div>
            </>
          );

          const cardClass = "w-full flex items-start gap-3 p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.05] text-left cursor-pointer transition-colors";

          if (item.href) {
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={onClose}
                className={cardClass}
              >
                {cardContent}
              </a>
            );
          }

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleLinkClick(item.targetSection)}
              className={cardClass}
            >
              {cardContent}
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Drawer"
      className="fixed inset-0 top-[62px] z-50 pointer-events-auto bg-[rgba(12,14,26,0.96)] backdrop-blur-[24px] [-webkit-backdrop-filter:blur(24px)] border-t border-white/[0.12] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-150"
    >
      <div className="p-4 sm:p-6 max-w-lg mx-auto flex flex-col gap-2 pb-16">

        {/* ================= FEATURES ACCORDION ================= */}
        <div className="border-b border-white/[0.08] pb-3">
          <button
            type="button"
            onClick={() => toggleSection('features')}
            className="w-full py-2.5 flex items-center justify-between text-left text-sm font-semibold text-[#E6E6E6] hover:text-white"
          >
            <span className="text-[14px]">Features</span>
            <ChevronDown
              className={`w-4 h-4 text-[#999999] transition-transform duration-200 ${expandedSection === 'features' ? 'rotate-180' : ''
                }`}
            />
          </button>

          {expandedSection === 'features' && (
            <div className="flex flex-col gap-4 pt-2 pb-2">
              {/* Group 1: Produk Utama */}
              <div>
                <div className="text-[11px] font-bold text-[#E9D5FF] uppercase tracking-wider mb-2 px-1 flex items-center justify-between">
                  <span>Produk Utama</span>
                  <span className="text-[9.5px] font-semibold text-[#D8B4FE] bg-[#8B35E8]/20 px-2 py-0.5 rounded-full border border-[#a855f7]/30">
                    Core
                  </span>
                </div>
                {renderFeatureList(MAIN_PRODUCTS)}
              </div>

              {/* Group 2: Tools AI */}
              <div>
                <div className="text-[11px] font-bold text-[#A4A5B5] uppercase tracking-wider mb-2 px-1 flex items-center justify-between">
                  <span>Tools AI</span>
                  <span className="text-[9.5px] font-medium text-[#9CA3AF] bg-white/[0.05] px-2 py-0.5 rounded-full border border-white/[0.08]">
                    8 Fitur
                  </span>
                </div>
                {renderFeatureList(AI_TOOLS)}
              </div>

              {/* Group 3: Workflow & Integrasi */}
              <div>
                <div className="text-[11px] font-bold text-[#A4A5B5] uppercase tracking-wider mb-2 px-1 flex items-center justify-between">
                  <span>Workflow & Integrasi</span>
                  <span className="text-[9.5px] font-medium text-[#9CA3AF] bg-white/[0.05] px-2 py-0.5 rounded-full border border-white/[0.08]">
                    Ekosistem
                  </span>
                </div>
                {renderFeatureList(WORKFLOWS_INTEGRATIONS)}
              </div>
            </div>
          )}
        </div>

        {/* ================= SOLUTIONS ACCORDION ================= */}
        <div className="border-b border-white/[0.08] pb-2">
          <button
            type="button"
            onClick={() => toggleSection('solutions')}
            className="w-full py-2.5 flex items-center justify-between text-left text-sm font-semibold text-[#E6E6E6] hover:text-white"
          >
            <span>Solutions</span>
            <ChevronDown
              className={`w-4 h-4 text-[#999999] transition-transform duration-200 ${expandedSection === 'solutions' ? 'rotate-180' : ''
                }`}
            />
          </button>

          {expandedSection === 'solutions' && (
            <div className="flex flex-col gap-1.5 pt-1 pb-3">
              {SOLUTIONS_ITEMS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleLinkClick(item.targetSection)}
                  className="w-full flex items-center justify-between p-2.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.07] text-left text-xs font-medium text-[#E6E6E6]"
                >
                  <span>{item.title}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ================= RESOURCES ACCORDION ================= */}
        <div className="border-b border-white/[0.08] pb-2">
          <button
            type="button"
            onClick={() => toggleSection('resources')}
            className="w-full py-2.5 flex items-center justify-between text-left text-sm font-semibold text-[#E6E6E6] hover:text-white"
          >
            <span>Resources</span>
            <ChevronDown
              className={`w-4 h-4 text-[#999999] transition-transform duration-200 ${expandedSection === 'resources' ? 'rotate-180' : ''
                }`}
            />
          </button>

          {expandedSection === 'resources' && (
            <div className="flex flex-col gap-1.5 pt-1 pb-3">
              {RESOURCES_ITEMS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleLinkClick(item.targetSection)}
                  className="w-full flex items-center justify-between p-2.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.07] text-left text-xs font-medium text-[#E6E6E6]"
                >
                  <span>{item.title}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ================= LABS ACCORDION ================= */}
        <div className="border-b border-white/[0.08] pb-2">
          <button
            type="button"
            onClick={() => toggleSection('labs')}
            className="w-full py-2.5 flex items-center justify-between text-left text-sm font-semibold text-[#E6E6E6] hover:text-white"
          >
            <span>Bikin Video Labs</span>
            <ChevronDown
              className={`w-4 h-4 text-[#999999] transition-transform duration-200 ${expandedSection === 'labs' ? 'rotate-180' : ''
                }`}
            />
          </button>

          {expandedSection === 'labs' && (
            <div className="flex flex-col gap-1.5 pt-1 pb-3">
              {LABS_ITEMS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleLinkClick(item.targetSection)}
                  className="w-full flex items-center justify-between p-2.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.07] text-left text-xs font-medium text-[#E6E6E6]"
                >
                  <span>{item.title}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ================= DIRECT LINKS ================= */}
        <div className="flex flex-col gap-1 pt-2">
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenPricing();
            }}
            className="w-full py-2.5 px-3 rounded-lg text-left text-sm font-medium text-[#E6E6E6] hover:text-white hover:bg-white/[0.05]"
          >
            Pricing
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenPricing();
            }}
            className="w-full py-2.5 px-3 rounded-lg text-left text-sm font-medium text-[#E6E6E6] hover:text-white hover:bg-white/[0.05]"
          >
            For business
          </button>
        </div>

        {/* ================= ACTION BUTTONS ================= */}
        <div className="pt-4 flex flex-col gap-2.5">
          <a
            href="https://bikinvideo.com/editor"
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#8B35E8] to-[#A855F7] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(139,53,232,0.4)]"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Start Editing</span>
          </a>
        </div>
      </div>
    </div>
  );
};
