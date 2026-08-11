"use client";

import { useState } from "react";
import { GlassSurface } from "@/components/system/GlassSurface";
import { Chip } from "@/components/system/Chip";
import { Slider } from "@/components/system/Slider";
import { ChatBubble, ChatComposer } from "@/components/system/ChatBubble";

export default function StylistPage() {
  const [budget, setBudget] = useState(180);
  const [pref, setPref] = useState("minimal");
  const [chat, setChat] = useState("");
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; text: string }[]
  >([
    {
      role: "assistant",
      text: "Hi — I'm your Junaki stylist. Share an occasion and budget; I'll suggest looks. (Live AI comes after we connect a model key.)",
    },
  ]);

  const send = () => {
    if (!chat.trim()) return;
    const text = chat.trim();
    setMessages((m) => [
      ...m,
      { role: "user", text },
      {
        role: "assistant",
        text: `For “${pref}” under $${budget}: try the Blush Merino Coat with Moss Glass Earrings — mock suggestion until AI is wired.`,
      },
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
      </div>

      <GlassSurface variant="panel" className="flex flex-col gap-4 p-5">
        <Slider value={budget} onChange={setBudget} label="Budget" />
        <div className="flex flex-wrap gap-2">
          {["minimal", "street", "formal", "romantic"].map((p) => (
            <Chip key={p} selected={pref === p} onClick={() => setPref(p)}>
              {p}
            </Chip>
          ))}
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
