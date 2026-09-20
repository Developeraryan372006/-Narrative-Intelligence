import React, { useState } from 'react';
import { 
  Sparkles, Receipt, Network, BarChart3, BookOpen, Compass, 
  Printer, Volume2, VolumeX, Shuffle, Info, ChevronDown, ChevronUp,
  Flame
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { soundEngine } from '../utils/audioAmbience';

export type ActiveTab = 'chapters' | 'ledger' | 'constellation' | 'insights' | 'quests' | 'weaver';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenPrintModal: () => void;
  selectedWeaverCount: number;
  onSurpriseMe?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenPrintModal,
  selectedWeaverCount,
  onSurpriseMe
}) => {
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [isBriefingOpen, setIsBriefingOpen] = useState(false);

  const handleToggleAudio = () => {
    const nextState = soundEngine.toggleAmbience();
    setIsAudioActive(nextState);
  };

  const handleTabClick = (tab: ActiveTab) => {
    soundEngine.playTick(900, 0.02);
    setActiveTab(tab);
  };

  return (
    <header className="sticky top-0 z-30 bg-zinc-950/95 backdrop-blur-xl border-b border-zinc-800/90 shadow-2xl">
      {/* Top Archival Ticker Bar */}
      <div className="bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 text-zinc-400 text-xs px-4 py-1.5 border-b border-zinc-850 flex items-center justify-between font-mono">
        <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
          <span className="text-zinc-200 font-semibold tracking-wider text-[11px]">SUBJECT: ALEX CHEN (#AC-2026)</span>
          <span className="text-zinc-700 hidden sm:inline">|</span>
          <span className="text-zinc-400 hidden sm:inline">57 RAW LOGGED RECEIPTS</span>
          <span className="text-zinc-700 hidden md:inline">|</span>
          <span className="text-zinc-400 hidden md:inline">9 LIFE DOMAINS</span>
          <span className="text-zinc-700 hidden lg:inline">|</span>
          <span className="text-amber-400/90 hidden lg:inline font-sans font-medium">9-Month Journey: Burnout → Tokyo → Pottery → 10K Run → Wholeness</span>
        </div>

        <div className="flex items-center gap-2 text-xs shrink-0">
          {/* Ambient Soundscape Toggle */}
          <button
            onClick={handleToggleAudio}
            className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-sans transition-all cursor-pointer border ${
              isAudioActive
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm'
                : 'bg-zinc-900 hover:bg-zinc-850 text-zinc-400 hover:text-zinc-200 border-zinc-800'
            }`}
            title={isAudioActive ? 'Mute ambient tape warmth' : 'Enable atmospheric tape sound'}
          >
            {isAudioActive ? (
              <>
                <Volume2 className="w-3 h-3 text-amber-400 animate-pulse" />
                <span className="hidden sm:inline">Tape Ambience On</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3 h-3 text-zinc-500" />
                <span className="hidden sm:inline">Sound Ambience</span>
              </>
            )}
          </button>

          {/* Random Pivotal Moment */}
          {onSurpriseMe && (
            <button
              onClick={() => {
                soundEngine.playPaperChirp();
                onSurpriseMe();
              }}
              className="flex items-center gap-1 text-zinc-300 hover:text-amber-300 transition-colors cursor-pointer font-sans text-xs bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 px-2 py-0.5 rounded"
              title="Reveal a random connected pivotal receipt"
            >
              <Shuffle className="w-3 h-3 text-amber-400" />
              <span className="hidden sm:inline">Surprise Me</span>
            </button>
          )}

          {/* Thermal Summary Print */}
          <button
            onClick={() => {
              soundEngine.playPaperChirp();
              onOpenPrintModal();
            }}
            className="flex items-center gap-1 text-amber-300 hover:text-amber-200 transition-colors cursor-pointer font-sans text-xs bg-amber-950/40 hover:bg-amber-950/80 border border-amber-700/50 px-2.5 py-0.5 rounded"
            title="Generate thermal life summary receipt"
          >
            <Printer className="w-3 h-3 text-amber-400" />
            <span>Print Life Slip</span>
          </button>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Identity */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/5 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-lg shadow-amber-500/5">
              <Receipt className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-1.5 font-sans">
                  Life in Receipts
                </h1>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  Story Engine
                </span>
                <button
                  onClick={() => setIsBriefingOpen(!isBriefingOpen)}
                  className="text-zinc-400 hover:text-amber-300 transition-colors p-1 rounded hover:bg-zinc-900"
                  title="What is Life in Receipts? (Click for briefing)"
                >
                  <Info className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-[11px] text-zinc-400 hidden sm:block font-mono">
                57 Fragments • 5 Chapters • 1 Reclaimed Soul
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-none">
            <button
              onClick={() => handleTabClick('chapters')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'chapters'
                  ? 'bg-zinc-800 text-white shadow-lg border border-zinc-700 ring-1 ring-amber-500/20'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
              }`}
            >
              <BookOpen className="w-4 h-4 text-indigo-400" />
              <span>Story Chapters</span>
            </button>

            <button
              onClick={() => handleTabClick('ledger')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'ledger'
                  ? 'bg-zinc-800 text-white shadow-lg border border-zinc-700 ring-1 ring-amber-500/20'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
              }`}
            >
              <Receipt className="w-4 h-4 text-amber-400" />
              <span>Receipt Ledger</span>
            </button>

            <button
              onClick={() => handleTabClick('constellation')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'constellation'
                  ? 'bg-zinc-800 text-white shadow-lg border border-zinc-700 ring-1 ring-amber-500/20'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
              }`}
            >
              <Network className="w-4 h-4 text-cyan-400" />
              <span>Connection Graph</span>
            </button>

            <button
              onClick={() => handleTabClick('insights')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'insights'
                  ? 'bg-zinc-800 text-white shadow-lg border border-zinc-700 ring-1 ring-amber-500/20'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
              }`}
            >
              <BarChart3 className="w-4 h-4 text-emerald-400" />
              <span>Life Insights</span>
            </button>

            <button
              onClick={() => handleTabClick('quests')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'quests'
                  ? 'bg-zinc-800 text-white shadow-lg border border-zinc-700 ring-1 ring-amber-500/20'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
              }`}
            >
              <Compass className="w-4 h-4 text-rose-400" />
              <span>Detective</span>
            </button>

            <button
              onClick={() => handleTabClick('weaver')}
              className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'weaver'
                  ? 'bg-amber-500/20 text-amber-300 shadow-lg border border-amber-500/50 ring-1 ring-amber-500/30'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Story Weaver</span>
              {selectedWeaverCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 rounded-full bg-amber-500 text-zinc-950 font-bold text-[10px]">
                  {selectedWeaverCount}
                </span>
              )}
            </button>
          </nav>
        </div>
      </div>

      {/* Collapsible Archive Briefing Banner */}
      <AnimatePresence>
        {isBriefingOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-zinc-800 bg-zinc-900/95"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-[10px] uppercase font-bold">
                      Concept Briefing
                    </span>
                    <span className="text-zinc-300 font-semibold text-sm">
                      How does a human life look when rendered as digital receipts?
                    </span>
                  </div>
                  <p className="text-zinc-400 font-sans leading-relaxed max-w-3xl">
                    We leave thousands of digital footprints every year—songs played at 2 AM, sudden searches for plane tickets, coffee shop orders, running logs, and quiet photos. <strong className="text-zinc-200">Life in Receipts</strong> proves that these are not mere records of consumption, but the raw manuscript of personal transformation.
                  </p>
                </div>
                <button
                  onClick={() => setIsBriefingOpen(false)}
                  className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-mono shrink-0 cursor-pointer"
                >
                  Close Briefing ✕
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
