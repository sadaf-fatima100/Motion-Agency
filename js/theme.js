/**
 * KINETIX Studio — Theme Controller (Light / Dark Mode)
 * Manages theme switching, state persistence via localStorage,
 * system preference fallbacks, and navbar icon synchronization.
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'kinetix_theme';
  const html = document.documentElement;

  // Initialize theme as early as possible
  function getPreferredTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    if (theme === 'dark') {
      html.setAttribute('data-theme', 'dark');
      document.body && document.body.classList.add('dark-theme');
    } else {
      html.setAttribute('data-theme', 'light');
      document.body && document.body.classList.remove('dark-theme');
    }
    updateToggleButtons(theme);
  }

  function updateToggleButtons(theme) {
    const buttons = document.querySelectorAll('.theme-toggle-btn');
    buttons.forEach((btn) => {
      const isDark = theme === 'dark';
      btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      btn.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      btn.classList.toggle('is-dark', isDark);
    });
  }

  window.toggleKinetixTheme = function () {
    const current = html.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch (e) {
      console.warn('LocalStorage unavailable for theme saving', e);
    }
    applyTheme(next);
  };

  // Run on DOM ready
  function init() {
    const currentTheme = getPreferredTheme();
    applyTheme(currentTheme);

    // Attach click listener to any toggle buttons
    document.querySelectorAll('.theme-toggle-btn').forEach((btn) => {
      btn.removeEventListener('click', window.toggleKinetixTheme);
      btn.addEventListener('click', window.toggleKinetixTheme);
    });

    // Listen for OS system theme change if no explicit choice saved
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem(STORAGE_KEY)) {
          applyTheme(e.matches ? 'dark' : 'light');
        }
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
