# Ecobex

Ecobex is a Chrome extension that measures people's digital habits (streaming, video calls, AI prompts and so on), shows an estimate of the CO₂ and water those habits cause, and points them to ways to offset it. **For now we only build the extension's frontend screens**, as ordinary web pages in `dashboard/` with sample data: onboarding, the dashboard, and the toolbar popup. The extension itself (the part that measures browsing) comes later. The step-by-step build plan is in `PLAN.md`. Work on one step at a time and don't start the next one unless asked.

## Unique proposition
Ecobex shows the CO₂ and water of your digital habits as ranges, with every assumption visible, and shows you who you would offset with, at what price and to which standard, before you leave for their site. Screens should serve that: show ranges and a central value, labelled as estimates; water next to CO₂ where we have a sourced figure; the method one tap away; the offset step naming provider, price per tonne and standard (we still take no payments); no account needed to see value. Don't claim video calls until `factors.js` has a sourced figure. The research behind this is in `research/competitive-analysis.md`.

## Who you're working with
The owner is a designer, not a developer.
- Explain every change in plain words: what changed, why, and how to check it in the browser.
- Prefer simple, readable code over clever code. Small files, clear names, short comments where the "why" isn't obvious.
- Plain JavaScript (`.js` / `.jsx`) for everything we write: screens, data, maths. One exception: the copied Untitled UI components in `src/components/untitled/` are TypeScript (`.tsx`). Leave them as they are and import them from our JavaScript. Don't write new TypeScript elsewhere.
- Before adding a new library, say what it's for and ask first.

## Repo layout
```
dashboard/   The Ecobex extension screens, built as a web app (Vite + React 19 + Tailwind 4), previewed on Vercel with root directory "dashboard"
PLAN.md      Build plan with checkboxes
```
Run `npm` commands from inside `dashboard/`, never from the root.

`agent-skills/` and `taste-skill/` are third-party tool repos kept locally. They are ignored by git and are not part of Ecobex. Don't edit them.

## Design system: Untitled UI
We build on the open-source Untitled UI React library (https://github.com/untitleduico/react, MIT licence). Components are copied into the project, not installed as a package.
- Copied components live in `src/components/untitled/`, laid out like the repo (`base/`, `application/`, `foundations/`). Use them before building anything custom. Only copy a component when a screen needs it.
- Copy from the open-source repo only. Never copy from Untitled UI PRO, which has a separate paid licence.
- Inside `untitled/`, keep their conventions: kebab-case file names and `Aria`-prefixed imports from `react-aria-components`. Don't restyle them by editing the files; change colours and type through tokens in `src/styles/theme.css`.
- Colours: the **Aurora** palette lives in `src/styles/theme.css` (preview: https://claude.ai/artifact/GzuiBZFNMvxxbBXYRvt8LH). **Lake** (blue-green) is the brand colour (`brand-*`), **Dusk** (violet) the accent (`purple-*`, `dusk-*`), **Night** (blue-tinted) replaces the grays (`neutral-*`, `gray-*`), **Aurora** green is success (`green-*`), **Alpenglow** amber is warning (`yellow-*`), **Ember** red is error (`red-*`). Untitled UI's semantic tokens read those names, so the remap is deliberate. Use the theme's colour classes and never raw hex values in screens. Keep Lake out of status messages and Aurora green out of the main button.
- Type: headings use **Outfit** (`--font-display`), body and interface use **Inter** (`--font-body`). Both are self-hosted through the `@fontsource-variable/outfit` and `@fontsource-variable/inter` packages, imported in `src/styles/globals.css`, so the app makes no font requests to Google or any other host. Don't add a Google Fonts link.
- Theme: the page follows the browser's light or dark setting through a small script in `index.html` that sets the `dark-mode` class.
- Dark mode uses the `dark-mode` class on the page root.
- If a component the design needs doesn't exist, say so and propose the closest option instead of inventing a look.

## App structure (dashboard/src)
- `modules/`: **one folder per module**, holding everything that module needs (its pages, steps, layout, small helpers and storage). The modules follow `docs/flows.md`: `onboarding/` (F1), `metrics/` (F2), `contribute/` (F3), `leaderboard/` (F4), `settings/` (F5). Don't put a module's screens anywhere else. A module imports another module's code only for shared state (for example the onboarding store).
- `components/`: reusable pieces shared by several modules, and the copied `untitled/` folder.
- `styles/`: Untitled UI's `globals.css`, `theme.css` and `typography.css`; `index.css` imports them.
- `pages/`: older pages (Calculator, Results, How we calculate, Preview) until modules replace them. New screens go in `modules/`.
- The user flows these modules build are in `docs/flows.md`, with the data in `docs/discovery/user-flows.json`.
- `data/factors.js`: **every** numeric factor (energy per hour of streaming, grid intensity, water per kWh, energy per AI prompt, etc.) lives here, each with a source URL in a comment. No magic numbers anywhere else.
- `lib/footprint.js`: turns usage (hours, prompts, calls) into kWh, CO₂ and water, using `factors.js`.
- `data/sampleUsage.js`: made-up usage history that stands in for what the extension will measure later. Say so in a short comment at the top, so nobody mistakes it for real tracking.

## Frontend only
- No backend, database, server, API routes, Supabase or Firebase.
- No real browsing tracking yet. The dashboard shows sample usage plus whatever the user types in onboarding.
- Onboarding answers are saved in `localStorage`. Say so in a short comment where this is done, so nobody mistakes it for real security.
- Sign-up comes first (owner's decision, 25 Nov 2026): name and email only, saved in `localStorage` as a demo account. Never ask for or store a password. Sign-in only finds the account saved in this browser.
- Before anything is tracked, onboarding shows what is measured and never collected, and the person must agree (Chrome Web Store user data policy).
- No analytics, trackers or third-party scripts.
- Keep screens extension-friendly: no server-only features, and the popup and dashboard should work as separate pages that could later live inside an extension.

## Numbers shown to users
- Always label them as estimates (e.g. "≈ 12 g CO₂").
- Anything a user sees must be traceable to `data/factors.js` and explained on the "How we calculate" page.

## Out of scope until PLAN.md says otherwise
Packaging as a real extension (manifest, background tracking, browser storage), real accounts and sign-in across devices, payments, buying offsets, any backend. The "Offset your impact" button only links to an external, verified offset provider.

## Done means
- It runs: `npm run dev` works in `dashboard/`.
- `npm run build` and `npm run lint` pass.
- Tests pass, where tests exist (`npm test`).
- You've told the owner how to check it in the browser.
- The step's boxes in `PLAN.md` are ticked.

## Naming
- Product: **Ecobex**.
- Company: **VentureDive** (short form internally: **VenD**). Employees: **VenDians**.
