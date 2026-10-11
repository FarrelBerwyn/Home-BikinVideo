import React from 'react';
import { SectionLabel } from './SectionLabel';
import { GradientText } from './GradientText';
import { PanelsTopLeft, Users, FolderKanban, ShieldCheck } from 'lucide-react';

export const TeamWorkflowSection: React.FC = () => {
  const pillars = [
    {
      title: 'Centralized Brand Kits',
      description: 'Lock in your typography, subtitle animations, hex palettes, and logo watermarks so every creator on your team outputs on-brand videos.',
      icon: PanelsTopLeft,
      detail: 'Global Font · Custom Captions · Logo Overlay',
    },
    {
      title: 'Shared Team Workspaces',
      description: 'Collaborate across editors, scriptwriters, and clients in real time. Share timeline drafts with a link without exporting bulky video files.',
      icon: Users,
      detail: 'Role-Based Access · Client Review Links · Comments',
    },
    {
      title: 'Standardized Project Templates',
      description: 'Create repeatable formulas for weekly series, podcasts, or client ad batches. AI Director applies your exact pacing blueprint in 1 click.',
      icon: FolderKanban,
      detail: 'Preset Cut Rules · Automated Outros · B-Roll Folders',
    },
  ];

  return (
    <section className="relative py-10 sm:py-16 z-10 bg-[#080A16]/50 border-t border-white/[0.06]">
      <div className="page-container">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-7 sm:mb-9">
          <SectionLabel label="Enterprise & Agency Operations" className="mb-3.5" />
          <h2 className="text-[30px] sm:text-[40px] md:text-[48px] font-extrabold text-[#F1F0F6] tracking-tight leading-[1.12] mb-4 text-balance">
            Scale Video Production <GradientText glow>Across Your Team.</GradientText>
          </h2>
          <p className="text-[15px] sm:text-[17px] text-[#A4A5B5] leading-relaxed max-w-2xl mx-auto">
            Maintain strict visual consistency and eliminate back-and-forth editing revisions with shared brand libraries.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => {
            const IconComp = pillar.icon;
            return (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-2xl glass-card glass-card-hover flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl glass-icon-box flex items-center justify-center text-purple-200 mb-5">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-tight mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#B7B2CC] leading-relaxed mb-6">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/[0.08] text-[11px] font-mono text-purple-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{pillar.detail}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
