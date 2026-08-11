"use client";

import { cn } from "@/lib/cn";
import { GlassSurface } from "./GlassSurface";

type Props = {
  role: "user" | "assistant";
  children: React.ReactNode;
};

export function ChatBubble({ role, children }: Props) {
  const isUser = role === "user";
  return (
    <div className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}>
      <GlassSurface
        variant={isUser ? "chip" : "card"}
        className={cn(
          "max-w-[85%] px-4 py-3 text-sm leading-relaxed",
          isUser
            ? "border-[rgba(244,63,94,0.4)] bg-[rgba(244,63,94,0.25)]"
            : "bg-[var(--junaki-glass)]",
        )}
      >
        {!isUser ? (
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--junaki-blush)]">
            Junaki Stylist
          </p>
        ) : null}
        <div className="text-[var(--junaki-mist)]">{children}</div>
      </GlassSurface>
    </div>
  );
}

type ComposerProps = {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
  placeholder?: string;
};

export function ChatComposer({
  value,
  onChange,
  onSend,
  placeholder = "Describe your vibe, occasion, or budget…",
}: ComposerProps) {
  return (
    <div className="flex gap-2">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSend();
          }
        }}
        placeholder={placeholder}
        className="h-12 flex-1 rounded-full border border-[var(--junaki-glass-border)] bg-[var(--junaki-glass-soft)] px-4 text-sm text-[var(--junaki-mist)] placeholder:text-[var(--junaki-muted)] backdrop-blur-xl outline-none focus:border-[var(--junaki-blush)]"
      />
      <button
        type="button"
        onClick={onSend}
        className="h-12 shrink-0 rounded-full bg-gradient-to-br from-[var(--junaki-blush)] to-[var(--junaki-crimson)] px-5 text-sm font-medium text-white shadow-[0_8px_24px_rgba(244,63,94,0.35)]"
      >
        Send
      </button>
    </div>
  );
}
