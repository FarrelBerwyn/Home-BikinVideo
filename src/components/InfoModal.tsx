import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

export const InfoModal: React.FC<InfoModalProps> = ({
  isOpen,
  onClose,
  title,
  content,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="info-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-lg bg-[#0E111F] border border-[#a082dc]/30 rounded-3xl shadow-2xl p-6 sm:p-8 max-h-[85vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close Modal"
          className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center text-[#A4A5B5] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-3">
          <img src="/brand-design/bikin-video-logo-icon.png" alt="Bikin Video" className="w-5 h-5 object-contain" />
          <span className="text-xs font-semibold text-purple-300 uppercase tracking-wider">
            Bikin Video Overview
          </span>
        </div>

        <h3 id="info-modal-title" className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-4 pr-8">
          {title}
        </h3>

        <div className="text-sm text-[#D2D2DE] leading-relaxed whitespace-pre-line mb-6">
          {content}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full py-2.5 rounded-xl font-semibold text-xs text-white bg-[#1C2035] hover:bg-[#252B46] border border-white/10 transition-colors cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
};
