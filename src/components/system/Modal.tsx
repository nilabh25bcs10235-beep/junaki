"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { GlassSurface } from "./GlassSurface";
import { IconButton } from "./IconButton";

type Props = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
};

export function Modal({ open, onClose, title, children }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label="Close dialog backdrop"
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal
            aria-label={title}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            className="relative z-10 w-full max-w-md"
          >
            <GlassSurface variant="modal" className="p-5 sm:p-6">
              <div className="mb-4 flex items-start justify-between gap-3">
                {title ? (
                  <h2 className="font-display text-xl text-[var(--junaki-rose-50)]">
                    {title}
                  </h2>
                ) : (
                  <span />
                )}
                <IconButton label="Close" onClick={onClose}>
                  <X size={16} />
                </IconButton>
              </div>
              {children}
            </GlassSurface>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
