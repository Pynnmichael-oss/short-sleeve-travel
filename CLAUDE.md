# Short Sleeve Travel — Project Brief

## What This Is
A complete redesign of shortsleeveltravel.com. Modern adventure group travel
brand for young professionals aged 25-40. Deployed as a static site on GitHub Pages.

## Deployment
- Platform: GitHub Pages
- URL: https://pynnmichael-oss.github.io/short-sleeve-travel/
- Method: Static export via next build + GitHub Actions
- IMPORTANT: All internal links must use Next.js <Link> — never bare <a> tags
- IMPORTANT: basePath is /short-sleeve-travel — all public asset paths must
  start with /short-sleeve-travel/

## Tech Stack
- Next.js 16.2.9 (App Router, static export mode)
- TypeScript (strict mode)
- Tailwind CSS v4 with @tailwindcss/postcss
- next/font for Playfair Display + Inter
- next/image with unoptimized: true (GitHub Pages constraint)
- Contact form is static UI only — no backend needed

## next.config.ts Settings (DO NOT CHANGE)
- output: 'export'
- basePath: '/short-sleeve-travel'
- images.unoptimized: true

## Tailwind v4 Notes
- Config loaded via `@config "../../tailwind.config.ts"` in globals.css
- Colors also declared in globals.css `@theme` block — required for opacity
  modifier support (e.g. bg-forest/50)
- Custom keyframe `sst-kenburns` defined in globals.css
- tailwind.config.ts defines color tokens and font families only

## Dynamic Routes and Params (Next.js 16)
- params is a Promise: `params: Promise<{ slug: string }>`
- Always `await params` before accessing fields
- generateStaticParams goes in the server component (page.tsx)
- Pass resolved data to a separate 'use client' component for animations

## File Structure
```
src/
├── app/
│   ├── layout.tsx              — root layout: fonts, Navbar, Footer, IntroAnimation
│   ├── globals.css             — Tailwind v4 import, @theme block, keyframes
│   ├── page.tsx                — Home (7 sections)
│   ├── experiences/
│   │   ├── page.tsx            — Trip index grid
│   │   └── [slug]/
│   │       ├── page.tsx        — Server: generateStaticParams, async params
│   │       ├── ExperiencePage.tsx — 'use client' wrapper, renders all sections
│   │       └── sections/
│   │           ├── HeroSection.tsx       — parallax hero
│   │           ├── StatsBar.tsx          — 4 stats, fade-in on scroll
│   │           ├── StickyHook.tsx        — sticky left text + scrolling images
│   │           ├── ItineraryTimeline.tsx — alternating timeline, per-item IO
│   │           ├── IncludedSection.tsx   — included/not included, forest bg
│   │           ├── WhoItsFor.tsx         — 3 persona cards with stagger
│   │           ├── GalleryStrip.tsx      — horizontal scroll gallery
│   │           └── BookingCTA.tsx        — static reservation form
│   ├── about/page.tsx          — Kat featured + values
│   └── contact/page.tsx        — Static form UI only
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          — transparent → forest on scroll, mobile hamburger
│   │   └── Footer.tsx          — charcoal bg, 3-column, copyright
│   ├── ui/
│   │   ├── Button.tsx          — primary/outline/outline-light, Link or button
│   │   ├── Badge.tsx
│   │   └── SectionLabel.tsx
│   ├── home/                   — homepage section components (7 total)
│   ├── experiences/
│   │   ├── FilteredTrips.tsx   — 'use client', category filter bar + grid
│   │   └── TripCard.tsx        — links to /experiences/[trip.slug]
│   ├── about/                  — about page section components
│   ├── contact/                — contact page section components
│   └── IntroAnimation.tsx      — 'use client', cinematic intro, sessionStorage
├── lib/
│   └── trips.ts                — full Trip data for all 3 trips
└── types/
    └── index.ts                — Trip, ItineraryDay, PersonaCard, TripCategory, Difficulty
```

## Design Tokens
Colors (tailwind.config.ts + globals.css @theme):
- forest: #2C4A3E
- sand: #C8A97E
- offwhite: #F5F0E8
- charcoal: #2A2A2A
- burnt: #D4622A
- warmwhite: #FAFAF7

Typography:
- Headings: Playfair Display (next/font/google) — class: font-display
- Body/UI: Inter (next/font/google) — class: font-body

## Brand
- Positioning: "Adventure is better together"
- Voice: Warm, direct, slightly irreverent, never corporate
- Photography: Unsplash placeholder URLs
- People featured more prominently than hotels or resorts

## Trips
All 3 trips have full data in src/lib/trips.ts (not placeholder):

1. slug: patagonia-chile — Patagonia, Chile — "Edge of the World"
   12 days · Group of 10 · $3,200 · Challenging · 12-day itinerary

2. slug: oaxaca-mexico — Oaxaca, Mexico — "Culture, Mezcal & Mountains"
   8 days · Group of 12 · $1,800 · Moderate · 8-day itinerary

3. slug: azores-portugal — The Azores, Portugal — "Atlantic Wild"
   10 days · Group of 8 · $2,600 · Moderate · 10-day itinerary

Each trip has: id, slug, destination, country, tagline, category, duration,
groupSize, price, difficulty, image (card), heroImage, galleryImages (4),
description, hook, highlights, itinerary, included, notIncluded, whoItsFor.

## Founder
- Name: Kat Shortsleeve
- Featured on About page with Unsplash portrait placeholder

## Conventions
- Named exports only — no default exports except page.tsx files
- PascalCase component filenames
- All colors via Tailwind custom tokens — never hardcode hex in JSX
- Semantic HTML throughout (main, section, article, nav)
- Every image uses next/image with alt text
- Tailwind classes for layout/color/spacing; inline styles for dynamic
  values only (parallax translateY, transition-delay based on index,
  font-size with clamp())
- 'use client' on any component using hooks; keep server components
  as the entry point for dynamic routes (page.tsx)
- IntersectionObserver pattern for scroll animations: observe once,
  disconnect after firing, toggle opacity-0/translate-y-8 → opacity-100/translate-y-0
- Scroll listeners added with { passive: true } in useEffect cleanup

## Do Not
- No API routes (not supported in static export)
- No server actions (not supported in static export)
- No hardcoded hex values in JSX
- No lorem ipsum — use real brand copy
- No default exports except page.tsx files
- No resort, cruise, or luxury aesthetics
- No aggressive sales language

## Pages
1. / — Home (7 sections)
2. /experiences — Trip index grid with category filter
3. /experiences/[slug] — Individual experience page (8 sections, scroll animations)
4. /about — Kat featured + values
5. /contact — Static form UI only

## Build Status (all complete)
[x] tailwind.config.ts — design tokens
[x] src/app/layout.tsx — fonts, metadata
[x] Navbar + Footer
[x] Home page
[x] Experiences page
[x] About page
[x] Contact page
[x] IntroAnimation — cinematic intro, sessionStorage, z-9999 fixed overlay
[x] /experiences/[slug] — individual experience pages, all 3 trips
