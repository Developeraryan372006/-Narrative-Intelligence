import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import { LifeReceipt, MoodType, ReceiptCategory } from '../types';
import { CATEGORY_CONFIG, MOOD_CONFIG } from '../utils/receiptHelpers';
import { soundEngine } from '../utils/audioAmbience';
import { 
  Activity, Sparkles, Calendar, Clock, Eye, 
  CheckCircle2, Flame, Layers, ArrowUpRight, ChevronRight,
  TrendingUp, BarChart2, Filter
} from 'lucide-react';

export interface DensityPeak {
  id: string;
  peakIndex: number;
  date: Date;
  dateFormatted: string;
  dateRangeFormatted: string;
  densityValue: number;
  title: string;
  narrativeContext: string;
  dominantMood: MoodType;
  receipts: LifeReceipt[];
  categoryBreakdown: Record<string, number>;
  color: string;
}

interface ActivityDensityChartProps {
  receipts: LifeReceipt[];
  onInspectReceipt?: (receipt: LifeReceipt) => void;
  onToggleWeaver?: (receipt: LifeReceipt) => void;
  weaverIds?: Set<string>;
}

// Gaussian kernel helper
function gaussianKernel(u: number): number {
  return (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * u * u);
}

// Curated qualitative labels for historical peaks
const PEAK_NARRATIVES: Record<number, { title: string; narrative: string; color: string }> = {
  0: {
    title: 'The Midnight Glitch Crisis Spike',
    narrative: 'Acute insomnia, repetitive ambient loops, and panic searches clustering between 1:00 AM and 4:00 AM during Q1 corporate crunch.',
    color: '#ef4444' // red
  },
  1: {
    title: 'The Boiling Point & Resignation Surge',
    narrative: 'Sudden spike in runway calculations, war room meeting trauma, and drafting the resignation letter that broke four years of inertia.',
    color: '#f97316' // orange
  },
  2: {
    title: 'Tokyo Sabbatical Arrival & Sensory Inflow',
    narrative: 'First wave of 35mm analog street photography, Kyoto train passes, and silent ramen stalls replacing corporate Slack channels.',
    color: '#0ea5e9' // sky
  },
  3: {
    title: 'Ceramic Wheel & Tactile Grounding Wave',
    narrative: 'Transition from digital perfectionism to physical clay, stoneware slip purchases, and vinyl record sessions in San Francisco.',
    color: '#d97706' // amber
  },
  4: {
    title: 'Circadian Flip & 10K Sunrise Vitality',
    narrative: 'A morning vitality surge at 5:45 AM: sunrise Ocean Beach runs, cadence pacing music, and complete physiological nervous system recovery.',
    color: '#10b981' // emerald
  },
  5: {
    title: 'The Shared Supper Club Convergence',
    narrative: 'All disparate threads unite: handmade pasta, ceramic bowls from April, and an unplugged gathering of close friends around a candlelit table.',
    color: '#f59e0b' // gold
  }
};

export const ActivityDensityChart: React.FC<ActivityDensityChartProps> = ({
  receipts,
  onInspectReceipt,
  onToggleWeaver,
  weaverIds = new Set()
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(800);
  const [selectedPeakId, setSelectedPeakId] = useState<string>('peak_0');
  const [hoveredPoint, setHoveredPoint] = useState<{
    date: Date;
    density: number;
    nearestReceipts: LifeReceipt[];
    x: number;
    y: number;
  } | null>(null);

  // Measure container width with ResizeObserver
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0) {
          setContainerWidth(Math.floor(entry.contentRect.width));
        }
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Compute Kernel Density Estimation (KDE) and detect cluster peaks
  const { densityPoints, peaks, minDate, maxDate } = useMemo(() => {
    if (!receipts.length) {
      return { densityPoints: [], peaks: [], minDate: new Date('2026-01-01'), maxDate: new Date('2026-09-30') };
    }

    // Sort receipts chronologically
    const sorted = [...receipts].sort(
      (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

    const minDate = new Date('2026-01-08T00:00:00Z');
    const maxDate = new Date('2026-09-25T23:59:59Z');
    const minTime = minDate.getTime();
    const maxTime = maxDate.getTime();

    // 240 sample points across the timeline
    const numSamples = 240;
    const sampleStep = (maxTime - minTime) / (numSamples - 1);
    const sampleTimes: number[] = [];
    for (let i = 0; i < numSamples; i++) {
      sampleTimes.push(minTime + i * sampleStep);
    }

    // Bandwidth of 4.5 days in ms
    const bandwidth = 4.5 * 24 * 60 * 60 * 1000;
    const receiptTimes = sorted.map((r) => new Date(r.timestamp).getTime());

    // Calculate KDE density at each sample point
    const densityPoints = sampleTimes.map((t) => {
      let sum = 0;
      for (let i = 0; i < receiptTimes.length; i++) {
        const u = (t - receiptTimes[i]) / bandwidth;
        sum += gaussianKernel(u);
      }
      // Scale for legible display (approx receipts per day density)
      const density = (sum / (receiptTimes.length * (bandwidth / (24 * 60 * 60 * 1000)))) * 100;
      return {
        timestamp: t,
        date: new Date(t),
        density
      };
    });

    // Detect local maxima (peaks)
    const rawPeaks: { timestamp: number; density: number; index: number }[] = [];
    const minPeakDensity = 1.6; // minimum density threshold to register as a meaningful peak

    for (let i = 2; i < densityPoints.length - 2; i++) {
      const prev2 = densityPoints[i - 2].density;
      const prev1 = densityPoints[i - 1].density;
      const curr = densityPoints[i].density;
      const next1 = densityPoints[i + 1].density;
      const next2 = densityPoints[i + 2].density;

      if (curr > prev1 && curr > prev2 && curr > next1 && curr > next2 && curr >= minPeakDensity) {
        rawPeaks.push({
          timestamp: densityPoints[i].timestamp,
          density: curr,
          index: i
        });
      }
    }

    // Consolidate peaks closer than 14 days apart to keep the most significant one
    const mergedPeaks: { timestamp: number; density: number; index: number }[] = [];
    const minDistanceMs = 14 * 24 * 60 * 60 * 1000;

    rawPeaks.forEach((p) => {
      const existing = mergedPeaks.find((m) => Math.abs(m.timestamp - p.timestamp) < minDistanceMs);
      if (!existing) {
        mergedPeaks.push(p);
      } else if (p.density > existing.density) {
        existing.timestamp = p.timestamp;
        existing.density = p.density;
        existing.index = p.index;
      }
    });

    // Sort peaks chronologically
    mergedPeaks.sort((a, b) => a.timestamp - b.timestamp);

    // Build rich Peak cluster objects
    const peaks: DensityPeak[] = mergedPeaks.map((p, idx) => {
      const peakDate = new Date(p.timestamp);
      // Window of influence: +/- 5 days
      const windowMs = 5.5 * 24 * 60 * 60 * 1000;
      const clusterReceipts = sorted.filter((r) => {
        const rt = new Date(r.timestamp).getTime();
        return Math.abs(rt - p.timestamp) <= windowMs;
      });

      // Fallback if window caught zero: pick closest 4 receipts
      let finalReceipts = clusterReceipts;
      if (finalReceipts.length === 0) {
        finalReceipts = [...sorted]
          .sort((a, b) => Math.abs(new Date(a.timestamp).getTime() - p.timestamp) - Math.abs(new Date(b.timestamp).getTime() - p.timestamp))
          .slice(0, 4);
      }

      // Compute mood and category breakdown
      const catBreakdown: Record<string, number> = {};
      const moodCounts: Record<string, number> = {};

      finalReceipts.forEach((r) => {
        catBreakdown[r.category] = (catBreakdown[r.category] || 0) + 1;
        moodCounts[r.mood] = (moodCounts[r.mood] || 0) + 1;
      });

      let dominantMood: MoodType = (finalReceipts[0]?.mood || 'seeking');
      let maxCount = 0;
      Object.entries(moodCounts).forEach(([mood, count]) => {
        if (count > maxCount) {
          maxCount = count;
          dominantMood = mood as MoodType;
        }
      });

      const curated = PEAK_NARRATIVES[idx] || {
        title: `Digital Activity Peak #${idx + 1}`,
        narrative: 'High density clustering of cross-domain digital transactions and logged events.',
        color: '#f59e0b'
      };

      const startD = new Date(Math.min(...finalReceipts.map(r => new Date(r.timestamp).getTime())));
      const endD = new Date(Math.max(...finalReceipts.map(r => new Date(r.timestamp).getTime())));

      const formatDate = (d: Date) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

      return {
        id: `peak_${idx}`,
        peakIndex: idx + 1,
        date: peakDate,
        dateFormatted: peakDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        dateRangeFormatted: `${formatDate(startD)} – ${formatDate(endD)}, 2026`,
        densityValue: p.density,
        title: curated.title,
        narrativeContext: curated.narrative,
        dominantMood,
        receipts: finalReceipts,
        categoryBreakdown: catBreakdown,
        color: curated.color
      };
    });

    return { densityPoints, peaks, minDate, maxDate };
  }, [receipts]);

  // Selected peak object
  const activePeak = useMemo(() => {
    return peaks.find((p) => p.id === selectedPeakId) || peaks[0] || null;
  }, [peaks, selectedPeakId]);

  // D3 Rendering Effect
  useEffect(() => {
    if (!svgRef.current || !densityPoints.length) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const height = 300;
    const margin = { top: 38, right: 28, bottom: 42, left: 48 };
    const innerWidth = Math.max(280, containerWidth - margin.left - margin.right);
    const innerHeight = height - margin.top - margin.bottom;

    // Scales
    const xScale = d3.scaleTime()
      .domain([minDate, maxDate])
      .range([0, innerWidth]);

    const maxDensity = d3.max(densityPoints, (d) => d.density) || 10;
    const yScale = d3.scaleLinear()
      .domain([0, maxDensity * 1.28])
      .range([innerHeight, 0]);

    // Gradient Defs
    const defs = svg.append('defs');

    // Main Area Gradient
    const areaGradient = defs.append('linearGradient')
      .attr('id', 'activity-density-area-gradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%');

    areaGradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#f59e0b')
      .attr('stop-opacity', 0.45);

    areaGradient.append('stop')
      .attr('offset', '60%')
      .attr('stop-color', '#d97706')
      .attr('stop-opacity', 0.15);

    areaGradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#18181b')
      .attr('stop-opacity', 0.0);

    // Active Peak Window Gradient
    const windowGradient = defs.append('linearGradient')
      .attr('id', 'peak-window-gradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%');

    windowGradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#f59e0b')
      .attr('stop-opacity', 0.18);

    windowGradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#f59e0b')
      .attr('stop-opacity', 0.02);

    // Glow Filter
    const filter = defs.append('filter')
      .attr('id', 'glow-filter')
      .attr('x', '-50%')
      .attr('y', '-50%')
      .attr('width', '200%')
      .attr('height', '200%');

    filter.append('feGaussianBlur')
      .attr('stdDeviation', '4')
      .attr('result', 'coloredBlur');

    const feMerge = filter.append('feMerge');
    feMerge.append('feMergeNode').attr('in', 'coloredBlur');
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Horizontal Grid Lines
    const yAxisTicks = yScale.ticks(4);
    g.append('g')
      .attr('class', 'grid-lines')
      .selectAll('line')
      .data(yAxisTicks)
      .enter()
      .append('line')
      .attr('x1', 0)
      .attr('x2', innerWidth)
      .attr('y1', (d) => yScale(d))
      .attr('y2', (d) => yScale(d))
      .attr('stroke', '#27272a')
      .attr('stroke-dasharray', '3,4')
      .attr('stroke-width', 1);

    // Month dividers and labels
    const months = [
      new Date('2026-01-01'),
      new Date('2026-02-01'),
      new Date('2026-03-01'),
      new Date('2026-04-01'),
      new Date('2026-05-01'),
      new Date('2026-06-01'),
      new Date('2026-07-01'),
      new Date('2026-08-01'),
      new Date('2026-09-01'),
    ];

    months.forEach((m) => {
      const x = xScale(m);
      if (x >= 0 && x <= innerWidth) {
        g.append('line')
          .attr('x1', x)
          .attr('x2', x)
          .attr('y1', 0)
          .attr('y2', innerHeight)
          .attr('stroke', '#27272a')
          .attr('stroke-opacity', 0.6)
          .attr('stroke-dasharray', '2,4');

        g.append('text')
          .attr('x', x + 5)
          .attr('y', innerHeight + 20)
          .attr('fill', '#71717a')
          .attr('font-size', '10px')
          .attr('font-family', 'monospace')
          .text(d3.timeFormat('%b')(m).toUpperCase());
      }
    });

    // Active Peak Highlight Zone (Band on Canvas)
    if (activePeak) {
      const peakX = xScale(activePeak.date);
      const totalTimeSpan = maxDate.getTime() - minDate.getTime();
      const halfWindowWidth = (5.5 * 24 * 60 * 60 * 1000) * (innerWidth / totalTimeSpan);
      const bandLeft = Math.max(0, peakX - halfWindowWidth);
      const bandWidth = Math.min(innerWidth - bandLeft, halfWindowWidth * 2);

      g.append('rect')
        .attr('x', bandLeft)
        .attr('y', 0)
        .attr('width', bandWidth)
        .attr('height', innerHeight)
        .attr('fill', 'url(#peak-window-gradient)')
        .attr('rx', 4);

      g.append('line')
        .attr('x1', peakX)
        .attr('x2', peakX)
        .attr('y1', yScale(activePeak.densityValue))
        .attr('y2', innerHeight)
        .attr('stroke', activePeak.color || '#f59e0b')
        .attr('stroke-width', 1.5)
        .attr('stroke-dasharray', '3,3')
        .attr('opacity', 0.8);
    }

    // D3 Area Generator
    const areaGenerator = d3.area<{ timestamp: number; density: number }>()
      .x((d) => xScale(new Date(d.timestamp)))
      .y0(innerHeight)
      .y1((d) => yScale(d.density))
      .curve(d3.curveMonotoneX);

    // D3 Line Generator for the Top Edge
    const lineGenerator = d3.line<{ timestamp: number; density: number }>()
      .x((d) => xScale(new Date(d.timestamp)))
      .y((d) => yScale(d.density))
      .curve(d3.curveMonotoneX);

    // Draw Filled Area
    g.append('path')
      .datum(densityPoints)
      .attr('fill', 'url(#activity-density-area-gradient)')
      .attr('d', areaGenerator);

    // Draw Crest Line
    g.append('path')
      .datum(densityPoints)
      .attr('fill', 'none')
      .attr('stroke', '#f59e0b')
      .attr('stroke-width', 2.5)
      .attr('filter', 'url(#glow-filter)')
      .attr('d', lineGenerator);

    // Baseline axis line
    g.append('line')
      .attr('x1', 0)
      .attr('x2', innerWidth)
      .attr('y1', innerHeight)
      .attr('y2', innerHeight)
      .attr('stroke', '#3f3f46')
      .attr('stroke-width', 1);

    // Y Axis labels (Density units)
    yAxisTicks.forEach((t) => {
      if (t > 0) {
        g.append('text')
          .attr('x', -8)
          .attr('y', yScale(t) + 3)
          .attr('text-anchor', 'end')
          .attr('fill', '#71717a')
          .attr('font-size', '9px')
          .attr('font-family', 'monospace')
          .text(`${t.toFixed(0)}`);
      }
    });

    // Y Axis Title
    g.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -innerHeight / 2)
      .attr('y', -32)
      .attr('text-anchor', 'middle')
      .attr('fill', '#71717a')
      .attr('font-size', '9px')
      .attr('font-family', 'monospace')
      .attr('letter-spacing', '0.05em')
      .text('RECEIPTS / DAY (KDE DENSITY)');

    // Render Clickable Peak Nodes
    peaks.forEach((peak) => {
      const cx = xScale(peak.date);
      const cy = yScale(peak.densityValue);
      const isSelected = activePeak?.id === peak.id;

      const peakGroup = g.append('g')
        .attr('class', 'peak-marker group cursor-pointer')
        .attr('transform', `translate(${cx}, ${cy})`)
        .on('click', (event) => {
          event.stopPropagation();
          soundEngine.playPaperChirp();
          setSelectedPeakId(peak.id);
        });

      // Pulse ring for peak
      if (isSelected) {
        peakGroup.append('circle')
          .attr('r', 16)
          .attr('fill', 'none')
          .attr('stroke', peak.color || '#f59e0b')
          .attr('stroke-width', 1.5)
          .attr('opacity', 0.4)
          .attr('class', 'animate-ping');
      }

      // Outer halo
      peakGroup.append('circle')
        .attr('r', isSelected ? 9 : 6)
        .attr('fill', isSelected ? '#18181b' : '#27272a')
        .attr('stroke', peak.color || '#f59e0b')
        .attr('stroke-width', isSelected ? 2.5 : 1.5)
        .attr('class', 'transition-all duration-200');

      // Center core
      peakGroup.append('circle')
        .attr('r', isSelected ? 4 : 2.5)
        .attr('fill', peak.color || '#f59e0b');

      // Top Peak Badge / Flag
      const badgeG = peakGroup.append('g')
        .attr('transform', `translate(0, ${isSelected ? -22 : -17})`);

      const textStr = `P${peak.peakIndex}: ${peak.receipts.length} recs`;
      const textWidth = textStr.length * 6.2 + 10;

      badgeG.append('rect')
        .attr('x', -textWidth / 2)
        .attr('y', -11)
        .attr('width', textWidth)
        .attr('height', 16)
        .attr('rx', 8)
        .attr('fill', isSelected ? peak.color || '#f59e0b' : '#18181b')
        .attr('stroke', peak.color || '#f59e0b')
        .attr('stroke-width', 1)
        .attr('opacity', isSelected ? 1 : 0.85);

      badgeG.append('text')
        .attr('x', 0)
        .attr('y', 1)
        .attr('text-anchor', 'middle')
        .attr('fill', isSelected ? '#09090b' : '#e4e4e7')
        .attr('font-size', '9px')
        .attr('font-weight', 'bold')
        .attr('font-family', 'monospace')
        .text(textStr);
    });

    // Interactive Hover Tracking Layer
    const bisectDate = d3.bisector<{ timestamp: number }, Date>((d) => new Date(d.timestamp)).left;

    const overlay = g.append('rect')
      .attr('class', 'overlay')
      .attr('width', innerWidth)
      .attr('height', innerHeight)
      .attr('fill', 'transparent')
      .attr('cursor', 'crosshair');

    overlay.on('mousemove', (event) => {
      const [mx] = d3.pointer(event);
      const cursorDate = xScale.invert(mx);
      const idx = bisectDate(densityPoints, cursorDate, 1);
      const d0 = densityPoints[idx - 1];
      const d1 = densityPoints[idx];
      const d = d1 && cursorDate.getTime() - d0.timestamp > d1.timestamp - cursorDate.getTime() ? d1 : d0;

      if (d) {
        // Find nearest receipts within 3.5 days
        const dt = d.timestamp;
        const windowRange = 3.5 * 24 * 60 * 60 * 1000;
        const localReceipts = receipts.filter((r) => Math.abs(new Date(r.timestamp).getTime() - dt) <= windowRange);

        setHoveredPoint({
          date: new Date(d.timestamp),
          density: d.density,
          nearestReceipts: localReceipts,
          x: xScale(new Date(d.timestamp)) + margin.left,
          y: yScale(d.density) + margin.top
        });
      }
    });

    overlay.on('mouseleave', () => {
      setHoveredPoint(null);
    });

    overlay.on('click', (event) => {
      const [mx] = d3.pointer(event);
      const cursorDate = xScale.invert(mx);
      // Find closest peak
      let closestPeak = peaks[0];
      let minDist = Infinity;
      peaks.forEach((p) => {
        const dist = Math.abs(p.date.getTime() - cursorDate.getTime());
        if (dist < minDist) {
          minDist = dist;
          closestPeak = p;
        }
      });
      if (closestPeak) {
        soundEngine.playPaperChirp();
        setSelectedPeakId(closestPeak.id);
      }
    });

  }, [densityPoints, peaks, minDate, maxDate, containerWidth, activePeak, receipts]);

  return (
    <div className="space-y-6" id="activity-density-section">
      {/* Top Banner & Legend Header */}
      <div className="bg-zinc-900/90 p-5 sm:p-6 rounded-2xl border border-zinc-800 shadow-xl backdrop-blur-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold uppercase tracking-wider mb-1">
              <Activity className="w-4 h-4 text-amber-400" />
              <span>D3 Quantitative Life Density Model</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
              Temporal Activity Density & Turning Point Peaks
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl mt-1 leading-relaxed">
              Gaussian Kernel Density Estimation over all 57 receipts. Click any peak marker to reveal the concentrated cluster of digital breadcrumbs that generated that pivotal moment.
            </p>
          </div>

          {/* Quick Peak Selector Pills */}
          <div className="flex items-center gap-1.5 flex-wrap bg-zinc-950/80 p-2 rounded-xl border border-zinc-800">
            <span className="text-[10px] font-mono text-zinc-500 uppercase px-1 hidden sm:inline">
              Jump to Peak:
            </span>
            {peaks.map((p) => {
              const isSelected = activePeak?.id === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => {
                    soundEngine.playPaperChirp();
                    setSelectedPeakId(p.id);
                  }}
                  className={`text-[11px] font-mono px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 border ${
                    isSelected
                      ? 'bg-amber-400 text-zinc-950 font-bold border-amber-300 shadow-sm'
                      : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: isSelected ? '#000' : p.color }}
                  />
                  <span>Peak 0{p.peakIndex}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* D3 Canvas Viewport */}
        <div ref={containerRef} className="mt-6 relative w-full overflow-hidden bg-zinc-950/80 rounded-xl border border-zinc-800/80 p-2 shadow-inner">
          <svg
            ref={svgRef}
            width={containerWidth}
            height={300}
            className="w-full overflow-visible select-none"
          />

          {/* Dynamic Hover Tooltip */}
          {hoveredPoint && (
            <div
              className="absolute pointer-events-none bg-zinc-900/95 border border-zinc-700 text-zinc-200 text-xs rounded-xl p-3 shadow-2xl backdrop-blur-md z-20 space-y-1.5 font-sans"
              style={{
                left: Math.min(containerWidth - 220, Math.max(10, hoveredPoint.x - 100)),
                top: Math.max(10, hoveredPoint.y - 110)
              }}
            >
              <div className="flex items-center justify-between gap-3 border-b border-zinc-800 pb-1 font-mono text-[11px]">
                <span className="font-bold text-amber-400">
                  {hoveredPoint.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
                <span className="text-zinc-400">
                  {hoveredPoint.density.toFixed(1)} density
                </span>
              </div>
              <p className="text-[11px] text-zinc-300">
                {hoveredPoint.nearestReceipts.length} receipts in 7-day window
              </p>
              <p className="text-[10px] text-zinc-500 font-mono italic">
                Click to inspect nearest peak cluster
              </p>
            </div>
          )}
        </div>

        {/* Timeline Range Indicator */}
        <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 px-2 mt-2">
          <span>← January 2026 (Burnout Glitch)</span>
          <span className="text-amber-400 font-medium">Click any peak circle or curve section</span>
          <span>September 2026 (Shared Table) →</span>
        </div>
      </div>

      {/* Selected Peak Cluster Deep Dive Drawer */}
      {activePeak && (
        <div className="bg-zinc-900 p-6 sm:p-8 rounded-2xl border border-zinc-800 shadow-2xl space-y-6 relative overflow-hidden animate-in fade-in duration-200">
          {/* Ambient Glow Accent matching the peak theme */}
          <div
            className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-15 pointer-events-none -z-0"
            style={{ backgroundColor: activePeak.color }}
          />

          {/* Header of Active Peak */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-5 relative z-10">
            <div>
              <div className="flex items-center gap-2 flex-wrap text-xs font-mono mb-1.5">
                <span
                  className="px-2.5 py-0.5 rounded-full font-bold text-zinc-950 uppercase"
                  style={{ backgroundColor: activePeak.color }}
                >
                  Peak 0{activePeak.peakIndex} Cluster
                </span>
                <span className="text-zinc-400 flex items-center gap-1 font-sans">
                  <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                  {activePeak.dateRangeFormatted}
                </span>
                <span className="text-zinc-600">•</span>
                <span className="text-amber-400 font-semibold font-mono">
                  {activePeak.receipts.length} Contributing Receipts
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-tight">
                {activePeak.title}
              </h3>
            </div>

            {/* Weave Entire Cluster Quick Action */}
            {onToggleWeaver && (
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => {
                    soundEngine.playTick(1100, 0.03);
                    activePeak.receipts.forEach((r) => {
                      if (!weaverIds.has(r.id)) {
                        onToggleWeaver(r);
                      }
                    });
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs transition-all cursor-pointer shadow-md"
                >
                  <Layers className="w-4 h-4" />
                  <span>Weave All {activePeak.receipts.length} Peak Receipts</span>
                </button>
              </div>
            )}
          </div>

          {/* Narrative Diagnostic Context & Category Composition */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 relative z-10">
            <div className="lg:col-span-8 bg-zinc-950/80 p-5 rounded-xl border border-zinc-800/90 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-zinc-400">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>Behavioral Spike Synthesis</span>
              </div>
              <p className="text-sm sm:text-base text-zinc-200 leading-relaxed font-sans">
                {activePeak.narrativeContext}
              </p>
              <div className="pt-2 flex items-center gap-3 text-xs font-mono text-zinc-400">
                <span>Dominant State:</span>
                <span className="text-zinc-200 font-semibold flex items-center gap-1">
                  <span>{MOOD_CONFIG[activePeak.dominantMood]?.emoji || '💭'}</span>
                  <span>{MOOD_CONFIG[activePeak.dominantMood]?.label || activePeak.dominantMood}</span>
                </span>
              </div>
            </div>

            {/* Category Breakdown Chips */}
            <div className="lg:col-span-4 bg-zinc-950/80 p-5 rounded-xl border border-zinc-800/90 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400 uppercase">
                <span>Cluster Domain Mix</span>
                <span className="text-amber-400 font-bold">{activePeak.receipts.length} events</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {Object.entries(activePeak.categoryBreakdown).map(([catKey, count]) => {
                  const conf = CATEGORY_CONFIG[catKey as ReceiptCategory] || { label: catKey, color: 'text-zinc-300', bg: 'bg-zinc-800', border: 'border-zinc-700' };
                  return (
                    <span
                      key={catKey}
                      className={`text-xs px-2.5 py-1 rounded-lg border font-mono font-medium flex items-center gap-1.5 ${conf.bg} ${conf.color} ${conf.border}`}
                    >
                      <span>{count}×</span>
                      <span>{conf.label}</span>
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Itemized Contributing Receipts Grid */}
          <div className="space-y-3 pt-2 relative z-10">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
              <span className="uppercase font-bold tracking-wider text-zinc-300">
                Receipts Comprising This Spike ({activePeak.receipts.length})
              </span>
              <span className="text-[11px] text-zinc-500">
                Click "Inspect" to view authentic thermal receipt slip
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {activePeak.receipts.map((receipt) => {
                const cat = CATEGORY_CONFIG[receipt.category];
                const mood = MOOD_CONFIG[receipt.mood];
                const isSelectedInWeaver = weaverIds.has(receipt.id);

                return (
                  <div
                    key={receipt.id}
                    className="p-4 rounded-xl bg-zinc-950/90 border border-zinc-800/90 hover:border-zinc-700 transition-all flex flex-col justify-between space-y-3 group shadow-sm"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-mono mb-2">
                        <span className={`px-2 py-0.5 rounded-full border text-[10px] font-semibold ${cat.bg} ${cat.color} ${cat.border}`}>
                          {cat.label}
                        </span>
                        <span className="text-zinc-500">
                          {receipt.dateFormatted} • {receipt.timeFormatted}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-zinc-100 group-hover:text-amber-300 transition-colors line-clamp-1">
                        {receipt.title}
                      </h4>
                      <p className="text-xs font-mono text-zinc-400 line-clamp-1 mt-0.5">
                        {receipt.subtitle}
                      </p>
                      <p className="text-xs text-zinc-300 leading-relaxed line-clamp-2 mt-2 bg-zinc-900/50 p-2 rounded-lg border border-zinc-800/60">
                        {receipt.details}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-zinc-400 text-[11px]">
                        <span>{mood.emoji}</span>
                        <span>{mood.label.split('/')[0]}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {onInspectReceipt && (
                          <button
                            onClick={() => {
                              soundEngine.playPaperChirp();
                              onInspectReceipt(receipt);
                            }}
                            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-850 hover:bg-zinc-800 text-zinc-200 text-xs font-medium transition-colors cursor-pointer border border-zinc-700"
                          >
                            <Eye className="w-3 h-3 text-amber-400" />
                            <span>Inspect</span>
                          </button>
                        )}

                        {onToggleWeaver && (
                          <button
                            onClick={() => {
                              soundEngine.playTick(isSelectedInWeaver ? 600 : 1000, 0.02);
                              onToggleWeaver(receipt);
                            }}
                            className={`p-1 rounded-lg transition-colors cursor-pointer border ${
                              isSelectedInWeaver
                                ? 'bg-amber-400 text-zinc-950 border-amber-300'
                                : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border-zinc-800'
                            }`}
                            title={isSelectedInWeaver ? 'Remove from Weaver' : 'Add to Weaver'}
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
