import { InvoiceForm } from './components/InvoiceForm';
import { InvoicePreview } from './components/InvoicePreview';
import Layout from './components/Layout';
import { InvoiceHistoryPanel } from './components/InvoiceHistory';
import { KeyboardShortcutsHelp } from './components/KeyboardShortcutsHelp';
import { usePersistentInvoice } from './hooks/usePersistentInvoice';
import { useDarkMode } from './hooks/useDarkMode';
import { useInvoiceHistory } from './hooks/useInvoiceHistory';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { useState, useCallback, useEffect } from 'react';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import About from './pages/About';
import FreeTools from './pages/FreeTools';

function InvoiceApp() {
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
  const [showHistory, setShowHistory] = useState(false);
  const [showSaved, setShowSaved] = useState(false);

  // Handle save invoice to history
  const handleSave = useCallback(() => {
    saveToHistory(invoiceData);
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 2000);
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
    setShowHistory(prev => !prev);
  }, []);

  // Setup keyboard shortcuts
  useKeyboardShortcuts({
    onPrint: () => window.print(),
    onSave: handleSave,
    onNewInvoice: handlers.handleNewInvoice,
    onToggleDarkMode: toggleDarkMode,
    onShowShortcuts: () => setShowShortcuts(true),
  });

  // Add Ctrl+H for history panel (separate from the hook)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'h') {
        e.preventDefault();
        handleToggleHistory();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleToggleHistory]);

  return (
    <Layout
      isDarkMode={isDarkMode}
      toggleDarkMode={toggleDarkMode}
      onShowShortcuts={() => setShowShortcuts(true)}
      onHistoryToggle={handleToggleHistory}
      historyCount={history.length + (draft ? 1 : 0)}
    >
      {/* Save confirmation toast */}
      {showSaved && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg shadow-lg animate-fade-in">
          Invoice saved to history!
        </div>
      )}
      <div className="max-w-6xl mx-auto p-4 lg:p-6 w-full">
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
      </div>

      {/* History Panel */}
      <InvoiceHistoryPanel
        history={history}
        draft={draft}
        onLoadInvoice={handleLoadInvoice}
        onDeleteInvoice={deleteFromHistory}
        onClearHistory={clearHistory}
        onLoadDraft={handleLoadDraft}
        onClearDraft={clearDraft}
        currentInvoiceNumber={invoiceData.invoiceNumber}
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
      />

      {/* Keyboard Shortcuts Help */}
      <KeyboardShortcutsHelp
        isOpen={showShortcuts}
        onClose={() => setShowShortcuts(false)}
      />
    </Layout>
  );
}

function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-slate-200 dark:text-slate-700">404</h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">Page not found</p>
        <a href="/" className="mt-4 inline-block text-blue-600 dark:text-blue-400 hover:underline">Go home</a>
      </div>
    </div>
  );
}

function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Simple routing
  if (path === '/privacy') return <Privacy />;
  if (path === '/terms') return <Terms />;
  if (path === '/about') return <About />;
  if (path === '/freetools') return <FreeTools />;
  if (path !== '/') return <NotFound />;
  return <InvoiceApp />;
}

export default App;
