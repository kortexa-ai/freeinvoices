import { X, Command, Download, Save, FilePlus, Moon, History } from 'lucide-react';

export function KeyboardShortcutsHelp({ isOpen, onClose }) {
  if (!isOpen) return null;

  const shortcuts = [
    { key: 'Ctrl + P', mac: '⌘ + P', icon: Download, description: 'Download PDF' },
    { key: 'Ctrl + S', mac: '⌘ + S', icon: Save, description: 'Save invoice to history' },
    { key: 'Ctrl + N', mac: '⌘ + N', icon: FilePlus, description: 'Create new invoice' },
    { key: 'Ctrl + D', mac: '⌘ + D', icon: Moon, description: 'Toggle dark mode' },
    { key: 'Ctrl + H', mac: '⌘ + H', icon: History, description: 'Toggle history panel' },
  ];

  const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2">
            <Command className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Keyboard Shortcuts
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Shortcuts List */}
        <div className="p-6">
          <div className="space-y-3">
            {shortcuts.map(({ key, mac, icon: Icon, description }) => (
              <div
                key={key}
                className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white dark:bg-slate-700 rounded-lg flex items-center justify-center shadow-sm">
                    <Icon className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                  </div>
                  <span className="text-sm text-slate-700 dark:text-slate-300">
                    {description}
                  </span>
                </div>
                <kbd className="px-2 py-1 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded text-xs font-mono text-slate-600 dark:text-slate-400 shadow-sm">
                  {isMac ? mac : key}
                </kbd>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
            <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
              Tip: Your invoice is automatically saved as a draft every few seconds
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
