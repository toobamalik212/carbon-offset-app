# Ecobex

Ecobex is a Chrome extension that measures people's digital habits (streaming, video calls, AI prompts and so on), shows an estimate of the CO₂ and water those habits cause, and points them to ways to offset it. **For now we only build the extension's frontend screens**, as ordinary web pages in `dashboard/` with sample data: onboarding, the dashboard, and the toolbar popup. The extension itself (the part that measures browsing) comes later. The step-by-step build plan is in `PLAN.md`. Work on one step at a time and don't start the next one unless asked.

## Unique proposition
Ecobex shows the CO₂ and water of your whole digital day, not just your AI chats, as estimates with the method and sources visible, and takes you to a verified offset provider when you're ready. Screens should serve that: cover AI, streaming and video calls; show water next to CO₂; keep the method one click away; no account needed to see value. The research behind it is in `research/competitive-analysis.md`.

## Who you're working with
The owner is a designer, not a developer.
- Explain every change in plain words: what changed, why, and how to check it in the browser.
- Prefer simple, readable code over clever code. Small files, clear names, short comments where the "why" isn't obvious.
- Plain JavaScript (`.js` / `.jsx`). No TypeScript.
- Before adding a new library, say what it's for and ask first.

## Repo layout
```
dashboard/   The Ecobex extension screens, built as a web app (Vite + React 19 + Tailwind 4), previewed on Vercel with root directory "dashboard"
PLAN.md      Build plan with checkboxes
```
Run `npm` commands from inside `dashboard/`, never from the root.

`agent-skills/` and `taste-skill/` are third-party tool repos kept locally. They are ignored by git and are not part of Ecobex. Don't edit them.

## App structure (dashboard/src)
- `components/`: reusable pieces (Header, cards, charts).
- `pages/`: one file per screen (Onboarding, Dashboard, Popup preview, How we calculate).
- `data/factors.js`: **every** numeric factor (energy per hour of streaming, grid intensity, water per kWh, energy per AI prompt, etc.) lives here, each with a source URL in a comment. No magic numbers anywhere else.
- `lib/footprint.js`: turns usage (hours, prompts, calls) into kWh, CO₂ and water, using `factors.js`.
- `data/sampleUsage.js`: made-up usage history that stands in for what the extension will measure later. Say so in a short comment at the top, so nobody mistakes it for real tracking.

## Frontend only
- No backend, database, server, API routes, Supabase or Firebase.
- No real browsing tracking yet. The dashboard shows sample usage plus whatever the user types in onboarding.
- Onboarding answers are saved in `localStorage`. Say so in a short comment where this is done, so nobody mistakes it for real security.
- Never store a real password. There are no accounts for now.
- No analytics, trackers or third-party scripts.
- Keep screens extension-friendly: no server-only features, and the popup and dashboard should work as separate pages that could later live inside an extension.

## Numbers shown to users
- Always label them as estimates (e.g. "≈ 12 g CO₂").
- Anything a user sees must be traceable to `data/factors.js` and explained on the "How we calculate" page.

## Out of scope until PLAN.md says otherwise
Packaging as a real extension (manifest, background tracking, browser storage), accounts and sign in, payments, buying offsets, any backend. The "Offset your impact" button only links to an external, verified offset provider.

## Done means
- It runs: `npm run dev` works in `dashboard/`.
- `npm run build` and `npm run lint` pass.
- Tests pass, where tests exist (`npm test`).
- You've told the owner how to check it in the browser.
- The step's boxes in `PLAN.md` are ticked.

## Naming
- Product: **Ecobex**.
- Company: **VentureDive** (short form internally: **VenD**). Employees: **VenDians**.
