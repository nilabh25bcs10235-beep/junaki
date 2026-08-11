"use client";

import { Users } from "lucide-react";
import { GlassSurface } from "./GlassSurface";
import { Badge } from "./Badge";
import { Button } from "./Button";

type Props = {
  name: string;
  members: number;
  description: string;
  joined?: boolean;
  onToggle?: () => void;
};

export function GroupCard({
  name,
  members,
  description,
  joined,
  onToggle,
}: Props) {
  return (
    <GlassSurface variant="card" className="flex flex-col gap-3 p-4">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-display text-lg text-[var(--junaki-rose-50)]">
          {name}
        </h3>
        <Badge tone="blush">
          <Users size={12} className="mr-1 inline" />
          {members}
        </Badge>
      </div>
      <p className="flex-1 text-sm text-[var(--junaki-muted)]">{description}</p>
      <Button
        variant={joined ? "glass" : "primary"}
        size="sm"
        onClick={onToggle}
      >
        {joined ? "Joined" : "Join group"}
      </Button>
    </GlassSurface>
  );
}
