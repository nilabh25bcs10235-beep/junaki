"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost" | "glass" | "danger";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-br from-[var(--junaki-blush)] to-[var(--junaki-crimson)] text-white shadow-[0_10px_30px_rgba(244,63,94,0.35)] border border-white/20 hover:brightness-110",
  ghost:
    "bg-transparent text-[var(--junaki-mist)] border border-transparent hover:bg-white/10",
  glass:
    "bg-[var(--junaki-glass-strong)] text-[var(--junaki-mist)] border border-[var(--junaki-glass-border)] backdrop-blur-xl hover:border-[var(--junaki-glass-border-strong)]",
  danger:
    "bg-[rgba(190,18,60,0.35)] text-[var(--junaki-rose-50)] border border-[rgba(244,63,94,0.5)] hover:bg-[rgba(190,18,60,0.55)]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-sm gap-1.5 rounded-full",
  md: "h-11 px-5 text-sm gap-2 rounded-full",
  lg: "h-12 px-6 text-base gap-2 rounded-full",
};

type Props = {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
};

export function Button({
  variant = "primary",
  size = "md",
  loading,
  disabled,
  type = "button",
  className,
  children,
  onClick,
}: Props) {
  return (
    <motion.button
      type={type}
      whileHover={disabled || loading ? undefined : { y: -1 }}
      whileTap={disabled || loading ? undefined : { scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 24 }}
      disabled={disabled || loading}
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center font-medium tracking-wide transition-[filter,background,border-color] disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {loading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
      ) : null}
      {children}
    </motion.button>
  );
}
