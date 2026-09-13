# VANT — landing site

A standalone Vite + React + Tailwind v4 project (no Figma Make plumbing required).

## Run it

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview   # sanity-check the production build locally
```

`npm run build` outputs static files to `dist/` — deploy that folder to any static
host (Vercel, Netlify, Cloudflare Pages, GitHub Pages, S3, etc.).

## What actually works right now

- **Waitlist signup** (hero, feature panels, pricing cards, bottom CTA) — validates the
  email, shows a real success/error state, and saves the entry in the visitor's browser
  (`localStorage`, key `vant_waitlist`).
- **Contact sales** (Enterprise plan, footer) — validates name/email/company, saves to
  `localStorage` under `vant_contact_requests`.
- **Mobile menu** — a working hamburger toggle for small screens.
- **Marquee strip** — actually scrolls now (it previously had `animate-none`).
- **Nav / anchor links** — smooth-scroll to each section.
- Reduced-motion and keyboard-focus support.

## Connecting a real backend

Right now, signups only live in each visitor's own browser — nobody sees them but that
visitor. To actually collect them centrally, open `src/App.tsx` and set:

```ts
const WAITLIST_ENDPOINT = "https://your-endpoint.example.com/waitlist";
const CONTACT_ENDPOINT = "https://your-endpoint.example.com/contact";
```

Any endpoint that accepts a `POST` with a JSON body works. Quick options:

- **Formspree** (formspree.io) — free tier, no backend code needed, gives you a URL in
  under a minute.
- **A Google Sheet** via a small Apps Script web app.
- **Your own API route** (e.g. a serverless function on Vercel/Netlify) that writes to a
  database or sends you an email.

If the endpoint request fails (or isn't set), the form still saves locally and shows the
visitor a success state — so the UI never breaks, but you should wire up a real endpoint
before treating this as your live signup source of truth.
