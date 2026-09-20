import React, { useState, useMemo } from 'react';
import { LifeReceipt, ReceiptCategory, MoodType, TimeOfDay } from '../types';
import { CATEGORY_CONFIG, MOOD_CONFIG } from '../utils/receiptHelpers';
import { ReceiptCard } from './ReceiptCard';
import { 
  Search, Filter, SlidersHorizontal, RotateCcw, 
  Grid, List, Sparkles, Clock, AlertCircle, ArrowUpDown
} from 'lucide-react';

interface ReceiptLedgerProps {
  receipts: LifeReceipt[];
  onInspectReceipt: (receipt: LifeReceipt) => void;
  onToggleWeaver: (receipt: LifeReceipt) => void;
  weaverIds: Set<string>;
}

export const ReceiptLedger: React.FC<ReceiptLedgerProps> = ({
  receipts,
  onInspectReceipt,
  onToggleWeaver,
  weaverIds
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<ReceiptCategory | 'all'>('all');
  const [selectedMood, setSelectedMood] = useState<MoodType | 'all'>('all');
  const [selectedTimeOfDay, setSelectedTimeOfDay] = useState<TimeOfDay | 'all'>('all');
  const [sortBy, setSortBy] = useState<'chrono_asc' | 'chrono_desc' | 'most_connected'>('chrono_asc');
  const [viewMode, setViewMode] = useState<'grid' | 'tape'>('grid');
  const [hoveredLinkedIds, setHoveredLinkedIds] = useState<Set<string>>(new Set());

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: receipts.length };
    receipts.forEach((r) => {
      counts[r.category] = (counts[r.category] || 0) + 1;
    });
    return counts;
  }, [receipts]);

  // Filter logic
  const filteredReceipts = useMemo(() => {
    return receipts
      .filter((r) => {
        if (selectedCategory !== 'all' && r.category !== selectedCategory) return false;
        if (selectedMood !== 'all' && r.mood !== selectedMood) return false;
        if (selectedTimeOfDay !== 'all' && r.timeOfDay !== selectedTimeOfDay) return false;

        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = r.title.toLowerCase().includes(q);
          const matchSubtitle = r.subtitle.toLowerCase().includes(q);
          const matchDetails = r.details.toLowerCase().includes(q);
          const matchTags = r.tags.some((t) => t.toLowerCase().includes(q));
          const matchMerchant = r.metadata.merchant?.toLowerCase().includes(q);
          const matchArtist = r.metadata.artist?.toLowerCase().includes(q);
          return matchTitle || matchSubtitle || matchDetails || matchTags || matchMerchant || matchArtist;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'chrono_asc') {
          return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
        }
        if (sortBy === 'chrono_desc') {
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        }
        if (sortBy === 'most_connected') {
          return (b.connectedReceiptIds?.length || 0) - (a.connectedReceiptIds?.length || 0);
        }
        return 0;
      });
  }, [receipts, selectedCategory, selectedMood, selectedTimeOfDay, searchQuery, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedMood('all');
    setSelectedTimeOfDay('all');
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedCategory !== 'all' ||
    selectedMood !== 'all' ||
    selectedTimeOfDay !== 'all';

  const categoriesList: Array<ReceiptCategory | 'all'> = [
    'all',
    'music',
    'entertainment',
    'places',
    'purchases',
    'photos',
    'messages',
    'searches',
    'events',
    'notes'
  ];

  return (
    <div className="space-y-6">
      {/* Controls & Search Bar */}
      <div className="bg-zinc-900/90 p-4 sm:p-5 rounded-2xl border border-zinc-800 backdrop-blur-md space-y-4">
        {/* Search Input & Quick Stats */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:max-w-md">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search receipts by keyword, song, place, note, query..."
              className="w-full bg-zinc-950 text-zinc-100 placeholder-zinc-500 pl-9 pr-4 py-2 rounded-xl border border-zinc-800 focus:outline-none focus:border-amber-500 text-xs sm:text-sm font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 text-xs px-1"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
            <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-xl border border-zinc-800 text-xs">
              <button
                onClick={() => setSortBy('chrono_asc')}
                className={`px-2 py-1 rounded-lg transition-colors cursor-pointer ${
                  sortBy === 'chrono_asc' ? 'bg-zinc-800 text-white font-medium' : 'text-zinc-400 hover:text-zinc-200'
                }`}
                title="Sort Chronologically (Jan → Sep)"
              >
                Jan → Sep
              </button>
              <button
                onClick={() => setSortBy('chrono_desc')}
                className={`px-2 py-1 rounded-lg transition-colors cursor-pointer ${
                  sortBy === 'chrono_desc' ? 'bg-zinc-800 text-white font-medium' : 'text-zinc-400 hover:text-zinc-200'
                }`}
                title="Sort Reverse Chronologically (Sep → Jan)"
              >
                Sep → Jan
              </button>
              <button
                onClick={() => setSortBy('most_connected')}
                className={`px-2 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                  sortBy === 'most_connected' ? 'bg-zinc-800 text-amber-300 font-medium' : 'text-zinc-400 hover:text-zinc-200'
                }`}
                title="Sort by Most Connected Receipts First"
              >
                <Sparkles className="w-3 h-3" />
                <span className="hidden sm:inline">Top Connected</span>
              </button>
            </div>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 bg-amber-950/30 px-2.5 py-1.5 rounded-lg border border-amber-800/40 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Category Pills Strip */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categoriesList.map((catKey) => {
            const isSelected = selectedCategory === catKey;
            const count = categoryCounts[catKey] || 0;
            const label = catKey === 'all' ? 'All Activities' : CATEGORY_CONFIG[catKey].label;

            return (
              <button
                key={catKey}
                onClick={() => setSelectedCategory(catKey)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer whitespace-nowrap border ${
                  isSelected
                    ? 'bg-amber-500 text-zinc-950 border-amber-400 font-semibold shadow-sm'
                    : 'bg-zinc-950/60 text-zinc-400 border-zinc-800 hover:bg-zinc-800 hover:text-zinc-200'
                }`}
              >
                <span>{label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isSelected ? 'bg-zinc-950/20 text-zinc-950' : 'bg-zinc-800 text-zinc-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Secondary Filter Row: Mood & Time of Day */}
        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-zinc-800/60 text-xs">
          {/* Mood Selector */}
          <div className="flex items-center gap-1.5">
            <span className="text-zinc-500 font-mono text-[11px]">Mood:</span>
            <select
              value={selectedMood}
              onChange={(e) => setSelectedMood(e.target.value as any)}
              className="bg-zinc-950 text-zinc-200 text-xs px-2.5 py-1 rounded-lg border border-zinc-800 focus:outline-none focus:border-amber-500 cursor-pointer"
            >
              <option value="all">All Emotional States</option>
              {Object.entries(MOOD_CONFIG).map(([key, config]) => (
                <option key={key} value={key}>
                  {config.emoji} {config.label}
                </option>
              ))}
            </select>
          </div>

          {/* Time of Day Selector */}
          <div className="flex items-center gap-1.5">
            <span className="text-zinc-500 font-mono text-[11px]">Time of Day:</span>
            <select
              value={selectedTimeOfDay}
              onChange={(e) => setSelectedTimeOfDay(e.target.value as any)}
              className="bg-zinc-950 text-zinc-200 text-xs px-2.5 py-1 rounded-lg border border-zinc-800 focus:outline-none focus:border-amber-500 cursor-pointer"
            >
              <option value="all">All Hours</option>
              <option value="late_night">Late Night (12 AM - 5 AM)</option>
              <option value="morning">Morning (5 AM - 12 PM)</option>
              <option value="afternoon">Afternoon (12 PM - 5 PM)</option>
              <option value="evening">Evening (5 PM - 12 AM)</option>
            </select>
          </div>

          <div className="ml-auto text-xs text-zinc-400 font-mono">
            Showing <span className="text-amber-400 font-semibold">{filteredReceipts.length}</span> of {receipts.length} receipts
          </div>
        </div>
      </div>

      {/* Receipts Grid */}
      {filteredReceipts.length === 0 ? (
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-12 text-center space-y-3">
          <AlertCircle className="w-8 h-8 text-zinc-500 mx-auto" />
          <h3 className="text-base font-semibold text-zinc-300">
            No Life Receipts Found
          </h3>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto">
            Try loosening your filters, switching to all categories, or clearing your search term.
          </p>
          <button
            onClick={clearFilters}
            className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-200 font-medium transition-colors cursor-pointer"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredReceipts.map((receipt) => (
            <ReceiptCard
              key={receipt.id}
              receipt={receipt}
              onInspect={onInspectReceipt}
              onToggleWeaver={onToggleWeaver}
              isWeaverSelected={weaverIds.has(receipt.id)}
              isLinkedHighlight={hoveredLinkedIds.has(receipt.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
