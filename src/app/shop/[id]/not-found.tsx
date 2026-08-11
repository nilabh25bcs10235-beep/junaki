import Link from "next/link";
import { GlassSurface } from "@/components/system/GlassSurface";

export default function ProductNotFound() {
  return (
    <main className="relative mx-auto flex min-h-[50vh] w-full max-w-lg flex-col items-center justify-center px-5 py-16">
      <GlassSurface variant="panel" className="w-full p-8 text-center">
        <h1 className="font-display text-2xl text-[var(--junaki-rose-50)]">
          Piece not found
        </h1>
        <p className="mt-2 text-sm text-[var(--junaki-muted)]">
          That look isn’t in the Junaki edit right now.
        </p>
        <Link
          href="/shop"
          className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-gradient-to-br from-[var(--junaki-blush)] to-[var(--junaki-crimson)] px-5 text-sm font-medium text-white"
        >
          Back to shop
        </Link>
      </GlassSurface>
    </main>
  );
}
