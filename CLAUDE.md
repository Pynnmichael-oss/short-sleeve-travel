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

Build output goes to `./out/` and is deployed via GitHub Actions on push to `main`.

## Deployment
- Platform: GitHub Pages
- URL: https://pynnmichael-oss.github.io/short-sleeve-travel/
- Method: `next build` (static export) → `.github/workflows/deploy.yml`
- Triggers: push to `main`, nightly cron at 02:00 UTC, manual `workflow_dispatch`
- IMPORTANT: All internal links must use Next.js `<Link>` — never bare `<a>` tags
- IMPORTANT: `basePath` is `/short-sleeve-travel` — all public asset paths must start with `/short-sleeve-travel/`

## Tech Stack
- Next.js 16.2.9 (App Router, static export mode)
- TypeScript (strict mode)
- Tailwind CSS v4 with @tailwindcss/postcss
- next/font for Playfair Display + Inter
- next/image with `unoptimized: true` (GitHub Pages constraint)
- mapbox-gl v3 for the interactive globe on `/recent-destinations`
- Sanity CMS (project `g80ygq4l`, dataset `production`) for all trip content
- @sanity/client + @sanity/image-url for data fetching and image transforms
- Contact form is static UI only — no backend

> **Note:** This Next.js version may have breaking API changes from older versions. If in doubt, check `node_modules/next/dist/docs/` before writing routing or config code.

## next.config.ts Settings (DO NOT CHANGE)
- `output: 'export'`
- `basePath: '/short-sleeve-travel'`
- `images.unoptimized: true`
- `transpilePackages: ['mapbox-gl']`

## Tailwind v4 Notes
- Config loaded via `@config "../../tailwind.config.ts"` in `globals.css`
- Colors **also** declared in `globals.css` `@theme` block — required for opacity modifier support (e.g. `bg-sst-nav/50`)
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

## Pages
1. `/` — Home (async server component; calls `getUpcomingTrips()`)
2. `/experiences` — Trip index; async server component calling `getActiveTrips()`
3. `/experiences/[slug]` — Detail page; async server component calling `getTripBySlug()`; `generateStaticParams` fetches slugs from Sanity
4. `/about` — Kat featured + values
5. `/contact` — Static form UI only
6. `/recent-destinations` — Async server component calling `getPastTrips()`; Mapbox globe + past trip cards
7. `/studio/[[...tool]]` — Embedded Sanity Studio (static export compatible)

## Sanity CMS
- Project ID: `g80ygq4l` · Dataset: `production`
- Schema: `src/sanity/schemaTypes/trip.ts` — single `trip` document type
- Studio config: `sanity.config.ts` (hardcoded project/dataset, no env vars)
- CLI config: `sanity.cli.ts` (reads env vars for local dev, has `appId` for deploy)
- Studio deploy: `npx sanity login` then `npx sanity deploy` (requires authenticated CLI session — Editor API token is NOT sufficient)
- Sanity client + urlFor: `src/lib/sanity.ts`
- GROQ queries: `src/lib/queries.ts`

### Trip Status Values
- `active` — shown on `/experiences` page (bookable now)
- `upcoming` — shown in "Where We're Going Next" section on homepage
- `past` — shown on `/recent-destinations`

### Trip Type (`src/types/index.ts`)
The `Trip` interface matches the Sanity schema:
```
_id, title, slug: { current: string }, tagline, description,
heroImage (Sanity image object), gallery (GalleryImage[]),
durationDays, priceFrom, deposit, bookingUrl,
destination, region, departureDates (DepartureDate[]),
inclusions (TripInclusions), featured, order,
status: 'active' | 'upcoming' | 'past'
```

### Image Handling
- Always use `urlFor()` from `src/lib/sanity.ts` for Sanity images
- ALWAYS guard with `?.asset` check before calling `urlFor()`:
  ```tsx
  src={trip.heroImage?.asset ? urlFor(trip.heroImage).width(1200).url() : FALLBACK}
  ```
- Gallery images: `if (!img?.asset) return null` at top of map
- Fallback URLs are Unsplash images keyed by slug in a `FALLBACK_IMAGES` record in each component

## Queries (`src/lib/queries.ts`)
```
getAllTrips()       — all trips regardless of status
getActiveTrips()    — status == "active", used on /experiences
getUpcomingTrips()  — status == "upcoming", used on homepage
getPastTrips()      — status == "past", used on /recent-destinations
getTripBySlug(slug) — single trip for detail page
getFeaturedTrips()  — featured == true, used in homepage FeaturedTrips section
```

## Experience Detail Page Sections (in render order)
1. `HeroSection` — full-screen hero with parallax; NZ trip uses video
2. `PhotoGallery` — masonry grid from `trip.gallery`; renders nothing if empty
3. `StatsBar` — duration, region, price, deposit
4. `StickyHook` — large pull-quote using `trip.description`
5. `IncludedSection` — builds included list from `trip.inclusions` object
6. `DepartureDates` — departure rows with "Book Now" → `trip.bookingUrl` in new tab; empty state → /contact
7. `BookingCTA` — "Check Dates & Book" → `trip.bookingUrl` in new tab

## Mapbox Globe (`/recent-destinations`)
`GlobeMap.tsx` is a `'use client'` component with hardcoded destination coordinates (no coordinates in Sanity schema). Hardcoded hex values inside `INJECTED_STYLES` are intentional — these style third-party Mapbox elements. `GlobeMapWrapper.tsx` handles the dynamic import with `ssr: false`.

## Navbar
Always-solid `bg-sst-nav`. Links are `uppercase tracking-widest text-xs`. Logo uses Playfair Display. "LOGIN" link has a user SVG icon. "View Trips" CTA uses `bg-sst-amber`. No transparent-on-scroll behaviour.

## Seed / Migration Scripts (`scripts/`)
- `seed-sanity.ts` — creates the three initial trip documents
- `update-trip-status.ts` — patches all trips to `status: 'active'`
- Run with: `SANITY_API_TOKEN=<editor_token> npx tsx scripts/<file>.ts`

## Required GitHub Secrets
- `NEXT_PUBLIC_MAPBOX_TOKEN`
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`

## Conventions
- Named exports only — no default exports except `page.tsx` files
- PascalCase component filenames
- All colors via Tailwind custom tokens — never hardcode hex in JSX (exception: Mapbox-injected HTML in `GlobeMap.tsx`)
- Semantic HTML throughout (`main`, `section`, `article`, `nav`)
- Every image uses `next/image` with `alt` text
- Tailwind classes for layout/color/spacing; inline styles for dynamic values only (parallax `translateY`, `transition-delay` by index, `font-size` with `clamp()`)
- `'use client'` on any component using hooks; keep server components as the entry point for dynamic routes (`page.tsx`)
- IntersectionObserver pattern for scroll animations: observe once, disconnect after firing, toggle `opacity-0/translate-y-8` → `opacity-100/translate-y-0`
- Scroll listeners added with `{ passive: true }`; remove in `useEffect` cleanup
- All primary CTA buttons: `bg-sst-amber text-white hover:bg-amber-600`
- External booking links: `target="_blank" rel="noopener noreferrer"`

## Do Not
- No API routes or server actions (not supported in static export)
- No hardcoded hex values in JSX (Mapbox popup HTML in `GlobeMap.tsx` is the only exception)
- No lorem ipsum — use real brand copy
- No default exports except `page.tsx` files
- No resort, cruise, or luxury aesthetics
- No aggressive sales language
- Never call `urlFor()` without first checking `?.asset` — incomplete Sanity references crash the build
