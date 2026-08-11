"use client";

import { ImageIcon, Play } from "lucide-react";
import { cn } from "@/lib/cn";
import type { ReviewMedia as Media } from "@/lib/mock/data";

type Props = {
  media: Media[];
  className?: string;
};

export function ReviewMediaGrid({ media, className }: Props) {
  if (!media.length) return null;

  return (
    <div className={cn("mt-3 flex flex-wrap gap-2", className)}>
      {media.map((m, i) => (
        <div
          key={`${m.label}-${i}`}
          className={cn(
            "relative h-20 w-28 overflow-hidden rounded-xl border border-white/15 bg-gradient-to-br sm:h-24 sm:w-32",
            m.tone,
          )}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2),transparent_55%)]" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-white/90">
            {m.type === "video" ? (
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/35 backdrop-blur-sm">
                <Play size={14} fill="currentColor" />
              </span>
            ) : (
              <ImageIcon size={16} className="opacity-90" />
            )}
            <span className="px-1 text-center text-[10px] font-medium uppercase tracking-wide">
              {m.label}
            </span>
          </div>
          {m.type === "video" ? (
            <span className="absolute bottom-1 right-1 rounded bg-black/50 px-1 text-[9px] uppercase tracking-wider text-white">
              Video
            </span>
          ) : null}
        </div>
      ))}
    </div>
  );
}
