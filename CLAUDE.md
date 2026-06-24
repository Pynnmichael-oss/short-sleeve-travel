# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

<<<<<<< Updated upstream
# Short Sleeve Travel — Project Brief
=======
## Commands

```bash
npm run dev      # local dev server
npm run build    # static export → ./out/
npm run lint     # ESLint
```

Build artifact is `./out/` — deployed via GitHub Actions on push to `main`.

> **Next.js version note:** This project uses Next.js 16.2.9. APIs and conventions may differ from training data. Check `node_modules/next/dist/docs/` before writing code if uncertain.
>>>>>>> Stashed changes

## What This Is
A complete redesign of shortsleeveltravel.com. Modern adventure group travel
brand for young professionals aged 25-40. Deployed as a static site on GitHub Pages.

## Commands

```bash
npm run dev     # start dev server (localhost:3000)
npm run build   # static export → ./out/
npm run lint    # ESLint
```

Build output goes to `./out/` and is deployed via GitHub Actions on push to `main`.
The `NEXT_PUBLIC_MAPBOX_TOKEN` secret must be set in GitHub repo settings for the
globe map on `/recent-destinations` to work in production.

## Deployment
- Platform: GitHub Pages
- URL: https://pynnmichael-oss.github.io/short-sleeve-travel/
- Method: `next build` (static export) → `.github/workflows/deploy.yml`
- IMPORTANT: All internal links must use Next.js `<Link>` — never bare `<a>` tags
- IMPORTANT: `basePath` is `/short-sleeve-travel` — all public asset paths must
  start with `/short-sleeve-travel/`

## Tech Stack
- Next.js 16.2.9 (App Router, static export mode)
- TypeScript (strict mode)
- Tailwind CSS v4 with @tailwindcss/postcss
- next/font for Playfair Display + Inter
- next/image with `unoptimized: true` (GitHub Pages constraint)
- mapbox-gl v3 for the interactive globe on `/recent-destinations`
- Contact form is static UI only — no backend

> **Note:** This Next.js version may have breaking API changes from older
> versions. If in doubt, check `node_modules/next/dist/docs/` for the
> canonical reference before writing routing or config code.

## next.config.ts Settings (DO NOT CHANGE)
- `output: 'export'`
- `basePath: '/short-sleeve-travel'`
- `images.unoptimized: true`
- `transpilePackages: ['mapbox-gl']`

## Tailwind v4 Notes
- Config loaded via `@config "../../tailwind.config.ts"` in `globals.css`
- Colors **also** declared in `globals.css` `@theme` block — required for opacity
  modifier support (e.g. `bg-forest/50`)
- Custom keyframe `sst-kenburns` defined in `globals.css`
- `tailwind.config.ts` defines color tokens and font families only

## Dynamic Routes and Params (Next.js 16)
- `params` is a Promise: `params: Promise<{ slug: string }>`
- Always `await params` before accessing fields
- `generateStaticParams` goes in the server component (`page.tsx`)
- Pass resolved data to a separate `'use client'` component for animations

## Pages
1. `/` — Home (7 sections)
2. `/experiences` — Trip index grid with category filter
3. `/experiences/[slug]` — Individual experience page (8 sections, scroll animations)
4. `/about` — Kat featured + values
5. `/contact` — Static form UI only
6. `/recent-destinations` — Interactive Mapbox globe + past trip cards

## Mapbox Globe (`/recent-destinations`)
`GlobeMap.tsx` is a `'use client'` component that initialises a Mapbox GL globe
with pulsing markers for each past destination. It injects its own `<style>` tag
(`id="sst-globe-styles"`) because Tailwind can't target Mapbox popup DOM.
Hardcoded hex values inside `INJECTED_STYLES` are intentional — these style
third-party Mapbox elements, not brand UI. Popup links use `BASE_PATH` constant
(not `basePath` from config) so they resolve correctly as plain `<a>` tags inside
Mapbox HTML strings. `GlobeMapWrapper.tsx` handles the dynamic import with
`ssr: false`.

## Design Tokens
Colors (`tailwind.config.ts` + `globals.css @theme`):
- `forest`: #2C4A3E
- `sand`: #C8A97E
- `offwhite`: #F5F0E8
- `charcoal`: #2A2A2A
- `burnt`: #D4622A
- `warmwhite`: #FAFAF7

Typography:
- Headings: Playfair Display — class `font-display`
- Body/UI: Inter — class `font-body`

## Brand
- Positioning: "Adventure is better together"
- Voice: Warm, direct, slightly irreverent, never corporate
- Photography: Unsplash placeholder URLs
- People featured more prominently than hotels or resorts

## Trips
All 3 trips have full data in `src/lib/trips.ts`:

1. `patagonia-chile` — Patagonia, Chile — "Edge of the World" — 12 days · $3,200 · Challenging
2. `oaxaca-mexico` — Oaxaca, Mexico — "Culture, Mezcal & Mountains" — 8 days · $1,800 · Moderate
3. `azores-portugal` — The Azores, Portugal — "Atlantic Wild" — 10 days · $2,600 · Moderate

Each trip has: `id`, `slug`, `destination`, `country`, `tagline`, `category`,
`duration`, `groupSize`, `price`, `difficulty`, `image`, `heroImage`,
`galleryImages` (4), `description`, `hook`, `highlights`, `itinerary`,
`included`, `notIncluded`, `whoItsFor`.

## Founder
- Name: Kat Shortsleeve
- Featured on About page with Unsplash portrait placeholder

## Conventions
- Named exports only — no default exports except `page.tsx` files
- PascalCase component filenames
- All colors via Tailwind custom tokens — never hardcode hex in JSX (exception:
  Mapbox-injected HTML in `GlobeMap.tsx`)
- Semantic HTML throughout (`main`, `section`, `article`, `nav`)
- Every image uses `next/image` with `alt` text
- Tailwind classes for layout/color/spacing; inline styles for dynamic values
  only (parallax `translateY`, `transition-delay` by index, `font-size` with `clamp()`)
- `'use client'` on any component using hooks; keep server components as the
  entry point for dynamic routes (`page.tsx`)
- IntersectionObserver pattern for scroll animations: observe once, disconnect
  after firing, toggle `opacity-0/translate-y-8` → `opacity-100/translate-y-0`
- Scroll listeners added with `{ passive: true }`; remove in `useEffect` cleanup

## Do Not
- No API routes or server actions (not supported in static export)
- No hardcoded hex values in JSX (Mapbox popup HTML in `GlobeMap.tsx` is the only exception)
- No lorem ipsum — use real brand copy
- No default exports except `page.tsx` files
- No resort, cruise, or luxury aesthetics
- No aggressive sales language
