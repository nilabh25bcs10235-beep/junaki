"use client";

import { cn } from "@/lib/cn";
import { GlassSurface } from "./GlassSurface";

type Props = {
  children: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
};

export function Chip({ children, selected, onClick, className }: Props) {
  return (
    <GlassSurface
      variant="chip"
      interactive={!!onClick}
      onClick={onClick}
      className={cn(
        "inline-flex cursor-pointer select-none px-3.5 py-1.5 text-sm transition-colors",
        selected
          ? "border-[rgba(244,63,94,0.55)] bg-[rgba(244,63,94,0.22)] text-[var(--junaki-rose-50)]"
          : "text-[var(--junaki-muted)] hover:text-[var(--junaki-mist)]",
        className,
      )}
    >
      {children}
    </GlassSurface>
  );
}
