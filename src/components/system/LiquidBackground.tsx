"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";

/** Slow ambient palettes — no developer controls, pure client atmosphere */
const PALETTES = [
  {
    name: "rose-wine",
    base: "radial-gradient(120% 90% at 50% 0%, #7f1d3a 0%, #4c0519 42%, #1a050c 100%)",
    orbA: "radial-gradient(circle, rgba(244,63,94,0.55) 0%, rgba(190,18,60,0.2) 45%, transparent 70%)",
    orbB: "radial-gradient(circle, rgba(251,113,133,0.4) 0%, rgba(136,19,55,0.25) 50%, transparent 72%)",
    orbC: "radial-gradient(circle, rgba(255,228,230,0.22) 0%, transparent 65%)",
    cursor:
      "radial-gradient(circle, rgba(255,150,170,0.55) 0%, rgba(244,63,94,0.35) 35%, transparent 68%)",
    vignette: "rgba(10,2,6,0.55)",
  },
  {
    name: "maroon",
    base: "radial-gradient(120% 90% at 50% 0%, #7f1d1d 0%, #450a0a 45%, #1c0606 100%)",
    orbA: "radial-gradient(circle, rgba(185,28,28,0.55) 0%, rgba(127,29,29,0.25) 45%, transparent 70%)",
    orbB: "radial-gradient(circle, rgba(252,165,165,0.35) 0%, rgba(69,10,10,0.3) 50%, transparent 72%)",
    orbC: "radial-gradient(circle, rgba(254,226,226,0.18) 0%, transparent 65%)",
    cursor:
      "radial-gradient(circle, rgba(252,165,165,0.5) 0%, rgba(185,28,28,0.35) 35%, transparent 68%)",
    vignette: "rgba(12,3,3,0.55)",
  },
  {
    name: "blush-pink",
    base: "radial-gradient(120% 90% at 50% 0%, #9d174d 0%, #500724 42%, #1a0510 100%)",
    orbA: "radial-gradient(circle, rgba(244,114,182,0.5) 0%, rgba(190,24,93,0.25) 45%, transparent 70%)",
    orbB: "radial-gradient(circle, rgba(251,207,232,0.35) 0%, rgba(131,24,67,0.25) 50%, transparent 72%)",
    orbC: "radial-gradient(circle, rgba(253,242,248,0.2) 0%, transparent 65%)",
    cursor:
      "radial-gradient(circle, rgba(251,182,206,0.55) 0%, rgba(236,72,153,0.35) 35%, transparent 68%)",
    vignette: "rgba(12,2,8,0.55)",
  },
  {
    name: "ocean-blue",
    base: "radial-gradient(120% 90% at 50% 0%, #0e7490 0%, #0c4a6e 42%, #020617 100%)",
    orbA: "radial-gradient(circle, rgba(56,189,248,0.45) 0%, rgba(14,116,144,0.25) 45%, transparent 70%)",
    orbB: "radial-gradient(circle, rgba(34,211,238,0.35) 0%, rgba(30,58,138,0.3) 50%, transparent 72%)",
    orbC: "radial-gradient(circle, rgba(224,242,254,0.18) 0%, transparent 65%)",
    cursor:
      "radial-gradient(circle, rgba(125,211,252,0.5) 0%, rgba(14,165,233,0.35) 35%, transparent 68%)",
    vignette: "rgba(2,6,16,0.55)",
  },
  {
    name: "grass-green",
    base: "radial-gradient(120% 90% at 50% 0%, #15803d 0%, #14532d 42%, #052e16 100%)",
    orbA: "radial-gradient(circle, rgba(74,222,128,0.45) 0%, rgba(21,128,61,0.25) 45%, transparent 70%)",
    orbB: "radial-gradient(circle, rgba(163,230,53,0.3) 0%, rgba(20,83,45,0.3) 50%, transparent 72%)",
    orbC: "radial-gradient(circle, rgba(220,252,231,0.18) 0%, transparent 65%)",
    cursor:
      "radial-gradient(circle, rgba(134,239,172,0.5) 0%, rgba(34,197,94,0.35) 35%, transparent 68%)",
    vignette: "rgba(2,12,6,0.55)",
  },
  {
    name: "violet-dusk",
    base: "radial-gradient(120% 90% at 50% 0%, #6d28d9 0%, #4c1d95 42%, #0f0618 100%)",
    orbA: "radial-gradient(circle, rgba(167,139,250,0.45) 0%, rgba(109,40,217,0.25) 45%, transparent 70%)",
    orbB: "radial-gradient(circle, rgba(232,121,249,0.3) 0%, rgba(76,29,149,0.3) 50%, transparent 72%)",
    orbC: "radial-gradient(circle, rgba(237,233,254,0.16) 0%, transparent 65%)",
    cursor:
      "radial-gradient(circle, rgba(196,181,253,0.5) 0%, rgba(139,92,246,0.35) 35%, transparent 68%)",
    vignette: "rgba(8,2,16,0.55)",
  },
  {
    name: "sunset-amber",
    base: "radial-gradient(120% 90% at 50% 0%, #c2410c 0%, #7c2d12 42%, #1c0a04 100%)",
    orbA: "radial-gradient(circle, rgba(251,146,60,0.5) 0%, rgba(194,65,12,0.25) 45%, transparent 70%)",
    orbB: "radial-gradient(circle, rgba(253,186,116,0.35) 0%, rgba(154,52,18,0.28) 50%, transparent 72%)",
    orbC: "radial-gradient(circle, rgba(255,247,237,0.16) 0%, transparent 65%)",
    cursor:
      "radial-gradient(circle, rgba(253,186,116,0.5) 0%, rgba(249,115,22,0.35) 35%, transparent 68%)",
    vignette: "rgba(12,4,2,0.55)",
  },
] as const;

const CYCLE_MS = 12000;

/**
 * Multi-palette liquid atmosphere with cursor-reactive blob.
 * Palettes auto-cycle; no user-facing palette controls.
 */
export function LiquidBackground() {
  const reduce = useReducedMotion();
  const [paletteIndex, setPaletteIndex] = useState(0);
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
    if (reduce) return;
    const id = window.setInterval(() => {
      setPaletteIndex((i) => (i + 1) % PALETTES.length);
    }, CYCLE_MS);
    return () => window.clearInterval(id);
  }, [reduce]);

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

  const palette = PALETTES[paletteIndex];

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <AnimatePresence mode="sync">
        <motion.div
          key={palette.name}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 2.4, ease: "easeInOut" }}
        >
          <div
            className="absolute inset-0"
            style={{ background: palette.base }}
          />

          <div
            className="junaki-liquid-orb absolute -left-[10%] top-[-5%] h-[55vmax] w-[55vmax] rounded-full opacity-70 blur-3xl"
            style={{ background: palette.orbA }}
          />
          <div
            className="junaki-liquid-orb absolute -right-[15%] bottom-[-10%] h-[50vmax] w-[50vmax] rounded-full opacity-60 blur-3xl"
            style={{
              animationDelay: "-4s",
              background: palette.orbB,
            }}
          />
          <div
            className="junaki-liquid-orb absolute left-[30%] bottom-[10%] h-[30vmax] w-[30vmax] rounded-full opacity-40 blur-3xl"
            style={{
              animationDelay: "-8s",
              background: palette.orbC,
            }}
          />
        </motion.div>
      </AnimatePresence>

      <motion.div
        className="absolute h-[42vmax] w-[42vmax] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-80 blur-3xl mix-blend-screen"
        style={{
          left: `${pos.x}%`,
          top: `${pos.y}%`,
          background: palette.cursor,
        }}
      />

      <div className="junaki-noise absolute inset-0" />

      <div
        className="absolute inset-0 transition-[background] duration-[2400ms]"
        style={{
          background: `radial-gradient(ellipse at center, transparent 40%, ${palette.vignette} 100%)`,
        }}
      />
    </div>
  );
}
