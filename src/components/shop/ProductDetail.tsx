"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BadgeCheck,
  Heart,
  MessageCircle,
  ShoppingBag,
} from "lucide-react";
import type { Product, Review } from "@/lib/mock/data";
import { GlassSurface } from "@/components/system/GlassSurface";
import { Badge } from "@/components/system/Badge";
import { Button } from "@/components/system/Button";
import { Chip } from "@/components/system/Chip";
import { StarRating } from "@/components/system/StarRating";
import { Toast } from "@/components/system/Toast";
import { ProductCard } from "@/components/system/ProductCard";
import { ReviewSection } from "@/components/reviews/ReviewSection";
import { cn } from "@/lib/cn";

type Props = {
  product: Product;
  reviews: Review[];
  related: Product[];
};

export function ProductDetail({ product, reviews, related }: Props) {
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [size, setSize] = useState(product.sizes[0] ?? "");
  const [color, setColor] = useState(product.colors[0]?.name ?? "");
  const [saved, setSaved] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const rating = useMemo(() => {
    if (!reviews.length) return product.rating;
    return reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
  }, [reviews, product.rating]);

  const notify = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2200);
  };

  const gallery = product.gallery.length
    ? product.gallery
    : [product.imageTone];

  return (
    <main className="relative mx-auto flex w-full max-w-5xl flex-col gap-12 px-5 py-8 sm:px-8 sm:py-12">
      <Link
        href="/shop"
        className="inline-flex w-fit items-center gap-1.5 text-sm text-[var(--junaki-muted)] transition-colors hover:text-[var(--junaki-mist)]"
      >
        <ArrowLeft size={14} />
        Back to shop
      </Link>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
        {/* Gallery */}
        <div className="flex flex-col gap-3">
          <GlassSurface variant="card" className="overflow-hidden p-0">
            <div
              className={cn(
                "relative aspect-[4/5] w-full bg-gradient-to-br sm:aspect-square",
                gallery[galleryIndex],
              )}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.28),transparent_55%)]" />
              <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                <Badge tone="blush">{product.category}</Badge>
                {product.inStock ? (
                  <Badge tone="success">In stock</Badge>
                ) : (
                  <Badge tone="muted">Sold out</Badge>
                )}
              </div>
            </div>
          </GlassSurface>

          {gallery.length > 1 ? (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {gallery.map((tone, i) => (
                <button
                  key={tone + i}
                  type="button"
                  aria-label={`View image ${i + 1}`}
                  onClick={() => setGalleryIndex(i)}
                  className={cn(
                    "h-16 w-16 shrink-0 overflow-hidden rounded-xl border bg-gradient-to-br transition-all sm:h-20 sm:w-20",
                    tone,
                    i === galleryIndex
                      ? "border-[var(--junaki-blush)] ring-2 ring-[var(--junaki-glow-soft)]"
                      : "border-white/15 opacity-80 hover:opacity-100",
                  )}
                />
              ))}
            </div>
          ) : null}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-5">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--junaki-blush)]">
              Junaki edit
            </p>
            <h1 className="mt-1 font-display text-4xl leading-tight text-[var(--junaki-rose-50)] sm:text-5xl">
              {product.name}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <span className="text-2xl font-semibold text-[var(--junaki-blush)]">
                ${product.price}
              </span>
              <StarRating value={Math.round(rating)} readOnly />
              <span className="text-sm text-[var(--junaki-muted)]">
                {rating.toFixed(1)} · {reviews.length || product.reviewCount}{" "}
                review{(reviews.length || product.reviewCount) === 1 ? "" : "s"}
              </span>
            </div>
          </div>

          <p className="text-base leading-relaxed text-[var(--junaki-muted)]">
            {product.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {product.tags.map((t) => (
              <Badge key={t} tone="muted">
                {t}
              </Badge>
            ))}
          </div>

          <GlassSurface variant="panel" className="flex flex-col gap-4 p-4 sm:p-5">
            <div>
              <p className="mb-2 text-sm font-medium text-[var(--junaki-mist)]">
                Color · {color}
              </p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    title={c.name}
                    aria-label={c.name}
                    onClick={() => setColor(c.name)}
                    className={cn(
                      "h-9 w-9 rounded-full border-2 transition-transform",
                      color === c.name
                        ? "scale-110 border-white shadow-[0_0_0_2px_var(--junaki-blush)]"
                        : "border-white/25 hover:scale-105",
                    )}
                    style={{ background: c.swatch }}
                  />
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm font-medium text-[var(--junaki-mist)]">
                Size
              </p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <Chip
                    key={s}
                    selected={size === s}
                    onClick={() => setSize(s)}
                  >
                    {s}
                  </Chip>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              <Button
                size="lg"
                className="flex-1 sm:flex-none"
                disabled={!product.inStock}
                onClick={() =>
                  notify(
                    `Added ${product.name} · ${color} · ${size} (preview bag)`,
                  )
                }
              >
                <ShoppingBag size={16} />
                Add to bag
              </Button>
              <Button
                variant="glass"
                size="lg"
                onClick={() => {
                  setSaved((v) => !v);
                  notify(saved ? "Removed from saved" : "Saved to your looks");
                }}
              >
                <Heart
                  size={16}
                  className={saved ? "fill-[var(--junaki-blush)] text-[var(--junaki-blush)]" : ""}
                />
                {saved ? "Saved" : "Save"}
              </Button>
              <Link href={`/stylist?product=${product.id}`}>
                <Button variant="ghost" size="lg">
                  <MessageCircle size={16} />
                  Ask stylist
                </Button>
              </Link>
            </div>
          </GlassSurface>

          <GlassSurface variant="card" className="p-4 sm:p-5">
            <h2 className="font-display text-lg text-[var(--junaki-rose-50)]">
              Details
            </h2>
            <ul className="mt-3 list-inside list-disc space-y-1.5 text-sm text-[var(--junaki-muted)]">
              {product.details.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
            <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <p className="font-medium text-[var(--junaki-mist)]">Materials</p>
                <p className="mt-1 text-[var(--junaki-muted)]">{product.materials}</p>
              </div>
              <div>
                <p className="font-medium text-[var(--junaki-mist)]">Care</p>
                <p className="mt-1 text-[var(--junaki-muted)]">{product.care}</p>
              </div>
            </div>
            <p className="mt-4 inline-flex items-center gap-1.5 text-xs text-[var(--junaki-muted)]">
              <BadgeCheck size={12} className="text-emerald-300" />
              Verified buyers can post photo & video reviews below
            </p>
          </GlassSurface>
        </div>
      </div>

      {related.length > 0 ? (
        <section>
          <h2 className="mb-4 font-display text-2xl text-[var(--junaki-rose-50)]">
            You may also like
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard
                key={p.id}
                id={p.id}
                name={p.name}
                price={p.price}
                category={p.category}
                rating={p.rating}
                imageTone={p.imageTone}
              />
            ))}
          </div>
        </section>
      ) : null}

      <ReviewSection
        initialReviews={reviews}
        isVerifiedBuyer
        productId={product.id}
      />

      <Toast message={toast} tone="success" />
    </main>
  );
}
