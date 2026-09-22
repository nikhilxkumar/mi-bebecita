# PRD — Feliz Cumpleaños Mayté (Romantic Birthday Landing Page)

## Original Problem Statement
Single-page romantic Spanglish digital birthday card for Mayté: sunset sky photo background with gradient scrim, ~8 hand-drawn CSS sunflowers floating/rocking around the edges, a tappable drawn envelope (coral body, cream flap, dark-red wax seal with white heart), and a parchment card modal cycling through 14 fixed Spanglish messages with dots + Cerrar/Next buttons. Mobile-first, max-width ~420px centered. Fonts: Cormorant Garamond (regular+italic) + Quicksand (regular+bold). No audio, no backend, no analytics. Structure: index.html + one React component + one CSS file.

## Architecture
- Pure static frontend-only app (no backend, no DB in use).
- `/app/frontend/public/index.html` — fonts, meta, title.
- `/app/frontend/src/App.js` — single component (sunflowers, envelope, card modal, 14 messages).
- `/app/frontend/src/App.css` — all styling, plain CSS with color tokens as CSS variables.
- Runs on the Emergent React (craco) toolchain for live preview; output is a static bundle deployable to GitHub Pages / Vercel / Netlify.

## User Personas
- Gift-giver: wants a beautiful, tappable digital birthday card to send to Mayté.
- Mayté (recipient): opens the link on her phone, taps the envelope, reads 14 short Spanglish love notes.

## Core Requirements (static)
- Sunset photo bg + 3-stop gradient scrim; 8 pure-CSS sunflowers (12 back + 12 front petals, brown center), staggered float/rock animations, sizes 45–100px.
- Header: "Feliz Cumpleaños" / "Mayté" (italic) / "MI BEBECITA ✿".
- Envelope tap → fades/scales out, parchment card rises in.
- Card: cream #FFFAF5, gold top bar, 20px radius; salutation (Cormorant italic, coral), body (Quicksand 16/24, brown), 14 dots (active = coral pill), "✕ Cerrar" + "Next ✿ →" pills; fade+slide between messages.

## Implemented (2026-09-22)
- Full page per spec: background, scrim, header, envelope with wax-seal heart, hint text.
- 8 CSS-drawn sunflowers with staggered float/rock animations, edge-peeking positions fixed for desktop + mobile.
- Card modal with all 14 exact Spanglish messages, dot pagination, Next (wraps around) and Cerrar (returns to envelope).
- Removed template analytics (posthog) per "no analytics" requirement.
- data-testids on all interactive elements.

## Backlog / Next Tasks
- P1: Optional soft music toggle (user explicitly excluded audio for now).
- P1: Share/customize name + messages via URL params.
- P2: Petal-fall confetti animation when the card opens.
- P2: Printable/OG share image for messaging apps.
