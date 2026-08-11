"use client";

import { cn } from "@/lib/cn";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
};

export function Input({ label, hint, className, id, ...props }: Props) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <label className="flex w-full flex-col gap-1.5 text-sm">
      {label ? (
        <span className="font-medium text-[var(--junaki-mist)]">{label}</span>
      ) : null}
      <input
        id={inputId}
        className={cn(
          "h-11 w-full rounded-2xl border border-[var(--junaki-glass-border)] bg-[var(--junaki-glass-soft)] px-4 text-[var(--junaki-mist)] placeholder:text-[var(--junaki-muted)] backdrop-blur-xl outline-none transition-[border-color,box-shadow] focus:border-[var(--junaki-blush)] focus:shadow-[0_0_0_3px_var(--junaki-glow-soft)]",
          className,
        )}
        {...props}
      />
      {hint ? (
        <span className="text-xs text-[var(--junaki-muted)]">{hint}</span>
      ) : null}
    </label>
  );
}

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
};

export function Textarea({ label, className, id, ...props }: TextareaProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <label className="flex w-full flex-col gap-1.5 text-sm">
      {label ? (
        <span className="font-medium text-[var(--junaki-mist)]">{label}</span>
      ) : null}
      <textarea
        id={inputId}
        className={cn(
          "min-h-[110px] w-full resize-y rounded-2xl border border-[var(--junaki-glass-border)] bg-[var(--junaki-glass-soft)] px-4 py-3 text-[var(--junaki-mist)] placeholder:text-[var(--junaki-muted)] backdrop-blur-xl outline-none transition-[border-color,box-shadow] focus:border-[var(--junaki-blush)] focus:shadow-[0_0_0_3px_var(--junaki-glow-soft)]",
          className,
        )}
        {...props}
      />
    </label>
  );
}
