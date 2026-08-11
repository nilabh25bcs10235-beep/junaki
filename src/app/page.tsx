import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { GlassSurface } from "@/components/system/GlassSurface";
import { Badge } from "@/components/system/Badge";

export default function Home() {
  return (
    <main className="relative mx-auto flex min-h-full w-full max-w-5xl flex-col px-5 py-10 sm:px-8 sm:py-16">
      <header className="mb-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[var(--junaki-blush)] to-[var(--junaki-crimson)] text-sm font-bold text-white shadow-[0_0_24px_var(--junaki-glow)]">
            J
          </span>
          <span className="font-display text-xl tracking-tight text-[var(--junaki-rose-50)]">
            Junaki
          </span>
        </div>
        <Link
          href="/design-system"
          className="inline-flex h-9 items-center gap-1.5 rounded-full border border-[var(--junaki-glass-border)] bg-[var(--junaki-glass-strong)] px-3.5 text-sm text-[var(--junaki-mist)] backdrop-blur-xl hover:border-[var(--junaki-glass-border-strong)]"
        >
          Design system
          <ArrowRight size={14} />
        </Link>
      </header>

      <section className="flex flex-1 flex-col items-start gap-8">
        <Badge tone="blush">
          <Sparkles size={12} className="mr-1 inline" />
          Phase 0 — liquid glass foundations
        </Badge>

        <h1 className="max-w-2xl font-display text-5xl leading-[1.05] tracking-tight text-[var(--junaki-rose-50)] sm:text-6xl">
          Modern boutique.
          <span className="block bg-gradient-to-r from-[var(--junaki-rose-50)] via-[var(--junaki-blush)] to-[var(--junaki-rose-100)] bg-clip-text text-transparent">
            Liquid glass soul.
          </span>
        </h1>

        <p className="max-w-xl text-lg leading-relaxed text-[var(--junaki-muted)]">
          Junaki is being built as an AI-styled boutique with community feeds,
          interest groups, mood boards, and star reviews — starting with a
          living design system you can feel.
        </p>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/design-system"
            className="inline-flex h-12 items-center gap-2 rounded-full bg-gradient-to-br from-[var(--junaki-blush)] to-[var(--junaki-crimson)] px-6 text-base font-medium text-white shadow-[0_10px_30px_rgba(244,63,94,0.35)] border border-white/20"
          >
            Explore components
            <ArrowRight size={16} />
          </Link>
          <span className="inline-flex h-12 items-center rounded-full border border-[var(--junaki-glass-border)] bg-[var(--junaki-glass-strong)] px-6 text-base text-[var(--junaki-muted)] opacity-60 backdrop-blur-xl">
            Shop coming next
          </span>
        </div>

        <div className="mt-8 grid w-full gap-4 sm:grid-cols-3">
          {[
            {
              title: "AI Stylist",
              body: "Budget + preference aware recommendations.",
            },
            {
              title: "Community",
              body: "Feeds and sub-interest style groups.",
            },
            {
              title: "Mood boards",
              body: "Compose looks, combos, and client styles.",
            },
          ].map((card) => (
            <GlassSurface key={card.title} variant="card" className="p-5">
              <h2 className="font-display text-lg text-[var(--junaki-rose-50)]">
                {card.title}
              </h2>
              <p className="mt-2 text-sm text-[var(--junaki-muted)]">
                {card.body}
              </p>
            </GlassSurface>
          ))}
        </div>
      </section>

      <footer className="mt-16 text-xs text-[var(--junaki-muted)]">
        Move your cursor — the liquid reacts. Reduce-motion is respected.
      </footer>
    </main>
  );
}
