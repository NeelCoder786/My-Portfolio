"use client";
import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import dynamic from "next/dynamic";
import Cursor from "../components/Cursor";
import Navbar from "../components/Navbar";
const VideoScrub = dynamic(() => import("../components/VideoScrub"), { ssr: false });
import Hero from "../components/Hero";
import About from "../components/About";
import Work from "../components/Work";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import SeoContent from "../components/SeoContent";

export default function Home() {
  const blurWrapRef = useRef(null);
  const footerRef   = useRef(null);

  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(pointer: coarse)").matches
    ) return;

    const lenis = new Lenis({
      lerp: 0.16,
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1,
      syncTouch: false,
      autoRaf: false,
    });

    let blurFrame = null;
    lenis.on("scroll", () => {
      if (blurFrame) return;
      blurFrame = requestAnimationFrame(() => {
        blurFrame = null;
        ScrollTrigger.update();
        if (blurWrapRef.current && footerRef.current) {
          const footerTop = footerRef.current.getBoundingClientRect().top;
          const vh = window.innerHeight;
          const opacity = footerTop >= vh ? 1 : Math.max(0, footerTop / vh);
          blurWrapRef.current.style.opacity = opacity;
        }
      });
    });

    const tick = (time) => { lenis.raf(time * 1000); };
    gsap.ticker.add(tick);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tick);
      if (blurFrame) cancelAnimationFrame(blurFrame);
    };
  }, []);

  return (
    <main>
      {/* SEO-crawlable structured content (visually hidden) - Forced HMR refresh */}
      <SeoContent />

      {/* grain */}
      <div className="grain-overlay" />

      {/* difference cursor */}
      <Cursor />

      {/* sticky scrubbed video — lives behind everything */}
      <VideoScrub />

      {/* scroll progress indicator */}

      {/* fixed nav */}
      <Navbar />

      {/* bottom blur — fixed to viewport, fades when footer arrives */}
      <div ref={blurWrapRef} className="bottom-blur" />

      {/* scrollable sections */}
      <div className="relative z-10">
        <Hero />
        <About />
        <Work />
        <Contact />
        <div ref={footerRef}><Footer /></div>
      </div>
    </main>
  );
}
