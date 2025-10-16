Online Flight Booking System built with Next.js 14, TypeScript, and MongoDB.

### Documentation
- See `docs/api.md` for REST endpoints.
- See `docs/models.md` for data models.
- See `docs/architecture.md` for structure and environment setup.

## Getting Started

### Quick Start

1) Install dependencies:

```bash
npm install
```

2) Create `.env.local`:

```
MONGODB_URI=mongodb+srv://<user>:<pass>@<cluster>/<db>?retryWrites=true&w=majority
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_SITE_TITLE=Online Flight Booking System
```

3) Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

### Scripts
- `npm run dev`: start dev server
- `npm run build`: build
- `npm run start`: start production
- `npm run lint`: lint
- `npm run generateData`: seed roles (uses `lib/mongodb.ts`)
- `npm run generateSeatData`: generates seats (update the script before use; it currently hardcodes a connection string)

### Security notes
- Do not commit secrets. Move any hardcoded URIs (e.g. in `utils/seatDummy.ts`) to env vars.
- Middleware guards `/dashboard` using `userRole` cookie.
