import React, { useState } from 'react';
import { SectionLabel } from './SectionLabel';
import { GradientText } from './GradientText';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: 'What can Bikin Video do?',
    answer:
      'Bikin Video acts as your AI Video Director. You provide natural language instructions (like "make the intro punchier, remove silences, and add B-roll"), and Bikin Video understands your video content, designs an editorial cut plan, performs the cuts on standard timeline tracks, and validates the result.',
  },
  {
    question: 'Can it edit my existing raw footage or podcasts?',
    answer:
      'Yes! Unlike basic text-to-video generators that produce hallucinated stock footage, Bikin Video specializes in ingesting your real recorded footage—podcasts, interviews, vlogs, webinars, and tutorials—and transforming them into high-retention short videos.',
  },
  {
    question: 'How does AI editing work without black-box lock-in?',
    answer:
      'Every AI decision in Bikin Video translates directly into standard non-destructive timeline clips, keyframes, and multi-track layers. You are never locked into an unchangeable render. You can trim clips, slide keyframes, and export lossless XML directly into Adobe Premiere Pro or DaVinci Resolve.',
  },
  {
    question: 'Can I manually control and refine the timeline myself?',
    answer:
      'Absolutely. You direct, Bikin edits, but you always have the final say. Our editor provides full multi-track timeline tools including razor cut, slip/slide trim, audio ducking volume curves, and non-destructive undo/redo.',
  },
  {
    question: 'Does Bikin Video support Indonesian language and slang?',
    answer:
      'Yes. Our speech recognition and semantic understanding engine natively handles Indonesian (Bahasa Indonesia, including informal conversational slang and mixed English/Indo phrasing) as well as 30+ international languages.',
  },
  {
    question: 'Which export formats are supported?',
    answer:
      'You can export ready-to-publish MP4 videos in 1080p or 4K HDR at 60fps in 9:16 vertical, 16:9 landscape, and 1:1 square. You can also export standard XML and EDL project sequences to continue color grading and finishing in Adobe Premiere Pro and DaVinci Resolve.',
  },
  {
    question: 'How does usage measurement work?',
    answer:
      'Usage is measured strictly by the duration of exported video footage. Browsing, generating preview timelines, experimenting with prompts, and scrubbing playback in the editor are completely free and unmetered.',
  },
  {
    question: 'Is my uploaded footage kept private and secure?',
    answer:
      'Yes. Your footage, transcripts, and final video exports remain 100% your intellectual property. All files are encrypted in transit and at rest using AES-256 protocols, and your private footage is never used to train public foundational models.',
  },
];

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-10 sm:py-16 z-10 bg-[#070914]/80">
      <div className="page-container">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-7 sm:mb-9">
          <SectionLabel label="Frequently Asked Questions" className="mb-3.5" />
          <h2 className="text-[30px] sm:text-[42px] md:text-[50px] font-extrabold text-[#F1F0F6] tracking-tight leading-[1.12] mb-4 text-balance">
            Everything You Need <GradientText glow>to Know.</GradientText>
          </h2>
          <p className="text-[15px] sm:text-[17px] text-[#A4A5B5] leading-relaxed">
            Clear, honest answers about how Bikin Video works, supported formats, and creative control.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl overflow-hidden transition-all duration-200 ${
                  isOpen ? 'glass-card-selected' : 'glass-card glass-card-hover'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-400"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-white tracking-tight">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full glass-icon-box flex items-center justify-center shrink-0 text-purple-200 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-white' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-[#B7B2CC] leading-relaxed border-t border-white/[0.08]">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
