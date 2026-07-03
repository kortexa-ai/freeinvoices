import { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import ReceiveBanner from './ReceiveBanner';
import { setupReceiver } from '../utils/crossSiteTransfer';

export default function Layout({ children, isDarkMode, toggleDarkMode, onShowShortcuts, onHistoryToggle, historyCount }) {
  useEffect(() => { setupReceiver(); }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col">
      <Header
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        onShowShortcuts={onShowShortcuts}
        onHistoryToggle={onHistoryToggle}
        historyCount={historyCount}
      />
      <ReceiveBanner />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
