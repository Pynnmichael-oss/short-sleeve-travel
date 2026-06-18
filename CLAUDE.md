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
- Next.js 15 (App Router, static export mode)
- TypeScript (strict mode)
- Tailwind CSS
- next/font for Playfair Display + Inter
- next/image with unoptimized: true (GitHub Pages constraint)
- Contact form is static UI only — no backend needed

## next.config.ts Settings (DO NOT CHANGE)
- output: 'export'
- basePath: '/short-sleeve-travel'
- images.unoptimized: true

## File Structure
- src/app/ — pages and layouts
- src/components/layout/ — Navbar, Footer
- src/components/ui/ — Button, Badge, SectionLabel
- src/components/home/ — homepage sections
- src/lib/trips.ts — trip data
- src/types/index.ts — TypeScript types
- public/images/ — all photography

## Design Tokens
Colors (defined in tailwind.config.ts):
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
- Photography: Use Unsplash URLs as placeholders
- People featured more prominently than hotels or resorts

## Trips (placeholder data)
1. Patagonia, Chile — "Edge of the World"
   12 days · Group of 10 · From $3,200
   Trekking Torres del Paine, wild camping, glacier walks

2. Oaxaca, Mexico — "Culture, Mezcal & Mountains"
   8 days · Group of 12 · From $1,800
   Hiking Sierra Norte, cooking classes, Day of the Dead markets

3. The Azores, Portugal — "Atlantic Wild"
   10 days · Group of 8 · From $2,600
   Volcanic crater hikes, whale watching, thermal springs

## Founder
- Name: Kat Shortsleeve
- Featured prominently on About page
- Use placeholder portrait image from Unsplash
- Write bio copy in brand voice — adventurous, authentic, personal

## Conventions
- Named exports only (no default exports except page.tsx)
- PascalCase component filenames
- All colors via Tailwind custom tokens — never hardcode hex in JSX
- Semantic HTML throughout (main, section, article, nav)
- Every image uses next/image with alt text
- No inline styles — Tailwind classes only

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
2. /experiences — Trip index grid
3. /about — Kat featured + values
4. /contact — Static form UI only

## Build Order
[ ] tailwind.config.ts — design tokens
[ ] src/app/layout.tsx — fonts, metadata
[ ] Navbar + Footer
[ ] Home page
[ ] Experiences page
[ ] About page
[ ] Contact page
