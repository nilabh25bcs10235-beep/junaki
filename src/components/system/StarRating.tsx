"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/cn";

type Props = {
  value: number;
  onChange?: (value: number) => void;
  max?: number;
  size?: "sm" | "md" | "lg";
  readOnly?: boolean;
  className?: string;
};

const sizeMap = {
  sm: 14,
  md: 18,
  lg: 24,
};

export function StarRating({
  value,
  onChange,
  max = 5,
  size = "md",
  readOnly,
  className,
}: Props) {
  const [hover, setHover] = useState<number | null>(null);
  const display = hover ?? value;
  const interactive = !readOnly && !!onChange;

  return (
    <div
      className={cn("inline-flex items-center gap-0.5", className)}
      role={interactive ? "slider" : "img"}
      aria-label={`${value} out of ${max} stars`}
      aria-valuenow={interactive ? value : undefined}
      aria-valuemin={interactive ? 1 : undefined}
      aria-valuemax={interactive ? max : undefined}
    >
      {Array.from({ length: max }, (_, i) => {
        const n = i + 1;
        const filled = n <= display;
        return (
          <button
            key={n}
            type="button"
            disabled={!interactive}
            className={cn(
              "p-0.5 transition-transform",
              interactive && "cursor-pointer hover:scale-110",
              !interactive && "cursor-default",
            )}
            onMouseEnter={() => interactive && setHover(n)}
            onMouseLeave={() => interactive && setHover(null)}
            onClick={() => onChange?.(n)}
            aria-label={`${n} star${n > 1 ? "s" : ""}`}
          >
            <Star
              size={sizeMap[size]}
              className={cn(
                "transition-colors",
                filled
                  ? "fill-[var(--junaki-blush)] text-[var(--junaki-blush)] drop-shadow-[0_0_8px_var(--junaki-glow)]"
                  : "fill-transparent text-white/30",
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
