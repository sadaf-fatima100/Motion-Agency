/**
 * KINETIX Studio — Blog Post Interactive Controller
 * Features:
 * 1. Pinned Column & Adaptive Sticky Sidebar Physics
 * 2. Scroll-Linked Real-Time Article Reading Progress Tracker
 * 3. Animated ScrollSpy Table of Contents with Active Section Indicator
 * 4. Offset-Aware Smooth Anchor Navigation with Heading Accent Flash
 * 5. GSAP ScrollTrigger Integration with High-Performance Fallbacks
 */

(function () {
  'use strict';

  function initBlogInteractions() {
    const article = document.querySelector('.article-content');
    const sidebar = document.querySelector('.article-sidebar');
    const tocList = document.getElementById('tocList');
    const tocProgressFill = document.getElementById('tocProgressFill');
    const tocProgressPill = document.getElementById('tocProgressPill');
    const tocLinks = document.querySelectorAll('.toc-link');

    if (!article) return;

    // Headings to monitor
    const headings = Array.from(article.querySelectorAll('h2[id]'));
    if (!headings.length) return;

    // Map headings to TOC links
    const linkMap = new Map();
    tocLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        const id = href.slice(1);
        linkMap.set(id, link);
      }
    });

    let activeId = null;
    let isTicking = false;

    // 1. Smooth Reading Progress Calculation
    function updateProgress() {
      const rect = article.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const totalScrollable = rect.height;
      const scrolled = Math.max(0, -rect.top + 120);

      let percentage = 0;
      if (totalScrollable > 0) {
        percentage = Math.min(100, Math.max(0, Math.round((scrolled / totalScrollable) * 100)));
      }

      // Update TOC Mini Progress Bar
      if (tocProgressFill) {
        tocProgressFill.style.width = percentage + '%';
      }

      // Update TOC Progress Badge
      if (tocProgressPill) {
        if (percentage >= 98) {
          tocProgressPill.textContent = 'Completed';
          tocProgressPill.classList.add('is-completed');
        } else {
          tocProgressPill.textContent = percentage + '% Read';
          tocProgressPill.classList.remove('is-completed');
        }
      }

      // 2. Determine Active Section (ScrollSpy)
      const scrollPos = window.scrollY || window.pageYOffset;
      const offsetThreshold = 160; // offset below fixed navbar
      let currentSection = null;

      for (let i = 0; i < headings.length; i++) {
        const heading = headings[i];
        const headingTop = heading.getBoundingClientRect().top + scrollPos - offsetThreshold;
        if (scrollPos >= headingTop) {
          currentSection = heading.id;
        } else {
          break;
        }
      }

      // Default to first section if scrolled near top of article
      if (!currentSection && rect.top <= 200 && headings.length > 0) {
        currentSection = headings[0].id;
      }

      if (currentSection && currentSection !== activeId) {
        activeId = currentSection;
        setActiveLink(currentSection);
      }

      // 3. Fallback Sticky Enforcer (guarantees pinned sidebar even if browser CSS sticky is hindered)
      if (window.innerWidth > 1140 && sidebar) {
        const grid = document.querySelector('.article-main-grid');
        if (grid) {
          const gridRect = grid.getBoundingClientRect();
          const topThreshold = 96;
          if (gridRect.top <= topThreshold) {
            const sidebarRect = sidebar.getBoundingClientRect();
            if (sidebarRect.top < topThreshold - 8) {
              const maxTranslate = Math.max(0, grid.offsetHeight - sidebar.offsetHeight);
              const desiredTranslate = Math.min(maxTranslate, Math.max(0, topThreshold - gridRect.top));
              sidebar.style.transform = `translate3d(0, ${desiredTranslate}px, 0)`;
            } else if (sidebarRect.top >= topThreshold && sidebar.style.transform) {
              sidebar.style.transform = '';
            }
          } else if (sidebar.style.transform) {
            sidebar.style.transform = '';
          }
        }
      }

      isTicking = false;
    }

    function setActiveLink(id) {
      tocLinks.forEach((link) => link.classList.remove('is-active'));
      const activeLink = linkMap.get(id);
      if (activeLink) {
        activeLink.classList.add('is-active');

        // Ensure active link is visible in sticky sidebar on small screens/laptops
        if (sidebar && sidebar.scrollHeight > sidebar.clientHeight) {
          const linkRect = activeLink.getBoundingClientRect();
          const sidebarRect = sidebar.getBoundingClientRect();
          if (linkRect.bottom > sidebarRect.bottom || linkRect.top < sidebarRect.top) {
            activeLink.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }
      }
    }

    function onScroll() {
      if (!isTicking) {
        window.requestAnimationFrame(updateProgress);
        isTicking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    updateProgress();

    // 3. Smooth Anchor Navigation with Heading Flash
    tocLinks.forEach((link) => {
      link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || !href.startsWith('#')) return;

        const targetEl = document.getElementById(href.slice(1));
        if (targetEl) {
          e.preventDefault();
          const targetY = targetEl.getBoundingClientRect().top + window.pageYOffset - 95;

          window.scrollTo({
            top: targetY,
            behavior: 'smooth'
          });

          // Trigger Heading Glow Animation
          headings.forEach((h) => h.classList.remove('heading-flash-active'));
          targetEl.classList.add('heading-flash-active');
          setTimeout(() => {
            targetEl.classList.remove('heading-flash-active');
          }, 1400);

          // Update active link immediately
          setActiveLink(href.slice(1));

          // Update browser URL cleanly without jump
          if (window.history && window.history.pushState) {
            window.history.pushState(null, null, href);
          }
        }
      });
    });

    // 4. GSAP Micro-Motion & Staggered Reveal
    if (window.gsap) {
      try {
        const widgets = document.querySelectorAll('.sidebar-widget');
        if (widgets.length) {
          gsap.from(widgets, {
            opacity: 0,
            y: 28,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power2.out',
            clearProps: 'all'
          });
        }

        // GSAP ScrollTrigger for pinned column refresh
        if (window.ScrollTrigger) {
          ScrollTrigger.create({
            trigger: '.article-main-grid',
            start: 'top top+=80',
            end: 'bottom bottom-=50',
            onUpdate: () => updateProgress()
          });
        }
      } catch (err) {
        console.warn('GSAP blog enhancements initialized in fallback mode', err);
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBlogInteractions);
  } else {
    initBlogInteractions();
  }
})();
