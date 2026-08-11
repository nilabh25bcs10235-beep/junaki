"use client";

import { useEffect, useMemo, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { GlassSurface } from "@/components/system/GlassSurface";
import { Chip } from "@/components/system/Chip";
import { Slider } from "@/components/system/Slider";
import { ChatBubble, ChatComposer } from "@/components/system/ChatBubble";
import { getProduct } from "@/lib/mock/data";

function StylistInner() {
  const search = useSearchParams();
  const productId = search.get("product");
  const product = productId ? getProduct(productId) : undefined;

  const [budget, setBudget] = useState(product?.price ?? 180);
  const [pref, setPref] = useState(product?.tags[0] ?? "minimal");
  const [chat, setChat] = useState("");
  const intro = useMemo(() => {
    if (product) {
      return `I see you're looking at the ${product.name} ($${product.price}). Ask fit, layering, or alternatives under budget — live AI comes later; this is a smart mock for now.`;
    }
    return "Hi — I'm your Junaki stylist. Share an occasion and budget; I'll suggest looks. (Live AI comes after we connect a model key.)";
  }, [product]);

  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; text: string }[]
  >([{ role: "assistant", text: intro }]);

  useEffect(() => {
    setMessages([{ role: "assistant", text: intro }]);
    if (product) {
      setBudget(product.price);
      setPref(product.tags[0] ?? "minimal");
    }
  }, [intro, product]);

  const send = () => {
    if (!chat.trim()) return;
    const text = chat.trim();
    const suggestion = product
      ? `Around “${pref}” near $${budget}: the ${product.name} pairs well with Moss Glass Earrings or a Crimson Silk Scarf — mock reply until AI is live.`
      : `For “${pref}” under $${budget}: try the Blush Merino Coat with Moss Glass Earrings — mock suggestion until AI is wired.`;
    setMessages((m) => [
      ...m,
      { role: "user", text },
      { role: "assistant", text: suggestion },
    ]);
    setChat("");
  };

  return (
    <main className="relative mx-auto flex w-full max-w-2xl flex-col gap-6 px-5 py-10 sm:px-8">
      <div>
        <h1 className="font-display text-4xl text-[var(--junaki-rose-50)]">
          AI Stylist
        </h1>
        <p className="mt-2 text-[var(--junaki-muted)]">
          Recommendations under your budget and design prefs.
        </p>
        {product ? (
          <p className="mt-2 text-sm text-[var(--junaki-blush)]">
            Context:{" "}
            <Link href={`/shop/${product.id}`} className="underline">
              {product.name}
            </Link>
          </p>
        ) : null}
      </div>

      <GlassSurface variant="panel" className="flex flex-col gap-4 p-5">
        <Slider value={budget} onChange={setBudget} label="Budget" />
        <div className="flex flex-wrap gap-2">
          {["minimal", "street", "formal", "romantic", "summer", "gift"].map(
            (p) => (
              <Chip key={p} selected={pref === p} onClick={() => setPref(p)}>
                {p}
              </Chip>
            ),
          )}
        </div>
        <div className="flex max-h-80 flex-col gap-3 overflow-y-auto pr-1">
          {messages.map((m, i) => (
            <ChatBubble key={i} role={m.role}>
              {m.text}
            </ChatBubble>
          ))}
        </div>
        <ChatComposer value={chat} onChange={setChat} onSend={send} />
      </GlassSurface>
    </main>
  );
}

export default function StylistPage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto max-w-2xl px-5 py-10 text-[var(--junaki-muted)]">
          Loading stylist…
        </main>
      }
    >
      <StylistInner />
    </Suspense>
  );
}
