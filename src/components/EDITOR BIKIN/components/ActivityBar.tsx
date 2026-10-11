import React from 'react';
import {
  AppWindow,
  Sparkles,
  Layers,
  Type,
  Subtitles,
} from 'lucide-react';

interface ActivityBarProps {
  activeTab: 'media' | 'ai-core' | 'motion' | 'text' | 'captions';
  onSelectTab: (tab: 'media' | 'ai-core' | 'motion' | 'text' | 'captions') => void;
}

export const ActivityBar: React.FC<ActivityBarProps> = ({
  activeTab,
  onSelectTab,
}) => {
  const items = [
    { id: 'media', label: 'Media', icon: AppWindow },
    { id: 'ai-core', label: 'AI Core', icon: Sparkles },
    { id: 'motion', label: 'Motion', icon: Layers },
    { id: 'text', label: 'Text', icon: Type },
    { id: 'captions', label: 'Captions', icon: Subtitles },
  ] as const;

  return (
    <aside className="bikin-activity-bar">
      {items.map((item) => {
        const IconComponent = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelectTab(item.id)}
            className={`bikin-activity-btn ${isActive ? 'active' : ''}`}
            title={item.label}
          >
            <IconComponent className="w-4 h-4 mb-1" />
            <span className="leading-tight">{item.label}</span>
          </button>
        );
      })}
    </aside>
  );
};
