# FitMatch AI MVP (PWA-first)

Mobile-first Next.js + Supabase MVP for outfit generation and color matching.

## Features
- Onboarding with gender, modest mode, style tags, sizes, budget, region.
- Piece matching flow with upload/manual fallback.
- Color matching palettes (Safe/Balanced/Bold/Premium).
- Outfit scoring (color harmony + style match + weighted total).
- Product source abstraction:
  - Curated catalog fallback (always works)
  - External shopping API placeholder (server-side)
- Cost controls:
  - daily per-user scan limits (`rate_limits` + `profiles.daily_scan_limit`)
  - image-hash cache (`analysis_cache`)
  - product query cache (`api_cache`, 24h TTL)
- Privacy controls:
  - private uploads bucket
  - hard delete endpoint stub
  - auto-delete support through `uploads.expires_at`

## Tech
- Next.js App Router
- Supabase (Auth, Postgres, Storage)
- Rule-based deterministic scoring engine

## Required environment variables
```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
VISION_API_KEY= # optional; if absent, fallback manual analysis is used
EXTERNAL_SHOPPING_API_KEY= # optional placeholder
```

## Local run
```bash
npm install
npm run dev
npm test
```

## Supabase setup
1. Create buckets:
   - `uploads-private` (private)
   - `share-cards-public` (public)
2. Apply migration in `supabase/migrations/202602221300_fitmatch_schema.sql`.
3. Run seed file `supabase/seed/seed.sql`.

## Deployment
- Deploy Next.js app to Vercel.
- Configure environment variables.
- Point to Supabase project.
- For scheduled cleanup (auto-delete unsaved uploads), run a cron job/edge function that:
  1) selects `uploads where is_saved=false and expires_at < now()`
  2) deletes storage objects
  3) deletes rows.

## Add new product sources
Use `ProductSource` interface in `lib/product-source.ts`:
- implement `search(input)`
- add source in server route orchestration
- keep curated source as fallback to guarantee availability.

## Caching + limits design
- Analysis cache key: SHA-256 image hash (`analysis_cache.image_hash`).
- Product search cache key: query signature string in `api_cache` with `expires_at = now() + interval '24h'`.
- Daily scan limit: increment `rate_limits.scans` per user/day and compare with `profiles.daily_scan_limit`.

## Routes
- `/` Home
- `/onboarding`
- `/upload`
- `/results/:outfitId`
- `/color`
- `/saved`
- `/profile`
- `/settings`
- `/share/:shareId`
