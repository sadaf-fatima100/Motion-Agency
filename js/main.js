/**
 * Motion Agency — Interactive Control Script
 * Handles:
 * 1. Global Video Reel Modal (YouTube dynamic embed & controls)
 * 2. Inline Pricing Card Video Players (smooth in-card YouTube autoplay)
 * 3. Hero Inline Video Player
 * 4. Work Portfolio Filter Tabs
 * 5. Work Portfolio Drag-to-Scroll Horizontal Carousel & Progress Sync
 */

const DEFAULT_REEL_ID = "T_qT_NWyPEU";
const reelModal = document.getElementById("reelModal");
const reelFrame = document.getElementById("reelFrame");
const reelModalTitle = document.getElementById("reelModalTitle");
const reelModalCat = document.getElementById("reelModalCat");

function extractYouTubeId(urlOrId) {
  if (!urlOrId) return DEFAULT_REEL_ID;
  const str = String(urlOrId).trim();
  if (str.includes("watch?v=")) return str.split("watch?v=")[1].split("&")[0];
  if (str.includes("youtu.be/")) return str.split("youtu.be/")[1].split("?")[0];
  if (str.includes("embed/")) return str.split("embed/")[1].split("?")[0];
  return str;
}

function openReel(targetVideo, title, category) {
  const modal = document.getElementById("reelModal");
  const frame = document.getElementById("reelFrame");
  if (!modal || !frame) return;
  const vidId = extractYouTubeId(targetVideo || DEFAULT_REEL_ID);
  frame.src = "https://www.youtube.com/embed/" + vidId + "?autoplay=1&rel=0";
  const titleEl = document.getElementById("reelModalTitle");
  const catEl = document.getElementById("reelModalCat");
  if (titleEl) titleEl.textContent = title || "Motion & Film Showcase";
  if (catEl) catEl.textContent = category || "Featured Video";
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeReel() {
  const modal = document.getElementById("reelModal");
  const frame = document.getElementById("reelFrame");
  if (!modal) return;
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  if (frame) frame.src = "";
  document.body.style.overflow = "";
}

// In-Card Video Playback for Pricing Cards with Close Button
function playPricingVideo(container, embedUrl) {
  if (!container || container.classList.contains("is-playing")) return;
  if (!container._originalHTML) {
    container._originalHTML = container.innerHTML;
  }
  container.classList.add("is-playing");
  container.innerHTML = '<button type="button" class="inline-video-close-btn" onclick="event.stopPropagation(); closePricingVideo(this.parentElement)" aria-label="Close video" title="Close Video"><svg viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg></button><iframe src="' + embedUrl + '" title="Pricing Video Player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen style="position:absolute;inset:0;width:100%;height:100%;border:none;display:block;"></iframe>';
}

function closePricingVideo(container) {
  if (!container) return;
  container.classList.remove("is-playing");
  if (container._originalHTML) {
    container.innerHTML = container._originalHTML;
  }
}

// Hero Inline Video Play & Close
function playHeroInlineVideo(e) {
  if (e) e.stopPropagation();
  const slot = document.getElementById("heroIframeSlot");
  const playOverlay = document.getElementById("heroPlayOverlay");
  const videoOverlay = document.getElementById("heroVideoOverlay");
  const videoImg = document.getElementById("heroVideoImg");
  if (slot) {
    slot.innerHTML = '<button type="button" class="inline-video-close-btn" onclick="closeHeroInlineVideo(event)" aria-label="Close video" title="Close Video"><svg viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg></button><iframe src="https://www.youtube.com/embed/T_qT_NWyPEU?autoplay=1&rel=0&modestbranding=1" title="Commercial Showreel" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen style="width:100%;height:100%;border:none;border-radius:28px;"></iframe>';
    slot.style.display = "block";
    if (playOverlay) playOverlay.style.display = "none";
    if (videoOverlay) videoOverlay.style.display = "none";
    if (videoImg) videoImg.style.display = "none";
  }
}

function closeHeroInlineVideo(e) {
  if (e) e.stopPropagation();
  const slot = document.getElementById("heroIframeSlot");
  const playOverlay = document.getElementById("heroPlayOverlay");
  const videoOverlay = document.getElementById("heroVideoOverlay");
  const videoImg = document.getElementById("heroVideoImg");
  if (slot) {
    slot.innerHTML = "";
    slot.style.display = "none";
  }
  if (playOverlay) playOverlay.style.display = "";
  if (videoOverlay) videoOverlay.style.display = "";
  if (videoImg) videoImg.style.display = "";
}

// About Inline Video Play & Close
function aboutPlayVideo() {
  const thumb = document.getElementById("aboutVideoThumb");
  const slot  = document.getElementById("aboutIframeSlot");
  if (!slot) return;
  slot.innerHTML = '<button type="button" class="inline-video-close-btn" onclick="closeAboutInlineVideo(event)" aria-label="Close video" title="Close Video"><svg viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg></button><iframe src="https://www.youtube.com/embed/T_qT_NWyPEU?autoplay=1&rel=0&modestbranding=1" title="Studio Showreel" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen style="width:100%;height:100%;border:none;border-radius:20px;"></iframe>';
  slot.style.display = "block";
  if (thumb) thumb.style.display = "none";
}

function closeAboutInlineVideo(e) {
  if (e) e.stopPropagation();
  const thumb = document.getElementById("aboutVideoThumb");
  const slot  = document.getElementById("aboutIframeSlot");
  if (slot) {
    slot.innerHTML = "";
    slot.style.display = "none";
  }
  if (thumb) thumb.style.display = "";
}

// Manifesto Inline Video Play & Close (About page)
function playManifestoVideo(e) {
  if (e) e.stopPropagation();
  const slot = document.getElementById("manifestoIframeSlot");
  const playOverlay = document.getElementById("manifestoPlayOverlay");
  const videoOverlay = document.getElementById("manifestoVideoOverlay");
  const videoImg = document.getElementById("manifestoVideoImg");
  if (slot) {
    slot.innerHTML = '<button type="button" class="inline-video-close-btn" onclick="closeManifestoVideo(event)" aria-label="Close video" title="Close Video"><svg viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg></button><iframe src="https://www.youtube.com/embed/ez8UKLwe2qw?autoplay=1&rel=0&modestbranding=1" title="3D CGI & VFX Showcase" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen style="width:100%;height:100%;border:none;border-radius:28px;"></iframe>';
    slot.style.display = "block";
    if (playOverlay) playOverlay.style.display = "none";
    if (videoOverlay) videoOverlay.style.display = "none";
    if (videoImg) videoImg.style.display = "none";
  }
}

function closeManifestoVideo(e) {
  if (e) e.stopPropagation();
  const slot = document.getElementById("manifestoIframeSlot");
  const playOverlay = document.getElementById("manifestoPlayOverlay");
  const videoOverlay = document.getElementById("manifestoVideoOverlay");
  const videoImg = document.getElementById("manifestoVideoImg");
  if (slot) {
    slot.innerHTML = "";
    slot.style.display = "none";
  }
  if (playOverlay) playOverlay.style.display = "";
  if (videoOverlay) videoOverlay.style.display = "";
  if (videoImg) videoImg.style.display = "";
}

// Global Export
window.openReel = openReel;
window.closeReel = closeReel;
window.playPricingVideo = playPricingVideo;
window.closePricingVideo = closePricingVideo;
window.playHeroInlineVideo = playHeroInlineVideo;
window.closeHeroInlineVideo = closeHeroInlineVideo;
window.aboutPlayVideo = aboutPlayVideo;
window.closeAboutInlineVideo = closeAboutInlineVideo;
window.playManifestoVideo = playManifestoVideo;
window.closeManifestoVideo = closeManifestoVideo;

// Event Listeners for Closing
document.addEventListener("click", e => {
  if (e.target.closest(".reel-close") || e.target.closest(".reel-close-floating") || e.target.closest(".reel-backdrop-close")) {
    e.preventDefault();
    closeReel();
  }
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    closeReel();
    closeHeroInlineVideo();
    closeAboutInlineVideo();
  }
});

// Work Filter Tabs & Horizontal Carousel Functionality
document.addEventListener("DOMContentLoaded", () => {
  const filterTabs = document.querySelectorAll(".filter-tab");
  const workCards = document.querySelectorAll(".work-card[data-category]");
  const workGrid = document.querySelector(".work-grid");
  const workPrevBtn = document.getElementById("workPrevBtn");
  const workNextBtn = document.getElementById("workNextBtn");
  const workProgPills = document.querySelectorAll("#workProgList .prog-pill");

  // Filter Tabs
  filterTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      filterTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const filter = tab.getAttribute("data-filter");
      workCards.forEach(card => {
        const cat = card.getAttribute("data-category");
        if (filter === "all" || cat === filter) {
          card.classList.remove("is-hidden");
          if (typeof gsap !== "undefined") {
            gsap.fromTo(card, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" });
          }
        } else {
          card.classList.add("is-hidden");
        }
      });
      if (workGrid) {
        workGrid.scrollTo({ left: 0, behavior: "smooth" });
      }
    });
  });



  // Floating Sticky/Fixed Header Scroll State
  const siteHeader = document.querySelector(".site-header");
  if (siteHeader) {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        siteHeader.classList.add("scrolled");
      } else {
        siteHeader.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
  }

  // ============================================================
  // TESTIMONIALS MULTI-CARD CAROUSEL SLIDER
  // ============================================================
  let currentTestiSlide = 0;
  let testiAutoTimer = null;
  const track = document.getElementById("testiSliderTrack");
  const viewport = document.getElementById("testiViewport");

  function getCardsPerView() {
    if (window.innerWidth <= 680) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
  }

  function updateTestimonialSlider() {
    if (!track) return;
    const cards = track.querySelectorAll(".testi-card-box");
    if (!cards.length) return;
    const perView = getCardsPerView();
    const maxSlide = Math.max(0, cards.length - perView);

    if (currentTestiSlide > maxSlide) currentTestiSlide = 0;
    if (currentTestiSlide < 0) currentTestiSlide = maxSlide;

    const cardWidth = cards[0].getBoundingClientRect().width;
    const gap = 24;
    const shift = currentTestiSlide * (cardWidth + gap);

    track.style.transform = "translateX(-" + shift + "px)";

    cards.forEach((c, idx) => {
      const highlightIdx = perView === 3 ? currentTestiSlide + 1 : currentTestiSlide;
      if (idx === highlightIdx) {
        c.classList.add("featured");
      } else {
        c.classList.remove("featured");
      }
    });
  }

  function nextTestimonial() {
    if (!track) return;
    const cards = track.querySelectorAll(".testi-card-box");
    const perView = getCardsPerView();
    const maxSlide = Math.max(0, cards.length - perView);
    if (currentTestiSlide >= maxSlide) {
      currentTestiSlide = 0;
    } else {
      currentTestiSlide++;
    }
    updateTestimonialSlider();
    resetTestiTimer();
  }

  function prevTestimonial() {
    if (!track) return;
    const cards = track.querySelectorAll(".testi-card-box");
    const perView = getCardsPerView();
    const maxSlide = Math.max(0, cards.length - perView);
    if (currentTestiSlide <= 0) {
      currentTestiSlide = maxSlide;
    } else {
      currentTestiSlide--;
    }
    updateTestimonialSlider();
    resetTestiTimer();
  }

  function startTestiTimer() {
    clearInterval(testiAutoTimer);
    testiAutoTimer = setInterval(() => {
      nextTestimonial();
    }, 6000);
  }

  function resetTestiTimer() {
    clearInterval(testiAutoTimer);
    startTestiTimer();
  }

  window.nextTestimonial = nextTestimonial;
  window.prevTestimonial = prevTestimonial;

  if (viewport) {
    let touchStartX = 0;
    let touchEndX = 0;

    viewport.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    viewport.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 50) {
        nextTestimonial();
      } else if (touchEndX - touchStartX > 50) {
        prevTestimonial();
      }
    }, { passive: true });

    viewport.addEventListener("mouseenter", () => clearInterval(testiAutoTimer));
    viewport.addEventListener("mouseleave", () => startTestiTimer());

    window.addEventListener("resize", () => {
      updateTestimonialSlider();
    });

    // Initial render
    setTimeout(updateTestimonialSlider, 100);
    startTestiTimer();
  }
});
