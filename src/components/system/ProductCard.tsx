"use client";

import { GlassSurface } from "./GlassSurface";
import { Badge } from "./Badge";
import { StarRating } from "./StarRating";
import { cn } from "@/lib/cn";

export type ProductCardProps = {
  name: string;
  price: number;
  category: string;
  rating: number;
  imageTone?: string;
  className?: string;
};

export function ProductCard({
  name,
  price,
  category,
  rating,
  imageTone = "from-rose-400/50 to-rose-900/80",
  className,
}: ProductCardProps) {
  return (
    <GlassSurface
      variant="card"
      interactive
      className={cn("flex flex-col overflow-hidden p-0", className)}
    >
      <div
        className={cn(
          "relative aspect-[4/5] bg-gradient-to-br",
          imageTone,
        )}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_50%)]" />
        <div className="absolute bottom-3 left-3">
          <Badge tone="blush">{category}</Badge>
        </div>
      </div>
      <div className="flex flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg leading-tight text-[var(--junaki-rose-50)]">
            {name}
          </h3>
          <span className="shrink-0 text-sm font-semibold text-[var(--junaki-blush)]">
            ${price}
          </span>
        </div>
        <StarRating value={rating} readOnly size="sm" />
      </div>
    </GlassSurface>
  );
}
