/**
 * KINETIX Studio — Theme Controller (Light / Dark Mode)
 * Manages theme switching, state persistence via localStorage,
 * system preference fallbacks, cross-tab synchronization, and icon states.
 */

(function () {
  'use strict';

  // Guard against duplicate script evaluation
  if (window.__KINETIX_THEME_LOADED__) return;
  window.__KINETIX_THEME_LOADED__ = true;

  const STORAGE_KEY = 'kinetix_theme';
  const html = document.documentElement;
  let lastToggleTimestamp = 0;

  // Initialize theme as early as possible — defaults to dark
  function getPreferredTheme() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'dark' || saved === 'light') return saved;
    } catch (e) {}
    // Default is dark theme for elite motion studio aesthetic
    return 'dark';
  }

  function applyTheme(theme) {
    const isDark = theme === 'dark';
    if (isDark) {
      html.setAttribute('data-theme', 'dark');
      if (document.body) {
        document.body.classList.add('dark-theme');
      }
    } else {
      html.setAttribute('data-theme', 'light');
      if (document.body) {
        document.body.classList.remove('dark-theme');
      }
    }
    updateToggleButtons(theme);
    try {
      window.dispatchEvent(new CustomEvent('kinetixThemeChange', { detail: { theme } }));
    } catch (e) {}
  }

  function updateToggleButtons(theme) {
    const buttons = document.querySelectorAll('.theme-toggle-btn');
    const isDark = theme === 'dark';
    buttons.forEach((btn) => {
      btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      btn.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      btn.classList.toggle('is-dark', isDark);
    });
  }

  // Globally accessible toggle function with rapid multi-click / double-event debounce
  window.toggleKinetixTheme = function (e) {
    if (e) {
      if (typeof e.preventDefault === 'function') e.preventDefault();
      if (typeof e.stopPropagation === 'function') e.stopPropagation();
    }
    const now = Date.now();
    // Prevent immediate double-fire from inline onclick + addEventListener
    if (now - lastToggleTimestamp < 350) {
      return false;
    }
    lastToggleTimestamp = now;

    const current = (html.getAttribute('data-theme') === 'dark' || (document.body && document.body.classList.contains('dark-theme'))) ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';

    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch (err) {
      console.warn('LocalStorage unavailable for theme saving', err);
    }

    applyTheme(next);
    return false;
  };

  // Immediate run on script execution
  const initialTheme = getPreferredTheme();
  applyTheme(initialTheme);

  // Run on DOM ready to bind buttons and ensure body has class
  function init() {
    const currentTheme = getPreferredTheme();
    applyTheme(currentTheme);

    // Bind to all theme toggle buttons safely (overwriting onclick prevents event listener multiplication)
    document.querySelectorAll('.theme-toggle-btn').forEach((btn) => {
      btn.onclick = window.toggleKinetixTheme;
    });

    // Listen for OS system theme change if no explicit choice saved
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (ev) => {
        try {
          if (!localStorage.getItem(STORAGE_KEY)) {
            applyTheme(ev.matches ? 'dark' : 'light');
          }
        } catch(e) {}
      });
    }

    // Cross-tab theme sync via StorageEvent
    window.addEventListener('storage', (ev) => {
      if (ev.key === STORAGE_KEY && ev.newValue) {
        applyTheme(ev.newValue);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
