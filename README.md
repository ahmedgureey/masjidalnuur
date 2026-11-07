# Masjid Sadaqa Tracker

Next.js (App Router) + Tailwind CSS v3 + TypeScript. Tracks sadaqa toward a goal
using an in-memory store.

## Run

```bash
npm install
npm run dev     # http://localhost:3000
```

## API

- `GET /api/donations` returns `{ donations }`, newest first
- `POST /api/donations` with `{ "name": "Ahmed", "amount": 500 }` returns `201`, or `400 { error, field }`
- `GET /api/summary` returns `{ name, goal, raised, percent }`

## Limitation

Data lives in a server-side array (`lib/db.ts`) and resets when the server
restarts. On Vercel it can also differ between requests. Use a real database
for actual donations.
