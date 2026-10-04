# EKTIFA — Artisanal Chocolate & Honey

A light, minimal, product-forward website for EKTIFA, an Emirati house of
artisanal chocolate and honey. The site presents the two real product lines —
**QAND** chocolate and **AL FAYA** honey — with real product photography, a
clean shop, and calm, subtle motion only.

## Tech stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS (warm, light brand palette and type scale)
- Framer Motion (subtle on-scroll fade reveals and the header)
- Lenis (unobtrusive smooth scroll, disabled for reduced motion)

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint
```

## The site

| Route | Page |
|-------|------|
| `/` | Home — hero, QAND, AL FAYA, ingredients, the house, shop CTA |
| `/collection` | Shop — all products grouped by line (QAND, AL FAYA) |
| `/collection/[slug]` | Product detail — gallery, options, details |

## Products

- **QAND** (`قَنْد`) — chocolate gift boxes in three colourways: Oasis Olive,
  Desert Sand, Coast Pearl.
- **AL FAYA** (`الفاية`) — raw honey from native trees: Ghaf, Samar, Sidr, plus
  a three-bottle leather gift set (The Trio).

All product and page content is data-driven in `src/data/products.ts`, so the
catalogue, prices and copy can be edited without touching components.

## Assets

Real brand and product imagery lives in `public/images/`:

- `qand/` — chocolate box photography (small / medium / large)
- `al_faya/` — honey bottles, leather boxes and bags
- `ingredients/`, `environment/`, `textures/` — supporting photography
- `ektifa_logo_h.svg`, `ektifa_logo_v.svg` — the EKTIFA marks

## Design system

Warm, light, material-led palette drawn from the real EKTIFA brand: paper
off-white grounds, warm near-black ink, and brand accents in sage green, honey
gold, terracotta and olive. Tokens live in `tailwind.config.ts` and
`src/app/globals.css`. Typography pairs an editorial serif (Cormorant Garamond)
with a clean grotesk (Jost); Arabic is set in Reem Kufi.

## Accessibility & motion

- Respects `prefers-reduced-motion` across Lenis and Framer Motion.
- Reveals are a single, gentle fade-up — no pinned scroll sequences or 3D.
- Accessible labels on interactive controls; visible focus states; strong
  contrast on the light ground.
