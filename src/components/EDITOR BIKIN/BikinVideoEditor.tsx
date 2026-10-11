import React, { useState } from 'react';
import './editor.css';
import { TopBar } from './components/TopBar';
import { ActivityBar } from './components/ActivityBar';
import { MediaPanel } from './components/MediaPanel';
import { PreviewPlayerPanel } from './components/PreviewPlayerPanel';
import { DirectorInspectorPanel } from './components/DirectorInspectorPanel';
import { TimelinePanel } from './components/TimelinePanel';
import { FloatingPromptBar } from './components/FloatingPromptBar';
import { INITIAL_MEDIA_ITEMS } from './mockData';
import { MediaItem } from './types';

export interface BikinVideoEditorProps {
  initialProjectName?: string;
  onExport?: () => void;
  onShare?: () => void;
}

export const BikinVideoEditor: React.FC<BikinVideoEditorProps> = ({
  initialProjectName = 'Bikin-Studio-1',
  onExport,
  onShare,
}) => {
  // Master State
  const [activeActivityTab, setActiveActivityTab] = useState<'media' | 'ai-core' | 'motion' | 'text' | 'captions'>('media');
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>(INITIAL_MEDIA_ITEMS);
  const [playheadPos, setPlayheadPos] = useState(780); // Pixel position matching 00:27:00
  const [currentTime, setCurrentTime] = useState('00:00:27:00');
  const [totalTime, setTotalTime] = useState('00:00:36:09');

  const handleTogglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleImportMedia = () => {
    const newMedia: MediaItem = {
      id: `media-${Date.now()}`,
      title: 'Imported Video',
      badge: 'Imported',
      duration: '01:24',
      type: 'video',
    };
    setMediaItems((prev) => [newMedia, ...prev]);
  };

  const handlePromptSubmit = (promptText: string) => {
    console.log('AI Edit Prompt Submitted:', promptText);
  };

  const handleStopAction = () => {
    console.log('AI Process Stopped');
  };

  return (
    <div className="bikin-editor-root">
      {/* 1. Header Navigation Bar */}
      <TopBar
        autoSave={autoSave}
        onToggleAutoSave={() => setAutoSave(!autoSave)}
        onExport={onExport}
        onShare={onShare}
      />

      {/* 2. Main Middle Workspace (Panels 1, 2, 3) */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Far-Left Activity Icon Bar */}
        <ActivityBar
          activeTab={activeActivityTab}
          onTabChange={setActiveActivityTab}
        />

        {/* Panel 1: Media Library & Imported Assets */}
        <MediaPanel
          mediaItems={mediaItems}
          onImportClick={handleImportMedia}
          onSelectMedia={(media) => console.log('Selected media:', media)}
        />

        {/* Panel 2: Center Video Canvas Player */}
        <PreviewPlayerPanel
          isPlaying={isPlaying}
          onTogglePlay={handleTogglePlay}
          currentTime={currentTime}
          totalTime={totalTime}
          projectName={initialProjectName}
        />

        {/* Panel 3: Right Inspector (Director / Clipper AI status) */}
        <DirectorInspectorPanel
          onBackToText={() => console.log('Back to text')}
          onPauseWorkflow={() => console.log('Paused workflow')}
          onStopWorkflow={handleStopAction}
        />
      </div>

      {/* 3. Panel 4: Multi-Track Timeline */}
      <div className="relative">
        <TimelinePanel
          playheadPosition={playheadPos}
          onSeek={(pos) => setPlayheadPos(pos)}
        />

        {/* Floating AI Director Prompt Bar */}
        <FloatingPromptBar
          onSubmitPrompt={handlePromptSubmit}
          onStopAction={handleStopAction}
          isLoading={true}
        />
      </div>
    </div>
  );
};

export default BikinVideoEditor;
