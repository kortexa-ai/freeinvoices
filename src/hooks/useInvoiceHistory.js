import { useState, useEffect, useCallback } from 'react';

const INVOICE_HISTORY_KEY = 'freeinvoices_history';
const MAX_HISTORY_ITEMS = 50;

/**
 * Custom hook for managing invoice history in localStorage
 * - Saves completed invoices to history
 * - Allows loading previous invoices
 * - Auto-saves current invoice as draft
 */
export function useInvoiceHistory(currentInvoiceData) {
  const [history, setHistory] = useState(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem(INVOICE_HISTORY_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [draft, setDraft] = useState(() => {
    if (typeof window === 'undefined') return null;
    try {
      const saved = localStorage.getItem(`${INVOICE_HISTORY_KEY}_draft`);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Persist history to localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(INVOICE_HISTORY_KEY, JSON.stringify(history));
    } catch (e) {
      console.warn('Failed to save invoice history:', e);
    }
  }, [history]);

  // Auto-save draft
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!currentInvoiceData) return;
    
    // Don't save empty invoices as drafts
    const hasContent = 
      currentInvoiceData.clientName?.trim() ||
      currentInvoiceData.items?.some(item => item.description?.trim());
    
    if (hasContent) {
      try {
        localStorage.setItem(
          `${INVOICE_HISTORY_KEY}_draft`,
          JSON.stringify({
            ...currentInvoiceData,
            savedAt: new Date().toISOString(),
          })
        );
        setDraft({ ...currentInvoiceData, savedAt: new Date().toISOString() });
      } catch (e) {
        console.warn('Failed to save draft:', e);
      }
    }
  }, [currentInvoiceData]);

  // Save completed invoice to history
  const saveToHistory = useCallback((invoiceData) => {
    const historyItem = {
      id: Date.now().toString(),
      invoiceNumber: invoiceData.invoiceNumber,
      clientName: invoiceData.clientName,
      total: invoiceData.items.reduce((sum, item) => sum + item.amount, 0),
      currency: invoiceData.currency,
      createdAt: new Date().toISOString(),
      data: { ...invoiceData },
    };

    setHistory(prev => {
      const newHistory = [historyItem, ...prev].slice(0, MAX_HISTORY_ITEMS);
      return newHistory;
    });

    // Clear draft after saving
    if (typeof window !== 'undefined') {
      localStorage.removeItem(`${INVOICE_HISTORY_KEY}_draft`);
      setDraft(null);
    }

    return historyItem.id;
  }, []);

  // Load invoice from history
  const loadFromHistory = useCallback((id) => {
    const item = history.find(h => h.id === id);
    return item?.data || null;
  }, [history]);

  // Delete from history
  const deleteFromHistory = useCallback((id) => {
    setHistory(prev => prev.filter(h => h.id !== id));
  }, []);

  // Clear all history
  const clearHistory = useCallback(() => {
    setHistory([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(INVOICE_HISTORY_KEY);
    }
  }, []);

  // Load draft
  const loadDraft = useCallback(() => {
    return draft;
  }, [draft]);

  // Clear draft
  const clearDraft = useCallback(() => {
    setDraft(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(`${INVOICE_HISTORY_KEY}_draft`);
    }
  }, []);

  return {
    history,
    draft,
    saveToHistory,
    loadFromHistory,
    deleteFromHistory,
    clearHistory,
    loadDraft,
    clearDraft,
  };
}
