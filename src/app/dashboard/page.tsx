import { DashboardStat } from "@/components/system/DashboardStat";
import { GlassSurface } from "@/components/system/GlassSurface";
import { MoodBoardTile } from "@/components/system/MoodBoardTile";

export default function DashboardPage() {
  return (
    <main className="relative mx-auto flex w-full max-w-5xl flex-col gap-8 px-5 py-10 sm:px-8">
      <div>
        <h1 className="font-display text-4xl text-[var(--junaki-rose-50)]">
          Your space
        </h1>
        <p className="mt-2 text-[var(--junaki-muted)]">
          Saved looks, boards, and activity — mock data until accounts go live.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <DashboardStat label="Saved looks" value="12" hint="+3 this week" />
        <DashboardStat label="Groups" value="2" hint="Soft Minimal, Street Rose" />
        <DashboardStat label="Reviews posted" value="4" hint="2 with video" />
      </div>

      <section>
        <h2 className="mb-4 font-display text-xl text-[var(--junaki-rose-50)]">
          Mood boards
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <MoodBoardTile title="Blush knit" subtitle="Soft / casual" />
          <MoodBoardTile
            title="Wine tailoring"
            subtitle="Work / evening"
            tone="from-rose-900/70 via-rose-700/50 to-black/40"
          />
          <MoodBoardTile
            title="Ocean formal"
            subtitle="Cool polish"
            tone="from-sky-300/40 via-cyan-700/50 to-slate-950/60"
          />
          <MoodBoardTile
            title="Grass weekend"
            subtitle="Outdoor easy"
            tone="from-lime-300/35 via-emerald-700/50 to-green-950/60"
          />
        </div>
      </section>

      <GlassSurface variant="panel" className="p-5">
        <h2 className="font-display text-lg text-[var(--junaki-rose-50)]">
          Preferences
        </h2>
        <p className="mt-2 text-sm text-[var(--junaki-muted)]">
          Default budget, sizes, and style tags will feed the stylist once
          accounts and AI are connected.
        </p>
      </GlassSurface>
    </main>
  );
}
