import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { GlassSurface } from "@/components/system/GlassSurface";
import { Badge } from "@/components/system/Badge";
import { ProductCard } from "@/components/system/ProductCard";
import { ReviewSection } from "@/components/reviews/ReviewSection";
import { products, reviews } from "@/lib/mock/data";

export default function Home() {
  return (
    <main className="relative mx-auto flex w-full max-w-5xl flex-col gap-14 px-5 py-10 sm:px-8 sm:py-14">
      <section className="flex flex-col items-start gap-6">
        <Badge tone="blush">
          <Sparkles size={12} className="mr-1 inline" />
          Modern type boutique
        </Badge>

        <h1 className="max-w-2xl font-display text-5xl leading-[1.05] tracking-tight text-[var(--junaki-rose-50)] sm:text-6xl">
          Dress the mood.
          <span className="block bg-gradient-to-r from-[var(--junaki-rose-50)] via-[var(--junaki-blush)] to-[var(--junaki-rose-100)] bg-clip-text text-transparent">
            Let color follow you.
          </span>
        </h1>

        <p className="max-w-xl text-lg leading-relaxed text-[var(--junaki-muted)]">
          Junaki is a liquid-glass boutique for curated looks, AI styling under
          your budget, community groups, mood boards, and reviews from real
          buyers — with photos and videos.
        </p>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/shop"
            className="inline-flex h-12 items-center gap-2 rounded-full border border-white/20 bg-gradient-to-br from-[var(--junaki-blush)] to-[var(--junaki-crimson)] px-6 text-base font-medium text-white shadow-[0_10px_30px_rgba(244,63,94,0.35)]"
          >
            Shop the edit
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/stylist"
            className="inline-flex h-12 items-center rounded-full border border-[var(--junaki-glass-border)] bg-[var(--junaki-glass-strong)] px-6 text-base text-[var(--junaki-mist)] backdrop-blur-xl"
          >
            Ask the stylist
          </Link>
        </div>
      </section>

      <section>
        <div className="mb-5 flex items-end justify-between gap-3">
          <h2 className="font-display text-2xl text-[var(--junaki-rose-50)]">
            Featured
          </h2>
          <Link
            href="/shop"
            className="text-sm text-[var(--junaki-blush)] hover:underline"
          >
            View all
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard
              key={p.id}
              name={p.name}
              price={p.price}
              category={p.category}
              rating={p.rating}
              imageTone={p.imageTone}
            />
          ))}
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {[
          {
            title: "AI Stylist",
            body: "Budget and preference aware recommendations.",
            href: "/stylist",
          },
          {
            title: "Community",
            body: "Feeds and interest groups for every vibe.",
            href: "/community",
          },
          {
            title: "Your space",
            body: "Saved looks, boards, and order activity.",
            href: "/dashboard",
          },
        ].map((card) => (
          <Link key={card.title} href={card.href}>
            <GlassSurface variant="card" interactive className="h-full p-5">
              <h3 className="font-display text-lg text-[var(--junaki-rose-50)]">
                {card.title}
              </h3>
              <p className="mt-2 text-sm text-[var(--junaki-muted)]">
                {card.body}
              </p>
            </GlassSurface>
          </Link>
        ))}
      </section>

      <ReviewSection initialReviews={reviews} isVerifiedBuyer />

      <footer className="pb-8 text-center text-xs text-[var(--junaki-muted)]">
        Junaki · colors shift gently as you browse · glass is the finish, not a
        setting
      </footer>
    </main>
  );
}
