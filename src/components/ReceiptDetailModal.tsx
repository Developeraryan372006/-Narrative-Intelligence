import React, { useEffect } from 'react';
import { LifeReceipt } from '../types';
import { CATEGORY_CONFIG, MOOD_CONFIG, getConnectedReceipts } from '../utils/receiptHelpers';
import { soundEngine } from '../utils/audioAmbience';
import { 
  X, Link2, Sparkles, Barcode, Calendar, Clock, 
  MapPin, Check, Plus, ArrowRight, Layers, FileText
} from 'lucide-react';

interface ReceiptDetailModalProps {
  receipt: LifeReceipt | null;
  allReceipts: LifeReceipt[];
  onClose: () => void;
  onSelectReceipt: (receipt: LifeReceipt) => void;
  onToggleWeaver?: (receipt: LifeReceipt) => void;
  isWeaverSelected?: boolean;
}

export const ReceiptDetailModal: React.FC<ReceiptDetailModalProps> = ({
  receipt,
  allReceipts,
  onClose,
  onSelectReceipt,
  onToggleWeaver,
  isWeaverSelected = false
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!receipt) return null;

  const cat = CATEGORY_CONFIG[receipt.category];
  const mood = MOOD_CONFIG[receipt.mood];
  const connectedList = getConnectedReceipts(receipt, allReceipts);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-700/80 rounded-2xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-950/70">
          <div className="flex items-center gap-2.5">
            <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${cat.bg} ${cat.color} ${cat.border}`}>
              <span>{cat.label}</span>
            </span>
            <span className="text-xs font-mono text-zinc-400">
              RECEIPT ID #{receipt.id.toUpperCase()}
            </span>
          </div>

          <button
            onClick={() => {
              soundEngine.playTick(600, 0.02);
              onClose();
            }}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
            title="Close [Esc]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Authentic Paper Receipt Presentation */}
          <div className="relative bg-zinc-950 p-6 sm:p-7 rounded-2xl border border-zinc-800 font-mono text-sm shadow-inner overflow-hidden">
            {/* Perforated Top Margin */}
            <div className="flex justify-between items-center pb-4 mb-4 border-b border-dashed border-zinc-800 text-[11px] text-zinc-500">
              <span>STAN: {receipt.id.replace('rec_', 'T-')}</span>
              <span>TERMINAL: ARCHIVE-SF-01</span>
              <span>BATCH: 2026.09</span>
            </div>

            {/* Simulated Receipt Header */}
            <div className="text-center pb-4 mb-4 border-b border-dashed border-zinc-800">
              <p className="text-[10px] tracking-widest text-zinc-500 uppercase font-mono">
                DIGITAL LIFE LOGS • ARCHIVE V2.6
              </p>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-white mt-1 leading-snug">
                {receipt.title}
              </h2>
              <p className="text-xs text-amber-400/90 mt-1 font-mono">
                {receipt.subtitle}
              </p>
            </div>

            {/* Core Timestamps & Meta */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 text-xs border-b border-dashed border-zinc-800 mb-5 text-zinc-400 bg-zinc-900/40 p-3 rounded-xl">
              <div>
                <span className="block text-[10px] text-zinc-500 uppercase font-mono">Date</span>
                <span className="text-zinc-200 font-semibold">{receipt.dateFormatted}</span>
              </div>
              <div>
                <span className="block text-[10px] text-zinc-500 uppercase font-mono">Time</span>
                <span className="text-zinc-200 font-semibold">{receipt.timeFormatted}</span>
              </div>
              <div>
                <span className="block text-[10px] text-zinc-500 uppercase font-mono">Time Slot</span>
                <span className="text-zinc-200 font-semibold capitalize">{receipt.timeOfDay.replace('_', ' ')}</span>
              </div>
              <div>
                <span className="block text-[10px] text-zinc-500 uppercase font-mono">Mood State</span>
                <span className={`font-semibold ${mood.color}`}>{mood.emoji} {mood.label.split('/')[0].trim()}</span>
              </div>
            </div>

            {/* Photo preview if available */}
            {receipt.category === 'photos' && receipt.metadata.photoUrl && (
              <div className="mb-5 rounded-xl overflow-hidden border border-zinc-700/80 bg-black shadow-lg">
                <img
                  src={receipt.metadata.photoUrl}
                  alt={receipt.title}
                  className="w-full max-h-80 object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="p-2.5 text-xs text-zinc-400 flex justify-between bg-zinc-900/90 font-mono">
                  <span>Camera: {receipt.metadata.cameraModel}</span>
                  <span>ISO {receipt.metadata.iso} • {receipt.metadata.shutterSpeed}</span>
                </div>
              </div>
            )}

            {/* Detailed Body Logs */}
            <div className="mb-5">
              <span className="block text-[10px] text-zinc-500 uppercase mb-1.5 font-mono">
                Log Transcript & Narrative Evidence
              </span>
              <p className="text-sm font-sans text-zinc-200 leading-relaxed bg-zinc-900/70 p-4 rounded-xl border border-zinc-800">
                {receipt.details}
              </p>
            </div>

            {/* Purchase Itemization Breakdown */}
            {receipt.category === 'purchases' && receipt.metadata.items && (
              <div className="mb-5 bg-zinc-900/60 p-4 rounded-xl border border-zinc-800">
                <span className="block text-[10px] text-zinc-500 uppercase mb-2.5 font-mono">Itemized Transaction Slip</span>
                <div className="space-y-1.5 text-xs">
                  {receipt.metadata.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-zinc-300">
                      <span>{item.name}</span>
                      <span className="font-mono text-zinc-100">${item.price.toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="pt-2.5 mt-2 border-t border-zinc-800 flex justify-between font-bold text-sm text-emerald-400">
                    <span>TOTAL LOGGED</span>
                    <span>${receipt.metadata.amount?.toFixed(2)}</span>
                  </div>
                  {receipt.metadata.paymentMethod && (
                    <p className="text-[11px] text-zinc-500 text-right mt-1">
                      Paid via {receipt.metadata.paymentMethod}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Tags Cloud */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {receipt.tags.map((tag) => (
                <span key={tag} className="text-[11px] px-2.5 py-0.5 rounded-full bg-zinc-900 text-zinc-400 border border-zinc-800 font-mono">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Barcode graphic footer */}
            <div className="mt-6 pt-4 border-t border-dashed border-zinc-800 flex flex-col items-center justify-center opacity-80">
              <div className="flex gap-1 h-9 items-center justify-center">
                {Array.from({ length: 48 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-full bg-zinc-400"
                    style={{
                      width: i % 4 === 0 ? '3px' : i % 2 === 0 ? '1px' : '2px',
                      opacity: i % 7 === 0 ? 0.4 : 0.9
                    }}
                  />
                ))}
              </div>
              <span className="text-[10px] text-zinc-500 mt-1.5 font-mono tracking-widest">
                *REC-{receipt.id.toUpperCase()}-2026*
              </span>
            </div>
          </div>

          {/* Connected Narrative Story Block */}
          <div className="bg-gradient-to-br from-indigo-950/40 via-zinc-900 to-zinc-900 p-5 rounded-2xl border border-indigo-500/30">
            <div className="flex items-center gap-2 mb-2 text-indigo-400">
              <Sparkles className="w-4 h-4" />
              <h4 className="text-sm font-semibold uppercase tracking-wider font-mono">
                The Narrative Connection
              </h4>
            </div>

            <p className="text-sm text-zinc-200 leading-relaxed font-sans mb-4">
              {receipt.connectionReason || 
                'This receipt is part of a larger behavioral pattern. Individually it represents a routine moment, but in combination with surrounding records it reveals an emotional turning point.'
              }
            </p>

            {/* List of Connected Receipts */}
            {connectedList.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-semibold text-zinc-400 uppercase flex items-center gap-1.5 font-mono">
                    <Link2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Linked Life Receipts ({connectedList.length})</span>
                  </span>
                  <span className="text-[11px] text-zinc-500 font-mono">
                    Click any linked moment to inspect
                  </span>
                </div>

                <div className="space-y-2">
                  {connectedList.map((connected) => {
                    const cCat = CATEGORY_CONFIG[connected.category];
                    return (
                      <div
                        key={connected.id}
                        onClick={() => {
                          soundEngine.playPaperChirp();
                          onSelectReceipt(connected);
                        }}
                        className="group flex items-center justify-between p-3 rounded-xl bg-zinc-950/80 hover:bg-zinc-800 border border-zinc-800 hover:border-indigo-500/50 transition-all cursor-pointer shadow-sm"
                      >
                        <div className="flex items-center gap-2.5 overflow-hidden">
                          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border shrink-0 ${cCat.bg} ${cCat.color} ${cCat.border}`}>
                            {cCat.label}
                          </span>
                          <div className="truncate">
                            <p className="text-xs font-semibold text-zinc-200 group-hover:text-amber-300 truncate">
                              {connected.title}
                            </p>
                            <p className="text-[11px] text-zinc-500 truncate font-mono">
                              {connected.dateFormatted} • {connected.timeFormatted}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 text-zinc-400 group-hover:text-amber-300 shrink-0 ml-2">
                          <span className="text-xs font-medium hidden sm:inline">Inspect</span>
                          <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Bottom Action Bar */}
        <div className="px-6 py-4 border-t border-zinc-800 bg-zinc-950/70 flex items-center justify-between gap-3">
          <div className="text-xs text-zinc-400 font-mono">
            Chapter: <span className="text-amber-400 font-semibold">#{receipt.chapterId.toUpperCase()}</span>
          </div>

          <div className="flex items-center gap-2">
            {onToggleWeaver && (
              <button
                onClick={() => {
                  soundEngine.playTick(1000, 0.02);
                  onToggleWeaver(receipt);
                }}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                  isWeaverSelected
                    ? 'bg-amber-400 text-zinc-950 border-amber-300 shadow-md'
                    : 'bg-zinc-800 hover:bg-amber-950/50 text-zinc-200 hover:text-amber-300 border-zinc-700'
                }`}
              >
                {isWeaverSelected ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>In Story Weaver</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Add to Story Weaver</span>
                  </>
                )}
              </button>
            )}

            <button
              onClick={() => {
                soundEngine.playTick(600, 0.02);
                onClose();
              }}
              className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium transition-colors cursor-pointer border border-zinc-700"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
