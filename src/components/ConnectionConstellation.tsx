import React, { useState, useMemo } from 'react';
import { LifeReceipt, ReceiptCategory } from '../types';
import { CATEGORY_CONFIG, MOOD_CONFIG, getConnectedReceipts } from '../utils/receiptHelpers';
import { STORY_CHAPTERS } from '../data/storyChapters';
import { Network, Sparkles, Info, Eye, ArrowRight, Filter, Layers } from 'lucide-react';

interface ConnectionConstellationProps {
  receipts: LifeReceipt[];
  onInspectReceipt: (receipt: LifeReceipt) => void;
  onToggleWeaver: (receipt: LifeReceipt) => void;
  weaverIds: Set<string>;
}

export const ConnectionConstellation: React.FC<ConnectionConstellationProps> = ({
  receipts,
  onInspectReceipt,
  onToggleWeaver,
  weaverIds
}) => {
  const [selectedChapterFilter, setSelectedChapterFilter] = useState<string>('all');
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>('rec_001');
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  // Filter receipts for the constellation
  const visibleReceipts = useMemo(() => {
    if (selectedChapterFilter === 'all') return receipts;
    return receipts.filter((r) => r.chapterId === selectedChapterFilter);
  }, [receipts, selectedChapterFilter]);

  // Map receipts to 2D orbital coordinates in SVG space (width: 800, height: 500)
  const nodeLayout = useMemo(() => {
    const width = 800;
    const height = 500;
    const centerX = width / 2;
    const centerY = height / 2;
    const count = visibleReceipts.length;

    // Cluster based on chapter or timestamp
    return visibleReceipts.map((r, idx) => {
      // Golden ratio spiral / multi-orbit layout
      const chapterIdx = parseInt(r.chapterId.replace('ch_', ''), 10) || 1;
      const angle = (idx / count) * 2 * Math.PI + (chapterIdx * 1.2);
      const radius = 90 + ((idx % 4) * 55) + ((chapterIdx - 1) * 35);
      
      const x = Math.max(50, Math.min(width - 50, centerX + Math.cos(angle) * radius));
      const y = Math.max(50, Math.min(height - 50, centerY + Math.sin(angle) * (radius * 0.75)));

      return {
        receipt: r,
        x,
        y
      };
    });
  }, [visibleReceipts]);

  // Lookup map for coordinates
  const coordMap = useMemo(() => {
    const map = new Map<string, { x: number; y: number; receipt: LifeReceipt }>();
    nodeLayout.forEach((n) => map.set(n.receipt.id, n));
    return map;
  }, [nodeLayout]);

  // Calculate connection lines
  const edges = useMemo(() => {
    const list: Array<{
      sourceId: string;
      targetId: string;
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      isActive: boolean;
    }> = [];

    const activeId = hoveredNodeId || selectedNodeId;

    visibleReceipts.forEach((r) => {
      const source = coordMap.get(r.id);
      if (!source) return;

      (r.connectedReceiptIds || []).forEach((targetId) => {
        const target = coordMap.get(targetId);
        if (target) {
          const isRelated =
            activeId && (activeId === r.id || activeId === targetId);
          list.push({
            sourceId: r.id,
            targetId,
            x1: source.x,
            y1: source.y,
            x2: target.x,
            y2: target.y,
            isActive: Boolean(isRelated)
          });
        }
      });
    });

    return list;
  }, [visibleReceipts, coordMap, hoveredNodeId, selectedNodeId]);

  const activeReceipt = receipts.find((r) => r.id === (hoveredNodeId || selectedNodeId)) || receipts[0];
  const activeConnectedList = getConnectedReceipts(activeReceipt, receipts);

  return (
    <div className="space-y-6">
      {/* Top Controls & Explanation */}
      <div className="bg-zinc-900/80 p-4 sm:p-5 rounded-2xl border border-zinc-800 backdrop-blur-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Network className="w-5 h-5 text-cyan-400" />
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
              The Connection Constellation
            </h2>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5">
            Explore how music, searches, places, purchases, photos, and notes form interconnected neural webs.
          </p>
        </div>

        {/* Chapter Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto scrollbar-none">
          <button
            onClick={() => setSelectedChapterFilter('all')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap border ${
              selectedChapterFilter === 'all'
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 font-semibold'
                : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-zinc-200'
            }`}
          >
            All Chapters ({receipts.length})
          </button>
          {STORY_CHAPTERS.map((ch) => (
            <button
              key={ch.id}
              onClick={() => setSelectedChapterFilter(ch.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap border ${
                selectedChapterFilter === ch.id
                  ? 'bg-amber-500 text-zinc-950 border-amber-400 font-semibold'
                  : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-zinc-200'
              }`}
            >
              {ch.title.split('&')[0].trim()}
            </button>
          ))}
        </div>
      </div>

      {/* Main Canvas & Inspection Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* SVG Interactive Constellation Map */}
        <div className="lg:col-span-8 bg-zinc-950 rounded-2xl border border-zinc-800 p-4 shadow-xl relative overflow-hidden">
          {/* Subtle Grid Background */}
          <div 
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, #a1a1aa 1px, transparent 0)',
              backgroundSize: '24px 24px'
            }}
          />

          <svg
            viewBox="0 0 800 500"
            className="w-full h-auto aspect-[16/10] select-none"
          >
            <defs>
              <linearGradient id="activeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.8" />
              </linearGradient>
            </defs>

            {/* Inactive Connection Edges */}
            {edges
              .filter((e) => !e.isActive)
              .map((edge, idx) => (
                <line
                  key={`edge-inactive-${idx}`}
                  x1={edge.x1}
                  y1={edge.y1}
                  x2={edge.x2}
                  y2={edge.y2}
                  stroke="#3f3f46"
                  strokeWidth="1"
                  strokeOpacity="0.3"
                  strokeDasharray="3 3"
                />
              ))}

            {/* Active Highlighted Connection Edges */}
            {edges
              .filter((e) => e.isActive)
              .map((edge, idx) => (
                <line
                  key={`edge-active-${idx}`}
                  x1={edge.x1}
                  y1={edge.y1}
                  x2={edge.x2}
                  y2={edge.y2}
                  stroke="url(#activeGrad)"
                  strokeWidth="2.5"
                  strokeOpacity="0.9"
                  className="transition-all duration-300"
                />
              ))}

            {/* Nodes */}
            {nodeLayout.map(({ receipt, x, y }) => {
              const isSelected = selectedNodeId === receipt.id;
              const isHovered = hoveredNodeId === receipt.id;
              const isTargetConnected =
                activeReceipt &&
                (activeReceipt.connectedReceiptIds?.includes(receipt.id) ||
                  receipt.connectedReceiptIds?.includes(activeReceipt.id));
              const cat = CATEGORY_CONFIG[receipt.category];

              const nodeRadius = isSelected || isHovered ? 11 : isTargetConnected ? 8 : 6;

              return (
                <g
                  key={receipt.id}
                  transform={`translate(${x}, ${y})`}
                  className="cursor-pointer transition-transform duration-200"
                  onClick={() => setSelectedNodeId(receipt.id)}
                  onMouseEnter={() => setHoveredNodeId(receipt.id)}
                  onMouseLeave={() => setHoveredNodeId(null)}
                >
                  {/* Outer pulse aura if active */}
                  {(isSelected || isHovered) && (
                    <circle
                      r={nodeRadius + 8}
                      fill="none"
                      stroke="#06b6d4"
                      strokeWidth="1.5"
                      strokeOpacity="0.5"
                      className="animate-ping"
                    />
                  )}

                  {/* Main Node Circle */}
                  <circle
                    r={nodeRadius}
                    fill={
                      isSelected
                        ? '#f59e0b'
                        : isTargetConnected
                        ? '#06b6d4'
                        : '#27272a'
                    }
                    stroke={
                      isSelected
                        ? '#fbbf24'
                        : isTargetConnected
                        ? '#22d3ee'
                        : '#71717a'
                    }
                    strokeWidth={isSelected || isTargetConnected ? 2.5 : 1.5}
                  />

                  {/* Node Label Text if selected or hovered */}
                  {(isSelected || isHovered) && (
                    <text
                      y={-16}
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="11"
                      fontFamily="monospace"
                      fontWeight="bold"
                      className="drop-shadow-md pointer-events-none"
                    >
                      {receipt.title.slice(0, 24)}...
                    </text>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Canvas Legend */}
          <div className="mt-3 pt-3 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-3 text-[11px] text-zinc-400 font-mono">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span>Selected Node</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                <span>Direct Connection</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-zinc-600" />
                <span>Background Memory</span>
              </span>
            </div>
            <span className="text-zinc-500">
              Click any node to reveal its relational web
            </span>
          </div>
        </div>

        {/* Selected Node Relationship Dossier */}
        <div className="lg:col-span-4 bg-zinc-900 rounded-2xl border border-zinc-800 p-5 space-y-5 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Node Connection Dossier</span>
            </span>
            <span className="text-[11px] font-mono text-zinc-500">
              #{activeReceipt.id.toUpperCase()}
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1 text-xs">
              <span className={`px-2 py-0.5 rounded-full font-semibold border ${CATEGORY_CONFIG[activeReceipt.category].bg} ${CATEGORY_CONFIG[activeReceipt.category].color} ${CATEGORY_CONFIG[activeReceipt.category].border}`}>
                {CATEGORY_CONFIG[activeReceipt.category].label}
              </span>
              <span className="text-zinc-400 font-mono">
                {activeReceipt.dateFormatted} • {activeReceipt.timeFormatted}
              </span>
            </div>
            <h3 className="text-base font-bold text-white mb-1">
              {activeReceipt.title}
            </h3>
            <p className="text-xs text-zinc-400 font-mono mb-2">
              {activeReceipt.subtitle}
            </p>
            <p className="text-xs text-zinc-300 leading-relaxed bg-zinc-950 p-3 rounded-lg border border-zinc-800">
              {activeReceipt.details}
            </p>
          </div>

          {/* Explicit Latent Narrative Connection */}
          <div className="bg-cyan-950/30 p-3.5 rounded-xl border border-cyan-800/40 space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-300 font-bold block">
              Latent Life Connection
            </span>
            <p className="text-xs text-zinc-300 leading-relaxed">
              {activeReceipt.connectionReason ||
                'This activity links forward and backward across multiple days, revealing how an emotional state shifts into tangible behavior.'}
            </p>
          </div>

          {/* Connected Links List */}
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-2 block">
              Directly Linked Moments ({activeConnectedList.length})
            </span>
            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              {activeConnectedList.map((c) => {
                const cCat = CATEGORY_CONFIG[c.category];
                return (
                  <div
                    key={c.id}
                    onClick={() => setSelectedNodeId(c.id)}
                    className="p-2.5 rounded-lg bg-zinc-950 hover:bg-zinc-850 border border-zinc-800 hover:border-cyan-500/50 transition-all cursor-pointer flex items-center justify-between"
                  >
                    <div className="truncate mr-2">
                      <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${cCat.bg} ${cCat.color}`}>
                        {cCat.label}
                      </span>
                      <p className="text-xs text-zinc-200 font-medium truncate mt-0.5">
                        {c.title}
                      </p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-zinc-800 flex items-center gap-2">
            <button
              onClick={() => onInspectReceipt(activeReceipt)}
              className="flex-1 py-2 px-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium transition-colors cursor-pointer border border-zinc-700 flex items-center justify-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Full Receipt</span>
            </button>
            <button
              onClick={() => onToggleWeaver(activeReceipt)}
              className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
                weaverIds.has(activeReceipt.id)
                  ? 'bg-amber-500 text-zinc-950 border-amber-400'
                  : 'bg-zinc-950 hover:bg-zinc-800 text-zinc-300 border-zinc-800'
              }`}
            >
              {weaverIds.has(activeReceipt.id) ? 'In Weaver' : '+ Weaver'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
