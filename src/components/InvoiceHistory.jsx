import { useState } from 'react';
import { History, Trash2, RotateCcw, X, FileText } from 'lucide-react';

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

  const [confirmClearAll, setConfirmClearAll] = useState(false);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-200 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[90vw] z-50 bg-white dark:bg-slate-800 border-l border-slate-200 dark:border-slate-700 shadow-2xl transform transition-transform duration-200 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 h-14 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Invoice History</h2>
          </div>
          <div className="flex items-center gap-1">
            {history.length > 0 && !confirmClearAll && (
              <button
                onClick={() => setConfirmClearAll(true)}
                className="px-2 py-1 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
              >
                Clear all
              </button>
            )}
            {confirmClearAll && (
              <div className="flex items-center gap-1">
                <button
                  onClick={() => { onClearHistory(); setConfirmClearAll(false); }}
                  className="px-2 py-1 text-xs bg-red-600 text-white rounded transition-colors hover:bg-red-700"
                >
                  Confirm
                </button>
                <button
                  onClick={() => setConfirmClearAll(false)}
                  className="px-2 py-1 text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}
            <button
              onClick={onClose}
              aria-label="Close history"
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto h-[calc(100%-57px)] p-3">
          {/* Draft Section */}
          {draft && (
            <div className="mb-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
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
                      onClose();
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
          {history.length === 0 && !draft ? (
            <div className="text-center py-8">
              <FileText className="w-8 h-8 mx-auto mb-2 text-slate-400 dark:text-slate-500 opacity-50" />
              <p className="text-sm text-slate-500 dark:text-slate-400">No saved invoices yet</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                Press Ctrl+S to save completed invoices
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {history.map((item) => (
                <div
                  key={item.id}
                  className={`group px-3 py-2.5 rounded-lg transition-colors ${
                    item.invoiceNumber === currentInvoiceNumber
                      ? 'bg-blue-50 dark:bg-blue-900/20'
                      : 'bg-slate-50 dark:bg-slate-700/50'
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
                        onClose();
                      }}
                      className="flex-1 px-2 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/40 rounded transition-colors"
                    >
                      Load
                    </button>
                    <button
                      onClick={() => onDeleteInvoice(item.id)}
                      aria-label="Delete invoice"
                      className="p-1 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all rounded-lg"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
