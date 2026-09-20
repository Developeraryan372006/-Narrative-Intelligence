import React, { useState, useEffect } from 'react';
import { StoryChapter, LifeReceipt } from '../types';
import { STORY_CHAPTERS } from '../data/storyChapters';
import { CATEGORY_CONFIG, MOOD_CONFIG } from '../utils/receiptHelpers';
import { soundEngine } from '../utils/audioAmbience';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, Pause, ChevronRight, ChevronLeft, Sparkles, 
  Quote, ArrowRight, Compass, Eye, CheckCircle2, 
  Calendar, Clock, Link2, Barcode, HelpCircle
} from 'lucide-react';

interface StoryReelProps {
  allReceipts: LifeReceipt[];
  onInspectReceipt: (receipt: LifeReceipt) => void;
  onToggleWeaver: (receipt: LifeReceipt) => void;
  weaverIds: Set<string>;
}

export const StoryReel: React.FC<StoryReelProps> = ({
  allReceipts,
  onInspectReceipt,
  onToggleWeaver,
  weaverIds
}) => {
  const [selectedChapterId, setSelectedChapterId] = useState<string>('ch_1');
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const currentChapter = STORY_CHAPTERS.find((c) => c.id === selectedChapterId) || STORY_CHAPTERS[0];
  
  // Resolve featured receipts sequence
  const sequenceReceipts = currentChapter.featuredReceiptSequence
    .map((id) => allReceipts.find((r) => r.id === id))
    .filter((r): r is LifeReceipt => Boolean(r));

  const activeReceipt = sequenceReceipts[activeStepIndex] || sequenceReceipts[0];

  // Auto-play timer with smooth progress bar
  useEffect(() => {
    let interval: any;
    let progressTimer: any;
    const STEP_DURATION = 4800; // ms
    const INTERVAL_TICK = 50; // ms

    if (isPlaying) {
      setProgress(0);
      const startTime = Date.now();
      progressTimer = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const currentProgress = Math.min(100, (elapsed / STEP_DURATION) * 100);
        setProgress(currentProgress);
      }, INTERVAL_TICK);

      interval = setTimeout(() => {
        setActiveStepIndex((prev) => {
          if (prev >= sequenceReceipts.length - 1) {
            setIsPlaying(false);
            setProgress(0);
            return prev;
          }
          soundEngine.playTick(950, 0.02);
          return prev + 1;
        });
      }, STEP_DURATION);
    } else {
      setProgress(0);
    }

    return () => {
      clearTimeout(interval);
      clearInterval(progressTimer);
    };
  }, [isPlaying, activeStepIndex, sequenceReceipts.length]);

  // Keyboard navigation for user friendliness
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        setActiveStepIndex((prev) => {
          const next = Math.min(sequenceReceipts.length - 1, prev + 1);
          if (next !== prev) soundEngine.playTick(900, 0.02);
          return next;
        });
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setActiveStepIndex((prev) => {
          const next = Math.max(0, prev - 1);
          if (next !== prev) soundEngine.playTick(750, 0.02);
          return next;
        });
      } else if (e.key === ' ' || e.code === 'Space') {
        // Toggle play/pause on spacebar
        e.preventDefault();
        setIsPlaying((p) => !p);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [sequenceReceipts.length]);

  const handleSelectChapter = (chapterId: string) => {
    soundEngine.playPaperChirp();
    setSelectedChapterId(chapterId);
    setActiveStepIndex(0);
    setIsPlaying(false);
  };

  return (
    <div className="space-y-8">
      {/* Chapter Selection Carousel / Strip */}
      <div className="bg-zinc-900/80 p-3.5 sm:p-5 rounded-2xl border border-zinc-800 backdrop-blur-md shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 px-1 gap-1">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-amber-400" />
            <h2 className="text-xs sm:text-sm font-semibold text-zinc-200 uppercase tracking-wider font-mono">
              The 5 Chronological Life Chapters
            </h2>
          </div>
          <span className="text-[11px] text-zinc-400 font-mono">
            January 2026 – September 2026 • Click any chapter to load
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {STORY_CHAPTERS.map((chapter, idx) => {
            const isSelected = chapter.id === currentChapter.id;
            return (
              <motion.button
                key={chapter.id}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelectChapter(chapter.id)}
                className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden ${
                  isSelected
                    ? `${chapter.colorScheme.border} bg-zinc-900 ring-2 ring-amber-500/40 shadow-xl`
                    : 'border-zinc-850 bg-zinc-950/60 hover:bg-zinc-900/80 hover:border-zinc-700'
                }`}
              >
                {isSelected && (
                  <div 
                    className="absolute top-0 left-0 right-0 h-1 bg-amber-400"
                    style={{ backgroundColor: chapter.colorScheme.accent }}
                  />
                )}
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 mb-1.5">
                    <span className="font-bold text-zinc-300">CHAPTER 0{idx + 1}</span>
                    <span className="text-zinc-400">{chapter.dateRange.split('–')[0]}</span>
                  </div>
                  <h3
                    className={`font-serif font-bold text-base leading-snug line-clamp-1 mb-1 ${
                      isSelected ? 'text-white' : 'text-zinc-200'
                    }`}
                  >
                    {chapter.title}
                  </h3>
                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                    {chapter.theme}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-zinc-800/80 flex items-center justify-between text-[11px]">
                  <span className="text-zinc-500 font-mono">
                    {chapter.receiptIds.length} receipts
                  </span>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${chapter.colorScheme.badgeBg} ${chapter.colorScheme.badgeText}`}
                  >
                    {chapter.dominantMood}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Chapter Deep Dive Hero & Narrative Synthesis */}
      <div className="bg-gradient-to-b from-zinc-900/90 via-zinc-900 to-zinc-950 rounded-2xl border border-zinc-800 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Ambient Glow Accent */}
        <div
          className="absolute -top-32 -right-32 w-[32rem] h-[32rem] rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: currentChapter.colorScheme.accent }}
        />

        {/* Narrative Title & Trajectory */}
        <div className="max-w-4xl space-y-4 relative z-10">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-mono text-amber-400 uppercase tracking-wider font-bold">
              {currentChapter.dateRange}
            </span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-300 font-medium">{currentChapter.theme}</span>
            <span className="text-zinc-600">•</span>
            <span className={`px-2.5 py-0.5 rounded-full font-mono text-[11px] font-semibold border ${currentChapter.colorScheme.badgeBg} ${currentChapter.colorScheme.badgeText} ${currentChapter.colorScheme.border}`}>
              Trajectory: {currentChapter.emotionalTrajectory}
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-white tracking-tight leading-tight">
            {currentChapter.title}
          </h2>

          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-sans font-normal">
            {currentChapter.narrativeLead}
          </p>

          {/* Direct Quote Banner with Serif typography */}
          <div className="p-4 sm:p-5 rounded-xl bg-zinc-950/80 border border-zinc-800/90 flex items-start gap-3.5 text-zinc-300 shadow-inner">
            <Quote className="w-5 h-5 text-amber-400/90 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-base sm:text-lg font-serif italic font-medium text-amber-100/90 leading-relaxed">
                "{currentChapter.quote}"
              </p>
              <p className="text-xs text-zinc-400 not-italic font-mono">
                — Primary artifact recovered from subject's personal logs
              </p>
            </div>
          </div>
        </div>

        {/* The Core Story Experience: Interactive Evidence Convergence Reel */}
        <div className="mt-8 pt-8 border-t border-zinc-800 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight font-sans">
                  The Connecting Thread: Evidence In Motion
                </h3>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                How five disparate receipts connect across domains to spark this life transformation.
              </p>
            </div>

            {/* Story Player Controls & Keyboard Navigation Hints */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[11px] text-zinc-500 font-mono hidden md:inline mr-1">
                Keys: [← / → / Space]
              </span>

              <button
                onClick={() => {
                  soundEngine.playTick(750, 0.02);
                  setActiveStepIndex((prev) => Math.max(0, prev - 1));
                  setIsPlaying(false);
                }}
                disabled={activeStepIndex === 0}
                className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-750 disabled:opacity-30 disabled:pointer-events-none text-zinc-300 transition-colors cursor-pointer border border-zinc-700"
                title="Previous connected moment (Left Arrow)"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  soundEngine.playPaperChirp();
                  setIsPlaying(!isPlaying);
                }}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer shadow-md ${
                  isPlaying
                    ? 'bg-zinc-800 text-amber-400 border border-amber-500/50'
                    : 'bg-amber-400 hover:bg-amber-300 text-zinc-950 border border-amber-300'
                }`}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5 fill-current" />
                    <span>Pause Story</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Auto Play</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  soundEngine.playTick(950, 0.02);
                  setActiveStepIndex((prev) => Math.min(sequenceReceipts.length - 1, prev + 1));
                  setIsPlaying(false);
                }}
                disabled={activeStepIndex === sequenceReceipts.length - 1}
                className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-750 disabled:opacity-30 disabled:pointer-events-none text-zinc-300 transition-colors cursor-pointer border border-zinc-700"
                title="Next connected moment (Right Arrow)"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Auto-Play Animated Progress Bar */}
          {isPlaying && (
            <div className="w-full bg-zinc-850 h-1 rounded-full overflow-hidden mb-5">
              <motion.div
                className="h-full bg-amber-400"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>
          )}

          {/* Stepper Timeline Navigation Dots */}
          <div className="flex items-center gap-1.5 sm:gap-2 mb-6 overflow-x-auto pb-2 scrollbar-none">
            {sequenceReceipts.map((stepReceipt, idx) => {
              const sCat = CATEGORY_CONFIG[stepReceipt.category];
              const isActive = idx === activeStepIndex;
              return (
                <button
                  key={stepReceipt.id}
                  onClick={() => {
                    soundEngine.playTick(800 + idx * 40, 0.02);
                    setActiveStepIndex(idx);
                    setIsPlaying(false);
                  }}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer whitespace-nowrap border ${
                    isActive
                      ? 'bg-zinc-850 text-white border-amber-400/90 shadow-md ring-2 ring-amber-500/20'
                      : 'bg-zinc-950/80 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-zinc-200'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-amber-400 ring-4 ring-amber-400/20' : 'bg-zinc-600'}`} />
                  <span className="font-bold text-zinc-300">0{idx + 1}</span>
                  <span className={sCat.color}>{sCat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active Step Spotlight Card with Thermal Slip Texture */}
          {activeReceipt && (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeReceipt.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="bg-zinc-950 p-6 sm:p-7 rounded-2xl border border-zinc-800 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center shadow-xl relative"
              >
                {/* Simulated Top Perforation */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-zinc-900 flex justify-between px-2 overflow-hidden rounded-t-2xl">
                  {Array.from({ length: 40 }).map((_, i) => (
                    <div key={i} className="w-1 h-1 bg-zinc-950 rounded-full my-auto" />
                  ))}
                </div>

                {/* Receipt Evidence Display */}
                <div className="lg:col-span-7 space-y-4 pt-1">
                  <div className="flex items-center gap-2 flex-wrap text-xs">
                    <span className={`px-2.5 py-0.5 rounded-full font-semibold border ${CATEGORY_CONFIG[activeReceipt.category].bg} ${CATEGORY_CONFIG[activeReceipt.category].color} ${CATEGORY_CONFIG[activeReceipt.category].border}`}>
                      {CATEGORY_CONFIG[activeReceipt.category].label}
                    </span>
                    <span className="text-zinc-400 font-mono">
                      {activeReceipt.dateFormatted} • {activeReceipt.timeFormatted}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 text-[11px] font-mono border border-zinc-800">
                      Step {activeStepIndex + 1} of {sequenceReceipts.length}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xl sm:text-2xl font-bold text-white mb-1 font-sans">
                      {activeReceipt.title}
                    </h4>
                    <p className="text-xs font-mono text-amber-400/90 mb-3">
                      {activeReceipt.subtitle}
                    </p>
                    <p className="text-sm sm:text-base text-zinc-200 leading-relaxed bg-zinc-900/70 p-4 rounded-xl border border-zinc-800 font-sans">
                      {activeReceipt.details}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={() => {
                        soundEngine.playPaperChirp();
                        onInspectReceipt(activeReceipt);
                      }}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-850 hover:bg-zinc-800 text-xs text-zinc-100 font-medium transition-colors cursor-pointer border border-zinc-700 shadow-sm"
                    >
                      <Eye className="w-3.5 h-3.5 text-amber-400" />
                      <span>Inspect Raw Receipt Slip</span>
                    </button>

                    <button
                      onClick={() => {
                        soundEngine.playTick(1000, 0.02);
                        onToggleWeaver(activeReceipt);
                      }}
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer border ${
                        weaverIds.has(activeReceipt.id)
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                          : 'bg-zinc-900 hover:bg-zinc-850 text-zinc-300 border-zinc-800'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{weaverIds.has(activeReceipt.id) ? 'Added to Story Weaver' : 'Save for Story Weaver'}</span>
                    </button>
                  </div>
                </div>

                {/* Explanatory Narrative Connector Side */}
                <div className="lg:col-span-5 bg-gradient-to-br from-zinc-900 via-zinc-900/90 to-zinc-900/60 p-5 sm:p-6 rounded-2xl border border-zinc-800 space-y-3.5 shadow-md">
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider">
                    <Link2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>The Latent Narrative Link</span>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-sans">
                    {activeReceipt.connectionReason ||
                      'Every digital breadcrumb leaves an emotional resonance. Notice how this event does not stand alone, but directly sets up the subsequent transition.'
                    }
                  </p>

                  <div className="pt-3 border-t border-zinc-800/80 text-xs space-y-1.5">
                    <div className="text-zinc-500 font-mono text-[11px]">
                      SUBJECT PSYCHOLOGICAL STATE:
                    </div>
                    <div className="flex items-center gap-2 text-zinc-200 font-medium">
                      <span className="text-base">{MOOD_CONFIG[activeReceipt.mood].emoji}</span>
                      <span className="text-xs">{MOOD_CONFIG[activeReceipt.mood].label}</span>
                    </div>
                  </div>

                  {activeStepIndex < sequenceReceipts.length - 1 && (
                    <div className="pt-2 text-[11px] text-zinc-400 flex items-center gap-1.5 font-mono">
                      <span className="text-amber-400">Next link:</span>
                      <span className="truncate text-zinc-300">{sequenceReceipts[activeStepIndex + 1].title}</span>
                      <ArrowRight className="w-3 h-3 text-zinc-500 shrink-0" />
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {/* Behavioral Shifts & Key Insights Breakdown */}
        <div className="mt-8 pt-8 border-t border-zinc-800 grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          <div className="bg-zinc-950/80 p-5 rounded-2xl border border-zinc-800 space-y-2 shadow-sm">
            <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Behavioral Pattern Shift
            </h4>
            <p className="text-sm text-zinc-300 leading-relaxed font-sans">
              {currentChapter.behavioralShift}
            </p>
          </div>

          <div className="bg-zinc-950/80 p-5 rounded-2xl border border-zinc-800 space-y-2 shadow-sm">
            <h4 className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400" />
              Data-Derived Revelations
            </h4>
            <ul className="space-y-1.5 text-xs sm:text-sm text-zinc-300 font-sans">
              {currentChapter.keyInsights.map((insight, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-400 font-mono">→</span>
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
