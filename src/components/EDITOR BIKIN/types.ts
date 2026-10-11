export interface MediaItem {
  id: string;
  title: string;
  badge?: string;
  duration: string;
  thumbnailUrl?: string;
  type: 'video' | 'audio' | 'image';
}

export interface SubtitleSegment {
  id: string;
  text: string;
  startTime: number;
  endTime: number;
  startPixel: number;
  widthPixel: number;
}

export interface VideoClip {
  id: string;
  name: string;
  durationLabel: string;
  startPixel: number;
  widthPixel: number;
  hasWaveform?: boolean;
}

export interface TimelineTrack {
  id: string;
  name: string;
  type: 'subtitle' | 'motion' | 'video' | 'audio';
  isLocked: boolean;
  isHidden: boolean;
  isMuted?: boolean;
}

export interface EditorState {
  isPlaying: boolean;
  currentTime: string;
  totalTime: string;
  playheadPosition: number; // percentage or pixels
  activeTab: 'media' | 'ai-core' | 'motion' | 'text' | 'captions';
  inspectorTab: 'director' | 'clipper';
  mediaTab: 'media' | 'library' | 'pixabay';
  autoSave: boolean;
}
