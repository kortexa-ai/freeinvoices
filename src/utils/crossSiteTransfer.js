/**
 * Cross-site file transfer for the Freetools ecosystem.
 * Privacy-first: uses window.open + postMessage. No server, no tracking.
 */

const FREETOOLS_DOMAINS = [
  'freepdf.xyz',
  'freeimagetools.xyz',
  'freevideotools.xyz',
  'freeaudiotools.xyz',
  'freecharttools.xyz',
  'freeqr.xyz',
  'freesignatures.xyz',
  'freebusinesscards.xyz',
  'freecontractforms.xyz',
  'freeinvoices.xyz',
  'freeresumetools.xyz',
  'freetranslator.xyz',
];

function isFreetoolsOrigin(origin) {
  try {
    return FREETOOLS_DOMAINS.includes(new URL(origin).hostname);
  } catch {
    return false;
  }
}

// Also accept localhost for dev
function isAllowedOrigin(origin) {
  if (isFreetoolsOrigin(origin)) return true;
  try {
    const host = new URL(origin).hostname;
    return host === 'localhost' || host === '127.0.0.1';
  } catch {
    return false;
  }
}

// --- Sender ---

export function sendFile(targetUrl, file) {
  const separator = targetUrl.includes('?') ? '&' : '?';
  const w = window.open(targetUrl + separator + 'receive=1');
  if (!w) {
    alert('Please allow pop-ups to send files between tools.');
    return;
  }

  const cleanup = () => window.removeEventListener('message', handler);
  const timeout = setTimeout(cleanup, 30000);

  function handler(event) {
    if (!isAllowedOrigin(event.origin)) return;
    if (event.data?.type !== 'freetools-ready') return;

    clearTimeout(timeout);
    cleanup();

    const reader = new FileReader();
    reader.onload = () => {
      w.postMessage({
        type: 'freetools-transfer',
        fileName: file.name,
        fileType: file.type,
        data: reader.result,
      }, event.origin);
    };
    reader.readAsArrayBuffer(file);
  }

  window.addEventListener('message', handler);
}

// --- Receiver ---

let _pendingFile = null;

export function setupReceiver() {
  const params = new URLSearchParams(window.location.search);
  if (!params.has('receive')) return false;

  // Tell the opener we're ready
  if (window.opener) {
    window.opener.postMessage({ type: 'freetools-ready' }, '*');
  }

  function handler(event) {
    if (event.data?.type !== 'freetools-transfer') return;

    const { fileName, fileType, data } = event.data;
    _pendingFile = new File([data], fileName, { type: fileType });

    // Clean URL
    const url = new URL(window.location);
    url.searchParams.delete('receive');
    window.history.replaceState({}, '', url);

    window.dispatchEvent(new CustomEvent('freetools-file-received', { detail: { file: _pendingFile } }));
    window.removeEventListener('message', handler);
  }

  window.addEventListener('message', handler);
  return true;
}

export function getPendingFile() {
  const f = _pendingFile;
  _pendingFile = null;
  return f;
}

export function isReceiveMode() {
  return new URLSearchParams(window.location.search).has('receive');
}
