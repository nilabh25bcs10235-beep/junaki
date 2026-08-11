"use client";

import { Avatar } from "./Avatar";
import { StarRating } from "./StarRating";

type Props = {
  author: string;
  rating: number;
  body: string;
  date?: string;
};

export function ReviewRow({ author, rating, body, date }: Props) {
  return (
    <div className="flex gap-3 border-b border-white/10 py-3 last:border-0">
      <Avatar name={author} size="sm" />
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-[var(--junaki-mist)]">
            {author}
          </span>
          <StarRating value={rating} readOnly size="sm" />
          {date ? (
            <span className="text-xs text-[var(--junaki-muted)]">{date}</span>
          ) : null}
        </div>
        <p className="text-sm text-[var(--junaki-muted)]">{body}</p>
      </div>
    </div>
  );
}
