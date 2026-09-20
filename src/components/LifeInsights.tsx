import React, { useState } from 'react';
import { LifeReceipt } from '../types';
import { ActivityDensityChart } from './ActivityDensityChart';
import { 
  BarChart3, TrendingUp, Sun, Moon, Clock, DollarSign, 
  HeartHandshake, Sparkles, Activity, ShieldCheck, Layers 
} from 'lucide-react';

interface LifeInsightsProps {
  receipts: LifeReceipt[];
  onInspectReceipt?: (receipt: LifeReceipt) => void;
  onToggleWeaver?: (receipt: LifeReceipt) => void;
  weaverIds?: Set<string>;
}

export const LifeInsights: React.FC<LifeInsightsProps> = ({ 
  receipts,
  onInspectReceipt,
  onToggleWeaver,
  weaverIds
}) => {
  const [activeInsightTab, setActiveInsightTab] = useState<'density' | 'circadian' | 'sentiment' | 'spend' | 'patterns'>('density');

  // Circadian distribution computation
  const hoursMap: Record<number, { count: number; earlyMonth: number; lateMonth: number }> = {};
  for (let i = 0; i < 24; i++) {
    hoursMap[i] = { count: 0, earlyMonth: 0, lateMonth: 0 };
  }

  receipts.forEach((r) => {
    const d = new Date(r.timestamp);
    const hour = d.getUTCHours();
    const month = d.getUTCMonth(); // 0 = Jan, 8 = Sep
    if (hoursMap[hour]) {
      hoursMap[hour].count++;
      if (month <= 1) hoursMap[hour].earlyMonth++;
      if (month >= 5) hoursMap[hour].lateMonth++;
    }
  });

  // Sentiment by Month
  const monthlySentiment = [
    { month: 'Jan', label: 'January', score: -0.76, status: 'Severe Burnout', receipts: 14, color: '#ef4444' },
    { month: 'Feb', label: 'February', score: -0.52, status: 'Crisis & Resignation', receipts: 9, color: '#f97316' },
    { month: 'Mar', label: 'March', score: +0.48, status: 'Tokyo Sabbatical', receipts: 11, color: '#0ea5e9' },
    { month: 'Apr', label: 'April', score: +0.78, status: 'Tactile Pottery', receipts: 8, color: '#d97706' },
    { month: 'May', label: 'May', score: +0.84, status: 'Slow Craft Flow', receipts: 4, color: '#d97706' },
    { month: 'Jun', label: 'June', score: +0.91, status: 'Sunrise Running', receipts: 7, color: '#10b981' },
    { month: 'Jul', label: 'July', score: +0.94, status: '10K Race Milestone', receipts: 5, color: '#10b981' },
    { month: 'Aug', label: 'August', score: +0.96, status: 'Supper Club Feast', receipts: 7, color: '#f59e0b' },
    { month: 'Sep', label: 'September', score: +0.98, status: 'Integrated Wholeness', receipts: 4, color: '#f59e0b' },
  ];

  // Spend vs Meaning Correlation Items
  const spendComparison = [
    {
      item: 'DoorDash & Late Night Uber Rides',
      period: 'January Crunch',
      cost: '$485.00/mo',
      lastingHappiness: '0%',
      type: 'reactive',
      insight: 'Automated convenience consumed to survive unsustainable work pressure.'
    },
    {
      item: 'Amazon Insomnia Kits & Eye Masks',
      period: 'January / February',
      cost: '$94.00',
      lastingHappiness: '5%',
      type: 'reactive',
      insight: 'Treating the physical symptom while ignoring the systemic burnout cause.'
    },
    {
      item: 'One-Way SFO → Tokyo Ticket',
      period: 'March Resignation',
      cost: '$894.20',
      lastingHappiness: '95%',
      type: 'transformational',
      insight: 'The single purchase that broke four years of habitual inertia.'
    },
    {
      item: 'Beginner Pottery Class & Stoneware Clay',
      period: 'April / May',
      cost: '$454.50',
      lastingHappiness: '98%',
      type: 'transformational',
      insight: 'Hands-on tactile creation that replaced pixel perfectionism with acceptance.'
    },
    {
      item: 'Running Shoes & 10K Race Entry',
      period: 'June / July',
      cost: '$232.25',
      lastingHappiness: '96%',
      type: 'transformational',
      insight: 'Reclaimed physical lung capacity and rebuilt somatic nervous system.'
    },
    {
      item: 'Farmers Market Provisions & Dinner Table',
      period: 'August / September',
      cost: '$151.50',
      lastingHappiness: '100%',
      type: 'transformational',
      insight: 'Nourishing friendship and community through home-cooked food.'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Overview */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 p-6 sm:p-8 rounded-2xl border border-zinc-800 shadow-xl">
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider">
            <Activity className="w-4 h-4" />
            <span>Narrative Intelligence & Quantitative Biometrics</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            From Raw Data to Human Truths
          </h2>
          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-sans">
            A single receipt is an ephemeral transactional log. Fifty-seven receipts across nine months constitute a high-fidelity psychological portrait of recovery, agency, and rebirth.
          </p>
        </div>

        {/* Metric Ribbons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-zinc-800 text-xs font-mono">
          <div className="bg-zinc-950/70 p-3 rounded-xl border border-zinc-800">
            <span className="text-zinc-500 uppercase block text-[10px]">Resting Pulse Shift</span>
            <span className="text-base font-bold text-emerald-400">94 → 58 bpm</span>
          </div>
          <div className="bg-zinc-950/70 p-3 rounded-xl border border-zinc-800">
            <span className="text-zinc-500 uppercase block text-[10px]">Circadian Peak</span>
            <span className="text-base font-bold text-amber-400">02:45 AM → 05:45 AM</span>
          </div>
          <div className="bg-zinc-950/70 p-3 rounded-xl border border-zinc-800">
            <span className="text-zinc-500 uppercase block text-[10px]">Daily Movement</span>
            <span className="text-base font-bold text-sky-400">2.1k → 14.2k steps</span>
          </div>
          <div className="bg-zinc-950/70 p-3 rounded-xl border border-zinc-800">
            <span className="text-zinc-500 uppercase block text-[10px]">Analog vs Screen Output</span>
            <span className="text-base font-bold text-indigo-400">0% → 82% analog</span>
          </div>
        </div>
      </div>

      {/* Sub-Tabs for Insights */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-zinc-800">
        <button
          onClick={() => setActiveInsightTab('density')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer shrink-0 border ${
            activeInsightTab === 'density'
              ? 'bg-amber-400 text-zinc-950 border-amber-300 font-bold shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200 border-transparent hover:bg-zinc-900'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Activity Density & Peak Clusters</span>
          <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
            activeInsightTab === 'density' ? 'bg-zinc-950 text-amber-300' : 'bg-zinc-800 text-amber-400'
          }`}>
            D3 Model
          </span>
        </button>

        <button
          onClick={() => setActiveInsightTab('circadian')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer shrink-0 border ${
            activeInsightTab === 'circadian'
              ? 'bg-amber-400 text-zinc-950 border-amber-300 font-bold shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200 border-transparent hover:bg-zinc-900'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>The Circadian Inversion (24h Clock)</span>
        </button>

        <button
          onClick={() => setActiveInsightTab('sentiment')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer shrink-0 border ${
            activeInsightTab === 'sentiment'
              ? 'bg-amber-400 text-zinc-950 border-amber-300 font-bold shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200 border-transparent hover:bg-zinc-900'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Emotional Sentiment Arc</span>
        </button>

        <button
          onClick={() => setActiveInsightTab('spend')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer shrink-0 border ${
            activeInsightTab === 'spend'
              ? 'bg-amber-400 text-zinc-950 border-amber-300 font-bold shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200 border-transparent hover:bg-zinc-900'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>Spend vs Value Matrix</span>
        </button>

        <button
          onClick={() => setActiveInsightTab('patterns')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer shrink-0 border ${
            activeInsightTab === 'patterns'
              ? 'bg-amber-400 text-zinc-950 border-amber-300 font-bold shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200 border-transparent hover:bg-zinc-900'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>The 5 Core Deductions</span>
        </button>
      </div>

      {/* Tab 0: D3 Activity Density & Peak Clusters */}
      {activeInsightTab === 'density' && (
        <ActivityDensityChart
          receipts={receipts}
          onInspectReceipt={onInspectReceipt}
          onToggleWeaver={onToggleWeaver}
          weaverIds={weaverIds}
        />
      )}

      {/* Tab 1: Circadian Inversion 24h Heatmap */}
      {activeInsightTab === 'circadian' && (
        <div className="bg-zinc-900 p-6 sm:p-8 rounded-2xl border border-zinc-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sun className="w-5 h-5 text-amber-400" />
                <span>24-Hour Circadian Inversion Heatmap</span>
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Comparing Jan/Feb late-night panic activity (red) vs June/July/Aug morning vitality activity (emerald).
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-red-400">
                <span className="w-3 h-3 rounded bg-red-500/80" />
                <span>Jan/Feb (Crunch)</span>
              </span>
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-3 h-3 rounded bg-emerald-500/80" />
                <span>Jun/Aug (Rebirth)</span>
              </span>
            </div>
          </div>

          {/* 24-Hour Bar Graph */}
          <div className="space-y-2 pt-4">
            <div className="grid grid-cols-12 sm:grid-cols-24 gap-1.5 items-end h-48 bg-zinc-950 p-4 rounded-xl border border-zinc-800">
              {Array.from({ length: 24 }).map((_, hour) => {
                const data = hoursMap[hour] || { earlyMonth: 0, lateMonth: 0, count: 0 };
                const earlyHeight = Math.min(100, data.earlyMonth * 22);
                const lateHeight = Math.min(100, data.lateMonth * 22);

                return (
                  <div key={hour} className="flex flex-col items-center h-full justify-end group relative">
                    {/* Tooltip */}
                    <div className="absolute -top-12 bg-zinc-900 border border-zinc-700 text-white text-[10px] font-mono px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-10 whitespace-nowrap shadow-lg">
                      {hour}:00 — Early: {data.earlyMonth} | Late: {data.lateMonth}
                    </div>

                    <div className="w-full flex gap-0.5 items-end justify-center h-full">
                      {/* Early month bar */}
                      <div
                        style={{ height: `${earlyHeight}%` }}
                        className="w-1.5 sm:w-2 bg-red-500/80 hover:bg-red-400 rounded-t transition-all"
                      />
                      {/* Late month bar */}
                      <div
                        style={{ height: `${lateHeight}%` }}
                        className="w-1.5 sm:w-2 bg-emerald-500/80 hover:bg-emerald-400 rounded-t transition-all"
                      />
                    </div>

                    <span className="text-[9px] font-mono text-zinc-500 mt-1">
                      {hour % 6 === 0 ? `${hour}h` : ''}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between text-[11px] font-mono text-zinc-500 px-2">
              <span>00:00 (Midnight)</span>
              <span>06:00 (Dawn)</span>
              <span>12:00 (Noon)</span>
              <span>18:00 (Dusk)</span>
              <span>23:59 (Night)</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-xs sm:text-sm text-zinc-300 leading-relaxed">
            <span className="text-amber-400 font-bold font-mono">INSIGHT REVEALED: </span>
            In January, Alex experienced acute circadian disruption with 41% of all digital searches occurring between 2:00 AM and 4:00 AM. By June, this cluster completely inverted to between 5:45 AM and 7:30 AM—not for work, but for sunrise runs along Ocean Beach and tactile pottery prep.
          </div>
        </div>
      )}

      {/* Tab 2: Monthly Emotional Sentiment Arc */}
      {activeInsightTab === 'sentiment' && (
        <div className="bg-zinc-900 p-6 sm:p-8 rounded-2xl border border-zinc-800 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-sky-400" />
              <span>Emotional Sentiment Trajectory (-1.0 to +1.0)</span>
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Natural Language Processing sentiment score aggregated across notes, messages, and music tempos.
            </p>
          </div>

          {/* Sentiment Grid Bars */}
          <div className="grid grid-cols-3 sm:grid-cols-9 gap-2.5 pt-2">
            {monthlySentiment.map((item) => {
              const isNegative = item.score < 0;
              const percentage = Math.abs(item.score) * 100;

              return (
                <div
                  key={item.month}
                  className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 flex flex-col justify-between"
                >
                  <div className="text-center">
                    <span className="text-xs font-mono font-bold text-zinc-400 uppercase">
                      {item.month}
                    </span>
                    <p className="text-[10px] text-zinc-500 truncate">{item.status}</p>
                  </div>

                  <div className="my-4 flex flex-col items-center justify-center">
                    <span
                      className="text-lg font-extrabold font-mono"
                      style={{ color: item.color }}
                    >
                      {item.score > 0 ? `+${item.score.toFixed(2)}` : item.score.toFixed(2)}
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono">
                      {item.receipts} receipts
                    </span>
                  </div>

                  <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: item.color
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-xs sm:text-sm text-zinc-300 leading-relaxed">
            <span className="text-sky-400 font-bold font-mono">THE TRAJECTORY: </span>
            The inflection point occurred sharply between February 23 (resignation letter drafted) and March 12 (arrival in Tokyo). Emotional stabilization followed rapidly once tactile physical crafts (pottery and cooking) grounded Alex in reality rather than synthetic corporate metrics.
          </div>
        </div>
      )}

      {/* Tab 3: Spend vs Value Matrix */}
      {activeInsightTab === 'spend' && (
        <div className="bg-zinc-900 p-6 sm:p-8 rounded-2xl border border-zinc-800 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-amber-400" />
              <span>Spend vs Meaning: The Real ROI of Capital</span>
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Analyzing transactional receipts by whether they functioned as reactive coping mechanisms or transformational life investments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {spendComparison.map((item, idx) => (
              <div
                key={idx}
                className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-mono text-zinc-400">{item.period}</span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                        item.type === 'transformational'
                          ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800/60'
                          : 'bg-red-950/60 text-red-300 border-red-800/60'
                      }`}
                    >
                      {item.type === 'transformational' ? 'Transformational' : 'Reactive Coping'}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-zinc-200">
                    {item.item}
                  </h4>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed">
                  {item.insight}
                </p>

                <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-500">Expenditure: {item.cost}</span>
                  <span className="font-bold text-amber-400">
                    Lasting Impact: {item.lastingHappiness}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: The 5 Core Deductions */}
      {activeInsightTab === 'patterns' && (
        <div className="bg-zinc-900 p-6 sm:p-8 rounded-2xl border border-zinc-800 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>The 5 Definitive Behavioral Patterns Discovered</span>
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Synthesized from cross-domain correlations across all 57 receipts.
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1.5">
              <span className="text-xs font-mono text-amber-400 uppercase font-bold">
                Pattern 1: The Ambient Repeat Trap
              </span>
              <p className="text-sm text-zinc-300 leading-relaxed">
                When a user loops the same ambient drone song on Spotify more than 10 times consecutively between midnight and 3 AM, it does not indicate musical appreciation; it indicates sensory regulation during intense nervous system shutdown.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1.5">
              <span className="text-xs font-mono text-cyan-400 uppercase font-bold">
                Pattern 2: The Unsent Draft as Emotional Barometer
              </span>
              <p className="text-sm text-zinc-300 leading-relaxed">
                In January, 100% of drafts to family were deleted without sending due to shame and exhaustion. By April and August, outgoing messages were casual, humorous, and accompanied by photos of lopsided pottery and pasta sauce.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1.5">
              <span className="text-xs font-mono text-emerald-400 uppercase font-bold">
                Pattern 3: The Tangible Friction Antidote
              </span>
              <p className="text-sm text-zinc-300 leading-relaxed">
                Replacing frictionless digital software with analog friction (mechanical 35mm film rolls, 55lb clay blocks, manual hand-crank pasta rollers) directly resolved existential anxiety by requiring full physical presence.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1.5">
              <span className="text-xs font-mono text-indigo-400 uppercase font-bold">
                Pattern 4: Circadian Synchrony
              </span>
              <p className="text-sm text-zinc-300 leading-relaxed">
                Waking early for oneself (5:45 AM sunrise ocean runs) fundamentally differs from staying up late to satisfy an employer's deadline. The exact same timestamp of early morning produced diametrically opposite emotional states.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1.5">
              <span className="text-xs font-mono text-rose-400 uppercase font-bold">
                Pattern 5: The Convergent Table
              </span>
              <p className="text-sm text-zinc-300 leading-relaxed">
                Every disparate receipt from months past—the Tokyo film camera (March), the ceramic bowls (April), the sunrise endurance (June), and the market tomatoes (August)—converged onto a single table on August 15, transforming solitary moments into communal connection.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
