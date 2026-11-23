"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Cursor     from "./Cursor";
import Navbar     from "./Navbar";

gsap.registerPlugin(ScrollTrigger);

export default function PageShell({ children }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const isTouch = window.matchMedia("(pointer: coarse)").matches;

    const lenis = new Lenis({
      lerp: isTouch ? 0.105 : 0.16,
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: isTouch ? 0.9 : 1,
      syncTouch: isTouch,
      syncTouchLerp: 0.105,
      touchInertiaExponent: 1.35,
      autoRaf: false,
    });
    let frame = null;
    lenis.on("scroll", () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = null;
        ScrollTrigger.update();
      });
    });
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    return () => {
      lenis.destroy();
      gsap.ticker.remove(tick);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <main>
      <div className="grain-overlay" />
      <Cursor />
      <Navbar />
      <div className="relative z-10">{children}</div>
    </main>
  );
}
