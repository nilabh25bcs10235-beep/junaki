import { cn } from "@/lib/cn";

type Props = {
  children: React.ReactNode;
  tone?: "default" | "blush" | "success" | "muted";
  className?: string;
};

const tones = {
  default:
    "border-[var(--junaki-glass-border)] bg-[var(--junaki-glass)] text-[var(--junaki-mist)]",
  blush:
    "border-[rgba(244,63,94,0.45)] bg-[rgba(244,63,94,0.18)] text-[var(--junaki-rose-100)]",
  success:
    "border-[rgba(52,211,153,0.4)] bg-[rgba(52,211,153,0.12)] text-emerald-200",
  muted: "border-white/10 bg-white/5 text-[var(--junaki-muted)]",
};

export function Badge({ children, tone = "default", className }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium tracking-wide backdrop-blur-md",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
