import { useEffect, useState, useCallback } from 'react';
import { getPendingFile } from '../utils/crossSiteTransfer';

/**
 * Hook for components that accept file uploads.
 * Checks for files transferred from another Freetools site.
 * Call this in any component with a file drop zone or upload input.
 */
export default function useReceiveFile(onFileReceived) {
  const [receiving, setReceiving] = useState(
    () => new URLSearchParams(window.location.search).has('receive')
  );

  const stableCallback = useCallback(onFileReceived, [onFileReceived]);

  useEffect(() => {
    const handler = (event) => {
      const file = event.detail?.file || getPendingFile();
      if (file) {
        setReceiving(false);
        stableCallback(file);
      }
    };

    window.addEventListener('freetools-file-received', handler);

    // Check if file arrived before this component mounted
    const pending = getPendingFile();
    if (pending) {
      setReceiving(false);
      stableCallback(pending);
    }

    return () => window.removeEventListener('freetools-file-received', handler);
  }, [stableCallback]);

  return receiving;
}
