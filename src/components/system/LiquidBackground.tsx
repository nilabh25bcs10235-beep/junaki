"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Pink-red liquid atmosphere with cursor-reactive blob.
 * Disabled chase on touch / reduced-motion for performance & a11y.
 */
export function LiquidBackground() {
  const reduce = useReducedMotion();
  const [pos, setPos] = useState({ x: 50, y: 40 });
  const target = useRef({ x: 50, y: 40 });
  const raf = useRef<number | null>(null);
  const [pointerFine, setPointerFine] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    setPointerFine(mq.matches);
    const onChange = () => setPointerFine(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduce || !pointerFine) return;

    const onMove = (e: PointerEvent) => {
      target.current = {
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      };
    };

    const tick = () => {
      setPos((p) => ({
        x: p.x + (target.current.x - p.x) * 0.08,
        y: p.y + (target.current.y - p.y) * 0.08,
      }));
      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [reduce, pointerFine]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Base wine gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 0%, #7f1d3a 0%, #4c0519 42%, #1a050c 100%)",
        }}
      />

      {/* Soft ambient orbs */}
      <div
        className="junaki-liquid-orb absolute -left-[10%] top-[-5%] h-[55vmax] w-[55vmax] rounded-full opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(244,63,94,0.55) 0%, rgba(190,18,60,0.2) 45%, transparent 70%)",
        }}
      />
      <div
        className="junaki-liquid-orb absolute -right-[15%] bottom-[-10%] h-[50vmax] w-[50vmax] rounded-full opacity-60 blur-3xl"
        style={{
          animationDelay: "-4s",
          background:
            "radial-gradient(circle, rgba(251,113,133,0.4) 0%, rgba(136,19,55,0.25) 50%, transparent 72%)",
        }}
      />
      <div
        className="junaki-liquid-orb absolute left-[30%] bottom-[10%] h-[30vmax] w-[30vmax] rounded-full opacity-40 blur-3xl"
        style={{
          animationDelay: "-8s",
          background:
            "radial-gradient(circle, rgba(255,228,230,0.2) 0%, transparent 65%)",
        }}
      />

      {/* Cursor-reactive liquid */}
      <motion.div
        className="absolute h-[42vmax] w-[42vmax] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-80 blur-3xl mix-blend-screen"
        style={{
          left: `${pos.x}%`,
          top: `${pos.y}%`,
          background:
            "radial-gradient(circle, rgba(255,150,170,0.55) 0%, rgba(244,63,94,0.35) 35%, transparent 68%)",
        }}
        transition={{ type: "spring", stiffness: 40, damping: 20 }}
      />

      <div className="junaki-noise absolute inset-0" />

      {/* Vignette for depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(10,2,6,0.55) 100%)",
        }}
      />
    </div>
  );
}
