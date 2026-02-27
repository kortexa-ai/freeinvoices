import { useState } from 'react';
import { Moon, Sun, Keyboard, History, LayoutGrid } from 'lucide-react';
import FreeToolsDropdown from './FreeToolsDropdown';

export function Header({ isDarkMode, onToggleDarkMode, onShowShortcuts, onToggleHistory, historyCount }) {
  const [showTools, setShowTools] = useState(false);

  return (
    <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3">
          <img src="/app-icon.png" alt="Invoices" className="w-10 h-10 rounded-lg" />
          <div>
            <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Invoices</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">by kortexa.ai</p>
          </div>
        </a>
        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setShowTools(!showTools)}
              className="flex items-center gap-2 px-3 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              title="More free tools"
              aria-label="More free tools"
            >
              <LayoutGrid className="w-4 h-4" />
              <span className="hidden sm:inline text-sm font-medium">More tools</span>
            </button>
            <FreeToolsDropdown isOpen={showTools} onClose={() => setShowTools(false)} />
          </div>
          <button
            onClick={onShowShortcuts}
            className="hidden sm:flex items-center gap-2 px-3 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
            title="Keyboard shortcuts"
            aria-label="Keyboard shortcuts"
          >
            <Keyboard className="w-4 h-4" />
            <span className="text-sm font-medium">Shortcuts</span>
          </button>
          <button
            onClick={onToggleDarkMode}
            className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
          <button
            onClick={onToggleHistory}
            className="flex items-center gap-2 px-3 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
            title="View invoice history (Ctrl+H)"
            aria-label="View invoice history (Ctrl+H)"
          >
            <History className="w-4 h-4" />
            <span className="hidden sm:inline text-sm font-medium">History</span>
            {historyCount > 0 && (
              <span className="px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs rounded-full">
                {historyCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
