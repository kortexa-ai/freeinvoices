import { Files, FileText, QrCode, PenLine, Image, CreditCard, ScrollText, Video, Headphones, BarChart3, ExternalLink } from 'lucide-react';

const CURRENT_TOOL = 'freeinvoices';

const TOOLS = [
  { id: 'freepdf', name: 'PDF Tools', description: 'Merge, split, rotate, convert PDFs', url: 'https://freepdf.xyz', Icon: Files, bg: 'bg-red-600' },
  { id: 'freeresumetools', name: 'Resume Tools', description: 'Build, parse, and ATS-check resumes', url: 'https://freeresumetools.xyz', Icon: FileText, bg: 'bg-teal-600' },
  { id: 'freeqr', name: 'QR Generator', description: 'Create QR codes for URLs, WiFi, contacts', url: 'https://freeqr.xyz', Icon: QrCode, bg: 'bg-emerald-600' },
  { id: 'freeinvoices', name: 'Invoice Maker', description: 'Create and download professional invoices', url: 'https://freeinvoices.xyz', Icon: FileText, bg: 'bg-blue-600' },
  { id: 'freesignatures', name: 'PDF Signatures', description: 'Sign PDFs in your browser', url: 'https://freesignatures.xyz', Icon: PenLine, bg: 'bg-indigo-600' },
  { id: 'freeimagetools', name: 'Image Tools', description: 'Resize, compress, crop, convert images', url: 'https://freeimagetools.xyz', Icon: Image, bg: 'bg-amber-600' },
  { id: 'freebusinesscards', name: 'Business Cards', description: 'Create and print professional business cards', url: 'https://freebusinesscards.xyz', Icon: CreditCard, bg: 'bg-purple-600' },
  { id: 'freecontractforms', name: 'Contract Forms', description: 'Free contract templates for freelancers', url: 'https://freecontractforms.xyz', Icon: ScrollText, bg: 'bg-rose-600' },
  { id: 'freetranslator', name: 'Translator', description: 'Transcribe audio & translate text with on-device AI', url: 'https://freetranslator.xyz', logo: 'https://freetranslator.xyz/icon-192.png' },
  { id: 'freevideotools', name: 'Video Tools', description: 'Convert, compress, trim, and edit videos', url: 'https://freevideotools.xyz', Icon: Video, bg: 'bg-teal-600' },
  { id: 'freeaudiotools', name: 'Audio Tools', description: 'Trim, convert, and merge audio files', url: 'https://freeaudiotools.xyz', Icon: Headphones, bg: 'bg-cyan-600' },
  { id: 'freecharttools', name: 'Chart Tools', description: 'Create bar, line, and pie charts from data', url: 'https://freecharttools.xyz', Icon: BarChart3, bg: 'bg-blue-600' },
];

export default function FreeTools() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <a
          href="/"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-8"
        >
          &larr; Back
        </a>
        <h1 className="text-3xl font-bold mb-2">Free Tools by Kortexa</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8">
          Simple, free, browser-based tools. No signup required.
        </p>

        <div className="space-y-4">
          {TOOLS.map(tool => {
            const isCurrent = tool.id === CURRENT_TOOL;
            return (
              <a
                key={tool.id}
                href={isCurrent ? '/' : tool.url}
                {...(!isCurrent && { target: '_blank', rel: 'noopener noreferrer' })}
                className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
              >
                {tool.logo ? (
                  <img src={tool.logo} alt="" className="w-10 h-10 rounded-lg shrink-0" />
                ) : (
                  <div className={`w-10 h-10 ${tool.bg} rounded-lg flex items-center justify-center shrink-0`}>
                    <tool.Icon className="w-5 h-5 text-white" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-semibold text-slate-900 dark:text-slate-100">{tool.name}</span>
                    {isCurrent && (
                      <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 text-xs rounded-full">
                        You are here
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{tool.description}</p>
                </div>
                {!isCurrent && <ExternalLink className="w-4 h-4 text-slate-400 shrink-0" />}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
