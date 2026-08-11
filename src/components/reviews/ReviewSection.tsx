"use client";

import { useMemo, useRef, useState } from "react";
import {
  BadgeCheck,
  ImagePlus,
  Send,
  Video,
  X,
} from "lucide-react";
import { GlassSurface } from "@/components/system/GlassSurface";
import { Avatar } from "@/components/system/Avatar";
import { Badge } from "@/components/system/Badge";
import { Button } from "@/components/system/Button";
import { StarRating } from "@/components/system/StarRating";
import { Textarea } from "@/components/system/Input";
import { Toast } from "@/components/system/Toast";
import { ReviewMediaGrid } from "@/components/reviews/ReviewMedia";
import type { Review, ReviewMedia } from "@/lib/mock/data";

type PendingFile = {
  id: string;
  type: "image" | "video";
  name: string;
  tone: string;
};

type Props = {
  initialReviews: Review[];
  /** Mock: treat visitor as verified buyer for media uploads */
  isVerifiedBuyer?: boolean;
  productId?: string;
};

const TONES = [
  "from-rose-300/50 to-rose-900/70",
  "from-sky-300/50 to-blue-900/70",
  "from-emerald-300/50 to-emerald-900/70",
  "from-amber-300/50 to-orange-900/70",
  "from-violet-300/50 to-purple-900/70",
];

export function ReviewSection({
  initialReviews,
  isVerifiedBuyer = true,
  productId,
}: Props) {
  const [items, setItems] = useState(initialReviews);
  const [rating, setRating] = useState(5);
  const [body, setBody] = useState("");
  const [pending, setPending] = useState<PendingFile[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(
    () =>
      productId
        ? items.filter((r) => r.productId === productId)
        : items,
    [items, productId],
  );

  const notify = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2400);
  };

  const onPick = (files: FileList | null, type: "image" | "video") => {
    if (!isVerifiedBuyer) {
      notify("Only verified buyers can attach photos or videos.");
      return;
    }
    if (!files?.length) return;

    const next: PendingFile[] = [];
    Array.from(files).forEach((file, i) => {
      const isVideo = file.type.startsWith("video/");
      const isImage = file.type.startsWith("image/");
      if (type === "video" && !isVideo) {
        notify("Please choose a video file.");
        return;
      }
      if (type === "image" && !isImage) {
        notify("Please choose an image file.");
        return;
      }
      // Client-side size guard (mock — real limits later with storage)
      const maxMb = type === "video" ? 80 : 12;
      if (file.size > maxMb * 1024 * 1024) {
        notify(`File too large (max ${maxMb}MB in preview mode).`);
        return;
      }
      next.push({
        id: `${Date.now()}-${i}`,
        type,
        name: file.name,
        tone: TONES[(pending.length + i) % TONES.length],
      });
    });
    if (next.length) setPending((p) => [...p, ...next].slice(0, 6));
  };

  const submit = () => {
    if (!body.trim()) {
      notify("Write a short review first.");
      return;
    }
    if (!isVerifiedBuyer && pending.length) {
      notify("Media is reserved for verified buyers.");
      return;
    }

    const media: ReviewMedia[] = pending.map((p) => ({
      type: p.type,
      tone: p.tone,
      label: p.name.slice(0, 18),
    }));

    const review: Review = {
      id: `local-${Date.now()}`,
      productId: productId ?? "p1",
      author: "You",
      rating,
      body: body.trim(),
      date: "Just now",
      verifiedBuyer: isVerifiedBuyer,
      media: isVerifiedBuyer ? media : [],
    };

    setItems((list) => [review, ...list]);
    setBody("");
    setPending([]);
    setRating(5);
    notify(
      isVerifiedBuyer && media.length
        ? "Review posted with media (saved locally for now)."
        : "Review posted (saved locally for now).",
    );
  };

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 className="font-display text-2xl text-[var(--junaki-rose-50)]">
            Reviews
          </h2>
          <p className="text-sm text-[var(--junaki-muted)]">
            Verified buyers can attach photos and short videos.
          </p>
        </div>
        {isVerifiedBuyer ? (
          <Badge tone="success">
            <BadgeCheck size={12} className="mr-1 inline" />
            Verified buyer
          </Badge>
        ) : (
          <Badge tone="muted">Purchase to unlock media</Badge>
        )}
      </div>

      <GlassSurface variant="panel" className="p-4 sm:p-5">
        <p className="mb-2 text-sm font-medium text-[var(--junaki-mist)]">
          Your rating
        </p>
        <StarRating value={rating} onChange={setRating} size="lg" />
        <div className="mt-4">
          <Textarea
            label="Your review"
            placeholder="How did it fit, feel, and photograph in real life?"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>

        {pending.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {pending.map((p) => (
              <div
                key={p.id}
                className={`relative flex h-16 w-24 items-end rounded-xl border border-white/15 bg-gradient-to-br p-1.5 ${p.tone}`}
              >
                <span className="truncate text-[10px] text-white/90">
                  {p.type === "video" ? "▶ " : ""}
                  {p.name}
                </span>
                <button
                  type="button"
                  aria-label="Remove attachment"
                  className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-white"
                  onClick={() =>
                    setPending((list) => list.filter((x) => x.id !== p.id))
                  }
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        ) : null}

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <input
            ref={imageRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => {
              onPick(e.target.files, "image");
              e.target.value = "";
            }}
          />
          <input
            ref={videoRef}
            type="file"
            accept="video/*"
            className="hidden"
            onChange={(e) => {
              onPick(e.target.files, "video");
              e.target.value = "";
            }}
          />
          <Button
            variant="glass"
            size="sm"
            disabled={!isVerifiedBuyer}
            onClick={() => imageRef.current?.click()}
          >
            <ImagePlus size={14} />
            Photo
          </Button>
          <Button
            variant="glass"
            size="sm"
            disabled={!isVerifiedBuyer}
            onClick={() => videoRef.current?.click()}
          >
            <Video size={14} />
            Video
          </Button>
          <Button size="sm" className="ml-auto" onClick={submit}>
            <Send size={14} />
            Post review
          </Button>
        </div>
        {!isVerifiedBuyer ? (
          <p className="mt-2 text-xs text-[var(--junaki-muted)]">
            Media uploads unlock after a verified purchase. Text reviews stay
            open for all shoppers.
          </p>
        ) : (
          <p className="mt-2 text-xs text-[var(--junaki-muted)]">
            Preview mode: media stays on this device until Supabase Storage is
            connected.
          </p>
        )}
      </GlassSurface>

      <div className="flex flex-col gap-3">
        {filtered.map((r) => (
          <GlassSurface key={r.id} variant="card" className="p-4">
            <div className="flex gap-3">
              <Avatar name={r.author} size="sm" />
              <div className="min-w-0 flex-1">
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium text-[var(--junaki-mist)]">
                    {r.author}
                  </span>
                  {r.verifiedBuyer ? (
                    <Badge tone="success">
                      <BadgeCheck size={10} className="mr-0.5 inline" />
                      Verified
                    </Badge>
                  ) : null}
                  <StarRating value={r.rating} readOnly size="sm" />
                  <span className="text-xs text-[var(--junaki-muted)]">
                    {r.date}
                  </span>
                </div>
                <p className="text-sm text-[var(--junaki-muted)]">{r.body}</p>
                <ReviewMediaGrid media={r.media} />
              </div>
            </div>
          </GlassSurface>
        ))}
        {filtered.length === 0 ? (
          <p className="text-sm text-[var(--junaki-muted)]">
            No reviews yet — be the first.
          </p>
        ) : null}
      </div>

      <Toast message={toast} tone="success" />
    </section>
  );
}
