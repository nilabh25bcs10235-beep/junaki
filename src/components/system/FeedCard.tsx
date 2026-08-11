"use client";

import { Heart, MessageCircle } from "lucide-react";
import { GlassSurface } from "./GlassSurface";
import { Avatar } from "./Avatar";
import { Badge } from "./Badge";

type Props = {
  author: string;
  body: string;
  group?: string;
  likes?: number;
  comments?: number;
};

export function FeedCard({
  author,
  body,
  group,
  likes = 0,
  comments = 0,
}: Props) {
  return (
    <GlassSurface variant="card" className="p-4">
      <div className="mb-3 flex items-center gap-3">
        <Avatar name={author} size="sm" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-[var(--junaki-mist)]">
            {author}
          </p>
          {group ? <Badge tone="muted">{group}</Badge> : null}
        </div>
      </div>
      <p className="text-sm leading-relaxed text-[var(--junaki-muted)]">{body}</p>
      <div className="mt-4 flex gap-4 text-xs text-[var(--junaki-muted)]">
        <span className="inline-flex items-center gap-1">
          <Heart size={14} className="text-[var(--junaki-blush)]" /> {likes}
        </span>
        <span className="inline-flex items-center gap-1">
          <MessageCircle size={14} /> {comments}
        </span>
      </div>
    </GlassSurface>
  );
}
