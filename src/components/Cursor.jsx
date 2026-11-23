"use client";
import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const cursorRef = useRef(null);
  // null = unknown (SSR), true = touch device, false = mouse device
  const [isTouch, setIsTouch] = useState(null);

  useEffect(() => {
    // pointer: coarse → touchscreen; pointer: fine → mouse/trackpad
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    setIsTouch(coarse);
  }, []);

  useEffect(() => {
    if (isTouch !== false) return;  // skip touch/tablet OR still unknown
    const el = cursorRef.current;
    if (!el) return;

    let mx = -200, my = -200;
    let cx = -200, cy = -200;
    let scale = 1;
    let targetScale = 1;
    let raf = null;
    let lastMove = 0;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      lastMove = performance.now();
    };
    const startFrame = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };
    const onEnter = () => { targetScale = 2.6; startFrame(); };
    const onLeave = () => { targetScale = 1; startFrame(); };

    document.querySelectorAll("a, button").forEach((node) => {
      node.addEventListener("mouseenter", onEnter);
      node.addEventListener("mouseleave", onLeave);
    });

    const observer = new MutationObserver(() => {
      document.querySelectorAll("a:not([data-cur]), button:not([data-cur])").forEach((node) => {
        node.setAttribute("data-cur", "1");
        node.addEventListener("mouseenter", onEnter);
        node.addEventListener("mouseleave", onLeave);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    const frame = () => {
      cx += (mx - cx) * 0.18;
      cy += (my - cy) * 0.18;
      scale += (targetScale - scale) * 0.16;
      el.style.transform =
        `translate(${cx}px,${cy}px) translate(-50%,-50%) scale(${scale})`;
      el.style.opacity = performance.now() - lastMove < 900 ? "1" : "0";
      const active =
        Math.abs(mx - cx) > 0.1 ||
        Math.abs(my - cy) > 0.1 ||
        Math.abs(targetScale - scale) > 0.001;
      if (active) raf = requestAnimationFrame(frame);
      else raf = null;
    };
    const onMoveStart = (e) => {
      onMove(e);
      startFrame();
    };
    window.addEventListener("mousemove", onMoveStart, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("mousemove", onMoveStart);
    };
  }, [isTouch]);

  // Render nothing until we know the device type, and nothing on touch devices
  if (isTouch !== false) return null;

  return (
    <div
      ref={cursorRef}
      style={{
        position:      "fixed",
        top:           0,
        left:          0,
        width:         38,
        height:        38,
        borderRadius:  "50%",
        background:    "#fff",
        mixBlendMode:  "difference",
        pointerEvents: "none",
        zIndex:        99999,
        willChange:    "transform",
      }}
    />
  );
}
