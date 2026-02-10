import { InvoiceForm } from './components/InvoiceForm';
import { InvoicePreview } from './components/InvoicePreview';
import { Header } from './components/Header';
import { InvoiceHistoryPanel } from './components/InvoiceHistory';
import { KeyboardShortcutsHelp } from './components/KeyboardShortcutsHelp';
import { usePersistentInvoice } from './hooks/usePersistentInvoice';
import { useDarkMode } from './hooks/useDarkMode';
import { useInvoiceHistory } from './hooks/useInvoiceHistory';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { useState, useCallback, useEffect } from 'react';

function App() {
  const { invoiceData, handlers, setInvoiceData } = usePersistentInvoice();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { 
    history, 
    draft, 
    saveToHistory, 
    deleteFromHistory, 
    clearHistory,
    loadDraft,
    clearDraft,
  } = useInvoiceHistory(invoiceData);
  
  const [showShortcuts, setShowShortcuts] = useState(false);

  // Handle save invoice to history
  const handleSave = useCallback(() => {
    saveToHistory(invoiceData);
    alert('Invoice saved to history!');
  }, [invoiceData, saveToHistory]);

  // Handle loading an invoice from history
  const handleLoadInvoice = useCallback((data) => {
    setInvoiceData(data);
  }, [setInvoiceData]);

  // Handle loading draft
  const handleLoadDraft = useCallback((draftData) => {
    setInvoiceData(draftData);
    clearDraft();
  }, [setInvoiceData, clearDraft]);

  // Handle history toggle
  const handleToggleHistory = useCallback(() => {
    // The history panel manages its own open/close state
    // This is just for the keyboard shortcut
  }, []);

  // Setup keyboard shortcuts
  useKeyboardShortcuts({
    onPrint: () => window.print(),
    onSave: handleSave,
    onNewInvoice: handlers.handleNewInvoice,
    onToggleDarkMode: toggleDarkMode,
  });

  // Add Ctrl+H for history panel (separate from the hook)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'h') {
        e.preventDefault();
        // Dispatch a custom event that the history panel can listen to
        window.dispatchEvent(new CustomEvent('toggle-invoice-history'));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors">
      <Header 
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
        onShowShortcuts={() => setShowShortcuts(true)}
      />
      <main className="max-w-[1600px] mx-auto p-4 lg:p-6">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="no-print">
            <InvoiceForm
              data={invoiceData}
              onUpdate={handlers.handleUpdateInvoice}
              onUpdateItem={handlers.handleUpdateItem}
              onAddItem={handlers.handleAddItem}
              onRemoveItem={handlers.handleRemoveItem}
              onNewInvoice={handlers.handleNewInvoice}
              onClearStoredData={handlers.handleClearStoredData}
            />
          </div>
          <div>
            <InvoicePreview data={invoiceData} />
          </div>
        </div>
      </main>

      {/* History Panel - always render if there's content */}
      <InvoiceHistoryPanel
        history={history}
        draft={draft}
        onLoadInvoice={handleLoadInvoice}
        onDeleteInvoice={deleteFromHistory}
        onClearHistory={clearHistory}
        onLoadDraft={handleLoadDraft}
        onClearDraft={clearDraft}
        currentInvoiceNumber={invoiceData.invoiceNumber}
      />

      {/* Keyboard Shortcuts Help */}
      <KeyboardShortcutsHelp 
        isOpen={showShortcuts} 
        onClose={() => setShowShortcuts(false)} 
      />
    </div>
  );
}

export default App;
