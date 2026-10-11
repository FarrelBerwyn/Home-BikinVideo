import { MediaItem, SubtitleSegment, VideoClip } from './types';

export const INITIAL_MEDIA_ITEMS: MediaItem[] = [
  {
    id: 'media-1',
    title: 'Dipahami AI',
    badge: 'Dipahami AI',
    duration: '0:58',
    type: 'video',
  },
];

export const SUBTITLE_SEGMENTS: SubtitleSegment[] = [
  { id: 'sub-1', text: 'Hi e...', startTime: 0, endTime: 1.5, startPixel: 20, widthPixel: 38 },
  { id: 'sub-2', text: 'Farr...', startTime: 1.5, endTime: 3.2, startPixel: 62, widthPixel: 42 },
  { id: 'sub-3', text: 'T..', startTime: 3.2, endTime: 4.5, startPixel: 108, widthPixel: 28 },
  { id: 'sub-4', text: 'b..', startTime: 4.5, endTime: 6.0, startPixel: 140, widthPixel: 28 },
  { id: 'sub-5', text: 'O..', startTime: 6.0, endTime: 7.8, startPixel: 172, widthPixel: 30 },
  { id: 'sub-6', text: '20...', startTime: 7.8, endTime: 9.5, startPixel: 206, widthPixel: 36 },
  { id: 'sub-7', text: 'a...', startTime: 9.5, endTime: 11.0, startPixel: 246, widthPixel: 32 },
  { id: 'sub-8', text: 'First...', startTime: 11.0, endTime: 13.5, startPixel: 282, widthPixel: 48 },
  { id: 'sub-9', text: 'Sec...', startTime: 13.5, endTime: 16.0, startPixel: 334, widthPixel: 44 },
  { id: 'sub-10', text: 'Thir...', startTime: 16.0, endTime: 18.5, startPixel: 382, widthPixel: 46 },
  { id: 'sub-11', text: 'W..', startTime: 18.5, endTime: 20.0, startPixel: 432, widthPixel: 30 },
  { id: 'sub-12', text: 'p..', startTime: 20.0, endTime: 21.5, startPixel: 466, widthPixel: 28 },
  { id: 'sub-13', text: 'E..', startTime: 21.5, endTime: 23.0, startPixel: 498, widthPixel: 28 },
  { id: 'sub-14', text: 'v..', startTime: 23.0, endTime: 24.2, startPixel: 530, widthPixel: 28 },
  { id: 'sub-15', text: 'a..', startTime: 24.2, endTime: 25.5, startPixel: 562, widthPixel: 28 },
  { id: 'sub-16', text: 'T..', startTime: 25.5, endTime: 27.0, startPixel: 594, widthPixel: 30 },
  { id: 'sub-17', text: 'ac...', startTime: 27.0, endTime: 29.0, startPixel: 628, widthPixel: 38 },
  { id: 'sub-18', text: 'r..', startTime: 29.0, endTime: 30.5, startPixel: 670, widthPixel: 28 },
  { id: 'sub-19', text: 'So...', startTime: 30.5, endTime: 33.0, startPixel: 702, widthPixel: 42 },
  { id: 'sub-20', text: 'f..', startTime: 33.0, endTime: 35.0, startPixel: 748, widthPixel: 28 },
];

export const VIDEO_CLIPS: VideoClip[] = [
  { id: 'vc-1', name: 'Intro', durationLabel: '00:00:...', startPixel: 20, widthPixel: 50, hasWaveform: true },
  { id: 'vc-2', name: 'Greeting', durationLabel: '00:00:...', startPixel: 74, widthPixel: 36, hasWaveform: true },
  { id: 'vc-3', name: 'Concept 1', durationLabel: '00:00:03:18', startPixel: 114, widthPixel: 64, hasWaveform: true },
  { id: 'vc-4', name: 'Concept 2', durationLabel: '00:00:03:12', startPixel: 182, widthPixel: 66, hasWaveform: true },
  { id: 'vc-5', name: 'Details', durationLabel: '00:00:...', startPixel: 252, widthPixel: 38, hasWaveform: true },
  { id: 'vc-6', name: 'Step 1', durationLabel: '00:00:0', startPixel: 294, widthPixel: 38, hasWaveform: true },
  { id: 'vc-7', name: 'Step 2', durationLabel: '00:00:...', startPixel: 336, widthPixel: 38, hasWaveform: true },
  { id: 'vc-8', name: 'Step 3', durationLabel: '00:00:03:', startPixel: 378, widthPixel: 46, hasWaveform: true },
  { id: 'vc-9', name: 'Explanation', durationLabel: '00:00:03:04', startPixel: 428, widthPixel: 62, hasWaveform: true },
  { id: 'vc-10', name: 'Customer Hook', durationLabel: '00:00:04:04', startPixel: 494, widthPixel: 68, hasWaveform: true },
  { id: 'vc-11', name: 'Value Prop', durationLabel: '00:00:03:22', startPixel: 576, widthPixel: 64, hasWaveform: true },
  { id: 'vc-12', name: 'Closing CTA', durationLabel: '00:00:04:07', startPixel: 644, widthPixel: 70, hasWaveform: true },
];

export const RULER_TIMESTAMPS = [
  { label: '00:00', pixel: 20 },
  { label: '00:05', pixel: 120 },
  { label: '00:10', pixel: 220 },
  { label: '00:15', pixel: 320 },
  { label: '00:20', pixel: 420 },
  { label: '00:25', pixel: 520 },
  { label: '00:30', pixel: 620 },
  { label: '00:35', pixel: 720 },
];
