"use client";

import { useMemo, useState } from "react";
import { Slider } from "@/components/system/Slider";
import { Chip } from "@/components/system/Chip";
import { products } from "@/lib/mock/data";

export function SliderDemoBudget() {
  const [budget, setBudget] = useState(250);
  const [style, setStyle] = useState("all");

  const count = useMemo(() => {
    return products.filter((p) => {
      if (p.price > budget) return false;
      if (style === "all") return true;
      return p.category.toLowerCase().includes(style);
    }).length;
  }, [budget, style]);

  return (
    <div className="flex flex-col gap-4">
      <Slider
        label="Your budget"
        value={budget}
        min={40}
        max={400}
        onChange={setBudget}
      />
      <div className="flex flex-wrap gap-2">
        {["all", "outerwear", "accessories", "jewelry"].map((s) => (
          <Chip key={s} selected={style === s} onClick={() => setStyle(s)}>
            {s}
          </Chip>
        ))}
      </div>
      <p className="text-sm text-[var(--junaki-muted)]">
        {count} look{count === 1 ? "" : "s"} under ${budget}
        {style !== "all" ? ` · ${style}` : ""}
      </p>
    </div>
  );
}
