import React, { useState } from 'react';
import { Sparkles, Square, ArrowUp } from 'lucide-react';

interface FloatingPromptBarProps {
  onSubmitPrompt?: (prompt: string) => void;
  onStopAction?: () => void;
  isLoading?: boolean;
}

export const FloatingPromptBar: React.FC<FloatingPromptBarProps> = ({
  onSubmitPrompt,
  onStopAction,
  isLoading = true,
}) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && onSubmitPrompt) {
      onSubmitPrompt(prompt.trim());
      setPrompt('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bikin-floating-prompt">
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe your edit..."
        className="flex-1 bg-transparent text-sm text-zinc-100 placeholder-[#7a7d95] focus:outline-none pr-3"
      />

      {/* Action / Stop Circular Button */}
      <button
        type="button"
        onClick={isLoading ? onStopAction : () => handleSubmit}
        title={isLoading ? 'Stop AI Task' : 'Send Prompt'}
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-md ${
          isLoading
            ? 'bg-[#e11d48] hover:bg-[#f43f5e] text-white shadow-rose-900/40'
            : 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-900/40'
        }`}
      >
        {isLoading ? (
          <Square className="w-3.5 h-3.5 fill-current" />
        ) : (
          <ArrowUp className="w-4 h-4 stroke-[2.5]" />
        )}
      </button>
    </form>
  );
};
