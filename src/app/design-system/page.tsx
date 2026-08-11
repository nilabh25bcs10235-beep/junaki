"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Heart,
  Search,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import {
  Avatar,
  Badge,
  Button,
  ChatBubble,
  ChatComposer,
  Chip,
  DashboardStat,
  FeedCard,
  GlassSurface,
  GroupCard,
  IconButton,
  Input,
  Modal,
  MoodBoardTile,
  ProductCard,
  ReviewRow,
  Slider,
  StarRating,
  Tabs,
  Textarea,
  Toast,
} from "@/components/system";

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="mb-4 font-display text-2xl text-[var(--junaki-rose-50)]">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function DesignSystemPage() {
  const [budget, setBudget] = useState(180);
  const [stars, setStars] = useState(4);
  const [tab, setTab] = useState("all");
  const [chip, setChip] = useState("minimal");
  const [joined, setJoined] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [chat, setChat] = useState("");
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; text: string }[]
  >([
    {
      role: "assistant",
      text: "Tell me your occasion and budget — I'll curate a Junaki look.",
    },
  ]);

  const showToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2200);
  };

  const sendChat = () => {
    if (!chat.trim()) return;
    const userText = chat.trim();
    setMessages((m) => [
      ...m,
      { role: "user", text: userText },
      {
        role: "assistant",
        text: `Under $${budget}: try a soft blush knit with glass-finish flats — mock reply for design review.`,
      },
    ]);
    setChat("");
  };

  return (
    <main className="relative mx-auto min-h-full w-full max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
      <header className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/">
            <IconButton label="Back home">
              <ArrowLeft size={16} />
            </IconButton>
          </Link>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--junaki-blush)]">
              Junaki · Phase 0
            </p>
            <h1 className="font-display text-3xl text-[var(--junaki-rose-50)]">
              Design system
            </h1>
          </div>
        </div>
        <Badge tone="blush">
          <Sparkles size={12} className="mr-1 inline" />
          Interactive playground
        </Badge>
      </header>

      <nav className="mb-12 flex flex-wrap gap-2">
        {[
          ["foundations", "Foundations"],
          ["controls", "Controls"],
          ["domain", "Domain"],
          ["chat", "Chat"],
        ].map(([id, label]) => (
          <a
            key={id}
            href={`#${id}`}
            className="rounded-full border border-[var(--junaki-glass-border)] bg-[var(--junaki-glass-soft)] px-3 py-1 text-xs text-[var(--junaki-muted)] backdrop-blur-md hover:text-[var(--junaki-mist)]"
          >
            {label}
          </a>
        ))}
      </nav>

      <div className="flex flex-col gap-16 pb-24">
        <Section id="foundations" title="Glass surfaces">
          <div className="grid gap-4 md:grid-cols-2">
            <GlassSurface variant="panel" className="p-6">
              <p className="text-xs uppercase tracking-widest text-[var(--junaki-muted)]">
                panel
              </p>
              <p className="mt-2 font-display text-xl">Deep frosted panel</p>
              <p className="mt-1 text-sm text-[var(--junaki-muted)]">
                Backdrop blur + specular highlight + soft border light.
              </p>
            </GlassSurface>
            <GlassSurface variant="card" interactive className="p-6">
              <p className="text-xs uppercase tracking-widest text-[var(--junaki-muted)]">
                card · interactive
              </p>
              <p className="mt-2 font-display text-xl">Hover me</p>
              <p className="mt-1 text-sm text-[var(--junaki-muted)]">
                Spring lift on hover, press scale on tap.
              </p>
            </GlassSurface>
            <GlassSurface variant="nav" className="flex items-center gap-2 px-4 py-3 md:col-span-2">
              <span className="font-display text-[var(--junaki-rose-50)]">
                Junaki
              </span>
              <span className="ml-auto text-xs text-[var(--junaki-muted)]">
                nav pill
              </span>
              <IconButton label="Search">
                <Search size={16} />
              </IconButton>
              <IconButton label="Bag">
                <ShoppingBag size={16} />
              </IconButton>
              <IconButton label="Saved">
                <Heart size={16} />
              </IconButton>
            </GlassSurface>
          </div>
        </Section>

        <Section id="controls" title="Controls">
          <GlassSurface variant="panel" className="flex flex-col gap-6 p-6">
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => showToast("Primary action")}>
                Primary
              </Button>
              <Button variant="glass">Glass</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
              <Button loading>Loading</Button>
              <Button disabled>Disabled</Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="Email" placeholder="you@junaki.studio" />
              <Input
                label="Display name"
                placeholder="Avery"
                hint="Shown on community posts"
              />
            </div>
            <Textarea
              label="Style note"
              placeholder="Soft tailoring, blush neutrals, weekend polish…"
            />

            <Slider value={budget} onChange={setBudget} min={40} max={800} />

            <div className="flex flex-wrap items-center gap-4">
              <div>
                <p className="mb-1 text-sm text-[var(--junaki-muted)]">
                  Interactive stars
                </p>
                <StarRating value={stars} onChange={setStars} size="lg" />
              </div>
              <div>
                <p className="mb-1 text-sm text-[var(--junaki-muted)]">
                  Read-only
                </p>
                <StarRating value={4.5} readOnly />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {["minimal", "street", "formal", "romantic"].map((c) => (
                <Chip
                  key={c}
                  selected={chip === c}
                  onClick={() => setChip(c)}
                >
                  {c}
                </Chip>
              ))}
            </div>

            <Tabs
              value={tab}
              onChange={setTab}
              tabs={[
                { id: "all", label: "All" },
                { id: "new", label: "New" },
                { id: "sale", label: "Sale" },
              ]}
            />

            <div className="flex flex-wrap items-center gap-3">
              <Badge>Default</Badge>
              <Badge tone="blush">Blush</Badge>
              <Badge tone="success">In stock</Badge>
              <Badge tone="muted">Muted</Badge>
              <Avatar name="Nova Chen" />
              <Avatar name="Kai Rivera" size="lg" />
              <Button variant="glass" onClick={() => setModalOpen(true)}>
                Open modal
              </Button>
            </div>
          </GlassSurface>
        </Section>

        <Section id="domain" title="Domain-ready pieces">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <ProductCard
              name="Blush Merino Coat"
              price={248}
              category="Outerwear"
              rating={5}
            />
            <ProductCard
              name="Crimson Silk Scarf"
              price={68}
              category="Accessories"
              rating={4}
              imageTone="from-rose-500/60 to-purple-950/80"
            />
            <div className="flex flex-col gap-4">
              <DashboardStat label="Saved looks" value="12" hint="+3 this week" />
              <DashboardStat label="Budget set" value={`$${budget}`} />
            </div>
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <FeedCard
              author="Mira Sol"
              group="Soft Minimal"
              body="Tried the rose-glass palette with oatmeal tailoring — feels like liquid luxury IRL."
              likes={42}
              comments={8}
            />
            <GroupCard
              name="Soft Minimal"
              members={1284}
              description="Quiet silhouettes, blush neutrals, intentional layers."
              joined={joined}
              onToggle={() => {
                setJoined((j) => !j);
                showToast(joined ? "Left Soft Minimal" : "Joined Soft Minimal");
              }}
            />
          </div>

          <GlassSurface variant="panel" className="mt-4 p-5">
            <h3 className="mb-2 font-display text-lg text-[var(--junaki-rose-50)]">
              Reviews
            </h3>
            <ReviewRow
              author="Jules Park"
              rating={5}
              date="2d ago"
              body="Fabric feels expensive and the cut is forgiving. Instant wardrobe staple."
            />
            <ReviewRow
              author="Ren Okada"
              rating={4}
              date="1w ago"
              body="Slightly long in the sleeve — still wearing it weekly."
            />
          </GlassSurface>

          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <MoodBoardTile title="Blush knit" subtitle="Soft / casual" />
            <MoodBoardTile
              title="Wine tailoring"
              subtitle="Work / evening"
              tone="from-rose-900/70 via-rose-700/50 to-black/40"
            />
            <MoodBoardTile
              title="Glass jewelry"
              subtitle="Accent"
              tone="from-pink-200/40 via-rose-400/40 to-fuchsia-900/50"
            />
            <MoodBoardTile
              title="Street rose"
              subtitle="Weekend"
              tone="from-orange-400/30 via-rose-600/50 to-slate-900/60"
            />
          </div>
        </Section>

        <Section id="chat" title="AI stylist chat (mock)">
          <GlassSurface variant="panel" className="flex flex-col gap-4 p-5">
            <div className="flex flex-wrap gap-2">
              <Chip selected>Budget aware</Chip>
              <Chip>Occasion</Chip>
              <Chip>Color story</Chip>
            </div>
            <Slider value={budget} onChange={setBudget} label="Stylist budget" />
            <div className="flex max-h-72 flex-col gap-3 overflow-y-auto pr-1">
              {messages.map((m, i) => (
                <ChatBubble key={i} role={m.role}>
                  {m.text}
                </ChatBubble>
              ))}
            </div>
            <ChatComposer value={chat} onChange={setChat} onSend={sendChat} />
          </GlassSurface>
        </Section>
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Glass modal"
      >
        <p className="mb-4 text-sm text-[var(--junaki-muted)]">
          Spring entrance, escape to close, frosted wine glass surface.
        </p>
        <Button onClick={() => setModalOpen(false)}>Got it</Button>
      </Modal>

      <Toast message={toast} tone="success" />
    </main>
  );
}
