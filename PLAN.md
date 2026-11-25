# Ecobex: step-by-step build guide

**Ecobex** is a Chrome extension that measures your digital habits, shows an estimate of the CO₂ and water they cause, and points you to ways to offset it.

Goal for v0: **the extension's frontend screens only**: onboarding, the dashboard and the toolbar popup, built as web pages with sample data. **No backend, no database, no server, no real tracking yet.** No payments. The "Offset your impact" button links to a verified offset provider.

**How to use this guide:** do one step per session. Start each session with:

> *Read CLAUDE.md and PLAN.md. Do Step N. Explain what you changed in plain words.*

Then check it yourself, commit, and tick the box.

**Run the screens locally:**
```bash
cd dashboard
npm run dev
```
Open the `localhost` link it prints. Press `Ctrl+C` to stop.

---

## Target structure

```
carbon-offset-app/
├── dashboard/                the Ecobex extension screens (web app)
│   └── src/
│       ├── components/       reusable pieces (Header, cards, charts)
│       │   └── untitled/     copied Untitled UI components (TypeScript)
│       ├── styles/           Untitled UI theme, with Ecobex green
│       ├── pages/            one file per screen
│       ├── data/factors.js   every figure we use, with its source
│       ├── data/sampleUsage.js  made-up usage history
│       └── lib/footprint.js  CO₂ and water maths
├── CLAUDE.md                 rules Claude follows in every session
└── PLAN.md                   this guide
```

---

## Done so far

- [x] React + Vite + Tailwind set up
- [x] App renamed to Ecobex
- [x] Step 0. Organise the repo: app moved to `dashboard/`, `CLAUDE.md` written
- [x] Step 1. Housekeeping: plan rewritten for frontend only, tool folders ignored, pushed to GitHub
- [x] Step 2. Pages and navigation (React Router added). The page list is now Onboarding, Dashboard, Popup preview and How we calculate; the earlier Calculator, Results and Home pages get replaced in Step 7 onwards
- [x] Plan changed from a website to a Chrome extension, frontend screens only
- [x] First research page: researched CO₂ and water figures per activity (published as an artifact, not yet in the repo)

---

## Phase A: research

### Step 3. Competitive analysis and unique proposition
**What happens:** we study the existing carbon and digital-footprint extensions and web apps on the Chrome Web Store, and the manual habits they have to beat (like typing numbers into a calculator). We then write down Ecobex's unique proposition: what it does that the others don't.

- [x] Scope agreed first: our offering, market and region, how many competitors, and which flow the comparison covers
- [x] Prompt: *"Run the competitive analysis from PLAN.md Step 3."* Report: `research/competitive-analysis.md`
- [x] Read the findings and confirm the unique proposition in your own words

✅ **Done when:** you have a sourced comparison and one written unique proposition that the screens will be built around.

**Confirmed unique proposition (20 Nov 2026, replaces the earlier "whole digital day" line):** *Ecobex shows the CO₂ and water of your digital habits as ranges, with every assumption visible, and shows you who you would offset with, at what price and to which standard, before you leave for their site.*

Why it changed: the competitive analysis (`research/competitive-analysis.md`) found the method and offset gaps open now, while video calls still have no sourced figure (marked "not estimated yet" in `factors.js`). The "whole digital day" claim comes back once we have one.

What this asks of the screens:
- Show figures as ranges with a central value, labelled as estimates, with a confidence note where sources disagree.
- Show water next to CO₂ wherever we have a sourced water figure; say plainly when we don't.
- Keep the method one tap away, and a "How we calculate" page (Step 11) that lists every figure and source.
- Make the offset step show the provider, the price per tonne and the standard before the person leaves for the provider's site. We still take no payments.
- Let people see value without making an account.

Open items this creates:
- [ ] Choose and source a verified offset provider (price per tonne, carbon standard) before Step 10. None is chosen yet.
- [ ] Decide whether people can edit the assumptions (as Airth and GreenQuery allow) or only read them. Not decided; not in any step yet.
- [ ] Find a sourced video-call figure so the proposition can widen to the whole digital day.

### Step 4. The figures file
**What happens:** `data/factors.js` holds every figure (energy per hour of video, per video call, per AI prompt, grid intensity, water per kWh), each with a link to its source. Start from the research page, and check sources properly.

- [x] Prompt: *"Do Step 4 of PLAN.md. Show me the figures you chose and their sources before writing code."* Written to `dashboard/src/data/factors.js`; video calls marked "not estimated yet"
- [ ] Review the figures yourself (you'll quote them on the "How we calculate" page)

✅ **Done when:** every figure has a source you're happy with, and each shows a range or confidence where sources disagree.

### Step 5. Design system: Untitled UI
**What happens:** we build on the open-source [Untitled UI React](https://github.com/untitleduico/react) library (MIT). Its components are copied into `src/components/untitled/`, its styles into `src/styles/`, and its libraries installed (each one approved first). The **Aurora** palette (Lake, Dusk, Night, Aurora, Alpenglow, Ember) is applied in `theme.css`, and Outfit and Inter are the chosen fonts. A preview page shows the components working.

Outfit and Inter are self-hosted with the `@fontsource-variable/outfit` and `@fontsource-variable/inter` packages, so there are no third-party font requests.

- [x] Prompt: *"Do Step 5 of PLAN.md."* Components, theme and `/preview` page are in place; build and lint pass
- [ ] Check: open the preview page (http://localhost:5180/preview while `npm run dev` runs) and see buttons, inputs, tabs, a table, badges, progress and a chart in Ecobex green, in light and dark mode

✅ **Done when:** the components render, `npm run build` and `npm run lint` pass, and our JavaScript screens can import the TypeScript components.

### Step 6. Sample usage and the maths
**What happens:** `data/sampleUsage.js` holds made-up usage (hours of streaming, calls, AI prompts per day) standing in for what the extension will measure. `lib/footprint.js` turns it into CO₂ and water. Tests check the maths.

- [ ] Prompt: *"Do Step 6 of PLAN.md."*
- [ ] Run the tests: `npm test`

✅ **Done when:** sample usage turns into sensible numbers and the tests pass.

---

## Phase B: the extension screens (sample data, saved in the browser)

### Step 7. Onboarding
**What happens:** a short first-time flow: what Ecobex measures and why, a clear privacy promise, your goals, then the habits you want tracked. Answers are saved in the browser (`localStorage`).

- [ ] Prompt: *"Do Step 7 of PLAN.md using this design: [Figma link or screenshots]."*
- [ ] Check: a first visit shows onboarding once; after finishing, you go straight to the dashboard

✅ **Done when:** a new user lands on the dashboard after finishing onboarding.

### Step 8. Dashboard
**What happens:** your footprint (prompts, energy, CO₂, water), a breakdown by tool and category, and a trend chart with sample history, with the time-range tabs. Charts use the Untitled UI chart components (Recharts underneath). Every number is labelled as an estimate.

- [ ] Prompt: *"Do Step 8 of PLAN.md using this design: [Figma link or screenshots]."*

✅ **Done when:** it shows the sample numbers, the chart and the breakdown.

### Step 9. Toolbar popup
**What happens:** the small panel that opens from the extension's toolbar icon: today's footprint at a glance and a link to the full dashboard. Built as its own page.

- [ ] Prompt: *"Do Step 9 of PLAN.md using this design: [Figma link or screenshots]."*
- [ ] Check: open the popup page at a small width and click through to the dashboard

✅ **Done when:** the popup reads clearly at a small size.

### Step 10. Offset your impact
**What happens:** a section explaining offsetting, with a button that opens a verified provider's site. No payments in our code.

- [ ] Prompt: *"Do Step 10 of PLAN.md."*

✅ **Done when:** the button opens the provider in a new tab.

### Step 11. How we calculate
**What happens:** a page that explains every figure, range and source from `factors.js`, in plain words.

- [ ] Prompt: *"Do Step 11 of PLAN.md."*

✅ **Done when:** every number a user sees can be traced to a figure on this page.

---

## Phase C: polish and share

### Step 12. Small widths, dark mode and accessibility
- [ ] Prompt: *"Do Step 12 of PLAN.md."*
- [ ] Check: popup and dashboard widths, dark mode, keyboard-only use

### Step 13. Share a preview on Vercel
- [ ] Add `dashboard/vercel.json` so refreshing a page like `/dashboard` doesn't show Vercel's 404 (Claude can do this)
- [ ] In Vercel: **Add New Project** → choose the repo → set **Root Directory** to `dashboard` → Deploy

✅ **Done when:** you have a link you can share to show the screens.

---

## Later (not in v0)
- Packaging as a real Chrome extension: manifest, background script that measures browsing, browser storage
- Accounts and saved history across devices (needs a backend)
- Payments, then buying and retiring credits (Gold Standard, Verra or Puro.earth; prefer removals)

---

## If something goes wrong
- **Page not updating?** Check the terminal running `npm run dev` for errors, then refresh.
- **"Could not read package.json"?** You're in the wrong folder. Run `cd dashboard` first.
- **A step broke everything?** `git restore .` takes you back to your last commit.
