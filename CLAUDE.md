# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is
A complete redesign of shortsleeveltravel.com. Modern adventure group travel brand for young professionals aged 25–40. Deployed as a static site on GitHub Pages. Content is managed via Sanity CMS.

## Commands

```bash
npm run dev     # start dev server (localhost:3000)
npm run build   # static export → ./out/
npm run lint    # ESLint
```

There is no test suite in this repo. Build output goes to `./out/` and is deployed via GitHub Actions on push to `main`.

## Deployment
- Platform: GitHub Pages
- URL: https://pynnmichael-oss.github.io/short-sleeve-travel/
- Method: `next build` (static export) → `.github/workflows/deploy.yml`
- Triggers: push to `main`, nightly cron at 02:00 UTC, manual `workflow_dispatch`
- IMPORTANT: All internal links must use Next.js `<Link>` — never bare `<a>` tags
- IMPORTANT: `basePath` is `/short-sleeve-travel` — all public asset paths must start with `/short-sleeve-travel/`

## Tech Stack
- Next.js 16.2.9 (App Router, static export mode) — **this Next.js version has breaking API changes from older versions that predate your training data.** Check `node_modules/next/dist/docs/` before writing routing or config code (see `AGENTS.md`).
- TypeScript (strict mode)
- Tailwind CSS v4 with @tailwindcss/postcss
- next/font for Playfair Display + Inter
- next/image with `unoptimized: true` (GitHub Pages constraint)
- mapbox-gl v3 for the interactive globe on `/where-we-ve-been`
- Sanity CMS (project `g80ygq4l`, dataset `production`) for all trip content
- @sanity/client + @sanity/image-url for data fetching and image transforms
- Cloudflare Worker (`workers/contact-form/`) as the contact form backend — the only server-side code in the repo

## next.config.ts Settings (DO NOT CHANGE)
- `output: 'export'`
- `basePath: '/short-sleeve-travel'`
- `images.unoptimized: true`
- `transpilePackages: ['mapbox-gl']`

## Tailwind v4 Notes
- Config loaded via `@config "../../tailwind.config.ts"` in `globals.css`
- Colors **also** declared in `globals.css` `@theme` block — required for opacity modifier support (e.g. `bg-sst-nav/50`). Keep both files in sync when changing a color.
- Custom keyframe `sst-kenburns` defined in `globals.css`
- `tailwind.config.ts` defines color tokens and font families only

## Design Tokens
Colors (`tailwind.config.ts` + `globals.css @theme`):
- `sst-nav`:     #2E4A5A — nav bar, footer, dark sections
- `sst-navy`:    #1A2B3C — headings, heavy text
- `sst-amber`:   #E8A020 — ALL CTAs and buttons (use `hover:bg-amber-600`)
- `sst-body`:    #2D2D2D — body text
- `sst-white`:   #FFFFFF — page backgrounds, light text on dark
- `sst-surface`: #F7F8FA — card/section backgrounds
- `sst-sand`:    #C8A97E — dividers, accents, secondary text on dark
- `sst-map`:     #4AABE8 — map accents, info elements

Typography:
- Headings: Playfair Display — class `font-display`
- Body/UI: Inter — class `font-body`

## Dynamic Routes and Params (Next.js 16)
- `params` is a Promise: `params: Promise<{ slug: string }>`
- Always `await params` before accessing fields
- `generateStaticParams` goes in the server component (`page.tsx`)
- Pass resolved data to a separate `'use client'` component for animations

## Pages (`src/app`)
1. `/` — Home (async server component; calls `getUpcomingTrips()` and `getHomeGallery()`)
2. `/trips` — Trip index; async server component calling `getUpcomingTrips()`; sections come from `src/components/experiences/`
3. `/trips/[slug]` — Detail page; async server component calling `getTripBySlug()`; `generateStaticParams` fetches all slugs directly via `client.fetch`
4. `/about` — Kat's bio, favorite trips, social links
5. `/contact` — Async server component calling `getTripsForContactForm()` for the trip-interest dropdown; the form POSTs to a Cloudflare Worker (see "Contact Form Worker" below)
6. `/where-we-ve-been` — Async server component calling `getPastTrips()` and `getGlobeTrips()`; Mapbox globe + stats + past trip cards
7. `/studio/[[...tool]]` — Embedded Sanity Studio (static export compatible)

## Sanity CMS
- Project ID: `g80ygq4l` · Dataset: `production`
- Schema types (registered in `schemaTypes/index.ts`): `trip.ts` (main content type), `photo.ts` (standalone photo pool), `homeGallery.ts` (singleton for the homepage photo carousel), `contactSubmission.ts` (created by the contact form Worker, read-only in practice)
- Studio config: `sanity.config.ts` (hardcoded project/dataset; the `googleMapsInput` plugin reads `SANITY_STUDIO_GOOGLE_MAPS_API_KEY` for the geopoint location picker)
- CLI config: `sanity.cli.ts` (reads env vars for local dev, has `appId` for deploy)
- Studio deploy: `npx sanity login` then `npx sanity deploy` (requires authenticated CLI session — Editor API token is NOT sufficient)
- Sanity client + urlFor: `src/lib/sanity.ts`
- GROQ queries: `src/lib/queries.ts`
- The `trip` schema groups fields into Studio tabs (`content`, `media`, `pricing`, `scheduling`, `settings`) — put new fields in the matching group

### Trip Status Values
Only two values (the old `active` status was removed — don't reintroduce it):
- `upcoming` — shown on `/trips`, in the homepage `UpcomingTrips` section, and in the contact form dropdown
- `past` — shown on `/where-we-ve-been` (photo grid + globe pins)

### Trip Type (`src/types/index.ts`)
The `Trip` interface matches the Sanity schema:
```
_id, title, slug: { current: string }, tagline, description,
heroImage (PhotoRef), gallery? (GalleryImage[]),
durationDays, priceFrom, deposit, bookingUrl,
destination, region, departureDates (DepartureDate[]),
inclusions (TripInclusions), featured, order,
status?: 'upcoming' | 'past',
location?: { lat, lng, alt? }   // geopoint, drives the globe pins
```
Query functions return partial projections of this shape (e.g. `getPastTrips` omits `gallery`/`inclusions`, `getGlobeTrips` selects almost nothing) — don't assume every field is populated on every fetch, check `src/lib/queries.ts` for what a given query actually selects.

`heroImage` and `gallery` items are **references** to standalone `photo` documents (schema: `src/sanity/schemaTypes/photo.ts`), not inline image fields. Queries dereference them with `->{ image, alt, caption }`, so the fetched shape is `PhotoRef = { image, alt, caption }` — the real Sanity image object lives one level deeper, at `.image`.

### Image Handling
- Always use `urlFor()` from `src/lib/sanity.ts` for Sanity images
- ALWAYS guard with `?.image?.asset` (not `?.asset`) before calling `urlFor()`, and pass `.image` (not the `PhotoRef` itself) to `urlFor()`:
  ```tsx
  const imgSrc = trip.heroImage?.image?.asset
    ? urlFor(trip.heroImage.image).width(1200).url()
    : FALLBACK
  ```
- Gallery images: `if (!img?.image?.asset) return null` at top of map, then `urlFor(img.image)`
- Fallback URLs are Unsplash images or local `/short-sleeve-travel/images/*` assets keyed by slug in a `FALLBACK_IMAGES`/`FALLBACK_PHOTOS` record in each component
- Never call `urlFor()` on a `PhotoRef` without first checking `?.image?.asset` — incomplete Sanity references crash the build

## Queries (`src/lib/queries.ts`)
```
getAllTrips()             — all trips regardless of status
getUpcomingTrips()        — status == "upcoming", used on homepage and /trips
getPastTrips()            — status == "past", feeds the photo grid on /where-we-ve-been
getGlobeTrips()           — status == "past", minimal projection (_id/title/slug/location) for globe pins; kept separate from getPastTrips on purpose
getTripBySlug(slug)       — single trip for detail page
getTripsForContactForm()  — upcoming trips, _id/title only, for the contact dropdown; deliberately decoupled from getUpcomingTrips
getFeaturedTrips()        — featured == true (currently unused by any page)
getHomeGallery()          — singleton homeGallery document for the homepage PhotoCarousel
```

## Homepage Section Order (`src/app/page.tsx`)
`Hero` → `UpcomingTrips` → `HowItWorks` → `PhotoCarousel` (from `getHomeGallery()`, falls back to `FALLBACK_PHOTOS`) → `CommunityCloser` → `FooterCTA`

`FeaturedTrips` and `SocialProofStrip` exist in `src/components/home/` but are not currently rendered — check before assuming they're live.

## Trip Detail Page Sections (`src/app/trips/[slug]/ExperiencePage.tsx`, in render order)
`HeroSection` → `PhotoGallery` → `StatsBar` → `StickyHook` → `IncludedSection` → `DepartureDates` → `BookingCTA`

`ExperiencePage` is `'use client'`; `page.tsx` (server) resolves `params`/fetches the trip and passes it down. Additional section components exist in `sections/` (`ItineraryTimeline`, `GalleryStrip`, `WhoItsFor`) but are not currently wired into `ExperiencePage` — check before assuming they render.

## Mapbox Globe (`/where-we-ve-been`)
`GlobeMap.tsx` (`'use client'`, in `src/components/destinations/`) plots pins dynamically from Sanity: `getGlobeTrips()` fetches past trips and the pin position comes from each trip's `location` geopoint (set in Studio via the Google Maps input). Trips without a `location` are silently filtered out — if a pin is "missing", check the Sanity document first. Hardcoded hex values inside `INJECTED_STYLES` (and the `bg-[#1a1a1a]` on the map container) are intentional — these style third-party Mapbox popup/marker elements that Tailwind classes can't reach. `GlobeMapWrapper.tsx` handles the dynamic import with `ssr: false`.

## Navbar
Always-solid `bg-sst-nav`. Links: Trips (`/trips`), Where We've Been (`/where-we-ve-been`), About, Contact. Links are `uppercase tracking-widest text-xs`. Logo uses Playfair Display. "Login" link has a user SVG icon and currently points to `/trips`. "View Trips" CTA uses `bg-sst-amber`. No transparent-on-scroll behaviour.

## Contact Form Worker (`workers/contact-form/`)
The contact form's backend — a Cloudflare Worker (`wrangler.toml`, `src/index.ts`), separate from the Next.js app and deployed separately with wrangler. It validates the payload, creates a `contactSubmission` document in Sanity, then sends a notification email via Resend (email failure is logged but doesn't fail the request — the submission is already saved).
- The frontend calls it via `NEXT_PUBLIC_CONTACT_WORKER_URL`; if that env var is missing the form shows a generic error without ever fetching
- CORS is locked to `ALLOWED_ORIGIN` (`https://pynnmichael-oss.github.io`) in `wrangler.toml`
- Worker secrets (`SANITY_WRITE_TOKEN`, `RESEND_API_KEY`) are set with `wrangler secret put`, never in `wrangler.toml`
- It has its own `package.json`/`node_modules` — run wrangler commands from `workers/contact-form/`

## Seed / Migration Scripts (`scripts/`)
- `seed-sanity.ts` — creates the initial trip documents
- `update-trip-status.ts` — legacy: patches all trips to `status: 'active'`, a status that no longer exists in the schema. Do not run as-is.
- `seed-home-gallery.ts` — seeds the `homeGallery` singleton
- Run with: `SANITY_API_TOKEN=<editor_token> npx tsx scripts/<file>.ts`

## Required GitHub Secrets
- `NEXT_PUBLIC_MAPBOX_TOKEN`
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_CONTACT_WORKER_URL`

## Conventions
- Named exports only — no default exports except `page.tsx` files
- PascalCase component filenames
- All colors via Tailwind custom tokens — never hardcode hex in JSX (exception: Mapbox-injected HTML/styles in `GlobeMap.tsx`)
- Semantic HTML throughout (`main`, `section`, `article`, `nav`)
- Every image uses `next/image` with `alt` text
- Tailwind classes for layout/color/spacing; inline styles for dynamic values only (parallax `translateY`, `transition-delay` by index, `font-size` with `clamp()`)
- `'use client'` on any component using hooks; keep server components as the entry point for dynamic routes (`page.tsx`)
- IntersectionObserver pattern for scroll animations: observe once, disconnect after firing, toggle `opacity-0/translate-y-8` → `opacity-100/translate-y-0`
- Scroll listeners added with `{ passive: true }`; remove in `useEffect` cleanup
- All primary CTA buttons: `bg-sst-amber text-white hover:bg-amber-600`
- External booking links: `target="_blank" rel="noopener noreferrer"`

## Do Not
- No API routes or server actions (not supported in static export) — backend needs go in the Cloudflare Worker instead
- No hardcoded hex values in JSX (Mapbox popup/marker styling in `GlobeMap.tsx` is the only exception)
- No lorem ipsum — use real brand copy
- No default exports except `page.tsx` files
- No resort, cruise, or luxury aesthetics
- No aggressive sales language
- Never call `urlFor()` without first checking `?.asset` — incomplete Sanity references crash the build
