gsap.registerPlugin(ScrollTrigger);
const rm=window.matchMedia("(prefers-reduced-motion:reduce)").matches;
if(!rm){
  // ============================================================
  // FRAMER MOTION TYPOGRAPHY ENGINE (SAFE WORD-BY-WORD REVEALS)
  // ============================================================
  function splitWordsSafely(element) {
    if (!element || element.getAttribute('data-fm-split') === 'true') return;
    element.setAttribute('data-fm-split', 'true');

    function isAccentElement(el) {
      if (!el || !el.classList) return false;
      return (
        el.classList.contains('accent') ||
        el.classList.contains('accent-purple') ||
        el.classList.contains('accent-pink') ||
        el.classList.contains('accent-text') ||
        el.classList.contains('gradient-accent') ||
        el.classList.contains('about-accent') ||
        el.classList.contains('why-script') ||
        el.classList.contains('highlight-brand') ||
        el.classList.contains('grad-word')
      );
    }

    function walk(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        const parent = node.parentElement;
        if (isAccentElement(parent)) {
          parent.classList.add('fm-word');
          return;
        }

        const text = node.nodeValue;
        if (text && text.trim().length > 0) {
          const frag = document.createDocumentFragment();
          const tokens = text.split(/(\s+)/);
          tokens.forEach(token => {
            if (/^\s+$/.test(token)) {
              frag.appendChild(document.createTextNode(token));
            } else if (token.length > 0) {
              const span = document.createElement('span');
              span.className = 'fm-word';
              span.textContent = token;
              frag.appendChild(span);
            }
          });
          node.parentNode.replaceChild(frag, node);
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        if (['SVG', 'SCRIPT', 'STYLE'].includes(node.tagName)) return;
        if (isAccentElement(node)) {
          node.classList.add('fm-word');
          return;
        }
        Array.from(node.childNodes).forEach(walk);
      }
    }

    Array.from(element.childNodes).forEach(walk);
  }

  function animateFramerHeading(selector, trigger = null, delay = 0) {
    const headings = gsap.utils.toArray(selector);
    headings.forEach(h => {
      gsap.from(h, {
        y: 28,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
        delay: delay,
        scrollTrigger: {
          trigger: (trigger && typeof trigger === 'string') ? (h.closest(trigger) || trigger) : (trigger || h),
          start: "top 88%",
          toggleActions: "play none none none"
        }
      });
    });
  }

  // ============================================================
  // 1. HERO SECTION (FRAMER MOTION SEQUENTIAL ENTRANCE)
  // ============================================================
  const heroTl = gsap.timeline({ defaults: { ease: "power4.out" } });

  if (document.querySelector(".hero-eyebrow")) {
    heroTl.from(".hero-eyebrow", {
      opacity: 0,
      y: 18,
      scale: 0.92,
      duration: 0.8,
      ease: "power3.out"
    });
  }

  heroTl
    .from(".hero-title", {
      opacity: 0,
      y: 28,
      duration: 0.9,
      ease: "power4.out",
      clearProps: "all"
    }, document.querySelector(".hero-eyebrow") ? "-=0.55" : "+=0")
    .from(".hero-sub", {
      opacity: 0,
      y: 22,
      duration: 0.85,
      ease: "power3.out",
      clearProps: "all"
    }, "-=0.6")
    .from(".hero-actions > *", {
      opacity: 0,
      y: 20,
      scale: 0.94,
      stagger: 0.12,
      duration: 0.75,
      ease: "power3.out",
      clearProps: "all"
    }, "-=0.5")
    .from(".trust-row", {
      opacity: 0,
      y: 16,
      duration: 0.7,
      ease: "power3.out",
      clearProps: "all"
    }, "-=0.4")
    .from(".hero-stage", {
      opacity: 0,
      y: 32,
      scale: 0.95,
      duration: 1.1,
      ease: "power4.out"
    }, "-=0.9")
    .from(".hero-card-brand-title span", {
      opacity: 0,
      x: -24,
      stagger: 0.08,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.6")
    .from(".hero-card-top-badge", {
      opacity: 0,
      y: -18,
      scale: 0.85,
      duration: 0.75,
      ease: "back.out(1.6)"
    }, "-=0.6")
    .from(".hero-card-play-btn", {
      scale: 0.6,
      opacity: 0,
      duration: 0.85,
      ease: "back.out(2)"
    }, "-=0.6")
    .from(".hero-stats-dock .hero-stat-item", {
      opacity: 0,
      y: 22,
      scale: 0.9,
      stagger: 0.12,
      duration: 0.8,
      ease: "back.out(1.4)"
    }, "-=0.4")
    .from(".stat-dock-divider", {
      scaleY: 0,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "power2.out"
    }, "-=0.6");

  // ============================================================
  // 2. STATS BAR SECTION
  // ============================================================
  gsap.from(".stats-bar", {
    opacity: 0,
    y: 36,
    scale: 0.97,
    duration: 0.95,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".stats-bar",
      start: "top 90%"
    }
  });
  gsap.from(".stat-unit", {
    opacity: 0,
    y: 24,
    stagger: 0.15,
    duration: 0.85,
    ease: "back.out(1.3)",
    scrollTrigger: {
      trigger: ".stats-bar",
      start: "top 90%"
    }
  });
  gsap.from(".stats-badge-anchor", {
    scale: 0.6,
    opacity: 0,
    rotate: -30,
    duration: 1.0,
    ease: "back.out(1.8)",
    scrollTrigger: {
      trigger: ".stats-bar",
      start: "top 90%"
    }
  });

  // ============================================================
  // 3. CORE ANIMATION CAPABILITIES SECTION (#capabilities)
  // ============================================================
  gsap.from(".anim-solutions-eyebrow", {
    opacity: 0,
    y: 16,
    scale: 0.94,
    duration: 0.75,
    ease: "power3.out",
    scrollTrigger: { trigger: ".anim-solutions-head", start: "top 88%" }
  });
  animateFramerHeading(".anim-solutions-title", ".anim-solutions-head");
  gsap.from(".anim-solutions-subtitle", {
    opacity: 0,
    y: 20,
    duration: 0.85,
    ease: "power3.out",
    delay: 0.2,
    scrollTrigger: { trigger: ".anim-solutions-head", start: "top 88%" }
  });
  gsap.from(".anim-solution-card", {
    opacity: 0,
    y: 50,
    scale: 0.93,
    stagger: 0,
    duration: 0.95,
    ease: "power4.out",
    clearProps: "transform",
    scrollTrigger: {
      trigger: ".anim-solutions-grid",
      start: "top 86%"
    }
  });

  // ============================================================
  // 4. PORTFOLIO & SHOWCASE SECTION (#work)
  // ============================================================
  gsap.from(".section-head .eyebrow", {
    opacity: 0,
    y: 16,
    duration: 0.75,
    ease: "power3.out",
    scrollTrigger: { trigger: ".section-head", start: "top 88%" }
  });
  animateFramerHeading(".section-head h2", ".section-head");
  gsap.from(".section-head p", {
    opacity: 0,
    y: 20,
    duration: 0.85,
    ease: "power3.out",
    delay: 0.18,
    scrollTrigger: { trigger: ".section-head", start: "top 88%" }
  });
  gsap.from(".work-card", {
    opacity: 0,
    y: 28,
    duration: 0.75,
    stagger: 0,
    ease: "power3.out",
    clearProps: "transform",
    scrollTrigger: { trigger: ".work-grid", start: "top 90%" }
  });

  // ============================================================
  // 5. EDITORIAL MANIFESTO SECTION
  // ============================================================
  animateFramerHeading(".manifesto-heading", ".manifesto-section");
  gsap.from(".particle-left", {
    x: -30,
    opacity: 0,
    duration: 1.1,
    ease: "power3.out",
    scrollTrigger: { trigger: ".manifesto-section", start: "top 85%" }
  });
  gsap.from(".particle-right", {
    x: 30,
    opacity: 0,
    duration: 1.1,
    ease: "power3.out",
    scrollTrigger: { trigger: ".manifesto-section", start: "top 85%" }
  });
  gsap.from(".manifesto-badge", {
    scale: 0,
    rotate: -45,
    opacity: 0,
    duration: 1.1,
    ease: "back.out(2)",
    scrollTrigger: { trigger: ".manifesto-section", start: "top 85%" }
  });
  gsap.from(".manifesto-note", {
    opacity: 0,
    y: 20,
    duration: 0.85,
    ease: "power3.out",
    delay: 0.25,
    scrollTrigger: { trigger: ".manifesto-section", start: "top 85%" }
  });

  // ============================================================
  // 6. WHY BUSINESSES PREFER US SECTION (#why-us)
  // ============================================================
  gsap.from(".why-us-eyebrow", {
    opacity: 0,
    y: 16,
    duration: 0.75,
    ease: "power3.out",
    scrollTrigger: { trigger: ".why-us-header", start: "top 88%" }
  });
  animateFramerHeading(".why-us-main-title", ".why-us-header");
  // Framer Motion Smooth Drop for Why-Us Badges (Random / Non-straight angles)
  const pillTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".why-us-header",
      start: "top 85%",
      toggleActions: "play none none none"
    }
  });

  pillTl
    .fromTo(".why-pill-reviews", 
      { opacity: 0, y: -80, rotation: -14, scale: 0.75 },
      { 
        opacity: 1, 
        y: 0, 
        rotation: -4, 
        scale: 1, 
        duration: 0.95, 
        ease: "back.out(1.85)",
        onComplete: () => {
          gsap.to(".why-pill-reviews", {
            y: -5,
            rotation: -2.8,
            duration: 2.4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          });
        }
      }
    )
    .fromTo(".why-pill-satisfaction",
      { opacity: 0, y: -90, rotation: 14, scale: 0.75 },
      { 
        opacity: 1, 
        y: 0, 
        rotation: 3.5, 
        scale: 1, 
        duration: 1.0, 
        ease: "back.out(1.95)",
        onComplete: () => {
          gsap.to(".why-pill-satisfaction", {
            y: -5,
            rotation: 4.6,
            duration: 2.7,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 0.35
          });
        }
      },
      "-=0.75"
    );
  gsap.from(".why-bento-grid .why-card", {
    opacity: 0,
    y: 45,
    scale: 0.94,
    stagger: 0.12,
    duration: 1.0,
    ease: "back.out(1.4)",
    clearProps: "transform,opacity",
    scrollTrigger: { trigger: ".why-bento-grid", start: "top 86%" }
  });
  gsap.from(".why-banner-tag", {
    scale: 0.8,
    opacity: 0,
    stagger: 0.06,
    duration: 0.65,
    ease: "back.out(1.8)",
    scrollTrigger: { trigger: ".why-card-banner", start: "top 88%" }
  });
  gsap.from(".why-phones-visual .why-phone", {
    x: 45,
    opacity: 0,
    stagger: 0.15,
    duration: 1.0,
    ease: "power3.out",
    clearProps: "transform",
    scrollTrigger: { trigger: ".why-card-wide", start: "top 85%" }
  });
  gsap.from(".why-tool-item", {
    scale: 0.8,
    opacity: 0,
    stagger: 0.08,
    duration: 0.7,
    ease: "back.out(1.5)",
    clearProps: "transform",
    scrollTrigger: { trigger: ".why-tools-box", start: "top 90%" }
  });
  gsap.from(".why-clipboard-board", {
    scale: 0.85,
    opacity: 0,
    y: 20,
    duration: 0.9,
    ease: "back.out(1.6)",
    scrollTrigger: { trigger: ".why-card-banner", start: "top 85%" }
  });
  gsap.from(".why-floating-capsule", {
    scale: 0,
    opacity: 0,
    stagger: 0.1,
    duration: 0.8,
    ease: "back.out(2)",
    scrollTrigger: { trigger: ".why-card-banner", start: "top 85%" }
  });

  // ============================================================
  // 7. OUR WORKING PROCESS SECTION (#process)
  // ============================================================
  gsap.from(".process-eyebrow", {
    opacity: 0,
    y: 16,
    duration: 0.75,
    ease: "power3.out",
    scrollTrigger: { trigger: ".process-head", start: "top 88%" }
  });
  animateFramerHeading(".process-main-title", ".process-head");
  gsap.from(".process-sub-text", {
    opacity: 0,
    y: 20,
    duration: 0.85,
    ease: "power3.out",
    delay: 0.2,
    scrollTrigger: { trigger: ".process-head", start: "top 88%" }
  });
  gsap.from(".services-grid .service-card", {
    opacity: 0,
    y: 48,
    scale: 0.93,
    stagger: 0,
    duration: 0.95,
    ease: "back.out(1.3)",
    clearProps: "transform",
    scrollTrigger: { trigger: ".services-grid", start: "top 86%" }
  });

  // ============================================================
  // 8. ABOUT AGENCY SECTION (#about)
  // ============================================================
  gsap.from(".about-eyebrow", {
    opacity: 0,
    y: 16,
    duration: 0.75,
    ease: "power3.out",
    scrollTrigger: { trigger: ".about-agency-left", start: "top 88%" }
  });
  animateFramerHeading(".about-main-title", ".about-agency-left");
  gsap.from(".about-video-wrap", {
    opacity: 0,
    y: 28,
    scale: 0.94,
    duration: 0.9,
    ease: "power3.out",
    scrollTrigger: { trigger: ".about-agency-left", start: "top 86%" }
  });
  gsap.from(".about-sublead, .about-actions-row", {
    opacity: 0,
    y: 22,
    stagger: 0.12,
    duration: 0.8,
    ease: "power3.out",
    scrollTrigger: { trigger: ".about-actions-row", start: "top 90%" }
  });
  // 8. ABOUT AGENCY SECTION: RIGHT STACKED CARDS (SILKY SMOOTH FLAT SLIDE-IN ONE BY ONE)
  gsap.from(".about-slide-card", {
    opacity: 0,
    x: 70,
    stagger: 0.16,
    duration: 0.85,
    ease: "power3.out",
    clearProps: "all",
    scrollTrigger: {
      trigger: ".about-cards-stack",
      start: "top 85%",
      toggleActions: "play none none none"
    }
  });

  // ============================================================
  // 9. PRICING PLANS SECTION (#pricing)
  // ============================================================
  gsap.from(".pricing-eyebrow", {
    opacity: 0,
    y: 16,
    duration: 0.75,
    ease: "power3.out",
    scrollTrigger: { trigger: ".pricing-head", start: "top 88%" }
  });
  animateFramerHeading(".pricing-main-title", ".pricing-head");
  gsap.from(".pricing-sub-text", {
    opacity: 0,
    y: 20,
    duration: 0.85,
    ease: "power3.out",
    delay: 0.2,
    scrollTrigger: { trigger: ".pricing-head", start: "top 88%" }
  });
  gsap.from(".pricing-card", {
    opacity: 0,
    y: 55,
    scale: 0.92,
    stagger: 0,
    duration: 0.95,
    ease: "power3.out",
    clearProps: "transform",
    scrollTrigger: { trigger: ".pricing-grid", start: "top 86%" }
  });
  gsap.from(".pricing-popular-badge", {
    scale: 0,
    opacity: 0,
    duration: 0.75,
    ease: "back.out(2)",
    delay: 0.4,
    scrollTrigger: { trigger: ".pricing-grid", start: "top 86%" }
  });

  // ============================================================
  // 9.5 TESTIMONIALS SECTION (#testimonials)
  // ============================================================
  animateFramerHeading(".testimonials-title", ".testimonials-section");
  gsap.from(".testimonials-section .section-head p", {
    opacity: 0,
    y: 20,
    duration: 0.85,
    ease: "power3.out",
    scrollTrigger: { trigger: ".testimonials-section", start: "top 85%" }
  });
  gsap.from(".testi-stage-container", {
    opacity: 0,
    y: 40,
    scale: 0.96,
    duration: 1.0,
    ease: "power3.out",
    scrollTrigger: { trigger: ".testi-stage-container", start: "top 82%" }
  });

  // ============================================================
  // 10. CTA BAND (#contact)
  // ============================================================
  gsap.from(".cta-band", {
    opacity: 0,
    scale: 0.94,
    y: 42,
    duration: 1.0,
    ease: "power4.out",
    scrollTrigger: { trigger: ".cta-band", start: "top 88%" }
  });
  animateFramerHeading(".cta-band h2", ".cta-band");
  gsap.from(".cta-band p, .cta-band .btn-primary", {
    opacity: 0,
    y: 22,
    stagger: 0.12,
    duration: 0.85,
    ease: "power3.out",
    scrollTrigger: { trigger: ".cta-band", start: "top 88%" }
  });

  // ============================================================
  // 11. FOOTER REVEAL
  // ============================================================
  gsap.from(".footer-col", {
    opacity: 0,
    y: 35,
    stagger: 0.1,
    duration: 0.9,
    ease: "power3.out",
    scrollTrigger: { trigger: ".site-footer", start: "top 90%" }
  });
  gsap.from(".footer-bottom-pill", {
    opacity: 0,
    y: 20,
    duration: 0.85,
    ease: "power3.out",
    scrollTrigger: { trigger: ".footer-bottom-pill", start: "top 96%" }
  });

  // ============================================================
  // 12. CONTINUOUS FRAMER MOTION FLOATING MICRO-ANIMATIONS
  // ============================================================
  gsap.to(".why-pill-reviews", {
    y: -7,
    duration: 3.2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
  gsap.to(".why-pill-satisfaction", {
    y: 7,
    duration: 3.6,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    delay: 0.5
  });
  gsap.to(".hctb-icon", {
    scale: 1.08,
    duration: 2.2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });

  // ============================================================
  // GSAP SCROLLTRIGGER EDGE REVEAL PARTICLES ANIMATION
  // (Emerge smoothly from left & right screen edges on scroll)
  // ============================================================
  gsap.utils.toArray('.edge-left').forEach(el => {
    gsap.to(el, {
      x: 130, // slides out from left edge into the gutter
      opacity: 0.95,
      duration: 1.3,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el.closest('section') || el.parentElement,
        start: "top 82%",
        toggleActions: "play none none reverse"
      }
    });
  });

  gsap.utils.toArray('.edge-right').forEach(el => {
    gsap.to(el, {
      x: -130, // slides out from right edge into the gutter
      opacity: 0.95,
      duration: 1.3,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el.closest('section') || el.parentElement,
        start: "top 82%",
        toggleActions: "play none none reverse"
      }
    });
  });

  // ============================================================
  // ABOUT PAGE CARDS FRAMER MOTION (UPRIGHT STATE PRESERVED, NO SHRINKING)
  // ============================================================
  if (document.querySelector(".pillars-grid")) {
    const pillarCards = gsap.utils.toArray(".pillars-grid .pillar-card");
    
    // Cards stay firmly in their upright position (no scale shrink, no y-drop)
    gsap.fromTo(pillarCards, 
      {
        opacity: 0,
        filter: "blur(10px)"
      },
      {
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.9,
        stagger: 0.1,
        ease: "power2.out",
        clearProps: "all",
        scrollTrigger: {
          trigger: ".pillars-grid",
          start: "top 85%"
        }
      }
    );

    // Subtle Framer-style micro-slide on the badges while cards remain upright
    gsap.from(".pillars-grid .pillar-card .step-badge", {
      opacity: 0,
      x: 10,
      duration: 0.6,
      stagger: 0.1,
      delay: 0.1,
      ease: "power2.out",
      clearProps: "all",
      scrollTrigger: {
        trigger: ".pillars-grid",
        start: "top 85%"
      }
    });
  }

  if (document.querySelector(".pipeline-steps-grid")) {
    const pipeCards = gsap.utils.toArray(".pipeline-steps-grid .pipeline-step-card");
    
    gsap.fromTo(pipeCards, 
      {
        opacity: 0,
        filter: "blur(10px)"
      },
      {
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.9,
        stagger: 0.1,
        ease: "power2.out",
        clearProps: "all",
        scrollTrigger: {
          trigger: ".pipeline-steps-grid",
          start: "top 86%"
        }
      }
    );
  }


  // ============================================================
  // NUVIO-STYLE INTERACTIVE GENERATIVE MOSAIC PIXEL CANVAS
  // (Reactive generative grid with ripple propagation on hover/click)
  // ============================================================
  function initFooterMosaicCanvas() {
    const footer = document.getElementById('siteFooter') || document.querySelector('.site-footer');
    const canvas = document.getElementById('footerMosaicCanvas');
    if (!footer || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let cells = [];
    let ripples = [];
    let animId = null;
    let isVisible = false;

    const mouse = {
      x: -9999,
      y: -9999,
      active: false,
      radius: 170
    };

    function lerp(a, b, t) {
      return a + (b - a) * t;
    }

    function drawRoundedRect(context, x, y, w, h, r, fillColor, strokeColor) {
      context.beginPath();
      if (context.roundRect) {
        context.roundRect(x, y, w, h, r);
      } else {
        context.moveTo(x + r, y);
        context.arcTo(x + w, y, x + w, y + h, r);
        context.arcTo(x + w, y + h, x, y + h, r);
        context.arcTo(x, y + h, x, y, r);
        context.arcTo(x, y + w, y, r);
        context.closePath();
      }
      context.fillStyle = fillColor;
      context.fill();
      if (strokeColor) {
        context.strokeStyle = strokeColor;
        context.lineWidth = 1;
        context.stroke();
      }
    }

    function buildGrid() {
      const rect = footer.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      if (width <= 0 || height <= 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      const tileSize = width < 640 ? 26 : 34;
      const gap = 2.5;
      const step = tileSize + gap;
      const radius = width < 640 ? 4 : 5.5;

      cols = Math.ceil(width / step) + 1;
      rows = Math.ceil(height / step) + 1;
      cells = [];

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * step;
          const y = r * step;
          const cx = x + tileSize / 2;
          const cy = y + tileSize / 2;
          const u = cx / width;
          const v = cy / height;

          cells.push({
            c,
            r,
            x,
            y,
            cx,
            cy,
            u,
            v,
            size: tileSize,
            radius,
            heat: 0,
            hueShift: 0
          });
        }
      }
    }

    footer.addEventListener('mousemove', (e) => {
      const rect = footer.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    }, { passive: true });

    footer.addEventListener('mouseleave', () => {
      mouse.active = false;
    }, { passive: true });

    footer.addEventListener('click', (e) => {
      const rect = footer.getBoundingClientRect();
      ripples.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        radius: 0,
        maxRadius: Math.max(width, height) * 1.2,
        speed: 18,
        strength: 1.0
      });
    });

    function render(now) {
      if (!isVisible) {
        animId = null;
        return;
      }

      const time = now * 0.0015;
      ctx.clearRect(0, 0, width, height);

      // Update ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rip = ripples[i];
        rip.radius += rip.speed;
        rip.strength *= 0.955;
        if (rip.strength < 0.02 || rip.radius > rip.maxRadius) {
          ripples.splice(i, 1);
        }
      }

      // Render mosaic cells in studio violet theme
      const cellCount = cells.length;
      for (let i = 0; i < cellCount; i++) {
        const cell = cells[i];

        // Mouse excitation
        if (mouse.active) {
          const dx = cell.cx - mouse.x;
          const dy = cell.cy - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = Math.pow(1 - dist / mouse.radius, 1.8);
            cell.heat = Math.min(1.0, cell.heat + force * 0.45);
          }
        }

        // Ripple wave excitation
        if (ripples.length > 0) {
          for (let j = 0; j < ripples.length; j++) {
            const rip = ripples[j];
            const rdx = cell.cx - rip.x;
            const rdy = cell.cy - rip.y;
            const rDist = Math.sqrt(rdx * rdx + rdy * rdy);
            const diff = Math.abs(rDist - rip.radius);
            if (diff < 75) {
              const rForce = Math.pow(1 - diff / 75, 2) * rip.strength;
              cell.heat = Math.min(1.0, cell.heat + rForce * 0.75);
            }
          }
        }

        // Idle harmonic ambient wave
        const ambientWave = Math.sin(cell.u * 7 + cell.v * 5 + time * 1.6) * 0.12;
        const combinedHeat = Math.min(1.0, cell.heat + Math.max(0, ambientWave));

        // Heat decay
        cell.heat *= 0.94;

        // Color computation: Light Theme luxury pastel lavender & radiant violet/pink shimmer
        const d1 = Math.hypot(cell.u - 0.5, (cell.v - 0.8) * 1.2);
        const d2 = Math.hypot(cell.u - 0.8, (cell.v - 0.3) * 1.2);
        const w1 = Math.max(0, 1 - d1 * 1.4);
        const w2 = Math.max(0, 1 - d2 * 1.3);

        const baseR = Math.round(242 - w1 * 18 - w2 * 12);
        const baseG = Math.round(238 - w1 * 14 - w2 * 8);
        const baseB = Math.round(252 - w1 * 4);
        const baseA = 0.74 + w1 * 0.22 + w2 * 0.18;

        let r, g, b, a;
        let strokeColor = null;

        if (combinedHeat > 0.01) {
          // Hover color animation: Soft, luminous pastel lilac & studio lavender violet
          // Keeps the exact signature violet shade while keeping luminance high for crystal-clear text readability
          const animR = Math.round(208 + Math.sin(time * 3 + cell.u * 5) * 14);
          const animG = Math.round(194 + Math.cos(time * 2.5 + cell.v * 5) * 12);
          const animB = 254;

          const heatBlend = Math.min(0.68, combinedHeat * 0.68);

          r = Math.round(lerp(baseR, animR, heatBlend));
          g = Math.round(lerp(baseG, animG, heatBlend));
          b = Math.round(lerp(baseB, animB, heatBlend));
          a = Math.min(0.95, baseA + combinedHeat * 0.15);

          const strokeAlpha = (0.18 + combinedHeat * 0.28).toFixed(3);
          strokeColor = `rgba(138, 102, 255, ${strokeAlpha})`;
        } else {
          r = Math.max(0, Math.min(255, baseR));
          g = Math.max(0, Math.min(255, baseG));
          b = Math.max(0, Math.min(255, baseB));
          a = Math.min(1.0, baseA);
          strokeColor = `rgba(215, 204, 245, ${(0.3 + w1 * 0.2).toFixed(3)})`;
        }

        const fillColor = `rgba(${r}, ${g}, ${b}, ${a.toFixed(3)})`;
        drawRoundedRect(ctx, cell.x, cell.y, cell.size, cell.size, cell.radius, fillColor, strokeColor);
      }

      animId = requestAnimationFrame(render);
    }

    // Intersection Observer to run canvas only when visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible = true;
          if (!animId) animId = requestAnimationFrame(render);
        } else {
          isVisible = false;
        }
      });
    }, { threshold: 0.05 });

    observer.observe(footer);
    buildGrid();

    window.addEventListener('resize', () => {
      buildGrid();
    }, { passive: true });
  }

  // Initialize interactive mosaic
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFooterMosaicCanvas);
  } else {
    initFooterMosaicCanvas();
  }
}