import { History, Trash2, RotateCcw, X, FileText } from 'lucide-react';
import { useState, useEffect } from 'react';

export function InvoiceHistoryPanel({ 
  history, 
  draft, 
  onLoadInvoice, 
  onDeleteInvoice, 
  onClearHistory,
  onLoadDraft,
  onClearDraft,
  currentInvoiceNumber,
  isOpen,
  onClose,
}) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  
  // Use external isOpen if provided, otherwise use internal state
  const open = isOpen !== undefined ? isOpen : internalIsOpen;
  const setOpen = onClose ? (value) => { if (!value) onClose(); } : setInternalIsOpen;

  // Listen for toggle event from keyboard shortcut
  useEffect(() => {
    const handleToggle = () => setOpen(prev => !prev);
    window.addEventListener('toggle-invoice-history', handleToggle);
    return () => window.removeEventListener('toggle-invoice-history', handleToggle);
  }, [setOpen]);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatCurrency = (amount, currency) => {
    const symbols = { USD: '$', EUR: '€', GBP: '£' };
    const symbol = symbols[currency] || '$';
    return `${symbol}${amount.toFixed(2)}`;
  };

  if (!open) {
    return null;
  }

  return (
    <div className="fixed right-4 bottom-4 z-40 w-80 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-slate-500 dark:text-slate-400" />
          <span className="font-medium text-slate-700 dark:text-slate-300">Invoice History</span>
        </div>
        <button
          onClick={() => setOpen(false)}
          className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="max-h-96 overflow-y-auto">
        {/* Draft Section */}
        {draft && (
          <div className="p-3 border-b border-slate-200 dark:border-slate-700 bg-amber-50 dark:bg-amber-900/20">
            <div className="flex items-center gap-2 mb-2">
              <RotateCcw className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span className="text-xs font-medium text-amber-700 dark:text-amber-400 uppercase tracking-wide">
                Auto-saved Draft
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-700 dark:text-slate-300">
                {draft.invoiceNumber || 'Unnamed Invoice'}
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    onLoadDraft(draft);
                    setOpen(false);
                  }}
                  className="px-2 py-1 text-xs font-medium text-amber-700 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/40 rounded transition-colors"
                >
                  Restore
                </button>
                <button
                  onClick={onClearDraft}
                  className="p-1 text-slate-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {formatDate(draft.savedAt)}
            </div>
          </div>
        )}

        {/* History List */}
        {history.length === 0 ? (
          <div className="p-8 text-center text-slate-500 dark:text-slate-400">
            <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No saved invoices yet</p>
            <p className="text-xs mt-1 opacity-75">
              Press Ctrl+S to save completed invoices
            </p>
          </div>
        ) : (
          <>
            <div className="px-3 py-2 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                {history.length} saved invoice{history.length !== 1 ? 's' : ''}
              </span>
              <button
                onClick={() => {
                  if (confirm('Clear all invoice history? This cannot be undone.')) {
                    onClearHistory();
                  }
                }}
                className="text-xs text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
              >
                Clear all
              </button>
            </div>
            {history.map((item) => (
              <div
                key={item.id}
                className={`p-3 border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors ${
                  item.invoiceNumber === currentInvoiceNumber ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm text-slate-900 dark:text-slate-100">
                    {item.invoiceNumber}
                  </span>
                  <span className="font-semibold text-sm text-slate-700 dark:text-slate-300">
                    {formatCurrency(item.total, item.currency)}
                  </span>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                  {item.clientName || 'No client'} • {formatDate(item.createdAt)}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onLoadInvoice(item.data);
                      setOpen(false);
                    }}
                    className="flex-1 px-2 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/40 rounded transition-colors"
                  >
                    Load
                  </button>
                  <button
                    onClick={() => onDeleteInvoice(item.id)}
                    className="p-1 text-slate-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
