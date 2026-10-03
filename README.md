# EKTIFA — A Contemporary Emirati Maison of Chocolate & Honey

A world class luxury website concept and interactive frontend for EKTIFA, an
Emirati maison of exceptional artisanal chocolate and honey. This is not an
ecommerce store. It is a digital maison, a private atelier and a contemporary
Emirati gallery, built to make the visitor feel they have entered a private
world before they ever feel they are shopping.

The experience follows a deliberate arc:

> PLACE → STORY → MATERIAL → CRAFT → COLLECTION → CREATION → ACQUISITION

## Tech stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS (custom restrained Emirati palette and type scale)
- Framer Motion (reveals, parallax, page motion)
- GSAP + ScrollTrigger (the pinned Craft manufacture sequence)
- React Three Fiber + Three.js + Drei (the hero chocolate surface and the 3D box atelier)
- Lenis (smooth, confident scroll)

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint
```

## The experience

### Homepage (`/`)

| # | Section | Component |
|---|---------|-----------|
| 01 | The Arrival — cinematic 3D tempered-chocolate hero | `sections/Arrival` → `hero/HeroScene` + `hero/ChocolateSurface` |
| 02 | Place — abstract procedural desert landscape, parallax | `sections/Place` |
| 03 | The Material — pinned horizontal macro gallery | `sections/MaterialGallery` + `ui/MacroSurface` |
| 04 | The House — editorial story sequence | `sections/TheHouse` |
| 05 | Craft — GSAP-pinned atelier with material microscope | `sections/CraftSection` |
| 06 | Collection — collectible objects, subtle 3D hover | `sections/CollectionShowcase` + `sections/CollectionObject` |
| 08 | Honey — immersive amber world, scroll-driven droplet | `sections/HoneyChapter` |
| 09 | Origin — editorial interactive atlas | `sections/OriginAtlas` |
| 10 | The EKTIFA Creation — gateway to the atelier | `sections/CreationCTA` |

### Collection detail (`/collection/[slug]`) — Section 07

Luxury-object product presentation (`product/ProductStory`): THE OBJECT, THE
STORY, THE COMPOSITION, THE FLAVOURS, THE MATERIALS, THE CRAFT, THE
PRESENTATION, ACQUIRE — with a restrained purchase CTA, never an ecommerce
grid. Collections: `majlis`, `diwan`, `qasr`.

### The Atelier — 3D configurator (`/create`)

A highly polished React Three Fiber chocolate box configurator
(`configurator/*`):

- **Center** — photoreal-leaning 3D box (`BoxModel` in `ConfiguratorCanvas`)
- **Left** — vertical progress navigation (`ConfiguratorSidebar`)
- **Right / bottom sheet** — contextual configuration panel
- **Bottom** — live creation summary (`CreationSummary`)

Six steps: `01 ARCHITECTURE · 02 MATERIAL · 03 CHOCOLATES · 04 ARRANGEMENT ·
05 PERSONALISE · 06 REVEAL`.

Behaviour: PBR-style materials respond to light; the lid opens with weight;
chocolates animate physically into their slots; `AUTO CURATE` composes a
balanced arrangement; engraving appears physically on the lid; the reveal
pulls back, closes the UI and presents the finished creation. Controlled
orbit, ground shadows, graceful WebGL fallback, reduced-motion support and
a mobile bottom-sheet interface are all included.

## Architecture notes

- **Data is separated from presentation.** All product, material, chocolate,
  craft and origin content lives in `src/data/*` and is configuration-driven,
  so it can be swapped for real EKTIFA data without touching components.
- **Creation state** is a typed reducer + context (`src/lib/creation.tsx`).
- **Components are reusable** and match the brief:
  `HeroScene`, `MaterialGallery`, `CraftSection`, `CollectionObject`,
  `ProductStory`, `OriginAtlas`, `Configurator`, `ConfiguratorSidebar`,
  `ChocolateSelector`, `MaterialSelector`, `EngravingPanel`, `CreationSummary`,
  `RevealScene`.
- **Performance**: Three.js / Drei are dynamically imported (`ssr: false`) so
  they never enter the initial bundle; the 3D stage lazy-loads with a graceful
  fallback when WebGL is unavailable.

## Design system

Restrained, material-led palette (no excessive gold, no generic gradients):
deep cacao, obsidian, warm desert sand, bone / ivory, natural stone, date
brown, muted olive, antique brass, pearl and honey amber. Typography pairs an
editorial display serif (Cormorant Garamond) with a refined grotesk (Jost),
with Arabic set in Reem Kufi. Tokens live in `tailwind.config.ts` and
`src/app/globals.css`.

## Placeholder assets

The brand logos (`public/brand/ektifa-logo-h.svg`, `ektifa-logo-v.svg`) are
the real EKTIFA marks. Every other visual is generated procedurally
(gradients, SVG, canvas, Three.js geometry) rather than using stock imagery —
so there are no stock-photo placeholders to replace. When real macro
photography and product renders are available, they can be dropped into
`MacroSurface`, the collection objects and the configurator materials, which
are already structured to accept image/texture sources.

## Accessibility & responsiveness

- Respects `prefers-reduced-motion` across Lenis, Framer Motion, GSAP and R3F.
- Accessible labels on all interactive controls; keyboard-navigable; visible
  focus states; strong contrast on dark grounds.
- Desktop is the flagship experience; tablet and mobile recompose (bottom
  sheets, restacked editorial) rather than simply stacking desktop sections.
