import React from 'react';
import { SectionLabel } from './SectionLabel';
import { GradientText } from './GradientText';
import { ScrollReveal } from './ScrollReveal';
import { CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const caseStudies = [
    {
      id: 1,
      name: 'Samantha Lee',
      role: 'Growth Lead @ CreatorPod Agency',
      problem: 'Spent 18+ hours weekly scrubbing 2-hour podcasts for clip hooks across 6 client channels.',
      workflow: 'Auto-ingest podcast audio, prompt-cut silences over 400ms, and auto-insert B-roll overlays.',
      outcome: 'Reduced turnaround from 3 days to 40 minutes per episode. Scaled output from 12 to 64 shorts/month.',
      metric: '+430% Output Scaled',
      avatarGrad: 'from-amber-400 to-rose-500',
      initials: 'SL',
      format: 'Podcast Hook (9:16 Shorts)',
    },
    {
      id: 2,
      name: 'Avery Thompson',
      role: 'Full-Time Tech Creator (480K Subs)',
      problem: 'High viewer drop-off within the first 4 seconds on YouTube Shorts due to slow conversational pacing.',
      workflow: 'Used AI Video Director hook scoring to automatically cut unhurried intros and dynamic punch-ins.',
      outcome: 'Average view duration jumped from 42% to 81%, propelling 5 consecutive shorts over 1M views.',
      metric: '81% Retention Rate',
      avatarGrad: 'from-blue-400 to-indigo-600',
      initials: 'AT',
      format: 'Talking-Head Tech Review',
    },
    {
      id: 3,
      name: 'Taylor Johnson',
      role: 'VP Marketing @ ScaleFlow SaaS',
      problem: 'Product demo webinars were sitting unwatched on YouTube with near-zero organic lead discovery.',
      workflow: 'Repurposed customer call recordings into 30-second kinetic feature shorts with corporate brand kit.',
      outcome: 'Generated 140+ qualified product demo signups in 60 days strictly from organic LinkedIn and X shorts.',
      metric: '140+ Inbound Pipeline',
      avatarGrad: 'from-emerald-400 to-teal-600',
      initials: 'TJ',
      format: 'B2B Product Feature Drop',
    },
  ];

  return (
    <section id="testimonials" className="relative py-10 sm:py-16 z-10">
      <div className="page-container">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <ScrollReveal delay={0}>
            <SectionLabel label="Verified Case Studies" className="mb-3.5" />
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <h2 className="text-[32px] sm:text-[42px] md:text-[50px] font-bold text-white tracking-tight leading-[1.12] mb-4 text-balance">
              Verified stories of <GradientText glow>real creative impact.</GradientText>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <p className="text-[15px] sm:text-[17px] text-[#A4A5B5] leading-relaxed max-w-2xl mx-auto">
              How podcasters, full-time creators, and marketing teams replaced manual timeline fatigue with Bikin Video.
            </p>
          </ScrollReveal>
        </div>

        {/* 3 Case Study Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {caseStudies.map((cs, idx) => (
            <ScrollReveal key={cs.id} delay={150 + idx * 100} className="h-full">
              <div className="h-full flex flex-col justify-between p-6 sm:p-7 rounded-3xl glass-card glass-card-hover">
                
                <div>
                  {/* Top Metric Tag */}
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.08]">
                    <span className="text-[11px] font-mono glass-badge px-2.5 py-0.5 rounded">
                      {cs.format}
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-400">
                      {cs.metric}
                    </span>
                  </div>

                  {/* Problem & Outcome */}
                  <div className="space-y-3 text-xs mb-6">
                    <div>
                      <strong className="text-[#8E90A4] uppercase tracking-wider text-[10px] block mb-1">
                        Challenge:
                      </strong>
                      <p className="text-[#B7B2CC] leading-relaxed">
                        {cs.problem}
                      </p>
                    </div>

                    <div>
                      <strong className="text-purple-300 uppercase tracking-wider text-[10px] block mb-1">
                        Bikin Video Workflow:
                      </strong>
                      <p className="text-white leading-relaxed font-medium">
                        {cs.workflow}
                      </p>
                    </div>

                    <div>
                      <strong className="text-emerald-400 uppercase tracking-wider text-[10px] block mb-1">
                        Measured Outcome:
                      </strong>
                      <p className="text-[#E0E0ED] leading-relaxed">
                        {cs.outcome}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Author Info */}
                <div className="pt-4 border-t border-white/[0.08] flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full bg-gradient-to-tr ${cs.avatarGrad} p-[1.5px] flex items-center justify-center shrink-0 shadow-md`}
                  >
                    <div className="w-full h-full rounded-full bg-[#121524] flex items-center justify-center text-xs font-bold text-white">
                      {cs.initials}
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-white tracking-tight">
                      {cs.name}
                    </span>
                    <span className="text-[11px] text-[#B7B2CC]">
                      {cs.role}
                    </span>
                  </div>
                </div>

              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
};
