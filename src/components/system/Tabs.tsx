"use client";

import { cn } from "@/lib/cn";

type Tab = { id: string; label: string };

type Props = {
  tabs: Tab[];
  value: string;
  onChange: (id: string) => void;
  className?: string;
};

export function Tabs({ tabs, value, onChange, className }: Props) {
  return (
    <div
      role="tablist"
      className={cn(
        "inline-flex gap-1 rounded-full border border-[var(--junaki-glass-border)] bg-[var(--junaki-glass-soft)] p-1 backdrop-blur-xl",
        className,
      )}
    >
      {tabs.map((t) => {
        const active = t.id === value;
        return (
          <button
            key={t.id}
            role="tab"
            type="button"
            aria-selected={active}
            onClick={() => onChange(t.id)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-all",
              active
                ? "bg-gradient-to-r from-[var(--junaki-blush)] to-[var(--junaki-crimson)] text-white shadow-[0_6px_20px_rgba(244,63,94,0.35)]"
                : "text-[var(--junaki-muted)] hover:text-[var(--junaki-mist)]",
            )}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
