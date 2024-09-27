'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('light');

  // Check for system preference and set initial theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);

  // Update the class on the html element
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50">
      <button
        onClick={toggleTheme}
        className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-3 rounded-full shadow-lg focus:outline-none transition-colors"
        aria-label="Toggle Theme"
      >
        {theme === 'dark' ? (
          <span>🌞 Light Mode</span>
        ) : (
          <span>🌙 Dark Mode</span>
        )}
      </button>
    </div>
  );
}


