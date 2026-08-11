# Junaki

Modern boutique web experience — liquid glass UI, AI stylist (coming), community, mood boards.

## Current (client-facing)

Shoppers see the boutique only — no design-system playground.

- Multi-palette liquid background (auto-cycles rose, maroon, pink, ocean, grass, violet, amber)
- Glass UI used as finish, not a user control
- Routes: Home, Shop, Stylist, Community, Dashboard
- **Verified buyer reviews** with photo + video attachments (local preview until Supabase Storage)

Internal components live under `src/components/system/*` for developers only.

## Run

```bash
cd junaki
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Next phases

1. Supabase Auth + Storage for real verified purchases & media
2. Live AI stylist + optional free/open video generation models
3. Richer mood boards and community moderation

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
