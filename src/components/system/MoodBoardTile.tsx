"use client";

import { GlassSurface } from "./GlassSurface";
import { cn } from "@/lib/cn";

type Props = {
  title: string;
  subtitle?: string;
  tone?: string;
  className?: string;
};

export function MoodBoardTile({
  title,
  subtitle,
  tone = "from-rose-300/40 via-rose-600/50 to-wine",
  className,
}: Props) {
  return (
    <GlassSurface
      variant="card"
      interactive
      className={cn("aspect-square p-0", className)}
    >
      <div
        className={cn(
          "flex h-full flex-col justify-end bg-gradient-to-br p-3",
          tone,
        )}
      >
        <p className="font-display text-base text-white drop-shadow">{title}</p>
        {subtitle ? (
          <p className="text-xs text-white/75">{subtitle}</p>
        ) : null}
      </div>
    </GlassSurface>
  );
}
