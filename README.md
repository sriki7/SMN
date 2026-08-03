# SMN Phoenix Talent Sourcing LLP — Website

**"Building People… Empowering Businesses"**

Official marketing website for SMN Phoenix Talent Sourcing LLP — a full-spectrum HR
solutions company headquartered in Kalaburagi, Karnataka, serving clients PAN-India.

Built with **React 19 + Vite** (design: "Aurora Corporate" — light, navy/teal, glassmorphism,
scroll-reveal and fluid ambient animations). No CSS framework — hand-written CSS in
`src/index.css` for full control and a small bundle.

## Getting started

```bash
npm install
npm run dev        # local dev server
npm run build      # production build → dist/
npm run preview    # preview the production build
```

## Project structure

```
src/
├── App.jsx                  # page composition
├── index.css                # full design system & animations
├── data/content.js          # ALL site text lives here — edit content without touching components
├── components/
│   ├── Loader.jsx           # branded preloader
│   ├── Nav.jsx              # glass pill nav (hides on scroll down)
│   ├── Hero.jsx             # animated hero (staggered headline, blobs, floating chips)
│   ├── Sections.jsx         # marquee, services, spectrum, verticals, digital edge, process, CTA
│   ├── Footer.jsx           # contact & credentials
│   ├── Reveal.jsx           # IntersectionObserver scroll-reveal wrapper
│   └── Icon.jsx             # inline stroke icon set
└── assets/                  # phoenix logo (navy & white variants, from company brochure)
```

## Content notes (confirm before launch)

- Company documents disagree on which phone number belongs to which director —
  numbers are currently shown without name attribution in the footer.
- The email is spelled `smnpheonix…` (as printed in both company documents) — verify.
- Client names/testimonials, team photos, and enquiry-form delivery email are pending.

## Deploying

Any static host works — Vercel, Netlify, or GitHub Pages (build output is `dist/`).
Point the custom domain `smnphoenixtalent.com` at the host after the first deploy.

Accessibility: respects `prefers-reduced-motion`; all animations are transform/opacity only.
