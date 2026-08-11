"use client";

import { cn } from "@/lib/cn";

type Props = {
  label?: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  onChange: (value: number) => void;
  className?: string;
};

export function Slider({
  label = "Budget",
  value,
  min = 0,
  max = 500,
  step = 5,
  prefix = "$",
  suffix,
  onChange,
  className,
}: Props) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className={cn("w-full", className)}>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-medium text-[var(--junaki-mist)]">{label}</span>
        <span className="rounded-full border border-[var(--junaki-glass-border)] bg-[var(--junaki-glass)] px-2.5 py-0.5 text-[var(--junaki-rose-100)] backdrop-blur-md">
          {prefix}
          {value}
          {suffix ?? ""}
        </span>
      </div>
      <div className="relative h-2 w-full rounded-full bg-white/10">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[var(--junaki-crimson)] to-[var(--junaki-blush)]"
          style={{ width: `${pct}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 h-2 w-full cursor-pointer appearance-none bg-transparent accent-[var(--junaki-blush)]"
          aria-label={label}
        />
      </div>
    </div>
  );
}
