"use client";
import { useEffect, useRef, useState } from "react";

export default function VideoScrub() {
  const fwdRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 1023px)");
    setIsMobile(mobileQuery.matches);
    setMounted(true);

    let dimensionTimer = null;
    const onDimensionChange = (event) => {
      window.clearTimeout(dimensionTimer);
      dimensionTimer = window.setTimeout(() => {
        setIsMobile(event.matches);
      }, 120);
    };

    mobileQuery.addEventListener("change", onDimensionChange);
    return () => {
      window.clearTimeout(dimensionTimer);
      mobileQuery.removeEventListener("change", onDimensionChange);
    };
  }, []);

  useEffect(() => {
    if (!mounted || isMobile) return; // Skip if not mounted or on mobile

    const fwd = fwdRef.current;
    if (!fwd) return;

    let duration   = 0;
    let raf        = null;
    let lastFrame  = 0;

    let maxScroll = document.documentElement.scrollHeight - window.innerHeight;

    // video completes when contact section top reaches the viewport centre
    let videoEndScroll = maxScroll;
    const calcVideoEnd = () => {
      const contact = document.getElementById("contact-section");
      if (contact) {
        // End video at contact section midpoint — uses full Work→Contact gap for smooth playback
        videoEndScroll = Math.max(1, contact.offsetTop + contact.offsetHeight * 0.5 - window.innerHeight * 0.5);
      } else {
        videoEndScroll = document.documentElement.scrollHeight - window.innerHeight;
      }
      maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    };
    calcVideoEnd();
    // recalc after fonts/images load
    window.addEventListener("load", calcVideoEnd, { once: true });

    let resizeTimer = null;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(calcVideoEnd, 120);
    };
    window.addEventListener("resize", onResize, { passive: true });

    const show = () => {
      fwd.style.opacity = "1";
    };

    const seekVideo = (video, target) => {
      const clamped = Math.max(0, Math.min(duration, target));
      if (Math.abs(video.currentTime - clamped) < 0.018) return;
      if (video.readyState >= 1) {
        if (Math.abs(video.currentTime - clamped) > 0.18 && video.fastSeek) {
          video.fastSeek(clamped);
        } else {
          video.currentTime = clamped;
        }
      }
    };

    const frame = (now) => {
      raf = requestAnimationFrame(frame);
      if (now - lastFrame < 16) return;
      lastFrame = now;
      if (!duration) return;

      const scrollY = window.scrollY;
      const progress = videoEndScroll > 0 ? Math.min(1, scrollY / videoEndScroll) : 0;
      const tgt = progress * duration;

      if (!fwd.paused) fwd.pause();
      seekVideo(fwd, tgt);
      show();
    };

    const onFwdEnded = () => { fwd.pause(); fwd.currentTime = duration; };
    fwd.addEventListener("ended", onFwdEnded);

    const setup = () => {
      duration = fwd.duration;
      fwd.currentTime = 0;
      raf = requestAnimationFrame(frame);
    };

    if (fwd.readyState >= 1) setup();
    else fwd.addEventListener("loadedmetadata", setup, { once: true });

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      fwd.removeEventListener("ended", onFwdEnded);
    };
  }, [isMobile, mounted]);

  const SECTION_IMAGES = [
    { id: null,              src: '/photo/hero.webp'    }, // default / hero
    { id: 'about-section',  src: '/photo/about.webp'   },
    { id: 'work-section',   src: '/photo/project.webp' },
    { id: 'contact-section', src: '/photo/contact.webp' },
  ];

  // Mobile scroll-driven state — updated directly via RAF, no React re-renders
  const mobileLayersRef = useRef([]); // refs to the bg divs, updated imperatively

  useEffect(() => {
    if (!isMobile) return;

    const TRANSITION_ZONE = 0.35; // fraction of section height used for transition
    let sectionTops = [];
    let sectionHeights = [];
    let cacheFrame = null;

    const cacheSectionGeometry = () => {
      if (cacheFrame) cancelAnimationFrame(cacheFrame);
      cacheFrame = requestAnimationFrame(() => {
        sectionTops = SECTION_IMAGES.map((sec) =>
          sec.id ? document.getElementById(sec.id)?.offsetTop ?? 0 : 0
        );
        sectionHeights = SECTION_IMAGES.map((sec) =>
          sec.id ? document.getElementById(sec.id)?.offsetHeight ?? 0 : window.innerHeight
        );
      });
    };
    cacheSectionGeometry();
    window.addEventListener("resize", cacheSectionGeometry, { passive: true });
    window.addEventListener("load", cacheSectionGeometry, { once: true }); // fraction of section height used for transition

    const getIndex = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      for (let i = SECTION_IMAGES.length - 1; i >= 1; i--) {
        if (scrollY + vh * 0.5 >= sectionTops[i]) return i;
      }
      return 0;
    };

    const getProgress = (idx) => {
      const nextIdx = idx + 1;
      if (nextIdx >= SECTION_IMAGES.length) return 0;
      const nextTop = sectionTops[nextIdx];
      const vh = window.innerHeight;
      const zone = vh * TRANSITION_ZONE;
      const rel = (window.scrollY + vh * 0.5) - (nextTop - zone);
      return Math.max(0, Math.min(1, rel / zone));
    };

    let rafId = null;
    let lastIdx = 0;
    let lastProg = 0;
    let smoothProg = 0;
    let smoothIdx = 0;
    let hasSmoothState = false;
    let lastFrame = 0;

    const frame = () => {
      rafId = requestAnimationFrame(frame);
      if (!sectionTops.length) return;
      const now = performance.now();
      if (now - lastFrame < 16) return;
      lastFrame = now;
      const idx  = getIndex();
      const prog = getProgress(idx); // 0→1 as next section approaches

      if (!hasSmoothState) {
        smoothIdx = idx;
        smoothProg = prog;
        hasSmoothState = true;
      } else {
        // Map the background directly to the smoothed Lenis scroll position.
        smoothProg = prog;
        smoothIdx = idx;
      }
      const smoothedIdx = smoothIdx;
      const smoothedProg = smoothProg;

      if (smoothedIdx === lastIdx && Math.abs(smoothedProg - lastProg) < 0.001) return;
      lastIdx  = idx;
      lastProg = smoothedProg;

      const layers = mobileLayersRef.current;
      if (!layers.length) return;

      // Current section image: sits at 0, slides up as next section comes in
      const curLayer = layers[smoothedIdx];
      const nxtLayer = layers[smoothedIdx + 1];

      // Lazy-load bg image when layer is about to become visible
      const lazyLoad = (l) => {
        if (l && !l.style.backgroundImage && l.dataset.bg) {
          l.style.backgroundImage = `url(${l.dataset.bg})`;
        }
      };
      if (curLayer) lazyLoad(curLayer);
      if (nxtLayer) lazyLoad(nxtLayer);

      // Reset all layers
      layers.forEach((l, i) => {
        if (!l) return;
        if (i === smoothedIdx) {
          l.style.transform = `translateY(${-(smoothedProg * 8)}%)`;
          l.style.opacity   = `${1 - smoothedProg * 0.6}`;
          l.style.zIndex    = '1';
        } else if (i === smoothedIdx + 1 && nxtLayer) {
          l.style.transform = `translateY(${(1 - smoothedProg) * 100}%)`;
          l.style.opacity   = `${0.4 + smoothedProg * 0.6}`;
          l.style.zIndex    = '2';
        } else if (i < smoothedIdx) {
          l.style.transform = 'translateY(-8%)';
          l.style.opacity   = '0';
          l.style.zIndex    = '0';
        } else {
          l.style.transform = 'translateY(100%)';
          l.style.opacity   = '0';
          l.style.zIndex    = '0';
        }
      });
    };

    rafId = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(rafId);
      cancelAnimationFrame(cacheFrame);
      window.removeEventListener("resize", cacheSectionGeometry);
      window.removeEventListener("load", cacheSectionGeometry);
    };
  }, [isMobile, mounted]);

  // Never render on server — eliminates SSR/client hydration mismatch
  if (!mounted) {
    // Return a static placeholder that matches the hero image for immediate LCP
    return (
      <div className="fixed inset-0 z-0 bg-[#0a0a0a]">
        <div 
          className="absolute inset-0 w-full h-full opacity-60"
          style={{
            backgroundImage: "url('/photo/hero.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center top",
          }}
        />
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/15 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25" />
      </div>
    );
  }

  const cls = "absolute inset-0 w-full h-full object-cover";
  const sty = { willChange: "transform", transform: "translateZ(0)" };

  // Phone: scroll-driven parallax swipe — image moves WITH finger in real time
  if (isMobile) {
    return (
      <div className="fixed inset-0 z-0 overflow-hidden bg-[#0a0a0a]">
        {SECTION_IMAGES.map((sec, i) => (
          <div
            key={sec.src}
            ref={el => {
              mobileLayersRef.current[i] = el;
              // Only eagerly load hero; others get src set lazily on first show
              if (el && i === 0) el.style.backgroundImage = `url(${sec.src})`;
            }}
            className="absolute inset-0 w-full h-full"
            data-bg={sec.src}
            style={{
              backgroundSize: 'cover',
              backgroundPosition: 'center top',
              transform: i === 0 ? 'translateY(0%)' : 'translateY(100%)',
              opacity: i === 0 ? 1 : 0,
              willChange: 'transform, opacity',
            }}
          />
        ))}
        <div className="absolute inset-0 bg-black/45 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/10 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/25 z-10" />
      </div>
    );
  }

  // Desktop: Full scroll-scrubbing video experience
  return (
    <div className="fixed inset-0 z-0 bg-[#0a0a0a]">
      <video ref={fwdRef} src="/videos/optimized.mp4" poster="/photo/hero.webp"
        className={cls} style={{ ...sty, opacity: 1 }}
        muted playsInline preload="metadata"
        aria-hidden="true" suppressHydrationWarning />
      <div className="absolute inset-0 bg-black/35" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/15 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25" />
    </div>
  );
}
