# Ecobex

Ecobex is a website where people enter their digital habits (streaming, video calls, AI prompts and so on), see an estimate of the CO₂ and water those habits cause, and find ways to offset it. It is frontend only. The step-by-step build plan is in `PLAN.md`. Work on one step at a time and don't start the next one unless asked.

## Who you're working with
The owner is a designer, not a developer.
- Explain every change in plain words: what changed, why, and how to check it in the browser.
- Prefer simple, readable code over clever code. Small files, clear names, short comments where the "why" isn't obvious.
- Plain JavaScript (`.js` / `.jsx`). No TypeScript.
- Before adding a new library, say what it's for and ask first.

## Repo layout
```
dashboard/   The Ecobex website (Vite + React 19 + Tailwind 4), deployed to Vercel with root directory "dashboard"
PLAN.md      Build plan with checkboxes
```
Run `npm` commands from inside `dashboard/`, never from the root.

`agent-skills/` and `taste-skill/` are third-party tool repos kept locally. They are ignored by git and are not part of Ecobex. Don't edit them.

## App structure (dashboard/src)
- `components/`: reusable pieces (Header, inputs, cards).
- `pages/`: one file per page (Home, Calculator, Results, How we calculate, Sign in, Onboarding, Dashboard).
- `data/factors.js`: **every** numeric factor (energy per hour of streaming, grid intensity, water per kWh, energy per AI prompt, etc.) lives here, each with a source URL in a comment. No magic numbers anywhere else.
- `lib/footprint.js`: turns the user's habits into kWh, CO₂ and water, using `factors.js`.

## Frontend only
- No backend, database, server, API routes, Supabase or Firebase.
- The only data is what the user types in. Nothing tracks the user.
- Sign up, sign in and onboarding are UI flows. The account, onboarding answers and calculator answers are saved in `localStorage`, and the dashboard shows the user's own answers plus sample history. Say so in a short comment where this is done, so nobody mistakes it for real security.
- Never store a real password. Treat anything typed into the sign-up form as demo data.
- No analytics, trackers or third-party scripts.

## Numbers shown to users
- Always label them as estimates (e.g. "≈ 12 g CO₂").
- Anything a user sees must be traceable to `data/factors.js` and explained on the "How we calculate" page.

## Out of scope until PLAN.md says otherwise
Payments, buying offsets, any backend, real authentication, the Chrome extension. The "Offset your impact" button only links to an external, verified offset provider.

## Done means
- It runs: `npm run dev` works in `dashboard/`.
- `npm run build` and `npm run lint` pass.
- Tests pass, where tests exist (`npm test`).
- You've told the owner how to check it in the browser.
- The step's boxes in `PLAN.md` are ticked.

## Naming
- Product: **Ecobex**.
- Company: **VentureDive** (short form internally: **VenD**). Employees: **VenDians**.
