/**
 * KINETIX Studio — Floating WhatsApp Widget Controller
 * Directs inquiries to: +92 314 3110259
 */
(function () {
  'use strict';

  function initWhatsAppWidget() {
    var card = document.getElementById('kinetixWaCard');
    var closeBtn = document.getElementById('kinetixWaClose');

    if (!card) return;

    // Check if dismissed in this session
    var isDismissed = false;
    try {
      isDismissed = sessionStorage.getItem('kinetix_wa_dismissed') === '1';
    } catch (e) {}

    if (!isDismissed) {
      // Smoothly display prompt bubble after initial load
      setTimeout(function () {
        if (card && !card.classList.contains('hidden')) {
          card.classList.add('visible');
        }
      }, 1800);
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        card.classList.remove('visible');
        card.classList.add('hidden');
        try {
          sessionStorage.setItem('kinetix_wa_dismissed', '1');
        } catch (err) {}
      });
    }

    window.closeKinetixWa = function (e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      if (card) {
        card.classList.remove('visible');
        card.classList.add('hidden');
      }
      try {
        sessionStorage.setItem('kinetix_wa_dismissed', '1');
      } catch (err) {}
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWhatsAppWidget);
  } else {
    initWhatsAppWidget();
  }
})();
