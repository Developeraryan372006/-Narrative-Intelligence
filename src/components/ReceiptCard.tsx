import React from 'react';
import { LifeReceipt } from '../types';
import { CATEGORY_CONFIG, MOOD_CONFIG } from '../utils/receiptHelpers';
import { soundEngine } from '../utils/audioAmbience';
import { 
  Music, Film, MapPin, Receipt as ReceiptIcon, 
  Camera, MessageSquare, Search, Calendar, FileText, 
  Link2, Plus, Check, Eye
} from 'lucide-react';

interface ReceiptCardProps {
  receipt: LifeReceipt;
  onInspect: (receipt: LifeReceipt) => void;
  onToggleWeaver?: (receipt: LifeReceipt) => void;
  isWeaverSelected?: boolean;
  highlightCategory?: string;
  isLinkedHighlight?: boolean;
}

export const ReceiptCard: React.FC<ReceiptCardProps> = ({
  receipt,
  onInspect,
  onToggleWeaver,
  isWeaverSelected = false,
  highlightCategory,
  isLinkedHighlight = false
}) => {
  const cat = CATEGORY_CONFIG[receipt.category];
  const mood = MOOD_CONFIG[receipt.mood];

  const getCategoryIcon = () => {
    switch (receipt.category) {
      case 'music': return <Music className="w-3.5 h-3.5" />;
      case 'entertainment': return <Film className="w-3.5 h-3.5" />;
      case 'places': return <MapPin className="w-3.5 h-3.5" />;
      case 'purchases': return <ReceiptIcon className="w-3.5 h-3.5" />;
      case 'photos': return <Camera className="w-3.5 h-3.5" />;
      case 'messages': return <MessageSquare className="w-3.5 h-3.5" />;
      case 'searches': return <Search className="w-3.5 h-3.5" />;
      case 'events': return <Calendar className="w-3.5 h-3.5" />;
      case 'notes': return <FileText className="w-3.5 h-3.5" />;
      default: return <ReceiptIcon className="w-3.5 h-3.5" />;
    }
  };

  const isCategoryMatched = highlightCategory && highlightCategory === receipt.category;

  return (
    <div
      className={`group relative flex flex-col justify-between bg-zinc-900/95 hover:bg-zinc-850 text-zinc-100 rounded-xl border transition-all duration-200 overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 ${
        isWeaverSelected
          ? 'border-amber-500/80 ring-2 ring-amber-500/30 bg-amber-950/10'
          : isLinkedHighlight
          ? 'border-cyan-500/80 ring-2 ring-cyan-500/30'
          : isCategoryMatched
          ? 'border-amber-500/60 ring-1 ring-amber-500/20'
          : 'border-zinc-800 hover:border-zinc-700'
      }`}
    >
      {/* Top Perforated Receipt Pattern */}
      <div className="h-1.5 w-full bg-zinc-950 flex justify-between px-1.5 overflow-hidden">
        {Array.from({ length: 28 }).map((_, i) => (
          <div key={i} className="w-1 h-1 bg-zinc-900 rounded-full my-auto" />
        ))}
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        {/* Header Metadata */}
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-1.5">
              <span
                className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full border ${cat.bg} ${cat.color} ${cat.border}`}
              >
                {getCategoryIcon()}
                <span>{cat.label}</span>
              </span>

              <span
                className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800/80 text-zinc-400 border border-zinc-700/60"
                title={`Recorded during: ${receipt.timeOfDay.replace('_', ' ')}`}
              >
                {receipt.timeFormatted}
              </span>
            </div>

            <span className="text-[11px] text-zinc-400 font-mono">
              {receipt.dateFormatted}
            </span>
          </div>

          {/* Title & Subtitle */}
          <h3 className="font-semibold text-sm sm:text-base text-zinc-100 group-hover:text-amber-300 transition-colors line-clamp-2 mb-1">
            {receipt.title}
          </h3>

          <p className="text-xs text-zinc-400 mb-2.5 line-clamp-1 font-mono">
            {receipt.subtitle}
          </p>

          {/* Thumbnail preview for photos */}
          {receipt.category === 'photos' && receipt.metadata.photoUrl && (
            <div className="relative mb-3 rounded-lg overflow-hidden border border-zinc-700/80 max-h-36 bg-zinc-950">
              <img
                src={receipt.metadata.photoUrl}
                alt={receipt.title}
                className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/70 text-[10px] font-mono text-zinc-300">
                {receipt.metadata.cameraModel || '35mm Film'}
              </div>
            </div>
          )}

          {/* Itemized preview for purchases */}
          {receipt.category === 'purchases' && receipt.metadata.amount && (
            <div className="mb-2.5 p-2 rounded bg-zinc-950/60 border border-zinc-800 font-mono text-xs flex items-center justify-between">
              <span className="text-zinc-400 truncate mr-2">
                {receipt.metadata.merchant || 'Transaction'}
              </span>
              <span className="font-bold text-emerald-400 shrink-0">
                ${receipt.metadata.amount.toFixed(2)}
              </span>
            </div>
          )}

          {/* Body Content Details */}
          <p className="text-xs text-zinc-300/90 line-clamp-3 leading-relaxed mb-3">
            {receipt.details}
          </p>
        </div>

        {/* Footer Area: Mood, Connections, and Actions */}
        <div className="pt-3 border-t border-zinc-800/80 mt-auto">
          <div className="flex items-center justify-between gap-2 mb-2.5">
            {/* Mood pill */}
            <div
              className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full border ${mood.bg} ${mood.color} ${mood.border}`}
            >
              <span>{mood.emoji}</span>
              <span className="truncate max-w-[120px]">{mood.label.split('/')[0].trim()}</span>
            </div>

            {/* Connected receipts badge */}
            {receipt.connectedReceiptIds && receipt.connectedReceiptIds.length > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onInspect(receipt);
                }}
                className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/50 text-cyan-300 border border-cyan-800/50 hover:bg-cyan-900/60 transition-colors cursor-pointer"
                title={`${receipt.connectedReceiptIds.length} connected moments. Click to view.`}
              >
                <Link2 className="w-3 h-3 text-cyan-400" />
                <span>{receipt.connectedReceiptIds.length} links</span>
              </button>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={() => {
                soundEngine.playPaperChirp();
                onInspect(receipt);
              }}
              className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium transition-colors cursor-pointer border border-zinc-700/60"
            >
              <Eye className="w-3.5 h-3.5 text-amber-400" />
              <span>Inspect Receipt</span>
            </button>

            {onToggleWeaver && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  soundEngine.playTick(isWeaverSelected ? 650 : 1050, 0.02);
                  onToggleWeaver(receipt);
                }}
                className={`py-1.5 px-2.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1 border ${
                  isWeaverSelected
                    ? 'bg-amber-400 text-zinc-950 border-amber-300 font-semibold'
                    : 'bg-zinc-800/60 hover:bg-amber-950/40 text-zinc-300 hover:text-amber-300 border-zinc-700/60 hover:border-amber-700/50'
                }`}
                title={isWeaverSelected ? 'Remove from Story Weaver' : 'Add to Story Weaver'}
              >
                {isWeaverSelected ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Weaving</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5" />
                    <span>Weave</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Simulated Bottom Receipt Perforation */}
      <div className="h-1.5 w-full bg-zinc-950 flex justify-between px-1.5 overflow-hidden">
        {Array.from({ length: 28 }).map((_, i) => (
          <div key={i} className="w-1 h-1 bg-zinc-900 rounded-full my-auto" />
        ))}
      </div>
    </div>
  );
};
