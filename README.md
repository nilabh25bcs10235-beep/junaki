# Junaki

Modern boutique web experience — liquid glass UI, AI stylist (coming), community, mood boards.

## Phase 0 (current)

Design system foundations:

- Pink–red / dark wine liquid background (cursor-reactive)
- `GlassSurface` + core controls
- Domain-ready cards (product, feed, chat, boards, reviews, stats)
- Living playground at [`/design-system`](http://localhost:3000/design-system)

## Run

```bash
cd junaki
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Next phases

1. App shell + routes (Shop, Chat, Community, Boards, Dashboard)
2. Mock catalog / feeds / boards
3. Supabase + AI keys (after skeleton)

## Stack

Next.js (App Router) · React · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide

## Deploy on Render

Blueprint: [`render.yaml`](./render.yaml)

1. [Render Dashboard](https://dashboard.render.com) → **New** → **Blueprint**
2. Connect `nilabh25bcs10235-beep/junaki` and apply the blueprint  
   **or** create a **Web Service** manually:

| Setting | Value |
| --- | --- |
| Runtime | Node |
| Build | `npm install --include=dev && npm run build` |
| Start | `npm start` |
| Node | `20` (`NODE_VERSION`) |

**Important:** do not set `NODE_ENV=production` as a service env var. That skips install of build tooling and breaks Tailwind. `next build` / `next start` already run in production mode.

No env secrets required for Phase 0. Add Supabase / AI keys later under **Environment**.
