# nicocantarelli.com

Personal portfolio and component lab built with Next.js 16, featuring interactive UI experiments, CSS micro-interactions, and multilingual support.

## Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: CSS Modules, custom properties
- **i18n**: next-intl (English, Spanish, Italian)
- **Deployment**: Vercel
- **Font**: Satoshi + Cascadia Code

## Structure

```
src/
  app/
    [locale]/          # Locale-based routing
      lab/             # Component playground
      projects/[slug]/ # Project case studies
  components/
    lab/               # Lab demo components
      CSSMicroInteractions/  # 20+ looping CSS animations
      ButtonEffects/         # Hover & click effects
      TextRevealScroll/      # Scroll-driven text reveal
      ProductCard/           # 3D tilt cards with flip
      DrawerDemo/            # Bottom/side/nested drawers
      PageTransitionsDemo/   # Fade, slide, morph transitions
      AddToCartAnimation/    # Flying item micro-interaction
      ScrollProductReveal/   # Scroll-driven product showcase
  i18n/                # Locale config & navigation
  messages/            # Translation files (en, es, it)
  data/                # Project data
```

## Features

### Component Lab (`/lab`)
Interactive demos showcasing frontend techniques — all built with pure CSS and vanilla React, no animation libraries.

- **CSS Micro-interactions** — Pagination, toggles, search, radio buttons, hamburger menus, spinners, tabs, counters, view toggles, follow buttons, and more. All loop infinitely with elastic easing.
- **Button Effects** — Fill, ripple, jelly, glow, underline, scale
- **Drawers** — Bottom sheet, side panel, nested drawers, form drawer
- **Product Cards** — 3D perspective tilt, quick view flip
- **Page Transitions** — Fade, slide, morph with two-phase exit/enter
- **Text Reveal** — Word-by-word and character-by-character scroll reveal with blur
- **Add to Cart** — Flying item animation with cart counter bounce

### Design System
- Light & dark mode with view transition animation
- Layered card shadows — inner glow + stacked drop shadows for depth
- Responsive layout with sidebar navigation on desktop
- Accessible — focus-visible outlines, semantic HTML, ARIA attributes, keyboard navigation

### Portfolio
- 5 client project case studies with browser mockups
- Services, testimonials, about, and contact sections
- Formspree-powered contact form

## Development

```bash
npm install
npm run dev
```

## License

MIT
