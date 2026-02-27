import { useState, useEffect, useCallback } from 'react';

const DARK_MODE_KEY = 'freetools_dark_mode';

/**
 * Custom hook for dark mode toggle
 * Persists preference to localStorage
 */
export function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === 'undefined') return false;
    try {
      const saved = localStorage.getItem(DARK_MODE_KEY);
      if (saved !== null) {
        return saved === 'true';
      }
      // Check system preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Apply dark mode class to document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Persist preference
    try {
      localStorage.setItem(DARK_MODE_KEY, isDarkMode.toString());
    } catch (e) {
      console.warn('Failed to save dark mode preference:', e);
    }
  }, [isDarkMode]);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prev => !prev);
  }, []);

  return { isDarkMode, toggleDarkMode };
}
