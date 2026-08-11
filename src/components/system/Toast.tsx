"use client";

import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";

type Props = {
  message: string | null;
  tone?: "info" | "success" | "error";
  className?: string;
};

export function Toast({ message, tone = "info", className }: Props) {
  return (
    <AnimatePresence>
      {message ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          className={cn(
            "fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full border px-4 py-2 text-sm shadow-lg backdrop-blur-xl",
            tone === "success" &&
              "border-emerald-400/40 bg-emerald-950/60 text-emerald-100",
            tone === "error" &&
              "border-rose-400/40 bg-rose-950/60 text-rose-100",
            tone === "info" &&
              "border-[var(--junaki-glass-border)] bg-[rgba(40,8,18,0.75)] text-[var(--junaki-mist)]",
            className,
          )}
        >
          {message}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
