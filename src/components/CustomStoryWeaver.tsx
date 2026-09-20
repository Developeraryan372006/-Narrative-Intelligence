import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LifeReceipt } from '../types';
import { CATEGORY_CONFIG, MOOD_CONFIG, synthesizeNarrative } from '../utils/receiptHelpers';
import { 
  Sparkles, X, Plus, Trash2, Printer, ArrowRight, 
  Layers, Lightbulb, BookOpen, CheckCircle2 
} from 'lucide-react';

interface CustomStoryWeaverProps {
  receipts: LifeReceipt[];
  selectedReceiptIds: string[];
  onRemoveFromWeaver: (id: string) => void;
  onClearWeaver: () => void;
  onAddPreset: (ids: string[]) => void;
  onInspectReceipt: (receipt: LifeReceipt) => void;
  onOpenPrintModal: (customReceipts?: LifeReceipt[]) => void;
}

export const CustomStoryWeaver: React.FC<CustomStoryWeaverProps> = ({
  receipts,
  selectedReceiptIds,
  onRemoveFromWeaver,
  onClearWeaver,
  onAddPreset,
  onInspectReceipt,
  onOpenPrintModal
}) => {
  const selectedReceipts = useMemo(() => {
    return selectedReceiptIds
      .map((id) => receipts.find((r) => r.id === id))
      .filter((r): r is LifeReceipt => Boolean(r));
  }, [selectedReceiptIds, receipts]);

  // Generate dynamic synthesis
  const synthesis = useMemo(() => {
    return synthesizeNarrative(selectedReceipts);
  }, [selectedReceipts]);

  // Presets to jumpstart exploration
  const PRESET_STORIES = [
    {
      label: 'The Midnight Spiral',
      ids: ['rec_001', 'rec_002', 'rec_003', 'rec_004'],
      desc: 'Ambient drone → 2 AM tachycardia search → L-Theanine order → raw journal note.'
    },
    {
      label: 'The Leap to Kyoto',
      ids: ['rec_012', 'rec_015', 'rec_016', 'rec_018', 'rec_020'],
      desc: 'Resignation letter → SFO to Tokyo flight → Olympus 35mm camera → cedar temple rain.'
    },
    {
      label: 'From Clay to Shared Table',
      ids: ['rec_021', 'rec_024', 'rec_039', 'rec_040', 'rec_042'],
      desc: 'Pottery search → wonky bowl photo → farmers market → dinner party with friends.'
    },
    {
      label: 'The 6:00 AM Metamorphosis',
      ids: ['rec_001', 'rec_030', 'rec_031', 'rec_033', 'rec_037'],
      desc: 'Insomnia at 2:41 AM mirrored against sunrise strides at 5:45 AM.'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-amber-950/30 p-6 rounded-2xl border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
              The Story Weaver Studio
            </h2>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5">
            Combine any 2 to 5 receipts from the archive to discover their latent narrative connection.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {selectedReceipts.length > 0 && (
            <button
              onClick={onClearWeaver}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Tray</span>
            </button>
          )}

          <button
            onClick={() => onOpenPrintModal(selectedReceipts.length > 0 ? selectedReceipts : undefined)}
            disabled={selectedReceipts.length === 0}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:pointer-events-none text-zinc-950 font-bold text-xs transition-colors cursor-pointer shadow-md shadow-amber-500/20"
          >
            <Printer className="w-4 h-4" />
            <span>Print Custom Life Receipt</span>
          </button>
        </div>
      </div>

      {/* Preset Inspirations */}
      <div className="space-y-2">
        <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold flex items-center gap-1.5">
          <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
          <span>Curated Connection Presets:</span>
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {PRESET_STORIES.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => onAddPreset(preset.ids)}
              className="p-3 rounded-xl bg-zinc-900/60 hover:bg-zinc-850 border border-zinc-800 hover:border-amber-500/40 text-left transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <h4 className="text-xs font-bold text-zinc-200 mb-1">
                  {preset.label}
                </h4>
                <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed">
                  {preset.desc}
                </p>
              </div>
              <div className="mt-2 pt-2 border-t border-zinc-800 text-[10px] text-amber-400 font-mono flex items-center gap-1">
                <span>Load {preset.ids.length} receipts</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Active Woven Narrative Card */}
      <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-zinc-800">
          <div>
            <span className="text-xs font-mono text-amber-400 uppercase tracking-wider font-bold">
              Synthesized Story Output
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
              {synthesis.headline}
            </h3>
          </div>
          <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-zinc-950 text-zinc-400 border border-zinc-800 shrink-0">
            {synthesis.theme}
          </span>
        </div>

        {/* Narrative Essay Text */}
        <AnimatePresence mode="wait">
          <motion.div
            key={synthesis.headline}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="bg-zinc-950/80 p-5 rounded-xl border border-zinc-800 space-y-4"
          >
            <p className="text-sm sm:text-base text-zinc-200 leading-relaxed font-sans">
              {synthesis.story}
            </p>

            {synthesis.crossDomainInsights.length > 0 && (
              <div className="pt-3 border-t border-zinc-800 space-y-1.5">
                <span className="text-xs font-mono text-zinc-400 uppercase font-semibold">
                  Pattern Deductions:
                </span>
                <ul className="space-y-1 text-xs text-zinc-300">
                  {synthesis.crossDomainInsights.map((insight, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-amber-400 font-mono">•</span>
                      <span>{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* The Currently Weaving Receipts Strip */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400 uppercase">
            <span>
              Connected Fragments In This Story ({selectedReceipts.length})
            </span>
            <span>Click (×) to remove or inspect</span>
          </div>

          <AnimatePresence mode="wait">
            {selectedReceipts.length === 0 ? (
              <motion.div
                key="empty-tray"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                className="p-8 rounded-xl border border-dashed border-zinc-800 text-center text-zinc-500 text-xs space-y-2"
              >
                <p>Your story tray is empty.</p>
                <p className="text-zinc-400">
                  Click "+ Weave" on any receipt in the Receipt Ledger or pick a preset above to weave a new chapter.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="tray-grid"
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
              >
                <AnimatePresence mode="popLayout">
                  {selectedReceipts.map((receipt) => {
                    const cat = CATEGORY_CONFIG[receipt.category];
                    return (
                      <motion.div
                        key={receipt.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        whileHover={{ y: -2 }}
                        className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 flex flex-col justify-between group shadow-sm transition-colors"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${cat.bg} ${cat.color}`}>
                              {cat.label}
                            </span>
                            <motion.button
                              whileHover={{ scale: 1.15 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => onRemoveFromWeaver(receipt.id)}
                              className="text-zinc-500 hover:text-red-400 p-0.5 transition-colors cursor-pointer"
                              title="Remove from story tray"
                            >
                              <X className="w-3.5 h-3.5" />
                            </motion.button>
                          </div>

                          <h4 className="text-xs font-bold text-zinc-200 line-clamp-1 mb-0.5">
                            {receipt.title}
                          </h4>
                          <p className="text-[11px] text-zinc-400 line-clamp-2">
                            {receipt.details}
                          </p>
                        </div>

                        <div className="mt-2 pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[10px] text-zinc-500 font-mono">
                          <span>{receipt.dateFormatted}</span>
                          <button
                            onClick={() => onInspectReceipt(receipt)}
                            className="text-amber-400 hover:underline cursor-pointer"
                          >
                            Inspect
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
