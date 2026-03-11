import { useState, useEffect } from 'react';
import { ArrowDownToLine, Check } from 'lucide-react';

/**
 * Banner shown when receiving a file from another Freetools site.
 * Place this right after the Header in Layout.jsx.
 */
export default function ReceiveBanner() {
  const [state, setState] = useState(() => {
    return new URLSearchParams(window.location.search).has('receive') ? 'waiting' : null;
  });
  const [fileName, setFileName] = useState(null);

  useEffect(() => {
    const handler = (event) => {
      const file = event.detail?.file;
      if (file) {
        setFileName(file.name);
        setState('received');
        setTimeout(() => setState(null), 4000);
      }
    };
    window.addEventListener('freetools-file-received', handler);
    return () => window.removeEventListener('freetools-file-received', handler);
  }, []);

  if (!state) return null;

  return (
    <div className="bg-blue-50 dark:bg-blue-900/30 border-b border-blue-200 dark:border-blue-800 px-4 py-2.5">
      <div className="max-w-6xl mx-auto flex items-center justify-center gap-2 text-sm text-blue-700 dark:text-blue-300">
        {state === 'waiting' ? (
          <>
            <ArrowDownToLine className="w-4 h-4 animate-bounce" />
            <span>Receiving file from another tool&hellip;</span>
          </>
        ) : (
          <>
            <Check className="w-4 h-4" />
            <span><strong>{fileName}</strong> received &mdash; ready to use</span>
          </>
        )}
      </div>
    </div>
  );
}
