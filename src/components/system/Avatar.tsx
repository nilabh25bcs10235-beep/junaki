import { cn } from "@/lib/cn";

type Props = {
  name: string;
  src?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizes = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-14 w-14 text-base",
};

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function Avatar({ name, src, size = "md", className }: Props) {
  return (
    <div
      className={cn(
        "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-[var(--junaki-glass-border)] bg-gradient-to-br from-[var(--junaki-blush)] to-[var(--junaki-wine)] font-semibold text-white shadow-[0_0_20px_var(--junaki-glow-soft)]",
        sizes[size],
        className,
      )}
      title={name}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={name} className="h-full w-full object-cover" />
      ) : (
        initials(name)
      )}
    </div>
  );
}
