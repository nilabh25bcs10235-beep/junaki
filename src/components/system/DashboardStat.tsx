"use client";

import { GlassSurface } from "./GlassSurface";

type Props = {
  label: string;
  value: string;
  hint?: string;
};

export function DashboardStat({ label, value, hint }: Props) {
  return (
    <GlassSurface variant="card" glow className="p-4">
      <p className="text-xs uppercase tracking-[0.16em] text-[var(--junaki-muted)]">
        {label}
      </p>
      <p className="mt-2 font-display text-3xl text-[var(--junaki-rose-50)]">
        {value}
      </p>
      {hint ? (
        <p className="mt-1 text-xs text-[var(--junaki-muted)]">{hint}</p>
      ) : null}
    </GlassSurface>
  );
}
