import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Plus,
  ImagePlus,
  Timer,
  Brain,
  ChevronDown,
  Mic,
  Sparkles,
  Check,
} from 'lucide-react';
import { PROMPT_SPRING, PROMPT_SURFACE_CLASS, PromptAmbientOrbs, PromptSendButton } from './promptSurface';
// import { PROMPT_SPRING, PROMPT_SURFACE_CLASS, PromptAmbientOrbs, PromptSendButton } from './promptSurface';

interface HeroAiPromptBoxProps {
  /** `files`: the media attached with the media button (the editor imports them). */
  onSubmitPrompt: (prompt: string, files: File[]) => void;
  onOpenEditor: () => void;
}

export const HeroAiPromptBox: React.FC<HeroAiPromptBoxProps> = ({
  onSubmitPrompt,
  onOpenEditor,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isThinkingOpen, setIsThinkingOpen] = useState(false);
  const [selectedMode, setSelectedMode] = useState<'director' | 'fast' | 'creative'>('director');
  const [timeRange, setTimeRange] = useState<string | null>(null);
  const [showTimerPicker, setShowTimerPicker] = useState(false);
  const [timerInput, setTimerInput] = useState('0:30');
  const [attachments, setAttachments] = useState<File[]>([]);

  const containerRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const thinkingDropdownRef = useRef<HTMLDivElement>(null);
  const timerPickerRef = useRef<HTMLDivElement>(null);

  const hasPromptText = Boolean(inputPrompt.trim());

  // Handle click outside to collapse when not actively typing/interacting
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (thinkingDropdownRef.current && !thinkingDropdownRef.current.contains(target)) {
        setIsThinkingOpen(false);
      }
      if (timerPickerRef.current && !timerPickerRef.current.contains(target)) {
        setShowTimerPicker(false);
      }
      if (containerRef.current && !containerRef.current.contains(target)) {
        // Collapse when clicking outside
        setIsExpanded(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isExpanded) {
        setIsExpanded(false);
        setIsThinkingOpen(false);
        setShowTimerPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isExpanded]);

  const handleExpandAndFocus = () => {
    setIsExpanded(true);
    requestAnimationFrame(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        const len = inputRef.current.value.length;
        inputRef.current.setSelectionRange(len, len);
      }
    });
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanPrompt = inputPrompt.trim();
    if (!cleanPrompt && attachments.length === 0) {
      onOpenEditor();
      return;
    }
    onSubmitPrompt(cleanPrompt, attachments);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const springConfig = PROMPT_SPRING;

  return (
    <div className="relative w-full max-w-[480px] sm:max-w-[500px] mx-auto box-border min-w-0">
      <motion.form
        ref={containerRef}
        onSubmit={handleSubmit}
        initial={false}
        animate={{
          height: isExpanded ? 122 : 52,
          borderRadius: isExpanded ? 16 : 26,
        }}
        transition={springConfig}
        className={`relative w-full ${PROMPT_SURFACE_CLASS} flex flex-col transition-colors duration-200 overflow-visible ${isExpanded ? 'min-h-[122px] justify-between' : 'h-[52px] max-h-[52px] justify-center'
          }`}
      >
        {/* Ambient Glass Glow Orbs */}
        <PromptAmbientOrbs />

        {/* TOP REGION: Text Input / Collapsed Prompt Surface */}
        <div
          className={`w-full relative z-10 flex justify-between gap-2.5 sm:gap-3 min-w-0 ${isExpanded ? 'px-3.5 sm:px-4 pt-3 pb-0.5 items-start' : 'pl-4 sm:pl-5 pr-2 sm:pr-2.5 h-[52px] items-center'
            }`}
        >
          {!isExpanded ? (
            /* Collapsed Surface (Click to expand) */
            <div
              role="button"
              tabIndex={0}
              onClick={handleExpandAndFocus}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleExpandAndFocus();
                }
              }}
              className="flex-1 min-w-0 cursor-pointer select-none flex items-center h-full"
              title="Klik untuk mengetik instruksi video AI..."
            >
              <span className="text-[13px] tracking-normal leading-normal font-normal text-zinc-400 select-none">
                {inputPrompt.trim() ? inputPrompt : 'Describe your edit...'}
              </span>
            </div>
          ) : (
            /* Active Editable Textarea */
            <div className="flex-1 min-w-0 flex items-start justify-between gap-2">
              <textarea
                ref={inputRef}
                rows={2}
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Describe your edit (e.g., 'Split clip at 5s and zoom to 110%')..."
                className="w-full bg-transparent text-[13px] text-zinc-100 placeholder-zinc-500 focus:outline-none resize-none tracking-normal leading-relaxed font-normal min-h-[46px] pt-0.5 cursor-text"
              />
            </div>
          )}

          {/* Right Action Button when collapsed */}
          {!isExpanded && (
            <PromptSendButton
              active={hasPromptText}
              onClick={(e) => {
                e.stopPropagation();
                if (hasPromptText) {
                  handleSubmit();
                } else {
                  handleExpandAndFocus();
                }
              }}
              title={hasPromptText ? 'Submit prompt ke editor' : 'AI Voice / Prompt'}
            />
          )}
        </div>

        {/* BOTTOM REGION: Secondary Tools & Step 2 Controls */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6, transition: { duration: 0.12 } }}
              transition={springConfig}
              className="flex items-center justify-between gap-2 px-4 pb-3 pt-0.5 relative z-10 w-full"
            >
              {/* LEFT TOOLS: [+] [🖼️] [⏱️] */}
              <div className="flex items-center gap-1.5 text-zinc-400">
                {/* + Reference Picker */}
                <button
                  type="button"
                  onClick={() => {
                    setInputPrompt((prev) => (prev ? `${prev} [Add footage]` : 'Add footage and music'));
                    inputRef.current?.focus();
                  }}
                  className="w-8 h-8 rounded-xl bg-[#201d36]/80 hover:bg-[#2c284d] text-zinc-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-purple-500/20 shadow-xs"
                  title="Tambah referensi footage / clip"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>

                {/* Image / Media Upload */}
                <div className="relative">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,video/*"
                    multiple
                    onChange={(e) => {
                      // The files themselves go to the editor with the prompt (it used to
                      // write only "[Media: name]" into the words and drop the file).
                      const picked = Array.from(e.target.files || []);
                      if (picked.length) setAttachments((prev) => [...prev, ...picked]);
                      e.target.value = '';
                      inputRef.current?.focus();
                    }}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="relative w-8 h-8 rounded-xl bg-[#201d36]/80 hover:bg-[#2c284d] text-zinc-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-purple-500/20 shadow-xs"
                    title={attachments.length ? `Media: ${attachments.map((f) => f.name).join(', ')}` : 'Upload gambar atau video referensi'}
                    data-attachments={attachments.length}
                  >
                    <ImagePlus className="w-3.5 h-3.5" />
                    {attachments.length > 0 && (
                      <span className="absolute -top-1 -right-1 min-w-[14px] h-[14px] px-0.5 rounded-full bg-purple-500 text-[9px] leading-[14px] text-white text-center">
                        {attachments.length}
                      </span>
                    )}
                  </button>
                </div>

                {/* Timer Duration Picker */}
                <div className="relative" ref={timerPickerRef}>
                  <button
                    type="button"
                    onClick={() => setShowTimerPicker((prev) => !prev)}
                    className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors cursor-pointer border shadow-xs ${timeRange || showTimerPicker
                      ? 'bg-purple-600/30 text-purple-300 border-purple-500/50 shadow-sm'
                      : 'bg-[#201d36]/80 hover:bg-[#2c284d] text-zinc-300 hover:text-white border-purple-500/20'
                      }`}
                    title="Atur target durasi video"
                  >
                    <Timer className="w-3.5 h-3.5" />
                  </button>

                  {/* Time Range Popover */}
                  {showTimerPicker && (
                    <div className="absolute bottom-full left-0 mb-3 w-48 p-2.5 bg-[#141224]/98 border border-purple-500/30 rounded-2xl shadow-[0_20px_48px_rgba(0,0,0,0.85)] z-50 backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-150">
                      <div className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                        Target Durasi
                      </div>
                      <div className="flex items-center gap-1.5 mb-2">
                        {['0:15', '0:30', '1:00'].map((d) => (
                          <button
                            key={d}
                            type="button"
                            onClick={() => {
                              setTimeRange(d);
                              setTimerInput(d);
                              setShowTimerPicker(false);
                            }}
                            className={`flex-1 py-1 rounded-lg text-xs font-mono transition-colors ${timeRange === d
                              ? 'bg-purple-600 text-white font-semibold'
                              : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                              }`}
                          >
                            {d}
                          </button>
                        ))}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <input
                          type="text"
                          value={timerInput}
                          onChange={(e) => setTimerInput(e.target.value)}
                          placeholder="0:30"
                          className="w-full px-2 py-1 rounded-lg bg-zinc-800 border border-white/10 text-xs text-white text-center focus:outline-none focus:border-purple-500"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setTimeRange(timerInput);
                            setShowTimerPicker(false);
                          }}
                          className="py-1 px-2.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold"
                        >
                          Set
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* RIGHT CONTROLS: [🧠 Berpikir ⌄] [🎙️ Mic] [Action Pill] */}
              <div className="flex items-center gap-2">
                {/* 1. Berpikir Dropdown */}
                <div className="relative" ref={thinkingDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setIsThinkingOpen((prev) => !prev)}
                    className={`h-8 flex items-center gap-1.5 px-3 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer shadow-xs border backdrop-blur-md ${isThinkingOpen
                      ? 'bg-gradient-to-r from-purple-600/40 via-indigo-600/40 to-blue-600/40 text-white border-purple-400/60 shadow-sm'
                      : 'bg-gradient-to-r from-purple-500/15 via-indigo-500/15 to-blue-500/15 hover:from-purple-500/25 hover:to-blue-500/25 text-purple-200 border-purple-400/30'
                      }`}
                    title="Model & Mode Berpikir AI"
                  >
                    <Brain className="w-3.5 h-3.5 text-purple-400" />
                    <span>Berpikir</span>
                    <ChevronDown
                      className={`w-3 h-3 transition-transform duration-150 ${isThinkingOpen ? 'rotate-180 text-purple-300' : 'text-purple-300/60'
                        }`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {isThinkingOpen && (
                    <div className="absolute bottom-full right-0 mb-3 w-56 p-2 rounded-2xl bg-[#141224]/98 border border-purple-500/30 shadow-[0_20px_48px_rgba(0,0,0,0.85)] z-50 backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-150">
                      <div className="text-[10px] font-semibold text-zinc-400 px-2 py-1 uppercase tracking-wider flex items-center justify-between border-b border-purple-500/20 pb-1 mb-1.5">
                        <span className="flex items-center gap-1 text-purple-300">
                          <Sparkles className="w-3 h-3 text-purple-400" />
                          AI Thinking Mode
                        </span>
                      </div>
                      <div className="space-y-1">
                        {[
                          { id: 'director', label: 'AI Director', desc: 'Rencana sinematik utuh' },
                          { id: 'fast', label: 'Instant Edit', desc: 'Eksekusi cepat per baris' },
                          { id: 'creative', label: 'Creative Viral', desc: 'Optimasi hook & pacing' },
                        ].map((m) => (
                          <button
                            key={m.id}
                            type="button"
                            onClick={() => {
                              setSelectedMode(m.id as any);
                              setIsThinkingOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-left text-xs transition-colors ${selectedMode === m.id
                              ? 'bg-purple-600/30 text-white font-medium border border-purple-500/30'
                              : 'text-zinc-300 hover:bg-purple-900/20 hover:text-white'
                              }`}
                          >
                            <div>
                              <div>{m.label}</div>
                              <div className="text-[10px] text-zinc-500">{m.desc}</div>
                            </div>
                            {selectedMode === m.id && <Check className="w-3 h-3 text-purple-400" />}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. Voice Input Button */}
                <button
                  type="button"
                  onClick={() => {
                    // Quick placeholder voice prompt
                    setInputPrompt((prev) => (prev ? `${prev} buatkan video highlight dinamis` : 'Buatkan video highlight yang dinamis dengan transisi halus'));
                    inputRef.current?.focus();
                  }}
                  className="w-8 h-8 rounded-full bg-[#201d36]/80 hover:bg-[#2c284d] text-zinc-300 hover:text-white flex items-center justify-center border border-purple-500/20 cursor-pointer transition-colors shadow-xs"
                  title="Gunakan perintah suara (Voice)"
                >
                  <Mic className="w-3.5 h-3.5" />
                </button>

                {/* 3. Action Pill (Waveform / Send) */}
                <PromptSendButton
                  active={hasPromptText}
                  onClick={() => handleSubmit()}
                  title={hasPromptText ? 'Submit AI command (Enter)' : 'AI Video Editor'}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.form>
    </div>
  );
};
export default HeroAiPromptBox;
