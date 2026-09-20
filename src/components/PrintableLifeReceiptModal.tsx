import React, { useState } from 'react';
import { LifeReceipt } from '../types';
import { computeReceiptSummary } from '../utils/receiptHelpers';
import { X, Printer, Copy, Check, Sparkles } from 'lucide-react';

interface PrintableLifeReceiptModalProps {
  receipts: LifeReceipt[];
  isOpen: boolean;
  onClose: () => void;
  customTitle?: string;
}

export const PrintableLifeReceiptModal: React.FC<PrintableLifeReceiptModalProps> = ({
  receipts,
  isOpen,
  onClose,
  customTitle
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const summary = computeReceiptSummary(receipts);

  // Pick 8-10 most pivotal receipts for the thermal itemized list
  const milestoneReceipts = receipts
    .filter((r) => ['rec_001', 'rec_003', 'rec_012', 'rec_015', 'rec_016', 'rec_018', 'rec_022', 'rec_024', 'rec_031', 'rec_036', 'rec_039', 'rec_040', 'rec_044'].includes(r.id))
    .slice(0, 10);

  const handleCopyText = () => {
    const textReceipt = `
==================================================
           YOUR LIFE, IN RECEIPTS
           ARCHIVE OF A HUMAN SOUL
            SUBJECT: ALEX CHEN
         TRANSACTION ID: #AC-2026-LIFE
==================================================
PERIOD: JAN 14, 2026 - SEP 15, 2026
LOCATION: SAN FRANCISCO / TOKYO / KYOTO
STATUS: RECOVERED & WHOLE

--------------------------------------------------
TOTAL MOMENTS RECORDED: ${summary.totalReceipts}
TOTAL SPEND LOGGED:     $${summary.totalSpend.toFixed(2)}
SONGS & LOOPS PLAYED:   ${summary.songsListened}
SEARCHES CONDUCTED:     ${summary.searchesMade}
PHOTOS CAPTURED:        ${summary.photosTaken}
PERSONAL WORDS WRITTEN: ${summary.wordsDrafted}
DOMINANT EMOTIONAL ARC: BURNOUT -> STILLNESS -> VITALITY
--------------------------------------------------
PIVOTAL LIFE TRANSACTIONS:
${milestoneReceipts
  .map(
    (m) =>
      `[${m.dateFormatted} ${m.timeFormatted}] ${m.title.slice(0, 32)}`
  )
  .join('\n')}

==================================================
TAX INVOICE FOR ONE HUMAN LIFE:
SUBTOTAL (PAST REGRETS):           $0.00
AUTONOMY SURCHARGE:             P R I C E L E S S
FRICTION CHOSEN (CLAY & ROAD):     100%
==================================================
NARRATIVE SUMMARY:
"Life is the friction you choose to embrace:
 the clay that collapses, the legs that ache at
 mile 5, the sauce that takes 4 hours to simmer,
 and the friends who stay until midnight."
==================================================
    THANK YOU FOR LIVING DELIBERATELY
==================================================
`;
    navigator.clipboard.writeText(textReceipt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-zinc-900 border border-zinc-700/80 rounded-2xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-zinc-800 bg-zinc-950/80">
          <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Thermal Life Receipt Output</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleCopyText}
              className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer text-xs flex items-center gap-1"
              title="Copy plain text receipt"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Thermal Paper View */}
        <div className="p-4 sm:p-6 max-h-[75vh] overflow-y-auto bg-zinc-950/90 flex justify-center">
          <div 
            id="printable-receipt"
            className="w-full bg-[#fdfbf7] text-zinc-900 p-6 rounded shadow-xl font-mono text-xs leading-tight space-y-4 border border-zinc-300 relative select-text"
          >
            {/* Top Sawtooth Simulation */}
            <div className="text-center font-mono text-[10px] text-zinc-500 overflow-hidden select-none">
              - - - - - - - - - - - - - - - - - - - - - - - - - - -
            </div>

            {/* Store / Life Header */}
            <div className="text-center space-y-1">
              <p className="text-[10px] tracking-widest uppercase font-bold text-zinc-600">
                ARCHIVE OF A HUMAN SOUL
              </p>
              <h2 className="text-base font-extrabold tracking-tight text-black">
                {customTitle || 'YOUR LIFE, IN RECEIPTS'}
              </h2>
              <p className="text-[11px] text-zinc-700">
                SUBJECT: CHEN, ALEX (#AC-2026)
              </p>
              <p className="text-[10px] text-zinc-500">
                DATE: 2026-09-20 • SF & TOKYO
              </p>
            </div>

            <div className="border-t border-b border-dashed border-zinc-400 py-2 space-y-1 text-[11px]">
              <div className="flex justify-between">
                <span>TOTAL MOMENTS LOGGED:</span>
                <span className="font-bold">{summary.totalReceipts}</span>
              </div>
              <div className="flex justify-between">
                <span>TOTAL FINANCIAL EXPENSE:</span>
                <span className="font-bold">${summary.totalSpend.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>TRACKS & REPEAT LOOPS:</span>
                <span className="font-bold">{summary.songsListened}</span>
              </div>
              <div className="flex justify-between">
                <span>PRIVATE SEARCH QUERIES:</span>
                <span className="font-bold">{summary.searchesMade}</span>
              </div>
              <div className="flex justify-between">
                <span>ANALOG ROLLS / PHOTOS:</span>
                <span className="font-bold">{summary.photosTaken}</span>
              </div>
              <div className="flex justify-between">
                <span>WORDS WRITTEN IN SILENCE:</span>
                <span className="font-bold">{summary.wordsDrafted}</span>
              </div>
            </div>

            {/* Milestone Items */}
            <div className="space-y-1.5">
              <p className="text-[10px] uppercase font-bold text-zinc-600 border-b border-zinc-300 pb-0.5">
                TRANSFORMATIVE RECEIPTS:
              </p>
              {milestoneReceipts.map((m, idx) => (
                <div key={idx} className="flex justify-between text-[10px] leading-tight">
                  <span className="truncate pr-2">
                    {m.dateFormatted.slice(0, 6)}: {m.title.slice(0, 24)}
                  </span>
                  <span className="shrink-0 font-bold">
                    {m.category === 'purchases' && m.metadata.amount
                      ? `$${m.metadata.amount.toFixed(0)}`
                      : 'LOGGED'}
                  </span>
                </div>
              ))}
            </div>

            {/* Tax & Total */}
            <div className="border-t border-dashed border-zinc-400 pt-2 space-y-1 text-[11px]">
              <div className="flex justify-between">
                <span>SUBTOTAL (COPING):</span>
                <span>$485.00</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>FREEDOM LEAP SURCHARGE:</span>
                <span>PRICELESS</span>
              </div>
              <div className="flex justify-between font-extrabold text-xs pt-1 border-t border-zinc-900">
                <span>NET HUMAN TRANSFORMATION:</span>
                <span>100% COMPLETE</span>
              </div>
            </div>

            {/* Narrative Thought */}
            <div className="p-3 bg-zinc-100 rounded border border-zinc-200 text-[10px] leading-normal italic text-zinc-800">
              "Life is the friction you choose to embrace: the clay that collapses, the legs that ache at mile 5, the sauce that simmers for 4 hours, and the friends who stay until midnight."
            </div>

            {/* Barcode */}
            <div className="pt-2 flex flex-col items-center justify-center space-y-1">
              <div className="flex gap-0.5 h-10 items-center justify-center w-full">
                {Array.from({ length: 48 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-full bg-zinc-900"
                    style={{
                      width: i % 4 === 0 ? '3px' : i % 2 === 0 ? '1px' : '2px',
                      opacity: i % 7 === 0 ? 0.4 : 1
                    }}
                  />
                ))}
              </div>
              <span className="text-[9px] tracking-widest text-zinc-500">
                *REC-ALEX-CHEN-2026-COMPLETE*
              </span>
            </div>

            {/* Bottom Sawtooth Simulation */}
            <div className="text-center font-mono text-[10px] text-zinc-500 overflow-hidden select-none">
              - - - - - - - - - - - - - - - - - - - - - - - - - - -
            </div>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="px-5 py-3.5 border-t border-zinc-800 bg-zinc-950/80 flex items-center justify-between gap-2">
          <button
            onClick={handleCopyText}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Text'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs transition-colors cursor-pointer shadow-md shadow-amber-500/20"
          >
            <Printer className="w-4 h-4" />
            <span>Print Life Receipt</span>
          </button>
        </div>
      </div>
    </div>
  );
};
