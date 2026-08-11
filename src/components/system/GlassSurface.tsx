"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type GlassVariant = "panel" | "card" | "nav" | "modal" | "chip";

const variantClass: Record<GlassVariant, string> = {
  panel:
    "rounded-[var(--junaki-radius-lg)] bg-[var(--junaki-glass)] border border-[var(--junaki-glass-border)] shadow-[var(--junaki-shadow)] backdrop-blur-2xl",
  card:
    "rounded-[var(--junaki-radius-md)] bg-[var(--junaki-glass-strong)] border border-[var(--junaki-glass-border)] shadow-[0_12px_40px_rgba(0,0,0,0.28)] backdrop-blur-xl",
  nav:
    "rounded-[var(--junaki-radius-pill)] bg-[var(--junaki-glass-strong)] border border-[var(--junaki-glass-border-strong)] shadow-[0_10px_40px_rgba(0,0,0,0.3)] backdrop-blur-2xl",
  modal:
    "rounded-[var(--junaki-radius-lg)] bg-[rgba(40,8,18,0.72)] border border-[var(--junaki-glass-border-strong)] shadow-[0_30px_80px_rgba(0,0,0,0.5)] backdrop-blur-3xl",
  chip:
    "rounded-[var(--junaki-radius-pill)] bg-[var(--junaki-glass-soft)] border border-[var(--junaki-glass-border)] backdrop-blur-md",
};

type Props = {
  variant?: GlassVariant;
  interactive?: boolean;
  glow?: boolean;
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
  role?: string;
};

export function GlassSurface({
  variant = "panel",
  interactive = false,
  glow = false,
  className,
  children,
  onClick,
  role,
}: Props) {
  return (
    <motion.div
      role={role}
      onClick={onClick}
      className={cn(
        "relative overflow-hidden text-[var(--junaki-mist)]",
        variantClass[variant],
        interactive &&
          "cursor-pointer transition-[border-color,box-shadow,transform] hover:border-[var(--junaki-glass-border-strong)] hover:shadow-[0_16px_48px_rgba(244,63,94,0.18)]",
        glow && "ring-1 ring-[var(--junaki-glow-soft)]",
        className,
      )}
      whileHover={interactive ? { y: -2, scale: 1.01 } : undefined}
      whileTap={interactive ? { scale: 0.985 } : undefined}
      transition={{ type: "spring", stiffness: 380, damping: 28 }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/15 to-transparent opacity-70"
      />
      <div className="relative z-[1]">{children}</div>
    </motion.div>
  );
}
