"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  label: string;
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};

export function IconButton({
  label,
  className,
  children,
  onClick,
  type = "button",
}: Props) {
  return (
    <motion.button
      type={type}
      aria-label={label}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.94 }}
      onClick={onClick}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--junaki-glass-border)] bg-[var(--junaki-glass)] text-[var(--junaki-mist)] backdrop-blur-xl transition-colors hover:border-[var(--junaki-glass-border-strong)] hover:bg-[var(--junaki-glass-strong)]",
        className,
      )}
    >
      {children}
    </motion.button>
  );
}
