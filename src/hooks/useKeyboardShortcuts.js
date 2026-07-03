import { useEffect, useCallback } from 'react';

/**
 * Custom hook for keyboard shortcuts
 * - Ctrl/Cmd + P: Print invoice
 * - Ctrl/Cmd + S: Save invoice (trigger new invoice after save)
 * - Ctrl/Cmd + N: New invoice
 * - Ctrl/Cmd + D: Toggle dark mode
 * - Ctrl/Cmd + /: Show shortcuts help
 */
export function useKeyboardShortcuts({ onPrint, onSave, onNewInvoice, onToggleDarkMode, onShowShortcuts }) {
  const handleKeyDown = useCallback((e) => {
    // Check for Ctrl or Cmd key
    const isCtrl = e.ctrlKey || e.metaKey;
    
    if (!isCtrl) return;
    
    switch (e.key.toLowerCase()) {
      case 'p':
        e.preventDefault();
        onPrint?.();
        break;
      case 's':
        e.preventDefault();
        onSave?.();
        break;
      case 'n':
        e.preventDefault();
        onNewInvoice?.();
        break;
      case 'd':
        e.preventDefault();
        onToggleDarkMode?.();
        break;
      case '/':
        e.preventDefault();
        onShowShortcuts?.();
        break;
      default:
        break;
    }
  }, [onPrint, onSave, onNewInvoice, onToggleDarkMode, onShowShortcuts]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}
