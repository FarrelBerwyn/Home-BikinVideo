import React from 'react';
import {
  ChevronDown,
  Undo2,
  Redo2,
  History,
  Bookmark,
  Share2,
  Sparkles,
} from 'lucide-react';

interface TopBarProps {
  autoSave: boolean;
  onToggleAutoSave: () => void;
  onExport?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  autoSave,
  onToggleAutoSave,
  onExport,
}) => {
  return (
    <header className="bikin-topbar">
      {/* Left: Menu & Undo/Redo */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#161828] hover:bg-[#1f233a] border border-white/10 text-white text-xs font-medium cursor-pointer transition-colors"
        >
          <span>Menu</span>
          <ChevronDown className="w-3.5 h-3.5 text-[#8E91A6]" />
        </button>

        <div className="h-4 w-[1px] bg-white/10 mx-1" />

        <button
          type="button"
          title="Undo (Ctrl+Z)"
          className="w-7 h-7 rounded flex items-center justify-center text-[#8E91A6] hover:text-white hover:bg-white/5 cursor-pointer transition-colors"
        >
          <Undo2 className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          title="Redo (Ctrl+Y)"
          className="w-7 h-7 rounded flex items-center justify-center text-[#8E91A6] hover:text-white hover:bg-white/5 cursor-pointer transition-colors"
        >
          <Redo2 className="w-3.5 h-3.5" />
        </button>

        {/* Version Badge (v1) */}
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-[11px] font-mono font-medium ml-1">
          <History className="w-3 h-3 text-purple-400" />
          <span>v1</span>
        </div>
      </div>

      {/* Center: Bikin Video Branding */}
      <div className="flex items-center gap-2.5">
        <div className="flex items-center gap-1.5">
          {/* Logo Icon */}
          <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-[#8B35E8] to-[#06B6D4] flex items-center justify-center shadow-md shadow-purple-500/20">
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-white">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <span className="text-sm font-black tracking-tight text-white">Bikin</span>
        </div>
        <span className="text-xs font-semibold text-[#8E91A6] tracking-tight">
          Bikin Video
        </span>
      </div>

      {/* Right: AutoSave & Actions */}
      <div className="flex items-center gap-3">
        {/* AutoSave Toggle */}
        <div className="flex items-center gap-1.5 text-xs text-[#8E91A6]">
          <span className="font-medium text-[11px]">AutoSave</span>
          <button
            type="button"
            onClick={onToggleAutoSave}
            className={`w-9 h-5 rounded-full p-0.5 flex items-center transition-colors cursor-pointer ${
              autoSave ? 'bg-[#8B35E8] justify-end' : 'bg-white/20 justify-start'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-white shadow-sm flex items-center justify-center text-[8px] font-black text-[#8B35E8]">
              {autoSave ? 'ON' : ''}
            </span>
          </button>
        </div>

        <button
          type="button"
          title="Save as Template"
          className="w-7 h-7 rounded flex items-center justify-center text-[#8E91A6] hover:text-white hover:bg-white/5 cursor-pointer transition-colors"
        >
          <Bookmark className="w-3.5 h-3.5" />
        </button>

        {/* Share Button */}
        <button
          type="button"
          className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#161828] hover:bg-[#1f233a] border border-white/10 text-white text-xs font-medium cursor-pointer transition-colors"
        >
          <Share2 className="w-3.5 h-3.5 text-[#8E91A6]" />
          <span>Share</span>
        </button>

        {/* Export Button */}
        <button
          type="button"
          onClick={onExport}
          className="flex items-center gap-1.5 px-3.5 py-1 rounded-md bg-gradient-to-r from-[#8B35E8] to-[#A855F7] hover:brightness-110 text-white text-xs font-bold shadow-md shadow-purple-600/30 cursor-pointer transition-all"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Export</span>
        </button>
      </div>
    </header>
  );
};
