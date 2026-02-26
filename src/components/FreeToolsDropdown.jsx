import { useEffect, useRef } from 'react';
import { Files, FileText, QrCode, PenLine, Image, CreditCard, ScrollText, Video, Headphones, BarChart3, ExternalLink } from 'lucide-react';

const CURRENT_TOOL = 'freeinvoices';

const TOOLS = [
  { id: 'freepdf', name: 'PDF Tools', url: 'https://freepdf.xyz', Icon: Files, bg: 'bg-red-600' },
  { id: 'freeresumetools', name: 'Resume Tools', url: 'https://freeresumetools.xyz', Icon: FileText, bg: 'bg-teal-600' },
  { id: 'freeqr', name: 'QR Generator', url: 'https://freeqr.xyz', Icon: QrCode, bg: 'bg-emerald-600' },
  { id: 'freeinvoices', name: 'Invoice Maker', url: 'https://freeinvoices.xyz', Icon: FileText, bg: 'bg-blue-600' },
  { id: 'freesignatures', name: 'PDF Signatures', url: 'https://freesignatures.xyz', Icon: PenLine, bg: 'bg-indigo-600' },
  { id: 'freeimagetools', name: 'Image Tools', url: 'https://freeimagetools.xyz', Icon: Image, bg: 'bg-amber-600' },
  { id: 'freebusinesscards', name: 'Business Cards', url: 'https://freebusinesscards.xyz', Icon: CreditCard, bg: 'bg-purple-600' },
  { id: 'freecontractforms', name: 'Contract Forms', url: 'https://freecontractforms.xyz', Icon: ScrollText, bg: 'bg-rose-600' },
  { id: 'freetranslator', name: 'Translator', url: 'https://freetranslator.xyz', logo: 'https://freetranslator.xyz/icon-192.png' },
  { id: 'freevideotools', name: 'Video Tools', url: 'https://freevideotools.xyz', Icon: Video, bg: 'bg-teal-600' },
  { id: 'freeaudiotools', name: 'Audio Tools', url: 'https://freeaudiotools.xyz', Icon: Headphones, bg: 'bg-cyan-600' },
  { id: 'freecharttools', name: 'Chart Tools', url: 'https://freecharttools.xyz', Icon: BarChart3, bg: 'bg-blue-600' },
];

export default function FreeToolsDropdown({ isOpen, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const otherTools = TOOLS.filter(t => t.id !== CURRENT_TOOL);

  return (
    <div ref={ref} className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg z-50 py-2">
      {otherTools.map(tool => (
        <a
          key={tool.id}
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
        >
          {tool.logo ? (
            <img src={tool.logo} alt="" className="w-8 h-8 rounded-lg shrink-0" />
          ) : (
            <div className={`w-8 h-8 ${tool.bg} rounded-lg flex items-center justify-center shrink-0`}>
              <tool.Icon className="w-4 h-4 text-white" />
            </div>
          )}
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{tool.name}</span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400 ml-auto" />
        </a>
      ))}
      <div className="border-t border-slate-200 dark:border-slate-700 mt-2 pt-2">
        <a
          href="/freetools"
          className="flex items-center justify-center px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
        >
          See all tools &rarr;
        </a>
      </div>
    </div>
  );
}
