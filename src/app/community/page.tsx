"use client";

import { useState } from "react";
import { FeedCard } from "@/components/system/FeedCard";
import { GroupCard } from "@/components/system/GroupCard";

const posts = [
  {
    author: "Mira Sol",
    group: "Soft Minimal",
    body: "Rose glass palette with oatmeal tailoring — liquid luxury IRL.",
    likes: 42,
    comments: 8,
  },
  {
    author: "Kai Rivera",
    group: "Street Rose",
    body: "Weekend layering: crimson scarf + moss earrings. Who else is in ocean mode this week?",
    likes: 19,
    comments: 3,
  },
];

const groups = [
  {
    name: "Soft Minimal",
    members: 1284,
    description: "Quiet silhouettes, blush neutrals, intentional layers.",
  },
  {
    name: "Street Rose",
    members: 892,
    description: "Weekend energy, sneakers, and bold accessories.",
  },
  {
    name: "Ocean Formal",
    members: 540,
    description: "Cool blues, sharp tailoring, evening polish.",
  },
];

export default function CommunityPage() {
  const [joined, setJoined] = useState<Record<string, boolean>>({});

  return (
    <main className="relative mx-auto flex w-full max-w-5xl flex-col gap-10 px-5 py-10 sm:px-8">
      <div>
        <h1 className="font-display text-4xl text-[var(--junaki-rose-50)]">
          Community
        </h1>
        <p className="mt-2 text-[var(--junaki-muted)]">
          Feeds and interest groups for shared style energy.
        </p>
      </div>

      <section>
        <h2 className="mb-4 font-display text-xl text-[var(--junaki-rose-50)]">
          Interest groups
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {groups.map((g) => (
            <GroupCard
              key={g.name}
              {...g}
              joined={!!joined[g.name]}
              onToggle={() =>
                setJoined((j) => ({ ...j, [g.name]: !j[g.name] }))
              }
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 font-display text-xl text-[var(--junaki-rose-50)]">
          Feed
        </h2>
        <div className="grid gap-4 lg:grid-cols-2">
          {posts.map((p) => (
            <FeedCard key={p.author + p.body.slice(0, 12)} {...p} />
          ))}
        </div>
      </section>
    </main>
  );
}
