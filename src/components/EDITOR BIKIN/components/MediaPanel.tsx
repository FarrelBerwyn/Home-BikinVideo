import React, { useState } from 'react';
import {
  LayoutGrid,
  List,
  SlidersHorizontal,
  Search,
  Upload,
  ChevronRight,
  Play,
} from 'lucide-react';
import { MediaItem } from '../types';

interface MediaPanelProps {
  mediaItems: MediaItem[];
  onImportClick?: () => void;
  onSelectMedia?: (media: MediaItem) => void;
}

export const MediaPanel: React.FC<MediaPanelProps> = ({
  mediaItems,
  onImportClick,
  onSelectMedia,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'media' | 'library' | 'pixabay'>('media');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <section className="bikin-media-panel p-3">
      {/* Top Header: Title & View Modes */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-bold text-white tracking-tight">Media</h2>
        <div className="flex items-center gap-1 text-[#8E91A6]">
          <button
            type="button"
            title="Grid View"
            className="w-6 h-6 rounded flex items-center justify-center hover:text-white hover:bg-white/5 cursor-pointer"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            title="List View"
            className="w-6 h-6 rounded flex items-center justify-center hover:text-white hover:bg-white/5 cursor-pointer"
          >
            <List className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            title="Filter Media"
            className="w-6 h-6 rounded flex items-center justify-center hover:text-white hover:bg-white/5 cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Search with AI Input */}
      <div className="relative mb-3">
        <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#717488]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search media with AI..."
          className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-[#141728] border border-white/[0.08] text-xs text-white placeholder-[#717488] focus:outline-none focus:border-purple-500/50 transition-colors"
        />
      </div>

      {/* Filter Tabs: Media, Library, Pixabay */}
      <div className="flex items-center gap-1.5 mb-3.5 overflow-x-auto bikin-scrollbar pb-1 text-xs font-medium">
        <button
          type="button"
          onClick={() => setActiveSubTab('media')}
          className={`px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition-all ${
            activeSubTab === 'media'
              ? 'bg-[#8B35E8] text-white shadow-sm shadow-purple-600/30'
              : 'bg-[#141728] text-[#8E91A6] hover:text-white'
          }`}
        >
          Media
        </button>
        <button
          type="button"
          onClick={() => setActiveSubTab('library')}
          className={`px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition-all ${
            activeSubTab === 'library'
              ? 'bg-[#8B35E8] text-white shadow-sm shadow-purple-600/30'
              : 'bg-[#141728] text-[#8E91A6] hover:text-white'
          }`}
        >
          Library
        </button>
        <button
          type="button"
          onClick={() => setActiveSubTab('pixabay')}
          className={`px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition-all ${
            activeSubTab === 'pixabay'
              ? 'bg-[#8B35E8] text-white shadow-sm shadow-purple-600/30'
              : 'bg-[#141728] text-[#8E91A6] hover:text-white'
          }`}
        >
          Pixabay
        </button>
        <button
          type="button"
          className="w-6 h-6 rounded-full bg-[#141728] text-[#8E91A6] hover:text-white flex items-center justify-center shrink-0"
        >
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      {/* Grid of Media Assets */}
      <div className="flex-1 overflow-y-auto bikin-scrollbar space-y-3">
        {/* Upload / Import Card (matches screenshot) */}
        <div
          onClick={onImportClick}
          className="w-full h-28 rounded-xl bg-[#141728]/80 hover:bg-[#1a1e35] border border-dashed border-white/15 hover:border-purple-500/50 flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all group"
        >
          <div className="w-8 h-8 rounded-lg bg-white/5 group-hover:bg-purple-600/20 text-[#8E91A6] group-hover:text-purple-300 flex items-center justify-center transition-colors">
            <Upload className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold text-white tracking-tight">Import</span>
          <span className="text-[10px] text-[#717488]">Videos, audio, ...</span>
        </div>

        {/* Imported Video Asset Card: "Dipahami AI" (0:58) */}
        {mediaItems.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectMedia && onSelectMedia(item)}
            className="w-full rounded-xl bg-[#141728] border border-white/[0.08] hover:border-purple-500/50 overflow-hidden cursor-pointer transition-all group relative"
          >
            {/* Thumbnail Canvas simulation matching speaker in screenshot */}
            <div className="relative aspect-video w-full bg-[#0a0c16] overflow-hidden">
              <svg viewBox="0 0 160 90" className="w-full h-full object-cover">
                {/* Background warm glow */}
                <rect width="160" height="90" fill="#0C0E18" />
                <circle cx="120" cy="45" r="25" fill="#F59E0B" opacity="0.15" />
                {/* Desk Lamp right */}
                <path d="M125 35 L120 55 L130 55 Z" fill="#252B42" />
                <line x1="125" y1="55" x2="125" y2="70" stroke="#374151" strokeWidth="2" />
                {/* Speaker torso */}
                <path d="M50 90 C50 65 65 60 80 60 C95 60 110 65 110 90 Z" fill="#181B28" />
                {/* Head */}
                <circle cx="80" cy="45" r="14" fill="#E0A97E" />
                {/* Hair */}
                <path d="M68 40 C68 30 75 28 80 28 C85 28 92 30 92 40 Z" fill="#11131E" />
                {/* Glasses */}
                <rect x="72" y="42" width="6" height="4" rx="1" fill="#1F2937" />
                <rect x="82" y="42" width="6" height="4" rx="1" fill="#1F2937" />
                <line x1="78" y1="44" x2="82" y2="44" stroke="#1F2937" strokeWidth="1" />
              </svg>

              {/* Tag "Dipahami AI" (top left) */}
              <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[9px] font-mono font-semibold">
                {item.badge || 'Dipahami AI'}
              </div>

              {/* Duration "0:58" (top right) */}
              <div className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/75 text-white text-[9px] font-mono font-bold">
                {item.duration}
              </div>

              {/* Hover Play Icon */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-7 h-7 rounded-full bg-[#8B35E8] text-white flex items-center justify-center shadow-md">
                  <Play className="w-3.5 h-3.5 ml-0.5 fill-current" />
                </div>
              </div>
            </div>

            {/* Title / Status */}
            <div className="p-2 flex items-center justify-between text-xs">
              <span className="font-semibold text-white truncate text-[11px]">{item.title}</span>
              <span className="text-[10px] text-[#717488] font-mono">1080p</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
