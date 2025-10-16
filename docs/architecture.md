# Architecture

- **Framework**: Next.js 14 (App Router), TypeScript
- **UI**: React 18, TailwindCSS, NextUI, Framer Motion
- **Database**: MongoDB via Mongoose
- **Auth**: Email/password login endpoint; `userRole` cookie used by middleware to guard `/dashboard` routes

## Request flow (API)
1. Client calls `NEXT_PUBLIC_API_URL` + route (e.g., `/api/flights`).
2. API route handler in `app/api/**/route.ts` calls `connectDB()` then delegates to a controller.
3. Controller uses Mongoose models in `models/**` to read/write.
4. JSON response returned.

## Key directories
- `app/` — Next.js App Router pages and API routes
  - `app/api/**` — REST endpoints
  - `app/dashboard/**` — Admin UI (guarded by middleware)
  - `app/flightBooking/**`, `app/booking/**`, `app/auth/**` — main features
- `controllers/` — Each resource's business logic
- `models/` — Mongoose schemas and models
- `lib/mongodb.ts` — MongoDB connection with global cache
- `utils/` — Helpers (`cookies.ts`, data seed scripts)
- `components/` — Shared UI components

## Environment variables
- `MONGODB_URI` (server-only) — required to boot the API (throws if missing)
- `NEXT_PUBLIC_API_URL` — base URL used by the client to fetch API routes
- `NEXT_PUBLIC_SITE_TITLE` — used in `app/layout.tsx` and `components/ui/navbar.tsx`

Create a `.env.local` file:
```
MONGODB_URI=mongodb+srv://<user>:<pass>@<cluster>/<db>?retryWrites=true&w=majority
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_SITE_TITLE=Online Flight Booking System
```

## Dev scripts
- `npm run dev` — start Next.js dev server
- `npm run build` — build
- `npm run start` — start production server
- `npm run lint` — lint
- `npm run generateData` — seed roles (connects via `lib/mongodb.ts`)
- `npm run generateSeatData` — generates seats (WARNING: current script hardcodes a connection string and imports a `.js` model path; update before use)

## Security notes
- Do not commit secrets to VCS. Move hardcoded URIs (e.g., in `utils/seatDummy.ts`) to env vars.
- Prefer passing resource ids via URL for `DELETE`/`PUT` routes; several handlers currently read `id` from body.
- Passwords are hashed with bcrypt during user creation.
