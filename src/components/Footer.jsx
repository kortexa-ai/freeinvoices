export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-slate-500 dark:text-slate-400">
          <p>
            Made by{' '}
            <a
              href="https://kortexa.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              kortexa.ai
            </a>
          </p>
          <p className="flex items-center gap-2">
            <a href="/about" className="hover:text-slate-700 dark:hover:text-slate-200">About</a>
            <span>·</span>
            <a href="/privacy" className="hover:text-slate-700 dark:hover:text-slate-200">Privacy</a>
            <span>·</span>
            <a href="/terms" className="hover:text-slate-700 dark:hover:text-slate-200">Terms</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
