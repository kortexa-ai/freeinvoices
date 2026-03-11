import { useState, useEffect, useRef } from 'react';
import { Send, ExternalLink, Loader2, PenLine, Files, Image, Video, AudioLines, FileText } from 'lucide-react';
import { sendFile } from '../utils/crossSiteTransfer';
import { SITE_ID } from '../siteConfig';

const TARGETS = {
  pdf: [
    { id: 'freesignatures', name: 'Sign PDF', url: 'https://freesignatures.xyz', Icon: PenLine, bg: 'bg-indigo-600' },
    { id: 'freepdf', name: 'PDF Tools', url: 'https://freepdf.xyz', Icon: Files, bg: 'bg-red-600' },
    { id: 'freeresumetools', name: 'ATS Check', url: 'https://freeresumetools.xyz', Icon: FileText, bg: 'bg-teal-600' },
  ],
  image: [
    { id: 'freeimagetools', name: 'Edit Image', url: 'https://freeimagetools.xyz', Icon: Image, bg: 'bg-amber-600' },
    { id: 'freepdf', name: 'Images to PDF', url: 'https://freepdf.xyz/tools/images-to-pdf', Icon: Files, bg: 'bg-red-600' },
  ],
  audio: [
    { id: 'freeaudiotools', name: 'Audio Tools', url: 'https://freeaudiotools.xyz', Icon: AudioLines, bg: 'bg-cyan-600' },
  ],
  video: [
    { id: 'freevideotools', name: 'Video Tools', url: 'https://freevideotools.xyz', Icon: Video, bg: 'bg-teal-600' },
  ],
};

function getCategory(file) {
  if (!file) return null;
  const t = file.type || '';
  if (t === 'application/pdf') return 'pdf';
  if (t.startsWith('image/')) return 'image';
  if (t.startsWith('audio/')) return 'audio';
  if (t.startsWith('video/')) return 'video';
  return null;
}

/**
 * SendToMenu - "Send to another tool" dropdown.
 *
 * Props:
 *   file      - An existing File/Blob to send (for tools that already have one)
 *   getFile   - Async function that generates and returns a File on demand
 *   fileType  - 'pdf'|'image'|'audio'|'video' — required when using getFile (since there's no file to sniff)
 *   className - Additional CSS classes
 */
export default function SendToMenu({ file, getFile, fileType, className = '' }) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const ref = useRef(null);

  const category = file ? getCategory(file) : fileType || null;
  const targets = category ? (TARGETS[category] || []).filter(t => t.id !== SITE_ID) : [];

  useEffect(() => {
    if (!open) return;
    const onClick = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onClick); document.removeEventListener('keydown', onKey); };
  }, [open]);

  if (!targets.length) return null;
  if (!file && !getFile) return null;

  const handleSend = async (target) => {
    setBusy(true);
    try {
      const f = file || (getFile ? await getFile() : null);
      if (f) sendFile(target.url, f);
    } catch (err) {
      console.error('SendToMenu: failed to generate file', err);
    } finally {
      setBusy(false);
      setOpen(false);
    }
  };

  return (
    <div className={`relative inline-block ${className}`} ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        disabled={busy}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 rounded-lg transition-colors disabled:opacity-50"
        title="Send to another tool"
      >
        {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        <span className="hidden sm:inline">{busy ? 'Generating\u2026' : 'Send to\u2026'}</span>
      </button>
      {open && !busy && (
        <div className="absolute right-0 bottom-full mb-2 w-52 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg z-50 py-1">
          <div className="px-3 py-1.5 text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">Open in</div>
          {targets.map(t => (
            <button
              key={t.id}
              onClick={() => handleSend(t)}
              className="w-full flex items-center gap-3 px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-left"
            >
              <div className={`w-7 h-7 ${t.bg} rounded-md flex items-center justify-center shrink-0`}>
                <t.Icon className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{t.name}</span>
              <ExternalLink className="w-3 h-3 text-slate-400 ml-auto" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
