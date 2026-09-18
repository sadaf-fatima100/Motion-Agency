gsap.registerPlugin(ScrollTrigger);
const rm=window.matchMedia("(prefers-reduced-motion:reduce)").matches;
if(!rm){
  const tl=gsap.timeline({defaults:{ease:"power3.out"}});
  tl.from(".hero-eyebrow",{opacity:0,y:16,duration:.7})
    .from(".hero-title",{opacity:0,y:28,duration:.85},"-=.5")
    .from(".hero-sub",{opacity:0,y:20,duration:.7},"-=.5")
    .from(".hero-actions > *",{opacity:0,y:16,stagger:.1,duration:.6},"-=.45")
    .from(".trust-row",{opacity:0,y:12,duration:.5},"-=.3")
    .from(".hero-panel",{opacity:0,duration:.9},"-=1")
    .from(".float-card",{opacity:0,x:18,duration:.6},"-=.45")
    .from(".float-pill",{opacity:0,y:18,duration:.6},"-=.45")
    .from(".stats-bar",{opacity:0,y:24,duration:.7},"-=.3");
  const hp=document.getElementById("heroPanel");
  const pels=gsap.utils.toArray("[data-depth]");
  if(hp&&window.matchMedia("(hover:hover)").matches){
    hp.addEventListener("mousemove",e=>{
      const r=hp.getBoundingClientRect();
      const px=(e.clientX-r.left)/r.width-.5,py=(e.clientY-r.top)/r.height-.5;
      pels.forEach(el=>{const d=parseFloat(el.dataset.depth)||10;gsap.to(el,{x:px*d,y:py*d,duration:.85,ease:"power2.out",overwrite:"auto"});});
    });
    hp.addEventListener("mouseleave",()=>{pels.forEach(el=>gsap.to(el,{x:0,y:0,duration:1.1,ease:"power3.out",overwrite:"auto"}));});
  }
  gsap.utils.toArray(".work-card").forEach((c,i)=>{gsap.from(c,{opacity:0,y:36,duration:.7,ease:"power2.out",scrollTrigger:{trigger:c,start:"top 88%"},delay:i*.06});});
  gsap.utils.toArray(".why-card").forEach((c,i)=>{gsap.from(c,{opacity:0,y:32,duration:.7,ease:"power2.out",scrollTrigger:{trigger:c,start:"top 88%"},delay:(i % 3) * .07});});
  gsap.from(".why-pill",{opacity:0,scale:.8,duration:.6,stagger:.12,ease:"back.out(1.7)",scrollTrigger:{trigger:".why-us-header",start:"top 88%"}});
  gsap.utils.toArray(".service-card").forEach((c,i)=>{gsap.from(c,{opacity:0,y:26,duration:.65,ease:"power2.out",scrollTrigger:{trigger:c,start:"top 90%"},delay:i*.06});});
  gsap.utils.toArray(".section-head").forEach((sh)=>{gsap.from(sh,{opacity:0,y:20,duration:.6,ease:"power2.out",scrollTrigger:{trigger:sh,start:"top 90%"}});});
  gsap.from(".manifesto-section",{opacity:0,y:28,duration:.8,ease:"power2.out",scrollTrigger:{trigger:".manifesto-section",start:"top 90%"}});
  gsap.from(".about-agency-left",{opacity:0,y:30,duration:.8,ease:"power2.out",scrollTrigger:{trigger:".about-agency-left",start:"top 88%"}});
  gsap.utils.toArray(".about-slide-card").forEach((c,i)=>{gsap.from(c,{opacity:0,x:75,duration:.8,ease:"power2.out",scrollTrigger:{trigger:c,start:"top 90%"},delay:i*.12});});
  gsap.from(".cta-band",{opacity:0,y:30,duration:.75,ease:"power2.out",scrollTrigger:{trigger:".cta-band",start:"top 92%"}});

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
      radius: 200
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
          // Hover color animation: Radiant shimmering electric violet (#7c12ff) & rose pink (#ff8fce)
          const animR = Math.round(124 + Math.sin(time * 3 + cell.u * 5) * 45);
          const animG = Math.round(75 + Math.cos(time * 2.5 + cell.v * 5) * 35);
          const animB = 255;

          r = Math.round(lerp(baseR, animR, combinedHeat));
          g = Math.round(lerp(baseG, animG, combinedHeat));
          b = Math.round(lerp(baseB, animB, combinedHeat));
          a = Math.min(1.0, baseA + combinedHeat * 0.22);

          const strokeAlpha = (0.2 + combinedHeat * 0.7).toFixed(3);
          strokeColor = `rgba(124, 92, 255, ${strokeAlpha})`;
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