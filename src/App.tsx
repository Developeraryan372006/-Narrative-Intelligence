import React, { useState } from 'react';
import { LIFE_RECEIPTS } from './data/lifeReceipts';
import { LifeReceipt } from './types';
import { Header, ActiveTab } from './components/Header';
import { StoryReel } from './components/StoryReel';
import { ReceiptLedger } from './components/ReceiptLedger';
import { ConnectionConstellation } from './components/ConnectionConstellation';
import { LifeInsights } from './components/LifeInsights';
import { MysteryQuests } from './components/MysteryQuests';
import { CustomStoryWeaver } from './components/CustomStoryWeaver';
import { ReceiptDetailModal } from './components/ReceiptDetailModal';
import { PrintableLifeReceiptModal } from './components/PrintableLifeReceiptModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('chapters');
  const [inspectedReceipt, setInspectedReceipt] = useState<LifeReceipt | null>(null);
  const [weaverIds, setWeaverIds] = useState<Set<string>>(new Set(['rec_001', 'rec_002', 'rec_003', 'rec_004']));
  const [isPrintModalOpen, setIsPrintModalOpen] = useState<boolean>(false);
  const [printReceiptsSubset, setPrintReceiptsSubset] = useState<LifeReceipt[] | null>(null);

  // Toggle receipt in Story Weaver tray
  const handleToggleWeaver = (receipt: LifeReceipt) => {
    setWeaverIds((prev) => {
      const next = new Set(prev);
      if (next.has(receipt.id)) {
        next.delete(receipt.id);
      } else {
        next.add(receipt.id);
      }
      return next;
    });
  };

  const handleRemoveFromWeaver = (id: string) => {
    setWeaverIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const handleClearWeaver = () => {
    setWeaverIds(new Set());
  };

  const handleAddPresetToWeaver = (ids: string[]) => {
    setWeaverIds(new Set(ids));
  };

  const handleOpenPrintModal = (customReceipts?: LifeReceipt[]) => {
    setPrintReceiptsSubset(customReceipts || null);
    setIsPrintModalOpen(true);
  };

  const handleSurpriseMe = () => {
    // Pick a random receipt from the collection, preferring rich moments
    const randomIndex = Math.floor(Math.random() * LIFE_RECEIPTS.length);
    setInspectedReceipt(LIFE_RECEIPTS[randomIndex]);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200 relative overflow-x-hidden">
      {/* Subtle Archival Ambient Gradient Orbs */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Top Application Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenPrintModal={() => handleOpenPrintModal()}
        selectedWeaverCount={weaverIds.size}
        onSurpriseMe={handleSurpriseMe}
      />

      {/* Main Experience Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'chapters' && (
          <StoryReel
            allReceipts={LIFE_RECEIPTS}
            onInspectReceipt={(r) => setInspectedReceipt(r)}
            onToggleWeaver={handleToggleWeaver}
            weaverIds={weaverIds}
          />
        )}

        {activeTab === 'ledger' && (
          <ReceiptLedger
            receipts={LIFE_RECEIPTS}
            onInspectReceipt={(r) => setInspectedReceipt(r)}
            onToggleWeaver={handleToggleWeaver}
            weaverIds={weaverIds}
          />
        )}

        {activeTab === 'constellation' && (
          <ConnectionConstellation
            receipts={LIFE_RECEIPTS}
            onInspectReceipt={(r) => setInspectedReceipt(r)}
            onToggleWeaver={handleToggleWeaver}
            weaverIds={weaverIds}
          />
        )}

        {activeTab === 'insights' && (
          <LifeInsights 
            receipts={LIFE_RECEIPTS} 
            onInspectReceipt={(r) => setInspectedReceipt(r)}
            onToggleWeaver={handleToggleWeaver}
            weaverIds={weaverIds}
          />
        )}

        {activeTab === 'quests' && (
          <MysteryQuests
            receipts={LIFE_RECEIPTS}
            onInspectReceipt={(r) => setInspectedReceipt(r)}
          />
        )}

        {activeTab === 'weaver' && (
          <CustomStoryWeaver
            receipts={LIFE_RECEIPTS}
            selectedReceiptIds={Array.from(weaverIds)}
            onRemoveFromWeaver={handleRemoveFromWeaver}
            onClearWeaver={handleClearWeaver}
            onAddPreset={handleAddPresetToWeaver}
            onInspectReceipt={(r) => setInspectedReceipt(r)}
            onOpenPrintModal={handleOpenPrintModal}
          />
        )}
      </main>

      {/* Detailed Thermal Receipt Inspection Modal */}
      <ReceiptDetailModal
        receipt={inspectedReceipt}
        allReceipts={LIFE_RECEIPTS}
        onClose={() => setInspectedReceipt(null)}
        onSelectReceipt={(r) => setInspectedReceipt(r)}
        onToggleWeaver={handleToggleWeaver}
        isWeaverSelected={inspectedReceipt ? weaverIds.has(inspectedReceipt.id) : false}
      />

      {/* Physical Thermal Life Summary Receipt Pop-up */}
      <PrintableLifeReceiptModal
        receipts={printReceiptsSubset || LIFE_RECEIPTS}
        isOpen={isPrintModalOpen}
        onClose={() => {
          setIsPrintModalOpen(false);
          setPrintReceiptsSubset(null);
        }}
        customTitle={printReceiptsSubset ? 'CUSTOM LIFE CHAPTER RECEIPT' : undefined}
      />

      {/* Footer Branding & Archival Badge */}
      <footer className="border-t border-zinc-900 bg-zinc-950 py-6 text-center text-xs text-zinc-500 font-mono">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>YOUR LIFE, IN RECEIPTS • NARRATIVE INTELLIGENCE ARCHIVE</span>
          </div>
          <p className="text-zinc-600">
            Raw Data → Insights → Connections → Story
          </p>
        </div>
      </footer>
    </div>
  );
}
