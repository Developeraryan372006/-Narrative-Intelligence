import React, { useState } from 'react';
import { LifeReceipt, MysteryQuest } from '../types';
import { MYSTERY_QUESTS } from '../data/mysteryQuests';
import { CATEGORY_CONFIG } from '../utils/receiptHelpers';
import confetti from 'canvas-confetti';
import { 
  Compass, CheckCircle, HelpCircle, Eye, 
  Sparkles, Award, ArrowRight, RotateCcw, Lock
} from 'lucide-react';

interface MysteryQuestsProps {
  receipts: LifeReceipt[];
  onInspectReceipt: (receipt: LifeReceipt) => void;
}

export const MysteryQuests: React.FC<MysteryQuestsProps> = ({
  receipts,
  onInspectReceipt
}) => {
  const [selectedQuestId, setSelectedQuestId] = useState<string>('quest_1');
  const [solvedQuests, setSolvedQuests] = useState<Set<string>>(new Set());
  const [selectedReceiptIds, setSelectedReceiptIds] = useState<string[]>([]);
  const [feedbackMessage, setFeedbackMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const currentQuest = MYSTERY_QUESTS.find((q) => q.id === selectedQuestId) || MYSTERY_QUESTS[0];
  const isSolved = solvedQuests.has(currentQuest.id);

  // Candidate receipts filtered to relevant categories for the quest
  const candidateReceipts = receipts.filter((r) =>
    currentQuest.clueCategory.includes(r.category)
  );

  const handleToggleClue = (receiptId: string) => {
    if (isSolved) return;
    setFeedbackMessage(null);
    setSelectedReceiptIds((prev) =>
      prev.includes(receiptId)
        ? prev.filter((id) => id !== receiptId)
        : [...prev, receiptId]
    );
  };

  const handleVerifyAnswer = () => {
    const targetSet = new Set(currentQuest.targetReceiptIds);
    const selectedSet = new Set(selectedReceiptIds);

    const isMatch =
      targetSet.size === selectedSet.size &&
      [...targetSet].every((id) => selectedSet.has(id));

    if (isMatch) {
      setSolvedQuests((prev) => new Set([...prev, currentQuest.id]));
      setFeedbackMessage({
        type: 'success',
        text: 'Brilliant deduction! You connected the exact moments that formed this chapter.'
      });
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Safe fallback if canvas-confetti is not available
      }
    } else {
      const matchCount = selectedReceiptIds.filter((id) => targetSet.has(id)).length;
      if (matchCount > 0) {
        setFeedbackMessage({
          type: 'error',
          text: `You have identified ${matchCount} of ${targetSet.size} correct receipts. Check timestamps and narrative context closely.`
        });
      } else {
        setFeedbackMessage({
          type: 'error',
          text: 'None of the currently selected receipts match this pattern. Read the prompt clues carefully.'
        });
      }
    }
  };

  const handleInstantReveal = () => {
    setSelectedReceiptIds(currentQuest.targetReceiptIds);
    setSolvedQuests((prev) => new Set([...prev, currentQuest.id]));
    setFeedbackMessage({
      type: 'success',
      text: 'Solution revealed. Notice how these moments directly trigger one another.'
    });
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-zinc-900/80 p-5 rounded-2xl border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-rose-400" />
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Detective Mode: Connect the Hidden Dots
            </h2>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5">
            Can you deduce what happened in Alex's life before the story spells it out?
          </p>
        </div>

        <div className="flex items-center gap-2 bg-zinc-950 px-3 py-1.5 rounded-xl border border-zinc-800 text-xs font-mono">
          <Award className="w-4 h-4 text-amber-400" />
          <span className="text-zinc-400">Mysteries Solved:</span>
          <span className="text-amber-400 font-bold">
            {solvedQuests.size} / {MYSTERY_QUESTS.length}
          </span>
        </div>
      </div>

      {/* Quest Selector Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
        {MYSTERY_QUESTS.map((quest, idx) => {
          const isSelected = quest.id === currentQuest.id;
          const questSolved = solvedQuests.has(quest.id);

          return (
            <button
              key={quest.id}
              onClick={() => {
                setSelectedQuestId(quest.id);
                setSelectedReceiptIds([]);
                setFeedbackMessage(null);
              }}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-zinc-850 border-rose-500/80 ring-1 ring-rose-500/30'
                  : 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                  <span className="text-zinc-500">MYSTERY 0{idx + 1}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded font-semibold ${
                      quest.difficulty === 'Easy'
                        ? 'text-emerald-400 bg-emerald-950/60'
                        : quest.difficulty === 'Medium'
                        ? 'text-amber-400 bg-amber-950/60'
                        : 'text-rose-400 bg-rose-950/60'
                    }`}
                  >
                    {quest.difficulty}
                  </span>
                </div>
                <h3 className="font-semibold text-sm text-zinc-200 line-clamp-1 mb-1">
                  {quest.title}
                </h3>
              </div>

              <div className="mt-2 pt-2 border-t border-zinc-800 flex items-center justify-between text-[11px]">
                <span className="text-zinc-500 font-mono">
                  {quest.targetReceiptIds.length} Clues
                </span>
                {questSolved ? (
                  <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                    <CheckCircle className="w-3 h-3" />
                    <span>Solved</span>
                  </span>
                ) : (
                  <span className="text-zinc-500">Unsolved</span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Mystery Investigation Room */}
      <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="max-w-3xl space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-rose-950/60 text-rose-300 border border-rose-800/50 font-bold uppercase">
              Case File: {currentQuest.title}
            </span>
            <span className="text-xs font-mono text-zinc-500">
              Needs {currentQuest.targetReceiptIds.length} connecting receipts
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {currentQuest.prompt}
          </h3>

          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-zinc-400 font-mono">
            <span>Look in categories:</span>
            {currentQuest.clueCategory.map((catKey) => (
              <span
                key={catKey}
                className={`px-2 py-0.5 rounded-full border text-[10px] ${CATEGORY_CONFIG[catKey].bg} ${CATEGORY_CONFIG[catKey].color} ${CATEGORY_CONFIG[catKey].border}`}
              >
                {CATEGORY_CONFIG[catKey].label}
              </span>
            ))}
          </div>
        </div>

        {/* Feedback Alert */}
        {feedbackMessage && (
          <div
            className={`p-4 rounded-xl border text-xs sm:text-sm leading-relaxed ${
              feedbackMessage.type === 'success'
                ? 'bg-emerald-950/50 border-emerald-800/60 text-emerald-200'
                : 'bg-red-950/50 border-red-800/60 text-red-200'
            }`}
          >
            {feedbackMessage.text}
          </div>
        )}

        {/* Solved Explanation Box */}
        {isSolved && (
          <div className="bg-gradient-to-r from-amber-950/40 to-zinc-950 p-6 rounded-2xl border border-amber-500/40 space-y-4">
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Dossier Decrypted: The Hidden Connection</span>
            </div>

            <p className="text-sm sm:text-base text-zinc-200 leading-relaxed font-sans">
              {currentQuest.solvedExplanation}
            </p>

            <div className="pt-3 border-t border-amber-500/20 text-xs sm:text-sm text-amber-300/90 italic">
              <span className="font-semibold not-italic text-amber-400 font-mono">Life Lesson: </span>
              "{currentQuest.rewardInsight}"
            </div>
          </div>
        )}

        {/* Clue Selection Worktable */}
        <div className="space-y-3 pt-4 border-t border-zinc-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
              Select Receipts to Test Connection ({selectedReceiptIds.length} / {currentQuest.targetReceiptIds.length} Selected)
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedReceiptIds([])}
                className="text-xs text-zinc-400 hover:text-zinc-200 cursor-pointer"
              >
                Clear Selection
              </button>
              <span className="text-zinc-600">|</span>
              <button
                onClick={handleInstantReveal}
                className="text-xs text-amber-400 hover:text-amber-300 cursor-pointer font-medium"
              >
                Reveal Answer
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto pr-1">
            {candidateReceipts.map((receipt) => {
              const isSelected = selectedReceiptIds.includes(receipt.id);
              const isTargetAnswer = isSolved && currentQuest.targetReceiptIds.includes(receipt.id);
              const cat = CATEGORY_CONFIG[receipt.category];

              return (
                <div
                  key={receipt.id}
                  onClick={() => handleToggleClue(receipt.id)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isTargetAnswer
                      ? 'bg-emerald-950/40 border-emerald-500/80 ring-1 ring-emerald-500/40'
                      : isSelected
                      ? 'bg-amber-950/30 border-amber-500 ring-1 ring-amber-500/30'
                      : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 mb-1">
                      <span className={`px-1.5 py-0.2 rounded ${cat.bg} ${cat.color}`}>
                        {cat.label}
                      </span>
                      <span>{receipt.dateFormatted} • {receipt.timeFormatted}</span>
                    </div>
                    <h4 className="text-xs font-bold text-zinc-200 line-clamp-2 mb-1">
                      {receipt.title}
                    </h4>
                    <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed">
                      {receipt.details}
                    </p>
                  </div>

                  <div className="mt-2 pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[10px]">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onInspectReceipt(receipt);
                      }}
                      className="text-zinc-400 hover:text-white flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Inspect</span>
                    </button>
                    <span
                      className={`font-mono font-bold ${
                        isSelected ? 'text-amber-400' : 'text-zinc-500'
                      }`}
                    >
                      {isSelected ? '✓ Selected' : '+ Pick Clue'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Verification Trigger Button */}
        <div className="pt-4 border-t border-zinc-800 flex justify-end">
          <button
            onClick={handleVerifyAnswer}
            disabled={selectedReceiptIds.length === 0 || isSolved}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:pointer-events-none text-zinc-950 font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-md shadow-amber-500/20"
          >
            <Sparkles className="w-4 h-4" />
            <span>Verify Connections</span>
          </button>
        </div>
      </div>
    </div>
  );
};
