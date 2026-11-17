# Ecobex

Ecobex is a Chrome extension that tracks a user's browsing, estimates the CO₂ and water it causes, and helps them offset it. The step-by-step build plan is in `PLAN.md`. Work on one step at a time and don't start the next one unless asked.

## Who you're working with
The owner is a designer, not a developer.
- Explain every change in plain words: what changed, why, and how to test it in Chrome.
- Prefer simple, readable code over clever code. Small files, clear names, short comments where the "why" isn't obvious.
- Plain JavaScript (`.js` / `.jsx`). No TypeScript.
- Before adding a new library, say what it's for and ask first.

## Repo layout
```
extension/   Chrome extension (Manifest V3), built with WXT + React + Tailwind
dashboard/   Website (Vite + React 19 + Tailwind 4), deployed to Vercel with root directory "dashboard"
PLAN.md      Build plan with checkboxes
```
Each folder is its own npm project. Run `npm` commands from inside `extension/` or `dashboard/`, never from the root.

## Extension architecture
- `entrypoints/background.js`: service worker. Adds up bytes, active time and AI prompt counts per domain per day.
- `entrypoints/content.js`: reads `performance.getEntriesByType('resource')` (`transferSize`) and sends byte totals to the background worker.
- `entrypoints/ai.content.js`: runs only on chatgpt.com, gemini.google.com and claude.ai. Counts prompts sent.
- `entrypoints/popup/`: the popup UI.
- `lib/footprint.js`: bytes → kWh → CO₂ (via CO2.js, Sustainable Web Design model) and water.
- `lib/factors.js`: **every** numeric factor (grid intensity, water per kWh, per-prompt energy, etc.) lives here, each with a source URL in a comment. No magic numbers anywhere else.
- Storage: `chrome.storage.local`, shaped as `{ "YYYY-MM-DD": { "<domain>": { bytes, activeMs, prompts } } }`.

## Privacy rules (never break these)
1. Raw browsing data (domains, times) stays in `chrome.storage.local` on the user's device.
2. Never store or send full URLs, page titles, page content or the text of AI prompts. Domains only, and only locally.
3. There is no backend in v0, so nothing is sent anywhere. If a backend is added later, it only ever receives daily totals by **category** (e.g. "Video: 1.2 GB"), never domains.
4. No analytics, trackers or third-party scripts in the extension.

## Allowed extension permissions
Only these. Ask before adding anything else, because Chrome Web Store review checks every permission.
- `storage`, `tabs`, `idle`
- Host permissions: `<all_urls>` (needed for the byte-measuring content script)

## Numbers shown to users
- Always label them as estimates (e.g. "≈ 12 g CO₂").
- Anything a user sees must be traceable to `lib/factors.js` and explained on the "How we calculate" page.

## Out of scope until PLAN.md says otherwise
Payments, buying offsets, any backend, database or server, real authentication, the desktop app. The "Offset your impact" button only links to an external, verified offset provider.

## Frontend only (v0)
- The project is frontend only. Don't add Supabase, Firebase, API routes or any server code.
- Sign up, sign in and onboarding (Steps 10–11 in `PLAN.md`) are UI flows. The account and onboarding answers are saved in `localStorage` in the dashboard, and the dashboard shows sample data. Say so in a short comment where this is done, so nobody mistakes it for real security.
- Never store a real password. Treat anything typed into the sign-up form as demo data.

## Done means
- It runs: `npm run dev` works in the folder you changed.
- Tests pass, where tests exist (`npm test`).
- You've told the owner how to check it in Chrome.
- The step's boxes in `PLAN.md` are ticked.

## Naming
- Product: **Ecobex**.
- Company: **VentureDive** (short form internally: **VenD**). Employees: **VenDians**.
