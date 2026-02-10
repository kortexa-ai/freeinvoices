import { FileText } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-slate-900">Invoices</h1>
            <p className="text-xs text-slate-500">by kortexa.ai</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => window.print()}
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Print / Download PDF
          </button>
        </div>
      </div>
    </header>
  );
}
